"use client";
import LegalPage from "@/components/LegalPage";
import { legalEn } from "@/content/legal-en";

export default function PrivacyPage() {
  return <LegalPage title={legalEn.privacy.title} content={legalEn.privacy.content} />;
}
