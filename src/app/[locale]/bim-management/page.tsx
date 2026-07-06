"use client";

import { useCallback } from "react";

import BimHeader from "@/components/BimHeader";
import BimHero from "@/components/BimHero";
import BimIntro from "@/components/BimIntro";
import BimServices from "@/components/BimServices";
import BimProcess from "@/components/BimProcess";
import BimBanner from "@/components/BimBanner";
import TrustLogos from "@/components/TrustLogos";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollColorBackground from "@/components/ScrollColorBackground";

export default function BimManagementPage() {
  const handleNavigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <ScrollColorBackground />
      <BimHeader onNavigate={handleNavigate} />
      <BimHero onCta={handleNavigate} />
      <BimIntro />
      <BimServices />
      <BimProcess />
      <TrustLogos />
      <BimBanner onCta={handleNavigate} />
      <ContactForm />
      <Footer />
    </>
  );
}
