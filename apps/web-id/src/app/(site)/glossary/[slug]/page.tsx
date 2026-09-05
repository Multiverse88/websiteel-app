import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { Calendar, Home, BookOpen, ArrowLeft, ArrowRight } from "lucide-react";
import { getSiteFromHostname } from "@/lib/domains";
import { getWhatsAppLink } from "@/lib/config";
import { getGlossaryCanonicalUrl } from "@/lib/glossary-canonical-mapping";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

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

async function fetchGlossary(slug: string, site: string): Promise<Glossary | null> {
  const postgrestUrl = process.env.NEXT_PUBLIC_POSTGREST_URL || "https://admin.easylegal.my.id/db";
  try {
    const res = await fetch(
      `${postgrestUrl}/Glossary?slug=eq.${encodeURIComponent(slug)}&site=eq.${site}&status=eq.published&select=*`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.length === 0) return null;
    const g = data[0];
    g.createdAt = new Date(g.createdAt);
    if (g.updatedAt) g.updatedAt = new Date(g.updatedAt);
    return g;
  } catch {
    return null;
  }
}

async function fetchAdjacentGlossaries(currentSlug: string, site: string) {
  const postgrestUrl = process.env.NEXT_PUBLIC_POSTGREST_URL || "https://admin.easylegal.my.id/db";
  try {
    // Get all glossaries sorted by title for prev/next
    const res = await fetch(
      `${postgrestUrl}/Glossary?site=eq.${site}&status=eq.published&order=title.asc&select=slug,title`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return { prev: null, next: null };
    const all = await res.json();
    const idx = all.findIndex((g: { slug: string }) => g.slug === currentSlug);
    return {
      prev: idx > 0 ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    };
  } catch {
    return { prev: null, next: null };
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hdrs = await headers();
  const hostname = hdrs.get("host") || "";
  const site = getSiteFromHostname(hostname);
  const glossary = await fetchGlossary(slug, site);

  if (!glossary) {
    return { title: "Glossary Tidak Ditemukan — EasyLegal" };
  }

  const appUrl = `https://${site}`;

  return {
    title: `${glossary.title} — EasyLegal`,
    description: glossary.excerpt || `Pengertian ${glossary.title} lengkap di EasyLegal`,
    alternates: {
      canonical: getGlossaryCanonicalUrl(glossary.slug) || `${appUrl}/glossary/${glossary.slug}`,
    },
  };
}

// Simple markdown renderer (same as article page)
function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-5">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-red-600 hover:underline">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 mb-2">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 mb-2"><span class="font-semibold">$1.</span> $2</li>')
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
    .replace(/^(?!<[hluop])/gm, '<p class="mb-4 text-gray-700 leading-relaxed">')
    .replace(/<p class="mb-4 text-gray-700 leading-relaxed">(<[hlu])/g, '$1')
    .replace(/(<\/[hlu][^>]*>)<\/p>/g, '$1');
}

export default async function GlossaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const hdrs = await headers();
  const hostname = hdrs.get("host") || "";
  const site = getSiteFromHostname(hostname);

  const glossary = await fetchGlossary(slug, site);
  if (!glossary) notFound();

  const { prev, next } = await fetchAdjacentGlossaries(slug, site);
  const dateStr = glossary.createdAt instanceof Date
    ? glossary.createdAt.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Beranda
            </Link>
            <span>/</span>
            <Link href="/glossary" className="hover:text-red-600 transition-colors">
              Kamus Legal
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{glossary.title}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Kamus Legal</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {glossary.title}
          </h1>

          {glossary.excerpt && (
            <p className="text-lg text-gray-600 mb-4">
              {glossary.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            {dateStr && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {dateStr}
              </span>
            )}
          </div>
        </header>

        {/* Body */}
        <div
          className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-a:text-red-600 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(glossary.content) }}
        />

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-red-50 to-red-100/50 rounded-2xl p-8 text-center border border-red-100">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Masih Ada Pertanyaan?
          </h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Tim legal kami siap membantu menjelaskan istilah hukum dan membantu pengurusan legalitas bisnis Anda.
          </p>
          <a
            href={getWhatsAppLink("Halo EasyLegal, saya ingin bertanya tentang istilah hukum.", "glossary-cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Konsultasi Gratis
          </a>
        </div>

        {/* Prev / Next Navigation */}
        <nav className="mt-12 flex items-center justify-between gap-4">
          {prev ? (
            <Link
              href={`/glossary/${prev.slug}`}
              className="group flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm truncate max-w-[200px]">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/glossary"
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            ← Semua Glossary
          </Link>
          {next ? (
            <Link
              href={`/glossary/${next.slug}`}
              className="group flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-right"
            >
              <span className="text-sm truncate max-w-[200px]">{next.title}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>
    </div>
  );
}
