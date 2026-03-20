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
    };
    legal?: string;
  };

  footer: {
    links: { label: string; href: string }[];
    social?: { label: string; href: string }[];
    copyright: string;
    legal: string;
  };

  overlay: {
    close: string;
    inDevelopment: string;
    comingSoon: string;
  };
}
