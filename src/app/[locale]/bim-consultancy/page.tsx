"use client";

import { useContent } from "@/lib/locale-context";
import { getConsultancyContent } from "@/components/bim-consultancy/content";
import ConsultancyHeader from "@/components/bim-consultancy/ConsultancyHeader";
import Hero from "@/components/bim-consultancy/Hero";
import TrustBand from "@/components/bim-consultancy/TrustBand";
import Services from "@/components/bim-consultancy/Services";
import WhatYouGet from "@/components/bim-consultancy/WhatYouGet";
import Adapt from "@/components/bim-consultancy/Adapt";
import RibaSection from "@/components/bim-consultancy/RibaSection";
import StandardsSectors from "@/components/bim-consultancy/StandardsSectors";
import WhyTools from "@/components/bim-consultancy/WhyTools";
import CaseStudy from "@/components/bim-consultancy/CaseStudy";
import Faqs from "@/components/bim-consultancy/Faqs";
import ContactSection from "@/components/bim-consultancy/ContactSection";
import ConsultancyFooter from "@/components/bim-consultancy/ConsultancyFooter";

export default function BimConsultancyPage() {
  const { locale } = useContent();
  const content = getConsultancyContent(locale);

  return (
    <main className="bimc-root">
      <ConsultancyHeader content={content} />
      <Hero content={content} />
      <TrustBand content={content} />
      <Services content={content} />
      <WhatYouGet content={content} />
      <Adapt content={content} />
      <RibaSection content={content} />
      <StandardsSectors content={content} />
      <WhyTools content={content} />
      <CaseStudy content={content} />
      <Faqs content={content} />
      <ContactSection content={content} />
      <ConsultancyFooter content={content} />
    </main>
  );
}
