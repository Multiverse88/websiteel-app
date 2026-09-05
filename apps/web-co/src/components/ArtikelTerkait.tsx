"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { getSiteFromHostname } from "@/lib/domains";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readTime: string;
}

const CATEGORY_MAP: Record<string, string> = {
  "Pendirian PT": "Pendirian Usaha",
  "Legalitas PT": "Pendirian Usaha",
  CV: "Pendirian Usaha",
  "PT Perorangan": "Pendirian Usaha",
  "PT PMA": "Pendirian Usaha",
  Firma: "Pendirian Usaha",
  Perkumpulan: "Pendirian Usaha",
  Yayasan: "Pendirian Usaha",
  Koperasi: "Pendirian Usaha",
  UMKM: "Pendirian Usaha",
  "Merek & HAKI": "Haki",
  "Sertifikasi ISO": "ISO",
  Perizinan: "Perizinan",
  KBLI: "Perizinan",
  NIB: "NIB",
  Pajak: "Pajak",
  Branding: "Branding",
};

export default function ArtikelTerkait({
  category,
  query,
  title = "Artikel Terkait",
}: {
  category?: string;
  query?: string;
  title?: string;
}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchArticles = async () => {
      try {
        // Client component — resolve site from the browser's own hostname
        // (no next/headers here). Without this, the admin-api falls back to
        // its own default ("easylegal.biz.id") — harmless on biz.id itself,
        // but this component is shared code, so fix it for symmetry with
        // the co.id/id copies where the same gap is an actual bug.
        const site = getSiteFromHostname(typeof window !== "undefined" ? window.location.hostname : undefined);
        const params = new URLSearchParams({ limit: "4", site });
        if (category) params.set("category", category);
        if (query) params.set("q", query);

        // Use relative URL so it doesn't cross-origin block if on same domain
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:4000"}/api/v1/articles?${params.toString()}`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          if (mounted) {
            setArticles(Array.isArray(data.data) ? data.data.slice(0, 4) : []);
          }
        }
      } catch (err) {
        console.error("Failed to fetch related articles", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchArticles();
    return () => {
      mounted = false;
    };
  }, [category, query]);

  if (loading || articles.length === 0) return null;

  return (
    <section className="py-8 sm:py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="font-heading text-[22px] sm:text-[32px] font-extrabold text-gray-950 tracking-tight">
            {title}
          </h2>
          <Link
            href="/artikel"
            className="text-[16px] font-extrabold text-[#990202] hover:text-[#800000] transition-colors whitespace-nowrap ml-4"
          >
            Lihat Semua &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[1.6] w-full overflow-hidden bg-gray-50 border border-black/[0.02] rounded-xl mb-3">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="px-1 pb-1 flex-grow flex flex-col">
                <span className="text-[#990202] text-[11px] font-black tracking-widest uppercase block mb-1.5">
                  {CATEGORY_MAP[article.category] || article.category}
                </span>
                <h3 className="text-[14px] font-extrabold text-gray-950 group-hover:text-[#990202] transition-colors leading-snug mb-2 line-clamp-2">
                  <Link href={`/artikel/${article.slug}`} className="focus:outline-none">
                    {article.title}
                  </Link>
                </h3>
                <div className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 mt-auto pt-2 border-t border-gray-100">
                  <Clock className="w-3 h-3 text-[#990202]" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
