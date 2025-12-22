import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creatorskit.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/api/",
          "/auth/",
          "/u/", // User profiles - you may want to allow these if you want them indexed
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
