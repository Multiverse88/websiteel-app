"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Check,
  Building,
  Clock,
  ArrowRight,
  Home,
  Zap,
  Star,
  CheckCircle,
  TrendingUp,
  Globe,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import Benefits from "@/components/Benefits";
import { getWhatsAppLink } from "@/lib/config";

export default function SertifikasiIso() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isoServices = [
    {
      id: "iso-9001",
      code: "9001",
      tag: "UNIVERSAL",
      badge: "PALING POPULER",
      title: "ISO 9001:2015",
      subtitle: "Sistem Manajemen Mutu (QMS)",
      desc: "Standar paling populer & aplikatif untuk semua industri. Fokus pada kepuasan pelanggan & perbaikan mutu berkelanjutan.",
      cocok: ["Semua sektor", "Manufaktur", "Jasa", "Retail"],
      price: "9,9jt",
      link: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Sertifikasi ISO 9001:2015.")
    },
    {
      id: "iso-14001",
      code: "14001",
      tag: "ENVIRONMENT",
      title: "ISO 14001:2015",
      subtitle: "Sistem Manajemen Lingkungan (EMS)",
      desc: "Pengelolaan dampak lingkungan, kepatuhan AMDAL, & pengurangan limbah. Wajib untuk ekspor ke EU & Jepang.",
      cocok: ["Manufaktur", "Pertanian", "Pertambangan", "Ekspor"],
      price: "9,9jt",
      link: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Sertifikasi ISO 14001:2015.")
    },
    {
      id: "iso-45001",
      code: "45001",
      tag: "SAFETY",
      title: "ISO 45001:2018",
      subtitle: "Sistem Manajemen K3 (OH&S)",
      desc: "Keselamatan & kesehatan kerja — wajib untuk industri berisiko tinggi. Mengurangi kecelakaan kerja & klaim BPJS.",
      cocok: ["Konstruksi", "Manufaktur", "Oil & Gas", "Pertambangan"],
      price: "11,9jt",
      link: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Sertifikasi ISO 45001:2018.")
    },
    {
      id: "iso-22000",
      code: "22000",
      tag: "FOOD SAFETY",
      title: "ISO 22000:2018",
      subtitle: "Sistem Manajemen Keamanan Pangan",
      desc: "Sistem keamanan pangan terintegrasi dengan prinsip HACCP. Wajib untuk industri makanan & minuman skala besar.",
      cocok: ["F&B", "Restoran", "Hotel", "Supplier Makanan"],
      price: "14,4jt",
      link: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Sertifikasi ISO 22000:2018.")
    },
    {
      id: "iso-27001",
      code: "27001",
      tag: "SECURITY",
      title: "ISO 27001:2022",
      subtitle: "Sistem Manajemen Keamanan Informasi",
      desc: "Keamanan data & informasi — wajib untuk perusahaan teknologi, finansial, & healthcare yang handle data sensitif.",
      cocok: ["Tech & SaaS", "Finance", "Healthcare", "E-commerce"],
      price: "14,4jt",
      link: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Sertifikasi ISO 27001:2022.")
    },
    {
      id: "iso-37001",
      code: "37001",
      tag: "ANTI-BRIBERY",
      title: "ISO 37001:2016",
      subtitle: "Sistem Manajemen Anti Penyuapan",
      desc: "Sistem anti-suap untuk good governance — kewajiban BUMN, kontraktor pemerintah, & perusahaan publik.",
      cocok: ["BUMN", "Konstruksi", "Infrastruktur", "Kontraktor"],
      price: "14,4jt",
      link: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Sertifikasi ISO 37001:2016.")
    },
    {
      id: "iso-13485",
      code: "13485",
      tag: "MEDICAL",
      title: "ISO 13485:2016",
      subtitle: "Sistem Mutu Perangkat Medis",
      desc: "Standar khusus perangkat medis — manufaktur, distribusi, & service alat kesehatan. Wajib untuk regulasi BPOM.",
      cocok: ["Alat Kesehatan", "Distribusi Medis", "Rumah Sakit", "Lab"],
      price: "17,4jt",
      link: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Sertifikasi ISO 13485:2016.")
    }
  ];

  const isoBenefits = [
    {
      icon: <Globe className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Kredibilitas Global",
      desc: "Bukti bahwa bisnis Anda memenuhi standar dunia — dipercaya partner internasional."
    },
    {
      icon: <TrendingUp className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Akses Pasar Ekspor",
      desc: "Banyak negara & buyer internasional mensyaratkan ISO untuk supplier mereka."
    },
    {
      icon: <Zap className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Efisiensi Operasional",
      desc: "Sistem terstruktur mengurangi waste & rework — produktivitas naik signifikan."
    },
    {
      icon: <Star className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Win Tender Pemerintah",
      desc: "Banyak tender BUMN & pemerintah mensyaratkan sertifikat ISO sebagai kualifikasi wajib."
    }
  ];

  const pricingPackages = [
    {
      title: "ISO 9001",
      code: "9001",
      price: "9.999.000",
      strikePrice: "15.000.000",
      subLabel: "SISTEM MANAJEMEN MUTU",
      isPopular: true,
      buttonText: "Pilih ISO 9001",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket ISO 9001:2015 Mutu."),
      lamaProses: "3-7 Hari Kerja",
      yangDiperoleh: [
        "Sistem Manajemen Mutu Terakreditasi UAF",
        "Training",
        "Audit Verification (English)",
        "Sertifikasi ISO",
        "Dokumen Mutu (SOP ISO)"
      ],
      bonus: [
        "Personal Legal Assistance",
        { text: "1 Kupon", highlight: "Undian iPhone" }
      ],
      extraBonus: [
        { text: "Voucher food app", value: "Rp 250.000" },
        "Dokumen SOP Karyawan",
        "Dokumen SOP Perusahaan",
        "Dokumen Kontrak Bisnis"
      ]
    },
    {
      title: "ISO 14001",
      code: "14001",
      price: "9.999.000",
      strikePrice: "15.000.000",
      subLabel: "MANAJEMEN LINGKUNGAN",
      isPopular: false,
      buttonText: "Pilih ISO 14001",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket ISO 14001:2015 Lingkungan."),
      lamaProses: "7 Hari Kerja",
      yangDiperoleh: [
        "Sistem Manajemen Lingkungan Terakreditasi UAF",
        "Training",
        "Audit Verification (English)",
        "Sertifikasi ISO",
        "Dokumen Mutu (SOP ISO)"
      ],
      bonus: [
        "Personal Legal Assistance",
        { text: "1 Kupon", highlight: "Undian iPhone" }
      ],
      extraBonus: [
        { text: "Voucher food app", value: "Rp 250.000" },
        "Dokumen SOP Karyawan",
        "Dokumen SOP Perusahaan",
        "Dokumen Kontrak Bisnis"
      ]
    },
    {
      title: "ISO 45001",
      code: "45001",
      price: "11.999.000",
      strikePrice: "18.000.000",
      subLabel: "K3 (OH&S)",
      isPopular: false,
      buttonText: "Pilih ISO 45001",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket ISO 45001:2018 K3."),
      lamaProses: "7 Hari Kerja",
      yangDiperoleh: [
        "Sistem Manajemen K3 Terakreditasi UAF",
        "Training",
        "Audit Verification (English)",
        "Sertifikasi ISO",
        "Dokumen Mutu (SOP ISO)"
      ],
      bonus: [
        "Personal Legal Assistance",
        { text: "1 Kupon", highlight: "Undian iPhone" }
      ],
      extraBonus: [
        { text: "Voucher food app", value: "Rp 200.000" },
        "Dokumen SOP Karyawan",
        "Dokumen SOP Perusahaan",
        "Dokumen Kontrak Bisnis"
      ]
    },
    {
      title: "ISO 22000",
      code: "22000",
      price: "14.499.000",
      strikePrice: "22.000.000",
      subLabel: "KEAMANAN PANGAN",
      isPopular: false,
      buttonText: "Pilih ISO 22000",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket ISO 22000:2018 Keamanan Pangan."),
      lamaProses: "7 Hari Kerja",
      yangDiperoleh: [
        "Sistem Manajemen Keamanan Pangan Terakreditasi UAF",
        "Training",
        "Audit Verification (English)",
        "Sertifikasi ISO",
        "Dokumen Mutu (SOP ISO)"
      ],
      bonus: [
        "Personal Legal Assistance",
        { text: "1 Kupon", highlight: "Undian iPhone" }
      ],
      extraBonus: [
        { text: "Voucher food app", value: "Rp 200.000" },
        "Dokumen SOP Karyawan",
        "Dokumen SOP Perusahaan",
        "Dokumen Kontrak Bisnis"
      ]
    },
    {
      title: "ISO 27001",
      code: "27001",
      price: "14.499.000",
      strikePrice: "22.000.000",
      subLabel: "KEAMANAN INFORMASI",
      isPopular: false,
      buttonText: "Pilih ISO 27001",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket ISO 27001:2022 Keamanan Informasi."),
      lamaProses: "7 Hari Kerja",
      yangDiperoleh: [
        "Sistem Manajemen Keamanan Informasi Terakreditasi UAF",
        "Training",
        "Audit Verification (English)",
        "Sertifikasi ISO",
        "Dokumen Mutu (SOP ISO)"
      ],
      bonus: [
        "Personal Legal Assistance",
        { text: "1 Kupon", highlight: "Undian iPhone" }
      ],
      extraBonus: [
        { text: "Voucher food app", value: "Rp 250.000" },
        "Dokumen SOP Karyawan",
        "Dokumen SOP Perusahaan",
        "Dokumen Kontrak Bisnis"
      ]
    },
    {
      title: "ISO 37001",
      code: "37001",
      price: "14.499.000",
      strikePrice: "22.000.000",
      subLabel: "ANTI PENYUAPAN",
      isPopular: false,
      buttonText: "Pilih ISO 37001",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket ISO 37001:2016 Anti Penyuapan."),
      lamaProses: "7 Hari Kerja",
      yangDiperoleh: [
        "Sistem Manajemen Anti Penyuapan Terakreditasi UAF",
        "Training",
        "Audit Verification (English)",
        "Sertifikasi ISO",
        "Dokumen Mutu (SOP ISO)"
      ],
      bonus: [
        "Personal Legal Assistance",
        { text: "1 Kupon", highlight: "Undian iPhone" }
      ],
      extraBonus: [
        { text: "Voucher food app", value: "Rp 250.000" },
        "Dokumen SOP Karyawan",
        "Dokumen SOP Perusahaan",
        "Dokumen Kontrak Bisnis"
      ]
    },
    {
      title: "ISO 13485",
      code: "13485",
      price: "17.499.000",
      strikePrice: "25.000.000",
      subLabel: "MUTU PERANGKAT MEDIS",
      isPopular: false,
      buttonText: "Pilih ISO 13485",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket ISO 13485:2016 Alat Kesehatan."),
      lamaProses: "7 Hari Kerja",
      yangDiperoleh: [
        "Sistem Mutu Perangkat Medis Terakreditasi UAF",
        "Training",
        "Audit Verification (English)",
        "Sertifikasi ISO",
        "Dokumen Mutu (SOP ISO)"
      ],
      bonus: [
        "Personal Legal Assistance",
        { text: "1 Kupon", highlight: "Undian iPhone" }
      ],
      extraBonus: [
        { text: "Voucher food app", value: "Rp 200.000" },
        "Dokumen SOP Karyawan",
        "Dokumen SOP Perusahaan",
        "Dokumen Kontrak Bisnis"
      ]
    }
  ];

  const steps = [
    {
      title: "Konsultasi & Gap Analysis",
      desc: "Konsultan kami riset sistem saat ini vs standar ISO yang dipilih. Identifikasi gap yang harus ditutup sebelum audit.",
      duration: "1 MINGGU",
      checklist: [
        "Walkthrough proses bisnis & struktur organisasi",
        "Identifikasi gap vs requirement ISO",
        "Roadmap implementasi & timeline"
      ]
    },
    {
      title: "Pelatihan & Awareness Tim",
      desc: "Training seluruh karyawan tentang ISO standard & bagaimana sistem akan diterapkan dalam operasional sehari-hari.",
      duration: "1-2 MINGGU",
      checklist: [
        "ISO awareness training (online + on-site)",
        "Pembentukan tim ISO & PIC per departemen",
        "Workshop interaktif dengan auditor"
      ]
    },
    {
      title: "Penyusunan Dokumentasi",
      desc: "Penyusunan dokumentasi sistem manajemen — manual mutu, prosedur, instruksi kerja, & formulir. Custom sesuai bisnis Anda.",
      duration: "3-4 MINGGU",
      checklist: [
        "Manual Mutu (Quality Manual)",
        "Prosedur operasional (SOP) per departemen",
        "Instruksi kerja, formulir, & checklist"
      ]
    },
    {
      title: "Implementasi Sistem",
      desc: "Sistem diterapkan di operasional sehari-hari. Tim kami pendamping & monitoring berkala untuk memastikan smooth implementation.",
      duration: "4-6 MINGGU",
      checklist: [
        "Sistem berjalan di seluruh proses bisnis",
        "Monitoring kunci performance indicator",
        "Tindakan korektif jika ada deviasi"
      ]
    },
    {
      title: "Internal Audit",
      desc: "Audit internal sebelum audit eksternal — pastikan sistem berjalan & siap untuk diaudit oleh badan sertifikasi UAF.",
      duration: "1-2 MINGGU",
      checklist: [
        "Audit internal oleh tim kami",
        "Management Review meeting",
        "Tindakan korektif sebelum audit eksternal"
      ]
    },
    {
      title: "Audit Sertifikasi (Stage 1 + 2)",
      desc: "Audit eksternal oleh badan sertifikasi UAF — 2 tahap: review dokumentasi (Stage 1) & audit on-site (Stage 2).",
      duration: "2-3 MINGGU",
      checklist: [
        "Stage 1: Review dokumentasi & readiness",
        "Stage 2: On-site audit oleh auditor UAF",
        "Closing audit report & rekomendasi"
      ]
    },
    {
      title: "Sertifikat Terbit & Surveillance",
      desc: "E-Sertifikat ISO UAF Accredited terbit — valid 3 tahun. Surveillance audit yearly untuk maintain sertifikasi.",
      duration: "VALID 3 TAHUN",
      checklist: [
        "E-Sertifikat ISO + fisik dikirim ke alamat",
        "Surveillance audit setiap tahun",
        "Recertification setelah 3 tahun"
      ]
    }
  ];

  const faqs = [
    {
      q: "Apa itu UAF Accreditation dan kenapa penting?",
      a: "UAF (United Accreditation Foundation) adalah badan akreditasi internasional yang merupakan member IAF (International Accreditation Forum). Sertifikat ISO yang diterbitkan oleh badan sertifikasi UAF accredited diakui & bisa diverifikasi di seluruh dunia. Tanpa akreditasi yang valid, sertifikat ISO Anda tidak akan dianggap oleh buyer internasional, tender pemerintah, atau audit pihak ketiga."
    },
    {
      q: "Berapa lama proses total sertifikasi ISO?",
      a: "Proses standard berkisar antara <strong class=\"font-extrabold text-gray-950\">14 hingga 30 hari kerja</strong>, sangat bergantung pada kelengkapan administrasi awal dan kesiapan audit perusahaan Anda."
    },
    {
      q: "Sertifikat ISO berlaku berapa lama?",
      a: "Sertifikat ISO berlaku selama <strong class=\"font-extrabold text-gray-950\">3 tahun</strong> sejak tanggal diterbitkan. Selama masa berlaku tersebut, perusahaan wajib melakukan surveillance audit setiap tahun untuk memastikan implementasi sistem manajemen tetap konsisten."
    },
    {
      q: "Apa beda ISO 9001, 14001, 27001, dan lainnya?",
      a: "Masing-masing standar mengatur fokus yang berbeda: <strong class=\"font-extrabold text-gray-950\">ISO 9001</strong> untuk Manajemen Mutu, <strong class=\"font-extrabold text-gray-950\">ISO 14001</strong> untuk Lingkungan, <strong class=\"font-extrabold text-gray-950\">ISO 27001</strong> untuk Keamanan Informasi, dan <strong class=\"font-extrabold text-gray-950\">ISO 45001</strong> untuk Keselamatan Kerja (K3)."
    },
    {
      q: "Apakah sertifikat saya diakui internasional?",
      a: "Ya, sertifikat yang diterbitkan oleh lembaga sertifikasi dengan akreditasi <strong class=\"font-extrabold text-gray-950\">UAF (anggota IAF)</strong> diakui sepenuhnya secara global dan memiliki derajat kepercayaan tinggi di mata buyer dan mitra internasional."
    },
    {
      q: "Bisa sertifikasi multi-standar sekaligus (integrated)?",
      a: "Sangat bisa. Kami menyediakan paket <strong class=\"font-extrabold text-gray-950\">Integrated Management System (IMS)</strong> untuk mengintegrasikan beberapa ISO sekaligus (misal 9001 + 14001 + 45001) yang lebih efisien dari sisi biaya dan waktu implementasi."
    },
    {
      q: "Apa yang terjadi setelah sertifikat terbit?",
      a: "Setelah sertifikat resmi terbit, perusahaan Anda berhak mempublikasikan status sertifikasi tersebut. Selanjutnya, tim Anda harus menjalankan sistem manajemen secara konsisten untuk menghadapi surveillance audit tahunan."
    }
  ];

  return (
    <div className="has-service-cta flex flex-col min-h-screen">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-8 sm:py-20 border-b border-gray-200/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[11px] sm:text-[11px] sm:text-[13px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[13px] font-bold text-gray-900">Sertifikasi ISO</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[10px] sm:text-[10px] sm:text-[12.5px] font-bold text-[#990202] tracking-wide">Sertifikasi ISO · UAF Accredited</span>
              </div>

              {/* Headline */}
              <h1 className="font-inter text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                Sertifikasi ISO dengan <br />
                <span className="text-[#990202]">auditor UAF accredited.</span>
              </h1>

              {/* Description */}
              <p className="text-[15.5px] sm:text-[16.5px] text-gray-505 leading-relaxed max-w-2xl font-normal">
                ISO 9001, 14001, 27001, 37001, 45001, sampai 22000 — dengan auditor terakreditasi UAF (United Accreditation Foundation). Pendampingan A–Z dari konsultasi sampai sertifikat resmi terbit.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya tertarik ingin berkonsultasi mengenai pembuatan Sertifikasi ISO dengan auditor UAF.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 bg-[#990202] text-white font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <span>Konsultasi Gratis</span>
                  <span className="ml-1.5 transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 border border-gray-200 text-gray-800 font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Lihat Paket Harga
                </a>
              </div>

              {/* Bottom Features Row */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-[580px]">
                {/* Feature 1 */}
                <div className="flex items-center space-x-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Award className="w-5 h-5 text-amber-600 animate-pulse-subtle" />
                  </div>
                  <div>
                    <div className="text-[13px] sm:text-[14px] font-extrabold text-gray-950 leading-tight">UAF Accredited</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Diakui internasional</div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center space-x-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <Building className="w-5 h-5 text-[#990202]" />
                  </div>
                  <div>
                    <div className="text-[13px] sm:text-[14px] font-extrabold text-gray-950 leading-tight">8+ Standar ISO</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Pilihan lengkap</div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center space-x-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#990202]" />
                  </div>
                  <div>
                    <div className="text-[13px] sm:text-[14px] font-extrabold text-gray-950 leading-tight">Valid 3 tahun</div>
                    <div className="text-[11px] text-gray-500 mt-0.5">+ surveillance yearly</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">
                
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[24px] sm:rounded-[24px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <Image
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=800&h=800&q=80"
                    alt="Sertifikasi ISO Perusahaan Terpercaya"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge 1: Top Left */}
                <div className="absolute -top-6 -left-2 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center space-x-3.5 w-[230px] transition-transform hover:-translate-y-1 duration-300 z-20">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Award className="w-5.5 h-5.5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold text-gray-950 leading-none">ISO 9001:2015</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5">UAF Accredited · Valid 3 thn</div>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Right */}
                <div className="absolute -bottom-6 -right-2 sm:-right-4 bg-white rounded-2xl p-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center space-x-3.5 w-[215px] transition-transform hover:-translate-y-1 duration-300 z-20">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <CheckCircle className="w-5.5 h-5.5 text-[#990202]" />
                  </div>
                  <div>
                    <div className="text-[13px] font-extrabold text-gray-950 leading-none">500+ Sertifikat</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5">diterbitkan tahun ini</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. APA ITU SERTIFIKASI ISO ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="mb-14">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-wider mb-2">PENGERTIAN ISO &amp; UAF</p>
            <h2 className="font-inter text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Apa itu Sertifikasi ISO?
            </h2>
            <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 mt-3 font-normal max-w-2xl">
              Sebelum mulai, kenali standar internasional yang dipakai jutaan organisasi di seluruh dunia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with floating badge */}
            <div className="lg:col-span-6 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[500px] lg:max-w-none">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.06)] bg-white aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <Image
                    src="https://images.unsplash.com/photo-1559526324-593bc073d938?fit=crop&w=800&h=800&q=80"
                    alt="Tim profesional berdiskusi standar audit ISO"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Floating Badge (Bottom Left) */}
                <div className="absolute -bottom-6 left-4 bg-white rounded-2xl p-4 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-150/50 flex items-center space-x-3.5 w-[290px] sm:w-[320px]">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Award className="w-5.5 h-5.5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-black text-gray-900 leading-none">UAF Accreditation</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5 leading-snug">United Accreditation Foundation · Member IAF</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Explanation */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed font-normal">
                <strong className="font-extrabold text-gray-905">ISO (International Organization for Standardization)</strong> adalah organisasi internasional independen yang mengembangkan standar global untuk kualitas, keamanan, efisiensi, dan kompatibilitas — saat ini diadopsi di lebih dari <strong className="font-extrabold text-gray-905">167 negara</strong>.
              </p>
              <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed font-normal">
                Sertifikasi ISO yang kami terbitkan adalah <strong className="font-extrabold text-gray-905">UAF Accredited</strong> — dari badan akreditasi yang merupakan member IAF (International Accreditation Forum). Sertifikat Anda diakui &amp; bisa diverifikasi secara internasional.
              </p>

              <div className="space-y-4 pt-2">
                <h4 className="text-[17.5px] font-extrabold text-gray-950">Karakteristik Sertifikasi ISO Kami</h4>
                
                <ul className="space-y-3.5">
                  <li className="flex items-start text-[14.5px] font-medium text-gray-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </div>
                    <span><strong className="font-extrabold text-gray-905 mr-1.5">Standar internasional</strong> — diakui di lebih dari 167 negara.</span>
                  </li>
                  <li className="flex items-start text-[14.5px] font-medium text-gray-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </div>
                    <span><strong className="font-extrabold text-gray-905 mr-1.5">UAF Accredited</strong> — member IAF, traceable di database internasional.</span>
                  </li>
                  <li className="flex items-start text-[14.5px] font-medium text-gray-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </div>
                    <span><strong className="font-extrabold text-gray-905 mr-1.5">Berlaku 3 tahun</strong> — dengan surveillance audit tahunan untuk maintain.</span>
                  </li>
                  <li className="flex items-start text-[14.5px] font-medium text-gray-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </div>
                    <span><strong className="font-extrabold text-gray-905 mr-1.5">Bisa diperpanjang</strong> — recertification setiap 3 tahun, tidak ada batas.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 2.5 MANFAAT SERTIFIKASI ISO ─── */}
      <Benefits
        sectionTitleTag="MANFAAT SERTIFIKASI ISO"
        sectionTitle="Kenapa bisnis Anda perlu ISO?"
        items={isoBenefits}
      />

      {/* ─── 3. PILIHAN LAYANAN SERTIFIKASI ISO (7 Jenis) ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">PILIHAN LAYANAN</p>
            <h2 className="font-inter text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Pilihan Layanan Sertifikasi ISO UAF.
            </h2>
            <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              7 standar ISO terakreditasi UAF (United Accreditation Foundation) — pilih sesuai industri &amp; kebutuhan compliance bisnis Anda. Setiap layanan include audit, training, &amp; dokumentasi sistem.
            </p>
          </div>

          {/* Grid of 7 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1140px] mx-auto">
            {isoServices.map((service, idx) => {
              const isPopular = service.id === "iso-9001";
              const cardBorder = isPopular
                ? "border-[1.5px] border-[#990202] shadow-[0_20px_40px_rgba(153,2,2,0.04)] relative"
                : "border border-gray-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.03)] hover:border-gray-300 transition-all duration-300 relative";
              
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-[24px] p-7.5 flex flex-col justify-between ${cardBorder}`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7B0101] text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-[6px] shadow-sm whitespace-nowrap">
                      PALING POPULER
                    </div>
                  )}
                  
                  <div className="space-y-5">
                    {/* Top Row: Gold circular number & Category Tag */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 sm:w-11 sm:h-11 bg-[#DCA764] rounded-full flex items-center justify-center text-white font-black text-[12px] shadow-sm">
                        {service.code}
                      </div>
                      <span className="bg-gray-100 text-gray-500 text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full">
                        {service.tag}
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h3 className="text-[19px] font-black text-gray-950 leading-none">{service.title}</h3>
                      <p className="text-[12px] text-gray-450 font-bold mt-2 uppercase tracking-wide">{service.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-[13.5px] text-gray-550 leading-relaxed font-normal">
                      {service.desc}
                    </p>

                    {/* Cocok Untuk */}
                    <div className="space-y-2.5 pt-1">
                      <div className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                        COCOK UNTUK
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {service.cocok.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-50 border border-gray-150 rounded-md px-2.5 py-1 text-[11px] font-medium text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom pricing row */}
                  <div className="pt-5 flex items-center justify-between mt-7 border-t border-gray-100/80">
                    <div className="text-[13px] font-bold text-gray-500">
                      Mulai <span className="text-[#990202] font-black text-[16px] ml-1">Rp {service.price}</span>
                    </div>
                    
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-950 hover:text-[#990202] font-extrabold text-[13px] transition-colors group gap-1 cursor-pointer"
                    >
                      <span>Lihat Harga</span>
                      <span className="transition-transform group-hover:translate-x-0.5 font-bold">→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 4. HARGA PRICING GRID (7 Paket) ─── */}
      <section id="paket-harga" className="bg-[#F9FAFB] py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">BIAYA SERTIFIKASI ISO UAF</p>
            <h2 className="font-inter text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Harga transparan per standar ISO.
            </h2>
            <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Semua paket include audit, training, sertifikasi resmi UAF, &amp; dokumen mutu (SOP ISO).<br />
              Tanpa tambahan biaya proses.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="space-y-8 max-w-[1140px] mx-auto">

            {/* Row 1: 3 cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {pricingPackages.slice(0, 3).map((pkg, idx) => {
                const headerBg = pkg.isPopular ? "bg-[#990202]" : "bg-[#1A1A1A]";
                const cardBorder = pkg.isPopular
                  ? "border-[2.5px] border-[#990202] shadow-[0_20px_50px_rgba(0,0,0,0.045)] group-hover:shadow-[0_20px_50px_rgba(153,2,2,0.12)] relative z-10 transition-all duration-300"
                  : "border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300";

                return (
                  <div key={idx} className="relative group h-full">
                    {/* Interactive Red Hover Glow behind Card */}
                    <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
                    
                    <div className={`bg-white rounded-2xl overflow-hidden flex flex-col h-full justify-between ${cardBorder}`}>
                    <div>
                      {/* Card Header */}
                      <div className={`${headerBg} px-6 py-7 text-white text-center relative`}>
                        {pkg.isPopular && (
                          <div className="absolute top-3 left-0 right-0 flex justify-center">
                            <span className="bg-white/20 backdrop-blur-sm text-white text-[8px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full">
                              PALING POPULER
                            </span>
                          </div>
                        )}
                        <h3 className={`text-[16px] font-black text-white/70 uppercase tracking-widest ${pkg.isPopular ? "mt-4" : ""}`}>
                          {pkg.title}
                        </h3>
                        <div className="mt-4 flex items-baseline justify-center gap-1">
                          <span className="text-[14px] font-bold text-white/60">Rp</span>
                          <span className="text-[30px] sm:text-[34px] font-black tracking-tight leading-none">{pkg.price}</span>
                          <span className="text-[13px] font-bold text-white/40 line-through ml-1.5">{pkg.strikePrice},-</span>
                        </div>
                        <div className="mt-2.5 text-[9px] font-bold tracking-widest uppercase text-white/50">
                          {pkg.subLabel}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="px-6 py-6 space-y-6">

                        {/* LAMA PROSES */}
                        <div className="space-y-2.5">
                          <h4 className="text-[11px] font-black text-gray-950 tracking-widest uppercase">LAMA PROSES</h4>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-[13px] font-bold text-gray-700">{pkg.lamaProses}</span>
                            <span className="bg-blue-50 text-blue-600 text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded">FYI</span>
                          </div>
                        </div>

                        {/* YANG DIPEROLEH */}
                        <div className="space-y-2.5">
                          <h4 className="text-[11px] font-black text-[#990202] tracking-widest uppercase">YANG DIPEROLEH</h4>
                          <ul className="space-y-2">
                            {pkg.yangDiperoleh.map((item, i) => (
                              <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-700 leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* BONUS */}
                        <div className="space-y-2.5">
                          <h4 className="text-[11px] font-black text-gray-950 tracking-widest uppercase">BONUS</h4>
                          <ul className="space-y-2">
                            {pkg.bonus.map((item, i) => (
                              <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-700 leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                                {typeof item === "string" ? (
                                  <span>{item}</span>
                                ) : (
                                  <span>{item.text}: <strong className="font-extrabold text-gray-900">{item.highlight}</strong></span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* EXTRA BONUS */}
                        <div className="space-y-2.5">
                          <h4 className="text-[11px] font-black text-gray-950 tracking-widest uppercase">EXTRA BONUS</h4>
                          <ul className="space-y-2">
                            {pkg.extraBonus.map((item, i) => (
                              <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-700 leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                                {typeof item === "string" ? (
                                  <span>{item}</span>
                                ) : (
                                  <span>{item.text}: <strong className="font-extrabold text-gray-900">{item.value}</strong></span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    </div>

                    {/* Card Button */}
                    <div className="px-6 pb-6 pt-1">
                      <a
                        href={pkg.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block w-full py-3.5 rounded-xl text-center font-extrabold text-[13.5px] transition-all duration-200 cursor-pointer shadow-sm ${
                          pkg.isPopular
                            ? "bg-[#990202] hover:bg-[#800000] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            : "border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow"
                        }`}
                      >
                        {pkg.buttonText}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

            {/* Row 2: 3 cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {pricingPackages.slice(3, 6).map((pkg, idx) => (
                <div key={idx} className="relative group h-full">
                  {/* Interactive Red Hover Glow behind Card */}
                  <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
                  
                  <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full justify-between border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300">
                  <div>
                    {/* Card Header */}
                    <div className="bg-[#1A1A1A] px-6 py-7 text-white text-center relative">
                      <h3 className="text-[16px] font-black text-white/70 uppercase tracking-widest">
                        {pkg.title}
                      </h3>
                      <div className="mt-4 flex items-baseline justify-center gap-1">
                        <span className="text-[14px] font-bold text-white/60">Rp</span>
                        <span className="text-[30px] sm:text-[34px] font-black tracking-tight leading-none">{pkg.price}</span>
                        <span className="text-[13px] font-bold text-white/40 line-through ml-1.5">{pkg.strikePrice},-</span>
                      </div>
                      <div className="mt-2.5 text-[9px] font-bold tracking-widest uppercase text-white/50">
                        {pkg.subLabel}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="px-6 py-6 space-y-6">

                      {/* LAMA PROSES */}
                      <div className="space-y-2.5">
                        <h4 className="text-[11px] font-black text-gray-950 tracking-widest uppercase">LAMA PROSES</h4>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-[13px] font-bold text-gray-700">{pkg.lamaProses}</span>
                          <span className="bg-blue-50 text-blue-600 text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded">FYI</span>
                        </div>
                      </div>

                      {/* YANG DIPEROLEH */}
                      <div className="space-y-2.5">
                        <h4 className="text-[11px] font-black text-[#990202] tracking-widest uppercase">YANG DIPEROLEH</h4>
                        <ul className="space-y-2">
                          {pkg.yangDiperoleh.map((item, i) => (
                            <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-700 leading-relaxed">
                              <Check className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* BONUS */}
                      <div className="space-y-2.5">
                        <h4 className="text-[11px] font-black text-gray-950 tracking-widest uppercase">BONUS</h4>
                        <ul className="space-y-2">
                          {pkg.bonus.map((item, i) => (
                            <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-700 leading-relaxed">
                              <Check className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                              {typeof item === "string" ? (
                                <span>{item}</span>
                              ) : (
                                <span>{item.text}: <strong className="font-extrabold text-gray-900">{item.highlight}</strong></span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* EXTRA BONUS */}
                      <div className="space-y-2.5">
                        <h4 className="text-[11px] font-black text-gray-950 tracking-widest uppercase">EXTRA BONUS</h4>
                        <ul className="space-y-2">
                          {pkg.extraBonus.map((item, i) => (
                            <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-700 leading-relaxed">
                              <Check className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                              {typeof item === "string" ? (
                                <span>{item}</span>
                              ) : (
                                <span>{item.text}: <strong className="font-extrabold text-gray-900">{item.value}</strong></span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>

                  {/* Card Button */}
                  <div className="px-6 pb-6 pt-1">
                    <a
                      href={pkg.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3.5 border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow rounded-xl text-center font-extrabold text-[13.5px] transition-all duration-200 cursor-pointer shadow-sm"
                    >
                      {pkg.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

            {/* Row 3: 1 card centered */}
            <div className="flex justify-center">
              <div className="w-full lg:w-[380px]">
                {(() => {
                  const pkg = pricingPackages[6];
                  return (
                    <div className="relative group h-full">
                      {/* Interactive Red Hover Glow behind Card */}
                      <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
                      
                      <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full justify-between border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300">
                      <div>
                        {/* Card Header */}
                        <div className="bg-[#1A1A1A] px-6 py-7 text-white text-center relative">
                          <h3 className="text-[16px] font-black text-white/70 uppercase tracking-widest">
                            {pkg.title}
                          </h3>
                          <div className="mt-4 flex items-baseline justify-center gap-1">
                            <span className="text-[14px] font-bold text-white/60">Rp</span>
                            <span className="text-[30px] sm:text-[34px] font-black tracking-tight leading-none">{pkg.price}</span>
                            <span className="text-[13px] font-bold text-white/40 line-through ml-1.5">{pkg.strikePrice},-</span>
                          </div>
                          <div className="mt-2.5 text-[9px] font-bold tracking-widest uppercase text-white/50">
                            {pkg.subLabel}
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="px-6 py-6 space-y-6">

                          {/* LAMA PROSES */}
                          <div className="space-y-2.5">
                            <h4 className="text-[11px] font-black text-gray-950 tracking-widest uppercase">LAMA PROSES</h4>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              <span className="text-[13px] font-bold text-gray-700">{pkg.lamaProses}</span>
                              <span className="bg-blue-50 text-blue-600 text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded">FYI</span>
                            </div>
                          </div>

                          {/* YANG DIPEROLEH */}
                          <div className="space-y-2.5">
                            <h4 className="text-[11px] font-black text-[#990202] tracking-widest uppercase">YANG DIPEROLEH</h4>
                            <ul className="space-y-2">
                              {pkg.yangDiperoleh.map((item, i) => (
                                <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-700 leading-relaxed">
                                  <Check className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* BONUS */}
                          <div className="space-y-2.5">
                            <h4 className="text-[11px] font-black text-gray-950 tracking-widest uppercase">BONUS</h4>
                            <ul className="space-y-2">
                              {pkg.bonus.map((item, i) => (
                                <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-700 leading-relaxed">
                                  <Check className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                                  {typeof item === "string" ? (
                                    <span>{item}</span>
                                  ) : (
                                    <span>{item.text}: <strong className="font-extrabold text-gray-900">{item.highlight}</strong></span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* EXTRA BONUS */}
                          <div className="space-y-2.5">
                            <h4 className="text-[11px] font-black text-gray-950 tracking-widest uppercase">EXTRA BONUS</h4>
                            <ul className="space-y-2">
                              {pkg.extraBonus.map((item, i) => (
                                <li key={i} className="flex items-start text-[12.5px] font-medium text-gray-700 leading-relaxed">
                                  <Check className="w-3.5 h-3.5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3} />
                                  {typeof item === "string" ? (
                                    <span>{item}</span>
                                  ) : (
                                    <span>{item.text}: <strong className="font-extrabold text-gray-900">{item.value}</strong></span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </div>

                      {/* Card Button */}
                      <div className="px-6 pb-6 pt-1">
                        <a
                          href={pkg.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-3.5 border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow rounded-xl text-center font-extrabold text-[13.5px] transition-all duration-200 cursor-pointer shadow-sm"
                        >
                          {pkg.buttonText}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
          </div>
          {/* Pricing Footnote Box */}
          <div className="max-w-[1140px] mx-auto mt-6 sm:mt-12 bg-white border border-gray-200/60 rounded-2xl p-5 text-[11.5px] text-gray-500 leading-relaxed font-medium">
            <strong className="font-extrabold text-gray-800 mr-1.5">Keterangan:</strong>
            <span>(1) Harga belum termasuk PPN. Biaya &amp; estimasi ruangan lapangan dilakukan terpisah, all-in-cost. (2) Estimasi pelaksanaan Audit.</span>
          </div>

        </div>
      </section>

      {/* ─── 5. PROSES SERTIFIKASI ISO (7 Langkah) ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">PROSES SERTIFIKASI ISO</p>
            <h2 className="font-inter text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              7 langkah sertifikasi ISO, kami pandu A–Z.
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Dari gap analysis sampai sertifikat resmi terbit — semua tahap kami pendampingi dengan auditor UAF accredited.
            </p>
            {/* Scroll indicator text */}
            <div className="pt-4 text-[11px] font-black text-[#990202] tracking-widest uppercase flex items-center justify-center gap-1.5 animate-pulse">
              <span>Geser untuk lihat semua langkah</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
          </div>

          {/* Horizontal Scrollable Row */}
          <div className="relative max-w-[1240px] mx-auto">
            
            <div className="flex overflow-x-auto gap-6 pb-8 pt-8 -mx-4 px-4 sm:-mx-8 sm:px-8 scrollbar-thin scrollbar-thumb-red-600/20 scrollbar-track-transparent snap-x snap-mandatory scroll-smooth relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col min-w-[280px] sm:min-w-[320px] max-w-[320px] group snap-start pt-5">
                  
                  {/* Number Badge (Centered on top border) */}
                  <div className="absolute top-0 left-6 w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border-2 border-[#990202] text-[#990202] bg-white flex items-center justify-center font-black text-[14.5px] z-20 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  
                  {/* Card Container */}
                  <div className="bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-[24px] py-6 px-5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-350 flex flex-col justify-between flex-grow text-left h-full relative">
                    <div className="space-y-3">
                      
                      {/* Title */}
                      <h4 className="text-[16px] font-black text-gray-950 leading-tight pt-2">
                        {step.title}
                      </h4>
                      
                      {/* Duration Badge */}
                      <div className="inline-flex items-center gap-1.5 bg-[#FFF0F0] text-[#990202] text-[10px] font-black uppercase py-1 px-3 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-[#990202]" strokeWidth={3.5} />
                        <span>{step.duration}</span>
                      </div>

                      {/* Description */}
                      <p className="text-[12.5px] text-gray-500 font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />

                    </div>

                    <div>
                      {/* Dotted Divider */}
                      <div className="border-t border-dashed border-gray-200 my-4"></div>

                      {/* Checklist */}
                      <ul className="space-y-2">
                        {step.checklist.map((item, pIdx) => (
                          <li key={pIdx} className="flex items-start text-[12px] font-bold text-gray-700 leading-tight">
                            <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span dangerouslySetInnerHTML={{ __html: item }} />
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

      {/* ─── 6. FAQ SECTION (6 Tanya-Jawab Mockup) ─── */}
      <FAQ title="Pertanyaan seputar sertifikasi ISO." subtitle="Belum yakin? Mungkin jawabannya ada di sini." items={faqs} />

      {/* ─── 7. CTA BANNER (Mockup Clean White) ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-t border-gray-100/60 relative">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          {/* Left Column */}
          <div className="space-y-4 max-w-2xl text-left">
            <h2 className="font-inter text-[20px] sm:text-[40px] font-extrabold leading-tight tracking-tight text-gray-950">
              Siap dapatkan <span className="text-[#990202]">sertifikasi ISO UAF Accredited?</span>
            </h2>
            <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 leading-relaxed font-medium">
              Konsultasikan standar ISO yang sesuai industri & skala bisnis Anda — gratis, tanpa komitmen.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-auto flex flex-col gap-3.5 min-w-[340px] sm:min-w-[360px]">
            {/* Button WhatsApp */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Sertifikasi ISO perusahaan. Boleh minta info penawaran khusus?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 px-7 py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[14.5px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.122.953 11.5.953c-5.439 0-9.859 4.37-9.864 9.8-.001 1.73.457 3.41 1.32 4.927l-.982 3.58 3.673-.956zm11.517-5.595c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.924-2.225-.244-.588-.491-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.116 4.52 1.228.531 2.186.848 2.93 1.083.755.238 1.44.205 1.984.124.606-.091 1.774-.725 2.024-1.425.25-.7.25-1.299.175-1.425-.076-.125-.275-.2-.575-.35z"/>
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>

            {/* Button Hubungi Tim Kami */}
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Sertifikasi ISO perusahaan. Boleh minta info penawaran khusus?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-300 font-extrabold text-[14.5px] rounded-xl shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Hubungi Tim Kami</span>
              <span className="text-[15px] font-normal">→</span>
            </a>

            {/* Fast Response Badge */}
            <div className="flex items-center justify-center gap-1.5 text-[12px] text-gray-500 font-medium pt-0.5">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
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
