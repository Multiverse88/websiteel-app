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
  normalizeLeadDomain,
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

function cleanSlug(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-");
}

// Leads dashboard date-range filter (from/to as "YYYY-MM-DD"). `to` is
// treated as inclusive of the whole day (23:59:59.999), matching how a date
// picker's "sampai tanggal X" reads to a non-technical user. Returns
// undefined (not applied) if both are missing/invalid so callers can just do
// `if (range) where.createdAt = range`.
function buildDateRangeFilter(from?: string, to?: string): { gte?: Date; lte?: Date } | undefined {
  const range: { gte?: Date; lte?: Date } = {};
  if (from) {
    const d = new Date(from);
    if (!Number.isNaN(d.getTime())) range.gte = d;
  }
  if (to) {
    const d = new Date(to);
    if (!Number.isNaN(d.getTime())) {
      d.setHours(23, 59, 59, 999);
      range.lte = d;
    }
  }
  return range.gte || range.lte ? range : undefined;
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
    let product = queryText(req.query.product, 300);
    const ctaId = queryText(req.query.cta_id, 100);

    // Frontends send domain explicitly because Referrer-Policy may omit the
    // Referer header. Only known public domains are accepted; Referer remains
    // a fallback for old links already deployed.
    let domain = normalizeLeadDomain(req.query.domain);
    if (!domain && req.headers.referer) {
      try {
        domain = normalizeLeadDomain(new URL(req.headers.referer).hostname);
      } catch { /* ignore malformed Referer */ }
    }

    // NOTE: there used to be a Referer-header fallback here for when `product`
    // arrives empty. It was removed (2026-09-07) because it was based on an
    // incorrect assumption: this endpoint is always a CROSS-ORIGIN request
    // (pageview app on easylegal.{id,biz.id,co.id} -> this api on
    // api.easylegal.my.id), and `Referrer-Policy: strict-origin-when-cross-origin`
    // withholds the path for cross-origin requests — the browser only ever
    // sends the origin (e.g. "https://easylegal.id"), never the real page
    // path. `new URL(referer).pathname` on an origin-only Referer resolves to
    // "/", so this "fallback" was silently mislabeling every affected click as
    // coming from the homepage instead of leaving it honestly unknown.
    //
    // The real fix for missing `product` lives upstream, in
    // apps/web*/src/lib/config.ts getWhatsAppLink(path) — the page path is now
    // baked into the href at render time (server or client render, before any
    // click/hydration JS runs), so the link is correct from the very first
    // HTML byte and doesn't depend on a click listener attaching in time.

    // Per-page/per-button/per-domain override (admin-editable, see /pages
    // routes below) — keyed by (path, ctaId, domain), each axis "" meaning
    // "matches anything". Picks the most specific matching row: exact ctaId
    // + exact domain beats either falling back to "" — see scoreConfig().
    // numberIds (rotator pool restriction) only ever comes from a ctaId=""
    // row, scored by domain specificity alone.
    const wantedCtaIds = Array.from(new Set([ctaId || "", ""]));
    const wantedDomains = Array.from(new Set([domain || "", ""]));
    const pageConfigRows = product
      ? await prisma.whatsAppPageConfig.findMany({ where: { path: product, ctaId: { in: wantedCtaIds }, domain: { in: wantedDomains } } })
      : [];
    const scoreConfig = (row: { ctaId: string; domain: string }) =>
      (ctaId && row.ctaId === ctaId ? 2 : 0) + (domain && row.domain === domain ? 1 : 0);
    const messageConfig = pageConfigRows
      .filter((r) => r.ctaId === (ctaId || "") || r.ctaId === "")
      .sort((a, b) => scoreConfig(b) - scoreConfig(a))[0];
    const numberConfig = pageConfigRows
      .filter((r) => r.ctaId === "")
      .sort((a, b) => scoreConfig(b) - scoreConfig(a))[0];
    const rawText = (messageConfig?.message || queryText(req.query.text, 1000)) || "";
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
    const ctaLabel = queryText(req.query.cta_label, 200);
    const deduplicationKey = sessionId
      ? [sessionId, product || "", ctaId || service || ""].join(":").slice(0, 500)
      : null;

    const numberWhere: { isActive: boolean; id?: { in: string[] } } = { isActive: true };
    if (numberConfig?.numberIds?.length) numberWhere.id = { in: numberConfig.numberIds };
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
    let destinationLabel: string | null;
    if (duplicate) {
      leadCode = duplicate.leadCode;
      leadId = duplicate.id;
      destinationNumber = duplicate.number.number;
      destinationLabel = duplicate.number.label;
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
      destinationLabel = next.label;
    }

    await prisma.leadEvent.create({
      data: { leadId, type: "WHATSAPP_REDIRECTED", metadata: { deduplicated: Boolean(duplicate) } },
    });

    const textWithRef = buildWhatsAppMessage(rawText, leadCode, sourceCode, domain, destinationLabel);
    res.redirect(`https://wa.me/${destinationNumber}?text=${encodeURIComponent(textWithRef)}`);
  } catch (error) {
    console.error("[WA_TRACKING] Redirect failed; using default number:", error);
    const text = queryText(req.query.text, 1000) || "";
    res.redirect(`https://wa.me/6281123456789?text=${encodeURIComponent(text)}`);
  }
});

// GET /api/v1/wa/s/:slug (and /api/v1/wa/slug/:slug) — Public
// Custom slug-based WhatsApp rotator link (e.g. /wa/promo-pt):
// - Connects slug to domain (or "" for all domains)
// - Statically enforces attribution source (e.g. "metaads", "gads", "tiktok", "offline")
// - Uses configured message template
// - Rotates fairly among active numbers (or a restricted pool)
// - Creates a trackable lead with leadCode and 302s to wa.me
const handleSlugRedirect = async (req: any, res: any) => {
  const rawSlug = req.params.slug;
  const slug = cleanSlug(rawSlug);
  if (!slug) {
    return res.status(400).json({ error: "Slug tidak valid" });
  }

  // Detect domain (explicit query param -> referer header -> host header)
  let domain = normalizeLeadDomain(req.query.domain);
  if (!domain && req.headers.referer) {
    try {
      domain = normalizeLeadDomain(new URL(req.headers.referer).hostname);
    } catch { /* ignore */ }
  }
  if (!domain && req.headers.host) {
    try {
      domain = normalizeLeadDomain(req.headers.host.split(":")[0]);
    } catch { /* ignore */ }
  }

  try {
    const wantedDomains = Array.from(new Set([domain || "", ""]));
    const candidates = await prisma.whatsAppSlug.findMany({
      where: {
        slug,
        domain: { in: wantedDomains },
        isActive: true,
      },
    });

    // Score specificity: exact domain match (2) > all-domain "" (1)
    const sorted = candidates.sort((a, b) => {
      const scoreA = domain && a.domain === domain ? 2 : 1;
      const scoreB = domain && b.domain === domain ? 2 : 1;
      return scoreB - scoreA;
    });

    const slugConfig = sorted[0];

    if (!slugConfig) {
      console.warn(`[WA_SLUG] Slug not found or inactive: "${slug}" for domain "${domain || "all"}"`);
      const fallbackText = queryText(req.query.text, 1000) || "";
      return res.redirect(`https://wa.me/6281123456789?text=${encodeURIComponent(fallbackText)}`);
    }

    // Fire-and-forget increment click counter on the slug
    prisma.whatsAppSlug
      .update({
        where: { id: slugConfig.id },
        data: { clicks: { increment: 1 } },
      })
      .catch((err) => console.error("[WA_SLUG] Failed to increment slug clicks:", err));

    // Statically configured source attribution
    const staticSource = slugConfig.source || "direct";
    const normalizedSource = normalizeSourceCode(staticSource) || "other";
    const channel = sourceCodeToChannel(normalizedSource);

    // Message template
    const rawText = slugConfig.message || queryText(req.query.text, 1000) || "";
    const product = `/wa/${slug}`;
    const service = rawText ? rawText.slice(0, 200) : `Rotator: ${slug}`;
    const ctaLabel = slugConfig.description || `Slug: ${slug}`;

    // Number selection from restricted pool or all active numbers
    const numberWhere: { isActive: boolean; id?: { in: string[] } } = { isActive: true };
    if (slugConfig.numberIds && slugConfig.numberIds.length > 0) {
      numberWhere.id = { in: slugConfig.numberIds };
    }

    const next = await prisma.whatsAppNumber.findFirst({
      where: numberWhere,
      orderBy: [{ clickCount: "asc" }, { createdAt: "asc" }],
    });

    if (!next) {
      console.error("[WA_SLUG] No active WhatsApp number available in pool");
      return res.redirect(`https://wa.me/6281123456789?text=${encodeURIComponent(rawText)}`);
    }

    // Generate unique leadCode & log lead
    let leadCode = generateLeadCode();
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
          domain: domain || (slugConfig.domain ? slugConfig.domain : null),
          leadCode,
          source: staticSource,
          sourceCode: staticSource,
          channel,
          referralCode: queryText(req.query.ref, 80),
          utmSource: queryText(req.query.utm_source, 120),
          utmMedium: queryText(req.query.utm_medium, 120),
          utmCampaign: queryText(req.query.utm_campaign, 200),
          utmContent: queryText(req.query.utm_content, 200),
          utmTerm: queryText(req.query.utm_term, 200),
          gclid: queryText(req.query.gclid, 300),
          fbclid: queryText(req.query.fbclid, 300),
          entryUrl: queryText(req.query.entry_url, 1000) || `${req.protocol}://${req.get("host")}${req.originalUrl}`,
          entryPath: product,
          referrerUrl: queryText(req.query.referrer, 1000) || req.headers.referer || null,
          product,
          service,
          ctaId: `slug:${slug}`,
          ctaLabel,
          events: {
            create: {
              type: "WHATSAPP_CTA_CLICKED",
              metadata: { slug, staticSource, domain },
            },
          },
        },
      });
    });

    await prisma.leadEvent.create({
      data: { leadId: created.id, type: "WHATSAPP_REDIRECTED", metadata: { slug } },
    });

    const textWithRef = buildWhatsAppMessage(
      rawText,
      leadCode,
      staticSource,
      domain || slugConfig.domain || null,
      next.label,
    );

    return res.redirect(`https://wa.me/${next.number}?text=${encodeURIComponent(textWithRef)}`);
  } catch (error) {
    console.error("[WA_SLUG] Redirect failed with error:", error);
    const text = queryText(req.query.text, 1000) || "";
    return res.redirect(`https://wa.me/6281123456789?text=${encodeURIComponent(text)}`);
  }
};

router.get("/s/:slug", handleSlugRedirect);
router.get("/slug/:slug", handleSlugRedirect);

// GET /api/v1/wa/slugs — admin: list all WhatsApp slugs
router.get("/slugs", requireAuth, async (req, res) => {
  try {
    const { domain, source, search } = req.query as Record<string, string>;
    const where: any = {};
    if (domain !== undefined && domain !== "") {
      where.domain = domain;
    }
    if (source) {
      where.source = source;
    }
    if (search) {
      where.OR = [
        { slug: { contains: search.toLowerCase(), mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }
    const slugs = await prisma.whatsAppSlug.findMany({
      where,
      orderBy: [{ createdAt: "desc" }],
    });
    res.json({ data: slugs });
  } catch (error) {
    console.error("Error fetching WA slugs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/wa/slugs — admin: create a new slug config
router.post("/slugs", requireAuth, async (req, res) => {
  try {
    const slug = cleanSlug(req.body.slug);
    if (!slug) {
      return res.status(400).json({ error: "Slug wajib diisi dan hanya boleh mengandung huruf, angka, tanda hubung" });
    }

    const domain = queryText(req.body.domain, 200) || "";
    const source = queryText(req.body.source, 50) || "direct";
    const message = queryText(req.body.message, 1000);
    const numberIds = cleanNumberIds(req.body.numberIds);
    const description = queryText(req.body.description, 300);
    const isActive = req.body.isActive !== false;

    // Check unique constraint (domain, slug)
    const existing = await prisma.whatsAppSlug.findUnique({
      where: { domain_slug: { domain, slug } },
    });
    if (existing) {
      return res.status(409).json({ error: `Slug "${slug}" sudah digunakan untuk domain "${domain || "Semua Domain"}"` });
    }

    const created = await prisma.whatsAppSlug.create({
      data: {
        slug,
        domain,
        source,
        message,
        numberIds,
        description,
        isActive,
      },
    });

    res.status(201).json({ data: created });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Slug sudah digunakan untuk domain ini" });
    }
    console.error("Error creating WA slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/v1/wa/slugs/:id — admin: update an existing slug config
router.put("/slugs/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const existing = await prisma.whatsAppSlug.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Slug tidak ditemukan" });
    }

    const dataToUpdate: any = {};
    if (req.body.slug !== undefined) {
      const cleaned = cleanSlug(req.body.slug);
      if (!cleaned) return res.status(400).json({ error: "Slug tidak valid" });
      dataToUpdate.slug = cleaned;
    }
    if (req.body.domain !== undefined) {
      dataToUpdate.domain = queryText(req.body.domain, 200) || "";
    }
    if (req.body.source !== undefined) {
      dataToUpdate.source = queryText(req.body.source, 50) || "direct";
    }
    if (req.body.message !== undefined) {
      dataToUpdate.message = queryText(req.body.message, 1000);
    }
    if (req.body.numberIds !== undefined) {
      dataToUpdate.numberIds = cleanNumberIds(req.body.numberIds);
    }
    if (req.body.description !== undefined) {
      dataToUpdate.description = queryText(req.body.description, 300);
    }
    if (req.body.isActive !== undefined) {
      dataToUpdate.isActive = Boolean(req.body.isActive);
    }

    const updated = await prisma.whatsAppSlug.update({
      where: { id },
      data: dataToUpdate,
    });

    res.json({ data: updated });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Kombinasi Domain dan Slug sudah digunakan" });
    }
    console.error("Error updating WA slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/v1/wa/slugs/:id — admin: delete a slug config
router.delete("/slugs/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    await prisma.whatsAppSlug.delete({ where: { id } });
    res.json({ success: true, message: "Slug WhatsApp berhasil dihapus" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Slug tidak ditemukan" });
    }
    console.error("Error deleting WA slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
    const pages = await prisma.whatsAppPageConfig.findMany({ orderBy: [{ path: "asc" }, { ctaId: "asc" }, { domain: "asc" }] });
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

// GET /api/v1/wa/pages/preview?path=...&cta_id=...&domain=... — admin: the
// actual text a page (or one specific button, and/or one specific domain,
// if given) is sending right now (from the most recent matching lead), so
// "Per Halaman" can start from the real current autotext instead of a blank
// field. Capped at 200 chars because that's all whatsapp.ts's /redirect
// handler persists per click (WhatsAppClick.service) — there's no longer
// copy stored anywhere, so this is a preview, not guaranteed verbatim for
// longer messages.
router.get("/pages/preview", requireAuth, async (req, res) => {
  try {
    const path = queryText(req.query.path, 300);
    if (!path) return res.status(400).json({ error: "Path wajib diisi" });
    const ctaId = queryText(req.query.cta_id, 100);
    const domain = queryText(req.query.domain, 200);
    const latest = await prisma.whatsAppClick.findFirst({
      where: { product: path, ...(ctaId && { ctaId }), ...(domain && { domain }) },
      orderBy: { createdAt: "desc" },
      select: { service: true },
    });
    res.json({ data: { message: latest?.service || null } });
  } catch (error) {
    console.error("Error fetching WA page preview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/wa/pages/known-buttons?path=... — admin: every distinct
// button (ctaId) that's sent traffic from this page, with a text sample, so
// "Per Halaman" can offer a per-button pick-list the same way known-paths
// offers pages — reads data the rotator already logs, no new instrumentation.
router.get("/pages/known-buttons", requireAuth, async (req, res) => {
  try {
    const path = queryText(req.query.path, 300);
    if (!path) return res.status(400).json({ error: "Path wajib diisi" });
    const [clicked, configured] = await Promise.all([
      prisma.whatsAppClick.findMany({
        where: { product: path, ctaId: { not: null } },
        select: { ctaId: true, service: true },
        distinct: ["ctaId"],
        orderBy: { createdAt: "desc" },
      }),
      prisma.whatsAppPageConfig.findMany({ where: { path, ctaId: { not: "" } }, select: { ctaId: true } }),
    ]);
    const sample = new Map(clicked.map((c) => [c.ctaId as string, c.service]));
    const ids = Array.from(new Set([...clicked.map((c) => c.ctaId as string), ...configured.map((c) => c.ctaId)]));
    res.json({ data: ids.sort().map((ctaId) => ({ ctaId, sample: sample.get(ctaId) || null })) });
  } catch (error) {
    console.error("Error fetching known WA buttons:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function cleanNumberIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string" && v.trim().length > 0).slice(0, 50);
}

// POST /api/v1/wa/pages — admin: create or replace the override for a page
// (or one button on it, if ctaId given, and/or one domain, if domain given)
// — upsert on (path, ctaId, domain) so re-saving the same target never dupes
// a row. numberIds is ignored for button-level rows (ctaId set) — the
// rotator pool only makes sense page-wide, see the schema comment.
router.post("/pages", requireAuth, async (req, res) => {
  try {
    const path = queryText(req.body.path, 300);
    if (!path) return res.status(400).json({ error: "Path halaman wajib diisi" });
    const ctaId = queryText(req.body.ctaId, 100) || "";
    const domain = queryText(req.body.domain, 200) || "";
    const message = queryText(req.body.message, 1000);
    const numberIds = ctaId ? [] : cleanNumberIds(req.body.numberIds);
    const saved = await prisma.whatsAppPageConfig.upsert({
      where: { path_ctaId_domain: { path, ctaId, domain } },
      create: { path, ctaId, domain, message, numberIds },
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
    const { status, numberId, domain, source, product, search, from, to } = req.query as Record<string, string>;
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
    const dateRange = buildDateRangeFilter(from, to);
    if (dateRange) where.createdAt = dateRange;
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

// GET /api/v1/wa/leads/stats — admin: bucketed counts for the Leads
// dashboard's detail views (per hari/minggu/bulan, per nomor, per sumber,
// per layanan). Same filters as /leads (status/domain/source/numberId), but
// aggregated server-side — /leads itself is paginated (max 100/page) so with
// thousands of leads the breakdown can't be computed correctly from just
// whatever page happens to be loaded client-side.
// IMPORTANT: registered before /leads/:id so Express doesn't treat "stats"
// as a lead id.
router.get("/leads/stats", requireAuth, async (req, res) => {
  try {
    const { status, numberId, domain, source, groupBy, from, to } = req.query as Record<string, string>;
    if (!["day", "week", "month", "number", "source", "service"].includes(groupBy)) {
      return res.status(400).json({ error: "groupBy tidak valid — pakai day, week, month, number, source, atau service" });
    }
    if (status && !isValidStage(status)) return res.status(400).json({ error: "Status Lead tidak valid" });

    const where: any = {};
    if (status) where.status = status;
    if (numberId) where.numberId = numberId;
    if (domain) where.domain = domain;
    if (source) where.source = source;
    const dateRange = buildDateRangeFilter(from, to);
    if (dateRange) where.createdAt = dateRange;

    if (groupBy === "number") {
      const rows = await prisma.whatsAppClick.groupBy({ by: ["numberId"], where, _count: { numberId: true } });
      const numbers = await prisma.whatsAppNumber.findMany({
        where: { id: { in: rows.map((r) => r.numberId) } },
        select: { id: true, number: true, label: true },
      });
      const data = rows
        .map((r) => {
          const n = numbers.find((x) => x.id === r.numberId);
          return { key: r.numberId, label: n?.label || n?.number || r.numberId, count: r._count.numberId };
        })
        .sort((a, b) => b.count - a.count);
      return res.json({ data });
    }

    if (groupBy === "source") {
      const rows = await prisma.whatsAppClick.groupBy({ by: ["sourceCode"], where, _count: { sourceCode: true } });
      const data = rows
        .map((r) => ({ key: r.sourceCode, label: r.sourceCode || "unknown", count: r._count.sourceCode }))
        .sort((a, b) => b.count - a.count);
      return res.json({ data });
    }

    if (groupBy === "service") {
      const rows = await prisma.whatsAppClick.groupBy({ by: ["service"], where, _count: { service: true } });
      const data = rows
        .map((r) => ({ key: r.service || "(tidak diketahui)", label: r.service || "(tidak diketahui)", count: r._count.service }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 30); // service is free text (WA message), can have huge cardinality — top 30 only
      return res.json({ data });
    }

    // day / week / month — needs date_trunc, which Prisma's groupBy can't do,
    // so raw SQL. groupBy is whitelisted above (day/week/month only) before
    // reaching here, so it's safe to interpolate directly (not user input
    // reaching the query unescaped — still parameterize the actual filter
    // values via $queryRawUnsafe's positional args).
    const conditions: string[] = [];
    const params: unknown[] = [];
    if (where.status) { params.push(where.status); conditions.push(`"status" = $${params.length}`); }
    if (where.numberId) { params.push(where.numberId); conditions.push(`"numberId" = $${params.length}`); }
    if (where.domain) { params.push(where.domain); conditions.push(`"domain" = $${params.length}`); }
    if (where.source) { params.push(where.source); conditions.push(`"source" = $${params.length}`); }
    if (dateRange?.gte) { params.push(dateRange.gte); conditions.push(`"createdAt" >= $${params.length}`); }
    if (dateRange?.lte) { params.push(dateRange.lte); conditions.push(`"createdAt" <= $${params.length}`); }
    const whereSql = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const rows = await prisma.$queryRawUnsafe<{ bucket: Date; count: bigint }[]>(
      `SELECT date_trunc('${groupBy}', "createdAt") AS bucket, COUNT(*)::bigint AS count
       FROM "WhatsAppClick"
       ${whereSql}
       GROUP BY bucket
       ORDER BY bucket DESC
       LIMIT 60`,
      ...params,
    );
    const data = rows.map((r) => ({ key: r.bucket.toISOString(), label: r.bucket.toISOString(), count: Number(r.count) }));
    res.json({ data });
  } catch (error) {
    console.error("Error fetching WA lead stats:", error);
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
