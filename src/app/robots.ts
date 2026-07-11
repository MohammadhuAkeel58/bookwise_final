import type { MetadataRoute } from "next";

// Canonical production URL. Must match metadataBase in layout.tsx.
const BASE_URL = "https://comaccpar.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
