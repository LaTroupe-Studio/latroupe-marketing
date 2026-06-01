import type { Metadata } from "next";
import { i18nConfig, Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";
import { LocaleProvider } from "@/lib/locale-context";

const SITE_URL = "https://latroupestudio.com";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const meta = {
  es: {
    title:
      "LaTroupe Studio · Apoyo técnico para estudios de arquitectura e interiorismo",
    description:
      "Ampliamos la capacidad de tu estudio de arquitectura o interiorismo integrando nuestro equipo en el tuyo: producción técnica, coordinación BIM y gestión en todas las fases del proyecto. Empecemos con una videollamada.",
  },
  en: {
    title:
      "LaTroupe Studio · Technical support for architecture and interior design studios",
    description:
      "We expand the capacity of your architecture or interior design studio by integrating our team into yours: technical production, BIM coordination and project management across every phase. Let's start with a call.",
  },
} satisfies Record<Locale, { title: string; description: string }>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const { title, description } = meta[loc];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `/${loc}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": "/es",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/${loc}`,
      siteName: "LaTroupe Studio",
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LaTroupe Studio",
    url: SITE_URL,
    logo: `${SITE_URL}/images/latroupe-logo.svg`,
    description: meta[loc].description,
    sameAs: [
      "https://www.linkedin.com/company/latroupestudio/",
      "https://www.instagram.com/latroupestudio",
      "https://www.pinterest.es/latroupestudio/",
    ],
  };

  return (
    <LocaleProvider locale={loc} content={content}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {children}
    </LocaleProvider>
  );
}
