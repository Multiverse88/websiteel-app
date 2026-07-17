"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Check,
  Home,
  ArrowRight,
  Shield,
  FileText,
  BookOpen,
  Tag,
  Star,
  ShoppingBag,
  Search,
  RotateCw,
  RefreshCw,
  ShieldAlert,
  User,
  Building,
  AlertCircle,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import Pricing, { PricingPackage } from "@/components/Pricing";
import PricingFooter from "@/components/PricingFooter";
import MediaCoverage from "@/components/MediaCoverage";
import Benefits from "@/components/Benefits";
import { getWhatsAppLink } from "@/lib/config";
import BottomPromoSection from "@/components/home/BottomPromoSection";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/CTA";

  interface AdditionalServiceItem {
    text: string;
    checked: boolean;
    footnoteIndex?: number;
  }

  interface AdditionalServiceGroup {
    title: string;
    items: AdditionalServiceItem[];
  }

  interface AdditionalServiceCard {
    title: string;
    price: string;
    strikePrice?: string;
    subLabel?: string;
    isPopular?: boolean;
    badgeText?: string;
    groups: AdditionalServiceGroup[];
    buttonText: string;
    buttonLink: string;
  }

  interface AdditionalServiceTab {
    id: "pengecekan" | "perpanjangan" | "pengalihan" | "penolakan";
    label: string;
    icon: React.ReactNode;
    cards: AdditionalServiceCard[];
    footnote?: string;
  }

const hakiBenefits = [
    {
      icon: <Shield className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Perlindungan Hukum",
      desc: "Hak eksklusif terbukti — Anda bisa tuntut siapa saja yang menjiplak brand."
    },
    {
      icon: <Star className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Aset Berharga",
      desc: "Merek terdaftar bisa dijual, dilisensikan, atau diwariskan — aset intangible bisnis."
    },
    {
      icon: <span className="text-[14px] sm:text-[14px] sm:text-[20px] font-black text-[#990202]">$</span>,
      title: "Kredibilitas Brand",
      desc: "Logo ® meningkatkan kepercayaan konsumen — bukti bisnis yang serius."
    },
    {
      icon: <ShoppingBag className="w-5.5 h-5.5 text-[#990202]" />,
      title: "Syarat Marketplace",
      desc: "Wajib untuk official store di Shopee Mall, Tokopedia Mall, dan e-commerce lainnya."
    }
  ];

const additionalTabs: AdditionalServiceTab[] = [
    {
      id: "pengecekan",
      label: "Pengecekan Merek",
      icon: <Search className="w-4 h-4" />,
      footnote: "<strong class=\"font-extrabold text-gray-800\">Keterangan: (1)</strong> Jika tidak ada kendala atau gangguan pada sistem DJKI.",
      cards: [
        {
          title: "CEK MEREK MANUAL",
          price: "Rp 299.000",
          strikePrice: "Rp 375.000",
          subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
          buttonText: "Pilih Cek Manual",
          buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Layanan Cek Merek Manual. Mohon info biaya dan prosesnya."),
          groups: [
            {
              title: "LAMA PROSES",
              items: [
                { text: "1-2 Hari Kerja", checked: true, footnoteIndex: 1 }
              ]
            },
            {
              title: "YANG DIPEROLEH",
              items: [
                { text: "5× Pemeriksaan Merek Manual", checked: true },
                { text: "Ringkasan Daftar Merek Pembanding", checked: true },
                { text: "Rekomendasi Merek dapat didaftarkan atau tidak", checked: true }
              ]
            }
          ]
        },
        {
          title: "CEK MEREK AI",
          price: "Rp 499.000",
          strikePrice: "Rp 625.000",
          subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
          isPopular: true,
          badgeText: "REKOMENDASI",
          buttonText: "Pilih Cek AI",
          buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Layanan Cek Merek AI. Mohon info biaya dan prosesnya."),
          groups: [
            {
              title: "LAMA PROSES",
              items: [
                { text: "1 Hari Kerja", checked: true, footnoteIndex: 1 }
              ]
            },
            {
              title: "YANG DIPEROLEH",
              items: [
                { text: "5× Pemeriksaan Merek Manual", checked: true },
                { text: "1× Pemeriksaan Merek dengan AI", checked: true },
                { text: "Laporan Hasil Analisa Cek Merek Detail & Terperinci", checked: true },
                { text: "% Keberhasilan Pendaftaran Merek", checked: true },
                { text: "Daftar Merek Lain yang memiliki Kemiripan", checked: true },
                { text: "Tips Cara Meningkatkan Keberhasilan", checked: true }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "perpanjangan",
      label: "Perpanjangan",
      icon: <RotateCw className="w-4 h-4" />,
      footnote: "<strong class=\"font-extrabold text-gray-800\">Keterangan: (1)</strong> Jika tidak ada kendala atau gangguan pada sistem DJKI.",
      cards: [
        {
          title: "PERPANJANGAN UMKM",
          price: "Rp 2.499.000",
          strikePrice: "Rp 3.500.000",
          subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
          buttonText: "Pilih Perpanjangan UMKM",
          buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Layanan Perpanjangan Merek UMKM. Mohon info biaya dan prosesnya."),
          groups: [
            {
              title: "LAMA PROSES",
              items: [
                { text: "1-2 Hari Kerja", checked: true, footnoteIndex: 1 }
              ]
            },
            {
              title: "YANG DIPEROLEH",
              items: [
                { text: "Pengurusan Perpanjangan Resmi ke DJKI", checked: true },
                { text: "Monitoring Penerbitan Surat Persetujuan Perpanjangan", checked: true },
                { text: "Termasuk PNBP DJKI UMKM Rp 1.000.000", checked: true },
                { text: "Gratis Konsultasi Legalitas Merek", checked: true }
              ]
            }
          ]
        },
        {
          title: "PERPANJANGAN UMUM",
          price: "Rp 3.999.000",
          strikePrice: "Rp 5.500.000",
          subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
          isPopular: true,
          badgeText: "REKOMENDASI",
          buttonText: "Pilih Perpanjangan Umum",
          buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Layanan Perpanjangan Merek Umum. Mohon info biaya dan prosesnya."),
          groups: [
            {
              title: "LAMA PROSES",
              items: [
                { text: "1-2 Hari Kerja", checked: true, footnoteIndex: 1 }
              ]
            },
            {
              title: "YANG DIPEROLEH",
              items: [
                { text: "Pengurusan Perpanjangan Resmi ke DJKI", checked: true },
                { text: "Monitoring Penerbitan Surat Persetujuan Perpanjangan", checked: true },
                { text: "Termasuk PNBP DJKI Umum Rp 2.200.000", checked: true },
                { text: "Gratis Konsultasi Legalitas Merek", checked: true }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "pengalihan",
      label: "Pengalihan",
      icon: <RefreshCw className="w-4 h-4" />,
      footnote: "<strong class=\"font-extrabold text-gray-800\">Keterangan: (1)</strong> Jika tidak ada kendala atau gangguan pada sistem DJKI.",
      cards: [
        {
          title: "PENGALIHAN HAK MEREK",
          price: "Rp 1.999.000",
          strikePrice: "Rp 3.000.000",
          subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
          isPopular: true,
          badgeText: "REKOMENDASI",
          buttonText: "Pilih Pengalihan Hak",
          buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Layanan Pengalihan Hak Merek. Mohon info biaya dan prosesnya."),
          groups: [
            {
              title: "LAMA PROSES",
              items: [
                { text: "1-3 Hari Kerja", checked: true, footnoteIndex: 1 }
              ]
            },
            {
              title: "YANG DIPEROLEH",
              items: [
                { text: "Drafting Perjanjian Pengalihan Hak (Deed of Transfer)", checked: true },
                { text: "Submit Pengajuan Pengalihan ke DJKI Online", checked: true },
                { text: "Termasuk PNBP Resmi Pengalihan Hak DJKI", checked: true },
                { text: "Monitoring s.d. Surat Pencatatan Resmi Terbit", checked: true }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "penolakan",
      label: "Tanggapan Penolakan",
      icon: <ShieldAlert className="w-4 h-4" />,
      footnote: "<strong class=\"font-extrabold text-gray-800\">Keterangan: (1)</strong> Jika tidak ada kendala atau gangguan pada sistem DJKI.",
      cards: [
        {
          title: "TANGGAPAN PENOLAKAN DJKI",
          price: "Rp 2.499.000",
          strikePrice: "Rp 4.000.000",
          subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
          isPopular: true,
          badgeText: "REKOMENDASI",
          buttonText: "Pilih Tanggapan Penolakan",
          buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Layanan Tanggapan Penolakan DJKI. Mohon info biaya dan prosesnya."),
          groups: [
            {
              title: "LAMA PROSES",
              items: [
                { text: "2-3 Hari Kerja", checked: true, footnoteIndex: 1 }
              ]
            },
            {
              title: "YANG DIPEROLEH",
              items: [
                { text: "Analisis Surat Usulan Penolakan Substantif DJKI", checked: true },
                { text: "Penyusunan Argumentasi Hukum & Kontra-Memori Bantahan", checked: true },
                { text: "Submit Bantahan Resmi ke Portal DJKI sebelum 30 hari", checked: true },
                { text: "Monitoring s.d. Keputusan Akhir Pemeriksa Terbit", checked: true }
              ]
            }
          ]
        }
      ]
    }
  ];

const pricingPackages: PricingPackage[] = [
    {
      title: "PAKET BASIC",
      price: "Rp 2.799.000",
      strikePrice: "Rp 3.500.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pendaftaran Merek. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [
            { text: "1 Hari Kerja", checked: true, footnoteIndex: 1 }
          ]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Konsultasi HAKI Merek", checked: true },
            { text: "Rekomendasi pemilihan Kelas Merek", checked: true },
            { text: "Monitoring perubahan Status Merek", checked: true },
            { text: "E-Sertifikat Merek", checked: true, footnoteIndex: 2 },
            { text: "5× Pemeriksaan Merek Manual", checked: true },
            { text: "1× Pemeriksaan Merek dengan AI", checked: false },
            { text: "Tanggapan/Keberatan Penolakan", checked: false },
            { text: "Garansi Uang Kembali", checked: false, footnoteIndex: 3 }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "Undian iPhone", boldText: "1 Kupon", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "Voucher EasyLegal", boldText: "Rp 250.000", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    },
    {
      title: "BASIC + AI",
      price: "Rp 3.199.000",
      strikePrice: "Rp 4.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Basic + AI",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic plus AI Pendaftaran Merek. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [
            { text: "1 Hari Kerja", checked: true, footnoteIndex: 1 }
          ]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Konsultasi HAKI Merek", checked: true },
            { text: "Rekomendasi pemilihan Kelas Merek", checked: true },
            { text: "Monitoring perubahan Status Merek", checked: true },
            { text: "E-Sertifikat Merek", checked: true, footnoteIndex: 2 },
            { text: "5× Pemeriksaan Merek Manual", checked: true },
            { text: "1× Pemeriksaan Merek dengan AI", checked: true },
            { text: "Tanggapan/Keberatan Penolakan", checked: false },
            { text: "Garansi Uang Kembali", checked: false, footnoteIndex: 3 }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "Undian iPhone", boldText: "1 Kupon", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "Voucher EasyLegal", boldText: "Rp 250.000", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    },
    {
      title: "PREMIUM",
      price: "Rp 3.599.000",
      strikePrice: "Rp 4.500.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      badgeText: "PALING POPULER",
      buttonText: "Pilih Premium",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Premium Pendaftaran Merek. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [
            { text: "1 Hari Kerja", checked: true, footnoteIndex: 1 }
          ]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Konsultasi HAKI Merek", checked: true },
            { text: "Rekomendasi pemilihan Kelas Merek", checked: true },
            { text: "Monitoring perubahan Status Merek", checked: true },
            { text: "E-Sertifikat Merek", checked: true, footnoteIndex: 2 },
            { text: "5× Pemeriksaan Merek Manual", checked: true },
            { text: "1× Pemeriksaan Merek dengan AI", checked: true },
            { text: "Tanggapan/Keberatan Penolakan", checked: true },
            { text: "Garansi Uang Kembali", checked: false, footnoteIndex: 3 }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "Undian iPhone", boldText: "1 Kupon", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "Voucher EasyLegal", boldText: "Rp 250.000", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    },
    {
      title: "ULTIMATE",
      price: "Rp 4.399.000",
      strikePrice: "Rp 5.500.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Ultimate",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Ultimate Pendaftaran Merek. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [
            { text: "1 Hari Kerja", checked: true, footnoteIndex: 1 }
          ]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Konsultasi HAKI Merek", checked: true },
            { text: "Rekomendasi pemilihan Kelas Merek", checked: true },
            { text: "Monitoring perubahan Status Merek", checked: true },
            { text: "E-Sertifikat Merek", checked: true, footnoteIndex: 2 },
            { text: "5× Pemeriksaan Merek Manual", checked: true },
            { text: "1× Pemeriksaan Merek dengan AI", checked: true },
            { text: "Tanggapan/Keberatan Penolakan", checked: true },
            { text: "Garansi Uang Kembali", checked: true, footnoteIndex: 3 }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "Undian iPhone", boldText: "1 Kupon", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "Voucher EasyLegal", boldText: "Rp 500.000", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    }
  ];

const pricingFootnotes = [
    "Setelah Draft Pendaftaran Merek disetujui.",
    "Sertifikat merek diterbitkan setelah merek dinyatakan berhasil pada masa pengumuman, berlangsung sekitar &plusmn;6 hingga 18 bulan.",
    "Apabila permohonan pendaftaran merek ditolak secara resmi oleh DJKI, Kami memberikan garansi uang kembali jasa EasyLegal sebesar <strong class=\"font-extrabold text-gray-950\">Rp 2.300.000</strong>."
  ];

const faqs = [
    {
      q: "Berapa lama sertifikat merek keluar?",
      a: "Total <strong class=\"font-extrabold text-gray-950\">12–18 bulan</strong> dari submit sampai sertifikat fisik terbit. Tapi <strong class=\"font-extrabold text-gray-950\">tanda terima resmi</strong> dari DJKI keluar dalam 1–2 minggu — sejak tanda terima ini Anda sudah punya hak prioritas pemakaian merek dan bisa pakai logo <sup>™</sup>.",
    },
    {
      q: "Apa beda merek terdaftar vs tidak terdaftar?",
      a: "Merek terdaftar mendapatkan <strong class=\"font-extrabold text-gray-950\">perlindungan hukum eksklusif</strong> selama 10 tahun dan dapat diperpanjang, serta berhak menggunakan simbol ®. Merek tidak terdaftar hanya memiliki perlindungan berbasis pembuktian pemakai pertama yang sangat lemah di pengadilan dan berisiko diserobot pihak lain.",
    },
    {
      q: "Apa itu kelas merek dan kenapa penting?",
      a: "Kelas merek (Nice Classification) adalah pengelompokan jenis barang atau jasa (Kelas 1–45). Memilih kelas yang tepat sangat penting karena perlindungan hukum merek <strong class=\"font-extrabold text-gray-950\">hanya berlaku</strong> pada kelas yang didaftarkan saja.",
    },
    {
      q: "Berapa biaya per kelas tambahan?",
      a: "Biaya per kelas tambahan dihitung akumulatif sesuai tarif resmi PNBP DJKI. Untuk jalur UMKM sebesar Rp 500.000 per kelas, sedangkan jalur Umum sebesar Rp 1.800.000 per kelas, ditambah biaya jasa pendampingan yang transparan.",
    },
    {
      q: "Bagaimana kalau pendaftaran saya ditolak DJKI?",
      a: "Jika ditolak sementara (Provisional Refusal), Anda dapat mengajukan bantahan tertulis atau tanggapan dalam waktu 30 hari. Tim ahli EasyLegal siap membantu menyusun argumentasi hukum yang kuat untuk memaksimalkan peluang persetujuan.",
    },
    {
      q: "Bisa daftar merek untuk usaha online (e-commerce)?",
      a: "Ya, sangat bisa dan sangat direkomendasikan. Perlindungan merek akan melindungi nama toko online, produk, atau jasa Anda di berbagai marketplace nasional dan internasional agar tidak diduplikasi oleh kompetitor.",
    },
    {
      q: "Apakah perlu logo, atau cukup nama saja?",
      a: "Anda bisa mendaftarkan kata (nama merek saja), logo (visual saja), atau kombinasi keduanya. Mendaftarkan keduanya sekaligus dalam satu aplikasi memberikan perlindungan paling menyeluruh dan efisien.",
    },
  ];

export default function MerekHaki() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  

  const [activeTab, setActiveTab] = useState<"pengecekan" | "perpanjangan" | "pengalihan" | "penolakan">("pengecekan");

  

  

  

  

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-8 sm:py-20 border-b border-gray-200/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[14px] sm:text-[14px] sm:text-[14px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[14px] font-bold text-gray-900">Merek & HAKI</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100 shadow-sm animate-pulse-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[14px] sm:text-[14px] sm:text-[14px] font-bold text-[#990202] tracking-wide">Merek & HAKI</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                Daftar merek sekali, <br />
                brand <span className="text-[#990202]">aman 10 tahun</span>
              </h1>

              {/* Description */}
              <p className="text-[14px] sm:text-[16.5px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                Lindungi nama, logo, dan identitas bisnis Anda dari penjiplakan. Kami pandu pemilihan kelas yang tepat & kelola seluruh proses pendaftaran resmi di DJKI.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-row gap-3 pt-2">
                <Link
                  href="/cek-nama"
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 bg-[#990202] text-white font-bold text-[14px] sm:text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <span>Cek Nama Merek</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 shadow-md border border-black/[0.04] text-gray-800 font-bold text-[14px] sm:text-[15px] rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Lihat Paket Harga
                </a>
              </div>

              {/* Bottom Features Row */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-[580px]">
                {/* Feature 1 */}
                <div className="flex items-center space-x-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <Shield className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[14px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">10 tahun</div>
                    <div className="text-[14px] text-gray-500 mt-0.5">Perlindungan</div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center space-x-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <BookOpen className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[14px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">45 kelas</div>
                    <div className="text-[14px] text-gray-500 mt-0.5">Nice Classification</div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center space-x-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <span className="text-[18px] font-extrabold text-[#990202]">$</span>
                  </div>
                  <div>
                    <div className="text-[14px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">Mulai Rp2,79jt</div>
                    <div className="text-[14px] text-gray-500 mt-0.5">harga transparan</div>
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
                    src="/images/layanan/merek-1.jpg"
                    alt="Pendaftaran Merek & HAKI EasyLegal"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge 1: Merek Terdaftar (Top Left) */}
                <div className="absolute -top-6 -left-2 sm:-left-6 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] shadow-md border border-black/[0.03] flex items-center space-x-3.5 w-[230px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Tag className="w-5.5 h-5.5 stroke-[2.2] text-[#D97706]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-black text-gray-900 leading-none">Merek Terdaftar</div>
                    <div className="text-[14px] text-gray-400 font-bold mt-1.5">No. IDM000xxxxx · DJKI</div>
                  </div>
                </div>

                {/* Floating Badge 2: Hak Eksklusif (Bottom Right) */}
                <div className="absolute -bottom-6 -right-2 sm:-right-4 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] shadow-md border border-black/[0.03] flex items-center space-x-3.5 w-[215px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <ShieldCheck className="w-5.5 h-5.5 text-[#990202]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-black text-gray-900 leading-none">Hak Eksklusif</div>
                    <div className="text-[14px] text-gray-400 font-bold mt-1.5">Aktif sampai 2036</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. MEDIA COVERAGE ─── */}
      <MediaCoverage />

      {/* ─── 3. MANFAAT DAFTAR MEREK ─── */}
      <Benefits
        sectionTitleTag="MANFAAT DAFTAR MEREK"
        sectionTitle="Kenapa brand Anda harus didaftarkan?"
        items={hakiBenefits}
      />

      {/* ─── 4. PAKET HARGA (PRICING GRID) ─── */}
      <BottomPromoSection />

      <Pricing hideFooter={true}
        sectionTitleTag="BIAYA JASA PENDAFTARAN MEREK"
        sectionTitle="4 paket pendaftaran merek di DJKI."
        sectionSubtitle="Harga sudah include biaya resmi DJKI & jasa kami — tidak ada tambahan di tengah proses."
        packages={pricingPackages}
        footnotes={pricingFootnotes}
        promoBadgeSrc="/images/badges/promo-20.png"
      />

      {/* ─── 5. LAYANAN TAMBAHAN MEREK (TABBED PRICING) ─── */}
      <section className="bg-[#F9FAFB] py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-10 space-y-3">
            <p className="text-[14px] font-extrabold text-[#990202] uppercase tracking-widest text-center">
              LAYANAN TAMBAHAN MEREK
            </p>
            <h2 className="font-heading text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight text-center">
              Lebih dari sekadar pendaftaran.
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium text-center">
              Pengecekan, perpanjangan, pengalihan, dan tanggapan keberatan — pilih layanan untuk lihat detail harga.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8 sm:mb-16">
            {additionalTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const tabClass = isActive
                ? "inline-flex items-center space-x-2 bg-[#990202] text-white py-3 px-6 rounded-2xl shadow-md border border-[#990202] font-extrabold text-[14px] transition-all duration-200 cursor-pointer"
                : "inline-flex items-center space-x-2 bg-white text-gray-600 hover:text-gray-800 py-3 px-6 rounded-2xl shadow-md border border-black/[0.04] hover:border-gray-300 font-bold text-[14px] sm:text-[14px] shadow-sm hover:shadow transition-all duration-200 cursor-pointer";
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={tabClass}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Pricing Cards Grid */}
          {(() => {
            const currentTab = additionalTabs.find((t) => t.id === activeTab);
            if (!currentTab) return null;

            const gridCols =
              currentTab.cards.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-[960px]"
                : "grid-cols-1 max-w-[480px]";

            return (
              <div className="space-y-12">
                <div className={`grid ${gridCols} gap-8 mx-auto items-stretch`}>
                  {currentTab.cards.map((card, cIdx) => {
                    const cardBorder = card.isPopular
                      ? "border-[3px] border-[#990202] shadow-[0_20px_50px_rgba(0,0,0,0.045)] group-hover:shadow-[0_20px_50px_rgba(153,2,2,0.12)] scale-[1.02] relative z-10 transition-all duration-300"
                      : "shadow-md border border-black/[0.03] shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300";
                    const headerBg = card.isPopular ? "bg-[#990202]" : "bg-[#1A1A1A]";

                    return (
                      <div key={cIdx} className="relative group h-full">
                        {/* Interactive Red Hover Glow behind Card */}
                        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[32px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
                        
                        <div
                          className={`bg-white rounded-[32px] overflow-hidden flex flex-col justify-between h-full ${cardBorder}`}
                        >
                          <div>
                            {/* Card Header */}
                            <div className={`${headerBg} p-6 text-white text-center relative`}>
                              {card.isPopular && card.badgeText && (
                                <div className="absolute top-2.5 left-0 right-0 text-[14px] font-black uppercase tracking-wider text-white bg-red-800/80 py-0.5 w-[110px] mx-auto rounded-full">
                                  {card.badgeText}
                                </div>
                              )}
                              <h3 className={`text-[17px] sm:text-[18px] font-black text-white uppercase tracking-wider ${card.isPopular && card.badgeText ? "mt-2.5" : ""}`}>
                                {card.title}
                              </h3>
                              {card.strikePrice && (
                                <div className={`mt-3 text-[14px] font-bold line-through ${card.isPopular ? "text-red-200" : "text-gray-400"}`}>
                                  {card.strikePrice}
                                </div>
                              )}
                              <div className="mt-1 flex items-baseline justify-center">
                                <span className="text-[28px] sm:text-[22px] sm:text-[30px] font-black tracking-tight">{card.price}</span>
                              </div>
                              {card.subLabel && (
                                <div className={`mt-2.5 text-[14px] font-bold tracking-widest uppercase ${card.isPopular ? "text-red-100" : "text-gray-400"}`}>
                                  {card.subLabel}
                                </div>
                              )}
                            </div>

                            {/* Card Content List */}
                            <div className="p-6.5 space-y-6">
                              {card.groups.map((group, gIdx) => (
                                <div key={gIdx} className="space-y-2.5">
                                  <h5 className="text-[14px] font-extrabold tracking-widest text-[#990202] uppercase mb-1">
                                    {group.title}
                                  </h5>
                                  <ul className="space-y-2.5">
                                    {group.items.map((item, iIdx) => (
                                      <li key={iIdx} className="flex items-start text-[14px] font-medium text-gray-700">
                                        <Check className="w-4 h-4 text-emerald-500 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                                        <span>
                                          {item.text}
                                          {item.footnoteIndex && (
                                            <sup className="text-[14px] font-semibold text-[#990202] ml-0.5">
                                              ({item.footnoteIndex})
                                            </sup>
                                          )}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="px-6.5 pb-7 pt-1">
                            <a
                              href={card.buttonLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`block w-full py-3.5 rounded-xl text-center font-extrabold text-[14px] transition-all duration-200 cursor-pointer shadow-sm ${
                                card.isPopular
                                  ? "bg-[#990202] hover:bg-[#800000] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                  : "shadow-md border border-black/[0.04] text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow"
                              }`}
                            >
                              {card.buttonText}
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tab Footnote Box */}
                {currentTab.footnote && (
                  <div className="bg-white shadow-md border border-black/[0.03] rounded-2xl p-5 text-[14px] text-gray-500 leading-relaxed max-w-[960px] mx-auto font-medium shadow-sm">
                    <span dangerouslySetInnerHTML={{ __html: currentTab.footnote }} />
                  </div>
                )}
              </div>
            );
          })()}

        </div>
      </section>

      {/* ─── 6. PENGERTIAN MEREK ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

          {/* Section Header */}
          <div className="mb-14">
            <p className="text-[14px] font-extrabold text-[#990202] uppercase tracking-wider mb-2">PENGERTIAN MEREK</p>
            <h2 className="font-heading text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Apa itu Merek & HAKI?
            </h2>
            <p className="text-[14px] sm:text-[14px] sm:text-[14.5px] text-gray-500 mt-3 font-normal max-w-2xl">
              Sebelum mulai, kenali dulu apa itu merek dan kenapa pendaftaran resmi penting untuk brand Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image with floating badge */}
            <div className="lg:col-span-6 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-[500px] lg:max-w-none">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.06)] bg-white aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <Image
                    src="/images/layanan/merek-2.jpg"
                    alt="Workspace desainer logo dan merek"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Floating Badge (Bottom Left) */}
                <div className="absolute -bottom-6 left-4 bg-white rounded-2xl p-4 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] shadow-md border border-black/[0.03] flex items-center space-x-3.5 w-[280px] sm:w-[320px]">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-[#990202] text-white flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[14px] font-black text-gray-900 leading-none">Dasar Hukum</div>
                    <div className="text-[14px] text-gray-400 font-bold mt-1.5 leading-snug">UU No. 20 Tahun 2016 tentang Merek &amp; Indikasi Geografis</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Paragraph and checklist */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed font-normal">
                <strong className="font-extrabold text-gray-900">Merek</strong> adalah tanda yang dapat ditampilkan secara grafis berupa gambar, logo, nama, kata, huruf, angka, susunan warna — atau kombinasinya — yang membedakan barang atau jasa Anda dari yang lain.
              </p>
              <p className="text-[15px] sm:text-[16px] text-gray-600 leading-relaxed font-normal">
                Pendaftaran merek di <strong className="font-extrabold text-gray-900">DJKI (Direktorat Jenderal Kekayaan Intelektual)</strong> memberikan Anda hak eksklusif menggunakan merek tersebut selama <strong className="font-extrabold text-gray-900">10 tahun</strong> &amp; bisa diperpanjang terus-menerus — sebagai bentuk perlindungan hukum terhadap brand bisnis Anda.
              </p>

              <div className="space-y-4 pt-2">
                <h4 className="text-[18px] font-extrabold text-gray-950">Jenis Merek</h4>

                <ul className="space-y-3">
                  <li className="flex items-start text-[14px] font-medium text-gray-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </div>
                    <span><strong className="font-extrabold text-gray-900 mr-1.5">Merek Dagang</strong> — untuk produk/barang (Kelas 1–34).</span>
                  </li>
                  <li className="flex items-start text-[14px] font-medium text-gray-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </div>
                    <span><strong className="font-extrabold text-gray-900 mr-1.5">Merek Jasa</strong> — untuk layanan/jasa (Kelas 35–45).</span>
                  </li>
                  <li className="flex items-start text-[14px] font-medium text-gray-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </div>
                    <span><strong className="font-extrabold text-gray-900 mr-1.5">Merek Kolektif</strong> — digunakan oleh kelompok/asosiasi untuk barang/jasa sejenis.</span>
                  </li>
                  <li className="flex items-start text-[14px] font-medium text-gray-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                      <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                    </div>
                    <span><strong className="font-extrabold text-gray-900 mr-1.5">Indikasi Geografis</strong> — untuk produk khas suatu wilayah (mis. Kopi Gayo, Batik Pekalongan).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 7. DOKUMEN PERSYARATAN (YANG PERLU DISIAPKAN) ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <p className="text-[14px] font-extrabold text-[#990202] uppercase tracking-widest text-center">
              DOKUMEN PERSYARATAN
            </p>
            <h2 className="font-heading text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight text-center">
              Yang perlu Anda siapkan.
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium text-center">
              Persyaratan dokumen pendaftaran merek berbeda untuk pemohon perorangan &amp; badan usaha. Tim kami bantu siapkan semuanya.
            </p>
          </div>

          {/* Grid Layout of 2 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1080px] mx-auto items-stretch">
            
            {/* Card 1: Pemohon Perorangan */}
            <div className="bg-white shadow-md border border-black/[0.03] rounded-3xl p-6.5 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:border-gray-200 transition-all duration-300 flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-gray-950 leading-tight">Pemohon Perorangan</h3>
                  <p className="text-[14px] text-gray-400 font-bold mt-1">Untuk individu / UMKM</p>
                </div>
              </div>
              
              <div className="h-px bg-gray-100" />
              
              <ul className="space-y-3.5">
                {[
                  { bold: "KTP Pemohon", normal: "yang masih berlaku" },
                  { bold: "NPWP Pemohon", normal: "(perorangan)" },
                  { bold: "File Logo Merek", normal: "format JPG/PNG min. 1024×1024 px" },
                  { bold: "Rincian Barang / Jasa", normal: "sesuai Nice Classification" },
                  { bold: "Surat Pernyataan UMKM", normal: "(jika UMKM untuk tarif khusus)" },
                  { bold: "Surat Kuasa", normal: "bermaterai (disediakan kami)" },
                  { bold: "Tanda Tangan Pemohon", normal: "bermaterai 10.000" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-[14.5px] text-gray-700 leading-relaxed font-medium">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3 flex-shrink-0 mt-0.5 animate-pulse-subtle" strokeWidth={3.5} />
                    <span>
                      <strong className="font-extrabold text-gray-950 mr-1.5">{item.bold}</strong>
                      <span className="text-gray-505">{item.normal}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Pemohon Badan Usaha */}
            <div className="bg-white shadow-md border border-black/[0.03] rounded-3xl p-6.5 sm:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:border-gray-200 transition-all duration-300 flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[18px] font-extrabold text-gray-950 leading-tight">Pemohon Badan Usaha</h3>
                  <p className="text-[14px] text-gray-400 font-bold mt-1">Untuk PT / CV / Yayasan</p>
                </div>
              </div>
              
              <div className="h-px bg-gray-100" />
              
              <ul className="space-y-3.5">
                {[
                  { bold: "Akta Pendirian", normal: "& SK Kemenkumham terbaru" },
                  { bold: "NPWP Perusahaan", normal: "" },
                  { bold: "KTP Direktur", normal: "/ penanggung jawab" },
                  { bold: "File Logo Merek", normal: "format JPG/PNG min. 1024×1024 px" },
                  { bold: "Rincian Barang / Jasa", normal: "sesuai Nice Classification" },
                  { bold: "Surat Kuasa", normal: "bermaterai dari direktur" },
                  { bold: "Tanda Tangan Direktur", normal: "bermaterai 10.000" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-[14.5px] text-gray-700 leading-relaxed font-medium">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3 flex-shrink-0 mt-0.5 animate-pulse-subtle" strokeWidth={3.5} />
                    <span>
                      <strong className="font-extrabold text-gray-950 mr-1.5">{item.bold}</strong>
                      <span className="text-gray-505">{item.normal}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Info Alert Box */}
          <div className="max-w-[1080px] mx-auto mt-8 bg-[#FFF5F5] border border-red-100 rounded-2xl p-5 flex items-start space-x-3.5 shadow-sm">
            <AlertCircle className="w-5.5 h-5.5 text-[#990202] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="text-[14px] sm:text-[14px] text-gray-600 leading-relaxed font-medium">
              <strong className="font-extrabold text-gray-900 mr-1">Tarif khusus UMKM:</strong> Pemohon perorangan dengan status UMKM mendapat tarif resmi DJKI yang lebih murah (Rp 500.000 vs Rp 1.800.000 untuk badan). Tim kami siap bantu lengkapi semua dokumen, termasuk pembuatan surat kuasa &amp; surat pernyataan UMKM.
            </p>
          </div>

        </div>
      </section>

      {/* ─── 8. TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── 9. FAQ SECTION ─── */}
      <FAQ title="Pertanyaan seputar pendaftaran merek." subtitle="Belum yakin? Mungkin jawabannya ada di sini." items={faqs} />

      {/* ─── 10. CTA SECTION ─── */}
      <CTA
        title={<h2 className="font-heading text-3xl sm:text-5xl font-black text-gray-950 leading-tight tracking-tight">Siap Mendaftarkan Merek Anda?</h2>}
        description="Konsultasikan kebutuhan pendaftaran merek Anda sekarang — GRATIS, tanpa komitmen."
        whatsappLink={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai layanan Pendaftaran Merek & HAKI.")}
        whatsappText="Hubungi Konsultan EasyLegal Sekarang"
      />
    </div>
  );
}
