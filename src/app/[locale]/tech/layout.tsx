import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { getTechContent } from "@/components/tech/content";

const SITE_URL = "https://www.latroupestudio.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const { title, description } = getTechContent(loc).meta;

  return {
    title,
    description,
    alternates: {
      canonical: `/${loc}/tech`,
      languages: { es: "/es/tech", en: "/en/tech", "x-default": "/es/tech" },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/${loc}/tech`,
      siteName: "latroupe()",
      locale: loc === "es" ? "es_ES" : "en_GB",
    },
  };
}

export default function TechLayout({ children }: { children: React.ReactNode }) {
  return children;
}
