import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const component = await readFile(
  new URL("../src/components/pages/ContactPage.astro", import.meta.url),
  "utf8",
);
const content = await readFile(
  new URL("../src/data/siteContent.ts", import.meta.url),
  "utf8",
);

test("contact page uses a direct email link instead of a submission form", () => {
  assert.match(content, /address: "it@886studios\.com"/);
  assert.match(content, /href: "mailto:it@886studios\.com"/);
  assert.doesNotMatch(component, /<form[\s>]/);
  assert.doesNotMatch(component, /\/api\/contact/);
});
