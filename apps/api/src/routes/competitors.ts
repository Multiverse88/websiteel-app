import { Router, Response } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth, AuthedRequest } from "../middleware/auth";
import { validateCompetitorUrl } from "../modules/competitors/url-validator";

const router = Router();

// GET /api/v1/competitors - List all competitor sites
router.get("/", requireAuth, async (_req: AuthedRequest, res: Response) => {
  try {
    const sites = await prisma.competitorSite.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        crawls: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            id: true,
            status: true,
            startedAt: true,
            finishedAt: true,
            pagesScraped: true,
            pagesFailed: true,
            errorMessage: true,
            createdAt: true,
          },
        },
        _count: {
          select: { crawls: true },
        },
      },
    });

    const data = sites.map((site) => ({
      id: site.id,
      name: site.name,
      baseUrl: site.baseUrl,
      hostname: site.hostname,
      isActive: site.isActive,
      createdAt: site.createdAt,
      updatedAt: site.updatedAt,
      crawlCount: site._count.crawls,
      latestCrawl: site.crawls[0] || null,
    }));

    res.json({ data });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal mengambil daftar kompetitor";
    console.error("Error fetching competitor sites:", error);
    res.status(500).json({ error: msg });
  }
});

// POST /api/v1/competitors - Register a new competitor site
router.post("/", requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const { name, baseUrl } = req.body as { name?: string; baseUrl?: string };
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Nama kompetitor wajib diisi" });
    }

    if (!baseUrl || typeof baseUrl !== "string" || !baseUrl.trim()) {
      return res.status(400).json({ error: "URL website kompetitor wajib diisi" });
    }

    const validation = validateCompetitorUrl(baseUrl);
    if (!validation.isValid || !validation.baseUrl || !validation.hostname) {
      return res.status(400).json({ error: validation.error || "URL website tidak valid" });
    }

    const existing = await prisma.competitorSite.findUnique({
      where: { hostname: validation.hostname },
    });
    if (existing) {
      return res.status(409).json({ error: `Kompetitor dengan domain '${validation.hostname}' sudah terdaftar` });
    }

    const created = await prisma.competitorSite.create({
      data: {
        name: name.trim(),
        baseUrl: validation.baseUrl,
        hostname: validation.hostname,
        isActive: true,
      },
    });

    res.status(201).json({ data: created });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal menambahkan kompetitor";
    console.error("Error creating competitor site:", error);
    res.status(500).json({ error: msg });
  }
});

// GET /api/v1/competitors/:id - Get single competitor with recent crawls
router.get("/:id", requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const siteId = req.params.id as string;
    const site = await prisma.competitorSite.findUnique({
      where: { id: siteId },
      include: {
        crawls: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!site) {
      return res.status(404).json({ error: "Kompetitor tidak ditemukan" });
    }

    res.json({ data: site });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal mengambil data kompetitor";
    console.error("Error fetching competitor:", error);
    res.status(500).json({ error: msg });
  }
});

// PATCH /api/v1/competitors/:id - Update competitor site info
router.patch("/:id", requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const siteId = req.params.id as string;
    const { name, isActive } = req.body as { name?: string; isActive?: boolean };

    const updateData: { name?: string; isActive?: boolean } = {};
    if (typeof name === "string" && name.trim()) {
      updateData.name = name.trim();
    }
    if (typeof isActive === "boolean") {
      updateData.isActive = isActive;
    }

    const updated = await prisma.competitorSite.update({
      where: { id: siteId },
      data: updateData,
    });

    res.json({ data: updated });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal memperbarui kompetitor";
    console.error("Error updating competitor:", error);
    res.status(500).json({ error: msg });
  }
});

// DELETE /api/v1/competitors/:id - Remove competitor site
router.delete("/:id", requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const siteId = req.params.id as string;

    const activeCrawl = await prisma.competitorCrawl.findFirst({
      where: {
        competitorId: siteId,
        status: { in: ["PENDING", "RUNNING"] },
      },
    });

    if (activeCrawl) {
      return res.status(400).json({
        error: "Tidak dapat menghapus kompetitor saat proses crawl masih berjalan",
      });
    }

    await prisma.competitorSite.delete({
      where: { id: siteId },
    });

    res.json({ message: "Kompetitor berhasil dihapus" });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal menghapus kompetitor";
    console.error("Error deleting competitor:", error);
    res.status(500).json({ error: msg });
  }
});

// POST /api/v1/competitors/:id/crawls - Queue a manual crawl run
router.post("/:id/crawls", requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const siteId = req.params.id as string;

    const site = await prisma.competitorSite.findUnique({
      where: { id: siteId },
    });

    if (!site) {
      return res.status(404).json({ error: "Kompetitor tidak ditemukan" });
    }

    if (!site.isActive) {
      return res.status(400).json({ error: "Kompetitor sedang dinonaktifkan" });
    }

    // Ensure no other crawl is currently pending or running for this site
    const activeCrawl = await prisma.competitorCrawl.findFirst({
      where: {
        competitorId: siteId,
        status: { in: ["PENDING", "RUNNING"] },
      },
    });

    if (activeCrawl) {
      return res.status(409).json({
        error: "Crawl sedang berjalan untuk kompetitor ini",
        crawlId: activeCrawl.id,
        status: activeCrawl.status,
      });
    }

    const newCrawl = await prisma.competitorCrawl.create({
      data: {
        competitorId: siteId,
        status: "PENDING",
        requestedByUserId: req.userId || null,
      },
    });

    res.status(202).json({
      message: "Crawl telah dijadwalkan ke antrean worker",
      data: newCrawl,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal menjadwalkan crawl";
    console.error("Error queueing crawl:", error);
    res.status(500).json({ error: msg });
  }
});

// GET /api/v1/competitors/:id/crawls - Get historical crawls
router.get("/:id/crawls", requireAuth, async (req: AuthedRequest, res: Response) => {
  try {
    const siteId = req.params.id as string;
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const [crawls, total] = await Promise.all([
      prisma.competitorCrawl.findMany({
        where: { competitorId: siteId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.competitorCrawl.count({
        where: { competitorId: siteId },
      }),
    ]);

    res.json({
      data: crawls,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Gagal mengambil histori crawl";
    console.error("Error fetching crawls:", error);
    res.status(500).json({ error: msg });
  }
});

export default router;
