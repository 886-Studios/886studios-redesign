const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_BODY_BYTES = 20_000;
const DEFAULT_RECIPIENT = "it@886studios.com";
const DEFAULT_SENDER = "886 Studios Website <website@886studios.com>";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(body, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeField(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength + 1);
}

function validatePayload(body) {
  const name = normalizeField(body.name, 120);
  const email = normalizeField(body.email, 254);
  const subject = normalizeField(body.subject, 200).replace(/[\r\n]+/g, " ");
  const message = normalizeField(body.message, 5000);
  const company = normalizeField(body.company, 200);

  if (company) return { spam: true };

  if (
    !name ||
    name.length > 120 ||
    !EMAIL_PATTERN.test(email) ||
    email.length > 254 ||
    !subject ||
    subject.length > 200 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return { error: "Please complete every field with valid information." };
  }

  return {
    value: {
      name,
      email,
      subject,
      message,
    },
  };
}

async function readBody(request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return { error: "Request is too large.", status: 413 };
  }

  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const body = await request.json();
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        return { error: "Invalid request.", status: 400 };
      }
      return { body };
    }

    if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      return { body: Object.fromEntries(formData.entries()) };
    }
  } catch {
    return { error: "Invalid request.", status: 400 };
  }

  return { error: "Unsupported request format.", status: 415 };
}

function buildEmail({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return {
    subject: `Website contact: ${subject}`,
    text: [
      "New message from the 886 Studios website",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n"),
    html: `
      <h1>New website contact</h1>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <hr />
      <p>${safeMessage}</p>
    `,
  };
}

export function createContactHandler({
  env = process.env,
  fetchImpl = globalThis.fetch,
} = {}) {
  return async function contactHandler(request) {
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed." }, 405);
    }

    const parsed = await readBody(request);
    if (parsed.error) {
      return jsonResponse({ error: parsed.error }, parsed.status);
    }

    const validation = validatePayload(parsed.body);
    if (validation.spam) {
      return jsonResponse({ ok: true });
    }
    if (validation.error) {
      return jsonResponse({ error: validation.error }, 400);
    }

    const apiKey = env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error("Contact email delivery is not configured.");
      return jsonResponse(
        { error: "Email delivery is temporarily unavailable." },
        503,
      );
    }

    const to = (env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENT)
      .split(",")
      .map((address) => address.trim())
      .filter(Boolean);
    const from = env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_SENDER;
    const email = buildEmail(validation.value);

    try {
      const providerResponse = await fetchImpl(RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: validation.value.email,
          subject: email.subject,
          text: email.text,
          html: email.html,
        }),
        signal: AbortSignal.timeout(8_000),
      });

      if (!providerResponse.ok) {
        console.error("Contact email delivery failed.", {
          status: providerResponse.status,
        });
        return jsonResponse(
          { error: "We couldn't send your message. Please try again." },
          502,
        );
      }

      return jsonResponse({ ok: true });
    } catch (error) {
      console.error("Contact email delivery failed.", {
        message: error instanceof Error ? error.message : "Unknown error",
      });
      return jsonResponse(
        { error: "We couldn't send your message. Please try again." },
        502,
      );
    }
  };
}

export const POST = createContactHandler();
