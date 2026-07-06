"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContent } from "@/lib/locale-context";
import { getConsent, setConsent, type ConsentValue } from "@/lib/consent";
import styles from "./CookieConsent.module.css";

/**
 * GDPR/LSSI-compliant cookie consent banner.
 * Non-essential scripts (e.g. analytics) must only run after the user
 * accepts here. Choice is stored for a year in a first-party cookie and
 * broadcast via the consent event so analytics can start immediately.
 */
export default function CookieConsent() {
  const { content, locale } = useContent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const banner = content.cookieBanner;

  const decide = (value: ConsentValue) => {
    setConsent(value);
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
