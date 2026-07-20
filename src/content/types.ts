/**
 * Type definitions for the i18n content structure.
 * Both es.ts and en.ts must conform to this interface.
 */

import { Locale } from "@/lib/i18n";

export interface NavLink {
  label: string;
  id: string;
}

export interface ProjectImage {
  src: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  thumbnail: string;
  type?: string;
  client?: string;
  partner?: string;
  phase?: string;
  status: string;
  inDevelopment?: boolean;
  heroImage: string;
  shortDesc: string;
  longDesc: string[];
  laborTitle?: string;
  labor: string[];
  closingText?: string;
  closingText2?: string;
  images: ProjectImage[];
}

export interface TrustLogo {
  name: string;
  src: string;
}

export interface MethodologyPillar {
  number: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface BimService {
  number: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface BimDeliverable {
  number: string;
  title: string;
  text: string;
}

export interface BimAdaptItem {
  title: string;
  text: string;
}

export interface BimRibaStage {
  number: string;
  label: string;
}

export interface BimStandard {
  code: string;
  description: string;
}

export interface BimWhyItem {
  title: string;
  text: string;
}

export interface BimTool {
  name: string;
  description: string;
  img: string;
}

export interface BimCaseStudySection {
  title: string;
  items: string[];
}

export interface BimFaqItem {
  question: string;
  answer: string;
}

export interface BimContent {
  meta: { title: string; description: string };
  nav: {
    links: NavLink[];
    contact: NavLink;
    home: NavLink;
  };
  hero: {
    h1: string;
    subhead: string;
    cta: NavLink;
    ctaSub: string;
  };
  trustBand: {
    eyebrow: string;
    tagline: string;
  };
  services: {
    eyebrow: string;
    headline: string;
    sub: string;
    items: BimService[];
  };
  deliverables: {
    eyebrow: string;
    headline: string;
    sub: string;
    items: BimDeliverable[];
  };
  adapts: {
    headline: string;
    sub: string;
    items: BimAdaptItem[];
  };
  riba: {
    eyebrow: string;
    headline: string;
    caption: string;
    stages: BimRibaStage[];
  };
  standards: {
    eyebrow: string;
    headline: string;
    sub: string;
    items: BimStandard[];
  };
  sectors: {
    eyebrow: string;
    headline: string;
    items: string[];
    sub: string;
  };
  why: {
    eyebrow: string;
    headline: string;
    items: BimWhyItem[];
  };
  tools: {
    eyebrow: string;
    headline: string;
    sub: string;
    items: BimTool[];
  };
  caseStudy: {
    eyebrow: string;
    headline: string;
    heroImage: string;
    location: string;
    year: string;
    area: string;
    typology: string;
    author: string;
    endClient: string;
    intro: string;
    standards: string;
    whatWeDid: BimCaseStudySection[];
    result: string;
    imageCredit: string;
  };
  faq: {
    eyebrow: string;
    headline: string;
    items: BimFaqItem[];
  };
  header: {
    popup: {
      whoLabel: string;
      namePlaceholder: string;
      reachLabel: string;
      emailPlaceholder: string;
      projectLabel: string;
      projectPlaceholder: string;
      moreLabel: string;
      morePlaceholder: string;
      submit: string;
      legal: string;
      legalLinkPhrase: string;
      legalLinkHref: string;
      closeAriaLabel: string;
    };
  };
  ctaSection: {
    headline: string;
    sub: string;
    fields: {
      whoLabel: string;
      namePlaceholder: string;
      reachLabel: string;
      emailPlaceholder: string;
      projectLabel: string;
      projectPlaceholder: string;
      moreLabel: string;
      morePlaceholder: string;
      submit: string;
      sending: string;
      sent: string;
      error: string;
    };
    legal: string;
    legalLinkPhrase: string;
    legalLinkHref: string;
  };
}

export interface SiteContent {
  locale: Locale;

  nav: {
    links: NavLink[];
    contact: NavLink;
  };

  hero: {
    prefix: string;
    rotatingWords: string[];
    suffix: string;
    description: string;
  };

  about: {
    eyebrow: string;
    headline: string;
    blocks: string[];
  };

  projectsSection: {
    headline: string;
  };

  projects: Project[];

  trust: {
    headline: string;
    logos: TrustLogo[];
  };

  methodology: {
    headline: string;
    intro: string;
    subtitle: string;
    pillars: MethodologyPillar[];
  };

  whyUs: {
    headline: string;
    paragraphs: string[];
  };

  contact: {
    headline: string;
    fields: {
      name: string;
      email: string;
      company: string;
      message: string;
      submit: string;
      sending: string;
      sent: string;
      error: string;
    };
    legal?: string;
    legalLinkPhrase?: string;
    legalLinkHref?: string;
  };

  footer: {
    links: { label: string; href: string }[];
    social?: { label: string; href: string }[];
    workWithUs?: { label: string; href: string };
    copyright: string;
    legal: string;
  };

  cookieBanner: {
    message: string;
    moreInfo: string;
    accept: string;
    reject: string;
  };

  overlay: {
    close: string;
    inDevelopment: string;
    comingSoon: string;
  };

  bim: BimContent;
}
