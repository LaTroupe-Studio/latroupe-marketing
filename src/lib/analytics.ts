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

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
