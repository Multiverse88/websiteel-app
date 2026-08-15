import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domains";
import { contentMap } from "@/data/layanan-badan-usaha";
import { layananLainnyaData } from "@/data/layanan-lainnya";

export const revalidate = 3600;

interface SitemapArticle {
  slug: string;
  updatedAt: string;
}

interface SitemapLandingPage {
  slug: string;
  updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Multi-tenant: sitemap.xml must declare URLs on whichever domain it was
  // fetched from (e.g. Google Search Console treats each domain as its own
  // property) — see src/lib/domains.ts.
  const host = (await headers()).get("host");
  const BASE_URL = getDomainConfig(host).baseUrl;
  const generatedAt = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: generatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tentang-kami`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontak`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/artikel`,
      lastModified: generatedAt,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cek-nama`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/cek-kbli`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/referral-reseller`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/kerjasama`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/testimoni`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/kebijakan-privasi`,
      lastModified: generatedAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/syarat-ketentuan`,
      lastModified: generatedAt,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Service pages
  const standaloneServiceSlugs = [
    "pendirian-badan-usaha",
    "merek-haki",
    "nib-oss",
    "sertifikasi-iso",
    "pengajuan-pkp",
    "visa-kitas",
    "virtual-office",
    "press-release",
    "pelaporan-lkpm",
    "perjanjian-perkawinan",
    "apostille",
    "pelaporan-rups",
    "kontrak-bisnis",
    "pkkpr",
  ];

  // Template-driven service routes are sourced from the same data maps used
  // by generateStaticParams, so newly added services automatically appear.
  const businessEntitySlugs = Object.keys(contentMap).map(
    (jenis) => `pendirian-badan-usaha/${jenis}`,
  );
  const dynamicServiceSlugs = Object.keys(layananLainnyaData);

  const servicePages: MetadataRoute.Sitemap = [
    ...new Set([
      ...standaloneServiceSlugs,
      ...businessEntitySlugs,
      ...dynamicServiceSlugs,
    ]),
  ].map((slug) => ({
    url: `${BASE_URL}/layanan/${slug}`,
    lastModified: generatedAt,
    changeFrequency: "monthly" as const,
    priority: slug.startsWith("pendirian-badan-usaha/") ? 0.75 : 0.8,
  }));

  // Article pages from API
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/articles/sitemap/all`;
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
    
    if (res.ok) {
      const json = await res.json();
      articlePages = (json.data as SitemapArticle[]).map((article) => ({
        url: `${BASE_URL}/artikel/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    } else {
      console.warn("Failed to fetch articles for sitemap, status:", res.status);
    }
  } catch (error) {
    // If API is not available, return static pages only
    console.warn("Failed to fetch articles for sitemap", error);
  }

  // Published CMS landing pages, filtered by the domain serving this sitemap.
  let landingPages: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = new URL(
      `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000"}/api/v1/landing-pages/sitemap/all`,
    );
    if (host) apiUrl.searchParams.set("hostname", host);

    const res = await fetch(apiUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      landingPages = (json.data as SitemapLandingPage[]).map((page) => ({
        url: `${BASE_URL}/${page.slug}`,
        lastModified: new Date(page.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
    } else {
      console.warn(
        "Failed to fetch landing pages for sitemap, status:",
        res.status,
      );
    }
  } catch (error) {
    console.warn("Failed to fetch landing pages for sitemap", error);
  }

  return [...staticPages, ...servicePages, ...articlePages, ...landingPages];
}
