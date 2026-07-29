import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { getConsultancyContent } from "@/components/bim-consultancy/content";
import "./consultancy.css";

const SITE_URL = "https://www.latroupestudio.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const { title, description } = getConsultancyContent(loc).meta;

  return {
    title,
    description,
    alternates: {
      canonical: `/${loc}/bim-consultancy`,
      languages: {
        es: "/es/bim-consultancy",
        en: "/en/bim-consultancy",
        // The BIM offer targets the UK market, so English is the fallback
        // for visitors Google can't match to a specific locale.
        "x-default": "/en/bim-consultancy",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/${loc}/bim-consultancy`,
      siteName: "LaTroupe Studio",
      locale: loc === "es" ? "es_ES" : "en_GB",
    },
  };
}

/**
 * FAQPage structured data for the landing's own FAQ block. It complements —
 * it does not replace — the Organization/Service graph emitted by the parent
 * [locale] layout.
 */
export default async function BimConsultancyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { faqs } = getConsultancyContent(locale as Locale);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
