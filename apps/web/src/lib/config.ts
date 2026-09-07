// Centralized configuration for EasyLegal
// Update this file to change global settings

export const config = {
  // Default WhatsApp message
  defaultWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi gratis mengenai legalitas bisnis saya.",
  
  // Website URL
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || "https://easylegal.biz.id",
  
  // Company info
  company: {
    email: "info@easylegal.id",
    whatsapp: "0811-2345-6789",
  },
} as const;

// In-house WhatsApp CTA rotator (replaces the external mauorder.online
// service — see apps/api/src/routes/whatsapp.ts). This is a real link, not
// a fetch: clicking it does a full navigation to our API, which picks
// whichever active number has the fewest clicks so far, logs the click,
// and 302s to wa.me — same instant UX as before, but the traffic per
// number is now visible in the admin dashboard.
// ctaId: a stable, hand-assigned id for this specific button (e.g.
// "pkp-pulau-jawa") — lets admin dashboard target an autotext override at
// just this button instead of the whole page. Deliberately NOT derived from
// `message` (that would break the moment someone edits the button copy,
// silently detaching any override set against the old text). Omit it for
// generic/one-off CTAs that don't need per-button overrides.
// Derives a stable-enough ctaId from a per-item field that already exists in
// the data (e.g. a pricing package's own title) — for lists rendered from
// data where hand-assigning a literal id per entry isn't practical. Still
// independent of the WA message text itself, just not of the title field.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const SITE_DOMAIN = "easylegal.biz.id";

export function getWhatsAppLink(message?: string, ctaId?: string, path?: string): string {
  const encodedMessage = encodeURIComponent(message || config.defaultWhatsAppMessage);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.easylegal.my.id";
  const ctaParam = ctaId ? `&cta_id=${encodeURIComponent(ctaId)}` : "";
  // `path` is baked into the href at render time (server or client render,
  // BEFORE any click/hydration JS runs) so the page path is present in the
  // very first HTML byte. This fixes the ~94% of WhatsAppClick rows with
  // product=NULL, caused by the old approach of only injecting `product` from
  // a click-time listener in AnalyticsEvents.tsx that races against React
  // hydration — if a visitor clicks before JS attaches, nothing was sent.
  const productParam = path ? `&product=${encodeURIComponent(path)}` : "";
  return `${apiUrl}/api/v1/wa/redirect?text=${encodedMessage}&domain=${SITE_DOMAIN}${ctaParam}${productParam}`;
}

// For links that are already fully built (e.g. a package's `buttonLink`
// precomputed once in a static data file, not per-render), this stamps the
// current page path onto them after the fact so pricing-package WA buttons
// get the same render-time `product` fix as every other CTA on the site.
export function withPagePath(url: string, path?: string): string {
  if (!path) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("product", path);
    return u.toString();
  } catch {
    return url;
  }
}
