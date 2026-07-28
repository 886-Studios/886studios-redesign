import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [contentConfig, navContent, blogIndexRoute, blogPostRoute, testPost, sitemap] =
  await Promise.all([
    readFile(new URL("../src/content.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/data/siteContent.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/blog.astro", import.meta.url), "utf8"),
    readFile(new URL("../src/pages/blog/[slug].astro", import.meta.url), "utf8"),
    readFile(
      new URL(
        "../src/content/blog/build-for-the-world-start-with-the-problem.md",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(new URL("../src/pages/sitemap.xml.ts", import.meta.url), "utf8"),
  ]);

test("blog navigation sits between resources and contact", () => {
  assert.match(
    navContent,
    /id: "resources"[\s\S]+id: "blog"[\s\S]+id: "contact"/,
  );
});

test("blog is backed by validated Markdown content", () => {
  assert.match(contentConfig, /base: "\.\/src\/content\/blog"/);
  assert.match(contentConfig, /publishedAt: z\.coerce\.date\(\)/);
  assert.match(testPost, /^---[\s\S]+title: Build for the world, start with the problem/);
  assert.match(testPost, /\n## Start with a sharp problem\n/);
});

test("blog index and post routes render the collection", () => {
  assert.match(blogIndexRoute, /getCollection\("blog"/);
  assert.match(blogPostRoute, /getStaticPaths/);
  assert.match(blogPostRoute, /await render\(post\)/);
  assert.match(sitemap, /getCollection\("blog"/);
});
