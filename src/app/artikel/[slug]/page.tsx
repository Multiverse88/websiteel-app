import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Calendar, Clock, ArrowLeft, Home, Tag, Eye, ChevronRight, ArrowRight } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import NewsletterWidget from "@/components/NewsletterWidget";
import ViewTracker from "./view-tracker";

type Props = {
  params: Promise<{ slug: string }>;
};

// Simple custom markdown renderer to ensure clean semantic HTML with premium styling
function renderMarkdownContent(text: string) {
  const blocks = text.split("\n\n");
  let headingCounter = 0;

  return blocks.map((block, idx) => {
    const trimmed = block.trim();

    // Horizontal Rule
    if (trimmed === "---") {
      return <hr key={idx} className="my-10 border-gray-200/60" />;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      headingCounter++;
      const headingText = trimmed.replace("### ", "");
      const headingId = headingText
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h3
          key={idx}
          id={headingId}
          className="font-inter text-[20px] sm:text-[22px] font-extrabold text-gray-950 mt-12 mb-5 leading-tight flex items-center scroll-mt-24"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFF5F5] text-[#990202] text-[13px] font-black mr-3.5 flex-shrink-0 border border-red-100/50">
            {headingCounter}
          </span>
          {headingText}
        </h3>
      );
    }

    // Bullet Lists
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map((li) => li.replace(/^[\*\-]\s+/, ""));
      return (
        <ul key={idx} className="space-y-3.5 my-6 pl-1 list-none">
          {items.map((item, itemIdx) => {
            const parsedItem = parseBoldText(item);
            return (
              <li key={itemIdx} className="text-[15px] leading-relaxed text-gray-600 relative pl-7 flex items-start">
                <span className="absolute left-0 top-[9px] w-2 h-2 rounded-full bg-[#990202]/70" />
                <span className="flex-1">{parsedItem}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    // Numbered Lists
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split("\n").map((li) => li.replace(/^\d+\.\s+/, ""));
      return (
        <ol key={idx} className="space-y-4 my-6 pl-1 list-none">
          {items.map((item, itemIdx) => {
            const parsedItem = parseBoldText(item);
            return (
              <li key={itemIdx} className="text-[15px] leading-relaxed text-gray-600 flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-50 text-[#990202] text-[11.5px] font-black mr-3.5 flex-shrink-0 mt-0.5 border border-red-100/40">
                  {itemIdx + 1}
                </span>
                <span className="flex-1">{parsedItem}</span>
              </li>
            );
          })}
        </ol>
      );
    }

    // Default Paragraph with Bold text parser
    return (
      <p key={idx} className="text-[15px] sm:text-[15.5px] leading-[1.85] text-gray-600 font-normal my-5">
        {parseBoldText(trimmed)}
      </p>
    );
  });
}

// Utility to parse **bold** text to standard JSX strong tags
function parseBoldText(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-extrabold text-gray-900">
          {part}
        </strong>
      );
    }
    return part;
  });
}

// Extract headings from content for Table of Contents
function extractHeadings(text: string) {
  const blocks = text.split("\n\n");
  const headings: { id: string; text: string }[] = [];
  blocks.forEach((block) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("### ")) {
      const headingText = trimmed.replace("### ", "");
      const headingId = headingText
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id: headingId, text: headingText });
    }
  });
  return headings;
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params;

  // Fetch article from DB
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  // If article not found, redirect to 404 handler
  if (!article) {
    notFound();
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = await prisma.article.findMany({
    where: {
      category: article.category,
      slug: { not: article.slug },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  // If not enough related articles, fill with latest
  let displayRelated = relatedArticles;
  if (relatedArticles.length < 2) {
    const moreArticles = await prisma.article.findMany({
      where: {
        slug: {
          notIn: [article.slug, ...relatedArticles.map((a) => a.slug)],
        },
      },
      take: 3 - relatedArticles.length,
      orderBy: { createdAt: "desc" },
    });
    displayRelated = [...relatedArticles, ...moreArticles];
  }

  const headings = extractHeadings(article.content);

  // Generate tag keywords from the article category and title
  const tags = generateTags(article.category, article.title);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ViewTracker slug={slug} />

      {/* ─── BREADCRUMBS ─── */}
      <div className="bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-[800px] mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-[13px] font-medium text-gray-500">
            <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link href="/artikel" className="hover:text-[#990202] transition-colors">
              Artikel
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-gray-400 truncate max-w-[200px] sm:max-w-[350px]">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* ─── MAIN ARTICLE CONTAINER ─── */}
      <main className="flex-grow">
        <article className="max-w-[800px] mx-auto px-6">

          {/* ─── ARTICLE HEADER ─── */}
          <header className="pt-10 sm:pt-14 pb-8">
            {/* Category Badge */}
            <div className="mb-5">
              <span className="inline-flex px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#FFF5F5] text-[#990202] border border-red-100/50">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-inter text-[30px] sm:text-[38px] lg:text-[42px] font-extrabold text-gray-950 leading-[1.15] tracking-tight mb-6">
              {article.title}
            </h1>

            {/* Author & Meta Row */}
            <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-gray-100">
              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#990202] to-[#D62828] flex items-center justify-center text-white text-[11px] font-black shadow-sm">
                  EL
                </div>
                <div>
                  <div className="text-[13.5px] font-bold text-gray-900">EasyLegal</div>
                </div>
              </div>

              {/* Separator */}
              <div className="w-px h-5 bg-gray-200 hidden sm:block" />

              {/* Date */}
              <div className="flex items-center space-x-1.5 text-[13px] text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  {new Date(article.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Read Time */}
              <div className="flex items-center space-x-1.5 text-[13px] text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{article.readTime}</span>
              </div>

              {/* Share - pushed to right on desktop */}
              <div className="sm:ml-auto">
                <ShareButton />
              </div>
            </div>
          </header>

          {/* ─── HERO IMAGE ─── */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] bg-gray-50 aspect-[16/9] w-full mb-10">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* ─── TABLE OF CONTENTS (if multiple sections) ─── */}
          {headings.length > 1 && (
            <div className="bg-[#FAFAFA] border border-gray-200/60 rounded-2xl p-6 mb-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-[#990202] rounded-full" />
                <h2 className="text-[15px] font-extrabold text-gray-900">Daftar Isi</h2>
              </div>
              <nav className="space-y-2">
                {headings.map((heading, idx) => (
                  <a
                    key={idx}
                    href={`#${heading.id}`}
                    className="flex items-center gap-3 text-[14px] text-gray-600 hover:text-[#990202] transition-colors group py-1"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-md bg-white text-[#990202] text-[10.5px] font-black border border-red-100/40 group-hover:bg-[#990202] group-hover:text-white transition-colors flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="group-hover:translate-x-0.5 transition-transform">{heading.text}</span>
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* ─── ARTICLE BODY ─── */}
          <div className="prose-article mb-12">
            {renderMarkdownContent(article.content)}
          </div>

          {/* ─── TAGS ─── */}
          <div className="flex flex-wrap items-center gap-2 pb-8 mb-8 border-b border-gray-100">
            <Tag className="w-4 h-4 text-gray-400 mr-1" />
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex px-3 py-1.5 rounded-lg text-[12px] font-bold text-gray-600 bg-gray-50 border border-gray-200/60 hover:bg-[#FFF5F5] hover:text-[#990202] hover:border-red-100 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ─── AUTHOR CARD ─── */}
          <div className="bg-[#FAFAFA] rounded-2xl border border-gray-200/60 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#990202] to-[#D62828] flex items-center justify-center text-white text-[13px] font-black shadow-sm">
                EL
              </div>
              <div>
                <div className="text-[14.5px] font-extrabold text-gray-950">Tim Penulis EasyLegal</div>
                <div className="text-[12.5px] text-gray-500 mt-0.5">Spesialis Konsultan Hukum & Legalitas Bisnis</div>
              </div>
            </div>
            <ShareButton />
          </div>
        </article>

        {/* ─── DARK CTA BANNER ─── */}
        <section className="bg-[#1A1A1A] py-14 sm:py-16 mt-6">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <p className="text-[12px] font-bold text-[#990202] uppercase tracking-widest mb-3">Konsultasi Gratis</p>
            <h2 className="font-inter text-[24px] sm:text-[30px] font-extrabold text-white leading-tight mb-4">
              Butuh bantuan untuk urus legalitas bisnis Anda?
            </h2>
            <p className="text-[14.5px] text-gray-400 max-w-[520px] mx-auto mb-8 leading-relaxed">
              Konsultasikan kebutuhan Anda langsung dengan tim EasyLegal. Gratis, tanpa komitmen, respons cepat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20konsultasi%20mengenai%20legalitas%20bisnis."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[14px] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg className="w-4.5 h-4.5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.022-.079-.186-.208-.432-.332-.246-.123-1.455-.717-1.68-.8-.223-.082-.387-.122-.55.122-.165.245-.64.8-.787.969-.147.17-.294.19-.54.067-.244-.124-.992-.367-1.89-1.168-.698-.622-1.17-1.392-1.307-1.637-.136-.246-.015-.379.108-.501.112-.11.246-.287.37-.43.123-.14.164-.24.246-.4.082-.162.04-.303-.02-.427-.06-.124-.55-1.324-.752-1.815-.197-.474-.397-.41-.547-.418-.14-.008-.302-.008-.464-.008-.162 0-.427.06-.65.3-.224.24-.854.83-.854 2.03 0 1.201.874 2.36 1.996 3.86 1.123 1.5 2.617 2.29 4.193 2.97 1.573.68 2.36.545 3.208.435.85-.11 1.764-.72 2.012-1.417.25-.7.25-1.3.175-1.417-.075-.117-.24-.183-.34-.233zM12 22a9.96 9.96 0 01-5.066-1.378l-.363-.214-3.766.987 1.004-3.667-.235-.374A9.96 9.96 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm0-22C5.373 0 0 5.373 0 12a11.96 11.96 0 002.586 7.424L0 24l4.743-1.242A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
                Konsultasi via WhatsApp
              </a>
              <Link
                href="/kontak"
                className="inline-flex items-center gap-1.5 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-extrabold text-[14px] rounded-xl border border-white/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                Hubungi Tim Kami
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── RELATED ARTICLES + NEWSLETTER ─── */}
        <section className="py-16 sm:py-20 bg-[#FAFAFA]">
          <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* Left: Related Articles */}
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold text-[#990202] uppercase tracking-widest mb-2">Artikel Terkait</p>
                <h2 className="font-inter text-[24px] sm:text-[28px] font-extrabold text-gray-950 leading-tight mb-8">
                  Mungkin kamu juga suka.
                </h2>

                {displayRelated.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {displayRelated.slice(0, 2).map((related) => (
                      <Link
                        key={related.id}
                        href={`/artikel/${related.slug}`}
                        className="group block"
                      >
                        {/* Image */}
                        <div className="relative aspect-[1.55] w-full overflow-hidden rounded-2xl bg-gray-100 mb-4">
                          <img
                            src={related.coverImage}
                            alt={related.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Category */}
                        <p className="text-[11.5px] font-black uppercase tracking-wider text-[#990202] mb-2">
                          {related.category}
                        </p>

                        {/* Title */}
                        <h3 className="text-[16px] sm:text-[17px] font-extrabold text-gray-950 group-hover:text-[#990202] transition-colors leading-snug line-clamp-2 mb-2.5">
                          {related.title}
                        </h3>

                        {/* Read Time */}
                        <div className="flex items-center space-x-1.5 text-[12.5px] text-gray-400 font-medium">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span>{related.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] text-gray-500">Belum ada artikel terkait.</p>
                )}
              </div>

              {/* Right: Newsletter Widget */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <NewsletterWidget />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Generate tags from category and title
function generateTags(category: string, title: string): string[] {
  const baseTags = [category];
  
  // Extract meaningful keywords from the title
  const keywords = ["Pendirian", "PT", "Merek", "HAKI", "ISO", "Sertifikasi", "UMKM", "Bisnis", "OSS", "NIB", "KBLI", "Legalitas", "Notaris", "Akta", "DJKI", "Kemenkumham"];
  
  const titleWords = title.split(/\s+/);
  titleWords.forEach(word => {
    const clean = word.replace(/[^a-zA-Z0-9]/g, "");
    if (keywords.includes(clean) && !baseTags.includes(clean)) {
      baseTags.push(clean);
    }
  });

  // Always add some generic ones
  if (!baseTags.includes("Legalitas")) baseTags.push("Legalitas");
  if (!baseTags.includes("Bisnis")) baseTags.push("Bisnis");
  if (baseTags.length < 4) baseTags.push("Indonesia");

  return baseTags.slice(0, 6);
}
