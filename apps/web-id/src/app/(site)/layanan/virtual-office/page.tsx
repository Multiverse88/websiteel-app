"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Clock,
  DollarSign,
  Building,
  ShieldCheck,
  Check,
  Home,
  Star,
  MapPin,
  UserCheck,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Activity,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Offices from "@/components/Offices";
import Pricing, { PricingPackage } from "@/components/Pricing";
import { getWhatsAppLink } from "@/lib/config";
import BottomPromoSection from "@/components/home/BottomPromoSection";
import MediaCoverage from "@/components/MediaCoverage";
import TrustStatsBar from "@/components/TrustStatsBar";
import Testimonials from "@/components/home/Testimonials";
import ArtikelTerkait from "@/components/ArtikelTerkait";


const locationsData = [
  {
    id: "bandung",
    title: "VO Bandung — EasyBuilding",
    subtitle: "Alamat prestisius di jantung area komersial Bandung, dengan fasilitas lengkap & harga paling terjangkau di antara 3 lokasi kami.",
    image: "/images/virtual-office/bandung.jpg",
    cardTitle: "EasyOffice Bandung",
    cardSubtitle: "Cihampelas, Coblong",
    address: "Jl. Cihampelas No. 201A, RT/RW 01/02 Cipaganti, Kec Coblong, Kota Bandung, Jawa Barat 40131",
    whatsappLink: getWhatsAppLink("Halo EasyOffice Bandung, saya ingin tanya mengenai Virtual Office.", "vo-tanya-bandung"),
  },
  {
    id: "bekasi",
    title: "VO Bekasi — Summarecon",
    subtitle: "Berlokasi di kawasan strategis Kota Bekasi dengan alamat bisnis prestisius, layanan pengelolaan surat, dan akses ruang meeting eksklusif.",
    image: "/images/virtual-office/bekasi.jpg",
    cardTitle: "EasyOffice Bekasi",
    cardSubtitle: "Summarecon, Bekasi",
    address: "Emerald Commercial Summarecon Bekasi Blok UF No. 10\nJl. Bulevar Selatan, Marga Mulya, Bekasi Utara, Kota Bekasi, Jawa Barat 17142",
    whatsappLink: getWhatsAppLink("Halo EasyOffice Bekasi, saya ingin tanya mengenai Virtual Office.", "vo-tanya-bekasi"),
  },
  {
    id: "jakarta",
    title: "VO Jakarta — Sovereign Plaza",
    subtitle: "Alamat bisnis prestisius, resepsionis profesional, ruang meeting, dan dukungan legal dalam satu layanan yang terjangkau.",
    image: "/images/virtual-office/jakarta.jpg",
    cardTitle: "EasyOffice Jakarta",
    cardSubtitle: "Cilandak, Jakarta Selatan",
    address: "Dewata Office, Sovereign Plaza, 12th Floor\nJl. TB Simatupang No. 36, Cilandak Barat, Cilandak, Jakarta Selatan 12430",
    whatsappLink: getWhatsAppLink("Halo EasyOffice Jakarta, saya ingin tanya mengenai Virtual Office.", "vo-tanya-jakarta"),
  },
];

export default function VirtualOffice() {
  const [activeLocIdx, setActiveLocIdx] = useState(0);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pricingPackages: PricingPackage[] = [
    {
      title: "EASYOFFICE JAKARTA",
      price: "Rp3.500.000",
      subLabel: "PER TAHUN · CILANDAK, JAKARTA SELATAN",
      buttonText: "Pilih Jakarta",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan EasyOffice Jakarta.", "vo-tertarik-jakarta"),
      groups: [
        {
          title: "ALAMAT LENGKAP",
          items: [
            { text: "Sovereign Plaza 12th Floor, Jl. TB Simatupang No. 36, Cilandak Barat", checked: true }
          ]
        },
        {
          title: "FASILITAS OFFICE",
          items: [
            { text: "Alamat komersial & domisili gedung", checked: true },
            { text: "Dapat digunakan untuk PKP", checked: true },
            { text: "Meeting Room (70 jam/tahun)", checked: true },
            { text: "LED Smart TV & WiFi High Speed", checked: true },
            { text: "Resepsionis Profesional", checked: true }
          ]
        },
        {
          title: "LEGALITAS GEDUNG",
          items: [
            { text: "IMB (Izin Mendirikan Bangunan)", checked: true },
            { text: "PBB (Pajak Bumi & Bangunan)", checked: true },
            { text: "Surat perjanjian sewa & domisili", checked: true }
          ]
        },
        {
          title: "AKSES TRANSPORTASI",
          isBoxed: true,
          items: [
            { text: "Dekat exit tol TB Simatupang", checked: true },
            { text: "5 menit dari MRT Cipete Raya", checked: true }
          ]
        }
      ]
    },
    {
      title: "EASYOFFICE BANDUNG",
      price: "Rp1.500.000",
      subLabel: "PER TAHUN · CIHAMPELAS, BANDUNG",
      isPopular: true,
      badgeText: "PALING POPULER",
      buttonText: "Pilih Bandung",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan EasyOffice Bandung.", "vo-tertarik-bandung"),
      groups: [
        {
          title: "ALAMAT LENGKAP",
          items: [
            { text: "Jl. Cihampelas No. 201A, RT/RW 01/02 Cipaganti, Coblong, Bandung 40131", checked: true }
          ]
        },
        {
          title: "FASILITAS OFFICE",
          items: [
            { text: "Alamat komersial & domisili gedung", checked: true },
            { text: "Dapat digunakan untuk PKP", checked: true },
            { text: "Meeting Room (70 jam/tahun)", checked: true },
            { text: "LED Smart TV & WiFi High Speed", checked: true },
            { text: "Resepsionis profesional", checked: true }
          ]
        },
        {
          title: "LEGALITAS GEDUNG",
          items: [
            { text: "IMB (Izin Mendirikan Bangunan)", checked: true },
            { text: "PBB (Pajak Bumi & Bangunan)", checked: true },
            { text: "Surat perjanjian sewa & domisili", checked: true }
          ]
        },
        {
          title: "AKSES TRANSPORTASI",
          isBoxed: true,
          items: [
            { text: "Pusat Cihampelas, dekat factory outlet", checked: true },
            { text: "10 menit ke Jl. Setiabudi & Dago", checked: true }
          ]
        }
      ]
    },
    {
      title: "EASYOFFICE BEKASI",
      price: "Rp2.500.000",
      subLabel: "PER TAHUN · SUMMARECON, BEKASI",
      buttonText: "Pilih Bekasi",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan EasyOffice Bekasi.", "vo-tertarik-bekasi"),
      groups: [
        {
          title: "ALAMAT LENGKAP",
          items: [
            { text: "Emerald Commercial, Summarecon Bekasi, Jawa Barat", checked: true }
          ]
        },
        {
          title: "FASILITAS OFFICE",
          items: [
            { text: "Alamat komersial & domisili gedung", checked: true },
            { text: "Dapat digunakan untuk PKP", checked: true },
            { text: "Meeting Room (70 jam/tahun)", checked: true },
            { text: "LED Smart TV & WiFi High Speed", checked: true },
            { text: "Resepsionis profesional", checked: true }
          ]
        },
        {
          title: "LEGALITAS GEDUNG",
          items: [
            { text: "IMB (Izin Mendirikan Bangunan)", checked: true },
            { text: "PBB (Pajak Bumi & Bangunan)", checked: true },
            { text: "Surat perjanjian sewa & domisili", checked: true }
          ]
        },
        {
          title: "AKSES TRANSPORTASI",
          isBoxed: true,
          items: [
            { text: "Akses tol Bekasi Barat", checked: true },
            { text: "5 menit ke Summarecon Mall", checked: true }
          ]
        }
      ]
    }
  ];

  const faqs = [
    {
      q: "Apakah Virtual Office bisa dipakai untuk pendirian PT?",
      a: "<strong>Bisa.</strong> Semua lokasi EasyOffice sudah dilengkapi <strong>IMB, PBB, & legalitas gedung lengkap</strong> sehingga bisa dipakai sebagai domisili resmi untuk pendirian PT, CV, NPWP, NIB OSS, hingga PKP. Kami juga sertakan surat domisili 1 tahun & surat perjanjian sewa untuk lampiran pendaftaran."
    },
    {
      q: "Apakah Virtual Office bisa untuk PKP (Pengusaha Kena Pajak)?",
      a: "<strong>Bisa.</strong> Alamat kami berada di zonasi perkantoran yang sah dan memiliki legalitas lengkap (IMB, PBB, Izin Operasional), memenuhi syarat verifikasi lapangan dari Kantor Pelayanan Pajak (KPP) untuk pengajuan PKP Anda."
    },
    {
      q: "Berapa lama proses aktivasi Virtual Office?",
      a: "Proses aktivasi sangat cepat. Setelah pembayaran dikonfirmasi dan dokumen persyaratan lengkap diterima, draf surat perjanjian sewa akan selesai dalam <strong>1-2 jam</strong>, dan dokumen fisik/asli dapat diambil atau dikirimkan ke alamat Anda pada hari yang sama."
    },
    {
      q: "Apa yang termasuk dalam meeting room 70 jam/tahun?",
      a: "Akses ke ruang meeting modern berkapasitas 6-8 orang di lokasi pilihan Anda. Ruangan sudah dilengkapi fasilitas <strong>LED Smart TV</strong>, papan tulis, AC, WiFi berkecepatan tinggi, air mineral gratis, serta bantuan dari resepsionis kami."
    },
    {
      q: "Bisakah pindah atau upgrade lokasi office?",
      a: "<strong>Bisa.</strong> Anda dapat mengajukan permohonan pindah lokasi atau upgrade ke paket/lokasi lain. Tim kami akan membantu pengurusan dokumen perubahan alamat atau addendum perjanjian sewa yang baru."
    },
    {
      q: "Apakah ada kontrak minimum berapa tahun?",
      a: "Kontrak minimum untuk penggunaan alamat Virtual Office adalah <strong>1 tahun</strong>. Kami menawarkan opsi perpanjangan tahunan dengan harga tetap yang kompetitif tanpa biaya tersembunyi."
    },
    {
      q: "Bagaimana dengan penerimaan surat & paket?",
      a: "Setiap surat atau paket yang masuk untuk perusahaan Anda akan diterima oleh resepsionis profesional kami. Kami akan melakukan pencatatan dan segera mengirimkan <strong>notifikasi instan via WhatsApp/Email</strong> beserta foto amplop/paket tersebut."
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-[25px]">
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative py-8 sm:py-8 sm:py-8 sm:py-20 overflow-hidden bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[16px] sm:text-[16px] text-gray-600 pt-0 pb-1 mb-1 font-medium relative -top-[50px]">
            <Link href="/home-gads" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Home className="w-3.5 h-3.5 text-gray-600" />
              <span>Beranda</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <Link href="/layanan" className="hover:text-gray-900 transition-colors">Layanan</Link>
            <ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="font-bold text-gray-800">Virtual Office</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-[50%] text-left">
              <div 
                className="animate-fade-in-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FEE2E2] mb-4 sm:mb-6"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
                <span className="text-[16px] sm:text-[16px] font-extrabold text-[#B91C1C]">Virtual Office EasyLegal</span>
              </div>

              <h1 
                className="animate-fade-in-up font-heading text-[26px] sm:text-[48px] lg:text-[54px] font-black text-gray-950 leading-[1.2] sm:leading-[1.12] tracking-tight"
                style={{ animationDelay: "0.1s" }}
              >
                Alamat kantor prestisius agar<br />
                <span className="text-[#990202]">bisnis semakin terlihat serius.</span>
              </h1>

              <p 
                className="animate-fade-in-up text-[16px] sm:text-[16px] text-gray-500 mt-4 sm:mt-5 leading-relaxed max-w-[580px] font-medium font-sans"
                style={{ animationDelay: "0.2s" }}
              >
                Dapatkan alamat komersial di Bandung, Jakarta, &amp; Bekasi untuk legalitas PT, NPWP, hingga PKP &mdash; lengkap dengan resepsionis, meeting room, &amp; layanan surat-menyurat. Mulai dari Rp1jt/tahun.
              </p>

              <div 
                className="animate-fade-in-up flex flex-row gap-3 mt-6 sm:mt-8"
                style={{ animationDelay: "0.3s" }}
              >
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai Virtual Office.", "vo-konsultasi")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3.5 sm:py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold rounded-xl text-[16px] sm:text-[16px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5 sm:gap-2"
                >
                  <span>Konsultasi Gratis</span>
                  <svg className="w-3.5 h-3.5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <button
                  onClick={scrollToPricing}
                  className="flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3.5 sm:py-4 bg-white shadow-md border border-black/[0.04] text-gray-800 hover:bg-gray-50 hover:border-gray-300 font-extrabold rounded-xl text-[16px] sm:text-[16px] shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                >
                  Lihat Lokasi Office
                </button>
              </div>

              {/* Bottom Features */}
              <div 
                className="animate-fade-in-up grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-24 pt-0"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 text-[#990202]">
                    <MapPin className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[16px] sm:text-[16px] font-extrabold text-gray-950">3 Kota</div>
                    <div className="text-[16px] sm:text-[16px] text-gray-600 font-medium">Bandung &middot; Jakarta &middot; Bekasi</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 text-[#990202]">
                    <Clock className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="text-[16px] sm:text-[16px] font-extrabold text-gray-950">70 jam/tahun</div>
                    <div className="text-[16px] sm:text-[16px] text-gray-600 font-medium">Meeting room gratis</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FEF2F2] flex items-center justify-center flex-shrink-0 text-[#990202]">
                    <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#990202]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <rect x="8" y="8" width="8" height="8" rx="1" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[16px] sm:text-[16px] font-extrabold text-gray-950">PKP-friendly</div>
                    <div className="text-[16px] sm:text-[16px] text-gray-600 font-medium">Legalitas lengkap</div>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="animate-fade-in lg:w-[50%] relative mt-8 lg:mt-0"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Main Image Container */}
              <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-10 aspect-square">
                <Image
                  src="/images/virtual-office/main.jpg"
                  alt="Virtual Office Meeting Room"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover"
                />
              </div>

              {/* Top Overlay Card */}
              <div className="absolute top-16 left-[-20px] sm:left-[-48px] z-20 hidden sm:flex items-center gap-4 p-4.5 bg-white rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] max-w-[245px] hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building className="w-5.5 h-5.5 text-[#990202]" />
                </div>
                <div>
                  <div className="text-[16px] font-extrabold text-gray-950 leading-tight">Alamat Komersial</div>
                  <div className="text-[16px] text-gray-500 font-medium mt-1">Pakai untuk PT, NPWP, PKP</div>
                </div>
              </div>

              {/* Bottom Overlay Card */}
              <div className="absolute bottom-[76px] right-0 sm:right-4 z-20 hidden sm:flex items-center gap-4 p-4.5 bg-white rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] max-w-[265px] hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5.5 h-5.5 text-amber-600" />
                </div>
                <div>
                  <div className="text-[16px] font-extrabold text-gray-950 leading-tight">IMB &amp; PBB Lengkap</div>
                  <div className="text-[16px] text-gray-500 font-medium mt-1">Legalitas gedung terverifikasi</div>
                </div>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -top-10 -right-10 w-[300px] h-[300px] bg-red-500/5 blur-[100px] rounded-full" />
              <div className="absolute bottom-[76px]0 -left-10 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. MEDIA COVERAGE SECTION ─── */}
      <TrustStatsBar />

      {/* ─── 3. ABOUT VIRTUAL OFFICE SECTION ─── */}
      <section className="py-8 sm:py-8 sm:py-8 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

          {/* Section Header */}
          <div 
            className="animate-fade-in-up text-left mb-6 sm:mb-5 sm:mb-10"
          >
            <p className="text-[16px] sm:text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-1.5 sm:mb-3">TENTANG VIRTUAL OFFICE</p>
            <h2 className="font-heading text-[16px] sm:text-[38px] font-black text-gray-950 leading-[1.25] sm:leading-tight tracking-tight">
              Apa itu Virtual Office?
            </h2>
            <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed mt-2.5 sm:mt-3 max-w-2xl font-medium">
              Solusi alamat bisnis profesional di kota besar &mdash; tanpa biaya sewa kantor fisik, tanpa kompromi legalitas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">

            {/* Left Column: Image & Floating Card */}
            <div 
              className="animate-fade-in-up lg:col-span-6 relative h-[400px] lg:h-auto"
            >
              <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] h-full w-full">
                <Image
                  src="/images/virtual-office/interior.jpg"
                  alt="Cozy Virtual Office Seating Area"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />

                {/* Floating Card */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-white/20 w-max max-w-[calc(100%-2rem)] sm:max-w-[320px] flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30">
                    <Building className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <div className="text-[14px] sm:text-[15px] font-extrabold text-gray-950 leading-tight">3 Lokasi Strategis</div>
                      <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex gap-0.5 text-emerald-600">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-[12px] sm:text-[13px] text-gray-600 font-semibold leading-relaxed">Jakarta &middot; Bandung &middot; Bekasi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Paragraphs & Checklist */}
            <div 
              className="animate-fade-in-up lg:col-span-6 space-y-4 sm:space-y-6"
            >
              <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed font-medium">
                <strong className="font-extrabold text-gray-900">Virtual Office</strong> adalah layanan alamat kantor komersial yang dapat Anda pakai sebagai domisili resmi untuk PT, NPWP, NIB, hingga PKP &mdash; tanpa harus menyewa ruang fisik penuh.
              </p>
              <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed font-medium">
                Berbeda dengan menyewa kantor konvensional, Virtual Office memberi Anda <strong className="font-extrabold text-gray-900">alamat prestisius</strong> di lokasi bisnis utama dengan biaya jauh lebih efisien &mdash; lengkap dengan fasilitas pendukung seperti meeting room, resepsionis, &amp; penerimaan surat.
              </p>

              <div>
                <h3 className="text-[16px] sm:text-[16px] font-black text-gray-950 mt-6 sm:mt-8 mb-3 sm:mb-4">Karakteristik Virtual Office</h3>
                <ul className="space-y-2.5 sm:space-y-3.5">
                  <li className="flex items-start gap-2.5 sm:gap-3.5 text-[16px] sm:text-[16px] sm:text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-500 mt-0.5">
                      <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                    </div>
                    <div>
                      <strong className="font-extrabold text-gray-900">Alamat komersial resmi</strong> &mdash; bisa dipakai untuk domisili PT/CV, NPWP, NIB, &amp; PKP.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3.5 text-[16px] sm:text-[16px] sm:text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-500 mt-0.5">
                      <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                    </div>
                    <div>
                      <strong className="font-extrabold text-gray-900">Legalitas gedung lengkap</strong> &mdash; IMB, PBB, &amp; izin operasional terverifikasi.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3.5 text-[16px] sm:text-[16px] sm:text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-500 mt-0.5">
                      <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                    </div>
                    <div>
                      <strong className="font-extrabold text-gray-900">Fasilitas pendukung</strong> &mdash; meeting room, resepsionis, WiFi, &amp; layanan surat-menyurat.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3.5 text-[16px] sm:text-[16px] sm:text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-500 mt-0.5">
                      <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                    </div>
                    <div>
                      <strong className="font-extrabold text-gray-900">Hemat hingga 90%</strong> &mdash; dibanding sewa kantor konvensional di area yang sama.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. MANFAAT SECTION ─── */}
      <section className="py-8 sm:py-8 sm:py-8 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">

          {/* Section Header */}
          <div 
            className="animate-fade-in-up text-center mb-6 sm:mb-6 sm:mb-12"
          >
            <p className="text-[16px] sm:text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-1.5 sm:mb-3">MANFAAT VIRTUAL OFFICE</p>
            <h2 className="font-heading text-[16px] sm:text-[38px] font-black text-gray-950 leading-[1.25] sm:leading-tight tracking-tight">
              Kenapa pebisnis modern pilih Virtual Office?
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

            {/* Card 1 */}
            <div 
              className="animate-fade-in-up bg-[#F9FAFB] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 sm:p-8 rounded-2xl sm:rounded-[24px] flex flex-col items-start text-left hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:bg-white transition-all duration-300"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center text-[#990202] mb-4 sm:mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                <MapPin className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-[16px] sm:text-[16px] sm:text-[16px] font-extrabold text-gray-950 mb-2 sm:mb-3.5">Alamat Prestisius</h3>
              <p className="text-[16px] sm:text-[16px] sm:text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed font-sans">
                Lokasi strategis di pusat bisnis kota besar - tingkatkan citra profesional di mata klien &amp; partner.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              className="animate-fade-in-up bg-[#F9FAFB] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 sm:p-8 rounded-2xl sm:rounded-[24px] flex flex-col items-start text-left hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:bg-white transition-all duration-300"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center text-[#990202] mb-4 sm:mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                <DollarSign className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-[16px] sm:text-[16px] sm:text-[16px] font-extrabold text-gray-950 mb-2 sm:mb-3.5">Hemat Biaya</h3>
              <p className="text-[16px] sm:text-[16px] sm:text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed font-sans">
                Mulai Rp1jt/tahun saja - jauh lebih murah dari sewa kantor konvensional yang ratusan juta/tahun.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              className="animate-fade-in-up bg-[#F9FAFB] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 sm:p-8 rounded-2xl sm:rounded-[24px] flex flex-col items-start text-left hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:bg-white transition-all duration-300"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center text-[#990202] mb-4 sm:mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                <Star className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-[16px] sm:text-[16px] sm:text-[16px] font-extrabold text-gray-950 mb-2 sm:mb-3.5">Dukungan Legalitas</h3>
              <p className="text-[16px] sm:text-[16px] sm:text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed font-sans">
                Sudah PKP-friendly &amp; punya semua dokumen legalitas - siap dipakai pendirian PT, NPWP, hingga izin OSS.
              </p>
            </div>

            {/* Card 4 */}
            <div 
              className="animate-fade-in-up bg-[#F9FAFB] shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-5 sm:p-8 rounded-2xl sm:rounded-[24px] flex flex-col items-start text-left hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:bg-white transition-all duration-300"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl flex items-center justify-center text-[#990202] mb-4 sm:mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                <Calendar className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-[16px] sm:text-[16px] sm:text-[16px] font-extrabold text-gray-950 mb-2 sm:mb-3.5">Meeting Room Gratis</h3>
              <p className="text-[16px] sm:text-[16px] sm:text-[16px] sm:text-[16px] text-gray-500 font-medium leading-relaxed font-sans">
                70 jam meeting room gratis per tahun - bisa pakai LED Smart TV, WiFi high-speed, &amp; resepsionis.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 5. PRICING SECTION ─── */}
      <Pricing
        sectionTitleTag="PILIH PAKET OFFICE"
        sectionTitle="Pilih paket virtual office sesuai kebutuhan Anda."
        sectionSubtitle={<>Harga sudah include semua fasilitas dasar &mdash; alamat komersial, meeting room 70 jam/tahun, WiFi high-speed, dan layanan surat. <strong className="font-extrabold text-gray-950">Bisa langsung dipakai untuk pendirian PT/CV &amp; PKP.</strong></>}
        packages={pricingPackages}
        footnotes={[]}
        hideFooter={true}
      />

      {/* ─── OFFICES ─── */}
      <Offices />

      {/* ─── 6. DETAIL LOKASI SECTION ─── */}
      <section className="py-8 sm:py-8 sm:py-8 sm:py-20 bg-[#F9FAFB] border-b border-gray-100 overflow-hidden relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative">
          
          {/* Section Header */}
          <div className="animate-fade-in-up text-center max-w-3xl mx-auto mb-8 sm:mb-8 sm:mb-16">
            <p className="text-[16px] sm:text-[16px] font-black text-[#990202] uppercase tracking-[0.2em] mb-1.5 sm:mb-3">DETAIL LOKASI</p>
            <h2 className="font-heading text-[16px] sm:text-[38px] font-black text-gray-950 leading-[1.25] sm:leading-tight tracking-tight">
              3 Lokasi Strategis Pilihan
            </h2>
            <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed mt-2 sm:mt-4 font-medium font-sans">
              Geser untuk melihat detail dari masing-masing cabang Virtual Office kami.
            </p>
            
            {/* Slider Tabs/Dots */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              {locationsData.map((loc, idx) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocIdx(idx)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[16px] sm:text-[16px] font-extrabold transition-all duration-300 ${
                    activeLocIdx === idx
                      ? "bg-[#990202] text-white shadow-md"
                      : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {loc.cardTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Slider Content */}
          <div className="relative">
            {locationsData.map((loc, idx) => (
              <div 
                key={loc.id} 
                className={`transition-all duration-500 ease-in-out ${
                  activeLocIdx === idx 
                    ? "opacity-100 transform translate-x-0 relative z-10" 
                    : "opacity-0 absolute inset-0 pointer-events-none transform translate-x-8"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  {/* Left Column: Image & Floating Card */}
                  <div className="lg:col-span-6 relative">
                    <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] z-10 aspect-[4/3]">
                      <Image
                        src={loc.image}
                        alt={loc.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover"
                      />
                      {/* Floating Card */}
                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-white/20 w-max max-w-[calc(100%-2rem)] sm:max-w-[300px] flex items-center gap-3 sm:gap-4 hover:scale-105 transition-transform duration-300">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 text-[#990202]">
                          <MapPin className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <div className="text-[14px] sm:text-[15px] font-extrabold text-gray-950 leading-tight">{loc.cardTitle}</div>
                            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-[12px] sm:text-[13px] font-black text-gray-900">5.0</span>
                            <div className="flex gap-[1px] text-[#FFC107]">
                              {[1,2,3,4,5].map(star => (
                                <svg key={star} className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                              ))}
                            </div>
                            <span className="text-[12px] sm:text-[13px] text-gray-500 font-medium leading-none ml-0.5 truncate max-w-[100px] sm:max-w-[120px]">&middot; {loc.cardSubtitle}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Address Box & Services & Buttons */}
                  <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                    <h2 className="font-heading text-[16px] sm:text-[32px] font-black text-gray-950 leading-[1.25] sm:leading-tight tracking-tight">
                      {loc.title}
                    </h2>
                    <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed font-medium font-sans">
                      {loc.subtitle}
                    </p>

                    {/* Address Card */}
                    <div className="bg-white rounded-2xl shadow-md border border-black/[0.03] shadow-[0_10px_25px_rgba(0,0,0,0.015)] p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <p className="text-[16px] sm:text-[16px] font-black text-[#990202] uppercase tracking-[0.25em]">LOKASI OFFICE</p>
                      <h3 className="text-[16px] sm:text-[16px] font-extrabold text-gray-950 leading-relaxed whitespace-pre-line">
                        {loc.address}
                      </h3>
                    </div>

                    {/* Layanan yang disediakan */}
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-[16px] sm:text-[16px] font-black text-gray-950">Layanan yang disediakan:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 sm:gap-y-3">
                        <div className="space-y-2 sm:space-y-3">
                          {["Alamat komersial", "Dapat digunakan untuk PKP", "Legalitas gedung (IMB, PBB, dll)", "Surat perjanjian & domisili"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 sm:gap-2.5 text-[16px] sm:text-[16px] text-gray-500 font-medium leading-none">
                              <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-500">
                                <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                              </div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          {["Meeting Room", "LED Smart TV & Whiteboard", "WiFi & Internet High Speed", "Resepsionis profesional"].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 sm:gap-2.5 text-[16px] sm:text-[16px] text-gray-500 font-medium leading-none">
                              <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-500">
                                <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                              </div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-row gap-3 pt-3">
                      <a
                        href={loc.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center justify-center px-4 py-3 bg-[#990202] hover:bg-[#800000] text-white font-extrabold rounded-xl text-[16px] sm:text-[16px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.022-.079-.186-.208-.432-.332-.246-.123-1.455-.717-1.68-.8-.223-.082-.387-.122-.55.122-.165.245-.64.8-.787.969-.147.17-.294.19-.54.067-.244-.124-.992-.367-1.89-1.168-.698-.622-1.17-1.392-1.307-1.637-.136-.246-.015-.379.108-.501.112-.11.246-.287.37-.43.123-.14.164-.24.246-.4.082-.162.04-.303-.02-.427-.06-.124-.55-1.324-.752-1.815-.197-.474-.397-.41-.547-.418-.14-.008-.302-.008-.464-.008-.162 0-.427.06-.65.3-.224.24-.854.83-.854 2.03 0 1.201.874 2.36 1.996 3.86 1.123 1.5 2.617 2.29 4.193 2.97 1.573.68 2.36.545 3.208.435.85-.11 1.764-.72 2.012-1.417.25-.7.25-1.3.175-1.417-.075-.117-.24-.183-.34-.233zM12 22a9.96 9.96 0 01-5.066-1.378l-.363-.214-3.766.987 1.004-3.667-.235-.374A9.96 9.96 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm0-22C5.373 0 0 5.373 0 12a11.96 11.96 0 002.586 7.424L0 24l4.743-1.242A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                        </svg>
                        <span>WhatsApp Kami</span>
                      </a>
                      <a
                        href="#paket-harga"
                        className="flex-1 text-center justify-center px-4 py-3 bg-white shadow-md border border-black/[0.04] text-gray-800 hover:bg-gray-50 hover:border-gray-300 font-extrabold rounded-xl text-[16px] sm:text-[16px] shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1"
                      >
                        <span>Cek Lebih Lanjut</span>
                        <svg className="w-3.5 h-3.5 ml-0.5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


          
        </div>
      </section>

      {/* ─── 7. TESTIMONIALS SECTION ─── */}
      <MediaCoverage />
      <Testimonials />

      {/* ─── 8. FAQ SECTION ─── */}
      <FAQ
        title="Pertanyaan seputar Virtual Office."
        subtitle="Sebelum daftar, mungkin jawabannya sudah ada di sini."
        items={faqs}
      />

      <ArtikelTerkait query="virtual office" />


      {/* ─── 9. CTA SECTION ─── */}
      <CTA 
        title={
          <h2 className="font-heading text-[16px] sm:text-[38px] font-extrabold text-gray-950 leading-[1.25] sm:leading-tight tracking-tight max-w-[480px]">
            Siap dapatkan alamat bisnis <span className="text-[#990202]">prestisius?</span>
          </h2>
        }
        description="Konsultasikan kebutuhan lokasi office & pendirian PT Anda dengan tim kami — gratis, tanpa komitmen."
        slaText="Reminder otomatis tiap periode · Senin-Sabtu 08:00-20:00"
      />

      </div>
      );
      }
