"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  getConsent,
  CONSENT_EVENT,
  type ConsentValue,
} from "@/lib/consent";
import {
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  isAnalyticsConfigured,
  isGoogleAdsConfigured,
} from "@/lib/analytics";

function applyConsent(value: ConsentValue) {
  const granted = value === "accepted" ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
  });
}

/**
 * Google tag (gtag.js) with Consent Mode v2.
 *
 * The tag loads on every visit for every visitor — Google's own install
 * checker needs to see it fire to consider the tag "found", and it doesn't
 * accept the cookie banner. Storage defaults to denied, so no cookie is set
 * and no analytics/ads data is stored until the visitor accepts; Google
 * still receives cookieless, consent-aware pings in the meantime. Consent is
 * updated in place the moment the user answers the banner — no reload.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const isFirstView = useRef(true);

  useEffect(() => {
    const stored = getConsent();
    if (stored) applyConsent(stored);

    const onConsent = (e: Event) => applyConsent((e as CustomEvent<ConsentValue>).detail);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  useEffect(() => {
    // The very first view is already reported by gtag('config').
    if (isFirstView.current) {
      isFirstView.current = false;
      return;
    }
    window.gtag?.("event", "page_view", { page_path: pathname });
  }, [pathname]);

  const analyticsConfigured = isAnalyticsConfigured();
  const adsConfigured = isGoogleAdsConfigured();

  if (!analyticsConfigured && !adsConfigured) return null;

  // Either ID works as the loader src; gtag.js is shared and both tags get
  // configured below regardless of which one bootstrapped the script.
  const loaderId = analyticsConfigured ? GA_MEASUREMENT_ID : GOOGLE_ADS_ID;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          ${analyticsConfigured ? `gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });` : ""}
          ${adsConfigured ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
