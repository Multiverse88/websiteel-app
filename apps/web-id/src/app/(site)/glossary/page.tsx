import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { Search, BookOpen, Home } from "lucide-react";
import { getSiteFromHostname } from "@/lib/domains";

interface Glossary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  site: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string; limit?: string }>;
}

export default async function GlossaryPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q || "";
  const limit = resolvedSearchParams.limit ? parseInt(resolvedSearchParams.limit, 10) : 50;

  // Detect domain from hostname
  const hdrs = await headers();
  const hostname = hdrs.get("host") || "";
  const site = getSiteFromHostname(hostname);

  // Fetch glossaries from PostgREST
  const postgrestUrl = process.env.NEXT_PUBLIC_POSTGREST_URL || "https://admin.easylegal.my.id/db";
  let glossaries: Glossary[] = [];
  let totalCount = 0;

  try {
    const params = new URLSearchParams();
    params.set("site", `eq.${site}`);
    params.set("status", "eq.published");
    params.set("order", "title.asc");
    params.set("limit", limit.toString());
    params.set("select", "id,slug,title,excerpt,content,coverImage,site,createdAt,updatedAt");
    
    if (q) {
      // Search by title or slug
      params.set("or", `(title.ilike.*${q}*,slug.ilike.*${q}*)`);
    }

    // Get count
    const countHeaders = new Headers();
    countHeaders.set("Prefer", "count=exact");
    
    const countRes = await fetch(`${postgrestUrl}/glossaries?${params.toString()}`, {
      headers: { "Prefer": "count=exact" },
      next: { revalidate: 60 },
    });
    
    const contentRange = countRes.headers.get("content-range");
    if (contentRange) {
      const match = contentRange.match(/\/(\d+)$/);
      if (match) totalCount = parseInt(match[1], 10);
    }

    const res = await fetch(`${postgrestUrl}/glossaries?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      glossaries = await res.json();
    }
  } catch (error) {
    console.error("Error fetching glossaries:", error);
  }

  // Group glossaries by first letter
  const grouped: Record<string, Glossary[]> = {};
  glossaries.forEach((g) => {
    const firstLetter = g.title.charAt(0).toUpperCase();
    if (!grouped[firstLetter]) grouped[firstLetter] = [];
    grouped[firstLetter].push(g);
  });

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Hero */}
      <section className="bg-white pt-8 lg:pt-12 pb-16 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Beranda
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Kamus Legal</span>
          </nav>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Kamus <span className="text-red-600">Legal</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-8">
            Kumpulan istilah hukum dan legalitas bisnis yang sering digunakan.
            Pahami setiap istilah agar bisnis Anda lebih aman dan patuh hukum.
          </p>

          {/* Search */}
          <form action="/glossary" method="GET" className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Cari istilah hukum..."
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50 hover:bg-white"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Alphabet Navigation */}
      <section className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-3 overflow-x-auto">
            <Link
              href="/glossary"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                !q ? "bg-red-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Semua
            </Link>
            {alphabet.map((letter) => (
              <span
                key={letter}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex-shrink-0 ${
                  grouped[letter]
                    ? "text-gray-900 hover:bg-red-50 cursor-pointer"
                    : "text-gray-300 cursor-default"
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary List */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {glossaries.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {q ? "Tidak Ditemukan" : "Belum Ada Glossary"}
            </h2>
            <p className="text-gray-500">
              {q
                ? `Tidak ada istilah yang cocok dengan pencarian "${q}"`
                : "Glossary akan segera tersedia."}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([letter, items]) => (
                <div key={letter} id={`letter-${letter}`}>
                  <h2 className="text-3xl font-bold text-red-600 mb-4">{letter}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((glossary) => (
                      <Link
                        key={glossary.id}
                        href={`/glossary/${glossary.slug}`}
                        className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-red-200 hover:shadow-md transition-all duration-200"
                      >
                        <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                          {glossary.title}
                        </h3>
                        {glossary.excerpt && (
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {glossary.excerpt}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Total count */}
        {totalCount > 0 && (
          <div className="text-center mt-12 text-sm text-gray-400">
            Menampilkan {glossaries.length} dari {totalCount} istilah
          </div>
        )}
      </section>
    </div>
  );
}
