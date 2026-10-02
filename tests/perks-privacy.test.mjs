import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { hasPrivatePerksReference, isPrivatePerksUrl } from "../scripts/lib/private-perks.mjs";

test("the public proxy excludes both the perks root and every subpath from indexing", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  for (const source of ["/perks", "/perks/:path*"]) {
    const headers = config.headers.find(entry => entry.source === source)?.headers;
    const robots = headers?.find(header => header.key.toLowerCase() === "x-robots-tag")?.value;
    for (const rule of ["noindex", "nofollow", "noarchive", "nosnippet", "noimageindex"]) {
      assert.ok(robots?.split(/,\s*/).includes(rule), `${source}: missing ${rule}`);
    }
    assert.match(headers.find(header => header.key === "Cache-Control").value, /no-store/);
  }
});

test("private portal discovery checks cover links, aliases, feeds, and encoded URLs", () => {
  for (const url of ["/perks", "/perks/", "/perks/login", "/perks?q=cloud", "/perks#offer", "https://886studios.com/%70erks", "https://886-studios-perks.vercel.app/", "https://perks.886studios.com/"]) {
    assert.equal(isPrivatePerksUrl(url), true, url);
    assert.equal(hasPrivatePerksReference(`<a href="${url}">Perks</a>`), true, url);
  }
  for (const text of [
    "<loc>https://www.886studios.com/perks</loc>",
    "[Perks](/perks)",
    "[Perks](https://www.886studios.com/perks)",
    '{"url":"https:\\/\\/www.886studios.com\\/perks"}',
  ]) assert.equal(hasPrivatePerksReference(text), true, text);
  for (const text of ["https://partner.example/perks", "/resources#perks", "/perks-guide", "Startup perks", "https://www.886studios.com/resources"]) {
    assert.equal(isPrivatePerksUrl(text), false, text);
    assert.equal(hasPrivatePerksReference(text), false, text);
  }
});
