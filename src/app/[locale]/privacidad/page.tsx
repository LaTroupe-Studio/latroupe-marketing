"use client";
import LegalPage from "@/components/LegalPage";
import { useContent } from "@/lib/locale-context";
import { legalEs } from "@/content/legal-es";
import { legalEn } from "@/content/legal-en";

export default function PrivacidadPage() {
  const { locale } = useContent();
  const legal = locale === "es" ? legalEs : legalEn;
  return <LegalPage title={legal.privacy.title} content={legal.privacy.content} />;
}
