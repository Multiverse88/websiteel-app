"use client";

import { useEffect } from "react";

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
 * One delegated document-level click listener catches every WhatsApp CTA
 * site-wide (all 28+ call sites of getWhatsAppLink() in src/lib/config.ts
 * all resolve to a mauorder.online URL) — cheaper and harder to miss than
 * instrumenting each button individually. Mounted once in the root layout.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href*='mauorder.online']");
      if (!link) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cta_whatsapp_click",
        page_path: window.location.pathname,
        link_text: link.textContent?.trim().slice(0, 100) || "",
      });
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
