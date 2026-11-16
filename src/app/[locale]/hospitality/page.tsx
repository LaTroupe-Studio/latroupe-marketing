"use client";

import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollColorBackground from "@/components/ScrollColorBackground";
import {
  HospitalityHero,
  HospitalityIntro,
  HospitalityLifecycle,
  HospitalityPartners,
  HospitalityProjects,
  HospitalityRole,
  HospitalityTech,
} from "@/components/hospitality/HospitalityPage";

/**
 * latroupe(hospitality): the studio as partner of hotel groups, owners and
 * design studios. Same header, contact form and footer as the home page;
 * only the body in between is specific to this page.
 */
export default function HospitalityPage() {
  return (
    <>
      <ScrollColorBackground />
      <Header />
      <HospitalityHero />
      <HospitalityIntro />
      <HospitalityRole />
      <HospitalityPartners />
      <HospitalityLifecycle />
      <HospitalityTech />
      <HospitalityProjects />
      <ContactForm />
      <Footer />
    </>
  );
}
