"use client";
import LegalPage from "@/components/LegalPage";
import { legalEs } from "@/content/legal-es";

export default function PrivacidadPage() {
  return <LegalPage title={legalEs.privacy.title} content={legalEs.privacy.content} />;
}
