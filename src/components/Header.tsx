"use client";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useContent } from "@/lib/locale-context";
import { i18nConfig, Locale } from "@/lib/i18n";
import styles from "./Header.module.css";

export default function Header({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const { content, locale } = useContent();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (id: string) => {
    if (onNavigate) onNavigate(id);
    else if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
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
          <button className={styles.logoButton} onClick={() => handleClick("top")} aria-label="Home">
            <Logo color="currentColor" width={160} />
          </button>
        </div>
        {/* Nav items anchored to fixed grid columns — won't shift between languages */}
        <div className={styles.navCol7}>
          <button className={styles.navLink} onClick={() => handleClick("proyectos")}>
            {content.nav.links[0]?.label}
          </button>
        </div>
        <div className={styles.navCol8}>
          <button className={styles.navLink} onClick={() => handleClick("por-que-nosotros")}>
            {content.nav.links[1]?.label}
          </button>
        </div>
        <div className={styles.navCol10}>
          <button className={styles.navLink} onClick={() => handleClick(content.nav.contact.id)}>
            {content.nav.contact.label}
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
