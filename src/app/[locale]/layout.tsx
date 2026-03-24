import type { Metadata } from "next";
import { i18nConfig, Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { LocaleProvider } from "@/lib/locale-context";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const content = await getDictionary(loc);

  const title =
    loc === "es"
      ? "latroupe — Producimos contigo"
      : "latroupe — We produce with you";

  return {
    title,
    description: content.hero.description,
    openGraph: {
      title,
      description: content.hero.description,
      type: "website",
      locale: loc === "es" ? "es_ES" : "en_GB",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;
  const content = await getDictionary(loc);

  return (
    <LocaleProvider locale={loc} content={content}>
      {children}
    </LocaleProvider>
  );
}
