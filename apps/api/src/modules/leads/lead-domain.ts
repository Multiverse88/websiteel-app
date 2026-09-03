export const LEAD_STAGES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "WON",
  "LOST",
] as const;

export type LeadStage = (typeof LEAD_STAGES)[number];
export type LeadTemperature = "COLD" | "WARM" | "HOT";
export type LeadSourceCode =
  | "gads"
  | "metaads"
  | "googleseo"
  | "referral"
  | "direct"
  | "other"
  | "unknown";

export type AttributionChannel =
  | "GOOGLE_ADS"
  | "META_ADS"
  | "ORGANIC_SEARCH"
  | "REFERRAL"
  | "DIRECT"
  | "OTHER"
  | "UNKNOWN";

export interface AttributionResult {
  channel: AttributionChannel;
  sourceCode: LeadSourceCode;
  referralCode: string | null;
}

const LEAD_DOMAINS = new Set([
  "easylegal.biz.id",
  "easylegal.co.id",
  "easylegal.id",
]);

export function normalizeLeadDomain(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const domain = value.trim().toLowerCase().replace(/^www\./, "");
  return LEAD_DOMAINS.has(domain) ? domain : null;
}

const PAID_MEDIA = new Set(["cpc", "ppc", "paid", "paid_social", "display"]);

// Mirrors apps/web/src/lib/attribution.ts's slug fallback — ad-campaign
// landing pages use these suffixes by convention (next.config.ts rewrites()),
// and Next.js rewrites don't change the visible URL, so it survives even
// when gclid/fbclid/utm got stripped before reaching this fallback path
// (client JS didn't run, cookie was cleared, etc).
const GOOGLE_AD_SLUG = /-(gads|dads|pmax|ytads)(-|$)/i;
const META_AD_SLUG = /meta-ads/i;

function clean(value: unknown, maxLength = 200): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().slice(0, maxLength);
  return normalized || null;
}

export function classifyAttribution(
  query: Record<string, unknown>,
  referrer: string | null,
  entryPath: string | null = null,
): AttributionResult {
  const utmSource = clean(query.utm_source)?.toLowerCase() ?? null;
  const utmMedium = clean(query.utm_medium)?.toLowerCase() ?? null;
  const referralCode = clean(query.ref, 80);
  const path = entryPath || "";

  if (clean(query.gclid) || (utmSource === "google" && utmMedium && PAID_MEDIA.has(utmMedium)) || GOOGLE_AD_SLUG.test(path)) {
    return { channel: "GOOGLE_ADS", sourceCode: "gads", referralCode };
  }
  if (
    clean(query.fbclid) ||
    ((utmSource === "facebook" || utmSource === "instagram" || utmSource === "meta") &&
      (!utmMedium || PAID_MEDIA.has(utmMedium))) ||
    META_AD_SLUG.test(path)
  ) {
    return { channel: "META_ADS", sourceCode: "metaads", referralCode };
  }
  if (referralCode) {
    return { channel: "REFERRAL", sourceCode: "referral", referralCode };
  }
  if (!referrer) {
    return { channel: "DIRECT", sourceCode: "direct", referralCode: null };
  }

  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (/(^|\.)google\.[a-z.]+$/.test(host)) {
      return { channel: "ORGANIC_SEARCH", sourceCode: "googleseo", referralCode: null };
    }
    return { channel: "OTHER", sourceCode: "other", referralCode: null };
  } catch {
    return { channel: "UNKNOWN", sourceCode: "unknown", referralCode: null };
  }
}

export function normalizeSourceCode(value: unknown): LeadSourceCode | null {
  const normalized = clean(value, 20)?.toLowerCase();
  if (!normalized) return null;
  if (normalized === "seo") return "googleseo";
  return (["gads", "metaads", "googleseo", "referral", "direct", "other", "unknown"] as const)
    .find((source) => source === normalized) ?? null;
}

export function sourceCodeToChannel(source: LeadSourceCode): AttributionChannel {
  return {
    gads: "GOOGLE_ADS",
    metaads: "META_ADS",
    googleseo: "ORGANIC_SEARCH",
    referral: "REFERRAL",
    direct: "DIRECT",
    other: "OTHER",
    unknown: "UNKNOWN",
  }[source] as AttributionChannel;
}

// Human-readable label for the "(Source; Domain)" tail — matches the label
// set already shown in the admin dashboard (WhatsAppRotator.tsx SOURCE_LABELS).
export const SOURCE_LABELS: Record<LeadSourceCode, string> = {
  gads: "Google Ads",
  metaads: "Meta Ads",
  googleseo: "Google SEO",
  referral: "Referral",
  direct: "Langsung",
  other: "Lainnya",
  unknown: "Tidak diketahui",
};

// Most getWhatsAppLink() call sites write a message starting with a generic
// "Halo <Someone>," greeting (e.g. "Halo EasyLegal,", "Halo EasyOffice
// Bandung,") baked into the button text — strip that off so it can be
// replaced with a greeting personalized to the CS agent who'll actually
// answer, instead of ending up with two greetings back to back.
const GENERIC_GREETING = /^hal(l)?o\s+[^,]+,\s*/i;

// Builds the actual WhatsApp message text: personalized greeting (the picked
// number's own label, so the CS agent's name is right there — e.g. "Hallo
// Kak Naufal"), the button's own message stripped of its generic greeting,
// then a human-readable "(Source; Domain | Ref: leadCode)" tail. leadCode
// stays in the tail (not dropped) — it's the only channel CS/admin has to
// match the live WA chat back to the lead row in the dashboard.
export function buildWhatsAppMessage(
  message: string,
  leadCode: string,
  sourceCode: LeadSourceCode,
  domain?: string | null,
  numberLabel?: string | null,
): string {
  const cleanMessage = message.trim().slice(0, 1000);
  const body = cleanMessage.replace(GENERIC_GREETING, "").trim();
  const greeting = numberLabel ? `Hallo Kak ${numberLabel}` : "Hallo";
  const tailParts = [SOURCE_LABELS[sourceCode] ?? sourceCode];
  if (domain) tailParts.push(domain);
  const tail = `(${tailParts.join("; ")} | Ref: ${leadCode})`;
  return body ? `${greeting} ${body} ${tail}` : `${greeting} ${tail}`;
}

export function getLeadTemperature(stage: LeadStage): LeadTemperature {
  if (stage === "WON") return "HOT";
  if (stage === "NEW" || stage === "LOST") return "COLD";
  return "WARM";
}

const ALLOWED_TRANSITIONS: Record<LeadStage, readonly LeadStage[]> = {
  NEW: ["CONTACTED", "LOST"],
  CONTACTED: ["QUALIFIED", "LOST"],
  QUALIFIED: ["PROPOSAL", "LOST"],
  PROPOSAL: ["WON", "LOST"],
  WON: [],
  LOST: ["CONTACTED"],
};

export function isValidStage(value: unknown): value is LeadStage {
  return typeof value === "string" && (LEAD_STAGES as readonly string[]).includes(value);
}

export function isValidStageTransition(from: LeadStage, to: LeadStage): boolean {
  return from === to || ALLOWED_TRANSITIONS[from].includes(to);
}
