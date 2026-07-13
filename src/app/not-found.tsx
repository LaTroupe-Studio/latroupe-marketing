"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { roobert, roobertMono } from "./fonts";
import LogoText from "@/components/LogoText";
import "./globals.css";
import styles from "./NotFound.module.css";

/**
 * Página 404 GLOBAL → se exporta como out/404.html.
 *
 * En producción (export estático en S3) CloudFront sirve este archivo para
 * cualquier ruta no encontrada (403/404), así que no conoce el idioma: se
 * detecta en cliente con navigator.language y puede cambiarse con el toggle.
 *
 * Es autocontenida (renderiza su propio <html>/<body>) porque el sitio usa
 * layouts de grupo de ruta y no hay un root layout compartido.
 *
 * Concepto (ref. toyfight.co): un "explorador de archivos" perdido —
 * carpetas dispersas con sabor de estudio (Proyectos, Planos, Render…) y un
 * titular jugón. Todo en marca: Roobert + Roobert Mono, terracota + papel.
 */

type Locale = "es" | "en";

type Folder = {
  /** etiqueta de la carpeta */
  label: string;
  /** posición dispersa (estilo "escritorio desordenado") */
  style: React.CSSProperties;
};

const FOLDERS: Folder[] = [
  { label: "01. Proyectos", style: { top: "13%", right: "24%", "--rot": "-3deg" } as React.CSSProperties },
  { label: "02. Planos", style: { top: "27%", right: "7%", "--rot": "2.5deg" } as React.CSSProperties },
  { label: "Misc", style: { top: "47%", right: "17%", "--rot": "-4deg" } as React.CSSProperties },
  { label: "03. Render", style: { top: "63%", right: "8%", "--rot": "2deg" } as React.CSSProperties },
  { label: "BIM", style: { bottom: "23%", right: "27%", "--rot": "3.5deg" } as React.CSSProperties },
  { label: "04. Obra", style: { bottom: "11%", right: "13%", "--rot": "-2deg" } as React.CSSProperties },
];

const COPY = {
  es: {
    eyebrow: "error 404",
    line1: "Oh, vaya.",
    line2: "Esto no está",
    accent: "en los planos.",
    body: "El enlace que buscas no existe o se ha movido a otra fase del proyecto.",
    cta: "Volver al inicio",
  },
  en: {
    eyebrow: "error 404",
    line1: "Oh, dear.",
    line2: "This isn't",
    accent: "on the blueprints.",
    body: "The link you're looking for doesn't exist or moved to another project phase.",
    cta: "Back home",
  },
} satisfies Record<Locale, Record<string, string>>;

function FolderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M1.5 4.2c0-.66.54-1.2 1.2-1.2h3.4c.4 0 .77.2 1 .53l.74 1.07h7.46c.66 0 1.2.54 1.2 1.2v7.8c0 .66-.54 1.2-1.2 1.2H2.7c-.66 0-1.2-.54-1.2-1.2V4.2Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export default function NotFound() {
  const [locale, setLocale] = useState<Locale>("es");

  // Detecta el idioma del navegador en cliente (el HTML estático nace en ES).
  useEffect(() => {
    if (navigator.language?.toLowerCase().startsWith("en")) setLocale("en");
  }, []);

  const t = COPY[locale];

  return (
    <html
      lang={locale}
      className={`${roobert.variable} ${roobertMono.variable}`}
    >
      <body>
        <main className={styles.page}>
          {/* ── Barra superior: wordmark + drive + toggle ── */}
          <header className={styles.topbar}>
            <div className={styles.brand}>
              <Link href="/" aria-label="latroupe">
                <LogoText color="#28170E" className={styles.logo} />
              </Link>
            </div>
            <div className={styles.langToggle}>
              <button
                type="button"
                className={locale === "es" ? styles.langActive : ""}
                onClick={() => setLocale("es")}
              >
                ES
              </button>
              <span aria-hidden>/</span>
              <button
                type="button"
                className={locale === "en" ? styles.langActive : ""}
                onClick={() => setLocale("en")}
              >
                EN
              </button>
            </div>
          </header>

          {/* ── Carpetas dispersas (escritorio desordenado) ── */}
          <div className={styles.folders} aria-hidden>
            {FOLDERS.map((f) => (
              <div key={f.label} className={styles.folder} style={f.style}>
                <FolderIcon />
                <span>{f.label}</span>
                <span className={styles.dots}>⋮</span>
              </div>
            ))}
          </div>

          {/* ── Contenido central ── */}
          <div className={styles.inner}>
            <p className={styles.eyebrow}>{t.eyebrow}</p>

            <h1 className={styles.heading}>
              <span className={styles.line}>{t.line1}</span>
              <span className={styles.line}>{t.line2}</span>
              <span className={`${styles.line} ${styles.accent}`}>
                {t.accent}
              </span>
            </h1>

            <p className={styles.body}>{t.body}</p>

            <Link href="/" className={styles.cta}>
              <span className={styles.ctaArrow} aria-hidden>
                ←
              </span>
              {t.cta}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
