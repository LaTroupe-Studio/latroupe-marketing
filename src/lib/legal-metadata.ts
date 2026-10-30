import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { legalEs } from "@/content/legal-es";
import { legalEn } from "@/content/legal-en";

const SITE_URL = "https://www.latroupestudio.com";

export type LegalSection = "privacy" | "cookies" | "legalNotice";

// Each legal page has its own slug per language. Every slug is served in both
// locales, so the canonical always points to the slug that matches the locale
// (e.g. /en/aviso-legal → /en/legal-notice), which is the one in the sitemap.
const slugs: Record<LegalSection, Record<Locale, string>> = {
  privacy: { es: "privacidad", en: "privacy" },
  cookies: { es: "cookies", en: "cookies" },
  legalNotice: { es: "aviso-legal", en: "legal-notice" },
};

export function getLegal(loc: Locale) {
  return loc === "es" ? legalEs : legalEn;
}

/**
 * Own title, description, canonical and Open Graph for a legal page, so it
 * no longer inherits the home page's metadata from the [locale] layout.
 */
export function getLegalMetadata(section: LegalSection, loc: Locale): Metadata {
  const { title: pageTitle, metaDescription: description } = getLegal(loc)[section];
  const title = `${pageTitle} · LaTroupe Studio`;
  const path = (l: Locale) => `/${l}/${slugs[section][l]}`;

  return {
    title,
    description,
    alternates: {
      canonical: path(loc),
      languages: {
        es: path("es"),
        en: path("en"),
        "x-default": path("es"),
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}${path(loc)}`,
      siteName: "LaTroupe Studio",
      locale: loc === "es" ? "es_ES" : "en_GB",
    },
  };
}
