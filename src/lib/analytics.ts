/**
 * Google Analytics 4 configuration.
 *
 * The Measurement ID (format G-XXXXXXXXXX) is PUBLIC — it is exposed in the
 * browser. It is injected per environment at build time via the
 * NEXT_PUBLIC_GA_MEASUREMENT_ID env var (set in the deploy workflows), so
 * staging and production report to separate GA4 properties. While it stays
 * empty (e.g. local dev), analytics stays completely off.
 */

export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "").trim();

export function isAnalyticsConfigured(): boolean {
  return /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);
}

/**
 * Google Ads conversion tracking (format AW-XXXXXXXXX).
 *
 * There is a single Ads account, so — unlike the GA4 ID — this is only ever
 * set for Production. It stays empty on staging/local, so conversion events
 * never fire outside of real traffic.
 */
export const GOOGLE_ADS_ID = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "").trim();

export function isGoogleAdsConfigured(): boolean {
  return /^AW-[0-9]+$/.test(GOOGLE_ADS_ID);
}

/**
 * Microsoft Clarity project ID (short alphanumeric code, e.g. xqldsf5r3p).
 *
 * PUBLIC — exposed in the browser, injected per environment at build time
 * via NEXT_PUBLIC_CLARITY_ID (set in the deploy workflows). While it stays
 * empty (e.g. local dev), Clarity stays completely off. Same project id is
 * currently used for both staging and production.
 */
export const CLARITY_ID = (process.env.NEXT_PUBLIC_CLARITY_ID ?? "").trim();

export function isClarityConfigured(): boolean {
  return /^[a-z0-9]+$/i.test(CLARITY_ID);
}

const LEAD_FORM_CONVERSION_LABEL = "TsAxCMqZkNQcEPjkjalE";

/**
 * Reports the "Submit lead form" Google Ads conversion goal.
 *
 * Fires unconditionally — Consent Mode (see GoogleAnalytics.tsx) decides
 * whether this turns into a stored, cookie-based conversion or a
 * cookieless/modeled one depending on the visitor's consent state.
 */
export function trackLeadConversion() {
  if (!isGoogleAdsConfigured()) return;
  window.gtag?.("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${LEAD_FORM_CONVERSION_LABEL}`,
    value: 1.0,
    currency: "EUR",
  });
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}
