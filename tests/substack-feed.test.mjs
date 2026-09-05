import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";
import ts from "typescript";

const sourceUrl = new URL("../src/lib/substack.ts", import.meta.url);
const { outputText } = ts.transpileModule(await readFile(sourceUrl, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
});

// Execute the real feed adapter with an isolated fetch for deterministic failures.
function loadAdapter(fetch) {
  const exports = {};
  new Function("exports", "require", "fetch", "AbortSignal", outputText)(
    exports, createRequire(sourceUrl), fetch, AbortSignal,
  );
  return exports;
}

const feed = `<rss><channel><item>
  <title>Founder lessons</title>
  <link>https://886studios.substack.com/p/founder-lessons</link>
  <pubDate>Tue, 11 Aug 2026 00:00:00 GMT</pubDate>
  <content:encoded><![CDATA[<p>Lessons for founders.</p>]]></content:encoded>
</item></channel></rss>`;

test("a successful feed is shared across article, RSS, and sitemap consumers", async () => {
  let requests = 0;
  const adapter = loadAdapter(async () => { requests += 1; return new Response(feed); });
  const [posts, samePosts] = await Promise.all([adapter.getSubstackPosts(), adapter.getSubstackPosts()]);
  assert.equal(requests, 1);
  assert.equal(posts, samePosts);
  assert.equal(posts[0].slug, "founder-lessons");
  assert.equal(posts[0].contentHtml, "<p>Lessons for founders.</p>");
});

for (const [name, fetch] of [
  ["network outage", async () => { throw new TypeError("fetch failed"); }],
  ["HTTP failure", async () => new Response("Unavailable", { status: 503 })],
  ["empty feed", async () => new Response("<rss><channel></channel></rss>")],
  ["invalid response", async () => new Response("<html>Service unavailable</html>")],
  ["unreadable articles", async () => new Response("<rss><channel><item><title>Incomplete</title></item></channel></rss>")],
]) {
  test(`${name} blocks a release instead of deleting the blog archive`, async () => {
    await assert.rejects(loadAdapter(fetch).getSubstackPosts(), /Refusing to publish without the blog archive/);
  });
}

test("a failed request can recover without restarting the development server", async () => {
  let requests = 0;
  const adapter = loadAdapter(async () => {
    requests += 1;
    if (requests === 1) throw new TypeError("temporary outage");
    return new Response(feed);
  });
  await assert.rejects(adapter.getSubstackPosts());
  assert.equal((await adapter.getSubstackPosts())[0].slug, "founder-lessons");
  assert.equal(requests, 2);
});

test("the merged blog also recovers after an upstream failure", async () => {
  const source = await readFile(new URL("../src/lib/blog.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  let requests = 0;
  const exports = {};
  const dependencies = {
    "astro:content": { getCollection: async () => [] },
    "./substack": {
      getSubstackPosts: async () => {
        requests += 1;
        if (requests === 1) throw new Error("temporary outage");
        return [{ slug: "founder-lessons", publishedAt: "2026-08-11" }];
      },
    },
  };
  new Function("exports", "require", compiled)(exports, (name) => dependencies[name]);
  await assert.rejects(exports.getBlogPosts());
  assert.equal((await exports.getBlogPosts())[0].slug, "founder-lessons");
  assert.equal(requests, 2);
});
