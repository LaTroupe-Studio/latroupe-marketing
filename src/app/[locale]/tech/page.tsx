"use client";

import { useEffect } from "react";

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
  // Browsers that keep a visible scrollbar paint its track light grey, which
  // showed as a pale strip down the right edge of these dark bands. A
  // transparent track lets each section's colour run to the edge. Only on
  // this page, and undone when leaving it.
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollbarColor;
    root.style.scrollbarColor = "rgba(236, 230, 227, 0.35) transparent";
    return () => {
      root.style.scrollbarColor = previous;
    };
  }, []);

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
