import { Router } from "express";
import { prisma } from "../lib/prisma";

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
    const limit = parseInt(req.query.limit as string) || 500;
    const includeCounts = req.query.includeCounts === "true";

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

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
    const articles = await prisma.article.findMany({
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
    const { slug } = req.params;
    const article = await prisma.article.findUnique({
      where: { slug },
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
    const { slug } = req.params;
    await prisma.article.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
    });
    res.json({ success: true });
  } catch (error) {
    // If not found, ignore error for tracking
    console.error("Error updating view count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/articles
router.post("/", async (req, res) => {
  try {
    const { slug, title, excerpt, content, coverImage, category, readTime, authorId } = req.body;

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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, excerpt, content, coverImage, category, readTime, authorId } = req.body;

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
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

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

export default router;
