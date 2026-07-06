import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

const SITE_URL = "https://latroupestudio.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const { title, description } = (await getDictionary(loc)).bim.meta;

  return {
    title,
    description,
    alternates: {
      canonical: `/${loc}/bim-management`,
      languages: {
        es: "/es/bim-management",
        en: "/en/bim-management",
        "x-default": "/es/bim-management",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/${loc}/bim-management`,
      siteName: "LaTroupe Studio",
      locale: loc === "es" ? "es_ES" : "en_GB",
    },
  };
}

export default function BimManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
