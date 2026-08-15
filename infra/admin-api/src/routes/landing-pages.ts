import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/v1/landing-pages/sitemap/all?hostname=easylegal.biz.id
// Public, minimal response used only to build the frontend sitemap.
router.get("/sitemap/all", async (req, res) => {
  try {
    const hostname =
      typeof req.query.hostname === "string"
        ? req.query.hostname.split(":")[0]
        : undefined;

    const pages = await prisma.landingPage.findMany({
      where: { status: "published" },
      select: {
        slug: true,
        updatedAt: true,
        domainId: true,
        Domain: { select: { hostname: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    const visiblePages = pages
      .filter((page) => !page.domainId || page.Domain?.hostname === hostname)
      .map(({ slug, updatedAt }) => ({ slug, updatedAt }));

    res.json({ data: visiblePages });
  } catch (error) {
    console.error("Error fetching landing pages for sitemap:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/landing-pages
router.get("/", requireAuth, async (req, res) => {
  try {
    const pages = await prisma.landingPage.findMany({
      orderBy: { createdAt: "desc" },
      include: { Domain: true },
    });
    res.json({ data: pages });
  } catch (error) {
    console.error("Error fetching landing pages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/landing-pages/:slug?hostname=easylegal.biz.id
// `hostname` is the requesting site's own domain (the public app forwards its
// own Host header here). If the page is assigned to a Domain, it's only
// servable from that domain — otherwise (no domainId set) it's unrestricted.
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const hostname = typeof req.query.hostname === "string" ? req.query.hostname : undefined;

    const page = await prisma.landingPage.findUnique({
      where: { slug, status: "published" },
      include: { Domain: true },
    });

    if (!page) {
      return res.status(404).json({ error: "Landing page not found" });
    }

    if (page.Domain && hostname && page.Domain.hostname !== hostname) {
      return res.status(404).json({ error: "Landing page not found" });
    }

    res.json({ data: page });
  } catch (error) {
    console.error("Error fetching landing page by slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/landing-pages
router.post("/", requireAuth, async (req, res) => {
  try {
    const { slug, title, description, ogImage, pixelId, sections, redirectSettings, status, createdBy, domainId } = req.body;

    if (!slug || !title || !sections) {
      return res.status(400).json({ success: false, error: "Slug, title, dan sections wajib diisi." });
    }

    const page = await prisma.landingPage.create({
      data: {
        slug,
        title,
        description: description || null,
        ogImage: ogImage || null,
        pixelId: pixelId || null,
        sections,
        redirectSettings: redirectSettings || undefined,
        status: status || "draft",
        createdBy,
        domainId: domainId || null,
      },
    });

    res.status(201).json({ success: true, data: page });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ success: false, error: "Slug sudah digunakan." });
    }
    console.error("Failed to create landing page:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// PUT /api/v1/landing-pages/:id
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, description, ogImage, pixelId, sections, redirectSettings, status, domainId } = req.body;

    const existing = await prisma.landingPage.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, error: "Landing page tidak ditemukan." });
    }

    const page = await prisma.landingPage.update({
      where: { id },
      data: {
        slug: slug || existing.slug,
        title: title || existing.title,
        description: description !== undefined ? description : existing.description,
        ogImage: ogImage !== undefined ? ogImage : existing.ogImage,
        pixelId: pixelId !== undefined ? pixelId : existing.pixelId,
        sections: sections || existing.sections,
        redirectSettings: redirectSettings !== undefined ? redirectSettings : existing.redirectSettings,
        status: status || existing.status,
        domainId: domainId !== undefined ? (domainId || null) : existing.domainId,
      },
    });

    res.json({ success: true, data: page });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ success: false, error: "Slug sudah digunakan." });
    }
    console.error("Failed to update landing page:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// POST /api/v1/landing-pages/leads
router.post("/leads", async (req, res) => {
  try {
    const { landingPageId, name, phone, email, company, utmParams } = req.body;

    if (!landingPageId || !name || !phone) {
      return res.status(400).json({ success: false, error: "Nama dan Nomor WhatsApp wajib diisi." });
    }

    // 1. Save lead to database
    const lead = await prisma.landingPageLead.create({
      data: {
        landingPageId,
        name,
        phone,
        email: email || null,
        data: {
          company: company || null,
          utm: utmParams || {},
        },
      },
    });

    // 2. Fetch landing page redirect settings
    const lp = await prisma.landingPage.findUnique({
      where: { id: landingPageId },
      select: { redirectSettings: true },
    });

    let redirectSettings = null;
    if (lp?.redirectSettings) {
      redirectSettings =
        typeof lp.redirectSettings === "string" ? JSON.parse(lp.redirectSettings) : lp.redirectSettings;
    }

    res.json({
      success: true,
      leadId: lead.id,
      redirectSettings,
    });
  } catch (error) {
    console.error("Failed to submit landing page lead:", error);
    res.status(500).json({ success: false, error: "Terjadi kesalahan pada server. Silakan coba lagi." });
  }
});

// DELETE /api/v1/landing-pages/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.landingPage.delete({ where: { id } });
    res.json({ success: true, message: "Landing page deleted" });
  } catch (error) {
    console.error("Failed to delete landing page:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
