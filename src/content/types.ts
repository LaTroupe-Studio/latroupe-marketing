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

export interface BimStep {
  number: string;
  title: string;
  text: string;
}

export interface BimContent {
  meta: { title: string; description: string };
  nav: {
    links: NavLink[];
    contact: NavLink;
    home: NavLink;
  };
  hero: {
    word: string;
    suffix: string;
    description: string;
    cta: NavLink;
  };
  intro: {
    eyebrow: string;
    headline: string;
    blocks: string[];
  };
  services: {
    headline: string;
    items: BimService[];
  };
  process: {
    headline: string;
    intro: string;
    steps: BimStep[];
  };
  banner: {
    text: string;
    sub: string;
    cta: NavLink;
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
