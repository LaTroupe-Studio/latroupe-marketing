"use client";

import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollColorBackground from "@/components/ScrollColorBackground";
import { TechHero, TechIntro, TechManifesto, TechSoon, TechTools } from "@/components/tech/TechPage";

/**
 * latroupe(tech): the studio's own tools. Same header, contact form and footer
 * as the home page; only the body in between is specific to this page.
 */
export default function TechPage() {
  return (
    <>
      <ScrollColorBackground />
      <Header />
      <TechHero />
      <TechIntro />
      <TechTools />
      <TechSoon />
      <TechManifesto />
      {/* Visitors here come for the tools: the form opens on "one of our products". */}
      <ContactForm defaultReason="product" />
      <Footer />
    </>
  );
}
