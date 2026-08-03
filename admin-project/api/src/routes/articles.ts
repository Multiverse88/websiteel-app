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
    const limit = parseInt(req.query.limit as string) || 7;
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

export default router;
