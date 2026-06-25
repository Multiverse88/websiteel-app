import React from "react";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import type { Article } from "@prisma/client";
import { Clock, BookOpen, Home, Search, X, ChevronDown } from "lucide-react";

export const revalidate = 60;

// Mock Data for Auto-Seeding
const seedArticles = [
  {
    slug: "cara-mendirikan-pt-indonesia-2026",
    title: "Panduan Lengkap Cara Mendirikan PT di Indonesia",
    excerpt: "Ingin mendirikan PT untuk bisnis Anda? Pelajari syarat, prosedur terbaru, biaya, serta tips menghindari kesalahan fatal agar usaha Anda segera beroperasi secara legal.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fit=crop&w=800&h=500&q=80",
    category: "Legalitas PT",
    readTime: "5 menit baca",
    content: `### Mengapa Mendirikan PT Adalah Langkah Terbaik untuk Bisnis Anda?

Mendirikan Perseroan Terbatas (PT) merupakan lompatan besar bagi setiap pelaku usaha di Indonesia. Dibandingkan dengan bentuk usaha lainnya seperti CV atau Perorangan, PT menawarkan **pemisahan harta pribadi** dan tanggung jawab hukum yang jelas. Hal ini berarti, jika bisnis mengalami masalah keuangan, aset pribadi Anda tetap aman terlindungi secara hukum.

Selain perlindungan hukum, memiliki PT meningkatkan kredibilitas bisnis Anda secara signifikan di mata klien, perbankan, dan calon investor. Anda akan lebih mudah mengikuti tender proyek besar, mengajukan pinjaman modal kerja, serta menjalin kemitraan strategis dengan perusahaan multinasional.

---

### Prosedur Terbaru Pendirian PT

Sejak berlakunya Undang-Undang Cipta Kerja dan sistem **OSS RBA (Online Single Submission Risk-Based Approach)**, proses pendirian PT kini jauh lebih mudah dan cepat. Berikut adalah langkah-langkah utamanya:

1. **Pemesanan Nama PT**: Nama PT harus terdiri dari minimal 3 kata dalam bahasa Indonesia (kecuali untuk PT Penanaman Modal Asing) dan tidak boleh menyerupai nama instansi pemerintah atau nama PT lain yang sudah terdaftar.
2. **Pembuatan Akta Pendirian di Notaris**: Notaris akan menyusun draf anggaran dasar PT Anda yang berisi tentang modal disetor, kepemilikan saham, dan susunan direksi serta komisaris.
3. **Pengesahan SK Kemenkumham**: Notaris akan mengajukan pengesahan badan hukum ke Kementerian Hukum dan Hak Asasi Manusia (Kemenkumham). Begitu disetujui, PT Anda resmi menjadi badan hukum yang sah.
4. **Pengurusan NPWP Perusahaan**: NPWP Perusahaan kini biasanya diterbitkan otomatis bersamaan dengan pengesahan badan hukum atau dapat diurus online melalui situs pajak.go.id.
5. **Penerbitan Nomor Induk Berusaha (NIB) via OSS**: NIB berfungsi sebagai identitas utama pelaku usaha, Tanda Daftar Perusahaan (TDP), Angka Pengenal Importir (API), sekaligus hak akses kepabeanan.

---

### Tips Memilih Kategori KBLI yang Tepat

Salah satu kesalahan paling fatal bagi pengusaha baru adalah salah memilih kode **KBLI (Klasifikasi Baku Lapangan Usaha Indonesia)** pada saat pengisian data di OSS.
- Pastikan kode KBLI yang Anda pilih sesuai dengan aktivitas bisnis riil yang akan dijalankan.
- Perhatikan apakah bidang usaha tersebut berkategori risiko rendah, menengah, atau tinggi, karena kategori risiko menentukan jenis izin operasional lanjutan yang harus dipenuhi.
- Sebaiknya konsultasikan dengan konsultan hukum berpengalaman sebelum melakukan input data untuk menghindari pengurusan revisi akta yang memakan waktu dan biaya tambahan.

---

### Hubungi EasyLegal untuk Pengurusan Tanpa Ribet

Mengurus legalitas memang memerlukan ketelitian ekstra. Jika Anda ingin fokus pada pengembangan produk dan pemasaran tanpa harus pusing memikirkan dokumen hukum, tim **EasyLegal** siap membantu Anda.

Kami menawarkan paket pendirian PT lengkap, transparan, dan bergaransi sesuai SLA (7-14 hari kerja). Klik tombol di bawah ini untuk berkonsultasi secara gratis dengan tim legal spesialis kami hari ini!`
  },
  {
    slug: "pentingnya-daftar-merek-haki-umkm",
    title: "Mengapa Pendaftaran Merek HAKI Sangat Penting bagi UMKM?",
    excerpt: "Jangan biarkan nama brand yang Anda besarkan dengan susah payah ditiru orang lain. Ketahui pentingnya pendaftaran HAKI beserta panduan langkah demi langkahnya.",
    coverImage: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?fit=crop&w=800&h=500&q=80",
    category: "Merek & HAKI",
    readTime: "4 menit baca",
    content: `### Aset Terpenting Bisnis Anda Adalah Merek Anda

Banyak pengusaha UMKM yang fokus pada penjualan, inovasi produk, dan promosi digital, namun lupa mengamankan aset non-fisik terbesarnya: **Merek Dagang**. Bayangkan jika setelah bertahun-tahun Anda membangun reputasi bisnis, memiliki ribuan followers di media sosial, tiba-tiba ada pihak lain yang mendaftarkan merek tersebut ke DJKI (Direktorat Jenderal Kekayaan Intelektual) dan melayangkan somasi agar Anda mengganti nama brand Anda.

Kasus perebutan merek seperti ini sangat sering terjadi di Indonesia. Berdasarkan hukum merek Indonesia yang menganut sistem **"First to File"**, siapa saja yang mendaftarkan merek tersebut pertama kali secara sah ke negara, dialah yang berhak memegang hak eksklusif atas merek tersebut. Tidak peduli seberapa lama Anda sudah menggunakan merek tersebut di pasaran.

---

### Manfaat Utama Mendaftarkan Merek HAKI

Mendaftarkan merek bukan sekadar bentuk kepatuhan hukum, melainkan langkah perlindungan investasi bisnis jangka panjang:

* **Hak Eksklusif & Perlindungan Hukum**: Anda memiliki hak tunggal untuk menggunakan merek tersebut di wilayah Republik Indonesia untuk jangka waktu 10 tahun (dan dapat diperpanjang).
* **Mencegah Plagiarisme**: Anda berhak melarang orang lain menggunakan nama merek yang sama atau mirip (ada persamaan pada pokoknya) untuk kelas barang atau jasa sejenis.
* **Aset Finansial Bernilai Tinggi**: Merek yang terdaftar dapat dinilai secara ekonomi, dapat dilisensikan (waralaba/franchise), dialihkan, bahkan dapat dijadikan jaminan fidusia.
* **Meningkatkan Nilai Jual Brand**: Konsumen merasa lebih aman dan percaya membeli produk dari brand yang sudah resmi terdaftar dengan logo ® atau ™.

---

### Tahapan Pendaftaran Merek di DJKI

Proses pendaftaran merek kini dilakukan 100% secara online melalui portal resmi DJKI Kemenkumham:

1. **Penelusuran Merek (Analisis Awal)**: Melakukan pengecekan database merek yang terdaftar di DJKI untuk memastikan tidak ada nama atau logo yang memiliki kemiripan dengan merek Anda. Langkah ini sangat krusial untuk menekan risiko penolakan.
2. **Penentuan Kelas Barang/Jasa**: Menentukan kategori kelas berdasarkan sistem klasifikasi Nice. Pemilihan kelas ini menentukan cakupan perlindungan hukum merek Anda.
3. **Pengisian Permohonan & Pembayaran**: Mengisi formulir elektronik, mengunggah label merek (logo), tanda tangan pemohon, serta membayar PNBP (Penerimaan Negara Bukan Pajak).
4. **Pemeriksaan Formalitas & Publikasi**: DJKI melakukan pengecekan kelengkapan berkas, dilanjutkan masa publikasi selama 2 bulan untuk melihat apakah ada oposisi/keberatan dari pihak ketiga.
5. **Pemeriksaan Substantif**: Pemeriksa merek DJKI akan menilai kelayakan merek Anda berdasarkan UU No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis.
6. **Penerbitan Sertifikat Merek**: Jika lolos pemeriksaan substantif, sertifikat merek resmi akan diterbitkan.

---

### Amankan Merek Anda Sekarang Bersama EasyLegal

Jangan tunda perlindungan brand Anda hingga kompetitor mendahuluinya. Proses pendaftaran merek membutuhkan ketelitian tinggi saat melakukan penelusuran kemiripan dan pemilihan kelas barang/jasa.

Tim konsultan HAKI terdaftar di **EasyLegal** siap melakukan penelusuran mendalam, menyusun dokumen permohonan, hingga mengawal proses pendaftaran merek Anda di DJKI sampai terbit sertifikat resmi. Hubungi kami sekarang untuk konsultasi awal gratis!`
  },
  {
    slug: "cara-mendapatkan-sertifikasi-iso-9001",
    title: "Cara Mendapatkan Sertifikasi ISO 9001 untuk Bisnis Anda",
    excerpt: "Sertifikasi ISO 9001 bukan sekadar stempel. Ia adalah bukti bahwa manajemen mutu bisnis Anda memenuhi standar internasional. Simak panduan lengkap pengurusannya.",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=800&h=500&q=80",
    category: "Sertifikasi ISO",
    readTime: "6 menit baca",
    content: `### Apa Itu Sertifikasi ISO 9001?

**ISO 9001** adalah standar internasional untuk **Sistem Manajemen Mutu (SMM)**. Standar ini membantu organisasi dan perusahaan di seluruh dunia untuk memastikan bahwa mereka secara konsisten menyediakan produk dan layanan yang memenuhi kebutuhan pelanggan serta mematuhi persyaratan hukum dan peraturan yang berlaku.

Menerapkan ISO 9001 berarti perusahaan Anda berkomitmen pada siklus **PDCA (Plan-Do-Check-Act)** untuk perbaikan berkelanjutan (continuous improvement). Ini adalah sinyal kuat kepada dunia luar bahwa bisnis Anda dikelola secara profesional, efisien, dan berorientasi pada kepuasan pelanggan.

---

### Mengapa Bisnis Anda Membutuhkan ISO 9001?

Sertifikasi ISO 9001 memberikan banyak keuntungan kompetitif, terutama bagi bisnis B2B dan industri jasa konstruksi, manufaktur, serta teknologi:

* **Syarat Wajib Tender**: Sebagian besar tender pemerintah, BUMN, maupun proyek swasta skala besar mewajibkan peserta tender memiliki sertifikasi ISO 9001 yang aktif.
* **Meningkatkan Efisiensi Operasional**: Penerapan SOP (Standard Operating Procedure) yang ketat mengurangi tingkat kesalahan kerja, meminimalkan pemborosan sumber daya, dan memangkas biaya operasional.
* **Kepercayaan Klien Internasional**: Memiliki sertifikasi ISO mempermudah produk atau layanan Anda untuk diterima di pasar ekspor global karena standar kualitasnya sudah diakui secara internasional.
* **Peningkatan Kepuasan Pelanggan**: Dengan proses kerja yang konsisten, kualitas produk atau layanan Anda akan selalu terjaga pada tingkat terbaik, yang berdampak langsung pada kepuasan dan loyalitas pelanggan.

---

### 5 Langkah Mendapatkan Sertifikasi ISO 9001

Proses sertifikasi ISO membutuhkan komitmen dari manajemen puncak dan seluruh jajaran karyawan. Berikut alur umum pengurusannya:

1. **Gap Analysis (Analisis Kesenjangan)**: Meninjau sistem manajemen yang saat ini berjalan di perusahaan Anda dan membandingkannya dengan persyaratan standar ISO 9001:2015.
2. **Perancangan SOP & Dokumentasi**: Membuat atau merevisi dokumen wajib seperti manual mutu, kebijakan mutu, sasaran mutu, serta berbagai prosedur kerja tertulis (SOP) untuk setiap departemen.
3. **Implementasi & Pelatihan**: Menerapkan SOP yang baru dirancang ke dalam aktivitas kerja sehari-hari serta memberikan pelatihan pemahaman standar ISO 9001 kepada seluruh tim.
4. **Audit Internal & Rapat Tinjauan Manajemen**: Melakukan evaluasi internal secara independen untuk memastikan sistem berjalan dengan baik dan mengadakan rapat koordinasi manajemen untuk merumuskan langkah koreksi.
5. **Audit Eksternal oleh Badan Sertifikasi (Sertifikasi)**: Auditor independen dari Badan Sertifikasi resmi akan melakukan audit dalam dua tahap (Audit Dokumen & Audit Lapangan). Jika dinyatakan lulus, sertifikasi ISO 9001 resmi akan diterbitkan dengan masa berlaku 3 tahun.

---

### Konsultasi Pengurusan ISO 9001 yang Cepat dan Terpercaya

Membuat SOP, melakukan audit internal, dan mempersiapkan audit eksternal bisa menjadi tantangan yang sangat menyita waktu bagi perusahaan Anda.

**EasyLegal** hadir sebagai mitra andalan Anda untuk menyederhanakan proses sertifikasi ISO 9001. Mulai dari penyusunan dokumen, bimbingan implementasi, pendampingan audit, hingga penerbitan sertifikat ISO resmi dari badan sertifikasi terakreditasi internasional — semua kami urus sampai tuntas. Hubungi konsultan ISO kami hari ini!`
  }
];

// Predefined category mappings: Database category -> Display Category
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

// Display Category -> DB Categories list
const DB_CATEGORIES_MAP: Record<string, string[]> = {
  "Pendirian Usaha": ["Pendirian PT", "Legalitas PT", "CV", "PT Perorangan", "PT PMA", "Firma", "Perkumpulan", "Yayasan", "Koperasi", "UMKM"],
  "Haki": ["Merek & HAKI"],
  "ISO": ["Sertifikasi ISO"],
  "Perizinan": ["Perizinan", "KBLI"],
  "Pajak": ["Pajak"],
  "Branding": ["Branding"],
};

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; limit?: string }>;
}

export default async function ArtikelPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q || "";
  const activeCategory = resolvedSearchParams.category || "All";
  const limit = resolvedSearchParams.limit ? parseInt(resolvedSearchParams.limit, 10) : 7;

  // Fetch all articles to dynamically build category counts
  const allArticlesForCounting = await prisma.article.findMany({
    select: { category: true },
  });

  // Standard categories to display in order
  const displayCategories = ["All", "Pendirian Usaha", "Pajak", "Haki", "ISO", "Perizinan", "Branding"];

  // Initialize counts
  const counts: Record<string, number> = {
    All: allArticlesForCounting.length,
  };
  displayCategories.slice(1).forEach((cat) => {
    counts[cat] = 0;
  });

  // Count them dynamically
  allArticlesForCounting.forEach((art) => {
    const dbCat = art.category;
    const displayCat = CATEGORY_MAP[dbCat] || dbCat;
    if (counts[displayCat] !== undefined) {
      counts[displayCat]++;
    } else {
      counts[displayCat] = 1;
    }
  });

  // Ensure any other dynamic categories from DB are included
  const finalCategories = [...displayCategories];
  Object.keys(counts).forEach((cat) => {
    if (!finalCategories.includes(cat)) {
      finalCategories.push(cat);
    }
  });

  // Build Prisma query filter for active view
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereClause: Record<string, any> = {};

  if (q) {
    whereClause.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { excerpt: { contains: q, mode: "insensitive" } },
      { category: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } },
    ];
  }

  if (activeCategory !== "All") {
    const dbCategories = DB_CATEGORIES_MAP[activeCategory];
    if (dbCategories) {
      whereClause.category = { in: dbCategories };
    } else {
      whereClause.category = { equals: activeCategory, mode: "insensitive" };
    }
  }

  // Get total matching count before applying limit
  const totalMatchingCount = await prisma.article.count({
    where: whereClause,
  });

  // Fetch articles up to current limit
  const articles = await prisma.article.findMany({
    where: whereClause,
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  // Split featured and regular articles
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const regularArticles = articles.length > 1 ? articles.slice(1) : [];

  // Helper for tab category link URLs (resets limit to default 6)
  const getCategoryHref = (cat: string) => {
    const params = new URLSearchParams();
    if (cat !== "All") {
      params.set("category", cat);
    }
    if (q) {
      params.set("q", q);
    }
    const searchStr = params.toString();
    return searchStr ? `/artikel?${searchStr}` : "/artikel";
  };

  // Helper for Load More button URL (increases limit by 7)
  const getLoadMoreHref = () => {
    const params = new URLSearchParams();
    if (activeCategory !== "All") {
      params.set("category", activeCategory);
    }
    if (q) {
      params.set("q", q);
    }
    params.set("limit", (limit + 7).toString());
    const searchStr = params.toString();
    return `/artikel?${searchStr}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] blog-page-container">
      
      {/* ─── HERO & HEADER ─── */}
      <section className="bg-white pt-8 lg:pt-12 pb-16 relative overflow-hidden">
        {/* Top-right radial glow for premium aesthetic */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[130px] pointer-events-none" />
        {/* Bottom-left radial glow for premium aesthetic */}
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-[13px] font-medium text-gray-500 mb-8">
            <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span className="text-gray-300 font-normal">&gt;</span>
            <span className="text-[13px] font-bold text-gray-900">Artikel &amp; Edukasi</span>
          </nav>

          {/* Pill Badge / Section Indicator */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#990202]">
              BLOG &amp; ARTIKEL
            </span>
          </div>

          <div className="max-w-3xl">
            <h1 className="font-inter text-[38px] sm:text-[50px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
              Insight legalitas untuk <span className="text-[#990202]">bisnis</span>
              <br />
              <span className="text-[#990202]">Anda</span>.
            </h1>
            <p className="text-[15px] sm:text-[16px] text-gray-500 leading-relaxed mt-5 max-w-2xl font-normal">
              Panduan praktis seputar pendirian usaha, pajak, HAKI, ISO, perizinan &amp; branding — ditulis tim legal EasyLegal, update tiap minggu.
            </p>
          </div>

          {/* Search Container */}
          <div className="mt-8 max-w-xl">
            <form action="/artikel" method="GET" className="relative flex items-center bg-white border border-gray-200/85 rounded-2xl p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.015)] focus-within:border-red-200 focus-within:shadow-[0_12px_30px_rgba(153,2,2,0.04)] transition-all">
              <div className="flex items-center pl-3.5 pr-1 text-gray-400 pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Cari artikel... (mis. NIB, PKP, merek)"
                className="w-full pl-2 pr-4 py-3 bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-[14px] sm:text-[15px]"
              />
              <button
                type="submit"
                className="bg-[#990202] hover:bg-[#800000] text-white px-6 py-2.5 rounded-xl font-bold text-[14.5px] transition-colors shadow-sm whitespace-nowrap mr-0.5 cursor-pointer"
              >
                Cari
              </button>
            </form>

            {/* Search feedback & reset button */}
            {q && (
              <div className="mt-4 flex items-center space-x-2 text-[13.5px] text-gray-500">
                <span>Hasil pencarian untuk: <strong>&quot;{q}&quot;</strong></span>
                <span className="text-gray-300">•</span>
                <Link href="/artikel" className="text-[#990202] hover:underline font-semibold flex items-center gap-0.5">
                  <X className="w-3.5 h-3.5 inline" />
                  Hapus
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── ARTICLE LIST SECTION ─── */}
      <section className="py-16 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-dashed border-gray-200">
            {finalCategories.map((cat) => {
              const count = counts[cat] || 0;
              if (count === 0 && !displayCategories.includes(cat)) return null;

              const isActive = activeCategory === cat;
              return (
                <Link
                  key={cat}
                  href={getCategoryHref(cat)}
                  className={`px-4.5 py-2 rounded-full text-[13px] font-extrabold transition-all duration-200 ${
                    isActive
                      ? "bg-[#990202] text-white shadow-sm"
                      : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {cat}{" "}
                  <span className={`text-[11px] font-medium ml-0.5 ${isActive ? "text-red-200" : "text-gray-400"}`}>
                    ({count})
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Featured Article Layout */}
          {featuredArticle && (
            <div className="mb-12">
              <div className="group bg-white border border-gray-150 rounded-3xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  
                  {/* Image Column */}
                  <div className="relative aspect-[1.6] w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                    <Image
                      src={featuredArticle.coverImage}
                      alt={featuredArticle.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-[10.5px] font-extrabold uppercase tracking-wider bg-white text-[#990202] shadow-sm border border-red-50">
                        <span className="text-red-600 font-bold">★</span> <span>ARTIKEL PILIHAN</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="flex flex-col justify-between py-2">
                    <div>
                      <span className="text-[#990202] text-[11.5px] font-black tracking-widest uppercase block mb-3">
                        {CATEGORY_MAP[featuredArticle.category] || featuredArticle.category}
                      </span>
                      <h2 className="font-inter text-[24px] sm:text-[30px] font-extrabold text-gray-950 leading-tight group-hover:text-[#990202] transition-colors duration-200">
                        <Link href={`/artikel/${featuredArticle.slug}`}>
                          {featuredArticle.title}
                        </Link>
                      </h2>
                      <p className="text-[14.5px] sm:text-[15px] text-gray-500 leading-relaxed mt-4 line-clamp-4">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-[12.5px] font-medium text-gray-400 mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-[#990202]">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-gray-600">{featuredArticle.readTime}</span>
                      <span className="text-gray-300">•</span>
                      <span>
                        {new Date(featuredArticle.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular Articles Grid */}
          {regularArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article: Article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl border border-gray-200/80 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Image container inside card padding */}
                  <div className="relative aspect-[1.6] w-full overflow-hidden bg-gray-50 border border-gray-100 rounded-2xl mb-4">
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="px-2 pb-2 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[#990202] text-[11px] font-black tracking-widest uppercase block mb-2">
                        {CATEGORY_MAP[article.category] || article.category}
                      </span>
                      <h3 className="font-inter text-[17px] sm:text-[18px] font-extrabold text-gray-950 group-hover:text-[#990202] transition-colors leading-snug mb-2 line-clamp-2">
                        <Link href={`/artikel/${article.slug}`} className="focus:outline-none">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-[13.5px] text-gray-500 leading-relaxed font-normal line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-[12.5px] font-medium text-gray-400 pt-4 border-t border-gray-100 mt-2">
                      <div className="flex items-center text-[#990202]">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-gray-600">{article.readTime}</span>
                      <span className="text-gray-300">•</span>
                      <span>
                        {new Date(article.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Load More Button & Count Indicator */}
          {articles.length > 0 && (
            <div className="flex flex-col items-center justify-center mt-16 space-y-4">
              {articles.length < totalMatchingCount && (
                <Link
                  href={getLoadMoreHref()}
                  scroll={false}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white border border-gray-200/90 hover:border-gray-300 hover:bg-gray-50 text-gray-800 rounded-full font-bold text-[13.5px] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] cursor-pointer"
                >
                  <span>Muat Lebih Banyak</span>
                  <ChevronDown className="w-4.5 h-4.5 text-gray-500" />
                </Link>
              )}
              <p className="text-[12.5px] text-gray-400 font-bold tracking-wide">
                Menampilkan {articles.length} dari {totalMatchingCount} artikel
              </p>
            </div>
          )}

          {/* Empty State fallback */}
          {articles.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-xl mx-auto">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-[18px] font-extrabold text-gray-900 mb-2">Belum ada artikel</h3>
              <p className="text-[14px] text-gray-500 px-6">
                Kami sedang menyiapkan konten-konten edukasi berkualitas untuk Anda. Kunjungi beberapa saat lagi!
              </p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
