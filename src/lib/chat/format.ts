import { Locale } from "@/lib/i18n";

/**
 * Safety net for what Latty sends back.
 *
 * The same two rules live in `lambda/chat/index.mjs`, on purpose: the Lambda is
 * deployed by hand while the site ships on every merge, so neither side can be
 * the only place that enforces them. This copy also cleans up replies already
 * stored in sessionStorage from an earlier session.
 */

/** Characters that only appear in Spanish, used to spot options that slipped language. */
const SPANISH_ONLY = /[áéíóúñü¿¡]/i;

/**
 * Latty is told to answer in plain text, but the model still slips markdown in
 * now and then. The bubbles render the reply raw, so strip it before display.
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*\*([^*]+)\*\*\*/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|\s)\*([^*\n]+)\*/g, "$1$2")
    .replace(/(^|\s)_([^_\n]+)_/g, "$1$2")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .trim();
}

/**
 * Drops clickable options that came back in the wrong language — the system
 * prompt is written in Spanish, so an English session used to get the odd
 * Spanish chip. Falls back to the page's own options if too few survive, and
 * keeps a contact option on screen so the route to the lead form never
 * disappears just because one chip was dropped.
 */
export function sanitizeOptions(
  options: string[],
  locale: Locale,
  fallback: string[],
  contactOption: string,
): string[] {
  const cleaned = options.map((o) => stripMarkdown(o)).filter(Boolean);
  const kept = cleaned.filter((o) => !(locale === "en" && SPANISH_ONLY.test(o)));
  const droppedForLanguage = kept.length !== cleaned.length;
  const unique = [...new Set(kept)];

  if (unique.length < 2) return fallback;

  const hasContact = unique.some((o) => o.toLowerCase() === contactOption.toLowerCase());
  if (droppedForLanguage && !hasContact) {
    if (unique.length >= 4) unique[3] = contactOption;
    else unique.push(contactOption);
  }

  return unique.slice(0, 4);
}
