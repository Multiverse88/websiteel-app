import { Router, Response } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";
import { computeCrawlDiff, SnapshotSummary } from "../modules/competitors/crawl-diff";
import { PageClassification } from "@prisma/client";

const router = Router();

// GET /api/v1/competitor-crawls/:crawlId - Get crawl status and overview
router.get("/:crawlId", requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const crawlId = req.params.crawlId as string;
    const crawl = await prisma.competitorCrawl.findUnique({
      where: { id: crawlId },
      include: {
        competitor: true,
      },
    });

    if (!crawl) {
      return res.status(404).json({ error: "Crawl tidak ditemukan" });
    }

    res.json({ data: crawl });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal mengambil detail crawl";
    console.error("Error fetching crawl:", error);
    res.status(500).json({ error: msg });
  }
});

// GET /api/v1/competitor-crawls/:crawlId/pages - List snapshots with search and filters
router.get("/:crawlId/pages", requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const crawlId = req.params.crawlId as string;
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const rawClass = typeof req.query.classification === "string" ? req.query.classification.trim().toUpperCase() : "";

    const where: {
      crawlId: string;
      classification?: PageClassification;
      OR?: { url?: { contains: string; mode: "insensitive" }; title?: { contains: string; mode: "insensitive" } }[];
    } = { crawlId };

    if (rawClass && ["CONTENT", "SERVICE", "ARTICLE", "OTHER", "UNSUPPORTED_DYNAMIC"].includes(rawClass)) {
      where.classification = rawClass as PageClassification;
    }

    if (search) {
      where.OR = [
        { url: { contains: search, mode: "insensitive" } },
        { title: { contains: search, mode: "insensitive" } },
      ];
    }

    const [snapshots, total] = await Promise.all([
      prisma.competitorPageSnapshot.findMany({
        where,
        orderBy: { scrapedAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          crawlId: true,
          url: true,
          path: true,
          statusCode: true,
          contentType: true,
          canonicalUrl: true,
          title: true,
          metaDescription: true,
          h1: true,
          keywords: true,
          headings: true,
          priceTexts: true,
          ctas: true,
          contentHash: true,
          classification: true,
          scrapedAt: true,
        },
      }),
      prisma.competitorPageSnapshot.count({ where }),
    ]);

    res.json({
      data: snapshots,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal mengambil snapshot halaman";
    console.error("Error fetching snapshots:", error);
    res.status(500).json({ error: msg });
  }
});

// GET /api/v1/competitor-crawls/:crawlId/changes - Calculate diff against previous crawl
router.get("/:crawlId/changes", requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const crawlId = req.params.crawlId as string;
    const currentCrawl = await prisma.competitorCrawl.findUnique({
      where: { id: crawlId },
    });

    if (!currentCrawl) {
      return res.status(404).json({ error: "Crawl saat ini tidak ditemukan" });
    }

    const compareWith = typeof req.query.compareWith === "string" ? req.query.compareWith.trim() : "";

    let previousCrawl = null;
    if (compareWith) {
      previousCrawl = await prisma.competitorCrawl.findUnique({
        where: { id: compareWith },
      });
    } else {
      // Find the most recent terminal crawl for the same competitor before this one
      previousCrawl = await prisma.competitorCrawl.findFirst({
        where: {
          competitorId: currentCrawl.competitorId,
          id: { not: currentCrawl.id },
          createdAt: { lt: currentCrawl.createdAt },
          status: { in: ["SUCCEEDED", "PARTIAL"] },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    const [currentPages, previousPages] = await Promise.all([
      prisma.competitorPageSnapshot.findMany({
        where: { crawlId: currentCrawl.id },
      }),
      previousCrawl
        ? prisma.competitorPageSnapshot.findMany({
            where: { crawlId: previousCrawl.id },
          })
        : Promise.resolve([]),
    ]);

    const currentSummaries: SnapshotSummary[] = currentPages.map((p) => ({
      url: p.url,
      statusCode: p.statusCode,
      title: p.title,
      metaDescription: p.metaDescription,
      h1: p.h1,
      keywords: p.keywords,
      headings: p.headings,
      mainText: p.mainText,
      priceTexts: p.priceTexts,
      ctas: p.ctas,
      contentHash: p.contentHash,
      classification: p.classification,
    }));

    const previousSummaries: SnapshotSummary[] = previousPages.map((p) => ({
      url: p.url,
      statusCode: p.statusCode,
      title: p.title,
      metaDescription: p.metaDescription,
      h1: p.h1,
      keywords: p.keywords,
      headings: p.headings,
      mainText: p.mainText,
      priceTexts: p.priceTexts,
      ctas: p.ctas,
      contentHash: p.contentHash,
      classification: p.classification,
    }));

    const diff = computeCrawlDiff(
      currentCrawl.id,
      currentSummaries,
      previousCrawl?.id || null,
      previousSummaries,
    );

    res.json({
      data: {
        ...diff,
        previousCrawlCreatedAt: previousCrawl?.createdAt || null,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal menghitung perbandingan crawl";
    console.error("Error computing crawl changes:", error);
    res.status(500).json({ error: msg });
  }
});

export default router;
