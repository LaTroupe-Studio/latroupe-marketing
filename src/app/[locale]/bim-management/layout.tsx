import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionary";

const SITE_URL = "https://latroupestudio.com";

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export const dynamicParams = false;

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
      canonical: "/en/bim-management",
      languages: {
        en: "/en/bim-management",
        "x-default": "/en/bim-management",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/en/bim-management`,
      siteName: "LaTroupe Studio",
      locale: "en_GB",
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
