import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

function generateLeadCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I — easy to read off a phone screen
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `EL-${code}`;
}

// Human-readable labels for the CS-visible ref line — keep in sync with the
// SOURCE_LABELS map in apps/web/src/components/AnalyticsEvents.tsx.
const SOURCE_LABELS: Record<string, string> = {
  gads: "Google Ads",
  metaads: "Meta Ads",
  seo: "Google/SEO Organik",
  direct: "Langsung/Bookmark",
};

// GET /api/v1/wa/redirect?text=...&source=...&product=...
// Public — real site visitors land here when they click any WhatsApp CTA
// (see apps/web/src/lib/config.ts getWhatsAppLink() and
// AnalyticsEvents.tsx, which appends source/product before navigating).
// Picks whichever active number has the fewest clicks so far (self-balancing
// fairness — no separate "last used" pointer to keep in sync), logs the
// click, and 302s to wa.me. This is a full browser navigation (new tab), not
// a fetch, so no CORS setup is needed here.
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

    // leadCode is unique; a collision is astronomically unlikely (6 chars,
    // 33-symbol alphabet) but retry a couple of times rather than 500 the
    // one-in-a-billion case.
    let leadCode = generateLeadCode();
    for (let attempt = 0; attempt < 3; attempt++) {
      const exists = await prisma.whatsAppClick.findUnique({ where: { leadCode } });
      if (!exists) break;
      leadCode = generateLeadCode();
    }

    const source = (req.query.source as string) || null;
    const product = (req.query.product as string) || null;

    await prisma.$transaction([
      prisma.whatsAppNumber.update({
        where: { id: next.id },
        data: { clickCount: { increment: 1 } },
      }),
      prisma.whatsAppClick.create({
        data: { numberId: next.id, domain, leadCode, source, product },
      }),
    ]);

    // leadCode + source/product ride along in the actual WA message — the
    // only channel that carries data from here into the real conversation —
    // so CS can read it off the chat and staff can look this exact lead up
    // in the dashboard.
    const sourceLabel = source ? SOURCE_LABELS[source] || source : null;
    const refParts = [`Ref: ${leadCode}`];
    if (sourceLabel) refParts.push(`Sumber: ${sourceLabel}`);
    if (product) refParts.push(`Produk: ${product}`);

    const text = (req.query.text as string) || "";
    const textWithRef = text ? `${text}\n\n[${refParts.join(" | ")}]` : `[${refParts.join(" | ")}]`;
    res.redirect(`https://wa.me/${next.number}?text=${encodeURIComponent(textWithRef)}`);
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

// GET /api/v1/wa/leads — admin: every rotator click as a trackable lead,
// filterable by status/number/domain, plus an overall funnel summary.
router.get("/leads", requireAuth, async (req, res) => {
  try {
    const { status, numberId, domain, source, product } = req.query as Record<string, string>;
    const where: any = {};
    if (status) where.status = status;
    if (numberId) where.numberId = numberId;
    if (domain) where.domain = domain;
    if (source) where.source = source;
    if (product) where.product = product;

    const [leads, statusCounts, sourceCounts] = await Promise.all([
      prisma.whatsAppClick.findMany({
        where,
        include: { number: { select: { number: true, label: true } } },
        orderBy: { createdAt: "desc" },
        take: 500,
      }),
      prisma.whatsAppClick.groupBy({
        by: ["status"],
        where,
        _count: { status: true },
      }),
      prisma.whatsAppClick.groupBy({
        by: ["source"],
        where,
        _count: { source: true },
      }),
    ]);

    const funnel = Object.fromEntries(statusCounts.map((s) => [s.status, s._count.status]));
    const bySource = Object.fromEntries(sourceCounts.map((s) => [s.source || "unknown", s._count.source]));
    res.json({ data: leads, meta: { funnel, bySource } });
  } catch (error) {
    console.error("Error fetching WA leads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/v1/wa/leads/:id — admin: update a lead's status/notes as CS
// follows up the real conversation (matched via the leadCode in the chat).
router.put("/leads/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const { status, notes } = req.body;
    const updated = await prisma.whatsAppClick.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(notes !== undefined && { notes }),
      },
    });
    res.json({ data: updated });
  } catch (error) {
    console.error("Error updating WA lead:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
