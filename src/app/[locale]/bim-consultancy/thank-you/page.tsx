import type { Metadata } from "next";
import { Locale } from "@/lib/i18n";
import { getConsultancyContent } from "@/components/bim-consultancy/content";
import ThankYou from "@/components/bim-consultancy/ThankYou";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const { metaTitle, metaDescription } = getConsultancyContent(loc).thanks;

  return {
    title: metaTitle,
    description: metaDescription,
    // Conversion page: it must never be indexed nor become an entry point
    // from organic search. It is also kept out of the sitemap.
    robots: { index: false, follow: false },
    alternates: { canonical: `/${loc}/bim-consultancy/thank-you` },
  };
}

export default async function BimConsultancyThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  return (
    <ThankYou
      content={getConsultancyContent(loc)}
      landingHref={`/${loc}/bim-consultancy`}
    />
  );
}
