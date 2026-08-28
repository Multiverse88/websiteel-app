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

const PAID_MEDIA = new Set(["cpc", "ppc", "paid", "paid_social", "display"]);

function clean(value: unknown, maxLength = 200): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().slice(0, maxLength);
  return normalized || null;
}

export function classifyAttribution(
  query: Record<string, unknown>,
  referrer: string | null,
): AttributionResult {
  const utmSource = clean(query.utm_source)?.toLowerCase() ?? null;
  const utmMedium = clean(query.utm_medium)?.toLowerCase() ?? null;
  const referralCode = clean(query.ref, 80);

  if (clean(query.gclid) || (utmSource === "google" && utmMedium && PAID_MEDIA.has(utmMedium))) {
    return { channel: "GOOGLE_ADS", sourceCode: "gads", referralCode };
  }
  if (
    clean(query.fbclid) ||
    ((utmSource === "facebook" || utmSource === "instagram" || utmSource === "meta") &&
      (!utmMedium || PAID_MEDIA.has(utmMedium)))
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

export function buildWhatsAppMessage(
  message: string,
  leadCode: string,
  sourceCode: LeadSourceCode,
): string {
  const cleanMessage = message.trim().slice(0, 1000);
  const trackingReference = `[Ref: ${leadCode} | Source: ${sourceCode}]`;
  return cleanMessage ? `${cleanMessage}\n\n${trackingReference}` : trackingReference;
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
