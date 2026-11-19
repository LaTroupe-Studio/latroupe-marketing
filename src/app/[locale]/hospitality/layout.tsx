import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { getHospitalityContent } from "@/components/hospitality/content";

const SITE_URL = "https://www.latroupestudio.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const { title, description } = getHospitalityContent(loc).meta;

  return {
    title,
    description,
    // Draft: kept out of search engines until the copy is approved. Remove
    // this line (and add the page to sitemap.ts and the header) to launch it.
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${loc}/hospitality`,
      languages: { es: "/es/hospitality", en: "/en/hospitality", "x-default": "/es/hospitality" },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/${loc}/hospitality`,
      siteName: "latroupe()",
      locale: loc === "es" ? "es_ES" : "en_GB",
    },
  };
}

export default function HospitalityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
