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

export interface CollageItem {
  id: string;
  title: string;
  location: string;
  image: string;
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

  /**
   * The collage shows more work than the overlay documents, and with its own
   * shorter wording, so it carries only what it renders. Keeping it apart from
   * `projects` means an entry can appear in the collage without inventing the
   * case-study copy the overlay would need.
   */
  projectsCollage: CollageItem[];

  projects: Project[];

  trust: {
    /** Mono eyebrow above the logo marquee. Plain text in every locale so
     *  ES and EN render identically — only the wording differs. */
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
    /** Paragraph under the headline, left column. */
    intro: string;
    fields: {
      /** Bracketed mono eyebrow above each input. */
      name: string;
      email: string;
      company: string;
      /** Input placeholders. */
      namePlaceholder: string;
      emailPlaceholder: string;
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
}
