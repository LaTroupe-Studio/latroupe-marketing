/**
 * Shared cookie-consent state.
 *
 * The consent choice is stored in a first-party cookie for a year and
 * broadcast via a window event so other components (e.g. analytics) can
 * react the moment the user accepts or rejects — without a page reload.
 */

export const CONSENT_COOKIE = "lt_cookie_consent";
export const CONSENT_EVENT = "lt:consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export type ConsentValue = "accepted" | "rejected";

export function getConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  if (!match) return null;
  const value = match.split("=")[1];
  return value === "accepted" || value === "rejected" ? value : null;
}

export function setConsent(value: ConsentValue) {
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}
