"use server";

import { headers } from "next/headers";
import { getSiteFromHostname } from "@/lib/domains";

export async function incrementView(slug: string) {
  try {
    const hdrs = await headers();
    const hostname = hdrs.get("host") || "";
    const site = getSiteFromHostname(hostname);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/articles/${slug}/view?site=${encodeURIComponent(site)}`;
    await fetch(apiUrl, { method: 'POST' });
  } catch {
    // Silently fail - don't break the page
  }
}
