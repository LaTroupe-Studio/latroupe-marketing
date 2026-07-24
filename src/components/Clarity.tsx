"use client";

import Script from "next/script";
import { useEffect } from "react";
import {
  getConsent,
  CONSENT_EVENT,
  type ConsentValue,
} from "@/lib/consent";
import { CLARITY_ID, isClarityConfigured } from "@/lib/analytics";

function applyConsent(value: ConsentValue) {
  const granted = value === "accepted" ? "granted" : "denied";
  window.clarity?.("consentv2", {
    ad_Storage: granted,
    analytics_Storage: granted,
  });
}

/**
 * Microsoft Clarity (session recordings + heatmaps) with Consent Mode v2.
 *
 * Same approach as GoogleAnalytics.tsx: the tag loads for every visitor, but
 * the Clarity project must be set to "require cookie consent" in its
 * dashboard (Settings → Setup) so it starts in no-consent mode — no
 * first/third-party cookies, a fresh per-page-view id, no session stitching
 * — until the visitor accepts the cookie banner. Consent is applied in
 * place the moment the user answers — no reload needed.
 */
export default function Clarity() {
  useEffect(() => {
    const stored = getConsent();
    if (stored) applyConsent(stored);

    const onConsent = (e: Event) => applyConsent((e as CustomEvent<ConsentValue>).detail);
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  if (!isClarityConfigured()) return null;

  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
