"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  DollarSign,
  Upload,
  Building,
  ShieldCheck,
  Check,
  Home,
  ArrowRight,
  Users,
  FileText,
  Eye,
  UserCheck,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Image from "next/image";
import FAQ from "@/components/FAQ";
import Pricing, { PricingPackage } from "@/components/Pricing";
import { getWhatsAppLink } from "@/lib/config";

export default function PendirianYayasan() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const pricingPackages: PricingPackage[] = [
    {
      title: "PAKET BASIC",
      price: "Rp 2.999.000",
      strikePrice: "Rp 6.000.000",
      subLabel: "DISKON 50% · TANPA BIAYA TAMBAHAN",
      buttonText: "Pilih Paket Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pendirian Yayasan. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [
            { text: "Dokumen Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
            { text: "Dokumen Lainnya <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 }
          ]
        },
        {
          title: "FASILITAS",
          items: [
            { text: "Pengecekan & Pemesanan Nama Yayasan", checked: true },
            { text: "Anggaran Dasar & Anggaran Rumah Tangga", checked: true }
          ]
        },
        {
          title: "DOKUMEN PENDIRIAN",
          items: [
            { text: "Akta Notaris Pendirian Yayasan", checked: true },
            { text: "SK Kemenkumham (Pengesahan Badan Hukum)", checked: true }
          ]
        },
        {
          title: "DOKUMEN LAINNYA",
          items: [
            { text: "NPWP Yayasan", checked: true },
            { text: "NIB & Akun OSS", checked: false },
            { text: "Izin Operasional Yayasan", checked: false, footnoteIndex: 3 },
            { text: "Stempel Yayasan", checked: false }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistant", checked: true },
            { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
            { text: "Pembukaan Rekening Bank", checked: false, footnoteIndex: "*" },
            { text: "Gratis Ongkir <strong>Pulau Jawa</strong>", checked: false }
          ]
        }
      ]
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 4.999.000",
      strikePrice: "Rp 10.000.000",
      subLabel: "DISKON 50% · TANPA BIAYA TAMBAHAN",
      isPopular: true,
      badgeText: "PALING POPULER",
      buttonText: "Pilih Paket Complete",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Complete Pendirian Yayasan. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [
            { text: "Dokumen Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
            { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 }
          ]
        },
        {
          title: "FASILITAS",
          items: [
            { text: "Pengecekan & Pemesanan Nama Yayasan", checked: true },
            { text: "Anggaran Dasar & Anggaran Rumah Tangga", checked: true },
            { text: "Konsultasi Struktur Organ Yayasan", checked: true }
          ]
        },
        {
          title: "DOKUMEN PENDIRIAN",
          items: [
            { text: "Akta Notaris Pendirian Yayasan", checked: true },
            { text: "SK Kemenkumham (Pengesahan Badan Hukum)", checked: true }
          ]
        },
        {
          title: "DOKUMEN LAINNYA",
          items: [
            { text: "NPWP Yayasan", checked: true },
            { text: "NIB & Akun OSS", checked: true },
            { text: "Izin Operasional Yayasan", checked: true, footnoteIndex: 3 },
            { text: "Stempel Yayasan (1 Warna)", checked: true }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistant", checked: true },
            { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
            { text: "Pembukaan Rekening Bank Yayasan", checked: true, footnoteIndex: "*" },
            { text: "Gratis Ongkir <strong>Pulau Jawa</strong>", checked: true }
          ]
        }
      ]
    },
    {
      title: "PAKET PRESTIGE",
      price: "Rp 5.999.000",
      strikePrice: "Rp 12.000.000",
      subLabel: "DISKON 50% · TANPA BIAYA TAMBAHAN",
      buttonText: "Pilih Paket Prestige",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Prestige Pendirian Yayasan. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [
            { text: "Dokumen Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
            { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 }
          ]
        },
        {
          title: "FASILITAS",
          items: [
            { text: "Pengecekan & Pemesanan Nama Yayasan", checked: true },
            { text: "Anggaran Dasar & Anggaran Rumah Tangga", checked: true },
            { text: "Konsultasi Struktur Organ Yayasan", checked: true }
          ]
        },
        {
          title: "DOKUMEN PENDIRIAN",
          items: [
            { text: "Akta Notaris Pendirian Yayasan", checked: true },
            { text: "SK Kemenkumham (Pengesahan Badan Hukum)", checked: true }
          ]
        },
        {
          title: "DOKUMEN LAINNYA",
          items: [
            { text: "NPWP Yayasan", checked: true },
            { text: "NIB & Akun OSS", checked: true },
            { text: "Izin Operasional Yayasan", checked: true, footnoteIndex: 3 },
            { text: "Stempel Yayasan (1-3 Warna)", checked: true }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistant", checked: true },
            { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
            { text: "Pembukaan Rekening Bank Yayasan", checked: true, footnoteIndex: "*" },
            { text: "Gratis Ongkir <strong>Seluruh Indonesia</strong>", checked: true }
          ]
        }
      ]
    }
  ];

  const pricingFootnotes = [
    { label: "1", text: "Setelah nama yayasan disetujui &amp; tidak terdapat kendala pada sistem AHU." },
    { label: "2", text: "Jika tidak terdapat kendala pada sistem Coretax &amp; OSS." },
    { label: "3", text: "Izin operasional sesuai bidang yayasan (sosial/keagamaan/kemanusiaan)." },
    { label: "*", text: "Syarat &amp; ketentuan berlaku — tergantung kebijakan bank yang dipilih." }
  ];

  const steps = [
    {
      no: "01",
      title: "Konsultasi & Perencanaan",
      duration: "1 HARI KERJA",
      desc: "Konsultasi gratis dengan tim legal kami untuk menentukan visi, misi, & struktur organ yayasan yang sesuai.",
      points: [
        "Identifikasi bidang yayasan (sosial/keagamaan/kemanusiaan)",
        "Penyusunan komposisi Pembina, Pengurus & Pengawas",
        "Penyusunan tujuan & kegiatan yayasan",
      ],
    },
    {
      no: "02",
      title: "Cek & Pemesanan Nama Yayasan",
      duration: "1 HARI KERJA",
      desc: "Kami verifikasi nama yayasan yang Anda inginkan di database AHU Kemenkumham, lalu pesan secara resmi.",
      points: [
        "Pengecekan ketersediaan nama di AHU",
        "Pemesanan nama resmi (berlaku 60 hari)",
        "Konfirmasi nama final & alternatif jika ditolak",
      ],
    },
    {
      no: "03",
      title: "Persiapan Dokumen Pengurus",
      duration: "1 HARI KERJA",
      desc: "Pengumpulan dokumen pendukung dari semua Pembina, Pengurus, & Pengawas — cukup foto/scan via portal kami.",
      points: [
        "Foto/scan KTP semua organ yayasan",
        "Foto/scan NPWP aktif semua organ yayasan",
        "Review & validasi oleh tim legal kami",
      ],
    },
    {
      no: "04",
      title: "Penyusunan Akta Pendirian",
      duration: "2 HARI KERJA",
      desc: "Notaris menyusun anggaran dasar & menandatangani akta pendirian — bisa via e-Notary (tanpa harus datang).",
      points: [
        "Drafting akta & AD/ART oleh notaris partner",
        "Penandatanganan akta (tatap muka atau e-Notary)",
        "Penyerahan Minuta Akta resmi",
      ],
    },
    {
      no: "05",
      title: "Pengesahan Kemenkumham",
      duration: "2-3 HARI KERJA",
      desc: "Pengajuan SK Pengesahan Badan Hukum Yayasan secara online ke Direktorat Jenderal Administrasi Hukum Umum (AHU) Kemenkumham.",
      points: [
        "Pendaftaran badan hukum yayasan",
        "Penerbitan SK Pengesahan Kemenkumham RI",
        "Status yayasan menjadi badan hukum sah",
      ],
    },
    {
      no: "06",
      title: "NPWP Yayasan & SKT Pajak",
      duration: "1-2 HARI KERJA",
      desc: "Pendaftaran Nomor Pokok Wajib Pajak (NPWP) khusus badan hukum yayasan dan penerbitan Surat Keterangan Terdaftar (SKT).",
      points: [
        "Pengajuan NPWP Badan Hukum Yayasan",
        "Penerbitan kartu NPWP & SKT Pajak",
        "Aktivasi akun pajak badan online",
      ],
    },
    {
      no: "07",
      title: "NIB & Aktivasi Akun OSS RBA",
      duration: "1 HARI KERJA",
      desc: "Penerbitan Nomor Induk Berusaha (NIB) yayasan di sistem OSS RBA untuk melegalisasi kegiatan/izin operasional yayasan.",
      points: [
        "Registrasi akun OSS RBA Yayasan",
        "Penerbitan NIB & dokumen perizinan usaha",
        "Yayasan siap beroperasi & menerima donasi",
      ],
    },
  ];

  const faqs = [
    {
      q: "Apa itu Yayasan?",
      a: "Yayasan adalah <strong>badan hukum</strong> yang terdiri atas kekayaan yang dipisahkan, didirikan untuk mencapai tujuan tertentu di bidang <strong>sosial, keagamaan, & kemanusiaan</strong>. Yayasan tidak memiliki anggota & tidak boleh membagikan keuntungan kepada pendiri atau pengurusnya — diatur dalam UU No. 16 Tahun 2001.",
    },
    {
      q: "Siapa saja yang wajib ada dalam struktur yayasan?",
      a: "Struktur yayasan wajib memiliki tiga organ utama: 1) <strong>Pembina</strong> (organ tertinggi), 2) <strong>Pengurus</strong> (Ketua, Sekretaris, Bendahara), dan 3) <strong>Pengawas</strong>. Satu orang tidak boleh merangkap jabatan pada organ yang berbeda.",
    },
    {
      q: "Berapa lama proses pendirian yayasan?",
      a: "Proses pembuatan akta pendirian yayasan selesai dalam <strong>2 hari kerja</strong>. Sedangkan untuk dokumen lengkap (SK Kemenkumham, NPWP, NIB) rata-rata memakan waktu <strong>5–7 hari kerja</strong>.",
    },
    {
      q: "Syarat dokumen apa saja yang dibutuhkan?",
      a: "Dokumen yang diperlukan meliputi: KTP & NPWP aktif dari Pembina, Pengurus, dan Pengawas, nama yayasan (minimal 3 kata), serta alamat lengkap domisili yayasan.",
    },
    {
      q: "Apakah yayasan bisa menggunakan Virtual Office?",
      a: "Ya, yayasan diperbolehkan menggunakan <strong>Virtual Office</strong> sebagai alamat domisili resmi, selama penyedia Virtual Office tersebut memiliki izin resmi dan berada di zona perkantoran/bisnis.",
    },
    {
      q: "Apakah yayasan bisa membagikan keuntungan ke pendiri?",
      a: "Sesuai UU Yayasan, <strong>tidak diperbolehkan</strong> membagikan sisa hasil usaha atau keuntungan kepada pendiri, pengurus, maupun pengawas. Semua hasil harus digunakan untuk mencapai tujuan sosial yayasan.",
    },
    {
      q: "Apakah yayasan bisa menjadi pemegang saham di PT?",
      a: "Ya, yayasan dapat melakukan penyertaan modal dalam berbagai bentuk badan usaha (seperti PT) yang bersifat prospektif, asalkan penyertaan tersebut tidak melebihi 25% dari seluruh nilai kekayaan yayasan.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
         {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-8 sm:py-20 border-b border-gray-200/40 overflow-hidden relative">
        {/* Subtle radial glows for premium aesthetics */}
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
                <span className="text-gray-300 font-normal">&rsaquo;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&rsaquo;</span>
                <span className="text-[13px] font-bold text-gray-900">Pendirian Yayasan</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100 shadow-sm animate-pulse-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[10px] sm:text-[10px] sm:text-[12.5px] font-bold text-[#990202] tracking-wide">Pendirian Yayasan</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                Bangun dampak sosial <br />
                dengan <span className="text-[#990202]">yayasan yang <br /> sah</span>.
              </h1>

              {/* Description */}
              <p className="text-[12.5px] sm:text-[16.5px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                Dirikan yayasan resmi untuk misi sosial, kemanusiaan, atau keagamaan Anda — kami pandu dari pengecekan nama, akta notaris, sampai SK Kemenkumham, selesai dalam 2 hari kerja.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-row gap-3 pt-2">
                <a
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai pendirian yayasan.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 bg-[#990202] text-white font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <span>Konsultasi Gratis</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 shadow-md border border-black/[0.04] text-gray-800 font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-gray-55 hover:border-gray-350 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Lihat Paket Harga
                </a>
              </div>

              {/* Bottom Features Row */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 max-w-[580px]">
                <div className="flex items-center space-x-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <Clock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">2 hari kerja</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">Express selesai</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <DollarSign className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">Diskon 50%</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">Promo terbatas</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <Upload className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">100% Online</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">Tanpa keluar rumah</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">
                
                <div className="relative overflow-hidden rounded-[24px] sm:rounded-[24px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <Image
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?fit=crop&w=800&h=800&q=80"
                    alt="Misi sosial yayasan bersatu tangan"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge 1 - Akta Yayasan (Top Left) */}
                <div className="absolute top-12 -left-8 sm:-left-12 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center space-x-3.5 w-[220px] transition-transform hover:-translate-y-1 duration-300 z-20">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <FileText className="w-5.5 h-5.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-black text-gray-900 leading-none">Akta Yayasan</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5">Selesai · 2 hari kerja</div>
                  </div>
                </div>

                {/* Floating Badge 2 - SK Kemenkumham (Bottom Right) */}
                <div className="absolute bottom-12 -right-6 sm:-right-10 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center space-x-3.5 w-[140px] sm:w-[140px] sm:w-[210px] transition-transform hover:-translate-y-1 duration-300 z-20">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-black text-gray-900 leading-none">SK Kemenkumham</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5">Terdaftar resmi</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. PENGERTIAN YAYASAN ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          <div className="mb-14">
            <p className="text-[12.5px] font-extrabold text-[#990202] uppercase tracking-[0.18em] mb-2">PENGERTIAN YAYASAN</p>
            <h2 className="font-heading text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Apa itu Yayasan?
            </h2>
            <p className="text-[14.5px] sm:text-[15.5px] text-gray-500 mt-3 font-normal max-w-3xl leading-relaxed">
              Sebelum mendirikan, pahami dulu karakter yayasan sebagai badan hukum khusus untuk misi sosial, kemanusiaan, & keagamaan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[480px] lg:max-w-none">
                <div className="relative overflow-hidden rounded-[32px] shadow-[0_15px_35px_rgba(0,0,0,0.06)] aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <Image
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?fit=crop&w=800&h=800&q=80"
                    alt="Modern loft office workstation"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center"
                  />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 left-6 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center space-x-3.5 w-[280px] transition-transform hover:-translate-y-1 duration-300 z-10">
                  <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <FileText className="w-5.5 h-5.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-black text-gray-900 leading-none">Dasar Hukum</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5 leading-snug">UU No. 16 Tahun 2001 tentang Yayasan</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-[14.5px] text-gray-650 leading-relaxed font-normal">
                <strong className="font-extrabold text-gray-950">Yayasan</strong> adalah badan hukum yang terdiri atas kekayaan yang dipisahkan, diperuntukkan untuk mencapai tujuan tertentu di bidang <strong className="font-bold text-gray-900">sosial, keagamaan, & kemanusiaan</strong> — diatur dalam Undang-Undang No. 16 Tahun 2001.
              </p>
              <p className="text-[14.5px] text-gray-650 leading-relaxed font-normal">
                Berbeda dari PT atau CV, yayasan <strong className="font-extrabold text-gray-950">tidak memiliki anggota</strong> dan tidak boleh membagikan keuntungan ke pendiri/pengurusnya. Seluruh hasil kegiatan harus kembali ke tujuan sosial yang ditetapkan dalam anggaran dasar.
              </p>

              <div className="pt-4">
                <h3 className="text-[16px] font-extrabold text-gray-950 mb-4 tracking-tight">Karakteristik Yayasan</h3>
                <ul className="space-y-4">
                  {[
                    { bold: "Badan hukum nirlaba", text: " — tidak boleh membagikan keuntungan kepada pendiri/pengurus." },
                    { bold: "Tidak memiliki anggota", text: " — dikelola oleh 3 organ: Pembina, Pengurus, & Pengawas." },
                    { bold: "Tujuan sosial", text: " — fokus pada bidang sosial, keagamaan, atau kemanusiaan." },
                    { bold: "Kekayaan dipisahkan", text: " — aset yayasan terpisah dari kekayaan pribadi pendiri." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-[13.5px] text-gray-600 leading-normal">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                      </div>
                      <span>
                        <strong className="font-extrabold text-gray-950">{item.bold}</strong>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 2.5. ORGAN YAYASAN ─── */}
      <section className="bg-white py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-3">
            <p className="text-[12.5px] font-extrabold text-[#990202] uppercase tracking-[0.18em]">ORGAN YAYASAN</p>
            <h2 className="font-heading text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              3 organ wajib yang harus ada dalam yayasan.
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Pembina */}
            <div className="bg-[#F9FAFB]/70 shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-3xl p-6.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between items-start">
              <div className="space-y-4">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl shadow-md border border-black/[0.04] bg-white flex items-center justify-center text-[#990202]">
                  <Users className="w-5.5 h-5.5 stroke-[2]" />
                </div>
                <h4 className="text-[16px] font-extrabold text-gray-950">Pembina</h4>
                <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed font-normal">
                  Pemegang kewenangan tertinggi — menetapkan kebijakan umum & mengangkat/memberhentikan Pengurus. Minimal 1 orang.
                </p>
              </div>
            </div>

            {/* Card 2: Pengurus */}
            <div className="bg-[#F9FAFB]/70 shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-3xl p-6.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between items-start">
              <div className="space-y-4">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl shadow-md border border-black/[0.04] bg-white flex items-center justify-center text-[#990202]">
                  <UserCheck className="w-5.5 h-5.5 stroke-[2]" />
                </div>
                <h4 className="text-[16px] font-extrabold text-gray-950">Pengurus</h4>
                <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed font-normal">
                  Pelaksana harian yayasan — terdiri dari <strong className="font-extrabold text-gray-950">Ketua, Sekretaris, & Bendahara</strong> (minimal 1 orang per posisi).
                </p>
              </div>
            </div>

            {/* Card 3: Pengawas */}
            <div className="bg-[#F9FAFB]/70 shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-3xl p-6.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between items-start">
              <div className="space-y-4">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl shadow-md border border-black/[0.04] bg-white flex items-center justify-center text-[#990202]">
                  <Eye className="w-5.5 h-5.5 stroke-[2]" />
                </div>
                <h4 className="text-[16px] font-extrabold text-gray-950">Pengawas</h4>
                <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed font-normal">
                  Pengawas internal — memberikan nasihat & mengawasi kinerja Pengurus. Minimal 1 orang.
                </p>
              </div>
            </div>

            {/* Card 4: Status Hukum */}
            <div className="bg-[#F9FAFB]/70 shadow-[0_4px_16px_rgba(0,0,0,0.06)] rounded-3xl p-6.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between items-start">
              <div className="space-y-4">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl shadow-md border border-black/[0.04] bg-white flex items-center justify-center text-[#990202]">
                  <ShieldCheck className="w-5.5 h-5.5 stroke-[2]" />
                </div>
                <h4 className="text-[16px] font-extrabold text-gray-950">Status Hukum</h4>
                <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed font-normal">
                  Setelah disahkan Kemenkumham, yayasan resmi menjadi <strong className="font-extrabold text-gray-950">badan hukum mandiri</strong> & berhak menerima donasi/hibah.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── 4. PAKET PRICING ─── */}
      <Pricing
        sectionTitleTag="BIAYA JASA PENDIRIAN YAYASAN"
        sectionTitle="Pilih paket sesuai kebutuhan yayasan Anda."
        sectionSubtitle={
          <span>
            Harga sudah include semua biaya — notaris, AHU Kemenkumham, NPWP, dan jasa kami.{" "}
            <br />
            Tidak ada tambahan biaya apapun di tengah proses.{" "}
            <span className="text-[#990202] font-extrabold">Diskon 50% — kuota terbatas!</span>
          </span>
        }
        packages={pricingPackages}
        footnotes={pricingFootnotes}
      />

      {/* ─── 5. PROSES PEMBUATAN YAYASAN ─── */}
      <section className="bg-[#F9FAFB] py-8 sm:py-8 sm:py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">PROSES PENDIRIAN YAYASAN</p>
            <h2 className="font-heading text-[20px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              7 langkah pendirian yayasan, kami pandu sampai akta di tangan.
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium">
              Dari konsultasi awal sampai dokumen lengkap diterima — estimasi 2 hari kerja untuk akta pendirian, 5–7 hari kerja untuk dokumen lainnya.
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
                    {step.no}
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
                        {step.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start text-[12px] font-bold text-gray-700 leading-tight">
                            <Check className="w-4 h-4 text-[#990202] mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span>{point}</span>
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

      {/* ─── 6. FAQ ACCORDION ─── */}
      <FAQ
        title="Pertanyaan seputar pendirian yayasan."
        subtitle="Sebelum mulai, mungkin jawabannya sudah ada di sini."
        items={faqs}
      />

      </div>
      );
      }

