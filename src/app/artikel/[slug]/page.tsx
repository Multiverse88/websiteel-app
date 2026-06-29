import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { Calendar, Clock, Home, Tag } from "lucide-react";
import ShareButton from "@/components/ShareButton";
import NewsletterWidget from "@/components/NewsletterWidget";
import ViewTracker from "./view-tracker";
import TableOfContents from "./table-of-contents";
import { trackMetric } from "@/lib/metrics";
import { getWhatsAppLink } from "@/lib/config";
import { getArticleJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";

const IgIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const FbIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ChatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const revalidate = 300;

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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://easylegal.my.id";

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

type InlineRelated = { title: string; slug: string; category: string; coverImage: string; readTime: string } | null;

// Helper to dynamically clean and redirect hardcoded/outdated links in articles
function cleanArticleUrl(url: string, articleTitle: string): string {
  // 1. WhatsApp link router (mauorder.online, wa.me, api.whatsapp.com)
  if (url.includes("mauorder.online") || url.includes("wa.me") || url.includes("api.whatsapp.com")) {
    return getWhatsAppLink(`Halo EasyLegal, saya membaca artikel "${articleTitle || 'Legalitas'}" dan ingin berkonsultasi.`);
  }

  // 2. Old product pages redirect to new router structure
  if (url.includes("/lp-produk-koperasi") || url.includes("easylegal.id/lp-produk-koperasi") || url.includes("easylegal.my.id/lp-produk-koperasi")) {
    return "/layanan/pendirian-badan-usaha/koperasi";
  }

  // 3. Absolute easylegal.id links converted to local relative paths
  if (url.includes("easylegal.id") || url.includes("easylegal.my.id")) {
    // Replace domain to make it relative
    const relativePath = url.replace(/^https?:\/\/(www\.)?(easylegal\.id|easylegal\.my\.id)/, "");
    return relativePath || "/";
  }

  return url;
}

interface Block {
  type: "paragraph" | "heading" | "ul" | "ol" | "hr" | "image";
  content?: string; // for single lines
  items?: string[]; // for lists
}

// Simple custom markdown renderer to ensure clean semantic HTML with premium styling
function renderMarkdownContent(text: string, inlineRelated?: InlineRelated, articleTitle: string = "") {
  // 1. Normalize carriage returns
  let cleanedText = text.replace(/\r\n/g, "\n");

  // 2. Remove empty headings (e.g., "###" followed by optional spaces on its own line)
  cleanedText = cleanedText.replace(/^###\s*$/gm, "");

  // 3. Strip raw bold markers "**" around headings
  cleanedText = cleanedText.replace(/^### \*\*\s*([^*]+?)\s*\*\*$/gm, "### $1");

  // 4. Convert tabbed list items (e.g. starting with \t or spaces then \t) to standard markdown list items "* "
  cleanedText = cleanedText.replace(/^\s*\t+\s*/gm, "* ");

  // 5. Pre-process numbered lists to merge items split by blank lines (only if they are list items)
  cleanedText = cleanedText.replace(/(^\d+\..+)\n\n(\d+\.\s+)/gm, (_, prevLine, nextNum) => prevLine + "\n" + nextNum);

  const lines = cleanedText.split("\n");
  const parsedBlocks: Block[] = [];
  let currentBlock: Block | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      if (currentBlock) {
        parsedBlocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    if (trimmed === "---") {
      if (currentBlock) parsedBlocks.push(currentBlock);
      parsedBlocks.push({ type: "hr", content: trimmed });
      currentBlock = null;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      if (currentBlock) parsedBlocks.push(currentBlock);
      parsedBlocks.push({ type: "heading", content: trimmed.replace("### ", "") });
      currentBlock = null;
      continue;
    }

    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      if (currentBlock) parsedBlocks.push(currentBlock);
      parsedBlocks.push({ type: "image", content: trimmed });
      currentBlock = null;
      continue;
    }

    const isUl = trimmed.startsWith("* ") || trimmed.startsWith("- ");
    const isOl = /^\d+\.\s+/.test(trimmed);

    if (isUl) {
      if (currentBlock && currentBlock.type !== "ul") {
        parsedBlocks.push(currentBlock);
        currentBlock = null;
      }
      if (!currentBlock) {
        currentBlock = { type: "ul", items: [] };
      }
      currentBlock!.items!.push(trimmed.replace(/^[\*\-]\s+/, ""));
      continue;
    }

    if (isOl) {
      if (currentBlock && currentBlock.type !== "ol") {
        parsedBlocks.push(currentBlock);
        currentBlock = null;
      }
      if (!currentBlock) {
        currentBlock = { type: "ol", items: [] };
      }
      currentBlock!.items!.push(trimmed.replace(/^\d+\.\s+/, ""));
      continue;
    }

    // Paragraph
    if (currentBlock && currentBlock.type !== "paragraph") {
      parsedBlocks.push(currentBlock);
      currentBlock = null;
    }
    if (!currentBlock) {
      currentBlock = { type: "paragraph", content: "" };
    }
    currentBlock.content = currentBlock.content ? currentBlock.content + " " + trimmed : trimmed;
  }

  if (currentBlock) {
    parsedBlocks.push(currentBlock);
  }

  // Titik injeksi "Baca Juga": setelah ~50% blok konten, pilih sesudah heading terdekat
  const midpoint = Math.floor(parsedBlocks.length * 0.5);
  let injectAt = midpoint;
  // Geser ke sesudah heading terdekat setelah midpoint
  for (let i = midpoint; i < Math.min(midpoint + 5, parsedBlocks.length); i++) {
    if (parsedBlocks[i].type === "heading") {
      injectAt = i + 1;
      break;
    }
  }

  const result = parsedBlocks.map((block, idx) => {
    switch (block.type) {
      case "hr":
        return <hr key={idx} className="my-10 border-gray-200/60" />;

      case "image": {
        const imgMatch = block.content?.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (!imgMatch) return null;
        return (
          <figure key={idx} className="my-8">
            <img
              src={imgMatch[2]}
              alt={imgMatch[1] || ""}
              className="w-full rounded-2xl shadow-lg shadow-sm border border-black/[0.02]"
              loading="lazy"
            />
            {imgMatch[1] && (
              <figcaption className="text-center text-[13px] text-gray-400 mt-3 italic">
                {imgMatch[1]}
              </figcaption>
            )}
          </figure>
        );
      }

      case "heading": {
        const headingText = block.content ?? "";
        const headingId = headingText
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-");
        return (
          <h3
            key={idx}
            id={headingId}
            className="font-heading text-[21px] sm:text-[23px] font-extrabold text-gray-950 mt-12 mb-5 leading-tight flex items-center scroll-mt-24 border-l-4 border-[#990202] pl-3.5"
          >
            {headingText}
          </h3>
        );
      }

      case "ul":
        return (
          <ul key={idx} className="space-y-3.5 my-6 pl-1 list-none">
            {block.items!.map((item, itemIdx) => {
              const parsedItem = parseBoldText(item, articleTitle);
              return (
                <li key={itemIdx} className="text-[15px] leading-relaxed text-gray-600 relative pl-7 flex items-start">
                  <span className="absolute left-0 top-[9px] w-2 h-2 rounded-full bg-[#990202]/70" />
                  <span className="flex-1">{parsedItem}</span>
                </li>
              );
            })}
          </ul>
        );

      case "ol":
        return (
          <ol key={idx} className="space-y-4 my-6 pl-1 list-none">
            {block.items!.map((item, itemIdx) => {
              const parsedItem = parseBoldText(item, articleTitle);
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

      case "paragraph":
      default:
        return (
          <p key={idx} className="text-[15px] sm:text-[15.5px] leading-[1.85] text-gray-600 font-normal my-5">
            {parseBoldText(block.content ?? "", articleTitle)}
          </p>
        );
    }
  });

  // Injeksi inline related card setelah blok ke-injectAt
  if (inlineRelated && result.length > 2) {
    const clampedAt = Math.min(injectAt, result.length - 1);
    result.splice(clampedAt, 0,
      <a
        key="inline-related"
        href={`/artikel/${inlineRelated.slug}`}
        className="group my-8 flex items-stretch gap-0 rounded-2xl border border-red-100 bg-gradient-to-r from-[#FFF5F5] to-white overflow-hidden hover:border-red-200 hover:shadow-md transition-all duration-200 no-underline"
      >
        {/* Accent bar */}
        <span className="w-1 flex-shrink-0 bg-[#D62828] rounded-l-2xl" />
        {/* Content */}
        <span className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 flex-1">
          <span className="flex-1">
            <span className="block text-[10.5px] font-black uppercase tracking-widest text-[#990202] mb-1">
              📖 Baca Juga
            </span>
            <span className="block text-[14.5px] font-bold text-gray-900 leading-snug group-hover:text-[#990202] transition-colors">
              {inlineRelated.title}
            </span>
            <span className="block text-[11.5px] text-gray-400 mt-1">
              {inlineRelated.category} · {inlineRelated.readTime}
            </span>
          </span>
          {/* Thumbnail */}
          <span className="hidden sm:block flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden bg-gray-100">
            <img
              src={inlineRelated.coverImage}
              alt={inlineRelated.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </span>
          {/* Arrow */}
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:bg-[#990202] group-hover:border-[#990202] transition-colors">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </span>
      </a>
    );
  }

  return result;
}

// Utility to parse **bold** text, [link](url), and ![alt](url) to JSX elements
function parseBoldText(text: string, articleTitle: string = ""): React.ReactNode[] {
  // Regex to match links and images:
  // Group 1: Optional image marker "!"
  // Group 2: Alt/Text inside brackets
  // Group 3: URL inside parentheses
  const linkRegex = /(!?)\[([^\]]+)\]\(([^)]+)\)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  // Find all matches for links and images first
  while ((match = linkRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const isImage = match[1] === "!";
    const linkText = match[2];
    const rawUrl = match[3];

    // 1. Process text before the match for any **bold** markers
    const beforeText = text.substring(lastIndex, matchIndex);
    if (beforeText) {
      elements.push(...parseOnlyBold(beforeText, `b-pre-${matchIndex}`));
    }

    // 2. Process the matched link or image
    if (isImage) {
      elements.push(
        <img
          key={`img-${matchIndex}`}
          src={rawUrl}
          alt={linkText}
          className="max-w-full rounded-xl my-2 inline-block align-middle"
          loading="lazy"
        />
      );
    } else {
      const cleanedUrl = cleanArticleUrl(rawUrl, articleTitle);
      const isExternal = cleanedUrl.startsWith("http") || cleanedUrl.startsWith("https") || cleanedUrl.startsWith("//");
      
      // Determine if the entire link text is bolded, e.g. **Link Text**
      const isBoldLink = linkText.startsWith("**") && linkText.endsWith("**");
      const cleanLinkText = isBoldLink ? linkText.slice(2, -2) : linkText;
      
      // Parse any inline bold elements within the link text itself
      const parsedLinkContent = parseOnlyBold(cleanLinkText, `link-content-${matchIndex}`);

      elements.push(
        <a
          key={`link-${matchIndex}`}
          href={cleanedUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={`text-[#990202] underline underline-offset-2 hover:text-[#B91C1C] transition-colors ${
            isBoldLink ? "font-extrabold" : "font-semibold"
          }`}
        >
          {parsedLinkContent}
        </a>
      );
    }

    lastIndex = linkRegex.lastIndex;
  }

  // 3. Process remaining text after the last match
  const afterText = text.substring(lastIndex);
  if (afterText) {
    elements.push(...parseOnlyBold(afterText, `b-post-${lastIndex}`));
  }

  return elements;
}

// Helper to parse **bold** markers in clean text segments
function parseOnlyBold(text: string, baseKey: string): React.ReactNode[] {
  // Regex split to locate **bold** text blocks
  const boldRegex = /(\*\*[^*]+\*\*)/g;
  const parts = text.split(boldRegex);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      const match = part.match(/^\*\*([^*]+)\*\*$/);
      if (match) {
        return (
          <strong key={`${baseKey}-${index}`} className="font-extrabold text-gray-900">
            {match[1]}
          </strong>
        );
      }
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

const CATEGORY_MAP: Record<string, string> = {
  "Pendirian PT": "Pendirian Usaha",
  "Legalitas PT": "Pendirian Usaha",
  "CV": "Pendirian Usaha",
  "PT Perorangan": "Pendirian Usaha",
  "PT PMA": "Pendirian Usaha",
  "Firma": "Pendirian Usaha",
  "Perkumpulan": "Pendirian Usaha",
  "Yayasan": "Pendirian Usaha",
  "Koperasi": "Pendirian Usaha",
  "UMKM": "Pendirian Usaha",
  "Merek & HAKI": "Haki",
  "Sertifikasi ISO": "ISO",
  "KBLI": "Perizinan",
  "Perizinan": "Perizinan",
  "Pajak": "Pajak",
  "Branding": "Branding",
};

function getAuthorInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  trackMetric("article_read", 1, { category: article.category, slug });

  // ── Smart Related Articles: keyword + category matching ──────────────────
  // Ekstrak kata kunci bermakna dari judul artikel (min 4 karakter, skip stopwords)
  const STOPWORDS = new Set(["yang", "untuk", "dengan", "dalam", "dari", "pada", "oleh", "atau",
    "dan", "ini", "itu", "adalah", "akan", "sudah", "bisa", "cara", "agar", "jika",
    "mana", "siapa", "apa", "bagaimana", "kenapa", "mengapa", "setelah", "sebelum",
    "lebih", "serta", "juga", "namun", "tetapi", "karena", "saat", "ketika"]);
  
  const titleKeywords = article.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length >= 4 && !STOPWORDS.has(w));

  // Ambil semua artikel kandidat (same category + recent lainnya), lalu score
  const candidatePool = await prisma.article.findMany({
    where: { slug: { not: article.slug } },
    orderBy: { createdAt: "desc" },
    take: 60,
    select: { id: true, title: true, slug: true, coverImage: true, category: true, readTime: true }
  });

  // Scoring: +3 per keyword match di judul, +2 jika same category
  const scored = candidatePool.map(a => {
    const titleLower = a.title.toLowerCase();
    const keywordScore = titleKeywords.filter(kw => titleLower.includes(kw)).length * 3;
    const categoryScore = a.category === article.category ? 2 : 0;
    return { ...a, score: keywordScore + categoryScore };
  });

  // Sort by score desc, ambil top 2
  scored.sort((a, b) => b.score - a.score);
  const displayRelated = scored.slice(0, 2);

  const headings = extractHeadings(article.content);

  // Generate tag keywords from the article category and title
  const tags = generateTags(article.category, article.title);

  return (
    <div className="flex flex-col min-h-screen bg-white relative overflow-clip blog-detail-container">
      <ViewTracker slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getArticleJsonLd({
              title: article.title,
              description: article.excerpt,
              slug: article.slug,
              publishedAt: article.createdAt.toISOString(),
              author: article.author?.name || undefined,
              image: article.coverImage || undefined,
            })
          ),
        }}
      />

      {/* Radial Glows for premium aesthetics */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ─── MAIN ARTICLE CONTAINER ─── */}
      <main className="flex-grow relative z-10">
        <article className="max-w-[1240px] mx-auto px-6">

          {/* Wrapper for centered header to keep it readable */}
          <div className="max-w-[900px] mx-auto">
            {/* ─── BREADCRUMBS & ARTICLE HEADER ─── */}
            <header className="pt-12 sm:pt-16 pb-8 text-center">
              {/* Breadcrumb Trail */}
              <div className="flex items-center justify-center flex-wrap gap-2 text-[12.5px] font-medium text-gray-500 mb-6">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <Link href="/artikel" className="hover:text-[#990202] transition-colors">
                  Blog
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-800 font-bold">{CATEGORY_MAP[article.category] || article.category}</span>
                <span className="inline-flex px-2 py-0.5 ml-1.5 rounded bg-[#FFF5F5] text-[10px] font-extrabold tracking-wider uppercase text-[#990202] border border-red-100/60 shadow-sm">
                  Legalitas Bisnis
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-[32px] sm:text-[40px] lg:text-[46px] font-extrabold text-gray-950 leading-[1.15] tracking-tight max-w-[800px] mx-auto mb-6">
                {article.title}
              </h1>

              {/* Author & Meta Row */}
              <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2.5 text-[13.5px] text-gray-500 pb-8 border-b border-gray-100/80">
                {/* Author Info */}
                <div className="flex items-center space-x-2">
                  {article.author?.avatar ? (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      width={28}
                      height={28}
                      className="rounded-full object-cover shadow-md border border-black/[0.03] shadow-sm"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#990202] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                      {getAuthorInitials(article.author?.name || "EasyLegal")}
                    </div>
                  )}
                  <span className="font-bold text-gray-900">{article.author?.name || "EasyLegal"}</span>
                </div>

                {/* Separator dot */}
                <span className="text-gray-300 font-normal">•</span>

                {/* Date */}
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-[#990202] flex-shrink-0" />
                  <span>
                    {new Date(article.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Separator dot */}
                <span className="text-gray-300 font-normal">•</span>

                {/* Read Time */}
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-[#990202] flex-shrink-0" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </header>
          </div>

          {/* Wrapper for cover image */}
          <div className="max-w-[1000px] mx-auto mb-10">
            {/* ─── HERO IMAGE ─── */}
            <div className="relative overflow-hidden rounded-[32px] shadow-md border border-black/[0.03] shadow-[0_8px_30px_rgba(0,0,0,0.03)] bg-gray-50 aspect-[16/9] w-full">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                sizes="(max-width: 1000px) 100vw, 1000px"
                priority
                className="object-cover object-center"
              />
            </div>
            {/* Dynamic Excerpt Caption below image */}
            <p className="text-center text-[12.5px] text-gray-400 italic mt-4 max-w-2xl mx-auto leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Split 2-Column Grid Layout (Body + Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-12">

            {/* Left Column: Article Body */}
            <div className="lg:col-span-8">
              {/* ─── ARTICLE BODY ─── */}
              <div className="prose-article mb-12">
                {renderMarkdownContent(article.content, displayRelated[1] ?? displayRelated[0] ?? null, article.title)}
              </div>

              {/* ─── TAGS ─── */}
              <div className="flex flex-wrap items-center gap-2 pb-8 mb-8 border-b border-gray-100">
                <Tag className="w-4 h-4 text-gray-400 mr-1" />
                {tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    href={`/artikel?tag=${encodeURIComponent(tag)}`}
                    className="inline-flex px-3 py-1.5 rounded-lg text-[12px] font-bold text-gray-600 bg-gray-50 shadow-md border border-black/[0.04] hover:bg-[#FFF5F5] hover:text-[#990202] hover:border-red-100 transition-colors cursor-pointer"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* ─── AUTHOR CARD ─── */}
              <div className="bg-[#FAFAFA] rounded-2xl shadow-md border border-black/[0.04] p-6 flex flex-col gap-4 mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-4">
                    {article.author?.avatar ? (
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover shadow-sm shadow-md border border-black/[0.03]"
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
            </div>

            {/* Right Column: Sidebar */}
            {/* Outer wrapper memberi tinggi = kolom artikel (default grid behavior) → ruang scroll untuk sticky child */}
            <div className="lg:col-span-4 mt-12 lg:mt-0">
              {/* Inner sticky container: menempel di kanan saat scroll, lepas di akhir kolom artikel */}
              <aside className="space-y-6 lg:sticky lg:top-24">

              {/* Table of Contents Widget */}
              {headings.length > 1 && (
                <TableOfContents headings={headings} />
              )}

              {/* Ad Card (Card Iklan) */}
              <a
                href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan promo Diskon 50% Layanan Pendirian PT & CV.")}
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative overflow-hidden rounded-[30px] bg-gradient-to-b from-[#800000] to-[#4A0000] p-7 text-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-red-950 shadow-md"
              >
                {/* Glow reflection inside */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-red-400/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
                
                {/* EL Badge */}
                <div className="inline-flex bg-white/10 text-white rounded-lg px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-widest border border-white/5 shadow-sm">
                  EL
                </div>

                {/* Text Content */}
                <h3 className="text-[28px] font-black leading-tight tracking-tight mt-4 text-center">
                  Diskon 50%
                </h3>
                <p className="text-[13px] font-black text-red-100 text-center tracking-wide mt-1 uppercase">
                  Untuk Layanan Pendirian PT &amp; CV
                </p>
                <p className="text-[12px] text-red-200/90 text-center mt-3 max-w-[210px] mx-auto leading-relaxed font-normal">
                  Konsultasi gratis dengan tim legal EasyLegal. Proses cepat, harga transparan.
                </p>

                {/* Card Image */}
                <div className="relative aspect-[1.5] w-full overflow-hidden rounded-2xl mt-6 border border-white/5 shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?fit=crop&w=500&h=300&q=80"
                    alt="Layanan Pendirian PT & CV"
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </a>

              {/* Tentang EasyLegal Card */}
              <div className="bg-white shadow-md border border-black/[0.04] rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
                <h4 className="text-[12.5px] font-extrabold text-gray-900 mb-1.5">
                  Tentang EasyLegal
                </h4>
                <p className="text-[11.5px] leading-relaxed text-gray-500 mb-4 font-normal">
                  Ikuti update informasi seputar legalitas bisnis lewat media sosial kami.
                </p>
                <div className="flex items-center space-x-2">
                  {[
                    { Icon: IgIcon, href: "/", label: "Instagram" },
                    { Icon: FbIcon, href: "/", label: "Facebook" },
                    { Icon: LiIcon, href: "/", label: "LinkedIn" },
                    { Icon: ChatIcon, href: "/", label: "Chat" },
                  ].map(({ Icon, href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className="w-9 h-9 bg-white border border-[#E5E7EB] rounded-[10px] flex items-center justify-center text-[#555555] hover:text-[#990202] hover:border-[#990202] hover:scale-105 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                      aria-label={label}
                    >
                      <Icon className="w-[14px] h-[14px]" />
                    </Link>
                  ))}
                </div>
              </div>
              </aside>
            </div>
          </div>
        </article>

        {/* ─── RELATED ARTICLES + NEWSLETTER ─── */}
        <section className="py-16 sm:py-20 bg-[#FAFAFA]">
          <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

              {/* Left: Related Articles */}
              <div className="lg:col-span-8">
                <p className="text-[12px] font-bold text-[#990202] uppercase tracking-widest mb-2">Artikel Terkait</p>
                <h2 className="font-heading text-[24px] sm:text-[28px] font-extrabold text-gray-950 leading-tight mb-8">
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
