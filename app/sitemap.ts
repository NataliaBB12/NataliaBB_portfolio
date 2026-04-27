import { MetadataRoute } from "next";

const BASE_URL = "https://natalia.design";

const caseStudySlugs = [
  "aeromexico",
  "mercado-credito",
  "stori",
  "wemerang",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
