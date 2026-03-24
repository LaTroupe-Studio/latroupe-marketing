"use client";
import LegalPage from "@/components/LegalPage";
import { legalEs } from "@/content/legal-es";

export default function AvisoLegalPage() {
  return <LegalPage title={legalEs.legalNotice.title} content={legalEs.legalNotice.content} />;
}
