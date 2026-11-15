import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { Locale } from "@/lib/i18n";
import { getLegal, getLegalMetadata } from "@/lib/legal-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return getLegalMetadata("legalNotice", locale as Locale);
}

export default async function LegalNoticePage({ params }: Props) {
  const { locale } = await params;
  const { title, content } = getLegal(locale as Locale).legalNotice;
  return <LegalPage title={title} content={content} />;
}
