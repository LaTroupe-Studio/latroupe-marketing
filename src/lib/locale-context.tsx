"use client";

import { createContext, useContext, ReactNode } from "react";
import { SiteContent } from "@/content/types";
import { Locale } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  content: SiteContent;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Provider that makes content and locale available to all client components.
 * Wraps the page layout so every component can access translations via useContent().
 */
export function LocaleProvider({
  locale,
  content,
  children,
}: {
  locale: Locale;
  content: SiteContent;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, content }}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * Hook to access the current locale's content from any client component.
 *
 * Usage:
 *   const { content, locale } = useContent();
 *   <h1>{content.hero.prefix}</h1>
 */
export function useContent(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useContent must be used within a <LocaleProvider>");
  }
  return ctx;
}
