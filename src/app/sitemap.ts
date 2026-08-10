import { MetadataRoute } from "next";

const BASE_URL = "https://easylegal.biz.id";

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
    {
      url: `${BASE_URL}/kebijakan-privasi`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/syarat-ketentuan`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
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
    "apostille",
    "pelaporan-rups",
    "kontrak-bisnis",
    "pkkpr",
  ].map((slug) => ({
    url: `${BASE_URL}/layanan/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Article pages from API
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/articles/sitemap/all`;
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
    
    if (res.ok) {
      const json = await res.json();
      articlePages = json.data.map((article: any) => ({
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

  return [...staticPages, ...servicePages, ...articlePages];
}
