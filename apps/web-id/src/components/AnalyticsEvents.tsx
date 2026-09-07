"use client";

import { useEffect } from "react";
import { appendAttribution, captureFirstTouch, readAttribution } from "@/lib/attribution";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
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
 * 2. Appends that source (and "product"/page-path, as a redundant safety
 *    net) onto every WhatsApp CTA link right before navigating.
 *
 * NOTE (2026-09-07): "product" (page path) used to rely ENTIRELY on this
 * listener, which raced against React hydration — if a visitor clicked
 * before this effect ran, nothing was ever sent (measured ~94% of
 * WhatsAppClick rows with product=NULL in production). The real fix is now
 * upstream: every getWhatsAppLink(path) call site across all 3 apps bakes
 * the page path into the href at render time, so the link is correct from
 * the very first HTML byte regardless of whether this listener has attached
 * yet. `preventDefault` here does NOT "eliminate" the hydration race for
 * `product` — a click before this effect runs never reaches this handler at
 * all, this only prevents a double-append for clicks that arrive after.
 *
 * One delegated document-level click listener catches every WhatsApp CTA
 * site-wide (all resolve to /api/v1/wa/redirect) — cheaper and harder to
 * miss than instrumenting each button. Mounted once in the root layout.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    captureFirstTouch();

    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href*='/api/v1/wa/redirect']") as HTMLAnchorElement | null;
      if (!link) return;

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cta_whatsapp_click",
        page_path: window.location.pathname,
        link_text: link.textContent?.trim().slice(0, 100) || "",
      });

      // Prevent default navigation and open with fully-constructed URL
      // to eliminate hydration race condition (user clicks before JS hydrates).
      e.preventDefault();
      e.stopPropagation();

      const attribution = readAttribution() || captureFirstTouch();
      const url = new URL(link.href);
      appendAttribution(url, attribution);
      if (!url.searchParams.has("product")) url.searchParams.set("product", window.location.pathname);
      if (!url.searchParams.has("cta_label")) url.searchParams.set("cta_label", link.textContent?.trim().slice(0, 200) || "WhatsApp CTA");

      // Open in new tab (same as target="_blank" behavior)
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
