"use client";
import { useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useContent } from "@/lib/locale-context";
import { i18nConfig, Locale } from "@/lib/i18n";
import styles from "./Header.module.css";

/**
 * Header for the BIM management landing. Mirrors the main Header layout
 * (fixed grid columns so labels don't shift between ES/EN) but the logo
 * links back to the home page and nav anchors to landing sections.
 */
export default function BimHeader({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const { content, locale } = useContent();
  const nav = content.bim.nav;
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (id: string) => {
    if (onNavigate) onNavigate(id);
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const switchLocale = useCallback((newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    const segments = pathname.split("/"); segments[1] = newLocale;
    router.push(segments.join("/"));
  }, [pathname, router]);

  return (
    <header className={styles.header}>
      <div className={`grid-container ${styles.gridRow}`}>
        <div className={styles.logoCell}>
          <Link href={nav.home.id} className={styles.logoButton} aria-label="latroupe">
            <Logo color="currentColor" width={160} />
          </Link>
        </div>
        <div className={styles.navCol7}>
          <button className={styles.navLink} onClick={() => handleClick(nav.links[0].id)}>
            {nav.links[0]?.label}
          </button>
        </div>
        <div className={styles.navCol8}>
          <button className={styles.navLink} onClick={() => handleClick(nav.links[1].id)}>
            {nav.links[1]?.label}
          </button>
        </div>
        <div className={styles.navCol10}>
          <button className={styles.navLink} onClick={() => handleClick(nav.contact.id)}>
            {nav.contact.label}
          </button>
        </div>
        <div className={styles.navCol12}>
          {i18nConfig.locales.map((loc, i) => (
            <span key={loc}>
              <button className={styles.langBtn} onClick={() => switchLocale(loc)} style={{ opacity: loc === locale ? 1 : 0.45, fontWeight: loc === locale ? 700 : 400 }}>
                {loc.toUpperCase()}
              </button>
              {i < i18nConfig.locales.length - 1 && <span className={styles.langSep}>|</span>}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
