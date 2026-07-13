import { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://latroupestudio.com";

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

  return [...mainUrls, ...legalUrls];
}
