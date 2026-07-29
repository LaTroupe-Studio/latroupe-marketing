import { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://www.latroupestudio.com";

const legalPairs = [
  { es: `${SITE_URL}/es/aviso-legal`, en: `${SITE_URL}/en/legal-notice` },
  { es: `${SITE_URL}/es/privacidad`, en: `${SITE_URL}/en/privacy` },
  { es: `${SITE_URL}/es/cookies`, en: `${SITE_URL}/en/cookies` },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const mainUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/es`, priority: 1.0 },
    { url: `${SITE_URL}/en`, priority: 1.0 },
  ].map(({ url, priority }) => ({
    url,
    lastModified,
    priority,
    alternates: {
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/es`,
      },
    },
  }));

  const bimConsultancyUrls: MetadataRoute.Sitemap = ["es", "en"].map((loc) => ({
    url: `${SITE_URL}/${loc}/bim-consultancy`,
    lastModified,
    priority: 0.8,
    alternates: {
      languages: {
        es: `${SITE_URL}/es/bim-consultancy`,
        en: `${SITE_URL}/en/bim-consultancy`,
        // UK-facing offer — English is the x-default (see bim-consultancy/layout).
        "x-default": `${SITE_URL}/en/bim-consultancy`,
      },
    },
  }));

  const legalUrls: MetadataRoute.Sitemap = legalPairs.flatMap(({ es, en }) =>
    [es, en].map((url) => ({
      url,
      lastModified,
      priority: 0.3,
      alternates: {
        languages: {
          es,
          en,
          "x-default": es,
        },
      },
    }))
  );

  return [...mainUrls, ...bimConsultancyUrls, ...legalUrls];
}
