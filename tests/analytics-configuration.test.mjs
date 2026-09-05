import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/config/deployment.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exports = {};
new Function("exports", compiled)(exports);

test("analytics require a Vercel production deployment, not just a production build", () => {
  const { isProductionDeployment } = exports;
  for (const environment of [
    {},
    { PROD: false },
    { PROD: true },
    { PROD: true, VERCEL: "1" },
    { PROD: true, VERCEL: "1", VERCEL_ENV: "preview" },
    { PROD: true, VERCEL: "1", VERCEL_ENV: "development" },
    { PROD: false, VERCEL: "1", VERCEL_ENV: "production" },
    { PROD: true, VERCEL_ENV: "production" },
  ]) assert.equal(isProductionDeployment(environment), false);
  assert.equal(isProductionDeployment({ PROD: true, VERCEL: "1", VERCEL_ENV: "production" }), true);
});

test("external Google initialization preserves queued events and configures the existing ID", async () => {
  const script = await readFile(new URL("../src/scripts/google-analytics.js", import.meta.url), "utf8");
  const queued = { event: "existing-event" };
  const window = { dataLayer: [queued] };
  vm.runInNewContext(script, { window, document: { currentScript: { dataset: { googleAnalyticsId: "G-TEST" } } } });
  assert.equal(window.dataLayer[0], queued);
  assert.equal(window.dataLayer[1][0], "js");
  assert.deepEqual(Array.from(window.dataLayer[2]), ["config", "G-TEST"]);
  window.gtag("event", "application_started");
  assert.deepEqual(Array.from(window.dataLayer[3]), ["event", "application_started"]);
  const disabled = {};
  vm.runInNewContext(script, { window: disabled, document: { currentScript: null } });
  assert.deepEqual(disabled, {});
});

test("404 analytics use the requested URL while preserving conversion events", async () => {
  const script = await readFile(new URL("../src/scripts/vercel-analytics-path.js", import.meta.url), "utf8");
  const window = { location: { pathname: "/missing-page" } };
  vm.runInNewContext(script, { window });
  const pageview = window.webAnalyticsBeforeSend({ type: "pageview", url: "/404", route: "/404" });
  assert.equal(pageview.url, "/missing-page");
  assert.equal(pageview.route, "/404");
  const conversion = { type: "event", name: "application_started" };
  assert.equal(window.webAnalyticsBeforeSend(conversion), conversion);
});
