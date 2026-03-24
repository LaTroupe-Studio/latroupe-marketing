"use client";

import { useCallback } from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsGrid from "@/components/ProjectsGrid";
import TrustLogos from "@/components/TrustLogos";
import Methodology from "@/components/Methodology";
import WhyUs from "@/components/WhyUs";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  const handleNavigate = useCallback((id: string) => {
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <Header onNavigate={handleNavigate} />
      <Hero />
      <About />
      {/* Projects are shown but not clickable — overlay is preserved in
          ProjectOverlay.tsx for when content is ready. To re-enable:
          1. Import ProjectOverlay and useState
          2. Add state + handler like before
          3. Set inDevelopment:false on ready projects in content files */}
      <ProjectsGrid onProjectClick={() => {}} />
      <TrustLogos />
      <Methodology />
      <WhyUs />
      <ContactForm />
      <Footer />
    </>
  );
}
