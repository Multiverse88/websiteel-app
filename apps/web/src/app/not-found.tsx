import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[160px] font-black text-gray-100 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
              <Search className="w-10 h-10 text-[#990202]" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-heading text-[16px] sm:text-[28px] font-extrabold text-gray-950 mb-3">
          Halaman Tidak Ditemukan
        </h2>

        {/* Description */}
        <p className="text-[16px] text-gray-500 leading-relaxed mb-8">
          Sepertinya halaman yang Anda cari sudah dipindahkan, dihapus, atau tidak tersedia.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[16px] rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 px-6 py-3 shadow-md border border-black/[0.04] text-gray-700 hover:text-[#990202] hover:border-red-200 font-bold text-[16px] rounded-xl transition-all duration-200 bg-white"
          >
            <span>Baca Artikel</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-[16px] font-bold text-gray-400 uppercase tracking-wider mb-4">
            Link Populer
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { name: "Pendirian PT", href: "/layanan/pendirian-badan-usaha" },
              { name: "Merek & HAKI", href: "/layanan/merek-haki" },
              { name: "NIB & OSS", href: "/layanan/nib-oss" },
              { name: "Kontak", href: "/kontak" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[16px] font-semibold text-gray-600 hover:text-[#990202] bg-gray-50 hover:bg-red-50 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
