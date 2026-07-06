/**
 * Google Analytics 4 configuration.
 *
 * The Measurement ID (format G-XXXXXXXXXX) is PUBLIC — it is exposed in the
 * browser, so it is safe to keep it here in the code. Paste your real ID
 * below. While it stays empty, analytics stays completely off.
 */

export const GA_MEASUREMENT_ID = "G-0V6FK7GWNK";

export function isAnalyticsConfigured(): boolean {
  return /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
