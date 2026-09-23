import { Router } from "express";
import { createHash } from "node:crypto";

const router = Router();

// Standalone Meta Ads landing pages (apps/web-id/src/app/<slug>/) call this
// endpoint instead of hitting Google Sheets / Fonnte / Meta Conversions API
// directly from the browser — those three each need either a secret token
// (Fonnte, Meta CAPI) or a domain not present in web-id's CSP connect-src
// (script.google.com, api.fonnte.com), so the calls must originate here.
// Public/unauthenticated by design — same trust model as /api/v1/wa/redirect.
type CampaignConfig = {
  sheetWebhookUrl: string;
  buildFonnteMessage: (nama: string, layanan: string) => string;
};

const CAMPAIGNS: Record<string, CampaignConfig> = {
  "layanan-easylegal-metaads": {
    sheetWebhookUrl: process.env.CAMPAIGN_LEAD_SHEET_URL || "",
    buildFonnteMessage: (nama, layanan) =>
      `Halo ${nama}!\nTerima kasih telah menghubungi EasyLegal.\n\n Kami telah menerima permintaan konsultasi Anda untuk layanan ${layanan}.\nPersonal Legal Assistant (PLA) kami akan segera meninjau data Anda dan membalas chat ini dalam waktu singkat.`,
  },
};

function hash(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("62")) return digits;
  return "62" + digits;
}

// POST /api/v1/campaign-leads/:slug — public: forward a landing-page lead to
// Google Sheets, Fonnte autochat, and Meta Conversions API server-side.
router.post("/:slug", async (req, res) => {
  const { slug } = req.params as { slug: string };
  const campaign = CAMPAIGNS[slug];
  if (!campaign) {
    return res.status(404).json({ error: "Campaign tidak ditemukan" });
  }

  const { nama, whatsapp, layanan, fbEventId } = req.body || {};
  if (!nama || !whatsapp || !layanan) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  const results = { sheet: false, fonnte: false, fbCapi: false };

  if (campaign.sheetWebhookUrl) {
    try {
      await fetch(campaign.sheetWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ nama, whatsapp, layanan }),
      });
      results.sheet = true;
    } catch (err) {
      console.error("[campaign-leads] Google Sheets forward failed:", err);
    }
  }

  const fonnteToken = process.env.CAMPAIGN_FONNTE_TOKEN;
  if (fonnteToken) {
    try {
      const fonnteBody = new URLSearchParams({
        target: normalizePhone(String(whatsapp)),
        message: campaign.buildFonnteMessage(String(nama), String(layanan)),
        delay: "2",
      });
      const fonnteRes = await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: { Authorization: fonnteToken },
        body: fonnteBody,
      });
      results.fonnte = fonnteRes.ok;
      if (!fonnteRes.ok) {
        console.error("[campaign-leads] Fonnte HTTP %s: %s", fonnteRes.status, await fonnteRes.text());
      }
    } catch (err) {
      console.error("[campaign-leads] Fonnte send failed:", err);
    }
  } else {
    console.warn("[campaign-leads] CAMPAIGN_FONNTE_TOKEN belum diset — autochat Fonnte dilewati");
  }

  const fbPixelId = process.env.CAMPAIGN_FB_PIXEL_ID;
  const fbToken = process.env.CAMPAIGN_FB_CONVERSION_TOKEN;
  if (fbPixelId && fbToken) {
    try {
      const payload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: fbEventId,
            action_source: "website",
            user_data: {
              ph: [hash(normalizePhone(String(whatsapp)))],
              ...(nama ? { fn: [hash(String(nama).split(" ")[0] || "")] } : {}),
            },
          },
        ],
      };
      const fbRes = await fetch(
        `https://graph.facebook.com/v21.0/${fbPixelId}/events?access_token=${encodeURIComponent(fbToken)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      results.fbCapi = fbRes.ok;
    } catch (err) {
      console.error("[campaign-leads] Meta Conversions API failed:", err);
    }
  }

  res.json({ ok: true, results });
});

export default router;
