import type { ArticleItem } from "./InformasiHukumSection";

export async function LatestInsightsServer(): Promise<ArticleItem[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/articles?limit=5`;
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
