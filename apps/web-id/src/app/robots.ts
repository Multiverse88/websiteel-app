import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domains";

export const revalidate = 3600;

// Multi-tenant: robots.txt must reference the sitemap of whichever domain
// it is fetched from — Google Search Console treats each domain as its own
// property, so pointing co.id's robots.txt at the biz.id sitemap would
// tell Google to crawl biz.id URLs instead of co.id's.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");
  const baseUrl = getDomainConfig(host).baseUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/login",
          "/api/",
          "/tag/",
          "/wp-content/",
          "/category/",
          "/items/",
          "/goods/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
