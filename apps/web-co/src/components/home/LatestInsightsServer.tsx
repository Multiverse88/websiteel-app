import type { ArticleItem } from "./InformasiHukumSection";
import { headers } from "next/headers";
import { getSiteFromHostname } from "@/lib/domains";

export async function LatestInsightsServer(): Promise<ArticleItem[]> {
  try {
    // Filter sesuai domain host aktual (co.id / biz.id), bukan default
    // biz.id — setelah 2026-09-18, artikel lama (legacy) kini hanya
    // broadcast ke easylegal.co.id.
    const hdrs = await headers();
    const hostname = hdrs.get("host") || "";
    const site = getSiteFromHostname(hostname);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/articles?limit=5&site=${encodeURIComponent(site)}`;
    const res = await fetch(apiUrl, { next: { revalidate: 60 } });
    if (res.ok) {
      const json = await res.json();
      return json.data.map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt)
      }));
    }
  } catch {
    // silently fail — section will show no articles
  }
  return [];
}
