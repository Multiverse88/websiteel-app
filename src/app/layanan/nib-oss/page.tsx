"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Check,
  Building,
  Clock,
  Home,
  Zap,
  Star,
  CheckCircle,
  TrendingUp,
  FileText,
  User,
  BookOpen,
  Compass,
  Shield,
} from "lucide-react";
import Image from "next/image";
import FAQ from "@/components/FAQ";

export default function NibOss() {
  const [activeSubTab, setActiveSubTab] = useState<"perorangan" | "badan" | "oss-rba" | "pt-perorangan">("perorangan");

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nibBenefits = [
    {
      icon: <ShieldCheck className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Legalitas Resmi & Kuat",
      desc: "NIB berfungsi sebagai identitas resmi pelaku usaha dan berlaku sebagai Tanda Daftar Perusahaan (TDP)."
    },
    {
      icon: <Award className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Akses Program Kemitraan",
      desc: "Memudahkan bisnis Anda mendapatkan modal usaha, KUR, serta program kemitraan pemerintah/BUMN."
    },
    {
      icon: <TrendingUp className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Kemudahan Izin Lanjutan",
      desc: "OSS RBA memudahkan pemrosesan Sertifikat Standar, Izin Operasional, hingga izin komersial pendukung."
    },
    {
      icon: <Star className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Kredibilitas Profesional",
      desc: "Membuat usaha Anda diakui profesional di mata klien, perbankan, vendor, dan mitra bisnis strategis."
    }
  ];

  const pricingPackages = [
    {
      title: "NIB PERSEORANGAN",
      subLabel: "PELAKU USAHA MIKRO & KECIL (UMK)",
      price: "499.000",
      strikePrice: "900.000",
      isPopular: false,
      buttonText: "Pilih NIB Perseorangan",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20NIB%20Perseorangan%20(UMK).",
      duration: "1-2 Hari Kerja",
      features: [
        "Pendaftaran Hak Akses Akun OSS RBA",
        "Pemilihan Kode KBLI 2020 yang Tepat",
        "Penerbitan Dokumen NIB Resmi",
        "Pernyataan Mandiri Lingkungan (SPPL)",
        "Pernyataan Mandiri Keselamatan K3L",
        "Satu Kode KBLI Pilihan"
      ],
      bonus: [
        "Konsultasi KBLI & Struktur Usaha",
        "Gratis Personal Legal Assistance (1 Bulan)"
      ]
    },
    {
      title: "NIB BADAN USAHA",
      subLabel: "PT, CV, YAYASAN, ATAU KOPERASI",
      price: "999.000",
      strikePrice: "1.800.000",
      isPopular: true,
      buttonText: "Pilih NIB Badan Usaha",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20NIB%20Badan%20Usaha%20(PT/CV).",
      duration: "1-2 Hari Kerja",
      features: [
        "Pendaftaran Hak Akses Akun OSS RBA Badan Usaha",
        "Sinkronisasi Data AHU (Kemenkumham) ke OSS",
        "Pemilihan Multi KBLI Sesuai Akta Pendirian",
        "Penerbitan Dokumen NIB Resmi Perusahaan",
        "Pernyataan Mandiri Kepatuhan Lingkungan",
        "Pernyataan Mandiri Keselamatan Kerja K3L",
        "Up to 5 Kode KBLI Terintegrasi"
      ],
      bonus: [
        "Evaluasi Kesesuaian Tata Ruang (KKPR)",
        "Gratis Personal Legal Assistance (3 Bulan)"
      ]
    },
    {
      title: "NIB + SERTIFIKAT STANDAR",
      subLabel: "USAHA RISIKO MENENGAH (UMR)",
      price: "1.999.000",
      strikePrice: "3.500.000",
      isPopular: false,
      buttonText: "Pilih NIB Risiko Menengah",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20NIB%20%2B%20Sertifikat%20Standar.",
      duration: "3-5 Hari Kerja",
      features: [
        "Semua Layanan NIB Badan Usaha",
        "Pengajuan & Pemrosesan Sertifikat Standar (SS)",
        "Pernyataan Mandiri Terverifikasi",
        "Pendampingan Pengisian Kesediaan Audit",
        "Penyusunan Formulir Teknis Standar Usaha",
        "Penerbitan NIB + SS Terverifikasi Otomatis"
      ],
      bonus: [
        "Analisis Risiko Sektor Usaha Terkait",
        "Priority Support & Konsultasi 24/7"
      ]
    }
  ];


  const faqs = [
    {
      q: "Apa beda NIB Perorangan, NIB PT Perorangan, & NIB Badan?",
      a: "NIB Perorangan — untuk usaha perseorangan tanpa badan hukum (warung, freelancer, dst). NIB PT Perorangan — khusus untuk UMKM Mikro yang sudah didirikan sebagai PT Perorangan. NIB Badan — untuk badan usaha resmi: PT, PT PMA, CV, Firma, Yayasan, Perkumpulan, atau Koperasi. Tim kami bantu pilih yang sesuai status usaha Anda."
    },
    {
      q: "Berapa lama proses penerbitan NIB?",
      a: "Proses standard berkisar antara <strong class=\"font-extrabold text-gray-950\">1 hingga 3 hari kerja</strong> setelah seluruh kelengkapan data administrasi kami terima dengan lengkap dan tidak ada gangguan pada sistem OSS BKPM."
    },
    {
      q: "Apa itu KBLI dan bagaimana cara memilihnya?",
      a: "KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) adalah kode kategori resmi dari BPS untuk mengelompokkan jenis aktivitas ekonomi usaha. Tim EasyLegal akan menganalisis model bisnis Anda secara mendalam untuk menentukan kode KBLI yang paling akurat, guna menghindari penolakan izin atau sanksi di kemudian hari."
    },
    {
      q: "Apakah NIB bisa diperbarui (cabut/tambah KBLI)?",
      a: "Sangat bisa. Jika usaha Anda mengalami ekspansi atau perubahan lini bisnis, NIB lama Anda dapat dimutakhirkan dengan menambah atau mencabut kode KBLI melalui sistem OSS RBA. Kami siap memandu proses perubahan data legalitas ini secara kilat."
    },
    {
      q: "Bagaimana kalau perlu ubah data lain selain KBLI?",
      a: "Semua perubahan data (seperti nama penanggung jawab, perubahan modal disetor, kepemilikan saham, atau alamat kantor) dapat diajukan perubahan datanya secara resmi. Tim kami akan mengurus integrasi perubahan data tersebut agar NIB Anda selalu valid dan sinkron."
    },
    {
      q: "Apakah harga sudah include biaya pemerintah?",
      a: "Ya, seluruh biaya yang tertera pada paket kami bersifat <strong class=\"font-extrabold text-gray-950\">all-in</strong>. Sudah termasuk biaya jasa profesional kami, pembuatan akun, verifikasi data, hingga seluruh biaya PNBP atau biaya administrasi resmi pemerintah (jika ada)."
    },
    {
      q: "Apa yang bisa dilakukan setelah NIB terbit?",
      a: "Setelah NIB terbit secara resmi, Anda dapat langsung menggunakannya untuk membuka rekening bank bisnis atas nama perusahaan, mendaftar sertifikasi Halal, mengurus pendaftaran merek brand di DJKI, hingga mengajukan permohonan PKP guna ekspansi transaksi dengan klien."
    }
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
                <span className="text-[13px] font-bold text-gray-900">Perizinan Usaha (NIB & OSS)</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-3.5 rounded-full border border-red-100/60 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[12.5px] font-bold text-[#990202] tracking-wide">Perizinan Usaha · OSS RBA</span>
              </div>

              {/* Headline */}
              <h1 className="font-inter text-[42px] sm:text-[50px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                NIB & izin usaha resmi,<br />
                <span className="text-[#990202]">cepat & lengkap.</span>
              </h1>

              {/* Description */}
              <p className="text-[15.5px] sm:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-medium">
                Pengurusan NIB, OSS RBA, perubahan KBLI, sampai sertifikat standar — semua kami pandu sesuai tingkat risiko usaha Anda. Mulai dari Rp 499.000.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20ingin%20berkonsultasi%20mengenai%20pembuatan%20NIB%20dan%20izin%20OSS%20RBA."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] text-white font-bold text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <span>Konsultasi Gratis</span>
                  <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center px-7 py-4 border border-gray-200 text-gray-800 font-bold text-[15px] rounded-xl hover:bg-gray-55 hover:border-gray-305 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer bg-white"
                >
                  Lihat Paket Harga
                </a>
              </div>

              {/* Features Row */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-8 border-t border-gray-100 max-w-[580px]">
                
                {/* Info 1 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[13.5px] font-black text-gray-950 leading-tight">1-3 hari</p>
                    <p className="text-[11px] font-bold text-gray-400">Lama proses</p>
                  </div>
                </div>

                {/* Info 2 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <span className="text-[16px] font-black leading-none">$</span>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-black text-gray-950 leading-tight">Mulai Rp 499rb</p>
                    <p className="text-[11px] font-bold text-gray-400">Harga transparan</p>
                  </div>
                </div>

                {/* Info 3 */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-black text-gray-950 leading-tight">OSS RBA</p>
                    <p className="text-[11px] font-bold text-gray-400">Resmi BKPM</p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Hero Graphic/Stats */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/3]">
                
                {/* Photo container */}
                <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-gray-100 shadow-lg relative bg-gray-55">
                  <Image
                    src="/cerita-kami-team.png"
                    alt="EasyLegal Team Collaboration"
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Overlay Badge 1: Top-Left */}
                <div className="absolute -top-4 -left-6 sm:-left-10 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 flex items-center gap-3 z-20">
                  <div className="w-10 h-10 bg-red-50 text-[#990202] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[12.5px] font-black text-gray-950">NIB Terbit</p>
                    <p className="text-[10px] font-bold text-gray-400">Resmi · 2 hari kerja</p>
                  </div>
                </div>

                {/* Overlay Badge 2: Bottom-Right */}
                <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100 flex items-center gap-3 z-20">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[12.5px] font-black text-gray-950">OSS RBA Aktif</p>
                    <p className="text-[10px] font-bold text-gray-400">Siap operasional</p>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

      {/* ─── 2. APA ITU NIB & PERIZINAN BERBASIS RISIKO ─── */}
      <section className="bg-white py-24 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-left mb-16 space-y-3">
            <p className="text-[12px] font-black text-[#990202] uppercase tracking-[0.2em]">PENGERTIAN NIB & OSS RBA</p>
            <h2 className="font-inter text-[32px] sm:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Apa itu NIB & Perizinan Berbasis Risiko?
            </h2>
            <p className="text-[15px] text-gray-500 leading-relaxed font-medium">
              Sebelum mulai, kenali dulu sistem perizinan usaha online yang berlaku di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Mockup Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/3]">
                {/* Photo container */}
                <div className="w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-gray-150 shadow-lg relative bg-gray-55">
                  <Image
                    src="/nib-desk-mockup.png"
                    alt="Tax Document Calculator Desk"
                    fill
                    sizes="(max-width: 768px) 100vw, 460px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Law Info Badge */}
                <div className="absolute bottom-4 left-4 bg-white rounded-2xl p-3 shadow-md border border-gray-100 flex items-center gap-3 z-20">
                  <div className="w-9 h-9 bg-[#990202] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-[12px] font-bold text-gray-900">Dasar Hukum</p>
                    <p className="text-[9.5px] font-medium text-gray-500">PP No. 5/2021 & PP No. 24/2018</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Side: Redesigned Description Cards */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Card 1: Pengertian NIB */}
              <div className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-200 text-left space-y-3">
                <div className="flex items-center gap-2.5 text-[#990202]">
                  <BookOpen className="w-4.5 h-4.5" />
                  <h4 className="text-[12px] font-extrabold tracking-wider uppercase">PENGERTIAN NIB</h4>
                </div>
                <p className="text-[13.5px] text-gray-500 leading-relaxed font-medium">
                  <strong className="font-bold text-gray-900">NIB (Nomor Induk Berusaha)</strong> adalah identitas pelaku usaha yang diterbitkan oleh BKPM melalui sistem OSS (Online Single Submission), berfungsi sebagai tanda pengenal & akses untuk berbagai izin usaha. Dasar hukumnya adalah <strong className="font-bold text-gray-900">Peraturan Pemerintah No. 24 Tahun 2018</strong>.
                </p>
              </div>

              {/* Card 2: Pengertian OSS RBA */}
              <div className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-200 text-left space-y-3">
                <div className="flex items-center gap-2.5 text-[#990202]">
                  <Compass className="w-4.5 h-4.5" />
                  <h4 className="text-[12px] font-extrabold tracking-wider uppercase">PENGERTIAN OSS RBA</h4>
                </div>
                <p className="text-[13.5px] text-gray-500 leading-relaxed font-medium">
                  <strong className="font-bold text-gray-900">OSS RBA (Risk Based Approach)</strong> adalah sistem perizinan berusaha berdasarkan tingkat risiko kegiatan usaha — berbeda dari OSS 1.1 yang lama, dengan mempertimbangkan risiko dan skala usaha. Dasar hukumnya adalah <strong className="font-bold text-gray-900">Peraturan Pemerintah No. 5 Tahun 2021</strong>.
                </p>
              </div>

              {/* Card 3: Perizinan Usaha Berbasis Risiko */}
              <div className="bg-white border border-gray-150 rounded-2xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-200 text-left space-y-3">
                <div className="flex items-center gap-2.5 text-[#990202]">
                  <Shield className="w-4.5 h-4.5" />
                  <h4 className="text-[12px] font-extrabold tracking-wider uppercase">PERIZINAN USAHA BERBASIS RISIKO</h4>
                </div>
                <p className="text-[13.5px] text-gray-500 leading-relaxed font-medium">
                  Perizinan Usaha Berbasis Risiko menentukan jenis perizinan berdasarkan <strong className="font-bold text-gray-900">tingkat risiko usaha</strong>. Usaha dengan risiko rendah cukup dengan NIB. Risiko menengah memerlukan Sertifikat Standar. Risiko tinggi butuh persetujuan instansi terkait — didasarkan pada <strong className="font-bold text-gray-900">KBLI 2020</strong>.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. 4 TINGKAT RISIKO USAHA ─── */}
      <section className="bg-white py-24 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">4 TINGKAT RISIKO USAHA</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Jenis perizinan sesuai tingkat risiko.
            </h2>
            <p className="text-[14.5px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Tingkat risiko ditentukan oleh KBLI usaha Anda. Kami bantu identifikasi tingkat risiko & perizinan yang dibutuhkan.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1140px] mx-auto">
            
            {/* Level 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col">
              <div className="bg-[#0F9D58] p-5 text-white text-center">
                <p className="text-[9px] font-extrabold tracking-widest uppercase opacity-75">TINGKAT 1</p>
                <p className="text-[16px] font-black mt-1">Risiko Rendah (R)</p>
              </div>
              <div className="p-6 flex-1 space-y-4 text-left">
                <p className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">PERIZINAN BERUSAHA</p>
                <ul className="space-y-2.5">
                  <li className="flex items-start text-[13px] font-semibold text-gray-700 leading-relaxed">
                    <span className="text-[#0F9D58] text-[15px] font-black mr-2">✓</span>
                    <span>Nomor Induk Berusaha (NIB)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Level 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col">
              <div className="bg-[#E67E22] p-5 text-white text-center">
                <p className="text-[9px] font-extrabold tracking-widest uppercase opacity-75">TINGKAT 2</p>
                <p className="text-[16px] font-black mt-1">Menengah Rendah (MR)</p>
              </div>
              <div className="p-6 flex-1 space-y-4 text-left">
                <p className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">PERIZINAN BERUSAHA</p>
                <ul className="space-y-2.5">
                  <li className="flex items-start text-[13px] font-semibold text-gray-700 leading-relaxed">
                    <span className="text-[#E67E22] text-[15px] font-black mr-2">✓</span>
                    <span>NIB</span>
                  </li>
                  <li className="flex items-start text-[13px] font-semibold text-gray-700 leading-relaxed">
                    <span className="text-[#E67E22] text-[15px] font-black mr-2">✓</span>
                    <span>Sertifikat Standar (pernyataan mandiri)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Level 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col">
              <div className="bg-[#D35400] p-5 text-white text-center">
                <p className="text-[9px] font-extrabold tracking-widest uppercase opacity-75">TINGKAT 3</p>
                <p className="text-[16px] font-black mt-1">Menengah Tinggi (MT)</p>
              </div>
              <div className="p-6 flex-1 space-y-4 text-left">
                <p className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">PERIZINAN BERUSAHA</p>
                <ul className="space-y-2.5">
                  <li className="flex items-start text-[13px] font-semibold text-gray-700 leading-relaxed">
                    <span className="text-[#D35400] text-[15px] font-black mr-2">✓</span>
                    <span>NIB</span>
                  </li>
                  <li className="flex items-start text-[13px] font-semibold text-gray-700 leading-relaxed">
                    <span className="text-[#D35400] text-[15px] font-black mr-2">✓</span>
                    <span>Sertifikat Standar diverifikasi Kementerian/Lembaga</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Level 4 */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col">
              <div className="bg-[#990202] p-5 text-white text-center">
                <p className="text-[9px] font-extrabold tracking-widest uppercase opacity-75">TINGKAT 4</p>
                <p className="text-[16px] font-black mt-1">Risiko Tinggi (T)</p>
              </div>
              <div className="p-6 flex-1 space-y-4 text-left">
                <p className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">PERIZINAN BERUSAHA</p>
                <ul className="space-y-2.5">
                  <li className="flex items-start text-[13px] font-semibold text-gray-700 leading-relaxed">
                    <span className="text-[#990202] text-[15px] font-black mr-2">✓</span>
                    <span>NIB</span>
                  </li>
                  <li className="flex items-start text-[13px] font-semibold text-gray-700 leading-relaxed">
                    <span className="text-[#990202] text-[15px] font-black mr-2">✓</span>
                    <span>Izin disetujui Kementerian/Lembaga</span>
                  </li>
                  <li className="flex items-start text-[13px] font-semibold text-gray-700 leading-relaxed">
                    <span className="text-[#990202] text-[15px] font-black mr-2">✓</span>
                    <span>Sertifikat Standar (jika perlu)</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. PRICING SECTION ─── */}
      <section id="paket-harga" className="bg-[#FAF9F9] py-24 border-b border-gray-200/40 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">BIAYA PEMBUATAN & PENCABUTAN NIB</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              4 paket sesuai jenis usaha Anda.
            </h2>
            <p className="text-[14.5px] text-gray-500 font-medium">
              Harga sudah include semua biaya — pengurusan NIB, NPWP, OSS RBA, & sertifikat standar. Tanpa tambahan biaya apapun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            
            {/* Paket 1: NIB Perorangan */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                {/* Header */}
                <div className="bg-[#1A1A1A] px-6 py-8 text-center text-white relative">
                  <h3 className="text-[14px] font-black tracking-widest text-white/90">NIB PERORANGAN</h3>
                  <p className="text-[9px] font-bold text-white/50 tracking-wider uppercase mt-1">USAHA PERSEORANGAN</p>
                  <div className="mt-4 text-[12px] text-white/40 line-through">Rp 1.000.000</div>
                  <div className="mt-0.5 text-[24px] font-black">Rp 499.000</div>
                  <p className="text-[9px] font-bold text-white/50 uppercase mt-2">TANPA TAMBAHAN BIAYA APAPUN</p>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5">
                  {/* Lama Proses */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">LAMA PROSES</h4>
                    <div className="flex items-center text-[12.5px] font-semibold text-gray-700">
                      <span className="text-emerald-500 text-[14px] mr-2">✓</span>
                      <span>1-3 Hari Kerja <sup className="text-[9px] text-[#990202]">(1)</sup></span>
                    </div>
                  </div>

                  {/* Yang Diperoleh */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">YANG DIPEROLEH</h4>
                    <ul className="space-y-2">
                      {[
                        "5 KBLI Bidang Usaha",
                        "NPWP & SKT Pajak",
                        "Akun Gmail & OSS",
                        "NIB",
                        "Akun OSS RBA",
                        "K3L/SPUMKTTR & SPPL",
                        <span>Sertifikat Standar <sup className="text-[9px] text-[#990202]">(2)</sup></span>,
                        <span>Angka Pengenal Impor <sup className="text-[9px] text-[#990202]">(3)</sup></span>
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                          <span className="text-emerald-500 text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bonus */}
                  <div className="bg-gray-50/75 rounded-2xl p-4.5 space-y-2.5 border border-gray-150/50">
                    <h4 className="text-[10px] font-black text-[#990202] tracking-wider uppercase">BONUS</h4>
                    <ul className="space-y-2">
                      {[
                        "Personal Legal Assistance",
                        "1 Kupon Undian iPhone"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                          <span className="text-[#990202] text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extra Bonus */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">EXTRA BONUS</h4>
                    <ul className="space-y-2">
                      {[
                        <span>Voucher EasyLegal <strong className="font-extrabold text-gray-900">Rp 50.000</strong></span>,
                        "Dokumen SOP Karyawan",
                        "Dokumen SOP Perusahaan",
                        "Dokumen Kontrak Bisnis",
                        <span>Cek Merek senilai <strong className="font-extrabold text-gray-900">Rp 299.000</strong></span>
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                          <span className="text-emerald-500 text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Footer Button */}
              <div className="p-6 pt-0">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20NIB%20Perorangan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 text-center font-extrabold text-[13px] text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 shadow-sm"
                >
                  Pilih NIB Perorangan
                </a>
              </div>
            </div>
          </div>

            {/* Paket 2: NIB PT Perorangan (FAVORIT - Border Red) */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-3xl overflow-hidden border-[2.5px] border-[#990202] shadow-[0_12px_40px_rgba(153,2,2,0.045)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.12)] scale-[1.025] z-10 flex flex-col justify-between relative transition-all duration-300 h-full">
              <div>
                {/* Header */}
                <div className="bg-[#990202] px-6 py-8 pt-10 text-center text-white relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#990202] text-white text-[8px] font-black tracking-widest uppercase px-3.5 py-1 rounded-full whitespace-nowrap">
                    UMKM FAVORIT
                  </div>
                  <h3 className="text-[14px] font-black tracking-widest text-white/90">NIB PT PERORANGAN</h3>
                  <p className="text-[9px] font-bold text-white/50 tracking-wider uppercase mt-1">PT PERORANGAN UMKM</p>
                  <div className="mt-4 text-[12px] text-white/40 line-through">Rp 1.000.000</div>
                  <div className="mt-0.5 text-[24px] font-black">Rp 499.000</div>
                  <p className="text-[9px] font-bold text-white/50 uppercase mt-2">TANPA TAMBAHAN BIAYA APAPUN</p>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5">
                  {/* Lama Proses */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">LAMA PROSES</h4>
                    <div className="flex items-center text-[12.5px] font-semibold text-gray-700">
                      <span className="text-emerald-500 text-[14px] mr-2">✓</span>
                      <span>1-3 Hari Kerja <sup className="text-[9px] text-[#990202]">(1)</sup></span>
                    </div>
                  </div>

                  {/* Yang Diperoleh */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">YANG DIPEROLEH</h4>
                    <ul className="space-y-2">
                      {[
                        "5 KBLI Bidang Usaha",
                        "NPWP & SKT Pajak",
                        "Akun Gmail & OSS",
                        "NIB",
                        "Akun OSS RBA",
                        "K3L/SPUMKTTR & SPPL",
                        <span>Sertifikat Standar <sup className="text-[9px] text-[#990202]">(2)</sup></span>,
                        <span>Angka Pengenal Impor <sup className="text-[9px] text-[#990202]">(3)</sup></span>
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                          <span className="text-emerald-500 text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bonus */}
                  <div className="bg-gray-50/75 rounded-2xl p-4.5 space-y-2.5 border border-gray-150/50">
                    <h4 className="text-[10px] font-black text-[#990202] tracking-wider uppercase">BONUS</h4>
                    <ul className="space-y-2">
                      {[
                        "Personal Legal Assistance",
                        "1 Kupon Undian iPhone"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                          <span className="text-[#990202] text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extra Bonus */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">EXTRA BONUS</h4>
                    <ul className="space-y-2">
                      {[
                        <span>Voucher EasyLegal <strong className="font-extrabold text-gray-900">Rp 50.000</strong></span>,
                        "Dokumen SOP Karyawan",
                        "Dokumen SOP Perusahaan",
                        "Dokumen Kontrak Bisnis",
                        <span>Cek Merek senilai <strong className="font-extrabold text-gray-900">Rp 299.000</strong></span>
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                          <span className="text-emerald-500 text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Footer Button */}
              <div className="p-6 pt-0">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20NIB%20PT%20Perorangan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 text-center font-extrabold text-[13px] text-white bg-[#990202] hover:bg-[#800000] rounded-xl transition-all duration-200 shadow-md"
                >
                  Pilih NIB PT Perorangan
                </a>
              </div>
            </div>
          </div>

            {/* Paket 3: NIB Badan */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                {/* Header */}
                <div className="bg-[#1A1A1A] px-6 py-8 text-center text-white relative">
                  <h3 className="text-[14px] font-black tracking-widest text-white/90">NIB BADAN</h3>
                  <p className="text-[9px] font-bold text-white/50 tracking-wider uppercase mt-1">PT, PMA, CV, FIRMA, YAYASAN, KOPERASI</p>
                  <div className="mt-4 text-[12px] text-white/40 line-through">Rp 3.000.000</div>
                  <div className="mt-0.5 text-[24px] font-black">Rp 1.499.000</div>
                  <p className="text-[9px] font-bold text-white/50 uppercase mt-2">TANPA TAMBAHAN BIAYA APAPUN</p>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5">
                  {/* Lama Proses */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">LAMA PROSES</h4>
                    <div className="flex items-center text-[12.5px] font-semibold text-gray-700">
                      <span className="text-emerald-500 text-[14px] mr-2">✓</span>
                      <span>1-3 Hari Kerja <sup className="text-[9px] text-[#990202]">(1)</sup></span>
                    </div>
                  </div>

                  {/* Yang Diperoleh */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">YANG DIPEROLEH</h4>
                    <ul className="space-y-2">
                      {[
                        "5 KBLI Bidang Usaha",
                        "NPWP & SKT Pajak",
                        "Akun Gmail & OSS",
                        "NIB",
                        "Akun OSS RBA",
                        "K3L/SPUMKTTR & SPPL",
                        <span>Sertifikat Standar <sup className="text-[9px] text-[#990202]">(2)</sup></span>,
                        <span>Angka Pengenal Impor <sup className="text-[9px] text-[#990202]">(3)</sup></span>
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                          <span className="text-emerald-500 text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bonus */}
                  <div className="bg-gray-50/75 rounded-2xl p-4.5 space-y-2.5 border border-gray-150/50">
                    <h4 className="text-[10px] font-black text-[#990202] tracking-wider uppercase">BONUS</h4>
                    <ul className="space-y-2">
                      {[
                        "Personal Legal Assistance",
                        "1 Kupon Undian iPhone"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                          <span className="text-[#990202] text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extra Bonus */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">EXTRA BONUS</h4>
                    <ul className="space-y-2">
                      {[
                        <span>Voucher EasyLegal <strong className="font-extrabold text-gray-900">Rp 250.000</strong></span>,
                        "Dokumen SOP Karyawan",
                        "Dokumen SOP Perusahaan",
                        "Dokumen Kontrak Bisnis",
                        <span>Cek Merek senilai <strong className="font-extrabold text-gray-900">Rp 299.000</strong></span>
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                          <span className="text-emerald-500 text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Footer Button */}
              <div className="p-6 pt-0">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20NIB%20Badan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 text-center font-extrabold text-[13px] text-gray-800 bg-white hover:bg-gray-55 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 shadow-sm"
                >
                  Pilih NIB Badan
                </a>
              </div>
            </div>
          </div>

            {/* Paket 4: Cabut NIB */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                {/* Header */}
                <div className="bg-[#1A1A1A] px-6 py-8 text-center text-white relative">
                  <h3 className="text-[14px] font-black tracking-widest text-white/90">CABUT NIB</h3>
                  <p className="text-[9px] font-bold text-white/50 tracking-wider uppercase mt-1">PENCABUTAN NIB DARI OSS</p>
                  <div className="mt-4 text-[12px] text-white/40 line-through">Rp 2.000.000</div>
                  <div className="mt-0.5 text-[24px] font-black">Rp 999.000</div>
                  <p className="text-[9px] font-bold text-white/50 uppercase mt-2">TANPA TAMBAHAN BIAYA APAPUN</p>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5">
                  {/* Lama Proses */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">LAMA PROSES</h4>
                    <div className="flex items-center text-[12.5px] font-semibold text-gray-700">
                      <span className="text-emerald-500 text-[14px] mr-2">✓</span>
                      <span>1-3 Hari Kerja <sup className="text-[9px] text-[#990202]">(1)</sup></span>
                    </div>
                  </div>

                  {/* Yang Diperoleh */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">YANG DIPEROLEH</h4>
                    <ul className="space-y-2">
                      {[
                        "Pencabutan NIB dari OSS"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                          <span className="text-emerald-500 text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bonus */}
                  <div className="bg-gray-50/75 rounded-2xl p-4.5 space-y-2.5 border border-gray-150/50">
                    <h4 className="text-[10px] font-black text-[#990202] tracking-wider uppercase">BONUS</h4>
                    <ul className="space-y-2">
                      {[
                        "Personal Legal Assistance",
                        "1 Kupon Undian iPhone"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                          <span className="text-[#990202] text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extra Bonus */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-gray-950 tracking-wider uppercase">EXTRA BONUS</h4>
                    <ul className="space-y-2">
                      {[
                        <span>Voucher EasyLegal <strong className="font-extrabold text-gray-900">Rp 250.000</strong></span>,
                        "Dokumen SOP Karyawan",
                        "Dokumen SOP Perusahaan",
                        "Dokumen Kontrak Bisnis",
                        <span>Cek Merek senilai <strong className="font-extrabold text-gray-900">Rp 299.000</strong></span>
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                          <span className="text-emerald-500 text-[14px] mr-2 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* Footer Button */}
              <div className="p-6 pt-0">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Cabut%20NIB."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3.5 text-center font-extrabold text-[13px] text-gray-800 bg-white hover:bg-gray-55 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 shadow-sm"
                >
                  Pilih Cabut NIB
                </a>
              </div>
            </div>
          </div>

          </div>

          {/* Footnote disclaimers */}
          <div className="max-w-[1400px] mx-auto mt-12 bg-white border border-gray-200/60 rounded-2xl p-5 text-[11.5px] text-gray-500 leading-relaxed font-medium">
            <strong className="font-extrabold text-gray-800 mr-1.5">Keterangan:</strong>
            <span>(1) Jika tidak terdapat kendala pada sistem AHU &amp; OSS. (2) Untuk risiko menengah rendah. (3) Opsional, jika usaha melakukan impor.</span>
          </div>

        </div>
      </section>

      {/* ─── 4.5. LAYANAN TAMBAHAN (Tabbed interactive section) ─── */}
      <section className="bg-white py-24 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">LAYANAN TAMBAHAN</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Perubahan KBLI & data usaha.
            </h2>
            <p className="text-[14.5px] text-gray-500 font-medium">
              Ubah, tambah, atau cabut KBLI yang ada di NIB Anda — pilih tab sesuai jenis perubahan yang dibutuhkan.
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-[1140px] mx-auto">
            
            {/* Tab 1: Perorangan */}
            <button
              onClick={() => setActiveSubTab("perorangan")}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-extrabold transition-all duration-200 ${
                activeSubTab === "perorangan"
                  ? "bg-[#990202] text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 cursor-pointer"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Perubahan KBLI Perorangan</span>
            </button>

            {/* Tab 2: Badan */}
            <button
              onClick={() => setActiveSubTab("badan")}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-extrabold transition-all duration-200 ${
                activeSubTab === "badan"
                  ? "bg-[#990202] text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 cursor-pointer"
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Perubahan KBLI Badan</span>
            </button>

            {/* Tab 3: OSS RBA */}
            <button
              onClick={() => setActiveSubTab("oss-rba")}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-extrabold transition-all duration-200 ${
                activeSubTab === "oss-rba"
                  ? "bg-[#990202] text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 cursor-pointer"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Perubahan Data OSS RBA</span>
            </button>

            {/* Tab 4: PT Perorangan */}
            <button
              onClick={() => setActiveSubTab("pt-perorangan")}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-extrabold transition-all duration-200 ${
                activeSubTab === "pt-perorangan"
                  ? "bg-[#990202] text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300 cursor-pointer"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Perubahan Data PT Perorangan</span>
            </button>

          </div>

          {/* Tab Contents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1140px] mx-auto items-stretch">
            
            {/* Card 1: Cabut KBLI */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="bg-[#1A1A1A] px-6 py-7 text-center text-white relative">
                  <h3 className="text-[13px] font-black tracking-widest text-white/90">CABUT KBLI</h3>
                  <div className="mt-3 text-[11px] text-white/40 line-through">
                    {activeSubTab === "perorangan" ? "Rp 800.000" : activeSubTab === "badan" ? "Rp 1.500.000" : "Rp 1.000.000"}
                  </div>
                  <div className="mt-0.5 text-[22px] font-black">
                    {activeSubTab === "perorangan" ? "Rp 399.000" : activeSubTab === "badan" ? "Rp 799.000" : "Rp 499.000"}
                  </div>
                  <p className="text-[9px] font-bold text-white/50 uppercase mt-2">TANPA TAMBAHAN BIAYA APAPUN</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-[9.5px] font-black text-gray-950 tracking-wider uppercase">LAMA PROSES</h4>
                    <div className="flex items-center text-[12px] font-semibold text-gray-700">
                      <span className="text-emerald-500 text-[13px] mr-2">✓</span>
                      <span>1-3 Hari Kerja <sup className="text-[9px] text-[#990202]">(1)</sup></span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[9.5px] font-black text-gray-950 tracking-wider uppercase">YANG DIPEROLEH</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Pencabutan 1 s/d 5 buah KBLI</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bonus */}
                  <div className="bg-gray-50/75 rounded-2xl p-4 space-y-2 border border-gray-150/50">
                    <h4 className="text-[9.5px] font-black text-[#990202] tracking-wider uppercase">BONUS</h4>
                    <ul className="space-y-1.5">
                      <li className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                        <span className="text-[#990202] text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Personal Legal Assistance</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                        <span className="text-[#990202] text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>1 Kupon Undian iPhone</span>
                      </li>
                    </ul>
                  </div>

                  {/* Extra Bonus */}
                  <div className="space-y-2">
                    <h4 className="text-[9.5px] font-black text-gray-950 tracking-wider uppercase">EXTRA BONUS</h4>
                    <ul className="space-y-1.5">
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Voucher EasyLegal <strong className="font-extrabold text-gray-900">Rp 50.000</strong></span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Dokumen SOP Karyawan</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Dokumen SOP Perusahaan</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Dokumen Kontrak Bisnis</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Cek Merek senilai <strong className="font-extrabold text-gray-900">Rp 299.000</strong></span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Cabut%20KBLI%20(${activeSubTab}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center font-extrabold text-[12.5px] text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 shadow-sm"
                >
                  Pilih Cabut KBLI
                </a>
              </div>
            </div>
          </div>

            {/* Card 2: Tambah KBLI (FAVORIT/RED) */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-3xl overflow-hidden border-[2.5px] border-[#990202] shadow-[0_12px_40px_rgba(153,2,2,0.045)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.12)] scale-[1.02] z-10 flex flex-col justify-between relative transition-all duration-300 h-full">
              <div>
                <div className="bg-[#990202] px-6 py-7 pt-9 text-center text-white relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#990202] text-white text-[8px] font-black tracking-widest uppercase px-3 py-0.5 rounded-full whitespace-nowrap">
                    PALING POPULER
                  </div>
                  <h3 className="text-[13px] font-black tracking-widest text-white/90">TAMBAH KBLI</h3>
                  <div className="mt-3 text-[11px] text-white/40 line-through">
                    {activeSubTab === "perorangan" ? "Rp 1.000.000" : activeSubTab === "badan" ? "Rp 1.800.000" : "Rp 1.200.000"}
                  </div>
                  <div className="mt-0.5 text-[22px] font-black">
                    {activeSubTab === "perorangan" ? "Rp 499.000" : activeSubTab === "badan" ? "Rp 999.000" : "Rp 599.000"}
                  </div>
                  <p className="text-[9px] font-bold text-white/50 uppercase mt-2">TANPA TAMBAHAN BIAYA APAPUN</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-[9.5px] font-black text-gray-950 tracking-wider uppercase">LAMA PROSES</h4>
                    <div className="flex items-center text-[12px] font-semibold text-gray-700">
                      <span className="text-emerald-500 text-[13px] mr-2">✓</span>
                      <span>1-3 Hari Kerja <sup className="text-[9px] text-[#990202]">(1)</sup></span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[9.5px] font-black text-gray-950 tracking-wider uppercase">YANG DIPEROLEH</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Penambahan 1 s/d 5 buah KBLI</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bonus */}
                  <div className="bg-gray-50/75 rounded-2xl p-4 space-y-2 border border-gray-150/50">
                    <h4 className="text-[9.5px] font-black text-[#990202] tracking-wider uppercase">BONUS</h4>
                    <ul className="space-y-1.5">
                      <li className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                        <span className="text-[#990202] text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Personal Legal Assistance</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                        <span className="text-[#990202] text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>1 Kupon Undian iPhone</span>
                      </li>
                    </ul>
                  </div>

                  {/* Extra Bonus */}
                  <div className="space-y-2">
                    <h4 className="text-[9.5px] font-black text-gray-950 tracking-wider uppercase">EXTRA BONUS</h4>
                    <ul className="space-y-1.5">
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Voucher EasyLegal <strong className="font-extrabold text-gray-900">Rp 50.000</strong></span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Dokumen SOP Karyawan</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Dokumen SOP Perusahaan</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Dokumen Kontrak Bisnis</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Cek Merek senilai <strong className="font-extrabold text-gray-900">Rp 299.000</strong></span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Tambah%20KBLI%20(${activeSubTab}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center font-extrabold text-[12.5px] text-white bg-[#990202] hover:bg-[#800000] rounded-xl transition-all duration-200 shadow-md"
                >
                  Pilih Tambah KBLI
                </a>
              </div>
            </div>
          </div>

            {/* Card 3: Cabut & Tambah */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                <div className="bg-[#1A1A1A] px-6 py-7 text-center text-white relative">
                  <h3 className="text-[13px] font-black tracking-widest text-white/90">CABUT & TAMBAH</h3>
                  <div className="mt-3 text-[11px] text-white/40 line-through">
                    {activeSubTab === "perorangan" ? "Rp 1.700.000" : activeSubTab === "badan" ? "Rp 2.800.000" : "Rp 2.000.000"}
                  </div>
                  <div className="mt-0.5 text-[22px] font-black">
                    {activeSubTab === "perorangan" ? "Rp 849.000" : activeSubTab === "badan" ? "Rp 1.499.000" : "Rp 999.000"}
                  </div>
                  <p className="text-[9px] font-bold text-white/50 uppercase mt-2">TANPA TAMBAHAN BIAYA APAPUN</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-[9.5px] font-black text-gray-950 tracking-wider uppercase">LAMA PROSES</h4>
                    <div className="flex items-center text-[12px] font-semibold text-gray-700">
                      <span className="text-emerald-500 text-[13px] mr-2">✓</span>
                      <span>1-3 Hari Kerja <sup className="text-[9px] text-[#990202]">(1)</sup></span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-[9.5px] font-black text-gray-950 tracking-wider uppercase">YANG DIPEROLEH</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Pencabutan 1 s/d 5 buah KBLI</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Penambahan 1 s/d 5 buah KBLI</span>
                      </li>
                    </ul>
                  </div>

                  {/* Bonus */}
                  <div className="bg-gray-50/75 rounded-2xl p-4 space-y-2 border border-gray-150/50">
                    <h4 className="text-[9.5px] font-black text-[#990202] tracking-wider uppercase">BONUS</h4>
                    <ul className="space-y-1.5">
                      <li className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                        <span className="text-[#990202] text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Personal Legal Assistance</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-bold text-gray-700 leading-relaxed">
                        <span className="text-[#990202] text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>1 Kupon Undian iPhone</span>
                      </li>
                    </ul>
                  </div>

                  {/* Extra Bonus */}
                  <div className="space-y-2">
                    <h4 className="text-[9.5px] font-black text-gray-950 tracking-wider uppercase">EXTRA BONUS</h4>
                    <ul className="space-y-1.5">
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Voucher EasyLegal <strong className="font-extrabold text-gray-900">Rp 50.000</strong></span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Dokumen SOP Karyawan</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Dokumen SOP Perusahaan</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Dokumen Kontrak Bisnis</span>
                      </li>
                      <li className="flex items-start text-[12.5px] font-medium text-gray-600 leading-relaxed">
                        <span className="text-emerald-500 text-[13px] mr-2 flex-shrink-0">✓</span>
                        <span>Cek Merek senilai <strong className="font-extrabold text-gray-900">Rp 299.000</strong></span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Cabut%20%26%20Tambah%20KBLI%20(${activeSubTab}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center font-extrabold text-[12.5px] text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl transition-all duration-200 shadow-sm"
                >
                  Pilih Cabut & Tambah
                </a>
              </div>
            </div>
          </div>

          </div>

          {/* Footnote disclaimers */}
          <div className="max-w-[1140px] mx-auto mt-12 bg-white border border-gray-200/60 rounded-2xl p-5 text-[11.5px] text-gray-500 leading-relaxed font-medium text-left">
            <strong className="font-extrabold text-gray-800 mr-1.5">Keterangan:</strong>
            <span>(1) Jika tidak terdapat kendala pada sistem AHU &amp; OSS.</span>
          </div>

        </div>
      </section>

      {/* ─── 5. FAQ SECTION ─── */}
      <FAQ title="Pertanyaan seputar NIB & OSS RBA." subtitle="Belum yakin? Mungkin jawabannya ada di sini." items={faqs} />

      {/* ─── 6. CTA BANNER (Mockup Clean White) ─── */}
      <section className="bg-white py-24 border-t border-gray-100/60 relative">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          {/* Left Column */}
          <div className="space-y-4 max-w-2xl text-left">
            <h2 className="font-inter text-[34px] sm:text-[40px] font-bold leading-tight tracking-tight text-gray-900">
              Siap urus <span className="text-[#990202]">NIB & izin usaha Anda?</span>
            </h2>
            <p className="text-[15px] sm:text-[16px] text-gray-500 leading-relaxed font-medium">
              Konsultasi gratis untuk identifikasi KBLI & tingkat risiko usaha — tanpa komitmen.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-auto flex flex-col gap-3 min-w-[340px] sm:min-w-[360px]">
            {/* Button WhatsApp */}
            <a
              href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Jasa%20Pembuatan%20NIB%20dan%20OSS%20RBA%20perusahaan."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[14.5px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.122.953 11.5.953c-5.439 0-9.859 4.37-9.864 9.8-.001 1.73.457 3.41 1.32 4.927l-.982 3.58 3.673-.956zm11.517-5.595c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.924-2.225-.244-.588-.491-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.116 4.52 1.228.531 2.186.848 2.93 1.083.755.238 1.44.205 1.984.124.606-.091 1.774-.725 2.024-1.425.25-.7.25-1.299.175-1.425-.076-.125-.275-.2-.575-.35z"/>
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>

            {/* Button Hubungi Tim Kami */}
            <a
              href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%2520ingin%2520konsultasi%2520mengenai%2520layanan%2520NIB%2520dan%2520OSS%2520RBA."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-55 text-gray-800 border border-gray-200 hover:border-gray-300 font-extrabold text-[14.5px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Hubungi Tim Kami</span>
              <span className="text-[15px] font-normal">→</span>
            </a>

            {/* Fast Response Badge */}
            <div className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium pt-1 px-1">
              <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Respons dalam 5 menit · Senin–Sabtu 08:00–20:00</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
