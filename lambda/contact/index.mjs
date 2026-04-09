import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: process.env.AWS_REGION || "eu-central-1" });

/** CORS lo aplica la Function URL (consola); no devolver Access-Control-* aquí o el navegador ve cabeceras duplicadas y falla CORS. */
const JSON_HEADERS = { "Content-Type": "application/json" };

function parseAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGIN || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function originAllowed(requestOrigin) {
  const allowed = parseAllowedOrigins();
  if (allowed.length === 0) return true;
  if (!requestOrigin) return true;
  return allowed.includes(requestOrigin);
}

const MAX = { name: 200, email: 320, message: 10000 };

function trim(str, max) {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, max);
}

export const handler = async (event) => {
  const headers = event.headers || {};
  const requestOrigin = headers.origin || headers.Origin || "";

  const method = event.requestContext?.http?.method || event.httpMethod;
  if (method === "OPTIONS") {
    return { statusCode: 204, headers: {}, body: "" };
  }

  if (method !== "POST") {
    return {
      statusCode: 405,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  }

  if (!originAllowed(requestOrigin)) {
    return {
      statusCode: 403,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "Forbidden" }),
    };
  }

  const from = process.env.SES_FROM_EMAIL;
  const to = process.env.SES_TO_EMAIL;
  if (!from || !to) {
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "Server misconfigured" }),
    };
  }

  let body;
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : event.body || "{}";
    body = JSON.parse(raw);
  } catch {
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "Invalid JSON" }),
    };
  }

  const name = trim(body.name, MAX.name);
  const email = trim(body.email, MAX.email);
  const message = trim(body.message, MAX.message);

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "Missing fields" }),
    };
  }

  const subject = `[LaTroupe contact] ${name}`;
  const text = `From: ${name} <${email}>\n\n${message}`;

  try {
    await ses.send(
      new SendEmailCommand({
        Source: from,
        Destination: { ToAddresses: [to] },
        Message: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: text, Charset: "UTF-8" },
          },
        },
        ReplyToAddresses: [email],
      }),
    );
  } catch (err) {
    console.error(err);
    return {
      statusCode: 502,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "Email failed" }),
    };
  }

  return {
    statusCode: 200,
    headers: JSON_HEADERS,
    body: JSON.stringify({ ok: true }),
  };
};
