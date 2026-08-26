import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/v1/wa/redirect?text=...
// Public — real site visitors land here when they click any WhatsApp CTA
// (see apps/web/src/lib/config.ts getWhatsAppLink()). Picks whichever
// active number has the fewest clicks so far (self-balancing fairness —
// no separate "last used" pointer to keep in sync), logs the click, and
// 302s to wa.me. This is a full browser navigation (new tab), not a
// fetch, so no CORS setup is needed here.
router.get("/redirect", async (req, res) => {
  try {
    const next = await prisma.whatsAppNumber.findFirst({
      where: { isActive: true },
      orderBy: { clickCount: "asc" },
    });

    if (!next) {
      // No numbers configured — fail open to a plain wa.me link so the
      // CTA never dead-ends, using the same default number the site used
      // before this rotator existed.
      const text = (req.query.text as string) || "";
      return res.redirect(`https://wa.me/6281123456789?text=${encodeURIComponent(text)}`);
    }

    // Best-effort domain attribution — this is a top-level navigation, so
    // Referer is same-origin-policy-safe to read, but referrer-policy
    // (strict-origin-when-cross-origin) means only the origin survives
    // cross-origin, not the full path. That's all we need here.
    let domain: string | null = null;
    const referer = req.headers.referer;
    if (referer) {
      try { domain = new URL(referer).hostname; } catch { /* ignore malformed referer */ }
    }

    await prisma.$transaction([
      prisma.whatsAppNumber.update({
        where: { id: next.id },
        data: { clickCount: { increment: 1 } },
      }),
      prisma.whatsAppClick.create({
        data: { numberId: next.id, domain },
      }),
    ]);

    const text = (req.query.text as string) || "";
    res.redirect(`https://wa.me/${next.number}?text=${encodeURIComponent(text)}`);
  } catch (error) {
    console.error("Error in WA redirect:", error);
    const text = (req.query.text as string) || "";
    res.redirect(`https://wa.me/6281123456789?text=${encodeURIComponent(text)}`);
  }
});

// GET /api/v1/wa/numbers — admin: list numbers with click share
router.get("/numbers", requireAuth, async (req, res) => {
  try {
    const numbers = await prisma.whatsAppNumber.findMany({
      orderBy: { createdAt: "asc" },
    });
    const total = numbers.reduce((sum, n) => sum + n.clickCount, 0);
    const data = numbers.map((n) => ({
      ...n,
      sharePercent: total > 0 ? Math.round((n.clickCount / total) * 1000) / 10 : 0,
    }));
    res.json({ data, meta: { totalClicks: total } });
  } catch (error) {
    console.error("Error fetching WA numbers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/wa/numbers — admin: add a number
router.post("/numbers", requireAuth, async (req, res) => {
  try {
    const { number, label } = req.body;
    const cleaned = String(number || "").replace(/\D/g, "");
    if (!cleaned) {
      return res.status(400).json({ error: "Nomor tidak valid" });
    }
    const created = await prisma.whatsAppNumber.create({
      data: { number: cleaned, label: label || null },
    });
    res.status(201).json({ data: created });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Nomor ini sudah ada" });
    }
    console.error("Error creating WA number:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/v1/wa/numbers/:id — admin: edit label / toggle active
// Deliberately no DELETE — deactivating keeps click history intact for
// fairness reporting instead of orphaning/cascading logged clicks.
router.put("/numbers/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const { label, isActive } = req.body;
    const updated = await prisma.whatsAppNumber.update({
      where: { id },
      data: {
        ...(label !== undefined && { label }),
        ...(isActive !== undefined && { isActive }),
      },
    });
    res.json({ data: updated });
  } catch (error) {
    console.error("Error updating WA number:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/wa/numbers/:id/clicks — admin: recent click log for one number
// (domain breakdown), for a closer look than the aggregate count.
router.get("/numbers/:id/clicks", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const clicks = await prisma.whatsAppClick.findMany({
      where: { numberId: id },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    res.json({ data: clicks });
  } catch (error) {
    console.error("Error fetching WA click log:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
