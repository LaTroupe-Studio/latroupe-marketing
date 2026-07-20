"use client";

import { useCallback } from "react";

import BimHeader from "@/components/BimHeader";
import BimHero from "@/components/BimHero";
import BimTrustBand from "@/components/BimTrustBand";
import BimServices from "@/components/BimServices";
import BimDeliverables from "@/components/BimDeliverables";
import BimAdapts from "@/components/BimAdapts";
import BimRiba from "@/components/BimRiba";
import BimStandards from "@/components/BimStandards";
import BimWhy from "@/components/BimWhy";
import BimTools from "@/components/BimTools";
import BimCaseStudy from "@/components/BimCaseStudy";
import BimFaq from "@/components/BimFaq";
import BimContactSection from "@/components/BimContactSection";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function BimManagementPage() {
  const handleNavigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className={styles.root}>
        <BimHeader />
        <BimHero onCta={handleNavigate} />
        <BimTrustBand />
        <BimServices />
        <BimDeliverables />
        <BimAdapts />
        <BimRiba />
        <BimStandards />
        <BimWhy />
        <BimTools />
        <BimCaseStudy />
        <BimFaq />
        <BimContactSection />
      </div>
      <Footer />
    </>
  );
}
