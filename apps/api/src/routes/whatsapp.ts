import { Router } from "express";
import { randomInt } from "node:crypto";
import { prisma } from "../lib/prisma";
import { AuthedRequest, requireAuth } from "../middleware/auth";
import {
  buildWhatsAppMessage,
  classifyAttribution,
  getLeadTemperature,
  isValidStage,
  isValidStageTransition,
  normalizeSourceCode,
  sourceCodeToChannel,
} from "../modules/leads/lead-domain";

const router = Router();

function generateLeadCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I — easy to read off a phone screen
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[randomInt(chars.length)];
  return `EL-${code}`;
}

function queryText(value: unknown, maxLength = 500): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().slice(0, maxLength);
  return normalized || null;
}

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
    const product = queryText(req.query.product, 300);
    // Per-page override (admin-editable, see /pages routes below) — keyed by
    // the same page-path string every getWhatsAppLink() click already sends
    // as `product`, so no call-site changes are needed to opt a page in.
    const pageConfig = product
      ? await prisma.whatsAppPageConfig.findUnique({ where: { path: product } })
      : null;
    const rawText = (pageConfig?.message || queryText(req.query.text, 1000)) || "";
    const suppliedSource = normalizeSourceCode(req.query.source);
    const classified = suppliedSource
      ? {
          sourceCode: suppliedSource,
          channel: sourceCodeToChannel(suppliedSource),
          referralCode: queryText(req.query.ref, 80),
        }
      : classifyAttribution(req.query, queryText(req.query.referrer, 1000), product || queryText(req.query.entry_path, 500));
    const sourceCode = classified.sourceCode;
    const service = queryText(req.query.service, 300) || (rawText ? rawText.slice(0, 200) : null);
    const sessionId = queryText(req.query.sid, 80);
    const ctaId = queryText(req.query.cta_id, 100);
    const ctaLabel = queryText(req.query.cta_label, 200);
    const deduplicationKey = sessionId
      ? [sessionId, product || "", ctaId || service || ""].join(":").slice(0, 500)
      : null;

    const numberWhere: { isActive: boolean; id?: { in: string[] } } = { isActive: true };
    if (pageConfig?.numberIds?.length) numberWhere.id = { in: pageConfig.numberIds };
    const next = await prisma.whatsAppNumber.findFirst({
      where: numberWhere,
      orderBy: [{ clickCount: "asc" }, { createdAt: "asc" }],
    });

    if (!next) {
      // No numbers configured — fail open to a plain wa.me link so the
      // CTA never dead-ends, using the same default number the site used
      // before this rotator existed.
      console.error("[WA_TRACKING] No active WhatsApp number");
      return res.redirect(`https://wa.me/6281123456789?text=${encodeURIComponent(rawText)}`);
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

    const duplicateSince = new Date(Date.now() - 30 * 60 * 1000);
    const duplicate = deduplicationKey
      ? await prisma.whatsAppClick.findFirst({
          where: { deduplicationKey, createdAt: { gte: duplicateSince } },
          include: { number: true },
          orderBy: { createdAt: "desc" },
        })
      : null;

    let leadCode: string;
    let leadId: string;
    let destinationNumber: string;
    if (duplicate) {
      leadCode = duplicate.leadCode;
      leadId = duplicate.id;
      destinationNumber = duplicate.number.number;
    } else {
      leadCode = generateLeadCode();
      for (let attempt = 0; attempt < 5; attempt++) {
        const exists = await prisma.whatsAppClick.findUnique({ where: { leadCode } });
        if (!exists) break;
        leadCode = generateLeadCode();
      }

      const created = await prisma.$transaction(async (tx) => {
        await tx.whatsAppNumber.update({
          where: { id: next.id },
          data: { clickCount: { increment: 1 } },
        });
        return tx.whatsAppClick.create({
          data: {
            numberId: next.id,
            domain,
            leadCode,
            source: sourceCode,
            sourceCode,
            channel: classified.channel,
            referralCode: classified.referralCode,
            utmSource: queryText(req.query.utm_source, 120),
            utmMedium: queryText(req.query.utm_medium, 120),
            utmCampaign: queryText(req.query.utm_campaign, 200),
            utmContent: queryText(req.query.utm_content, 200),
            utmTerm: queryText(req.query.utm_term, 200),
            gclid: queryText(req.query.gclid, 300),
            fbclid: queryText(req.query.fbclid, 300),
            entryUrl: queryText(req.query.entry_url, 1000),
            entryPath: queryText(req.query.entry_path, 500),
            referrerUrl: queryText(req.query.referrer, 1000),
            product,
            service,
            ctaId,
            ctaLabel,
            anonymousSessionId: sessionId,
            deduplicationKey,
            events: {
              create: {
                type: "WHATSAPP_CTA_CLICKED",
                metadata: { product, ctaId, sourceCode },
              },
            },
          },
        });
      });
      leadId = created.id;
      destinationNumber = next.number;
    }

    await prisma.leadEvent.create({
      data: { leadId, type: "WHATSAPP_REDIRECTED", metadata: { deduplicated: Boolean(duplicate) } },
    });

    const textWithRef = buildWhatsAppMessage(rawText, leadCode, sourceCode, domain);
    res.redirect(`https://wa.me/${destinationNumber}?text=${encodeURIComponent(textWithRef)}`);
  } catch (error) {
    console.error("[WA_TRACKING] Redirect failed; using default number:", error);
    const text = queryText(req.query.text, 1000) || "";
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

// PUT /api/v1/wa/numbers/:id — admin: edit number / label / toggle active
// Deliberately no DELETE — deactivating keeps click history intact for
// fairness reporting instead of orphaning/cascading logged clicks.
router.put("/numbers/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const { number, label, isActive } = req.body;
    let cleanedNumber: string | undefined;
    if (number !== undefined) {
      cleanedNumber = String(number).replace(/\D/g, "");
      if (!cleanedNumber) return res.status(400).json({ error: "Nomor tidak valid" });
    }
    const updated = await prisma.whatsAppNumber.update({
      where: { id },
      data: {
        ...(cleanedNumber !== undefined && { number: cleanedNumber }),
        ...(label !== undefined && { label }),
        ...(isActive !== undefined && { isActive }),
      },
    });
    res.json({ data: updated });
  } catch (error: any) {
    if (error.code === "P2002") return res.status(409).json({ error: "Nomor ini sudah dipakai nomor lain" });
    if (error.code === "P2025") return res.status(404).json({ error: "Nomor tidak ditemukan" });
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

// GET /api/v1/wa/pages — admin: list per-page overrides (autotext + number pool)
router.get("/pages", requireAuth, async (req, res) => {
  try {
    const pages = await prisma.whatsAppPageConfig.findMany({ orderBy: { path: "asc" } });
    res.json({ data: pages });
  } catch (error) {
    console.error("Error fetching WA page configs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/wa/pages/known-paths — admin: every page path that's actually
// seen WA CTA traffic (plus any already-configured path), so the "Per
// Halaman" editor can offer a pick-list instead of free-text entry that's
// easy to typo/mismatch against the real page.
router.get("/pages/known-paths", requireAuth, async (req, res) => {
  try {
    const [clicked, configured] = await Promise.all([
      prisma.whatsAppClick.findMany({
        where: { product: { not: null } },
        select: { product: true },
        distinct: ["product"],
      }),
      prisma.whatsAppPageConfig.findMany({ select: { path: true } }),
    ]);
    const paths = Array.from(
      new Set([...clicked.map((c) => c.product as string), ...configured.map((c) => c.path)]),
    ).sort();
    res.json({ data: paths });
  } catch (error) {
    console.error("Error fetching known WA page paths:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/wa/pages/preview?path=... — admin: the actual text a page's
// button is sending right now (from the most recent lead logged for that
// path), so "Per Halaman" can start from the real current autotext instead
// of a blank field. Capped at 200 chars because that's all whatsapp.ts's
// /redirect handler persists per click (WhatsAppClick.service) — there's no
// longer copy stored anywhere, so this is a preview, not guaranteed verbatim
// for longer messages.
router.get("/pages/preview", requireAuth, async (req, res) => {
  try {
    const path = queryText(req.query.path, 300);
    if (!path) return res.status(400).json({ error: "Path wajib diisi" });
    const latest = await prisma.whatsAppClick.findFirst({
      where: { product: path },
      orderBy: { createdAt: "desc" },
      select: { service: true },
    });
    res.json({ data: { message: latest?.service || null } });
  } catch (error) {
    console.error("Error fetching WA page preview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function cleanNumberIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string" && v.trim().length > 0).slice(0, 50);
}

// POST /api/v1/wa/pages — admin: create or replace the override for a page
// path (upsert on path so re-saving the same page never dupes a row).
router.post("/pages", requireAuth, async (req, res) => {
  try {
    const path = queryText(req.body.path, 300);
    if (!path) return res.status(400).json({ error: "Path halaman wajib diisi" });
    const message = queryText(req.body.message, 1000);
    const numberIds = cleanNumberIds(req.body.numberIds);
    const saved = await prisma.whatsAppPageConfig.upsert({
      where: { path },
      create: { path, message, numberIds },
      update: { message, numberIds },
    });
    res.status(201).json({ data: saved });
  } catch (error) {
    console.error("Error saving WA page config:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/v1/wa/pages/:id — admin: edit an existing override
router.put("/pages/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const { message, numberIds } = req.body;
    const updated = await prisma.whatsAppPageConfig.update({
      where: { id },
      data: {
        ...(message !== undefined && { message: queryText(message, 1000) }),
        ...(numberIds !== undefined && { numberIds: cleanNumberIds(numberIds) }),
      },
    });
    res.json({ data: updated });
  } catch (error: any) {
    if (error.code === "P2025") return res.status(404).json({ error: "Konfigurasi halaman tidak ditemukan" });
    console.error("Error updating WA page config:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/v1/wa/pages/:id — admin: remove an override, page falls back
// to whatever text/number pool the CTA sends by default.
router.delete("/pages/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    await prisma.whatsAppPageConfig.delete({ where: { id } });
    res.status(204).end();
  } catch (error: any) {
    if (error.code === "P2025") return res.status(404).json({ error: "Konfigurasi halaman tidak ditemukan" });
    console.error("Error deleting WA page config:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/wa/leads — admin: every rotator click as a trackable lead,
// filterable by status/number/domain, plus an overall funnel summary.
router.get("/leads", requireAuth, async (req, res) => {
  try {
    const { status, numberId, domain, source, product, search } = req.query as Record<string, string>;
    const where: any = {};
    if (status) {
      if (!isValidStage(status)) return res.status(400).json({ error: "Status Lead tidak valid" });
      where.status = status;
    }
    if (numberId) where.numberId = numberId;
    if (domain) where.domain = domain;
    if (source) where.source = source;
    if (product) where.product = product;
    if (search) where.leadCode = { contains: search.toUpperCase(), mode: "insensitive" };
    const page = Math.max(1, Number(req.query.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 25));

    const [leads, statusCounts, sourceCounts] = await Promise.all([
      prisma.whatsAppClick.findMany({
        where,
        include: { number: { select: { number: true, label: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
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

    const total = statusCounts.reduce((sum, row) => sum + row._count.status, 0);
    const funnel = Object.fromEntries(statusCounts.map((s) => [s.status, s._count.status]));
    const bySource = Object.fromEntries(sourceCounts.map((s) => [s.source || "unknown", s._count.source]));
    res.json({
      data: leads.map((lead) => ({ ...lead, temperature: getLeadTemperature(lead.status) })),
      meta: { funnel, bySource, total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
    });
  } catch (error) {
    console.error("Error fetching WA leads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/leads/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const lead = await prisma.whatsAppClick.findUnique({
      where: { id },
      include: {
        number: { select: { number: true, label: true } },
        events: { orderBy: { createdAt: "asc" } },
        stageHistory: { orderBy: { createdAt: "asc" } },
      },
    });
    if (!lead) return res.status(404).json({ error: "Lead tidak ditemukan" });
    res.json({ data: { ...lead, temperature: getLeadTemperature(lead.status) } });
  } catch (error) {
    console.error("Error fetching WA lead detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/v1/wa/leads/:id — admin: update a lead's status/notes as CS
// follows up the real conversation (matched via the leadCode in the chat).
router.put("/leads/:id", requireAuth, async (req: AuthedRequest, res) => {
  try {
    const { id } = req.params as { id: string };
    const { status, notes, lostReason, orderValue } = req.body;
    const current = await prisma.whatsAppClick.findUnique({ where: { id } });
    if (!current) return res.status(404).json({ error: "Lead tidak ditemukan" });
    if (status !== undefined && !isValidStage(status)) {
      return res.status(400).json({ error: "Status Lead tidak valid" });
    }
    if (status && !isValidStageTransition(current.status, status)) {
      return res.status(409).json({ error: `Transisi ${current.status} ke ${status} tidak diizinkan` });
    }
    if (status === "LOST" && !queryText(lostReason, 300)) {
      return res.status(400).json({ error: "Alasan Lead tidak jadi wajib diisi" });
    }
    if (status === "WON" && (!Number.isFinite(Number(orderValue)) || Number(orderValue) < 0)) {
      return res.status(400).json({ error: "Nilai order wajib diisi untuk Lead closing" });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const lead = await tx.whatsAppClick.update({
        where: { id },
        data: {
          ...(status !== undefined && { status }),
          ...(notes !== undefined && { notes: queryText(notes, 5000) }),
          ...(status === "LOST" && { lostReason: queryText(lostReason, 300), lostAt: new Date() }),
          ...(status === "WON" && { orderValue: Math.round(Number(orderValue)), wonAt: new Date() }),
        },
      });
      if (status && status !== current.status) {
        await tx.leadStageHistory.create({
          data: {
            leadId: id,
            fromStage: current.status,
            toStage: status,
            changedByUserId: req.userId,
            reason: status === "LOST" ? queryText(lostReason, 300) : null,
          },
        });
        await tx.leadEvent.create({
          data: {
            leadId: id,
            type: current.status === "LOST" ? "LEAD_REOPENED" : "STAGE_CHANGED",
            metadata: { from: current.status, to: status },
          },
        });
      }
      return lead;
    });
    res.json({ data: { ...updated, temperature: getLeadTemperature(updated.status) } });
  } catch (error) {
    console.error("Error updating WA lead:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
