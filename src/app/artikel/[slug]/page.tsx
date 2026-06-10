import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Calendar, Clock, Home, Tag, ChevronRight } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import NewsletterWidget from "@/components/NewsletterWidget";
import ViewTracker from "./view-tracker";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getArticle(slug: string) {
  return prisma.article.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      excerpt: true,
      content: true,
      coverImage: true,
      category: true,
      readTime: true,
      slug: true,
      createdAt: true,
      author: {
        select: { name: true, avatar: true, bio: true, role: true }
      }
    }
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Artikel Tidak Ditemukan — EasyLegal" };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://easylegal.id";

  return {
    title: `${article.title} — EasyLegal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${appUrl}/artikel/${article.slug}`,
      siteName: "EasyLegal",
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "id_ID",
      type: "article",
      publishedTime: article.createdAt.toISOString(),
      authors: [article.author?.name || "EasyLegal"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
    alternates: {
      canonical: `${appUrl}/artikel/${article.slug}`,
    },
  };
}

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

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await prisma.article.findMany({
    where: {
      category: article.category,
      slug: { not: article.slug },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, slug: true, coverImage: true, category: true, readTime: true }
  });

  // If not enough related articles, fill with latest
  let displayRelated = relatedArticles;
  if (relatedArticles.length < 2) {
    const moreArticles = await prisma.article.findMany({
      where: {
        slug: {
          notIn: [article.slug, ...relatedArticles.map((a: { slug: string }) => a.slug)],
        },
      },
      take: 3 - relatedArticles.length,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, slug: true, coverImage: true, category: true, readTime: true }
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
                {article.author?.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover shadow-sm border border-gray-150"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#990202] to-[#D62828] flex items-center justify-center text-white text-[11px] font-black shadow-sm">
                    EL
                  </div>
                )}
                <div>
                  <div className="text-[13.5px] font-bold text-gray-900">
                    {article.author?.name || "EasyLegal"}
                  </div>
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
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              className="object-cover object-center"
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
          <div className="bg-[#FAFAFA] rounded-2xl border border-gray-200/60 p-6 flex flex-col gap-4 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-4">
                {article.author?.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover shadow-sm border border-gray-150"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#990202] to-[#D62828] flex items-center justify-center text-white text-[14px] font-black shadow-sm">
                    EL
                  </div>
                )}
                <div>
                  <div className="text-[15px] font-extrabold text-gray-950">
                    {article.author?.name || "Tim Penulis EasyLegal"}
                  </div>
                  <div className="text-[12px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                    {article.author?.role || "Spesialis Konsultan Hukum & Legalitas Bisnis"}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <ShareButton />
              </div>
            </div>
            {article.author?.bio && (
              <p className="text-[13.5px] leading-relaxed text-gray-500 font-normal">
                {article.author.bio}
              </p>
            )}
          </div>
        </article>

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
                    {displayRelated.slice(0, 2).map((related: { id: string; title: string; slug: string; coverImage: string; category: string; readTime: string }) => (
                      <Link
                        key={related.id}
                        href={`/artikel/${related.slug}`}
                        className="group block"
                      >
                        {/* Image */}
                        <div className="relative aspect-[1.55] w-full overflow-hidden rounded-2xl bg-gray-100 mb-4">
                          <Image
                            src={related.coverImage}
                            alt={related.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
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
