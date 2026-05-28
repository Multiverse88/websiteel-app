import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Calendar, Clock, ArrowRight, BookOpen, Home } from "lucide-react";

export const dynamic = "force-dynamic";

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

export default async function ArtikelPage() {
  // Check if database has articles
  let articlesCount = await prisma.article.count();
  
  if (articlesCount === 0) {
    // Perform auto-seeding
    console.log("Seeding database with default articles...");
    await prisma.article.createMany({
      data: seedArticles
    });
    articlesCount = seedArticles.length;
  }

  // Fetch all articles
  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      
      {/* ─── HERO & HEADER ─── */}
      <section className="bg-white pt-8 lg:pt-12 pb-16 border-b border-gray-100 relative overflow-hidden">
        {/* Top-right radial glow for premium aesthetic */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-[13px] font-medium text-gray-500 mb-6">
            <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span className="text-gray-300 font-normal">&gt;</span>
            <span className="text-[13px] font-bold text-gray-900">Artikel & Edukasi</span>
          </nav>

          {/* Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-3.5 rounded-full border border-red-100 shadow-sm mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
            <span className="text-[12.5px] font-bold text-[#990202] tracking-wide">Edukasi Bisnis</span>
          </div>

          <div className="max-w-2xl">
              <h1 className="font-inter text-[44px] sm:text-[52px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                Artikel & Panduan{" "}
                <span className="relative inline-block text-[#990202] px-2 py-0.5 bg-red-500/5 rounded-lg border border-red-100/40">
                  Legalitas Bisnis
                </span>
              </h1>
              <p className="text-[16px] sm:text-[17.5px] text-gray-500 leading-relaxed mt-4 max-w-2xl font-normal">
                Temukan informasi terpercaya, kupas tuntas regulasi terbaru, dan panduan praktis untuk mendirikan serta melindungi bisnis Anda di Indonesia.
              </p>
          </div>
        </div>
      </section>

      {/* ─── ARTICLE GRID SECTION ─── */}
      <section className="py-20 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
                {/* Cover Image */}
                <div className="relative aspect-[1.6] w-full overflow-hidden bg-gray-100 border-b border-gray-100">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill Over Image */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex px-3 py-1.5 rounded-lg text-[10.5px] font-black uppercase tracking-wider bg-white text-[#990202] shadow-sm border border-red-50">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Meta info */}
                    <div className="flex items-center space-x-4 text-[12.5px] font-bold text-gray-400">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#990202]" />
                        <span>
                          {new Date(article.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#990202]" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-inter text-[18px] sm:text-[20px] font-extrabold text-gray-950 group-hover:text-[#990202] transition-colors leading-snug">
                      <Link href={`/artikel/${article.slug}`} className="focus:outline-none">
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[13.5px] text-gray-500 leading-relaxed font-normal line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Read More Footer */}
                  <div className="flex items-center text-[13.5px] font-extrabold text-[#990202] group-hover:text-[#800000] mt-6 pt-4 border-t border-gray-100 transition-colors">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>

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
