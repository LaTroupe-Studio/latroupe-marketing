/**
 * ═══════════════════════════════════════════════════════════════
 * CONFIGURACIÓN DE IDIOMAS (i18n)
 * ═══════════════════════════════════════════════════════════════
 *
 * - defaultLocale: idioma por defecto si no se detecta ninguno
 * - locales: idiomas disponibles
 *
 * El middleware de Next.js detecta el idioma del navegador del
 * usuario (cabecera Accept-Language) y redirige automáticamente
 * a /es o /en. El usuario puede cambiar manualmente con el
 * botón ES/EN del header.
 */

export const i18nConfig = {
  defaultLocale: "es" as const,
  locales: ["es", "en"] as const,
};

export type Locale = (typeof i18nConfig.locales)[number];

/**
 * Extracts the preferred locale from the Accept-Language header.
 * Falls back to defaultLocale if no match.
 */
export function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return i18nConfig.defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q] = lang.trim().split(";q=");
      return { code: code.split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of preferred) {
    if (i18nConfig.locales.includes(code as Locale)) {
      return code as Locale;
    }
  }

  return i18nConfig.defaultLocale;
}
