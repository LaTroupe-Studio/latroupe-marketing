"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContent } from "@/lib/locale-context";
import styles from "./CookieConsent.module.css";

const CONSENT_COOKIE = "lt_cookie_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function hasConsentChoice(): boolean {
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith(`${CONSENT_COOKIE}=`));
}

function storeChoice(value: "accepted" | "rejected") {
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax`;
}

/**
 * GDPR/LSSI-compliant cookie consent banner.
 * Non-essential scripts (e.g. analytics) must only run after the user
 * accepts here. Choice is stored for a year in a first-party cookie.
 */
export default function CookieConsent() {
  const { content, locale } = useContent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasConsentChoice()) setVisible(true);
  }, []);

  if (!visible) return null;

  const banner = content.cookieBanner;

  const decide = (value: "accepted" | "rejected") => {
    storeChoice(value);
    setVisible(false);
  };

  return (
    <div className={styles.banner} role="dialog" aria-live="polite" aria-label={banner.message}>
      <p className={styles.message}>
        {banner.message}{" "}
        <Link href={`/${locale}/cookies`} className={styles.link}>
          {banner.moreInfo}
        </Link>
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.reject} onClick={() => decide("rejected")}>
          {banner.reject}
        </button>
        <button type="button" className={styles.accept} onClick={() => decide("accepted")}>
          {banner.accept}
        </button>
      </div>
    </div>
  );
}
