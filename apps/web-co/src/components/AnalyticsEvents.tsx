"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const SOURCE_COOKIE = "el_source";
const SOURCE_MAX_AGE_DAYS = 90;

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

// Entry-point attribution: "gads" | "metaads" | "seo" | "direct" | "other".
// First-touch only — if a source is already stored, a later visit (e.g. the
// user browsing a second page before clicking WA) never overwrites it.
function detectAndStoreSource() {
  if (getCookie(SOURCE_COOKIE)) return;

  const params = new URLSearchParams(window.location.search);
  let source: string;

  if (params.get("ref")) {
    source = params.get("ref")!;
  } else if (params.has("gclid") || params.get("utm_source") === "google" && params.get("utm_medium") === "cpc") {
    source = "gads";
  } else if (params.has("fbclid") || params.get("utm_source") === "facebook" || params.get("utm_source") === "meta") {
    source = "metaads";
  } else {
    const referrer = document.referrer;
    if (!referrer) {
      source = "direct";
    } else {
      try {
        const host = new URL(referrer).hostname;
        source = /(^|\.)(google|bing|yahoo|duckduckgo)\./.test(host) ? "seo" : "other";
      } catch {
        source = "other";
      }
    }
  }

  setCookie(SOURCE_COOKIE, source, SOURCE_MAX_AGE_DAYS);
}

/**
 * Pushes custom GA4/GTM events for the interactions that matter for user
 * journey analysis, on top of GA4's default pageview + outbound-click
 * tracking (which only sees generic "outbound click", not which CTA or
 * which page it happened on).
 *
 * Also does two things for the WhatsApp lead-tracking rotator
 * (apps/api/src/routes/whatsapp.ts):
 * 1. Captures first-touch entry-point attribution (Google Ads / Meta Ads /
 *    SEO / direct) into a cookie on landing.
 * 2. Appends that source + the current page path (as "product") onto every
 *    WhatsApp CTA link right before navigating, so every rotator click/lead
 *    carries both — without having to touch the 28+ getWhatsAppLink() call
 *    sites individually.
 *
 * One delegated document-level click listener catches every WhatsApp CTA
 * site-wide (all resolve to /api/v1/wa/redirect) — cheaper and harder to
 * miss than instrumenting each button. Mounted once in the root layout.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    detectAndStoreSource();

    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href*='/api/v1/wa/redirect']") as HTMLAnchorElement | null;
      if (!link) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cta_whatsapp_click",
        page_path: window.location.pathname,
        link_text: link.textContent?.trim().slice(0, 100) || "",
      });

      // Enrich the URL with source + product before the browser follows it.
      // Has to preventDefault + window.open manually since these links are
      // target="_blank" and we're mutating the href after the click fired.
      const source = getCookie(SOURCE_COOKIE) || "direct";
      const url = new URL(link.href);
      if (!url.searchParams.has("source")) url.searchParams.set("source", source);
      if (!url.searchParams.has("product")) url.searchParams.set("product", window.location.pathname);

      e.preventDefault();
      window.open(url.toString(), "_blank", "noopener,noreferrer");
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

/** Call from anywhere after a real conversion (e.g. contact form success). */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname, ...params });
}
