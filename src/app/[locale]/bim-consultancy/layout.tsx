import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { getConsultancyContent } from "@/components/bim-consultancy/content";
import "./consultancy.css";

const SITE_URL = "https://latroupestudio.com";

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
        "x-default": "/es/bim-consultancy",
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

export default function BimConsultancyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
