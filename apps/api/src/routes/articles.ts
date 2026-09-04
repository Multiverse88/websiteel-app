import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";
import { getAIReview } from "../modules/articles/ai-review-service";
import { checkDeduplication } from "../modules/articles/deduplication-service";
import { generateEmbedding } from "../modules/articles/embedding-service";

const router = Router();

// Display Category -> DB Categories list (from Next.js logic)
const DB_CATEGORIES_MAP: Record<string, string[]> = {
  "Pendirian Usaha": ["Pendirian PT", "Legalitas PT", "CV", "PT Perorangan", "PT PMA", "Firma", "Perkumpulan", "Yayasan", "Koperasi", "UMKM"],
  "Haki": ["Merek & HAKI"],
  "ISO": ["Sertifikasi ISO"],
  "Perizinan": ["Perizinan", "KBLI"],
  "NIB": ["NIB"],
  "Pajak": ["Pajak"],
  "Branding": ["Branding"],
};

// GET /api/v1/articles
router.get("/", async (req, res) => {
  try {
    const q = req.query.q as string || "";
    const activeCategory = req.query.category as string || "All";
    const site = (req.query.site as string) || "easylegal.biz.id";
    const limit = parseInt(req.query.limit as string) || 500;
    const includeCounts = req.query.includeCounts === "true";

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

    // Filter by site (domain)
    whereClause.site = site;

    if (q) {
      whereClause.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { excerpt: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
      ];
    }

    if (activeCategory !== "All") {
      const dbCategories = DB_CATEGORIES_MAP[activeCategory];
      if (dbCategories) {
        whereClause.category = { in: dbCategories };
      } else {
        whereClause.category = { equals: activeCategory, mode: "insensitive" };
      }
    }

    // Get matching count and paginated articles
    const [totalMatchingCount, articles] = await Promise.all([
      prisma.article.count({ where: whereClause }),
      prisma.article.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        take: limit,
      }),
    ]);

    // Optionally fetch all category counts
    let allCategories = undefined;
    if (includeCounts) {
      allCategories = await prisma.article.findMany({
        select: { category: true },
      });
    }

    res.json({
      data: articles,
      meta: {
        totalMatchingCount,
        allCategories,
      },
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/articles/sitemap/all
router.get("/sitemap/all", async (req, res) => {
  try {
    const site = (req.query.site as string) || "easylegal.biz.id";
    const articles = await prisma.article.findMany({
      where: { site },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: "desc" },
    });
    res.json({ data: articles });
  } catch (error) {
    console.error("Error fetching articles for sitemap:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/articles/:slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params as { slug: string };
    const site = (req.query.site as string) || "easylegal.biz.id";

    const article = await prisma.article.findFirst({
      where: { slug, site },
    });

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({ data: article });
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/articles/:slug/view
router.post("/:slug/view", async (req, res) => {
  try {
    const { slug } = req.params as { slug: string };
    const site = (req.query.site as string) || (req.body?.site as string) || "easylegal.biz.id";

    await prisma.article.updateMany({
      where: { slug, site },
      data: { viewCount: { increment: 1 } },
    });
    res.json({ success: true });
  } catch (error) {
    // If not found, ignore error for tracking
    console.error("Error updating view count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/articles/:slug/revalidate
// Proxies the ISR revalidation trigger on the public site. Exists so the
// dashboard (browser-executed, 'use client') never has to hold
// REVALIDATION_SECRET itself — any value baked into client-side JS is
// visible to anyone via devtools, defeating the point of a secret. This
// route holds it server-side instead, gated behind the dashboard's real
// JWT auth.
router.post("/:slug/revalidate", requireAuth, async (req, res) => {
  const secret = process.env.REVALIDATION_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "REVALIDATION_SECRET not configured" });
  }
  try {
    const { slug } = req.params as { slug: string };
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://easylegal.biz.id";
    const r = await fetch(`${appUrl}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-revalidate-secret": secret },
      body: JSON.stringify({ slug }),
    });
    const data = await r.json().catch(() => ({}));
    res.status(r.status).json(data);
  } catch (error) {
    console.error("Error proxying revalidate:", error);
    res.status(502).json({ error: "Failed to reach public site for revalidation" });
  }
});

// POST /api/v1/articles
router.post("/", requireAuth, async (req, res) => {
  try {
    const { slug, title, excerpt, content, coverImage, category, readTime, authorId, faq, seoTitle, seoDesc, focusKeyword, site } = req.body;

    if (!slug || !title || !excerpt || !content || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const article = await prisma.article.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        coverImage: coverImage || "",
        category,
        readTime: readTime || "5 min read",
        authorId: authorId || null,
        faq: Array.isArray(faq) && faq.length > 0 ? faq : undefined,
        seoTitle: seoTitle || title,
        seoDesc: seoDesc || excerpt,
        focusKeyword: focusKeyword || null,
        site: site || "easylegal.biz.id",
      },
    });

    res.status(201).json({ data: article });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Article with this slug already exists" });
    }
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/v1/articles/:id
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const { slug, title, excerpt, content, coverImage, category, readTime, authorId, faq, seoTitle, seoDesc, focusKeyword, site } = req.body;

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Article not found" });
    }

    const article = await prisma.article.update({
      where: { id },
      data: {
        slug: slug || existing.slug,
        title: title || existing.title,
        excerpt: excerpt || existing.excerpt,
        content: content || existing.content,
        coverImage: coverImage !== undefined ? coverImage : existing.coverImage,
        category: category || existing.category,
        readTime: readTime || existing.readTime,
        authorId: authorId || existing.authorId,
        faq: faq !== undefined ? (Array.isArray(faq) && faq.length > 0 ? faq : null) : existing.faq as any,
        seoTitle: seoTitle !== undefined ? seoTitle : existing.seoTitle,
        seoDesc: seoDesc !== undefined ? seoDesc : existing.seoDesc,
        focusKeyword: focusKeyword !== undefined ? focusKeyword : existing.focusKeyword,
        site: site || existing.site,
      },
    });

    res.json({ data: article });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Article with this slug already exists" });
    }
    console.error("Error updating article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/v1/articles/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };

    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Article not found" });
    }

    await prisma.article.delete({ where: { id } });
    res.json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/articles/ai-review — SEO scoring & suggestions via ArticleAI
router.post("/ai-review", requireAuth, async (req, res) => {
  try {
    const { title, excerpt, content, site, keyword, existingSlug, reviewMode } = req.body;
    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }
    const result = await getAIReview({ title, excerpt: excerpt || "", content: content || "", site: site || "easylegal.biz.id", keyword, existingSlug, reviewMode });
    res.json({ data: result });
  } catch (error: any) {
    console.error("AI review error:", error);
    res.status(500).json({ error: error.message || "AI review failed" });
  }
});

// POST /api/v1/articles/dedup-check — detect duplicate articles by keyword overlap and cannibalization
router.post("/dedup-check", requireAuth, async (req, res) => {
  try {
    const { title, excerpt, content, site, existingSlug, focusKeyword } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "title and content are required" });
    }
    const result = await checkDeduplication({ title, excerpt: excerpt || "", content, site: site || "easylegal.biz.id", existingSlug, focusKeyword });
    res.json({ data: result });
  } catch (error: any) {
    console.error("Dedup check error:", error);
    res.status(500).json({ error: error.message || "Dedup check failed" });
  }
});

// POST /api/v1/articles/embed — generate local embedding for an article
router.post("/embed", requireAuth, async (req, res) => {
  try {
    const { title, excerpt, content, site } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "title and content are required" });
    }
    const result = await generateEmbedding([title, excerpt, content].filter(Boolean).join(" "));
    res.json({ data: result });
  } catch (error: any) {
    console.error("Embed error:", error);
    res.status(500).json({ error: error.message || "Embedding failed" });
  }
});

export default router;
