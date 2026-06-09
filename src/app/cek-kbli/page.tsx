"use client";

import React, { useState, useEffect } from "react";
import { Search, MessageCircle, Check, BookOpen, ArrowRight, Shield, Zap, X } from "lucide-react";

// KBLI Data Structure
interface KBLIItem {
  code: string;
  title: string;
  category: "KULINER" | "RETAIL" | "JASA" | "TEKNOLOGI" | "PROPERTI" | "MANUFAKTUR" | "PENDIDIKAN" | "KESEHATAN" | "TRANSPORTASI";
  risk: "Risiko Rendah" | "Menengah-Rendah" | "Menengah-Tinggi" | "Risiko Tinggi" | "Rendah" | "Menengah Rendah" | "Menengah Tinggi" | "Tinggi";
  desc: string;
  details?: {
    entity: string;
    permits: string[];
  };
}

const CATEGORIES = [
  { id: "Semua", label: "Semua", dotColor: "" },
  { id: "KULINER", label: "Kuliner", dotColor: "bg-amber-500" },
  { id: "RETAIL", label: "Retail", dotColor: "bg-pink-400" },
  { id: "JASA", label: "Jasa", dotColor: "bg-amber-800" },
  { id: "TEKNOLOGI", label: "Teknologi", dotColor: "bg-blue-400" },
  { id: "PROPERTI", label: "Properti", dotColor: "bg-emerald-400" },
  { id: "MANUFAKTUR", label: "Manufaktur", dotColor: "bg-red-400" },
  { id: "PENDIDIKAN", label: "Pendidikan", dotColor: "bg-amber-600" },
  { id: "KESEHATAN", label: "Kesehatan", dotColor: "bg-emerald-500" },
  { id: "TRANSPORTASI", label: "Transportasi", dotColor: "bg-orange-400" },
];

const KBLI_DATABASE: KBLIItem[] = [
  {
    code: "56101",
    title: "Restoran",
    category: "KULINER",
    risk: "Menengah-Rendah",
    desc: "Penyediaan jasa makanan & minuman dengan tempat usaha permanen, dilengkapi pelayanan & fasilitas duduk.",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)", "Sertifikat Standar (dilakukan verifikasi)", "Sertifikasi Halal", "Persetujuan Bangunan Gedung (PBG)"],
    }
  },
  {
    code: "56102",
    title: "Warung Makan",
    category: "KULINER",
    risk: "Risiko Rendah",
    desc: "Penyediaan makanan/minuman dengan menu sederhana di tempat usaha permanen ukuran kecil.",
    details: {
      entity: "PT Perorangan atau CV",
      permits: ["NIB (Nomor Induk Berusaha)", "SPP-IRT (Sertifikat Produksi Pangan Industri Rumah Tangga) jika ada produk kemasan", "Sertifikasi Halal"],
    }
  },
  {
    code: "56103",
    title: "Kedai Makanan",
    category: "KULINER",
    risk: "Risiko Rendah",
    desc: "Penyediaan makanan/minuman dengan menu terbatas, tempat usaha kecil & permanen.",
    details: {
      entity: "PT Perorangan atau CV",
      permits: ["NIB (Nomor Induk Berusaha)", "Sertifikasi Halal"],
    }
  },
  {
    code: "56104",
    title: "Penyediaan Makanan Keliling/Tempat Tidak Tetap",
    category: "KULINER",
    risk: "Risiko Rendah",
    desc: "Food truck, gerobak, atau lapak makanan keliling tanpa lokasi permanen.",
    details: {
      entity: "PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)", "Sertifikasi Halal"],
    }
  },
  {
    code: "56210",
    title: "Jasa Boga (Catering)",
    category: "KULINER",
    risk: "Menengah-Rendah",
    desc: "Penyediaan makanan untuk pesanan khusus seperti acara, perusahaan, atau lembaga.",
    details: {
      entity: "PT atau CV",
      permits: ["NIB (Nomor Induk Berusaha)", "Sertifikat Standar", "Laik Higiene Sanitasi (LHS)", "Sertifikasi Halal"],
    }
  },
  {
    code: "56301",
    title: "Bar",
    category: "KULINER",
    risk: "Menengah-Tinggi",
    desc: "Penyediaan minuman beralkohol/non-alkohol dengan tempat usaha permanen.",
    details: {
      entity: "PT (Perseroan Terbatas)",
      permits: ["NIB (Nomor Induk Berusaha)", "Sertifikat Standar terverifikasi Kementerian Pariwisata", "Izin Usaha Penjualan Minuman Beralkohol (IUP-MB)"],
    }
  },
  {
    code: "56303",
    title: "Cafe / Kedai Minuman",
    category: "KULINER",
    risk: "Risiko Rendah",
    desc: "Penyediaan minuman (kopi, teh, jus) dengan/tanpa makanan ringan.",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)", "Sertifikasi Halal"],
    }
  },
  {
    code: "10710",
    title: "Industri Roti & Kue",
    category: "KULINER",
    risk: "Menengah-Rendah",
    desc: "Produksi roti, kue basah/kering, biskuit dalam skala produksi.",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)", "Sertifikasi Halal", "BPOM MD / SPP-IRT"],
    }
  },
  {
    code: "10791",
    title: "Industri Es Krim",
    category: "KULINER",
    risk: "Menengah-Rendah",
    desc: "Produksi es krim, sorbet, & dessert beku lainnya.",
    details: {
      entity: "PT atau CV",
      permits: ["NIB (Nomor Induk Berusaha)", "Izin Penerapan CPPOB BPOM", "Sertifikasi Halal"],
    }
  },
  {
    code: "47711",
    title: "Perdagangan Eceran Pakaian",
    category: "RETAIL",
    risk: "Risiko Rendah",
    desc: "Toko pakaian jadi untuk pria, wanita, anak — busana muslim, formal, casual.",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)"],
    }
  },
  {
    code: "47712",
    title: "Perdagangan Eceran Alas Kaki",
    category: "RETAIL",
    risk: "Risiko Rendah",
    desc: "Toko sepatu, sandal, sandal khusus (olahraga, formal, dll).",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)"],
    }
  },
  {
    code: "47713",
    title: "Perdagangan Eceran Tas, Dompet, Kopor",
    category: "RETAIL",
    risk: "Risiko Rendah",
    desc: "Toko tas, dompet, koper, & barang kulit lainnya.",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)"],
    }
  },
  {
    code: "47723",
    title: "Perdagangan Eceran Kosmetik",
    category: "RETAIL",
    risk: "Risiko Rendah",
    desc: "Toko kosmetik, parfum, perawatan kulit, & kecantikan.",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)", "Notifikasi Kosmetika BPOM (jika maklon/impor langsung)"],
    }
  },
  {
    code: "47912",
    title: "Perdagangan Eceran Online via Internet",
    category: "RETAIL",
    risk: "Risiko Rendah",
    desc: "Penjualan via website, marketplace (Shopee, Tokopedia, dll), atau aplikasi.",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)", "Tanda Daftar Penyelenggara Sistem Elektronik (TD PSE) dari Kominfo"],
    }
  },
  {
    code: "62019",
    title: "Aktivitas Pemrograman Komputer Lainnya",
    category: "TEKNOLOGI",
    risk: "Risiko Rendah",
    desc: "Pengembangan software kustom, pembuatan website, aplikasi mobile.",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)"],
    }
  },
  {
    code: "68111",
    title: "Real Estat yang Dimiliki atau Disewa",
    category: "PROPERTI",
    risk: "Risiko Rendah",
    desc: "Penyewaan gedung perkantoran, apartemen, perumahan, virtual office.",
    details: {
      entity: "PT atau CV",
      permits: ["NIB (Nomor Induk Berusaha)", "Konfirmasi Kesesuaian Kegiatan Pemanfaatan Ruang (KKKPR)"],
    }
  },
  {
    code: "14111",
    title: "Industri Pakaian Jadi Konveksi",
    category: "MANUFAKTUR",
    risk: "Risiko Rendah",
    desc: "Pembuatan pakaian jadi konveksi massal berdasarkan pesanan.",
    details: {
      entity: "PT, CV, atau PT Perorangan",
      permits: ["NIB (Nomor Induk Berusaha)"],
    }
  },
  {
    code: "85491",
    title: "Jasa Pendidikan Non-Formal Lainnya",
    category: "PENDIDIKAN",
    risk: "Risiko Rendah",
    desc: "Lembaga kursus komputer, bahasa asing, bimbingan belajar, dll.",
    details: {
      entity: "PT atau CV",
      permits: ["NIB (Nomor Induk Berusaha)", "Persetujuan Teknis Dinas Pendidikan setempat"],
    }
  },
  {
    code: "86101",
    title: "Aktivitas Rumah Sakit Swasta",
    category: "KESEHATAN",
    risk: "Risiko Tinggi",
    desc: "Penyediaan perawatan medis dan operasi jangka panjang oleh pihak swasta.",
    details: {
      entity: "PT (Perseroan Terbatas)",
      permits: ["NIB (Nomor Induk Berusaha)", "Izin Operasional Rumah Sakit terverifikasi Kemenkes", "Analisis Mengenai Dampak Lingkungan (AMDAL)"],
    }
  },
  {
    code: "49211",
    title: "Angkutan Orang Dengan Bus",
    category: "TRANSPORTASI",
    risk: "Menengah-Tinggi",
    desc: "Pengangkutan penumpang menggunakan bus umum antar kota maupun dalam kota.",
    details: {
      entity: "PT atau CV",
      permits: ["NIB (Nomor Induk Berusaha)", "Sertifikat Standar terverifikasi Kementerian Perhubungan", "Izin Trayek"],
    }
  },
];

export default function CekKBLI() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedKBLI, setSelectedKBLI] = useState<KBLIItem | null>(null);
  
  // Filter KBLI database based on query & selected category
  const filteredKBLI = KBLI_DATABASE.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  const getCategoryCount = (catId: string) => {
    if (catId === "Semua") return KBLI_DATABASE.length;
    return KBLI_DATABASE.filter(item => item.category === catId).length;
  };

  const handleWhatsAppConsult = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Halo EasyLegal, saya tidak menemukan kode KBLI yang cocok. Mohon bantu mencarikan kode KBLI untuk bisnis saya.\n\nKata kunci: ${searchQuery || "-"}`;
    const waUrl = `https://wa.me/6281123456789?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const handleConsultSpecificKBLI = (item: KBLIItem) => {
    const message = `Halo EasyLegal, saya ingin berkonsultasi mengenai kode KBLI ini:\n\n` +
                    `- Kode KBLI: ${item.code}\n` +
                    `- Judul KBLI: ${item.title}\n` +
                    `- Tingkat Risiko: ${item.risk}\n\n` +
                    `Apakah KBLI ini sudah sesuai dengan rencana bisnis saya?`;
    const waUrl = `https://wa.me/6281123456789?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const scrollToSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("kbli-search-box");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDFB] overflow-hidden flex flex-col items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Ambient background glows */}
      <div className="absolute left-[-200px] top-[15%] w-[550px] h-[550px] rounded-full bg-[#F5C2C4]/35 blur-[110px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute right-[-250px] bottom-[-100px] w-[700px] h-[700px] rounded-full bg-[#FEEDDC]/40 blur-[130px] pointer-events-none animate-pulse-subtle" />

      {/* ─── HERO SECTION ─── */}
      <section className="w-full max-w-[1200px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6 mb-20">
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] mb-6 text-[12.5px] font-semibold text-[#B91C1C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
            Database KBLI 2020
          </div>

          <h1 className="text-[32px] xs:text-[40px] sm:text-[54px] lg:text-[60px] font-black text-[#111111] tracking-tight leading-[1.08] mb-6">
            Klasifikasi Baku<br />Lapangan Usaha<br />Indonesia.
          </h1>

          <p className="text-[15.5px] text-[#666666] leading-relaxed max-w-[500px] mb-8 font-medium">
            KBLI adalah kode klasifikasi resmi untuk jenis bidang usaha perusahaan di Indonesia. Perusahaan yang ingin daftarkan usaha di <b>Akta atau NIB</b> wajib mencantumkan kode KBLI yang sesuai. Disusun BPS merujuk ISIC (PBB), ACIC (ASEAN), & EAMS.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#kbli-search-box"
              onClick={scrollToSearch}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#8A0000] hover:bg-[#680000] text-white font-extrabold text-[14.5px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Cari KBLI Sekarang
              <span className="text-[15px]">↓</span>
            </a>
            
            <a
              href="/layanan/nib-oss"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-200 text-[#111111] font-extrabold text-[14.5px] rounded-xl hover:bg-gray-55 transition-all duration-200 shadow-sm"
            >
              Jasa Pengurusan NIB
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 relative w-full flex items-center justify-center scale-[0.82] xs:scale-[0.9] sm:scale-100 origin-center transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FEEDDC]/70 to-[#FCE7E6]/70 rounded-[40px] opacity-80 blur-[4px] transform rotate-3 scale-95 pointer-events-none" />

          <div className="relative bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-white/50 w-[90%] sm:w-[85%] overflow-hidden flex flex-col p-5 z-10">
            <div className="flex items-center gap-1.5 mb-4 relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              <div className="absolute inset-x-0 mx-auto text-center text-[10px] text-gray-400 select-none font-semibold">
                database.kbli.bps.go.id
              </div>
            </div>

            <div className="border border-[#B91C1C] rounded-xl py-3 px-4 flex items-center gap-2 mb-4 bg-white shadow-[0_0_0_3px_rgba(185,28,28,0.05)]">
              <Search className="w-4 h-4 text-[#B91C1C] stroke-[2.5px]" />
              <span className="text-[14px] font-bold text-[#111111]">restoran</span>
              <span className="w-[1.5px] h-4 bg-[#B91C1C] animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="border border-[#B91C1C] bg-[#FFF8F8] rounded-xl p-3.5 flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-[10px] font-black text-[#B91C1C] uppercase tracking-wide">KBLI 56101</div>
                  <div className="text-[13.5px] font-bold text-gray-900 mt-0.5">Restoran</div>
                </div>
                <span className="bg-[#FEF3C7] text-[#D97706] text-[8.5px] font-black px-2 py-0.5 rounded-[4px] tracking-wide uppercase">
                  Menengah-Rendah
                </span>
              </div>

              <div className="border border-gray-100/70 bg-white rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">KBLI 56102</div>
                  <div className="text-[13.5px] font-bold text-gray-800 mt-0.5">Warung Makan</div>
                </div>
                <span className="bg-[#E6F4EA] text-[#137333] text-[8.5px] font-black px-2 py-0.5 rounded-[4px] tracking-wide uppercase">
                  Rendah
                </span>
              </div>

              <div className="border border-gray-100/70 bg-white rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">KBLI 56303</div>
                  <div className="text-[13.5px] font-bold text-gray-800 mt-0.5">Cafe / Kedai Minuman</div>
                </div>
                <span className="bg-[#E6F4EA] text-[#137333] text-[8.5px] font-black px-2 py-0.5 rounded-[4px] tracking-wide uppercase">
                  Rendah
                </span>
              </div>

              <div className="border border-gray-100/70 bg-white rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">KBLI 56210</div>
                  <div className="text-[13.5px] font-bold text-gray-800 mt-0.5">Jasa Boga (Catering)</div>
                </div>
                <span className="bg-[#FEF3C7] text-[#D97706] text-[8.5px] font-black px-2 py-0.5 rounded-[4px] tracking-wide uppercase">
                  Menengah-Rendah
                </span>
              </div>
            </div>
          </div>

          <div className="absolute top-[-15px] right-[-10px] sm:right-[10px] bg-white rounded-[20px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-gray-100 p-4 flex items-center gap-3.5 z-20">
            <div className="w-10 h-10 rounded-xl bg-[#FFF3E0] flex items-center justify-center text-[#E65100] flex-shrink-0">
              <BookOpen className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-gray-900 leading-none">1.790+ KBLI</div>
              <div className="text-[10px] text-[#666666] font-medium mt-1">Database resmi BPS</div>
            </div>
          </div>

          <div className="absolute bottom-[-15px] left-[-15px] sm:left-[10px] bg-white rounded-[20px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-gray-100 p-4 flex items-center gap-3.5 z-20">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F0] flex items-center justify-center text-[#B91C1C] flex-shrink-0">
              <Check className="w-5 h-5 stroke-[3px]" />
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-gray-900 leading-none">NIB Ready</div>
              <div className="text-[10px] text-[#666666] font-medium mt-1">Sesuai OSS RBA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE KBLI SEARCH CONTAINER ─── */}
      <section id="kbli-search-box" className="w-full max-w-[1040px] mx-auto px-4 z-10 scroll-mt-24 mb-20 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-[12px] font-black text-[#B91C1C] tracking-[0.2em] uppercase mb-4">
            Cari KBLI
          </p>
          <h2 className="text-[34px] sm:text-[40px] font-black text-[#111111] leading-tight">
            Ketik atau pilih <span className="text-[#B91C1C]">kategori usahamu.</span>
          </h2>
          <p className="text-[14.5px] text-[#666666] mt-3 font-semibold">
            Filter dari kode & deskripsi resmi — klik untuk lihat detail risiko & izin tambahan.
          </p>
        </div>

        {/* Large Premium Search Card */}
        <div className="w-full bg-white rounded-[32px] border border-gray-100 shadow-[0_15px_60px_rgba(0,0,0,0.03)] overflow-hidden">
          
          <div className="p-8 sm:p-10 space-y-6">
            
            {/* Search Input Box */}
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kode atau nama usaha (misal: restoran, 56101, kopi, salon)..."
                className="w-full bg-[#F7F6F3] border-none text-[#111111] font-semibold text-[14.5px] rounded-2xl pl-12 pr-5 py-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/15 transition-all shadow-inner"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            </div>

            {/* Category Filter Pills (Wrapping) */}
            <div className="flex flex-wrap gap-2 pt-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = getCategoryCount(cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[12.5px] font-extrabold transition-all duration-200 ${
                      isActive
                        ? "bg-[#8A0000] text-white shadow-md shadow-[#8A0000]/15"
                        : "bg-white border border-gray-150 hover:bg-gray-50 text-[#555555] hover:text-[#111111] shadow-sm"
                    }`}
                  >
                    {/* Category dot indicator */}
                    {cat.dotColor && !isActive && (
                      <span className={`w-2 h-2 rounded-full ${cat.dotColor}`} />
                    )}
                    {cat.label}
                    {/* Category Count badge */}
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ml-1 ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Menampilkan X dari Y KBLI Label */}
            <div className="text-[12.5px] text-[#666666] font-bold uppercase tracking-wider pt-2 border-t border-gray-100">
              Menampilkan <span className="text-[#111111] font-black">{filteredKBLI.length}</span> dari <span className="text-[#111111] font-black">{KBLI_DATABASE.length}</span> KBLI
            </div>

            {/* 2-Column Grid of KBLI Cards */}
            {filteredKBLI.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {filteredKBLI.map((item) => (
                  <div
                    key={item.code}
                    className="border border-gray-100 hover:border-[#B91C1C]/20 rounded-2xl p-6 bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Code & Risk */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-[14.5px] font-black text-[#B91C1C]">
                          KBLI {item.code}
                        </span>
                        
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wide ${
                          item.risk === "Risiko Rendah" || item.risk === "Rendah" ? "bg-[#E6F4EA] text-[#137333]"
                          : item.risk === "Menengah-Rendah" || item.risk === "Menengah Rendah" ? "bg-[#FEF3C7] text-[#D97706]"
                          : "bg-[#FFF0F0] text-[#B91C1C]"
                        }`}>
                          {item.risk}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-[16px] font-extrabold text-[#111111] mb-2 leading-tight">
                        {item.title}
                      </h4>
                      
                      {/* Desc */}
                      <p className="text-[13px] text-[#666666] leading-relaxed mb-6 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#666666]">
                        {/* Dot indicator */}
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          CATEGORIES.find(c => c.id === item.category)?.dotColor || "bg-gray-400"
                        }`} />
                        {item.category}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedKBLI(item)}
                        className="text-[12.5px] font-extrabold text-[#B91C1C] hover:text-[#881B1B] transition-colors"
                      >
                        Lihat Detail →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-[20px] border border-dashed border-gray-200">
                <p className="text-[14px] font-bold text-[#111111] mb-1">KBLI tidak ditemukan</p>
                <p className="text-[13px] text-[#666666] max-w-[340px] mx-auto leading-relaxed">
                  Tidak menemukan KBLI yang cocok? Tim kami siap membantu mencarikan secara manual.
                </p>
              </div>
            )}

          </div>

          {/* Bottom Card Action Block */}
          <div className="bg-[#FAF9F5] border-t border-gray-100 px-8 py-7 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left flex-1">
              <h4 className="text-[16px] font-black text-gray-900 mb-1">
                Belum ketemu KBLI yang sesuai?
              </h4>
              <p className="text-[13px] text-[#666666] leading-relaxed max-w-[580px] font-semibold">
                Database lengkap KBLI 2020 punya <b>1.790+ kode</b>. Konsultasikan jenis usahamu — tim kami bantu pilih KBLI yang paling tepat & minim risiko penolakan saat pengurusan NIB.
              </p>
            </div>
            
            <button
              onClick={handleWhatsAppConsult}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#1EA760] text-white font-extrabold text-[14.5px] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] w-full md:w-auto justify-center flex-shrink-0"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Tanya Tim KBLI
            </button>
          </div>

        </div>
      </section>

      {/* ─── TRUST BADGES ─── */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 z-10 mb-20 mt-6">
        <div className="bg-white rounded-full border border-gray-150/70 px-5 py-2.5 flex items-center gap-2 shadow-sm text-[13px] text-[#111111]">
          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5 stroke-[3px]" />
          </div>
          <span>
            <b>Database</b> resmi KBLI 2025
          </span>
        </div>

        <div className="bg-white rounded-full border border-gray-150/70 px-5 py-2.5 flex items-center gap-2 shadow-sm text-[13px] text-[#111111]">
          <div className="w-4 h-4 rounded-full bg-[#FFF0F0] text-[#B91C1C] flex items-center justify-center flex-shrink-0 text-[10px]">
            🕒
          </div>
          <span>
            Hasil <b>10 menit</b>
          </span>
        </div>

        <div className="bg-white rounded-full border border-gray-150/70 px-5 py-2.5 flex items-center gap-2 shadow-sm text-[13px] text-[#111111]">
          <div className="w-4 h-4 rounded-full bg-[#EBF5FF] text-blue-600 flex items-center justify-center flex-shrink-0 text-[10px]">
            🛡️
          </div>
          <span>
            Data Anda <b>aman</b>
          </span>
        </div>
      </div>

      {/* ─── CARA KERJA SECTION ─── */}
      <section className="w-full max-w-[1040px] mx-auto px-4 z-10 mt-10 mb-12">
        <div className="text-center mb-12">
          <p className="text-[12px] font-black text-[#B91C1C] tracking-[0.2em] uppercase mb-4">
            Cara Kerja
          </p>
          <h2 className="text-[34px] sm:text-[40px] font-black text-[#111111] leading-tight">
            3 langkah, <span className="text-[#B91C1C]">hasil 10 menit.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch relative">
          {[
            {
              num: "1",
              title: "Ketik Lini Bisnis",
              desc: "Ketik deskripsi aktivitas atau kata kunci industri Anda pada form pencari di atas.",
            },
            {
              num: "2",
              title: "Analisis Kode KBLI",
              desc: "Tim legal menganalisis model bisnis Anda secara mendalam untuk menentukan kecocokan kode.",
            },
            {
              num: "3",
              title: "Kirim via WhatsApp",
              desc: "Daftar kode KBLI resmi beserta tingkat risikonya dikirim ke WhatsApp Anda dalam 10 menit.",
            },
          ].map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center">
              <div className="w-full h-full bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-gray-100/60 p-8 sm:p-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#B91C1C] flex items-center justify-center text-white text-[17px] font-black shadow-[0_4px_16px_rgba(185,28,28,0.25)] mb-6">
                  {step.num}
                </div>
                
                <h3 className="text-[17px] font-bold text-[#111111] mb-3">
                  {step.title}
                </h3>
                
                <p className="text-[13.5px] text-[#666666] leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
              </div>

              {idx < 2 && (
                <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-[18px] lg:-right-[22px] z-20 items-center justify-center pointer-events-none">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 text-gray-300"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─── INTERACTIVE DETAIL MODAL ─── */}
      {selectedKBLI && (
        <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-[20px] sm:rounded-[28px] max-w-lg w-full p-5 sm:p-8 text-left space-y-5 sm:space-y-6 relative shadow-2xl animate-slide-down border border-gray-100">
            {/* Close Button */}
            <button
              onClick={() => setSelectedKBLI(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="bg-[#B91C1C] text-white font-black text-[13px] px-3 py-0.5 rounded-full shadow-sm">
                  KBLI {selectedKBLI.code}
                </span>
                <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {selectedKBLI.category}
                </span>
              </div>
              <h3 className="text-[20px] font-black text-[#111111] leading-tight pr-8">
                {selectedKBLI.title}
              </h3>
            </div>

            {/* KBLI Description */}
            <div className="space-y-2">
              <h4 className="text-[12.5px] font-black text-gray-900 uppercase tracking-wide">
                Deskripsi Klasifikasi Usaha:
              </h4>
              <p className="text-[13.5px] text-[#666666] leading-relaxed bg-[#F7F6F3] p-4 rounded-xl font-medium border border-gray-100">
                {selectedKBLI.desc}
              </p>
            </div>

            {/* Detailed Parameters */}
            {selectedKBLI.details && (
              <div className="space-y-4 pt-2">
                {/* Recommended Entity */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-[12.5px] font-black text-gray-900 uppercase tracking-wide">
                    Rekomendasi Badan:
                  </div>
                  <div className="col-span-2 text-[13.5px] text-[#111111] font-bold">
                    {selectedKBLI.details.entity}
                  </div>
                </div>

                {/* Permits Required */}
                <div className="space-y-2">
                  <div className="text-[12.5px] font-black text-gray-900 uppercase tracking-wide">
                    Syarat Izin & Legalitas:
                  </div>
                  <ul className="space-y-1.5 pl-4 list-disc">
                    {selectedKBLI.details.permits.map((p, idx) => (
                      <li key={idx} className="text-[13px] text-[#555555] font-semibold">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* WhatsApp Consultation Action */}
            <div className="pt-4 flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleConsultSpecificKBLI(selectedKBLI)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#1EA760] text-white font-extrabold text-[15px] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Konsultasikan KBLI {selectedKBLI.code} via WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
