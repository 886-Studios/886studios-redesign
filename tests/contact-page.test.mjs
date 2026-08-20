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
  assert.equal(
    (component.match(/href=\{contact\.general\.href\}/g) ?? []).length,
    1,
  );
  assert.match(component, /href=\{contact\.founders\.href\}/);
  assert.doesNotMatch(component, /<form[\s>]/);
  assert.doesNotMatch(component, /\/api\/contact/);
});

test("contact page uses the shared hero and primary CTA without location details", () => {
  assert.match(content, /title: "Let’s build together"/);
  assert.match(content, /title: "Building an ambitious startup"/);
  assert.doesNotMatch(content, /Whether you’re building a company/);
  assert.doesNotMatch(content, /label: "Based in"/);
  assert.equal((component.match(/class="btn-pri"/g) ?? []).length, 2);
  assert.match(
    component,
    /class="btn-pri" href=\{contact\.general\.href\}>Contact us<\/a>/,
  );
  assert.doesNotMatch(component, /contact\.lead/);
  assert.doesNotMatch(component, /contact\.location/);
});
