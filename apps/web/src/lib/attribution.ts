export type LeadSourceCode = "gads" | "metaads" | "googleseo" | "referral" | "direct" | "other" | "unknown";

export interface AttributionSnapshot {
  source: LeadSourceCode;
  entryUrl: string;
  entryPath: string;
  referrer: string;
  referralCode: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  gclid: string;
  fbclid: string;
  sessionId: string;
}

const ATTRIBUTION_COOKIE = "el_attribution";
const SESSION_COOKIE = "el_lead_session";
const MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, maxAge: number) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function classify(params: URLSearchParams, referrer: string): LeadSourceCode {
  const source = params.get("utm_source")?.toLowerCase() || "";
  const medium = params.get("utm_medium")?.toLowerCase() || "";
  const paid = ["cpc", "ppc", "paid", "paid_social", "display"].includes(medium);
  if (params.has("gclid") || (source === "google" && paid)) return "gads";
  if (params.has("fbclid") || (["facebook", "instagram", "meta"].includes(source) && (!medium || paid))) return "metaads";
  if (params.get("ref")) return "referral";
  if (!referrer) return "direct";
  try {
    return /(^|\.)google\.[a-z.]+$/.test(new URL(referrer).hostname.toLowerCase()) ? "googleseo" : "other";
  } catch {
    return "unknown";
  }
}

function readLegacySource(): { source: LeadSourceCode; referralCode: string } | null {
  const legacy = readCookie("el_source")?.trim().toLowerCase();
  if (!legacy) return null;
  if (legacy === "seo") return { source: "googleseo", referralCode: "" };
  if (["gads", "metaads", "googleseo", "direct", "other", "unknown"].includes(legacy)) {
    return { source: legacy as LeadSourceCode, referralCode: "" };
  }
  return { source: "referral", referralCode: legacy.slice(0, 80) };
}

export function captureFirstTouch(): AttributionSnapshot {
  const existing = readAttribution();
  if (existing) return existing;
  const params = new URLSearchParams(window.location.search);
  const legacy = readLegacySource();
  const sessionId = readCookie(SESSION_COOKIE) || crypto.randomUUID();
  writeCookie(SESSION_COOKIE, sessionId, MAX_AGE_SECONDS);
  const snapshot: AttributionSnapshot = {
    source: legacy?.source || classify(params, document.referrer),
    entryUrl: window.location.href.slice(0, 1000),
    entryPath: `${window.location.pathname}${window.location.search}`.slice(0, 500),
    referrer: document.referrer.slice(0, 1000),
    referralCode: (params.get("ref") || legacy?.referralCode || "").slice(0, 80),
    utmSource: (params.get("utm_source") || "").slice(0, 120),
    utmMedium: (params.get("utm_medium") || "").slice(0, 120),
    utmCampaign: (params.get("utm_campaign") || "").slice(0, 200),
    utmContent: (params.get("utm_content") || "").slice(0, 200),
    utmTerm: (params.get("utm_term") || "").slice(0, 200),
    gclid: (params.get("gclid") || "").slice(0, 300),
    fbclid: (params.get("fbclid") || "").slice(0, 300),
    sessionId,
  };
  writeCookie(ATTRIBUTION_COOKIE, JSON.stringify(snapshot), MAX_AGE_SECONDS);
  return snapshot;
}

export function readAttribution(): AttributionSnapshot | null {
  const raw = readCookie(ATTRIBUTION_COOKIE);
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as AttributionSnapshot;
    return value && typeof value.source === "string" && typeof value.sessionId === "string" ? value : null;
  } catch {
    return null;
  }
}

export function appendAttribution(url: URL, snapshot: AttributionSnapshot) {
  const values: Record<string, string> = {
    source: snapshot.source,
    entry_url: snapshot.entryUrl,
    entry_path: snapshot.entryPath,
    referrer: snapshot.referrer,
    ref: snapshot.referralCode,
    utm_source: snapshot.utmSource,
    utm_medium: snapshot.utmMedium,
    utm_campaign: snapshot.utmCampaign,
    utm_content: snapshot.utmContent,
    utm_term: snapshot.utmTerm,
    gclid: snapshot.gclid,
    fbclid: snapshot.fbclid,
    sid: snapshot.sessionId,
  };
  for (const [key, value] of Object.entries(values)) {
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
}
