import assert from "node:assert/strict";
import test from "node:test";

import { createContactHandler } from "../api/contact.js";

const validPayload = {
  name: "Test Founder",
  email: "founder@example.com",
  subject: "Partnership",
  message: "I'd like to learn more about working with 886 Studios.",
  company: "",
};

function request(payload = validPayload, method = "POST") {
  return new Request("https://www.886studios.com/api/contact", {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method === "POST" ? JSON.stringify(payload) : undefined,
  });
}

test("rejects methods other than POST", async () => {
  const handler = createContactHandler();
  const response = await handler(request(undefined, "GET"));

  assert.equal(response.status, 405);
});

test("rejects invalid contact details without calling the provider", async () => {
  let providerCalled = false;
  const handler = createContactHandler({
    env: { RESEND_API_KEY: "re_test" },
    fetchImpl: async () => {
      providerCalled = true;
      return Response.json({ id: "email_123" });
    },
  });

  const response = await handler(
    request({ ...validPayload, email: "not-an-email" }),
  );

  assert.equal(response.status, 400);
  assert.equal(providerCalled, false);
});

test("silently accepts honeypot submissions without sending an email", async () => {
  let providerCalled = false;
  const handler = createContactHandler({
    env: { RESEND_API_KEY: "re_test" },
    fetchImpl: async () => {
      providerCalled = true;
      return Response.json({ id: "email_123" });
    },
  });

  const response = await handler(
    request({ ...validPayload, company: "spam.example" }),
  );

  assert.equal(response.status, 200);
  assert.equal(providerCalled, false);
});

test("returns a configuration error when the email API key is missing", async () => {
  const handler = createContactHandler({ env: {} });
  const response = await handler(request());

  assert.equal(response.status, 503);
});

test("sends a validated message to the default team inbox", async () => {
  let providerRequest;
  const handler = createContactHandler({
    env: {
      RESEND_API_KEY: "re_test",
      CONTACT_FROM_EMAIL: "Website <website@886studios.com>",
    },
    fetchImpl: async (url, options) => {
      providerRequest = { url, options };
      return Response.json({ id: "email_123" });
    },
  });

  const response = await handler(request());
  const providerBody = JSON.parse(providerRequest.options.body);

  assert.equal(response.status, 200);
  assert.equal(providerRequest.url, "https://api.resend.com/emails");
  assert.deepEqual(providerBody.to, ["it@886studios.com"]);
  assert.equal(providerBody.from, "Website <website@886studios.com>");
  assert.equal(providerBody.reply_to, "founder@example.com");
  assert.equal(providerBody.subject, "Website contact: Partnership");
  assert.match(providerBody.text, /Test Founder/);
  assert.match(providerBody.html, /New website contact/);
});

test("does not report success when the email provider rejects delivery", async () => {
  const handler = createContactHandler({
    env: { RESEND_API_KEY: "re_test" },
    fetchImpl: async () =>
      Response.json({ message: "Provider rejected request" }, { status: 422 }),
  });

  const response = await handler(request());

  assert.equal(response.status, 502);
});
