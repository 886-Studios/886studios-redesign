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

test("contact page uses the shared hero and understated action links without location details", () => {
  assert.match(content, /title: "Let’s build together"/);
  assert.match(content, /label: "Founders"/);
  assert.match(content, /title: "Building an ambitious startup"/);
  assert.doesNotMatch(content, /Whether you’re building a company/);
  assert.doesNotMatch(content, /label: "Based in"/);
  assert.equal((component.match(/class="contact-action-link"/g) ?? []).length, 3);
  assert.doesNotMatch(component, /class="btn-pri"/);
  assert.match(
    component,
    /class="contact-action-link" href=\{contact\.general\.href\}>\s+Contact us/,
  );
  assert.doesNotMatch(component, /contact\.lead/);
  assert.doesNotMatch(component, /contact\.location/);
});

test("contact page presents Discord as a secondary community path", () => {
  assert.match(content, /discordCommunityUrl = "https:\/\/discord\.gg\/FGcEHJyB3F"/);
  assert.match(content, /title: "Join our Discord community"/);
  assert.match(content, /cta: "Join us on Discord"/);
  assert.match(component, /class="section-tag contact-path-label">\{contact\.community\.label\}/);
  assert.match(component, /class="contact-path-title" id="contact-community-title"/);
  assert.match(component, /class="sr-only">Discord<\/span>/);
  assert.match(component, /class="contact-community-title-icon"[^>]*aria-hidden="true"/);
  assert.match(component, /class="contact-path-copy">\{contact\.community\.description\}/);
  assert.match(
    component,
    /<a\s+class="contact-action-link"\s+href=\{contact\.community\.href\}/,
  );
  assert.match(component, /href=\{contact\.community\.href\}/);
});

test("contact page keeps the primary routes before the secondary community path", () => {
  assert.match(
    component,
    /<section class="contact-primary reveal" aria-label="Ways to contact 886 Studios">/,
  );
  assert.doesNotMatch(component, /Primary contact options/);
  assert.equal((component.match(/<h2 class="contact-path-title"/g) ?? []).length, 3);
  assert.match(component, /<section class="contact-path contact-community reveal"/);
});
