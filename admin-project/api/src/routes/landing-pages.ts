import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/v1/landing-pages/:slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await prisma.landingPage.findUnique({
      where: { slug, status: "published" },
    });

    if (!page) {
      return res.status(404).json({ error: "Landing page not found" });
    }

    res.json({ data: page });
  } catch (error) {
    console.error("Error fetching landing page by slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
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

export default router;
