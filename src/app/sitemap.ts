import { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE_URL = "https://easylegal.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontak`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/artikel`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cek-nama`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/cek-kbli`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/referral-reseller`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/kerjasama`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/testimoni`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = [
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
    "pr-media",
  ].map((slug) => ({
    url: `${BASE_URL}/layanan/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Article pages from database
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await prisma.article.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    articlePages = articles.map((article) => ({
      url: `${BASE_URL}/artikel/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // If database is not available, return static pages only
    console.warn("Failed to fetch articles for sitemap");
  }

  return [...staticPages, ...servicePages, ...articlePages];
}
