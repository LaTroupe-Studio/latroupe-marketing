"use client";
import LegalPage from "@/components/LegalPage";
import { legalEn } from "@/content/legal-en";

export default function LegalNoticePage() {
  return <LegalPage title={legalEn.legalNotice.title} content={legalEn.legalNotice.content} />;
}
