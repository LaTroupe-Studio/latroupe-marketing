/**
 * Loads the content dictionary for a given locale.
 * This runs server-side so it can use dynamic imports.
 */

import { Locale } from "@/lib/i18n";
import { SiteContent } from "./types";

const dictionaries: Record<Locale, () => Promise<{ default: SiteContent }>> = {
  es: () => import("./es"),
  en: () => import("./en"),
};

export async function getDictionary(locale: Locale): Promise<SiteContent> {
  const mod = await dictionaries[locale]();
  return mod.default;
}
