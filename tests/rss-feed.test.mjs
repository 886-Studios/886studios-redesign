import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const socialContent = await readFile(
  new URL("../src/data/siteContent.ts", import.meta.url),
  "utf8",
);
const socialComponent = await readFile(
  new URL("../src/components/SocialLinks.astro", import.meta.url),
  "utf8",
);
const layout = await readFile(
  new URL("../src/layouts/BaseLayout.astro", import.meta.url),
  "utf8",
);
const feedRoute = await readFile(
  new URL("../src/pages/rss.xml.ts", import.meta.url),
  "utf8",
);
const blogLoader = await readFile(
  new URL("../src/lib/blog.ts", import.meta.url),
  "utf8",
);

test("RSS is the last footer social link", () => {
  const rssPosition = socialContent.indexOf('platform: "rss"');
  const socialListEnd = socialContent.indexOf("] as const;", rssPosition);

  assert.notEqual(rssPosition, -1);
  assert.notEqual(socialListEnd, -1);
  assert.doesNotMatch(
    socialContent.slice(rssPosition, socialListEnd),
    /platform:\s*"(?!rss)[^"]+"/,
  );
  assert.match(socialContent.slice(rssPosition, socialListEnd), /href:\s*"\/rss\.xml"/);
});

test("RSS link uses a labelled, style-matched icon and stays in the current tab", () => {
  assert.match(socialContent, /Subscribe to the 886 Studios blog RSS feed/);
  assert.match(socialComponent, /link\.platform === "rss"/);
  assert.match(socialComponent, /target=\{link\.platform === "rss" \? undefined : "_blank"\}/);
  assert.match(socialComponent, /<svg viewBox="0 0 24 24" aria-hidden="true">/);
});

test("pages advertise the RSS feed for reader auto-discovery", () => {
  assert.match(
    layout,
    /rel="alternate"[\s\S]*type="application\/rss\+xml"[\s\S]*href=\{`\$\{siteConfig\.url\}\/rss\.xml`\}/,
  );
});

test("RSS items include the complete article HTML", () => {
  assert.match(feedRoute, /content:\s*post\.contentHtml/);
  assert.match(blogLoader, /contentHtml:\s*entry\.rendered\?\.html/);
});
