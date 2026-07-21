import Anthropic from "@anthropic-ai/sdk";
import { composeSystemPrompt, LEAD_FORM_MARKER } from "./prompt.mjs";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
const MAX_MESSAGE_LEN = 4000;
const MAX_TURNS = 12;

const FALLBACK_REPLY = {
  es: "Ahora mismo no puedo responder, pero cuéntame lo que necesitas y os contactamos enseguida.",
  en: "I can't reply right now, but tell me what you need and we'll get back to you shortly.",
};

const DEFAULT_OPTIONS = {
  es: ["Que me contactéis", "Ver servicios", "Hablar con el equipo"],
  en: ["Get in touch", "See services", "Talk to the team"],
};

/** CORS lo aplica la Function URL (consola); no devolver Access-Control-* aquí o el navegador ve cabeceras duplicadas y falla CORS. */
const JSON_HEADERS = { "Content-Type": "application/json" };

let anthropicClient = null;
function getAnthropic() {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!anthropicClient) {
    anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return anthropicClient;
}

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

function normalizeLocale(locale) {
  return locale === "en" ? "en" : "es";
}

function trim(str, max) {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, max);
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: trim(m.content, MAX_MESSAGE_LEN) }));
}

function parseReply(rawText) {
  let text = rawText;
  let shouldOpenLeadForm = false;

  if (text.includes(LEAD_FORM_MARKER)) {
    shouldOpenLeadForm = true;
    text = text.split(LEAD_FORM_MARKER).join("");
  }

  let options = [];
  const optionsMatch = text.match(/\[OPTIONS:\s*([^\]]+)\]/i);
  if (optionsMatch) {
    options = optionsMatch[1]
      .split("|")
      .map((o) => o.trim())
      .filter(Boolean);
    text = text.replace(optionsMatch[0], "");
  }

  return { text: text.trim(), options, shouldOpenLeadForm };
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

  const locale = normalizeLocale(body.locale);
  const pagePath = trim(body.pagePath, 200);
  const message = trim(body.message, MAX_MESSAGE_LEN);

  if (!message) {
    return {
      statusCode: 400,
      headers: JSON_HEADERS,
      body: JSON.stringify({ ok: false, error: "Missing message" }),
    };
  }

  const history = sanitizeHistory(body.history);
  const messages = [...history, { role: "user", content: message }];

  const anthropic = getAnthropic();
  if (!anthropic) {
    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        ok: true,
        reply: FALLBACK_REPLY[locale],
        options: DEFAULT_OPTIONS[locale],
        shouldOpenLeadForm: true,
      }),
    };
  }

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 300,
      system: composeSystemPrompt({ locale, pagePath }),
      messages,
    });

    const rawText = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    const { text, options, shouldOpenLeadForm } = parseReply(rawText);

    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        ok: true,
        reply: text || FALLBACK_REPLY[locale],
        options: options.length ? options : DEFAULT_OPTIONS[locale],
        shouldOpenLeadForm,
      }),
    };
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return {
        statusCode: 429,
        headers: JSON_HEADERS,
        body: JSON.stringify({ ok: false, error: "Rate limited" }),
      };
    }

    console.error(err);
    return {
      statusCode: 200,
      headers: JSON_HEADERS,
      body: JSON.stringify({
        ok: true,
        reply: FALLBACK_REPLY[locale],
        options: DEFAULT_OPTIONS[locale],
        shouldOpenLeadForm: true,
      }),
    };
  }
};
