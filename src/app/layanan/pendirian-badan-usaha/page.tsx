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
  Star,
  Shield,
  Users,
  FileText,
} from "lucide-react";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing, { PricingPackage } from "@/components/Pricing";

export default function PendirianBadanUsaha() {
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
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Basic%20Pembuatan%20PT.",
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
            { text: "Pengecekan & Pemesanan Nama PT", checked: true },
            { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true }
          ]
        },
        {
          title: "DOKUMEN PENDIRIAN",
          items: [
            { text: "Akta Notaris", checked: true },
            { text: "SK Kemenkumham", checked: true }
          ]
        },
        {
          title: "DOKUMEN LAINNYA",
          items: [
            { text: "SKT Pajak & NPWP Badan", checked: true },
            { text: "NIB & Akun OSS RBA", checked: false },
            { text: "K3L/SPUMKTTR & SPPL", checked: false },
            { text: "Sertifikat Standar", checked: false, footnoteIndex: 3 },
            { text: "Angka Pengenal Impor", checked: false, footnoteIndex: 4 }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistant", checked: true },
            { text: "Undian iPhone", boldText: "1 Kupon", checked: true },
            { text: "Pembukaan Rekening Bank", checked: false, footnoteIndex: "*" },
            { text: "Gratis Ongkir Pulau Jawa", checked: false }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
            { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
            { text: "Dokumen SOP Karyawan", checked: false },
            { text: "Dokumen SOP Perusahaan", checked: false },
            { text: "Dokumen Kontrak Bisnis", checked: false },
            { text: "Stempel Perusahaan 1 Warna", checked: false }
          ]
        }
      ]
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 3.999.000",
      strikePrice: "Rp 8.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Complete%20Pembuatan%20PT.",
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
            { text: "Pengecekan & Pemesanan Nama PT", checked: true },
            { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true }
          ]
        },
        {
          title: "DOKUMEN PENDIRIAN",
          items: [
            { text: "Akta Notaris", checked: true },
            { text: "SK Kemenkumham", checked: true }
          ]
        },
        {
          title: "DOKUMEN LAINNYA",
          items: [
            { text: "SKT Pajak & NPWP Badan", checked: true },
            { text: "NIB & Akun OSS RBA", checked: true },
            { text: "K3L/SPUMKTTR & SPPL", checked: true },
            { text: "Sertifikat Standar", checked: true, footnoteIndex: 3 },
            { text: "Angka Pengenal Impor", checked: true, footnoteIndex: 4 }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistant", checked: true },
            { text: "Undian iPhone", boldText: "1 Kupon", checked: true },
            { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
            { text: "Gratis Ongkir Pulau Jawa", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
            { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true },
            { text: "Stempel Perusahaan 1 Warna", checked: true }
          ]
        }
      ]
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 5.499.000",
      strikePrice: "Rp 11.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Express%20Pembuatan%20PT.",
      customHeaderOverlay: (
        <div className="absolute right-6 -bottom-6 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-md rotate-12 transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase">FAST</span>
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase mt-0.5">TRACK</span>
        </div>
      ),
      groups: [
        {
          title: "LAMA PROSES",
          items: [
            { text: "Dokumen Pendirian <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
            { text: "Dokumen Lainnya <strong>4 Hari Kerja</strong>", checked: true, footnoteIndex: 2 }
          ]
        },
        {
          title: "FASILITAS",
          items: [
            { text: "Pengecekan & Pemesanan Nama PT", checked: true },
            { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true }
          ]
        },
        {
          title: "DOKUMEN PENDIRIAN",
          items: [
            { text: "Akta Notaris", checked: true },
            { text: "SK Kemenkumham", checked: true }
          ]
        },
        {
          title: "DOKUMEN LAINNYA",
          items: [
            { text: "SKT Pajak & NPWP Badan", checked: true },
            { text: "NIB & Akun OSS RBA", checked: true },
            { text: "K3L/SPUMKTTR & SPPL", checked: true },
            { text: "Sertifikat Standar", checked: true, footnoteIndex: 3 },
            { text: "Angka Pengenal Impor", checked: true, footnoteIndex: 4 }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistant", checked: true },
            { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
            { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
            { text: "Gratis Ongkir <strong>Seluruh Indonesia</strong>", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
            { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true },
            { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true }
          ]
        }
      ]
    }
  ];

  const pricingFootnotes = [
    { text: "Setelah penandatanganan Minuta Akta &amp; tidak terdapat kendala pada sistem AHU." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax, Amdalnet &amp; OSS." },
    { text: "Risiko menengah rendah." },
    { text: "Opsional." },
    { text: "Persetujuan &amp; pengesahan PKP sepenuhnya berada di bawah kewenangan KPP setempat." },
    { label: "*", text: "Syarat &amp; ketentuan berlaku." }
  ];

  const steps = [
    {
      no: "01",
      title: "Konsultasi & Perencanaan",
      duration: "1 Hari Kerja",
      desc: "Konsultasi gratis dengan tim legal kami untuk menentukan struktur bisnis yang sesuai dengan visi & rencana Anda.",
      points: [
        "Identifikasi visi, modal awal & rencana bisnis",
        "Pemilihan struktur saham & pemegang",
        "Penentuan KBLI (Klasifikasi Lapangan Usaha)",
      ],
    },
    {
      no: "02",
      title: "Cek & Pemesanan Nama PT",
      duration: "1 Hari Kerja",
      desc: "Kami verifikasi nama PT yang Anda inginkan di database AHU Kemenkumham, lalu pesan secara resmi.",
      points: [
        "Pengecekan ketersediaan nama di AHU",
        "Pemesanan nama resmi (berlaku 60 hari)",
        "Konfirmasi nama final & alternatif jika ditolak",
      ],
    },
    {
      no: "03",
      title: "Persiapan Dokumen Pendiri",
      duration: "1-2 Hari Kerja",
      desc: "Pengumpulan dokumen pendukung dari semua pendiri & pengurus. Bisa di-upload via portal aman kami.",
      points: [
        "KTP & NPWP semua pendiri, komisaris, direksi",
        "Pas foto, alamat domisili, rincian modal",
        "Review & validasi oleh tim legal kami",
      ],
    },
    {
      no: "04",
      title: "Penyusunan Akta Pendirian",
      duration: "2 Hari Kerja",
      desc: "Notaris menyusun & menandatangani akta pendirian — bisa via e-Notary (tanpa harus datang).",
      points: [
        "Drafting akta oleh notaris partner",
        "Penandatanganan akta (tatap muka atau e-Notary)",
        "Penyerahan Minuta Akta resmi",
      ],
    },
    {
      no: "05",
      title: "Pengesahan SK Kemenkumham",
      duration: "1-2 Hari Kerja",
      desc: "Akta pendirian disahkan menjadi badan hukum resmi oleh Kementerian Hukum & HAM.",
      points: [
        "Pengajuan ke AHU Online",
        "Verifikasi otomatis sistem AHU",
        "Penerbitan SK Pengesahan Badan Hukum",
      ],
    },
    {
      no: "06",
      title: "NPWP Badan & SKT Pajak",
      duration: "1-2 Hari Kerja",
      desc: "Registrasi PT sebagai wajib pajak badan ke Direktorat Jenderal Pajak (DJP).",
      points: [
        "Pendaftaran NPWP perusahaan via Coretax",
        "Penerbitan Surat Keterangan Terdaftar (SKT)",
        "Aktivasi akun pajak online perusahaan",
      ],
    },
    {
      no: "07",
      title: "NIB & Akun OSS RBA",
      duration: "1-2 Hari Kerja",
      desc: "Aktivasi izin berusaha berbasis risiko (RBA) di sistem OSS — PT siap beroperasi penuh!",
      points: [
        "Pendaftaran akun OSS RBA",
        "Penerbitan Nomor Induk Berusaha (NIB)",
        "Penyerahan semua dokumen ke alamat Anda",
      ],
    },
  ];

  const faqs = [
    {
      q: "Mana yang lebih cocok: PT, CV, atau PT Perorangan?",
      a: "Tergantung skala bisnis. PT Perorangan cocok untuk solopreneur/UMKM mikro (1 pendiri, modal kecil). CV cocok untuk usaha kecil-menengah dengan 2 sekutu, tanpa modal minimum. PT cocok kalau bisnis Anda serius, butuh kredibilitas tinggi, atau ingin ikut tender — modal min. Rp25jt disetor, liability terpisah dari pribadi.",
    },
    {
      q: "Berapa lama proses pendirian PT?",
      a: "Proses lengkap pendirian PT all-in berkisar antara 7 hingga 14 hari kerja. Hal ini bergantung pada kecepatan penandatanganan akta oleh notaris partner dan tidak adanya kendala teknis pada sistem AHU Kemenkumham.",
    },
    {
      q: "Apakah harga sudah termasuk biaya notaris & pemerintah?",
      a: "Ya, semua paket harga EasyLegal bersifat all-in. Sudah mencakup jasa notaris partner, biaya resmi PNBP/AHU Kemenkumham, pendaftaran NPWP perusahaan, dan seluruh proses pendaftaran izin di sistem OSS RBA hingga dokumen terbit.",
    },
    {
      q: "Bisa pakai alamat rumah sebagai domisili PT?",
      a: "Berdasarkan regulasi zonasi daerah (terutama di kota besar seperti Jakarta), alamat rumah tinggal umumnya tidak diperkenankan untuk domisili PT biasa. Namun, Anda dapat menggunakan layanan Virtual Office kami sebagai solusi alamat kantor legal yang sah dan hemat biaya.",
    },
    {
      q: "Apakah saya harus datang ke notaris secara fisik?",
      a: "Tidak wajib. Penandatanganan akta pendirian dapat dilakukan secara tatap muka dengan notaris partner kami atau dilakukan secara elektronik (e-Notary) dengan verifikasi aman, sehingga Anda dapat menyelesaikan proses ini dari mana saja secara online.",
    },
    {
      q: "Bagaimana kalau nama PT yang saya inginkan sudah dipakai?",
      a: "Sebelum melakukan pemesanan nama resmi di sistem AHU Kemenkumham, tim EasyLegal akan melakukan pengecekan ketersediaan nama secara gratis. Jika nama yang Anda inginkan sudah dipakai atau terlalu mirip dengan PT lain, kami akan menyarankan alternatif nama terbaik.",
    },
    {
      q: "Kalau pendiri saya WNA, bisa pakai PT biasa?",
      a: "Jika salah satu pendiri atau pemegang saham adalah Warga Negara Asing (WNA) or perusahaan asing, maka jenis badan usahanya wajib berbentuk PT PMA (Penanaman Modal Asing) yang tunduk pada aturan modal dasar minimal Rp10 Miliar.",
    },
   ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white pt-8 lg:pt-12 pb-16 lg:pb-24 border-b border-gray-200/40 overflow-hidden relative">
        {/* Subtle radial glows for premium aesthetics */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Breadcrumb,Badge,Headline,Desc,Buttons,SLA Stats */}
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
                <span className="text-[13px] font-bold text-gray-900">Pendirian Badan Usaha</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-3.5 rounded-full border border-red-100 shadow-sm animate-pulse-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[12.5px] font-bold text-[#990202] tracking-wide">Pendirian Badan Usaha</span>
              </div>

              {/* Headline */}
              <h1 className="font-inter text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                Mulai bisnis Anda <br />
                dengan <span className="text-[#990202]">legalitas yang</span> <br />
                benar.
              </h1>

              {/* Description */}
              <p className="text-[15.5px] sm:text-[16.5px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                PT, PT PMA, PT Perorangan, CV, Firma, Yayasan, sampai Koperasi — kami pandu Anda pilih struktur yang tepat & urus prosesnya sampai akta di tangan.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20konsultasi%20mengenai%20pendirian%20badan%20usaha."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] text-white font-bold text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer group"
                >
                  <span>Konsultasi Gratis</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
                </a>
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
                    <Clock className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">7–14 hari</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">SLA kerja</div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <DollarSign className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">Mulai Rp2,99jt</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">Harga transparan</div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <Upload className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] sm:text-[14.5px] font-extrabold text-gray-950 leading-tight">100% Online</div>
                    <div className="text-[11.5px] text-gray-500 mt-0.5">Upload paperless</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Signing Image + Two Floating Badges */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">
                
                {/* Corporate Image Container */}
                <div className="relative overflow-hidden rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white group aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=800&h=800&q=80"
                    alt="Penandatanganan akta pendirian badan usaha"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge 1: Akta PT diterbitkan (Top Left) */}
                <div className="absolute -top-6 -left-2 sm:-left-6 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center space-x-3.5 w-[220px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <Building className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-black text-gray-900 leading-none">Akta PT diterbitkan</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5">Selesai · 10 hari kerja</div>
                  </div>
                </div>

                {/* Floating Badge 2: SK Kemenkumham (Bottom Right) */}
                <div className="absolute -bottom-6 -right-2 sm:-right-4 bg-white rounded-2xl p-3.5 pr-6 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center space-x-3.5 w-[210px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
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

      {/* ─── 2. PENGERTIAN PT ─── */}
      <section className="bg-white py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-14">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-wider mb-2">Pengertian PT</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Apa itu Perseroan Terbatas (PT)?
            </h2>
            <p className="text-[14.5px] text-gray-500 mt-3 font-normal max-w-2xl">
              Sebelum mulai, kenali dulu badan hukum yang paling populer untuk bisnis serius di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left side: Image and Badge */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[480px] lg:max-w-none">
                <div className="relative overflow-hidden rounded-[32px] border border-gray-100 shadow-[0_15px_35px_rgba(0,0,0,0.04)] aspect-[1.1] sm:aspect-square lg:aspect-[1.1]">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fit=crop&w=800&h=800&q=80"
                    alt="Rapat tim membahas Perseroan Terbatas"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Floating Badge: Dasar Hukum */}
                <div className="absolute -bottom-6 left-2 sm:left-6 bg-white rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center space-x-3.5 w-[250px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <FileText className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-black text-gray-900 leading-none">Dasar Hukum</div>
                    <div className="text-[11px] text-gray-400 font-bold mt-1.5 leading-snug">UU No. 40 Tahun 2007 tentang Perseroan Terbatas</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Explanation and Characteristics */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                <strong className="font-extrabold text-gray-900">Perseroan Terbatas (PT)</strong> adalah badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian, melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham — sesuai dengan Undang-Undang No. 40 Tahun 2007.
              </p>
              <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
                Berbeda dengan CV atau Firma, PT adalah <strong className="font-extrabold text-gray-900">entitas hukum mandiri</strong> yang terpisah dari pendirinya. Artinya, harta perusahaan terpisah dari harta pribadi pendiri — memberikan perlindungan hukum yang kuat sekaligus kredibilitas yang lebih tinggi di mata partner & klien.
              </p>

              <div className="pt-4">
                <h3 className="text-[16px] font-extrabold text-gray-950 mb-4 tracking-tight">Karakteristik PT</h3>
                <ul className="space-y-4">
                  {[
                    { bold: "Badan hukum mandiri", text: " — entitas terpisah dari pendiri, harta perusahaan ≠ harta pribadi." },
                    { bold: "Modal terbagi dalam saham", text: " — kepemilikan jelas & proporsional sesuai kontribusi." },
                    { bold: "Liability terbatas", text: " — tanggung jawab pendiri hanya sebatas nilai saham yang dimiliki." },
                    { bold: "Kontinyu", text: " — tidak terputus walau pendiri berganti, bisa go public di masa depan." }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start text-[14px] text-gray-600">
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

      {/* ─── 3. MANFAAT MEMILIH PT ─── */}
      <section className="bg-[#F9FAFB] py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-wider">Manfaat Memilih PT</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Kenapa PT jadi pilihan pengusaha serius?
            </h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Perlindungan Aset",
                desc: "Harta pribadi terpisah dari aset perusahaan — risiko bisnis tidak menyentuh kekayaan pribadi.",
                Icon: Shield,
              },
              {
                title: "Akses Pendanaan",
                desc: "Lebih mudah dapatkan pinjaman bank, modal ventura, atau investor — struktur saham jelas.",
                Icon: DollarSign,
              },
              {
                title: "Kredibilitas Tinggi",
                desc: "Dipercaya partner bisnis & klien besar — bisa ikut tender pemerintah & proyek BUMN.",
                Icon: Star,
              },
              {
                title: "Multi-Shareholder",
                desc: "Cocok untuk skala besar & co-founder — saham bisa dimiliki banyak pihak.",
                Icon: Users,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-gray-200/50 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col items-start"
              >
                {/* Icon Container */}
                <div className="w-10 h-10 rounded-xl border border-gray-100 flex items-center justify-center text-[#990202] mb-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white">
                  <item.Icon className="w-5 h-5 stroke-[2]" />
                </div>
                {/* Title */}
                <h4 className="text-[16px] font-extrabold text-gray-950 mb-2">{item.title}</h4>
                {/* Description */}
                <p className="text-[13px] text-gray-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 4. PAKET PRICING ─── */}
      <Pricing
        sectionTitleTag="BIAYA JASA PEMBUATAN PT"
        sectionTitle="Pilih paket sesuai kebutuhan bisnis Anda."
        sectionSubtitle="Harga sudah include semua biaya — notaris, AHU Kemenkumham, NPWP, dan jasa kami. Tidak ada tambahan biaya apapun di tengah proses."
        packages={pricingPackages}
        footnotes={pricingFootnotes}
      />

      {/* ─── 5. PROSES PEMBUATAN PT ─── */}
      <section className="bg-[#F9FAFB] py-20 border-b border-gray-200/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-widest">PROSES PEMBUATAN PT</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              7 langkah pembuatan PT, semua kami pandu.
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-500 font-medium">
              Dari konsultasi awal sampai dokumen lengkap di tangan Anda — total estimasi 7–14 hari kerja, semua transparan di dashboard.
            </p>
          </div>

          {/* Timeline Stack */}
          <div className="max-w-[960px] mx-auto relative space-y-8">
            
            {/* Dashed Timeline vertical line (only on desktop/tablet) */}
            <div className="absolute left-[20px] md:left-[24px] top-6 bottom-6 w-0.5 bg-gray-200 border-l border-dashed border-gray-300 pointer-events-none hidden sm:block" />

            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 relative group">
                
                {/* Step Number Circle */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#990202] text-[#990202] bg-white flex items-center justify-center font-bold text-[14px] md:text-[16px] flex-shrink-0 z-10 shadow-sm transition-colors group-hover:bg-[#990202] group-hover:text-white duration-300">
                  {step.no}
                </div>

                {/* Card Container */}
                <div className="flex-grow bg-white border border-gray-150/50 rounded-3xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:border-gray-200 transition-all duration-300 w-full">
                  
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-gray-100/60">
                    <h4 className="text-[16px] md:text-[18px] font-black text-gray-950">
                      {step.title}
                    </h4>
                    {/* Duration Badge */}
                    <div className="inline-flex items-center self-start sm:self-auto px-2.5 py-1 bg-[#FFF5F5] rounded-full text-[#990202] font-extrabold text-[10.5px] uppercase tracking-wider flex-shrink-0 border border-red-50/50">
                      <Clock className="w-3.5 h-3.5 mr-1 text-[#990202]" strokeWidth={2.5} />
                      {step.duration}
                    </div>
                  </div>

                  {/* Description */}
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

      {/* ─── 6. FAQ ACCORDION ─── */}
      <FAQ title="Pertanyaan seputar pendirian badan usaha." items={faqs} />

      {/* ─── 4. CTA BANNER ─── */}
      <CTA
        title={
          <h2 className="font-inter text-[34px] sm:text-[38px] font-extrabold text-gray-950 leading-tight tracking-tight max-w-[480px]">
            Siap mulai bisnis dengan <span className="text-[#990202]">legalitas resmi</span>?
          </h2>
        }
        description="Konsultasikan struktur bisnis & kebutuhan Anda dengan tim kami — gratis, tanpa komitmen."
        whatsappLink="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20konsultasi%20mengenai%20pendirian%20badan%20usaha."
      />

    </div>
  );
}
