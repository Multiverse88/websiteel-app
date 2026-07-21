"use client";

import React from "react";
import Link from "next/link";
import {
  Check,
  Home,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Shield,
  Layers,
  Users,
  Activity,
  DollarSign,
  AlertTriangle,
  Award,
  Building,
} from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import Pricing, { PricingPackage } from "@/components/Pricing";
import PricingFooter from "@/components/PricingFooter";
import MediaCoverage from "@/components/MediaCoverage";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/home/Testimonials";
import { getWhatsAppLink } from "@/lib/config";
import { Fraunces, Inter, Space_Mono } from "next/font/google";
import BottomPromoSection from "@/components/home/BottomPromoSection";
import PengertianPKKPR from "./PengertianPKKPR";
import SiapaWajibPKKPR from "./SiapaWajibPKKPR";
import AlurProsesPKKPR from "./AlurProsesPKKPR";
import ManfaatRisikoPKKPR from "./ManfaatRisikoPKKPR";

const pkkprBenefits = [
  {
    icon: <Clock className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Proses Cepat 3-5 Hari",
    desc: "PKKPR diproses dan diterbitkan dalam waktu 3-5 hari kerja setelah dokumen lengkap diserahkan."
  },
  {
    icon: <ShieldCheck className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Akurasi Tata Ruang",
    desc: "Data lokasi divalidasi ketat sesuai standar sistem tata ruang dan OSS untuk mencegah penolakan sistem."
  },
  {
    icon: <Award className="w-5.5 h-5.5 text-[#990202]" />,
    title: "Ditangani Tim Ahli",
    desc: "Tim legal kami berpengalaman menangani pengurusan PKKPR untuk ratusan lokasi dan berbagai sektor usaha."
  },
  {
    icon: <TrendingUp className="w-5.5 h-5.5 text-[#990202]" />,
    title: "100% Terima Beres",
    desc: "Kami urus seluruh proses pengajuan dari awal hingga PKKPR resmi terbit. Anda cukup fokus pada bisnis."
  }
];

const steps = [
  {
    no: "01",
    title: "Pengumpulan Data Periode",
    desc: "Konsultasi singkat untuk identifikasi periode pelaporan & kumpulkan data: realisasi investasi, jumlah tenaga kerja, produksi/penjualan, & kendala usaha.",
    points: [
      "Identifikasi periode wajib lapor",
      "Formulir pengumpulan data realisasi",
      "Koordinasi data tenaga kerja & KBLI"
    ]
  },
  {
    no: "02",
    title: "Verifikasi & Penyusunan Laporan",
    desc: "Tim kami review data, cross-check dengan format BKPM, & susun laporan sesuai template resmi. Kami pastikan tidak ada data yang missing atau invalid.",
    points: [
      "Audit keselarasan data investasi",
      "Penyusunan format laporan resmi BKPM",
      "Validasi data untuk meminimalkan penolakan"
    ]
  },
  {
    no: "03",
    title: "Submit via OSS RBA",
    desc: "Pelaporan resmi dilakukan melalui sistem OSS RBA menggunakan kredensial perusahaan Anda. Bisa dibantu via akun representative jika diperlukan.",
    points: [
      "Pengisian data realisasi di portal OSS RBA",
      "Unggah dokumen pendukung wajib",
      "Final submit laporan LKPM resmi"
    ]
  },
  {
    no: "04",
    title: "Penerbitan Tanda Terima",
    desc: "Setelah submit berhasil, sistem OSS menerbitkan Tanda Terima Tata Ruang • PKKPR resmi sebagai bukti kepatuhan kepada BKPM.",
    points: [
      "Verifikasi status laporan oleh verifikator BKPM",
      "Penerbitan Tanda Terima resmi ber-QR Code",
      "Penyimpanan bukti kepatuhan legalitas"
    ]
  },
  {
    no: "05",
    title: "Arsip & Reminder Periode Berikutnya",
    desc: "Kami arsipkan bukti pelaporan + dokumen pendukung untuk audit Anda, & kirim reminder menjelang deadline pelaporan periode berikutnya.",
    points: [
      "Arsip digital bukti lapor (Tanda Terima)",
      "Monitoring kepatuhan berkelanjutan",
      "Reminder otomatis H-30, H-14, dan H-7 deadline"
    ]
  }
];

const faqs = [
  {
    q: "Apakah perbedaan KKKPR dan PKKPR?",
    a: "KKKPR diterbitkan otomatis oleh sistem OSS apabila lokasi usaha sudah tercantum dalam RDTR (Rencana Detail Tata Ruang) digital yang terintegrasi. Prosesnya lebih cepat dan tidak perlu kajian tambahan. PKKPR diterbitkan jika RDTR digital belum tersedia, atau lokasi memerlukan kajian tata ruang lebih lanjut oleh pemerintah daerah. Prosesnya lebih panjang dan melalui rapat koordinasi instansi."
  },
  {
    q: "Berapa lama proses PKKPR selesai?",
    a: "Proses PKKPR di EasyLegal selama 3-5 hari kerja setelah melengkapi dan memenuhi persyaratan yang dibutuhkan."
  },
  {
    q: "Apakah PKKPR berlaku untuk lebih dari satu lokasi sekaligus?",
    a: "Tidak. PKKPR diterbitkan per KBLI per lokasi. Jika Anda memiliki dua lokasi usaha berbeda, atau dua jenis usaha berbeda di lokasi yang sama, masing-masing memerlukan PKKPR tersendiri. Harga paket EasyLegal dihitung berdasarkan satuan ini."
  },
  {
    q: "Usaha saya sudah berjalan tanpa PKKPR, apakah masih bisa diurus?",
    a: "Ya, sangat bisa dan justru sangat disarankan segera. Mengurus PKKPR retrospektif akan melegalkan operasional Anda yang sudah berjalan dan mencegah sanksi di masa mendatang. Tim EasyLegal berpengalaman menangani kasus seperti ini dan akan membantu prosesnya tanpa hambatan."
  },
  {
    q: "Apakah PKKPR bisa dicabut setelah terbit?",
    a: "PKKPR dapat dicabut jika terjadi perubahan RTRW/RDTR yang membuat lokasi tidak lagi sesuai peruntukannya, atau jika pemohon terbukti memberikan data palsu. Pastikan seluruh informasi yang Anda ajukan akurat sesuai kondisi nyata di lapangan."
  },
  {
    q: "Apakah ada jaminan PKKPR pasti terbit?",
    a: "EasyLegal berkomitmen memproses PKKPR secara profesional sesuai ketentuan berlaku. Namun keputusan akhir penerbitan berada di tangan instansi pemerintah. Jika ada kendala dalam proses, tim kami akan segera berkomunikasi dan mencari solusi terbaik bersama Anda termasuk opsi revisi permohonan."
  }
];


const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});


export default function PKKPRPage() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  const pricingPackages: PricingPackage[] = [
    {
      title: "PKKPR — LUAS LAHAN 0 - 3,9 HA",
      price: "2.999.000",
      strikePrice: "Rp 6.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih PAKET PKKPR",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket PKKPR Lahan 0 - 3,9 HA. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [{ text: "<strong className=\"font-extrabold text-gray-900\">3-5 hari kerja</strong> <span className=\"text-red-600 text-[10px] font-bold\">(1)</span>", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "<strong className=\"font-extrabold text-gray-900\">Perizinan PKKPR</strong> untuk 1 KBLI", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "<strong className=\"font-extrabold text-gray-900\">1 Kupon</strong> Undian iPhone", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          items: [
            { text: "Voucher EasyLegal <strong className=\"font-extrabold text-gray-900\">Rp 250.000</strong>", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    },
    {
      title: "PKKPR — LUAS LAHAN 4 - 4,9 HA",
      price: "3.999.000",
      strikePrice: "Rp 8.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: false,
      buttonText: "Pilih PAKET PKKPR",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket PKKPR Lahan 4 - 4,9 HA. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [{ text: "<strong className=\"font-extrabold text-gray-900\">3-5 hari kerja</strong> <span className=\"text-red-600 text-[10px] font-bold\">(1)</span>", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "<strong className=\"font-extrabold text-gray-900\">Perizinan PKKPR</strong> untuk 1 KBLI", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "<strong className=\"font-extrabold text-gray-900\">1 Kupon</strong> Undian iPhone", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          items: [
            { text: "Voucher EasyLegal <strong className=\"font-extrabold text-gray-900\">Rp 250.000</strong>", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    },
    {
      title: "PKKPR — LUAS LAHAN 5 - 9,9 HA",
      price: "7.999.000",
      strikePrice: "Rp 16.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: false,
      buttonText: "Pilih PAKET PKKPR",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket PKKPR Lahan 5 - 9,9 HA. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [{ text: "<strong className=\"font-extrabold text-gray-900\">3-5 hari kerja</strong> <span className=\"text-red-600 text-[10px] font-bold\">(1)</span>", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "<strong className=\"font-extrabold text-gray-900\">Perizinan PKKPR</strong> untuk 1 KBLI", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "<strong className=\"font-extrabold text-gray-900\">1 Kupon</strong> Undian iPhone", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          items: [
            { text: "Voucher EasyLegal <strong className=\"font-extrabold text-gray-900\">Rp 250.000</strong>", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    },
    {
      title: "PKKPR — LUAS LAHAN 10 - 20 HA",
      price: "9.999.000",
      strikePrice: "Rp 20.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: false,
      buttonText: "Pilih PAKET PKKPR",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket PKKPR Lahan 10 - 20 HA. Mohon info lengkap biaya dan prosesnya."),
      groups: [
        {
          title: "LAMA PROSES",
          items: [{ text: "<strong className=\"font-extrabold text-gray-900\">3-5 hari kerja</strong> <span className=\"text-red-600 text-[10px] font-bold\">(1)</span>", checked: true }]
        },
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "<strong className=\"font-extrabold text-gray-900\">Perizinan PKKPR</strong> untuk 1 KBLI", checked: true }
          ]
        },
        {
          title: "BONUS",
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "<strong className=\"font-extrabold text-gray-900\">1 Kupon</strong> Undian iPhone", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          items: [
            { text: "Voucher EasyLegal <strong className=\"font-extrabold text-gray-900\">Rp 250.000</strong>", checked: true },
            { text: "Dokumen SOP Karyawan", checked: true },
            { text: "Dokumen SOP Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true }
          ]
        }
      ]
    }
  ];

  return (
    <div className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        .lkpm-font-serif {
          font-family: var(--font-fraunces), serif !important;
        }
        .lkpm-font-mono {
          font-family: var(--font-space-mono), monospace !important;
        }
      ` }} />

        <div className="has-service-cta flex flex-col min-h-screen bg-[#FCFBFA] text-gray-900 font-sans">
          
          {/* ─── 1. HERO SECTION ─── */}
          <section className="bg-white py-10 lg:py-20 border-b border-gray-200/50 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Column */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  
                  {/* Breadcrumb */}
                  <nav className="flex items-center space-x-2 text-[16px] font-medium text-gray-500">
                    <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                      <Home className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                      <span>Beranda</span>
                    </Link>
                    <span className="text-gray-300 font-normal">&gt;</span>
                    <span className="text-gray-500 font-medium">Layanan</span>
                    <span className="text-gray-300 font-normal">&gt;</span>
                    <span className="text-[16px] font-bold text-gray-900">Tata Ruang • PKKPR</span>
                  </nav>

                  {/* Pill Badge */}
                  <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-4 rounded-full border border-red-100/50 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                    <span className="text-[16px] font-extrabold text-[#990202] tracking-wider uppercase">BKPM - OSS RBA</span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-heading text-[28px] sm:text-[42px] lg:text-[54px] font-extrabold text-gray-950 leading-[1.1] tracking-tight">
                    Urus PKKPR bisnis Anda <span className="text-[#990202]">tanpa ribet</span>
                  </h1>

                  {/* Description */}
                  <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                    Jasa pengurusan PKKPR (Persetujuan Kesesuaian Kegiatan Pemanfaatan Ruang) profesional untuk pelaku usaha, UMKM, dan perusahaan. Proses cepat, aman, dan sesuai regulasi tata ruang yang berlaku di Indonesia.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href="#paket-harga"
                      onClick={scrollToPricing}
                      className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[16px] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer"
                    >
                      Lihat Paket PKKPR
                    </a>
                    <a
                      href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai Tata Ruang • PKKPR Online.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-7 py-4 border border-gray-250 text-gray-800 font-extrabold text-[16px] rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                    >
                      Konsultasi Gratis
                    </a>
                  </div>

                  {/* Checkpoints Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-[650px]">
                    {/* Checkpoint 1 */}
                    <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-transparent">
                      <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                      </div>
                      <div>
                        <div className="text-[16px] font-black text-gray-900">3-5 Hari*</div>
                        <div className="text-[16px] text-gray-500 font-semibold mt-1">Proses pengurusan</div>
                      </div>
                    </div>

                    {/* Checkpoint 2 */}
                    <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-transparent">
                      <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="text-[16px] font-black text-gray-900">Tim Legal</div>
                        <div className="text-[16px] text-gray-500 font-semibold mt-1">Berpengalaman</div>
                      </div>
                    </div>

                    {/* Checkpoint 3 */}
                    <div className="flex items-center space-x-3 bg-white p-2.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-transparent">
                      <div className="w-8 h-8 rounded-full bg-[#FFF5F5] flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#990202]" strokeWidth={3.5} />
                      </div>
                      <div>
                        <div className="text-[16px] font-black text-gray-900">100% Tanda Terima</div>
                        <div className="text-[16px] text-gray-500 font-semibold mt-1">Bukti pelaporan</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column */}
                <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
                  <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group aspect-[1.1] sm:aspect-square lg:aspect-[1.1] w-full max-w-[440px]">
                    <Image
                      src="/images/layanan/lkpm-1.jpg"
                      alt="Laporan LKPM Terpercaya"
                      fill
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>
        {/* ─── 2. MEDIA COVERAGE SECTION ─── */}
          <MediaCoverage />

          {/* ─── 3. BENEFITS SECTION ─── */}
          <FadeIn delay={0.2}>
            <Benefits sectionTitleTag="KEUNGGULAN KAMI" sectionTitle="Mengapa Pilih EasyLegal?" items={pkkprBenefits} />
            <BottomPromoSection />
          </FadeIn>

          {/* ─── 4. PRICING SECTION ─── */}
          <FadeIn delay={0.2}>
            <Pricing
              sectionTitleTag="PENAWARAN SPESIAL"
              sectionTitle="Pilih Paket PKKPR Anda"
              sectionSubtitle={
                <>
                  Harga sudah termasuk konsultasi, pengurusan dokumen, dan pendampingan hingga PKKPR terbit. Tanpa biaya tersembunyi.
                </>
              }
              packages={pricingPackages}
              hideFooter={true}
            />
          </FadeIn>

          {/* ─── 5. ALUR PROSES SECTION ─── */}
          <FadeIn delay={0.2}>
            <AlurProsesPKKPR />
          </FadeIn>

          {/* ─── 6. TESTIMONIALS SECTION ─── */}
          <FadeIn delay={0.2}>
            <Testimonials />
          </FadeIn>

          {/* ─── 7. PENGERTIAN PKKPR ─── */}
          <FadeIn delay={0.2}>
            <PengertianPKKPR />
          </FadeIn>

          {/* ─── 8. SIAPA WAJIB PKKPR ─── */}
          <FadeIn delay={0.2}>
            <SiapaWajibPKKPR />
          </FadeIn>

          {/* ─── 9. MANFAAT VS RISIKO SECTION ─── */}
          <FadeIn delay={0.2}>
            <ManfaatRisikoPKKPR />
          </FadeIn>

          {/* ─── 11. FAQ SECTION ─── */}
          <FadeIn delay={0.2}>
            <FAQ items={faqs} />
          </FadeIn>

          {/* ─── 12. CTA SECTION ─── */}
          <FadeIn delay={0.2}>
            <section className="bg-white py-10 lg:py-20 border-t border-gray-100">
              <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <h2 className="font-heading text-[32px] sm:text-[38px] font-black text-gray-900 leading-[1.2] tracking-tight">
                      Mau urus PKKPR <span className="text-[#990202]">tanpa ribet?</span>
                    </h2>
                    <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed font-normal max-w-xl">
                      Konsultasi gratis untuk cek syarat & tata ruang usaha Anda — tanpa komitmen.
                    </p>
                  </div>

                  <div className="lg:col-span-5 flex flex-col items-stretch space-y-4 max-w-[380px] w-full lg:ml-auto text-left">
                    <a
                      href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai Tata Ruang • PKKPR.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[16px] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center w-full"
                    >
                      <svg className="w-5 h-5 mr-2 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.115-2.883-6.978C16.63 1.899 14.16 .871 11.53.871c-5.44 0-9.865 4.42-9.869 9.865-.001 1.836.486 3.633 1.408 5.204l-1.015 3.705 3.805-.998zm11.238-6.82c-.3-.15-1.77-.875-2.045-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.79-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.48-.508-.66-.513-.17-.007-.365-.008-.56-.008-.195 0-.515.075-.785.375-.27.3-1.03 1.01-1.03 2.46s1.045 2.84 1.19 3.04c.145.2 2.055 3.14 4.975 4.4 1.12.485 1.995.775 2.68.995.7.225 1.335.195 1.84.12.56-.085 1.77-.725 2.02-1.39.25-.665.25-1.235.175-1.35-.075-.115-.275-.19-.575-.34z"/>
                      </svg>
                      <span>Konsultasi via WhatsApp</span>
                    </a>

                    <a
                      href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai Tata Ruang • PKKPR.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3.5 shadow-md border border-black/[0.04] text-gray-800 font-extrabold text-[16px] bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow transition-all duration-200 cursor-pointer text-center w-full rounded-xl"
                    >
                      <span>Hubungi Tim Kami</span>
                      <ArrowRight className="w-4 h-4 ml-2" strokeWidth={3.5} />
                    </a>

                    <div className="flex items-center space-x-1.5 pt-1 text-gray-500 font-semibold text-[16px] sm:text-[16px] leading-none pl-1">
                      <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3.5} />
                      <span>Respons dalam 5 menit · Senin–Sabtu 08:00–20:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

        </div>

    </div>
  );
}
