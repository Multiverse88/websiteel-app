"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  DollarSign,
  Upload,
  ShieldCheck,
  Check,
  X,
  Home,
  ArrowRight,
  Shield,
  FileText,
  Bookmark,
  Award,
  BookOpen,
  Tag,
} from "lucide-react";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";

export default function MerekHaki() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const steps = [
    {
      no: "01",
      title: "Penelusuran & Analisis Merek",
      duration: "1 Hari Kerja",
      desc: "Tim legal kami melakukan penelusuran mendalam pada database DJKI untuk menganalisis risiko kemiripan fonetik maupun visual guna meminimalkan risiko penolakan.",
      points: [
        "Pengecekan nama & logo di database DJKI",
        "Analisis potensi penolakan substantif",
        "Rekomendasi modifikasi jika nama terlalu mirip",
      ],
    },
    {
      no: "02",
      title: "Klasifikasi Kelas Barang/Jasa",
      duration: "1 Hari Kerja",
      desc: "Menentukan klasifikasi kelas merek yang tepat (Kelas 1–45) sesuai dengan jenis industri, produk, atau jasa yang Anda jalankan agar proteksinya maksimal.",
      points: [
        "Identifikasi KBLI & lini bisnis utama",
        "Pemilihan nomor kelas merek yang sesuai",
        "Penyusunan uraian barang/jasa yang optimal",
      ],
    },
    {
      no: "03",
      title: "Validasi Dokumen Pendukung",
      duration: "1 Hari Kerja",
      desc: "Pengumpulan dokumen wajib seperti KTP, NPWP, spesimen logo, tanda tangan, serta Surat Rekomendasi UMKM jika mendaftar jalur subsidi.",
      points: [
        "KTP & NPWP Pemilik Merek (Individu/Badan)",
        "Spesimen logo berkualitas tinggi (JPEG/PNG)",
        "Pengurusan Surat Rekomendasi UMKM (jika ada)",
      ],
    },
    {
      no: "04",
      title: "Pemesanan Billing PNBP Resmi",
      duration: "1 Hari Kerja",
      desc: "Kami memesankan kode billing resmi Kementerian Hukum & HAM dan melunasi biaya Penerimaan Negara Bukan Pajak (PNBP) sesuai jalur pendaftaran Anda.",
      points: [
        "Pembuatan kode billing SIMPADA DJKI",
        "Pembayaran PNBP Resmi (Subsidi UMKM / Umum)",
        "Penerbitan bukti bayar resmi negara",
      ],
    },
    {
      no: "05",
      title: "Pengajuan Permohonan Online",
      duration: "1 Hari Kerja",
      desc: "Proses submit pendaftaran merek secara online ke portal resmi DJKI. Hari itu juga Anda akan mendapatkan Nomor Agenda Resmi.",
      points: [
        "Pengisian formulir elektronik resmi DJKI",
        "Upload seluruh kelengkapan dokumen & bukti bayar",
        "Penerbitan tanda terima resmi pendaftaran",
      ],
    },
    {
      no: "06",
      title: "Masa Pengumuman / Publikasi",
      duration: "2 Bulan",
      desc: "Permohonan merek dipublikasikan secara terbuka di Berita Resmi Merek DJKI selama 2 bulan untuk melihat apakah ada keberatan atau sanggahan dari pihak lain.",
      points: [
        "Publikasi berkas di Berita Resmi Merek",
        "Monitoring jika ada sanggahan oposisi pihak ketiga",
        "Penyusunan tanggapan oposisi jika diperlukan",
      ],
    },
    {
      no: "07",
      title: "Pemeriksaan Substantif & Sertifikat",
      duration: "150 Hari Kerja",
      desc: "Pemeriksa merek DJKI menguji kelayakan merek Anda secara hukum. Jika disetujui, sertifikat merek resmi 10 tahun akan diterbitkan secara elektronik.",
      points: [
        "Pemeriksaan kelayakan oleh Pemeriksa Merek DJKI",
        "Penanganan usulan penolakan jika terjadi isu substantif",
        "Penerbitan Sertifikat Merek Elektronik resmi",
      ],
    },
  ];

  const faqs = [
    {
      q: "Apa perbedaan pendaftaran Merek UMKM dan Umum?",
      a: "Jalur UMKM ditujukan untuk pelaku usaha mikro & kecil dengan biaya resmi PNBP negara yang disubsidi oleh pemerintah (hanya Rp500.000 per kelas) namun mewajibkan adanya Surat Keterangan/Rekomendasi UMKM resmi. Jalur Umum ditujukan untuk korporasi, badan usaha non-UMKM, atau perorangan non-subsidi dengan biaya PNBP negara Rp1.800.000 per kelas, tanpa memerlukan surat keterangan tambahan.",
    },
    {
      q: "Berapa lama masa berlakunya perlindungan merek terdaftar?",
      a: "Perlindungan hukum atas merek yang terdaftar berlaku selama 10 tahun terhitung sejak Tanggal Penerimaan (saat nomor agenda resmi keluar). Merek tersebut dapat terus diperpanjang setiap 10 tahun sekali tanpa batas.",
    },
    {
      q: "Apakah pendaftaran merek di Indonesia berlaku di seluruh dunia?",
      a: "Tidak. Hukum perlindungan merek menganut asas teritorial (Territoriality Principle). Artinya, merek Anda hanya akan terlindungi di wilayah hukum Republik Indonesia. Jika produk Anda diekspor, Anda wajib mendaftarkannya di negara tujuan ekspor tersebut atau menggunakan skema pendaftaran global Protokol Madrid.",
    },
    {
      q: "Apa yang terjadi jika pengajuan merek ditolak oleh DJKI?",
      a: "Jika pemeriksa DJKI menilai merek Anda memiliki persamaan pada pokoknya dengan merek yang terdaftar lebih dulu, mereka akan menerbitkan Surat Usulan Penolakan Substantif. Anda diberikan waktu 30 hari untuk mengajukan Tanggapan Tertulis (Bantahan Hukum). Layanan Proteksi Premium EasyLegal sudah termasuk pendampingan penyusunan bantahan hukum ringan ini secara gratis.",
    },
    {
      q: "Apakah satu pendaftaran merek bisa untuk beberapa kelas sekaligus?",
      a: "Ya, pendaftaran multi-kelas (multi-class) dimungkinkan dalam satu nomor permohonan. Namun, tarif biaya PNBP dari pemerintah tetap dihitung per kelas yang dipilih secara akumulatif. Sebagai contoh, jika Anda mendaftarkan merek di kelas pakaian (Kelas 25) dan kelas kosmetik (Kelas 3), biaya PNBP akan dikalikan dua.",
    },
    {
      q: "Apa saja berkas yang harus disiapkan untuk mulai mendaftar?",
      a: "Persyaratan sangat simpel: KTP pemilik merek, NPWP pemilik merek, file gambar logo merek (bisa berupa logo dengan teks atau logo saja dalam format JPEG/PNG kualitas bagus), tanda tangan di atas kertas putih (difoto), serta Surat Pernyataan Kepemilikan Merek yang drafnya akan kami siapkan secara otomatis.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white pt-8 lg:pt-12 pb-16 lg:pb-24 border-b border-gray-200/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[13px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[13px] font-bold text-gray-900">Merek & HAKI</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-3.5 rounded-full border border-red-100 shadow-sm animate-pulse-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[12.5px] font-bold text-[#990202] tracking-wide">Merek & HAKI</span>
              </div>

              {/* Headline */}
              <h1 className="font-inter text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                Daftar merek sekali, <br />
                brand <span className="text-[#990202]">aman 10 tahun</span>.
              </h1>

              {/* Description */}
              <p className="text-[15.5px] sm:text-[16.5px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                Lindungi nama, logo, dan identitas bisnis Anda dari penjiplakan. Kami pandu pemilihan kelas yang tepat & kelola seluruh proses pendaftaran resmi di DJKI.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Link
                  href="/cek-nama"
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] text-white font-bold text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <span>Cek Nama Merek</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center px-7 py-4 border border-gray-200 text-gray-800 font-bold text-[15px] rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Lihat Paket Harga
                </a>
              </div>

              {/* Bottom Features Row */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-[580px]">
                {/* Feature 1 */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <Shield className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">10 tahun</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">Perlindungan</div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <BookOpen className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">45 kelas</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">Nice Classification</div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <span className="text-[18px] font-extrabold text-[#990202]">$</span>
                  </div>
                  <div>
                    <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">Mulai Rp2,79jt</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">harga transparan</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">
                
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white group aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <img
                    src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?fit=crop&w=800&h=800&q=80"
                    alt="Pendaftaran Merek & HAKI EasyLegal"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge 1: Merek Terdaftar (Top Left) */}
                <div className="absolute -top-6 -left-2 sm:-left-6 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-150/50 flex items-center space-x-3.5 w-[230px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Tag className="w-5.5 h-5.5 stroke-[2.2] text-[#D97706]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-black text-gray-900 leading-none">Merek Terdaftar</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5">No. IDM000xxxxx · DJKI</div>
                  </div>
                </div>

                {/* Floating Badge 2: Hak Eksklusif (Bottom Right) */}
                <div className="absolute -bottom-6 -right-2 sm:-right-4 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-150/50 flex items-center space-x-3.5 w-[215px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <ShieldCheck className="w-5.5 h-5.5 text-[#990202]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-black text-gray-900 leading-none">Hak Eksklusif</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5">Aktif sampai 2036</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. PENGERTIAN MEREK ─── */}
      <section className="bg-white py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-14">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-wider mb-2">Mengapa Merek Sangat Penting?</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Apakah brand Anda sudah benar-benar aman?
            </h2>
            <p className="text-[14.5px] text-gray-500 mt-3 font-normal max-w-2xl">
              Aset non-fisik terpenting bisnis Anda adalah reputasi brand. Daftarkan lebih awal sebelum diserobot kompetitor.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="bg-gray-50/60 border border-gray-150/40 rounded-3xl p-6.5 hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 bg-red-50 text-[#990202] rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] font-extrabold text-gray-900 leading-tight">Hak Monopoli & Perlindungan</h3>
              <p className="text-[13.5px] text-gray-500 font-medium leading-relaxed">
                Hanya Anda yang berhak secara hukum menggunakan nama atau logo brand tersebut di seluruh wilayah hukum Indonesia. Pihak lain dilarang meniru tanpa izin Anda.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-gray-50/60 border border-gray-150/40 rounded-3xl p-6.5 hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 bg-red-50 text-[#990202] rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] font-extrabold text-gray-900 leading-tight">Menghindari Somasi & Kerugian</h3>
              <p className="text-[13.5px] text-gray-500 font-medium leading-relaxed">
                Mencegah diserobot oleh pihak ketiga yang sengaja mendaftarkan nama brand Anda terlebih dahulu lalu melayangkan somasi serta tuntutan ganti rugi miliaran rupiah.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-gray-50/60 border border-gray-150/40 rounded-3xl p-6.5 hover:shadow-md hover:border-gray-200 transition-all duration-300 space-y-4">
              <div className="w-12 h-12 bg-red-50 text-[#990202] rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] font-extrabold text-gray-900 leading-tight">Aset Bisnis Bernilai Finansial</h3>
              <p className="text-[13.5px] text-gray-500 font-medium leading-relaxed">
                Merek terdaftar merupakan bentuk kekayaan intelektual (Intangible Asset) yang bernilai ekonomi tinggi, dapat diwariskan, dilisensikan (waralaba), atau dialihkan secara komersial.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 3. PAKET HARGA (PRICING GRID) ─── */}
      <section id="paket-harga" className="bg-[#F9FAFB] py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">PAKET PENDAFTARAN MEREK & HAKI</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Biaya transparan, perlindungan maksimal.
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium">
              Semua harga sudah ALL-IN termasuk biaya resmi negara PNBP Kementerian Hukum & HAM. Bebas biaya tersembunyi.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Paket 1: UMKM */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-all duration-300">
              
              {/* Header Box */}
              <div className="bg-[#1A1A1A] p-6.5 text-white relative">
                <div className="inline-flex px-2.5 py-0.5 bg-[#990202] text-[9.5px] font-bold tracking-widest uppercase rounded-full mb-3 text-white">
                  KHUSUS PEMILIK USAHA MIKRO & KECIL
                </div>
                <h3 className="text-[22px] font-extrabold text-white">Paket Merek UMKM</h3>
                <p className="text-[12px] text-gray-400 mt-1 font-semibold leading-tight">Mendaftar lewat subsidi resmi Kementerian</p>
                <div className="mt-5 flex items-baseline">
                  <span className="text-[34px] font-black tracking-tight">Rp 1.499.000</span>
                  <span className="text-[12px] text-gray-400 ml-1.5 font-bold">/ kelas</span>
                </div>
                <div className="mt-1 text-[11px] text-gray-400 font-bold line-through">
                  Harga Normal Rp 3.000.000
                </div>
              </div>

              {/* Service List */}
              <div className="p-6.5 space-y-6">
                
                {/* Penelusuran Awal */}
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-extrabold tracking-widest text-[#990202] uppercase">PENELUSURAN & DRAF</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Penelusuran Merek Dasar (Database DJKI)</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Pembuatan Surat Pernyataan Hak Pemilik</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Bantuan Penyusunan Surat Rekomendasi UMKM</span>
                    </li>
                  </ul>
                </div>

                {/* Proses Resmi */}
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-extrabold tracking-widest text-[#990202] uppercase">PROSES RESMI DJKI</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Sudah Termasuk PNBP Jalur UMKM Rp500.000</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Pendaftaran Akun Resmi Online DJKI</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Sertifikat Merek Elektronik (DJKI Resmi)</span>
                    </li>
                  </ul>
                </div>

                {/* Fitur Dikecualikan */}
                <div className="space-y-2.5 border-t border-gray-100 pt-5">
                  <h5 className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">TIDAK TERMASUK</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-[13px] font-medium text-gray-400 line-through">
                      <X className="w-4 h-4 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Laporan Risiko &amp; Analisis Kemiripan Mendalam</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-400 line-through">
                      <X className="w-4 h-4 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Monitoring Status Publikasi Selama 2 Bulan</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-400 line-through">
                      <X className="w-4 h-4 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Free Refiling / Tanggapan Penolakan DJKI</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="px-6 pb-8 pt-2">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Merek%20UMKM."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 rounded-xl border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 font-bold text-[14px] text-center transition-all duration-200 cursor-pointer shadow-sm"
                >
                  Pilih Paket Merek UMKM
                </a>
              </div>

            </div>

            {/* Paket 2: Reguler / Umum */}
            <div className="bg-white border-[3px] border-[#990202] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(153,2,2,0.08)] scale-[1.03] lg:-translate-y-2.5 relative z-10">
              
              {/* Header Box */}
              <div className="bg-[#990202] p-7 text-white relative">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white">
                  TANPA TAMBAHAN BIAYA APAPUN
                </div>
                <div className="inline-flex px-2.5 py-0.5 bg-white text-[9.5px] font-bold tracking-widest uppercase rounded-full mb-3 text-[#990202]">
                  UNTUK PERUSAHAAN ATAU UMUM
                </div>
                <h3 className="text-[24px] font-black text-white">Paket Merek Umum</h3>
                <p className="text-[12.5px] text-red-100 mt-1 font-semibold leading-tight">All-In PNBP Kelas Umum Tanpa Biaya Tersembunyi</p>
                <div className="mt-5 flex items-baseline">
                  <span className="text-[38px] font-black tracking-tight">Rp 2.999.000</span>
                  <span className="text-[13.5px] text-red-200 ml-1.5 font-bold">/ kelas</span>
                </div>
                <div className="mt-1 text-[11px] text-red-200 font-semibold">
                  Sudah Termasuk PNBP Resmi DJKI Rp 1.800.000
                </div>
              </div>

              {/* Service List */}
              <div className="p-7 space-y-6">
                
                {/* Penelusuran & Draf */}
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-extrabold tracking-widest text-[#990202] uppercase">PENELUSURAN & DRAF</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4.5 h-4.5 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Penelusuran Merek Dasar (Database DJKI)</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4.5 h-4.5 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Pembuatan Surat Pernyataan Hak Pemilik Resmi</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4.5 h-4.5 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Klasifikasi Kelas Barang &amp; Jasa Optimal (Max 15 Item)</span>
                    </li>
                  </ul>
                </div>

                {/* Proses Resmi */}
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-extrabold tracking-widest text-[#990202] uppercase">PROSES RESMI DJKI</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4.5 h-4.5 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span><strong className="font-extrabold text-gray-950">Sudah Termasuk</strong> Billing PNBP DJKI Rp1,8 Juta</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4.5 h-4.5 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Pendaftaran Online Resmi DJKI Kemenkumham</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4.5 h-4.5 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Sertifikat Merek Elektronik (Official e-Certificate)</span>
                    </li>
                  </ul>
                </div>

                {/* Fitur Dikecualikan */}
                <div className="space-y-2.5 border-t border-gray-100 pt-5">
                  <h5 className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">TIDAK TERMASUK</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-[13px] font-medium text-gray-400 line-through">
                      <X className="w-4 h-4 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Laporan Risiko &amp; Analisis Kemiripan Mendalam</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-400 line-through">
                      <X className="w-4 h-4 text-red-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Monitoring Status Publikasi Selama 2 Bulan</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="px-7 pb-8 pt-2">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Merek%20Umum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 rounded-2xl bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[15px] text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  Pilih Paket Merek Umum
                </a>
              </div>

            </div>

            {/* Paket 3: Proteksi Premium */}
            <div className="bg-white border border-gray-150/50 rounded-[32px] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] transition-all duration-300">
              
              {/* Header Box */}
              <div className="bg-[#1A1A1A] p-6.5 text-white relative">
                {/* Fast Track Gold Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-gray-950 shadow-md">
                  FAST TRACK PROTECTION
                </div>
                <div className="inline-flex px-2.5 py-0.5 bg-[#FFFBEB] text-[9.5px] font-extrabold tracking-widest uppercase rounded-full mb-3 text-[#D97706]">
                  PROTEKSI MAKSIMAL
                </div>
                <h3 className="text-[22px] font-extrabold text-white">Proteksi Premium</h3>
                <p className="text-[12px] text-gray-400 mt-1 font-semibold leading-tight">Analisis Mendalam &amp; Monitoring Masa Publikasi</p>
                <div className="mt-5 flex items-baseline">
                  <span className="text-[34px] font-black tracking-tight">Rp 3.999.000</span>
                  <span className="text-[12px] text-gray-400 ml-1.5 font-bold">/ kelas</span>
                </div>
                <div className="mt-1 text-[11px] text-gray-400 font-bold">
                  All-In PNBP DJKI Rp 1.800.000 + Laporan Risiko
                </div>
              </div>

              {/* Service List */}
              <div className="p-6.5 space-y-6">
                
                {/* Penelusuran & Draf */}
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-extrabold tracking-widest text-[#990202] uppercase">PENELUSURAN & DRAF</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span><strong className="font-extrabold text-gray-900">Penelusuran Merek Mendalam &amp; Laporan Risiko</strong></span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Klasifikasi Kelas Barang &amp; Jasa Maksimal (Hingga 30 Item)</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Pembuatan Surat Pernyataan Hak Pemilik Resmi</span>
                    </li>
                  </ul>
                </div>

                {/* Proses Resmi */}
                <div className="space-y-2.5">
                  <h5 className="text-[10px] font-extrabold tracking-widest text-[#990202] uppercase">PROSES RESMI & MONITORING</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Sudah Termasuk Billing PNBP DJKI Rp1.800.000</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span><strong className="font-extrabold text-gray-900">Monitoring Status Publikasi Selama 2 Bulan</strong></span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Sertifikat Merek Elektronik &amp; Pengiriman Cetak Fisik</span>
                    </li>
                  </ul>
                </div>

                {/* Bonus Proteksi */}
                <div className="space-y-2.5 border-t border-gray-100 pt-5">
                  <h5 className="text-[10px] font-extrabold tracking-widest text-[#990202] uppercase">LAYANAN EKSTRA PROTEKSI</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span><strong className="font-extrabold text-gray-900">Free Refiling / Bantahan Hukum Ringan</strong> jika ada sanggahan substantif DJKI</span>
                    </li>
                    <li className="flex items-start text-[13px] font-medium text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                      <span>Personal Legal Assistant dedicated update berkala</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="px-6 pb-8 pt-2">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Merek%20Proteksi%20Premium."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 rounded-xl border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 font-bold text-[14px] text-center transition-all duration-200 cursor-pointer shadow-sm"
                >
                  Pilih Paket Premium
                </a>
              </div>

            </div>

          </div>

          {/* Footnotes */}
          <div className="mt-12 bg-gray-50 border border-gray-150/40 rounded-2xl p-5 text-[11.5px] text-gray-500 leading-relaxed max-w-full font-medium">
            <strong className="font-extrabold text-gray-800 mr-1.5">Catatan Penting:</strong>
            Untuk pendaftaran jalur subsidi **UMKM**, pemohon wajib melampirkan Surat Rekomendasi/Keterangan UMKM yang sah dari dinas koperasi &amp; UMKM setempat. Tim EasyLegal akan membantu memandu draf berkas dan instruksi kelengkapannya secara terperinci demi kesuksesan verifikasi.
          </div>
        </div>
      </section>

      {/* ─── 4. PROSES PENDAFTARAN MEREK (TIMELINE) ─── */}
      <section className="bg-white py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">ALUR PROSES PENDAFTARAN</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              7 Langkah Amankan Merek di DJKI Kemenkumham
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium">
              Dari tahap analisis awal hingga terbitnya sertifikat merek resmi. Kami kawal seluruh administrasinya secara profesional.
            </p>
          </div>

          {/* Timeline Stack */}
          <div className="max-w-[960px] mx-auto relative space-y-8">
            
            {/* Dashed line for desktop */}
            <div className="absolute left-[20px] md:left-[24px] top-6 bottom-6 w-0.5 bg-gray-200 border-l border-dashed border-gray-300 pointer-events-none hidden sm:block" />

            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 relative group">
                
                {/* Step Circle */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#990202] text-[#990202] bg-white flex items-center justify-center font-bold text-[14px] md:text-[16px] flex-shrink-0 z-10 shadow-sm transition-colors group-hover:bg-[#990202] group-hover:text-white duration-300">
                  {step.no}
                </div>

                {/* Card */}
                <div className="flex-grow bg-white border border-gray-150/50 rounded-3xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:border-gray-200 transition-all duration-300 w-full">
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-gray-100/60">
                    <h4 className="text-[16px] md:text-[18px] font-black text-gray-950">
                      {step.title}
                    </h4>
                    {/* Duration */}
                    <div className="inline-flex items-center self-start sm:self-auto px-2.5 py-1 bg-[#FFF5F5] rounded-full text-[#990202] font-extrabold text-[10.5px] uppercase tracking-wider flex-shrink-0 border border-red-50/50">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#990202]" strokeWidth={2.5} />
                      {step.duration}
                    </div>
                  </div>

                  {/* Desc */}
                  <p className="text-[13.5px] text-gray-500 mt-3 font-normal leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Bullet Checklist Grid */}
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 mt-4 border-t border-gray-100/80">
                    {step.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start text-[12.5px] text-gray-600 font-medium leading-tight">
                        <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ─── 5. FAQ SECTION ─── */}
      <FAQ title="Pertanyaan seputar pendaftaran merek & HAKI." items={faqs} />

      {/* ─── 6. CTA BANNER ─── */}
      <CTA
        title={
          <h2 className="font-inter text-[34px] sm:text-[38px] font-extrabold text-gray-950 leading-tight tracking-tight max-w-[480px]">
            Siap amankan hak kepemilikan <span className="text-[#990202]">merek dagang Anda</span>?
          </h2>
        }
        description="Konsultasikan ketersediaan nama brand dan logo Anda dengan tim ahli kami secara gratis sebelum pengajuan resmi ke DJKI."
        whatsappLink="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20ingin%20konsultasi%20mengenai%20pengecekan%20dan%20pendaftaran%20merek."
      />

    </div>
  );
}
