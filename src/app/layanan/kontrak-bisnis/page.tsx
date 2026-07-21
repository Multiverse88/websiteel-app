"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Globe,
  Home,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  User,
  Star,
  Activity,
  Download,
  AlertCircle,
  MapPin,
  TrendingUp,
  BookOpen,
  Award,
  Calendar,
  Shield,
  Layers,
  Heart,
  Menu,
  Scale,
  Upload
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import Pricing, { PricingPackage } from "@/components/Pricing";
import PricingFooter from "@/components/PricingFooter";
import MediaCoverage from "@/components/MediaCoverage";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/home/Testimonials";
import { getWhatsAppLink } from "@/lib/config";
import BottomPromoSection from "@/components/home/BottomPromoSection";
import KategoriKontrak from "./KategoriKontrak";
import DokumenPersyaratanKontrak from "./DokumenPersyaratanKontrak";
import PricingKontrak from "./PricingKontrak";

const perjanjianBenefits = [
  {
    icon: <ShieldCheck className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Kepastian Hukum Penuh",
    desc: "Akta Otentik notaris yang didaftarkan resmi ke KUA/Dukcapil, mengikat & diakui pihak ketiga seperti bank dan BPN."
  },
  {
    icon: <User className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Ditangani Ahli Hukum Keluarga",
    desc: "Draf disusun oleh Spesialis Hukum Perdata Keluarga, dijelaskan pasal demi pasal, dengan revisi tanpa batas hingga sepakat."
  },
  {
    icon: <FileText className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Urus Notaris & Registrasi Sekaligus",
    desc: "Dari tanda tangan Akta di hadapan notaris partner hingga registrasi resmi ke KUA/Dukcapil — seluruh proses kami pegang."
  },
  {
    icon: <Shield className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Konsultasi Rahasia & Aman",
    desc: "Diskusi seputar aset, utang, dan kebutuhan pribadi Anda & pasangan dijaga kerahasiaannya oleh tim legal kami."
  }
];

export default function KontrakBisnis() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || isDown) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, isDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    scrollRef.current.style.scrollBehavior = 'auto';
    scrollRef.current.classList.remove("snap-x", "snap-mandatory");
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.classList.add("snap-x", "snap-mandatory");
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (scrollRef.current) {
      scrollRef.current.style.scrollBehavior = 'smooth';
      scrollRef.current.classList.add("snap-x", "snap-mandatory");
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
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
      title: "Konsultasi",
      desc: "Informasikan kebutuhan dokumen hukum Anda. Kami akan membantu menentukan jenis kontrak yang paling sesuai dengan situasi bisnis Anda.",
      points: [
        "Identifikasi jenis kontrak yang dibutuhkan",
        "Pengumpulan data dan dokumen pendukung",
        "Penjelasan hak, kewajiban & risiko hukum",
      ],
    },
    {
      no: "02",
      title: "Analisis & Penawaran",
      desc: "Tim kami menganalisis kebutuhan dan memberikan penawaran harga yang transparan sesuai kompleksitas dokumen yang diperlukan.",
      points: [
        "Analisis kompleksitas dan risiko hukum",
        "Penawaran harga transparan",
        "Konfirmasi timeline pengerjaan",
      ],
    },
    {
      no: "03",
      title: "Penyusunan Draf",
      desc: "Ahli hukum kami menyusun draf dokumen secara detail dengan memperhatikan aspek hukum yang berlaku di Indonesia.",
      points: [
        "Penyusunan pasal demi pasal oleh ahli hukum",
        "Penyesuaian dengan regulasi terkini",
        "Opsi bilingual untuk kebutuhan tertentu",
      ],
    },
    {
      no: "04",
      title: "Review & Finalisasi",
      desc: "Anda review draf dan sampaikan revisi jika ada. Setelah disetujui, dokumen final siap digunakan dan mengikat secara hukum.",
      points: [
        "Penjelasan detail konsekuensi hukum tiap pasal",
        "Revisi gratis sesuai kuota paket",
        "Finalisasi & pengiriman dokumen digital",
      ],
    },
  ];

  const faqs = [
    {
      q: "Apakah Konsultasi awal benar-benar gratis?",
      a: "Ya, konsultasi awal 100% gratis tanpa biaya apapun. Anda dapat menghubungi kami via WhatsApp untuk berdiskusi tentang kebutuhan dokumen hukum Anda. Kami akan memberikan saran profesional dan penawaran harga yang transparan sebelum Anda memutuskan."
    },
    {
      q: "Berapa lama waktu penyelesaian dokumen?",
      a: "Untuk dokumen standar seperti NDA atau surat kuasa, biasanya 3-5 hari kerja. Untuk dokumen yang lebih kompleks seperti Shareholder Agreement atau Franchise Agreement, memerlukan waktu 7-14 hari kerja. Tersedia juga layanan Express (2 hari) dan Super Express (1 hari) dengan biaya tambahan."
    },
    {
      q: "Apa dokumen yang dibuat sah secara hukum?",
      a: "Ya, semua dokumen disusun sesuai peraturan perundang-undangan yang berlaku di Indonesia dan sah secara hukum. Dokumen dibuat oleh tim ahli hukum berpengalaman dan dapat dijadikan alat bukti yang kuat di pengadilan jika diperlukan."
    },
    {
      q: "Apakah bisa request revisi?",
      a: "Tentu. Setiap paket sudah termasuk 2x revisi gratis. Revisi tambahan setelah kuota gratis dikenakan biaya Rp 249.000 per revisi. Revisi major yang mengubah substansi perjanjian dikenakan biaya tambahan sesuai tingkat kompleksitas."
    },
    {
      q: "Bagaimana jika saya tidak yakin jenis kontrak yang dibutuhkan?",
      a: "Tidak perlu khawatir. Silakan hubungi kami untuk konsultasi gratis. Cukup ceritakan situasi dan kebutuhan bisnis Anda, tim ahli hukum kami akan membantu menentukan jenis kontrak yang paling sesuai."
    }
  ];


  

  return (
    <div className="has-service-cta flex flex-col min-h-screen bg-[#FCFBFA] text-gray-900 font-sans">

      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white pt-8 lg:pt-12 py-8 sm:py-8 sm:py-8 sm:py-20 border-b border-gray-200/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">

              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[16px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[16px] font-bold text-gray-900">Kontrak Bisnis</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-4 rounded-full border border-red-100 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[16px] sm:text-[16px] sm:text-[16px] font-bold text-[#990202] tracking-wide">Kontrak Bisnis</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-[42px] sm:text-[50px] lg:text-[54px] font-extrabold text-gray-950 leading-[1.15] tracking-tight">
                Lindungi setiap kerja sama bisnis dengan <span className="text-[#990202]">kontrak yang kuat</span>
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                Jasa pembuatan kontrak & perjanjian profesional untuk bisnis, UMKM, dan individu. Disusun oleh ahli hukum berpengalaman, sah secara hukum, dan sesuai regulasi yang berlaku di Indonesia.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai layanan Kontrak Bisnis.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[16px] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer gap-2"
                >
                  Konsultasi Gratis <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center px-7 py-4 border border-gray-250 text-gray-800 font-extrabold text-[16px] rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Lihat Paket Harga
                </a>
              </div>

              {/* Checkpoints Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-[620px]">
                {/* Checkpoint 1 */}
                <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-transparent">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[16px] font-black text-gray-950">3–5 Hari</div>
                    <div className="text-[16px] text-gray-500 font-semibold">Dokumen standar</div>
                  </div>
                </div>

                {/* Checkpoint 2 */}
                <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-transparent">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[16px] font-black text-gray-950">Ahli Hukum</div>
                    <div className="text-[16px] text-gray-500 font-semibold">Tim penyusun</div>
                  </div>
                </div>

                {/* Checkpoint 3 */}
                <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-transparent">
                  <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                    <Upload className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[16px] font-black text-gray-950">100% Online</div>
                    <div className="text-[16px] text-gray-500 font-semibold">Tanpa keluar rumah</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group aspect-[1.1] sm:aspect-square lg:aspect-[1.1] w-full max-w-[460px]">
                <Image
                  src="/images/layanan/kontrak-bisnis-1.jpg"
                  alt="Kontrak Bisnis"
                  fill
                  sizes="(max-width: 768px) 100vw, 460px"
                  className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                />

                {/* Floating Badge 1: Top Left */}
                <div className="absolute top-8 left-4 bg-white rounded-xl py-2.5 px-3.5 shadow-xl flex items-center space-x-2.5 w-[200px] z-20">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-[#990202]" strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <div className="text-[16px] font-black text-gray-900 leading-none uppercase">Legal Drafting</div>
                    <div className="text-[16px] text-gray-500 font-medium mt-1">Sah secara hukum</div>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Right */}
                <div className="absolute bottom-8 right-4 bg-white rounded-xl py-2.5 px-3.5 shadow-xl flex items-center space-x-2.5 w-[220px] z-20">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-[#990202]" strokeWidth={3.5} />
                  </div>
                  <div className="text-left">
                    <div className="text-[16px] font-black text-gray-900 leading-none">Personal Legal Assistant</div>
                    <div className="text-[16px] text-gray-500 font-medium mt-1">Dibantu tim profesional</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>



      {/* ─── 2. MEDIA COVERAGE SECTION ─── */}
      <MediaCoverage />

      {/* ─── 3. BENEFITS SECTION ─── */}
      <Benefits
        sectionTitleTag="KEUNGGULAN KAMI"
        sectionTitle="Mengapa Pilih EasyLegal?"
        items={perjanjianBenefits}
      />

      {/* ─── 4. HARGA & PAKET SECTION ─── */}
      <BottomPromoSection />
      <PricingKontrak />

      {/* ─── 4.5 KATEGORI KONTRAK SECTION ─── */}
      <KategoriKontrak />

      {/* ─── 4.7 DOKUMEN PERSYARATAN SECTION ─── */}
      <DokumenPersyaratanKontrak />

      {/* ─── 5. ALUR PROSES SECTION ─── */}
      <section className="bg-[#FAF9F7] py-8 sm:py-8 sm:py-20 border-b border-gray-200/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-20 space-y-3">
            <p className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.22em] font-sans">ALUR PROSES PEMBUATAN DOKUMEN</p>
            <h2 className="font-heading text-[16px] sm:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Alur kerja dari konsultasi sampai dokumen final
            </h2>
            <p className="text-[16px] sm:text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Tim ahli hukum kami pegang seluruh tahapan. Anda cukup sampaikan kebutuhan dan review hasilnya.
            </p>
            {/* Scroll indicator text */}
            <div className="pt-4 text-[16px] font-black text-[#990202] tracking-widest uppercase flex items-center justify-center gap-1.5 animate-pulse">
              <span>Geser untuk lihat semua langkah</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
          </div>

          {/* Horizontal Scrollable Row */}
          <div 
            className="relative max-w-[1240px] mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            <div 
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex overflow-x-auto gap-6 pb-8 pt-8 -mx-4 px-4 sm:-mx-8 sm:px-8 scrollbar-thin scrollbar-thumb-red-600/20 scrollbar-track-transparent snap-x snap-mandatory relative z-10 ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
            >
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col min-w-[280px] sm:min-w-[320px] max-w-[320px] group snap-start pt-5">
                  
                  {/* Number Badge (Centered on top border) */}
                  <div className="absolute top-0 left-6 w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border-2 border-[#990202] text-[#990202] bg-white flex items-center justify-center font-black text-[16px] z-20 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {step.no}
                  </div>
                  
                  {/* Card Container */}
                  <div className="bg-white rounded-[24px] py-6 px-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-350 flex flex-col justify-between flex-grow text-left h-full relative">
                    <div className="space-y-3">
                      
                      {/* Title */}
                      <h4 className="text-[16px] sm:text-[16px] font-black text-gray-950 leading-tight pt-2">
                        {step.title}
                      </h4>
                      


                      {/* Description */}
                      <p className="text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />

                    </div>

                    <div>
                      {/* Dotted Divider */}
                      <div className="border-t border-dashed border-gray-200 my-4"></div>

                      {/* Checklist */}
                      <ul className="space-y-2">
                        {step.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start text-[16px] sm:text-[16px] font-medium text-gray-500 leading-snug">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 mr-2.5 flex-shrink-0"></div>
                            <span dangerouslySetInnerHTML={{ __html: point }} />
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ─── 8.5 PENGERTIAN SECTION ─── */}
      <section className="py-8 sm:py-20 bg-white border-b border-gray-200/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="mb-8 sm:mb-12">
            <span className="text-[16px] font-extrabold text-[#990202] uppercase tracking-[0.1em]">
              PENGERTIAN
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-black text-gray-950 mt-2 mb-4 tracking-tight leading-tight">
              Apa itu Kontrak & Perjanjian?
            </h2>
            <p className="text-[16px] sm:text-[16px] text-gray-600 max-w-3xl leading-relaxed">
              Kontrak & perjanjian adalah dokumen hukum tertulis yang mengatur hak, kewajiban, dan tanggung jawab para pihak dalam suatu hubungan bisnis atau transaksi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pb-8">
            {/* Left Image */}
            <div className="relative">
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden">
                <Image
                  src="/images/layanan/kontrak-bisnis-1.jpg"
                  alt="Menandatangani kontrak bisnis"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 left-8 sm:left-12 bg-white rounded-2xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] max-w-[320px] border border-gray-100 flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#990202] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                   <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-gray-950 text-[16px] mb-2">Dasar Hukum</h4>
                  <div className="space-y-3">
                    <p className="text-[16px] text-gray-500 leading-tight">Pasal 1313 KUHPerdata tentang definisi perjanjian</p>
                    <p className="text-[16px] text-gray-500 leading-tight">Pasal 1320 KUHPerdata tentang syarat sahnya perjanjian</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Blocks */}
            <div className="space-y-8 lg:pt-4">
              <div>
                <h3 className="text-[16px] sm:text-[16px] font-bold text-gray-950 mb-2.5">
                  Kontrak & Perjanjian Bisnis
                </h3>
                <p className="text-[16px] sm:text-[16px] text-gray-600 leading-relaxed">
                  Dokumen yang memperjelas hak dan kewajiban para pihak secara profesional, meminimalkan risiko sengketa, serta memberikan kepastian hukum dalam setiap transaksi dan kolaborasi bisnis. Dapat dijadikan alat bukti kuat di pengadilan jika diperlukan.
                </p>
              </div>
              <div>
                <h3 className="text-[16px] sm:text-[16px] font-bold text-gray-950 mb-2.5">
                  Manfaat Kontrak yang Kuat
                </h3>
                <p className="text-[16px] sm:text-[16px] text-gray-600 leading-relaxed">
                  (1) Kepastian hukum bagi semua pihak, (2) Perlindungan hak dan kewajiban yang jelas, (3) Mencegah sengketa di kemudian hari, (4) Menjadi bukti otentik di pengadilan, (5) Meningkatkan profesionalisme dan kredibilitas bisnis.
                </p>
              </div>
              <div>
                <h3 className="text-[16px] sm:text-[16px] font-bold text-gray-950 mb-2.5">
                  Jenis Dokumen yang Bisa Dibuat
                </h3>
                <p className="text-[16px] sm:text-[16px] text-gray-600 leading-relaxed">
                  Meliputi perjanjian ketenagakerjaan, kontrak komersial, MoU, surat kuasa, NDA, perjanjian lisensi, shareholders agreement, franchise agreement, terms & conditions website, serta kontrak khusus sesuai kebutuhan spesifik Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* ─── 8. TESTIMONIALS SECTION ─── */}
      <Testimonials />


      {/* ─── 9. FAQ SECTION ─── */}
      <FAQ 
        items={faqs} 
        title="Pertanyaan yang Sering Ditanyakan"
        subtitle="Sebelum mulai, mungkin jawabannya sudah ada di sini."
      />

      {/* ─── 10. CTA SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-12 text-left">

          {/* Left Column */}
          <div className="space-y-3.5 max-w-2xl">
            <h2 className="font-heading text-[16px] sm:text-[40px] font-extrabold leading-tight tracking-tight text-[#141414]">
              Siap lindungi <span className="text-[#990202]">aset pribadi?</span>
            </h2>
            <p className="text-[16px] sm:text-[16px] text-[#5E5E5E] leading-relaxed font-normal">
              Konsultasi gratis dengan tim hukum keluarga — pilih paket yang sesuai &amp; mulai proses tanpa komitmen.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-auto flex flex-col gap-3.5 min-w-[320px] sm:min-w-[360px] max-w-[400px]">
            {/* WhatsApp Action */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai layanan Perjanjian Perkawinan.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 px-6 py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[16px] rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-red-950/5"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.122.953 11.5.953c-5.439 0-9.859 4.37-9.864 9.8-.001 1.73.457 3.41 1.32 4.927l-.982 3.58 3.673-.956zm11.517-5.595c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.924-2.225-.244-.588-.491-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.116 4.52 1.228.531 2.186.848 2.93 1.083.755.238 1.44.205 1.984.124.606-.091 1.774-.725 2.024-1.425.25-.7.25-1.299.175-1.425-.076-.125-.275-.2-.575-.35z" />
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>

            {/* Hubungi Tim Kami Action */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi dengan tim spesialis hukum perjanjian.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-55 text-gray-900 shadow-md border border-black/[0.04] hover:border-gray-300 font-extrabold text-[16px] rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
            >
              <span>Hubungi Tim Kami</span>
              <span className="text-[16px] font-bold">→</span>
            </a>

            {/* Response Info */}
            <div className="flex items-center justify-center gap-1.5 text-[16px] sm:text-[16px] text-[#5E5E5E] font-medium pt-1 px-1">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Konsultasi rahasia · Senin–Sabtu 08:00–20:00</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
