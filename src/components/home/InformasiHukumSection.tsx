import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readTime: string;
  createdAt: Date;
}

const CATEGORIES = [
  "Sertifikasi ISO",
  "Pendirian PT",
  "Legalitas PT",
  "CV",
  "PT Perorangan",
  "PT PMA",
  "Firma",
  "Perkumpulan",
  "Yayasan",
  "Koperasi",
  "UMKM",
  "KBLI",
  "Perizinan",
  "Merek & HAKI",
];

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

function formatCategory(category: string) {
  return category.toUpperCase();
}

export default function InformasiHukumSection({ articles }: { articles: ArticleItem[] }) {
  if (articles.length === 0) {
    return null;
  }

  const [featured, ...gridArticles] = articles;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="text-left">
            <span className="text-[12px] font-extrabold text-[#B91C1C] uppercase tracking-[0.2em]">
              INFORMASI HUKUM
            </span>
            <h2 className="text-[34px] sm:text-[38px] lg:text-[42px] font-black text-[#111827] mt-3 tracking-[-0.02em] leading-tight">
              Panduan & update hukum untuk<br />pelaku usaha.
            </h2>
            <p className="text-[14.5px] text-[#6B7280] mt-3 max-w-[540px] leading-relaxed">
              Insight terbaru tentang regulasi, perizinan, dan tips legalitas — supaya bisnis Anda tumbuh aman &amp; compliant.
            </p>
          </div>
          <Link
            href="/artikel"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-200 text-[13px] font-bold text-gray-800 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm flex-shrink-0"
          >
            <span>Lihat semua</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured Article */}
          <div className="lg:col-span-5 h-full">
            <Link
              href={`/artikel/${featured.slug}`}
              className="group flex flex-col h-full bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-50 relative">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="bg-[#FEF2F2] text-[#B91C1C] px-2.5 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                      {formatCategory(featured.category)}
                    </span>
                    <span className="text-[10.5px] text-gray-400 font-bold ml-3.5">
                      {formatDate(featured.createdAt)} · {featured.readTime}
                    </span>
                  </div>
                  <h3 className="text-[18px] lg:text-[20px] font-black text-[#111827] mt-3.5 leading-snug group-hover:text-[#B91C1C] transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed mt-3 font-medium">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Grid Articles */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            {gridArticles.map((article) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="group flex flex-col bg-white rounded-3xl border border-gray-150/70 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.012)] hover:shadow-md hover:scale-[1.015] transition-all duration-300 text-left"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-50 relative">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-lg text-[9px] font-black tracking-wider uppercase border border-[#FEE2E2]">
                        {formatCategory(article.category)}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold ml-2.5">
                        {formatDate(article.createdAt)} · {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-[14px] lg:text-[14.5px] font-black text-[#111827] mt-3 leading-snug group-hover:text-[#B91C1C] transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
