"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getConsent,
  CONSENT_EVENT,
  type ConsentValue,
} from "@/lib/consent";
import { GA_MEASUREMENT_ID, isAnalyticsConfigured } from "@/lib/analytics";

/**
 * Consent-gated Google Analytics.
 *
 * gtag.js is NOT loaded until the user explicitly accepts cookies (strict
 * AEPD/GDPR compliance). It activates immediately on accept — via the
 * consent event — and also on next visits where consent is already stored.
 * The initial page_view is sent by gtag's `config`; subsequent App Router
 * navigations are tracked manually.
 */
export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();
  const isFirstView = useRef(true);

  useEffect(() => {
    if (getConsent() === "accepted") setEnabled(true);

    const onConsent = (e: Event) => {
      if ((e as CustomEvent<ConsentValue>).detail === "accepted") {
        setEnabled(true);
      }
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    // The very first view is already reported by gtag('config').
    if (isFirstView.current) {
      isFirstView.current = false;
      return;
    }
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [enabled, pathname]);

  if (!isAnalyticsConfigured() || !enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
