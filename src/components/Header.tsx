"use client";
import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useContent } from "@/lib/locale-context";
import { i18nConfig, Locale } from "@/lib/i18n";
import styles from "./Header.module.css";

type HeaderTheme = "beige"|"dark"|"terracota";

export default function Header({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const { content, locale } = useContent();
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<HeaderTheme>("beige");
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; const headerH = 70;
      const aboutEl = document.getElementById("nosotros");
      const trustEl = document.getElementById("trust-section");
      const contactEl = document.getElementById("contacto");
      let newTheme: HeaderTheme = "beige";
      if (aboutEl && scrollY >= aboutEl.offsetTop - headerH && scrollY < aboutEl.offsetTop + aboutEl.offsetHeight - headerH) { newTheme = "dark"; }
      if (trustEl && scrollY >= trustEl.offsetTop - headerH && scrollY < trustEl.offsetTop + trustEl.offsetHeight - headerH) newTheme = "terracota";
      setTheme(newTheme);
      if (aboutEl) setShowLogo(scrollY > aboutEl.offsetTop - headerH);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const bgColor = theme === "dark" ? "var(--color-azul-1)" : theme === "terracota" ? "#AC6752" : "var(--color-beige-3)";
  const textColor = theme === "beige" ? "var(--color-terracota-3)" : "var(--color-beige-3)";

  return (
    <header className={styles.header} style={{ backgroundColor: bgColor, transition: "background-color 0.4s ease" }}>
      <div className={`grid-container ${styles.gridRow}`}>
        <div className={styles.logoCell} style={{ opacity: showLogo ? 1 : 0, pointerEvents: showLogo ? "auto" : "none" }}>
          <button className={styles.logoButton} onClick={() => handleClick("top")} aria-label="Home">
            <Logo color={textColor} width={160} />
          </button>
        </div>
        {/* Nav items anchored to fixed grid columns — won't shift between languages */}
        <div className={styles.navCol7}>
          <button className={styles.navLink} onClick={() => handleClick("proyectos")} style={{color:textColor}}>
            {content.nav.links[0]?.label}
          </button>
        </div>
        <div className={styles.navCol8}>
          <button className={styles.navLink} onClick={() => handleClick("por-que-nosotros")} style={{color:textColor}}>
            {content.nav.links[1]?.label}
          </button>
        </div>
        <div className={styles.navCol10}>
          <button className={styles.navLink} onClick={() => handleClick(content.nav.contact.id)} style={{color:textColor}}>
            {content.nav.contact.label}
          </button>
        </div>
        <div className={styles.navCol12}>
          {i18nConfig.locales.map((loc, i) => (
            <span key={loc}>
              <button className={styles.langBtn} onClick={() => switchLocale(loc)} style={{color:textColor, opacity:loc===locale?1:0.45, fontWeight:loc===locale?700:400}}>
                {loc.toUpperCase()}
              </button>
              {i < i18nConfig.locales.length - 1 && <span className={styles.langSep} style={{color:textColor}}>|</span>}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
