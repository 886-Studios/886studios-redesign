import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const content = await readFile(
  new URL("../src/data/siteContent.ts", import.meta.url),
  "utf8",
);
const mercuryLogo = await readFile(
  new URL("../public/assets/logos/mercury.svg", import.meta.url),
  "utf8",
);

test("resource perks stay alphabetized within each category", () => {
  const perks = content.slice(
    content.indexOf("    perks: {"),
    content.indexOf("  about: {"),
  );
  const categories = [...perks.matchAll(/title: "([^"]+)",\n\s+items: \[([\s\S]*?)\n\s+\],/g)];

  assert.equal(categories.length, 4);

  for (const [, category, items] of categories) {
    const labels = [...items.matchAll(/label: "([^"]+)"/g)].map((match) => match[1]);
    const sortedLabels = [...labels].sort((a, b) => a.localeCompare(b));

    assert.deepEqual(labels, sortedLabels, `${category} perks are not alphabetized`);
  }
});

test("OpenAI is listed as an Engineering perk without publishing the credit amount", () => {
  const engineering = content.slice(
    content.indexOf('title: "Engineering"'),
    content.indexOf("          ],", content.indexOf('title: "Engineering"')),
  );

  assert.match(engineering, /label: "OpenAI"/);
  assert.match(engineering, /href: "https:\/\/openai\.com\/startups"/);
  assert.match(engineering, /logoSrc: "\/assets\/logos\/openai\.svg"/);
  assert.doesNotMatch(engineering, /5\s*k|5,000|5000/i);
});

test("Mercury uses a compact, high-contrast mark for the perks icon slot", () => {
  assert.match(content, /logoSrc: "\/assets\/logos\/mercury\.svg"/);
  assert.match(mercuryLogo, /viewBox="43\.5 8 13\.5 16"/);
  assert.match(mercuryLogo, /fill="#f4f5f9"/);
  assert.equal((mercuryLogo.match(/<path\b/g) ?? []).length, 1);
  assert.doesNotMatch(mercuryLogo, /prefers-color-scheme|viewBox="0 0 500 500"/);
});
