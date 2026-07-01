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
  Award
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FAQ from "@/components/FAQ";
import { getWhatsAppLink } from "@/lib/config";
import { Fraunces, Inter, Space_Mono } from "next/font/google";

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
    desc: "Setelah submit berhasil, sistem OSS menerbitkan Tanda Terima Pelaporan LKPM resmi sebagai bukti kepatuhan kepada BKPM.",
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
    q: "Apakah perusahaan saya wajib lapor LKPM?",
    a: "Wajib, jika perusahaan Anda memiliki NIB & izin berusaha — termasuk PMA, PMDN, UMK, sampai perusahaan besar. Mulai dari tahap konstruksi sampai operasional, perusahaan harus lapor LKPM. Pengecualian: usaha mikro dengan modal < Rp 1 miliar sesuai PP 7/2021 boleh tidak melapor (cek konsultasi untuk konfirmasi status Anda)."
  },
  {
    q: "Berapa kali setahun harus lapor?",
    a: "Frekuensi pelaporan tergantung skala usaha. Skala UMK wajib melapor 2 kali setahun (Semesteran). Skala Menengah dan Besar wajib melapor 4 kali setahun (Kuartalan/Triwulan)."
  },
  {
    q: "Apa yang terjadi kalau saya telat lapor LKPM?",
    a: "BKPM akan mengenakan sanksi bertahap mulai dari Peringatan Tertulis (3 kali), Penghentian Sementara kegiatan usaha, Pembekuan NIB, hingga Pencabutan Izin Usaha secara permanen. Selain itu, compliance rating perusahaan akan turun yang menyulitkan perpanjangan izin atau tender."
  },
  {
    q: "Bagaimana kalau usaha belum mulai operasi / belum ada realisasi?",
    a: "Tetap wajib melapor. Anda harus melaporkan LKPM dengan nilai realisasi investasi nihil (Rp 0) atau mencantumkan kendala/tahapan konstruksi yang sedang berjalan. Tidak melapor dengan alasan belum beroperasi tetap dianggap pelanggaran kepatuhan."
  },
  {
    q: "Data apa saja yang harus dilaporkan?",
    a: "Realisasi modal tetap (tanah, bangunan, mesin), realisasi modal kerja, jumlah tenaga kerja (WNI & WNA), volume/nilai produksi barang/jasa, perolehan perizinan berusaha di daerah, dan hambatan atau kendala yang dihadapi dalam pelaksanaan investasi."
  },
  {
    q: "Apakah bisa lapor sendiri tanpa pakai jasa?",
    a: "Bisa, pelaporan dilakukan secara mandiri melalui portal OSS RBA. Namun, banyak perusahaan mengalami kesulitan teknis dalam memetakan realisasi investasi, menghitung rasio modal kerja, atau memperbaiki data yang ditolak/diberi catatan oleh BKPM. Menggunakan jasa EasyLegal memastikan pelaporan akurat & bebas salah input."
  },
  {
    q: "Apa beda PMA & PMDN dalam LKPM?",
    a: "PMA (Penanaman Modal Asing) dan PMDN (Penanaman Modal Dalam Negeri) pada umumnya memiliki kewajiban pelaporan yang sama. Namun PMA hampir selalu masuk kategori Menengah-Besar karena batasan modal minimumnya (> Rp 10 miliar), sehingga PMA wajib melapor setiap Kuartal (4 kali setahun) sejak NIB terbit."
  },
  {
    q: "Bagaimana sistem reminder dari EasyLegal?",
    a: "Kami memiliki sistem pemantauan berkala yang akan mengirimkan reminder otomatis melalui WhatsApp dan Email kepada Anda 30 hari, 14 hari, dan 7 hari sebelum batas akhir pelaporan LKPM setiap periode agar Anda terhindar dari sanksi BKPM."
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


export default function PelaporanLKPM() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      {/* ─── DESKTOP VIEW (Visible on LG screens and larger) ─── */}
      <div className="hidden lg:block">
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
                  <nav className="flex items-center space-x-2 text-[12.5px] font-medium text-gray-500">
                    <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                      <Home className="w-3.5 h-3.5 text-gray-400" strokeWidth={2} />
                      <span>Beranda</span>
                    </Link>
                    <span className="text-gray-300 font-normal">&gt;</span>
                    <span className="text-gray-500 font-medium">Layanan</span>
                    <span className="text-gray-300 font-normal">&gt;</span>
                    <span className="text-[12.5px] font-bold text-gray-900">Pelaporan LKPM</span>
                  </nav>

                  {/* Pill Badge */}
                  <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-4 rounded-full border border-red-100/50 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                    <span className="text-[12px] font-extrabold text-[#990202] tracking-wider uppercase">BKPM - OSS RBA</span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-heading text-[28px] sm:text-[42px] lg:text-[54px] font-extrabold text-gray-950 leading-[1.1] tracking-tight">
                    Lapor LKPM tepat waktu, <span className="text-[#990202]">hindari sanksi BKPM.</span>
                  </h1>

                  {/* Description */}
                  <p className="text-[12.5px] sm:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                    Pelaporan Laporan Kegiatan Penanaman Modal (LKPM) lewat OSS RBA — tepat waktu, akurat, &amp; sesuai format BKPM. Proses cepat 1–3 hari kerja.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href="#paket-harga"
                      onClick={scrollToPricing}
                      className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[15px] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer"
                    >
                      Lihat Paket LKPM
                    </a>
                    <a
                      href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai Pelaporan LKPM Online.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-7 py-4 border border-gray-250 text-gray-800 font-extrabold text-[15px] rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                    >
                      Konsultasi Gratis
                    </a>
                  </div>

                  {/* Checkpoints Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-150 max-w-[650px]">
                    {/* Checkpoint 1 */}
                    <div className="flex items-center space-x-3 bg-[#FFF5F5] p-2.5 rounded-xl border border-red-50/50 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                        <Clock className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                      </div>
                      <div>
                        <div className="text-[13px] font-black text-gray-900">1–3 Hari</div>
                        <div className="text-[10px] text-gray-500 font-semibold mt-1">Proses cepat</div>
                      </div>
                    </div>

                    {/* Checkpoint 2 */}
                    <div className="flex items-center space-x-3 bg-[#FFF5F5] p-2.5 rounded-xl border border-red-50/50 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                        <svg className="w-4 h-4 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="text-[13px] font-black text-gray-900">Mulai Rp 1,49jt</div>
                        <div className="text-[10px] text-gray-500 font-semibold mt-1">Untuk UMK</div>
                      </div>
                    </div>

                    {/* Checkpoint 3 */}
                    <div className="flex items-center space-x-3 bg-[#FFF5F5] p-2.5 rounded-xl border border-red-50/50 shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                        <Check className="w-4 h-4 text-[#990202]" strokeWidth={3.5} />
                      </div>
                      <div>
                        <div className="text-[13px] font-black text-gray-900">100% Tanda Terima</div>
                        <div className="text-[10px] text-gray-500 font-semibold mt-1">Bukti pelaporan</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Premium Mockup */}
                <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
                  <div className="relative w-full max-w-[440px] aspect-[1.1] sm:aspect-square lg:aspect-[1.1] bg-gradient-to-br from-[#0f1b2f] via-[#0a1122] to-[#7f080c] rounded-[32px] p-6 relative flex items-center justify-center shadow-2xl border border-gray-800/80">
                    
                    {/* Official Report Card Mockup (LKPM Report) */}
                    <div className="bg-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.08)] relative w-[255px] h-[280px] flex flex-col justify-between text-left">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                        <div className="flex items-center space-x-1.5">
                          <div className="w-6 h-6 bg-[#990202] rounded-md flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-[7px] font-black leading-none uppercase">EL</span>
                          </div>
                          <span className="text-[11px] font-extrabold text-gray-900 tracking-tight">LKPM Report</span>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-[8.5px] font-black px-2 py-0.5 rounded border border-emerald-200/35 uppercase tracking-wider">
                          Submitted
                        </span>
                      </div>

                      <div className="mt-3 flex-1">
                        <span className="text-[8.5px] font-extrabold text-gray-400 tracking-wider uppercase block">
                          PERIODE TRIWULAN I — 2026
                        </span>
                        <h4 className="text-[13px] font-black text-gray-900 leading-tight mt-1">
                          Laporan Kegiatan Penanaman Modal
                        </h4>

                        <div className="grid grid-cols-2 gap-2 mt-3.5">
                          <div className="bg-[#FAF9F7] rounded-xl p-2.5 shadow-sm border border-black/[0.02] flex flex-col justify-between">
                            <span className="text-[8px] font-black text-gray-450 tracking-wider uppercase">REALISASI</span>
                            <span className="text-[11.5px] font-black text-gray-900 mt-1 block">Rp 1,2M</span>
                          </div>
                          <div className="bg-[#FAF9F7] rounded-xl p-2.5 shadow-sm border border-black/[0.02] flex flex-col justify-between">
                            <span className="text-[8px] font-black text-gray-450 tracking-wider uppercase">TENAGA KERJA</span>
                            <span className="text-[11.5px] font-black text-gray-900 mt-1 block">18 Orang</span>
                          </div>
                          <div className="bg-[#FAF9F7] rounded-xl p-2.5 shadow-sm border border-black/[0.02] flex flex-col justify-between">
                            <span className="text-[8px] font-black text-gray-450 tracking-wider uppercase">PRODUKSI</span>
                            <span className="text-[11.5px] font-black text-gray-900 mt-1 block">Aktif</span>
                          </div>
                          <div className="bg-[#FAF9F7] rounded-xl p-2.5 shadow-sm border border-black/[0.02] flex flex-col justify-between">
                            <span className="text-[8px] font-black text-gray-450 tracking-wider uppercase">STATUS</span>
                            <span className="text-[11.5px] font-black text-emerald-600 mt-1 block">On Track</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-[8.5px] font-extrabold text-gray-400">
                        <span>BKPM · OSS RBA</span>
                        <span className="text-[#990202] flex items-center space-x-0.5">
                          <Check className="w-3 h-3 text-[#990202]" strokeWidth={4} />
                          <span>Terkirim</span>
                        </span>
                      </div>
                    </div>

                    {/* Floating Badge 1: Top Right */}
                    <div className="hidden sm:flex absolute -top-5 -right-5 sm:-top-7 sm:-right-7 md:-top-5 md:-right-5 bg-white rounded-2xl py-2 px-3.5 shadow-xl items-center space-x-2.5 w-[165px] z-20">
                      <div className="w-8 h-8 rounded-lg bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                        <svg className="w-4.5 h-4.5 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-black text-gray-900 leading-none">Tepat Waktu</div>
                        <div className="text-[8.5px] text-gray-400 font-semibold mt-1 block">Sesuai jadwal BKPM</div>
                      </div>
                    </div>

                    {/* Floating Badge 2: Bottom Left */}
                    <div className="hidden sm:flex absolute -bottom-5 -left-5 sm:-bottom-7 sm:-left-7 md:-bottom-5 md:-left-5 bg-white rounded-2xl py-2 px-3.5 shadow-xl items-center space-x-2.5 w-[185px] z-20">
                      <div className="w-8 h-8 rounded-lg bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                        <svg className="w-4.5 h-4.5 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          <path d="m9 11 2 2 4-4"></path>
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-black text-gray-900 leading-none">Hindari Sanksi</div>
                        <div className="text-[8.5px] text-gray-400 font-semibold mt-1 block">Cabut izin - suspensi NIB</div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ─── 2. PENGERTIAN SECTION ─── */}
          <FadeIn direction="up" delay={0.2}>
            <section className="bg-white py-10 lg:py-20 border-b border-gray-200/50">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20 space-y-3">
                  <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">PENGERTIAN</p>
                  <h2 className="font-heading text-[26px] sm:text-[36px] lg:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
                    Apa itu LKPM &amp; kenapa wajib lapor?
                  </h2>
                  <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
                    Pelaporan rutin yang wajib untuk perusahaan dengan NIB &amp; izin usaha — bagian dari pengawasan investasi BKPM.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  
                  {/* Left Column: Unified Pink Container */}
                  <div className="lg:col-span-5 bg-[#FFF6F6] rounded-[32px] p-6 sm:p-7.5 space-y-3.5 text-left border border-red-100/40 shadow-[0_10px_35px_rgba(153,2,2,0.025)]">
                    <h3 className="text-[12.5px] sm:text-[13px] font-black text-[#990202] tracking-wider uppercase mb-5 pl-1.5 mt-1.5">
                      SIAPA WAJIB LAPOR LKPM
                    </h3>

                    <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                      <div className="w-9 h-9 rounded-xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0 shadow-sm border border-red-50/50">
                        <svg className="w-4.5 h-4.5 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                          <line x1="9" y1="22" x2="9" y2="16"></line>
                          <line x1="15" y1="22" x2="15" y2="16"></line>
                          <line x1="9" y1="16" x2="15" y2="16"></line>
                          <path d="M9 8h6"></path>
                          <path d="M9 12h6"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-black text-gray-900 leading-tight">PMA &amp; PMDN</h4>
                        <p className="text-[11px] text-gray-450 font-bold mt-0.5 leading-snug">Wajib bagi semua perusahaan ber-NIB</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                      <div className="w-9 h-9 rounded-xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0 shadow-sm border border-red-50/50">
                        <svg className="w-4.5 h-4.5 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-black text-gray-900 leading-tight">Mikro &amp; Kecil (UMK)</h4>
                        <p className="text-[11px] text-gray-450 font-bold mt-0.5 leading-snug">Lapor per 6 bulan (semester)</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                      <div className="w-9 h-9 rounded-xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0 shadow-sm border border-red-50/50">
                        <svg className="w-4.5 h-4.5 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-black text-gray-900 leading-tight">Menengah &amp; Besar</h4>
                        <p className="text-[11px] text-gray-450 font-bold mt-0.5 leading-snug">Lapor per 3 bulan (kuartal)</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                      <div className="w-9 h-9 rounded-xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0 shadow-sm border border-red-50/50">
                        <svg className="w-4.5 h-4.5 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="9" y1="9" x2="15" y2="9"></line>
                          <line x1="9" y1="13" x2="15" y2="13"></line>
                          <line x1="9" y1="17" x2="15" y2="17"></line>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-black text-gray-900 leading-tight">Konstruksi &amp; Operasi</h4>
                        <p className="text-[11px] text-gray-450 font-bold mt-0.5 leading-snug">Mulai konstruksi sampai operasional</p>
                      </div>
                    </div>

                    <div className="bg-[#151515] rounded-2xl p-4 border border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center space-x-4">
                      <div className="w-9 h-9 rounded-xl bg-[#990202] text-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-500/20">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-black text-white leading-tight">Dasar Hukum</h4>
                        <p className="text-[11px] text-gray-400 font-bold mt-0.5 leading-snug">Peraturan BKPM No. 5/2021 &amp; UU Cipta Kerja</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Explanations (3 Cards) */}
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-3.5">
                      <div className="flex items-center space-x-2.5 text-[#990202]">
                        <svg className="w-4.5 h-4.5 text-[#990202]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <h4 className="text-[12.5px] sm:text-[13px] font-black tracking-wider uppercase">LKPM</h4>
                      </div>
                      <p className="text-[13.5px] sm:text-[14px] text-gray-600 leading-relaxed font-normal">
                        <strong className="text-gray-900 font-extrabold">LKPM (Laporan Kegiatan Penanaman Modal)</strong> adalah laporan berkala yang wajib disampaikan oleh pelaku usaha mengenai perkembangan realisasi penanaman modal dan kendala yang dihadapi. Pelaporan dilakukan secara online terintegrasi melalui portal <strong className="text-gray-900 font-extrabold">OSS RBA (Online Single Submission Risk Based Approach)</strong> di bawah naungan Kementerian Investasi/BKPM.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-3.5">
                      <div className="flex items-center space-x-2.5 text-[#990202]">
                        <ShieldCheck className="w-4.5 h-4.5 text-[#990202]" strokeWidth={2.5} />
                        <h4 className="text-[12.5px] sm:text-[13px] font-black tracking-wider uppercase">WAJIB LAPOR</h4>
                      </div>
                      <p className="text-[13.5px] sm:text-[14px] text-gray-600 leading-relaxed font-normal">
                        Setiap pelaku usaha dengan nilai investasi <strong className="text-gray-900 font-extrabold">di atas Rp 1 Miliar</strong> wajib menyampaikan LKPM secara berkala. Ini mencakup perusahaan berbadan hukum (PT, CV, Yayasan) maupun perseorangan (UMK), baik Penanaman Modal Dalam Negeri (PMDN) maupun Penanaman Modal Asing (PMA) yang terdaftar di OSS.
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300 space-y-3.5">
                      <div className="flex items-center space-x-2.5 text-[#990202]">
                        <TrendingUp className="w-4.5 h-4.5 text-[#990202]" strokeWidth={2.5} />
                        <h4 className="text-[12.5px] sm:text-[13px] font-black tracking-wider uppercase">MANFAAT LAPOR TEPAT WAKTU</h4>
                      </div>
                      <p className="text-[13.5px] sm:text-[14px] text-gray-600 leading-relaxed font-normal">
                        Kepatuhan pelaporan LKPM memastikan status perizinan perusahaan Anda tetap <strong className="text-gray-900 font-extrabold">Aktif dan Valid</strong>. Menghindari pembekuan izin operasional secara mendadak oleh sistem OSS RBA, menjaga tingkat reputasi kepatuhan (*compliance rating*) investasi perusahaan, serta mempermudah akses ke fasilitas perpajakan atau insentif investasi pemerintah.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </FadeIn>

          {/* ─── 3. PERIODE & BATAS WAKTU SECTION ─── */}
          <FadeIn direction="up" delay={0.2}>
            <section className="bg-[#FAF9F7] py-10 lg:py-20 border-b border-gray-200/50">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20 space-y-3">
                  <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">PERIODE &amp; BATAS WAKTU</p>
                  <h2 className="font-heading text-[26px] sm:text-[36px] lg:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
                    Kapan harus lapor LKPM?
                  </h2>
                  <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
                    Frekuensi pelaporan tergantung skala usaha. Telat lapor = risiko sanksi BKPM.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1140px] mx-auto items-stretch">
                  
                  {/* Left Card: UMK */}
                  <div className="bg-[#FFF8F8] rounded-[28px] p-6 sm:p-8 border-2 border-[#990202] shadow-sm flex flex-col justify-between text-left">
                    <div className="space-y-6">
                      <div className="inline-flex items-center space-x-2 bg-[#990202] py-1.5 px-4 rounded-full self-start">
                        <span className="text-[10px] font-black text-white tracking-wider uppercase">MIKRO &amp; KECIL (UMK)</span>
                      </div>
                      <h3 className="text-[20px] font-black text-gray-900 leading-tight">
                        2× Setahun · Semesteran
                      </h3>
                      <p className="text-[11px] sm:text-[11px] sm:text-[13.5px] text-gray-500 leading-relaxed font-normal">
                        Perusahaan dengan skala mikro &amp; kecil wajib lapor <strong className="font-extrabold text-gray-900">setiap 6-bulan</strong>. Tergolong UMK jika modal usaha &lt; Rp 5 miliar (di luar tanah &amp; bangunan).
                      </p>
                      <div className="space-y-3 pt-2">
                        <h4 className="text-[10.5px] font-black text-[#990202] tracking-widest uppercase block mt-3">DEADLINE PELAPORAN</h4>
                        <div className="bg-white rounded-xl p-4.5 border border-red-100/50 space-y-3.5 mt-3 shadow-sm">
                          <div className="flex items-start space-x-2.5 text-[13px] sm:text-[13.5px] text-gray-700 font-semibold leading-normal">
                            <Clock className="w-4 h-4 text-[#990202] mt-0.5 flex-shrink-0" />
                            <span>Semester I: <strong className="font-extrabold text-gray-900">paling lambat 10 Juli</strong></span>
                          </div>
                          <div className="flex items-start space-x-2.5 text-[13px] sm:text-[13.5px] text-gray-700 font-semibold leading-normal">
                            <Clock className="w-4 h-4 text-[#990202] mt-0.5 flex-shrink-0" />
                            <span>Semester II: <strong className="font-extrabold text-gray-900">paling lambat 10 Januari</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Card: Menengah & Besar */}
                  <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col justify-between text-left">
                    <div className="space-y-6">
                      <div className="inline-flex items-center space-x-2 bg-gray-100 py-1.5 px-4 rounded-full self-start">
                        <span className="text-[10px] font-black text-gray-600 tracking-wider uppercase">MENENGAH &amp; BESAR</span>
                      </div>
                      <h3 className="text-[20px] font-black text-gray-900 leading-tight">
                        4× Setahun · Kuartalan
                      </h3>
                      <p className="text-[11px] sm:text-[11px] sm:text-[13.5px] text-gray-500 leading-relaxed font-normal">
                        Perusahaan skala menengah-besar wajib lapor <strong className="font-extrabold text-gray-900">setiap 3 bulan</strong>. Termasuk semua PMA &amp; PMDN dengan modal usaha &gt; Rp 5 miliar.
                      </p>
                      <div className="space-y-3 pt-2">
                        <h4 className="text-[10.5px] font-black text-[#990202] tracking-widest uppercase block mt-3">DEADLINE PELAPORAN</h4>
                        <div className="bg-[#F8F9FA] rounded-xl p-4.5 shadow-sm border border-black/[0.02] space-y-3.5 mt-3">
                          <div className="flex items-start space-x-2.5 text-[13px] sm:text-[13.5px] text-gray-700 font-semibold leading-normal">
                            <Clock className="w-4 h-4 text-[#990202] mt-0.5 flex-shrink-0" />
                            <span>Triwulan I: <strong className="font-extrabold text-gray-900">paling lambat 10 April</strong></span>
                          </div>
                          <div className="flex items-start space-x-2.5 text-[13px] sm:text-[13.5px] text-gray-700 font-semibold leading-normal">
                            <Clock className="w-4 h-4 text-[#990202] mt-0.5 flex-shrink-0" />
                            <span>Triwulan II: <strong className="font-extrabold text-gray-900">paling lambat 10 Juli</strong></span>
                          </div>
                          <div className="flex items-start space-x-2.5 text-[13px] sm:text-[13.5px] text-gray-700 font-semibold leading-normal">
                            <Clock className="w-4 h-4 text-[#990202] mt-0.5 flex-shrink-0" />
                            <span>Triwulan III: <strong className="font-extrabold text-gray-900">paling lambat 10 Oktober</strong></span>
                          </div>
                          <div className="flex items-start space-x-2.5 text-[13px] sm:text-[13.5px] text-gray-700 font-semibold leading-normal">
                            <Clock className="w-4 h-4 text-[#990202] mt-0.5 flex-shrink-0" />
                            <span>Triwulan IV: <strong className="font-extrabold text-gray-900">paling lambat 10 Januari</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </FadeIn>

          {/* ─── 4. DATA YANG DILAPORKAN SECTION ─── */}
          <FadeIn direction="up" delay={0.2}>
            <section className="bg-white py-10 lg:py-20 border-b border-gray-200/50">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">
                <div className="max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20 space-y-3">
                  <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">DATA YANG DILAPORKAN</p>
                  <h2 className="font-heading text-[26px] sm:text-[36px] lg:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
                    Apa saja isi laporan LKPM?
                  </h2>
                  <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
                    5 kategori data utama yang harus diisi setiap periode pelaporan ke BKPM.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-[1240px] mx-auto">
                  <div className="bg-[#FAF9F7] rounded-2xl p-6 shadow-md border border-black/[0.03] flex flex-col justify-between space-y-4 text-left">
                    <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-[#990202] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                      <DollarSign className="w-5 h-5 text-[#990202]" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[14.5px] font-black text-gray-900 leading-tight">Realisasi Investasi</h4>
                      <p className="text-[11.5px] text-gray-500 font-medium leading-relaxed">Nilai investasi yang sudah direalisasikan (modal tetap &amp; modal kerja).</p>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F7] rounded-2xl p-6 shadow-md border border-black/[0.03] flex flex-col justify-between space-y-4 text-left">
                    <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-[#990202] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                      <Users className="w-5 h-5 text-[#990202]" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[14.5px] font-black text-gray-900 leading-tight">Tenaga Kerja</h4>
                      <p className="text-[11.5px] text-gray-500 font-medium leading-relaxed">Jumlah karyawan WNI &amp; WNA (penyerapan tenaga kerja lokal).</p>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F7] rounded-2xl p-6 shadow-md border border-black/[0.03] flex flex-col justify-between space-y-4 text-left">
                    <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-[#990202] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                      <Activity className="w-5 h-5 text-[#990202]" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[14.5px] font-black text-gray-900 leading-tight">Produksi / Penjualan</h4>
                      <p className="text-[11.5px] text-gray-500 font-medium leading-relaxed">Volume &amp; nilai produksi barang atau jasa yang dihasilkan.</p>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F7] rounded-2xl p-6 shadow-md border border-black/[0.03] flex flex-col justify-between space-y-4 text-left">
                    <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-[#990202] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                      <FileText className="w-5 h-5 text-[#990202]" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[14.5px] font-black text-gray-900 leading-tight">Perizinan</h4>
                      <p className="text-[11.5px] text-gray-500 font-medium leading-relaxed">Progress perolehan izin terkait (izin lingkungan, bangunan, dll).</p>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F7] rounded-2xl p-6 shadow-md border border-black/[0.03] flex flex-col justify-between space-y-4 text-left">
                    <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center text-[#990202] shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                      <AlertCircle className="w-5 h-5 text-[#990202]" strokeWidth={2.5} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[14.5px] font-black text-gray-900 leading-tight">Kendala Usaha</h4>
                      <p className="text-[11.5px] text-gray-500 font-medium leading-relaxed">Hambatan yang dihadapi dalam pengoperasian investasi (jika ada).</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* ─── 5. SANKSI JIKA TIDAK LAPOR SECTION ─── */}
          <FadeIn direction="up" delay={0.2}>
            <section className="bg-[#FAF9F7] py-10 lg:py-20 border-b border-gray-200/50">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">
                <div className="max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20 space-y-3">
                  <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.22em] font-sans">SANKSI JIKA TIDAK LAPOR</p>
                  <h2 className="font-heading text-[26px] sm:text-[36px] lg:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
                    Konsekuensi telat / tidak lapor LKPM.
                  </h2>
                  <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                    BKPM mengenakan sanksi bertahap mulai dari peringatan sampai pencabutan izin usaha.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1140px] mx-auto items-stretch">
                  <div className="bg-white rounded-[24px] p-6.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-left flex flex-col justify-between space-y-5 relative">
                    <div className="absolute top-6 right-6 text-[36px] font-black text-red-500/10 leading-none">1</div>
                    <div className="space-y-4">
                      <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center font-black">
                        <AlertTriangle className="w-5 h-5 text-[#990202]" />
                      </div>
                      <h4 className="text-[16px] font-black text-gray-900 leading-tight">Peringatan Tertulis</h4>
                      <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                        Surat peringatan dari BKPM dengan tenggat waktu untuk segera memenuhi kewajiban lapor.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-[24px] p-6.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-left flex flex-col justify-between space-y-5 relative">
                    <div className="absolute top-6 right-6 text-[36px] font-black text-red-500/10 leading-none">2</div>
                    <div className="space-y-4">
                      <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center font-black">
                        <Layers className="w-5 h-5 text-[#990202]" />
                      </div>
                      <h4 className="text-[16px] font-black text-gray-900 leading-tight">Penghentian Sementara</h4>
                      <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                        Suspensi (pembekuan) NIB &amp; izin usaha — perusahaan tidak bisa beroperasi resmi.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-[24px] p-6.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-left flex flex-col justify-between space-y-5 relative">
                    <div className="absolute top-6 right-6 text-[36px] font-black text-red-500/10 leading-none">3</div>
                    <div className="space-y-4">
                      <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center font-black">
                        <Shield className="w-5 h-5 text-[#990202]" />
                      </div>
                      <h4 className="text-[16px] font-black text-gray-900 leading-tight">Pencabutan Izin</h4>
                      <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                        Pencabutan permanen NIB &amp; izin berusaha jika peringatan diabaikan terus-menerus.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-[24px] p-6.5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-left flex flex-col justify-between space-y-5 relative">
                    <div className="absolute top-6 right-6 text-[36px] font-black text-red-500/10 leading-none">4</div>
                    <div className="space-y-4">
                      <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full bg-[#FFF5F5] text-[#990202] flex items-center justify-center font-black">
                        <Award className="w-5 h-5 text-[#990202]" />
                      </div>
                      <h4 className="text-[16px] font-black text-gray-900 leading-tight">Compliance Rating Turun</h4>
                      <p className="text-[12.5px] text-gray-500 font-medium leading-relaxed">
                        Rating kepatuhan turun — mempengaruhi pengajuan izin lain, tender, &amp; insentif.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* ─── 6. BIAYA JASA SECTION ─── */}
          <FadeIn direction="up" delay={0.2}>
            <section id="paket-harga" className="bg-[#FCFBFA] py-10 lg:py-20 border-b border-gray-200/50">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">
                <div className="max-w-3xl mx-auto mb-8 sm:mb-16 space-y-3">
                  <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.22em] font-sans">BIAYA JASA PELAPORAN LKPM</p>
                  <h2 className="font-heading text-[26px] sm:text-[36px] lg:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
                    2 paket sesuai skala usaha Anda.
                  </h2>
                  <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                    Pilih paket berdasarkan kategori UMK atau Menengah-Besar. Harga sudah termasuk konsultasi, pengisian, &amp; submit ke OSS.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[920px] mx-auto items-stretch">
                  <div className="relative group h-full">
                    <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[24px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
                    <div className="bg-white rounded-[24px] overflow-hidden flex flex-col h-full justify-between border-[2.5px] border-[#990202] shadow-[0_20px_50px_rgba(0,0,0,0.045)] group-hover:shadow-[0_20px_50px_rgba(153,2,2,0.12)] transition-all duration-300 text-left">
                      <div>
                        <div className="bg-[#990202] px-4 py-5 sm:px-6 sm:pt-7 sm:pb-6 text-center text-white relative flex flex-col items-center">
                          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#FFC1C1]/90">PALING POPULER</span>
                          <h4 className="text-[14px] sm:text-[17px] font-black tracking-widest uppercase mt-2 sm:mt-3">MIKRO KECIL</h4>
                          <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-[12.5px] text-[#FFC1C1]/60 line-through font-bold">Rp 3.000.000</div>
                          <div className="mt-1 sm:mt-1.5 text-[22px] sm:text-[34px] lg:text-[38px] font-black tracking-tight flex items-start justify-center text-white">
                            <span className="text-[13px] sm:text-[18px] mt-1 sm:mt-1.5 font-extrabold mr-0.5">Rp</span>
                            <span>1.499.000</span>
                          </div>
                          <p className="text-[8px] sm:text-[9.5px] font-bold text-[#FFC1C1]/80 tracking-widest uppercase mt-2 sm:mt-2.5">TANPA TAMBAHAN BIAYA APAPUN</p>
                        </div>

                        <div className="p-4 sm:p-6 lg:p-7.5 space-y-4 sm:space-y-6">
                          <div className="space-y-2">
                            <h5 className="text-[11px] font-extrabold text-[#990202] tracking-wider uppercase">LAMA PROSES</h5>
                            <div className="flex items-center text-[13.5px] font-bold text-gray-900">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" strokeWidth={3.5} />
                              <span>1-3 hari kerja</span>
                            </div>
                          </div>

                          <div className="space-y-2.5 border-t border-gray-100 pt-5">
                            <h5 className="text-[11px] font-extrabold text-[#990202] tracking-wider uppercase">YANG DIPEROLEH</h5>
                            <div className="flex items-start text-[13px] sm:text-[13.5px] text-gray-600 font-semibold leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                              <span><strong className="font-extrabold text-gray-900">Tanda Terima Pelaporan LKPM</strong> dari sistem OSS BKPM</span>
                            </div>
                          </div>

                          <div className="bg-[#FAF9F7] rounded-[16px] p-4 shadow-md border border-black/[0.03] space-y-2 mt-4">
                            <span className="text-[10px] font-extrabold text-gray-800 tracking-widest uppercase block mb-1">BONUS</span>
                            <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-655 font-semibold leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                              <span>Layanan Personal Legal Assistance</span>
                            </div>
                            <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-655 font-semibold leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                              <span><strong className="font-extrabold text-gray-900">1 Kupon</strong> Undian iPhone</span>
                            </div>
                          </div>

                          <div className="bg-[#FAF9F7] rounded-[16px] p-4 shadow-md border border-black/[0.03] space-y-2 mt-4">
                            <span className="text-[10px] font-extrabold text-gray-800 tracking-widest uppercase block mb-1">EXTRA BONUS</span>
                            <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-655 font-semibold leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                              <span>Voucher EasyLegal <strong className="font-extrabold text-gray-900">Rp 250.000</strong></span>
                            </div>
                            <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-655 font-semibold leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                              <span>Dokumen SOP Karyawan &amp; SOP Perusahaan</span>
                            </div>
                            <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-655 font-semibold leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                              <span>Dokumen Kontrak Bisnis</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 lg:p-7.5 pt-0">
                        <a
                          href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket LKPM Mikro Kecil. Mohon info lengkap biaya dan prosesnya.")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-3 sm:py-3.5 text-center font-extrabold text-[13px] sm:text-[14px] rounded-xl text-white bg-[#990202] hover:bg-[#800000] transition-colors duration-200 cursor-pointer shadow-md shadow-red-900/10"
                        >
                          Pilih LKPM Mikro Kecil
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Card: Menengah Besar */}
                  <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.065)] border border-gray-100 flex flex-col justify-between text-left">
                    <div>
                      <div className="bg-[#1A1A1A] border-b border-gray-800 px-4 py-5 sm:px-6 sm:pt-7 sm:pb-6 text-center flex flex-col items-center">
                        <h4 className="text-[14px] sm:text-[17px] font-black tracking-widest uppercase text-white">MENENGAH BESAR</h4>
                        <div className="mt-1.5 sm:mt-2 text-[11px] sm:text-[12.5px] text-white/40 line-through font-bold">Rp 5.000.000</div>
                        <div className="mt-1 sm:mt-1.5 text-[22px] sm:text-[34px] lg:text-[38px] font-black tracking-tight flex items-start justify-center text-white">
                          <span className="text-[13px] sm:text-[18px] mt-1 sm:mt-1.5 font-extrabold mr-0.5">Rp</span>
                          <span>2.499.000</span>
                        </div>
                        <p className="text-[8px] sm:text-[9.5px] font-bold text-white/50 tracking-widest uppercase mt-2 sm:mt-2.5">TANPA TAMBAHAN BIAYA APAPUN</p>
                      </div>

                      <div className="p-4 sm:p-6 lg:p-7.5 space-y-4 sm:space-y-6">
                        <div className="space-y-2">
                          <h5 className="text-[11px] font-extrabold text-gray-500 tracking-wider uppercase">LAMA PROSES</h5>
                          <div className="flex items-center text-[13.5px] font-bold text-gray-900">
                            <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" strokeWidth={3.5} />
                            <span>1-3 hari kerja</span>
                          </div>
                        </div>

                        <div className="space-y-2.5 border-t border-gray-100 pt-5">
                          <h5 className="text-[11px] font-extrabold text-gray-500 tracking-wider uppercase">YANG DIPEROLEH</h5>
                          <div className="flex items-start text-[13px] sm:text-[13.5px] text-gray-655 font-semibold leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span><strong className="font-extrabold text-gray-900">Tanda Terima Pelaporan LKPM</strong> dari sistem OSS BKPM</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-[16px] p-4 border border-black/[0.01] space-y-2 mt-4">
                          <span className="text-[10px] font-extrabold text-gray-500 tracking-widest uppercase block mb-1">BONUS</span>
                          <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-550 font-semibold leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span>Layanan Personal Legal Assistance</span>
                          </div>
                          <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-550 font-semibold leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span><strong className="font-extrabold text-gray-900">1 Kupon</strong> Undian iPhone</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-[16px] p-4 border border-black/[0.01] space-y-2 mt-4">
                          <span className="text-[10px] font-extrabold text-gray-500 tracking-widest uppercase block mb-1">EXTRA BONUS</span>
                          <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-550 font-semibold leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span>Voucher EasyLegal <strong className="font-extrabold text-gray-900">Rp 250.000</strong></span>
                          </div>
                          <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-550 font-semibold leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span>Dokumen SOP Karyawan &amp; SOP Perusahaan</span>
                          </div>
                          <div className="flex items-start text-[12px] sm:text-[12.5px] text-gray-550 font-semibold leading-relaxed">
                            <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                            <span>Dokumen Kontrak Bisnis</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-7.5 pt-0">
                      <a
                        href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket LKPM Menengah Besar. Mohon info lengkap biaya dan prosesnya.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 sm:py-3.5 text-center font-extrabold text-[13px] sm:text-[14px] rounded-xl text-white bg-[#1A1A1A] hover:bg-black transition-colors duration-200 cursor-pointer shadow-md"
                      >
                        Pilih LKPM Menengah Besar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* ─── 7. ALUR PELAPORAN SECTION ─── */}
          <FadeIn direction="up" delay={0.2}>
            <section className="bg-[#FAF9F6] py-10 lg:py-20 border-b border-gray-200/50">
              <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-center">
                <div className="max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20 space-y-3">
                  <p className="text-[12.5px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">ALUR PELAPORAN DI OSS RBA</p>
                  <h2 className="font-heading text-[26px] sm:text-[36px] lg:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
                    5 langkah submit laporan LKPM.
                  </h2>
                  <p className="text-[11.5px] sm:text-[11.5px] sm:text-[14.5px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                    Kami pegang seluruh alur dari pengumpulan data sampai submit ke OSS — Anda terima Tanda Terima resmi.
                  </p>
                </div>

                <div className="max-w-[840px] mx-auto space-y-5 text-left">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-4 sm:space-x-6">
                      <div className="w-[50px] h-[50px] rounded-full bg-white border-2 border-[#990202] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <span className="text-[14px] font-black text-[#990202] font-mono leading-none">{step.no}</span>
                      </div>
                      <div className="flex-1 bg-white shadow-md border border-black/[0.03] rounded-[20px] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow duration-300">
                        <h4 className="text-[16.5px] font-black text-gray-900 leading-tight">{step.title}</h4>
                        <p className="text-[13px] sm:text-[13.5px] text-gray-500 leading-relaxed mt-2 font-normal">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>

          {/* ─── 8. FAQ SECTION ─── */}
          <FadeIn direction="up" delay={0.2}>
            <FAQ items={faqs} />
          </FadeIn>

          {/* ─── 9. CTA SECTION ─── */}
          <FadeIn direction="up" delay={0.2}>
            <section className="bg-white py-10 lg:py-20 border-t border-gray-100">
              <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <h2 className="font-heading text-[32px] sm:text-[38px] font-black text-gray-900 leading-[1.2] tracking-tight">
                      Mau lapor LKPM <span className="text-[#990202]">tanpa ribet?</span>
                    </h2>
                    <p className="text-[14.5px] sm:text-[15.5px] text-gray-500 leading-relaxed font-normal max-w-xl">
                      Konsultasi gratis untuk cek kewajiban &amp; periode pelaporan perusahaan Anda — tanpa komitmen.
                    </p>
                  </div>

                  <div className="lg:col-span-5 flex flex-col items-stretch space-y-4 max-w-[380px] w-full lg:ml-auto text-left">
                    <a
                      href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai Pelaporan LKPM.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[15px] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center w-full"
                    >
                      <svg className="w-5 h-5 mr-2 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.115-2.883-6.978C16.63 1.899 14.16 .871 11.53.871c-5.44 0-9.865 4.42-9.869 9.865-.001 1.836.486 3.633 1.408 5.204l-1.015 3.705 3.805-.998zm11.238-6.82c-.3-.15-1.77-.875-2.045-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.79-1.49-1.77-1.665-2.07-.175-.3-.02-.46.13-.61.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.48-.508-.66-.513-.17-.007-.365-.008-.56-.008-.195 0-.515.075-.785.375-.27.3-1.03 1.01-1.03 2.46s1.045 2.84 1.19 3.04c.145.2 2.055 3.14 4.975 4.4 1.12.485 1.995.775 2.68.995.7.225 1.335.195 1.84.12.56-.085 1.77-.725 2.02-1.39.25-.665.25-1.235.175-1.35-.075-.115-.275-.19-.575-.34z"/>
                      </svg>
                      <span>Konsultasi via WhatsApp</span>
                    </a>

                    <a
                      href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai Pelaporan LKPM.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3.5 shadow-md border border-black/[0.04] text-gray-800 font-extrabold text-[15px] bg-white hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow transition-all duration-200 cursor-pointer text-center w-full rounded-xl"
                    >
                      <span>Hubungi Tim Kami</span>
                      <ArrowRight className="w-4 h-4 ml-2" strokeWidth={3.5} />
                    </a>

                    <div className="flex items-center space-x-1.5 pt-1 text-gray-500 font-semibold text-[11px] sm:text-[11.5px] leading-none pl-1">
                      <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3.5} />
                      <span>Reminder otomatis tiap periode · Senin–Sabtu 08:00–20:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>

        </div>
      </div>

      {/* ─── MOBILE VIEW (Visible on mobile and tablet) ─── */}
      <div className="block lg:hidden">
        <div className="lkpm-mobile-landing">
          <style dangerouslySetInnerHTML={{ __html: `
            .lkpm-mobile-landing {
              --ink: #141414;
              --paper: #ffffff;
              --paper-2: #f5f5f5;
              --maroon: #c8102e;
              --maroon-deep: #7a0000;
              --gold: #141414;
              --gold-soft: #e2e2e2;
              --muted: #5c5c5c;
              --line: #e5e5e5;
              --ok: #141414;
              --radius: 14px;
              --font-display: var(--font-fraunces), 'Fraunces', serif;
              --font-body: var(--font-inter), 'Inter', sans-serif;
              --font-mono: var(--font-space-mono), 'Space Mono', monospace;
              
              font-family: var(--font-body);
              background: var(--paper);
              color: var(--ink);
              -webkit-font-smoothing: antialiased;
              min-height: 100vh;
            }

            .lkpm-mobile-landing * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }

            .lkpm-mobile-landing img {
              max-width: 100%;
              display: block;
            }

            .lkpm-mobile-landing .wrap {
              max-width: 460px;
              margin: 0 auto;
              background: var(--paper);
              min-height: 100vh;
              position: relative;
              box-shadow: 0 0 40px rgba(0,0,0,0.06);
              padding-bottom: 40px;
            }

            .lkpm-mobile-landing a {
              color: inherit;
              text-decoration: none;
            }

            .lkpm-mobile-landing ul {
              list-style: none;
            }

            /* ---------- Topbar ---------- */
            .lkpm-mobile-landing .topbar {
              position: sticky;
              top: 72px;
              z-index: 40;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 14px 18px;
              background: rgba(250, 246, 239, 0.92);
              backdrop-filter: blur(8px);
              border-bottom: 1px solid var(--line);
            }

            .lkpm-mobile-landing .brand {
              font-family: var(--font-display);
              font-weight: 700;
              font-size: 19px;
              letter-spacing: -0.01em;
              color: var(--maroon-deep);
            }

            .lkpm-mobile-landing .brand span {
              color: var(--gold);
            }

            .lkpm-mobile-landing .topbar-cta {
              font-family: var(--font-mono);
              font-size: 11px;
              letter-spacing: 0.03em;
              background: var(--maroon);
              color: #fff;
              padding: 9px 14px;
              border-radius: 999px;
              text-transform: uppercase;
              cursor: pointer;
            }

            /* ---------- Breadcrumb ---------- */
            .lkpm-mobile-landing .crumb {
              font-family: var(--font-mono);
              font-size: 10.5px;
              color: var(--muted);
              padding: 18px 18px 0;
              letter-spacing: 0.02em;
            }

            .lkpm-mobile-landing .crumb b {
              color: var(--maroon);
            }

            /* ---------- Hero ---------- */
            .lkpm-mobile-landing .hero {
              padding: 18px 18px 8px;
              text-align: left;
            }

            .lkpm-mobile-landing .eyebrow {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              font-family: var(--font-mono);
              font-size: 10.5px;
              letter-spacing: 0.08em;
              color: var(--maroon);
              background: var(--paper-2);
              border: 1px solid var(--gold-soft);
              padding: 5px 10px;
              border-radius: 999px;
              text-transform: uppercase;
              margin-bottom: 16px;
            }

            .lkpm-mobile-landing .eyebrow::before {
              content: '';
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: var(--ok);
            }

            .lkpm-mobile-landing h1 {
              font-family: var(--font-display);
              font-weight: 600;
              font-size: 30px;
              line-height: 1.15;
              letter-spacing: -0.01em;
              color: var(--ink);
            }

            .lkpm-mobile-landing h1 em {
              font-style: italic;
              color: var(--maroon);
              font-weight: 500;
            }

            .lkpm-mobile-landing .hero p {
              margin-top: 14px;
              font-size: 14.5px;
              line-height: 1.6;
              color: var(--muted);
              max-width: 38ch;
            }

            .lkpm-mobile-landing .hero-ctas {
              display: flex;
              flex-direction: column;
              gap: 10px;
              margin-top: 20px;
            }

            .lkpm-mobile-landing .btn {
              display: block;
              text-align: center;
              padding: 15px 18px;
              border-radius: 10px;
              font-weight: 700;
              font-size: 14.5px;
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .lkpm-mobile-landing .btn-primary {
              background: var(--maroon);
              color: #fff;
            }

            .lkpm-mobile-landing .btn-primary:hover {
              background: var(--maroon-deep);
            }

            .lkpm-mobile-landing .btn-secondary {
              background: transparent;
              color: var(--maroon-deep);
              border: 1.5px solid var(--ink);
            }

            .lkpm-mobile-landing .btn-secondary:hover {
              background: var(--paper-2);
            }

            .lkpm-mobile-landing .hero-meta {
              margin-top: 12px;
              font-family: var(--font-mono);
              font-size: 10.5px;
              color: var(--muted);
              text-align: center;
            }

            .lkpm-mobile-landing .stat-row {
              display: flex;
              gap: 10px;
              margin-top: 22px;
            }

            .lkpm-mobile-landing .stat-chip {
              flex: 1;
              background: var(--paper-2);
              border: 1px solid var(--line);
              border-radius: 10px;
              padding: 10px 12px;
            }

            .lkpm-mobile-landing .stat-chip .num {
              font-family: var(--font-mono);
              font-weight: 700;
              font-size: 16px;
              color: var(--maroon-deep);
            }

            .lkpm-mobile-landing .stat-chip .lbl {
              font-size: 10.5px;
              color: var(--muted);
              margin-top: 2px;
            }

            /* ---------- Signature ---------- */
            .lkpm-mobile-landing .receipt-zone {
              padding: 26px 18px 8px;
              display: flex;
              justify-content: center;
            }

            .lkpm-mobile-landing .receipt {
              width: 100%;
              max-width: 360px;
              background: var(--ink);
              color: var(--paper);
              border-radius: 16px;
              padding: 22px 20px 18px;
              position: relative;
              overflow: hidden;
              box-shadow: 0 18px 40px -14px rgba(28,21,18,0.55);
            }

            .lkpm-mobile-landing .receipt::before {
              content: '';
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 40%),
                radial-gradient(circle at 85% 80%, rgba(200,16,46,0.45), transparent 45%);
              pointer-events: none;
            }

            .lkpm-mobile-landing .receipt-top {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              position: relative;
              z-index: 10;
            }

            .lkpm-mobile-landing .receipt-logo {
              width: 34px;
              height: 34px;
              border-radius: 8px;
              background: var(--maroon);
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--font-display);
              font-weight: 700;
              font-size: 14px;
            }

            .lkpm-mobile-landing .receipt-status {
              font-family: var(--font-mono);
              font-size: 9.5px;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              color: #ff5470;
              border: 1px solid rgba(255,84,112,0.5);
              padding: 4px 9px;
              border-radius: 999px;
            }

            .lkpm-mobile-landing .receipt-title {
              font-family: var(--font-mono);
              font-size: 10px;
              color: #c7bdb0;
              margin-top: 16px;
              letter-spacing: 0.05em;
              position: relative;
              z-index: 10;
            }

            .lkpm-mobile-landing .receipt-period {
              font-family: var(--font-display);
              font-size: 15px;
              margin-top: 3px;
              color: var(--gold-soft);
              position: relative;
              z-index: 10;
            }

            .lkpm-mobile-landing .receipt-divider {
              border-top: 1px dashed rgba(250,246,239,0.25);
              margin: 16px 0;
              position: relative;
              z-index: 10;
            }

            .lkpm-mobile-landing .receipt-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 14px 10px;
              position: relative;
              z-index: 10;
            }

            .lkpm-mobile-landing .receipt-grid .lbl {
              font-family: var(--font-mono);
              font-size: 9px;
              letter-spacing: 0.06em;
              color: #a89c8c;
              text-transform: uppercase;
            }

            .lkpm-mobile-landing .receipt-grid .val {
              font-family: var(--font-mono);
              font-weight: 700;
              font-size: 14px;
              margin-top: 3px;
            }

            .lkpm-mobile-landing .receipt-seal {
              position: absolute;
              right: 16px;
              bottom: 14px;
              width: 56px;
              height: 56px;
              border: 1.5px solid var(--gold-soft);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              transform: rotate(-14deg);
              opacity: 0.85;
              z-index: 10;
            }

            .lkpm-mobile-landing .receipt-seal span {
              font-family: var(--font-mono);
              font-size: 6.8px;
              letter-spacing: 0.04em;
              color: var(--gold-soft);
              line-height: 1.2;
            }

            /* ---------- Section shell ---------- */
            .lkpm-mobile-landing section {
              padding: 40px 18px 6px;
              text-align: left;
            }

            .lkpm-mobile-landing .kicker {
              font-family: var(--font-mono);
              font-size: 10.5px;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: var(--gold);
              margin-bottom: 8px;
            }

            .lkpm-mobile-landing h2 {
              font-family: var(--font-display);
              font-weight: 600;
              font-size: 22px;
              line-height: 1.25;
              color: var(--ink);
            }

            .lkpm-mobile-landing .section-sub {
              font-size: 13.5px;
              color: var(--muted);
              margin-top: 8px;
              line-height: 1.55;
              max-width: 40ch;
            }

            /* ---------- Wajib lapor grid ---------- */
            .lkpm-mobile-landing .grid-2 {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              margin-top: 20px;
            }

            .lkpm-mobile-landing .card {
              background: #fff;
              border: 1px solid var(--line);
              border-radius: 12px;
              padding: 14px;
            }

            .lkpm-mobile-landing .card .card-title {
              font-family: var(--font-display);
              font-weight: 600;
              font-size: 14.5px;
            }

            .lkpm-mobile-landing .card .card-desc {
              font-size: 11.5px;
              color: var(--muted);
              margin-top: 5px;
              line-height: 1.45;
            }

            .lkpm-mobile-landing .card.full {
              grid-column: 1 / -1;
            }

            .lkpm-mobile-landing .def-block {
              margin-top: 22px;
              background: var(--paper-2);
              border-left: 3px solid var(--maroon);
              border-radius: 0 10px 10px 0;
              padding: 16px;
            }

            .lkpm-mobile-landing .def-block .def-label {
              font-family: var(--font-mono);
              font-size: 10px;
              color: var(--maroon);
              letter-spacing: 0.05em;
              text-transform: uppercase;
            }

            .lkpm-mobile-landing .def-block p {
              font-size: 13px;
              line-height: 1.6;
              margin-top: 8px;
              color: var(--ink);
            }

            .lkpm-mobile-landing .def-block p + p {
              margin-top: 12px;
            }

            .lkpm-mobile-landing .def-block b {
              color: var(--maroon-deep);
            }

            /* ---------- Timeline / periode tabs ---------- */
            .lkpm-mobile-landing .period-card {
              margin-top: 16px;
              border: 1px solid var(--line);
              border-radius: 14px;
              overflow: hidden;
              background: #fff;
            }

            .lkpm-mobile-landing .period-head {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 14px 16px;
              background: var(--paper-2);
            }

            .lkpm-mobile-landing .period-head .p-name {
              font-family: var(--font-mono);
              font-size: 10.5px;
              letter-spacing: 0.06em;
              color: var(--muted);
              text-transform: uppercase;
            }

            .lkpm-mobile-landing .period-head .p-freq {
              font-family: var(--font-display);
              font-weight: 600;
              font-size: 16px;
              color: var(--maroon-deep);
              margin-top: 2px;
            }

            .lkpm-mobile-landing .period-badge {
              font-family: var(--font-mono);
              font-size: 10px;
              background: var(--maroon);
              color: #fff;
              padding: 4px 9px;
              border-radius: 999px;
            }

            .lkpm-mobile-landing .period-body {
              padding: 14px 16px 16px;
            }

            .lkpm-mobile-landing .period-body p {
              font-size: 12.5px;
              color: var(--muted);
              line-height: 1.55;
            }

            .lkpm-mobile-landing .deadline-list {
              margin-top: 12px;
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .lkpm-mobile-landing .deadline-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 12.5px;
              padding: 8px 10px;
              background: var(--paper);
              border-radius: 8px;
              border: 1px solid var(--line);
            }

            .lkpm-mobile-landing .deadline-row .d-name {
              color: var(--ink);
            }

            .lkpm-mobile-landing .deadline-row .d-date {
              font-family: var(--font-mono);
              font-weight: 700;
              color: var(--maroon-deep);
              font-size: 11.5px;
            }

            /* ---------- Data dilaporkan ---------- */
            .lkpm-mobile-landing .data-list {
              margin-top: 18px;
              display: flex;
              flex-direction: column;
              gap: 1px;
              background: var(--line);
              border-radius: 12px;
              overflow: hidden;
            }

            .lkpm-mobile-landing .data-item {
              background: #fff;
              padding: 14px 16px;
              display: flex;
              gap: 12px;
              align-items: flex-start;
            }

            .lkpm-mobile-landing .data-item .d-icon {
              width: 30px;
              height: 30px;
              border-radius: 8px;
              background: var(--paper-2);
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: var(--font-mono);
              font-size: 12px;
              color: var(--maroon);
              font-weight: 700;
            }

            .lkpm-mobile-landing .data-item .d-title {
              font-weight: 700;
              font-size: 13.5px;
            }

            .lkpm-mobile-landing .data-item .d-desc {
              font-size: 12px;
              color: var(--muted);
              margin-top: 2px;
              line-height: 1.45;
            }

            /* ---------- Sanksi ---------- */
            .lkpm-mobile-landing .sanksi-list {
              margin-top: 20px;
              position: relative;
            }

            .lkpm-mobile-landing .sanksi-item {
              display: flex;
              gap: 14px;
              padding-bottom: 22px;
              position: relative;
            }

            .lkpm-mobile-landing .sanksi-item:not(:last-child)::before {
              content: '';
              position: absolute;
              left: 15px;
              top: 34px;
              bottom: -4px;
              width: 1px;
              background: var(--line);
            }

            .lkpm-mobile-landing .sanksi-num {
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: var(--maroon);
              color: #fff;
              font-family: var(--font-mono);
              font-weight: 700;
              font-size: 13px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              z-index: 1;
            }

            .lkpm-mobile-landing .sanksi-item:last-child .sanksi-num {
              background: var(--ink);
            }

            .lkpm-mobile-landing .sanksi-text .s-title {
              font-weight: 700;
              font-size: 14px;
            }

            .lkpm-mobile-landing .sanksi-text .s-desc {
              font-size: 12.5px;
              color: var(--muted);
              margin-top: 3px;
              line-height: 1.5;
            }

            /* ---------- Pricing ---------- */
            .lkpm-mobile-landing .price-card {
              margin-top: 18px;
              border: 1px solid var(--line);
              border-radius: 16px;
              background: #fff;
              padding: 22px 18px;
              position: relative;
              overflow: hidden;
            }

            .lkpm-mobile-landing .price-card.popular {
              border: 2px solid var(--maroon);
            }

            .lkpm-mobile-landing .badge-popular {
              position: absolute;
              top: 0;
              right: 0;
              background: var(--maroon);
              color: #fff;
              font-family: var(--font-mono);
              font-size: 9.5px;
              letter-spacing: 0.06em;
              padding: 6px 14px 6px 18px;
              border-radius: 0 0 0 12px;
              text-transform: uppercase;
            }

            .lkpm-mobile-landing .price-seg {
              font-family: var(--font-mono);
              font-size: 11px;
              color: var(--muted);
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }

            .lkpm-mobile-landing .price-row {
              display: flex;
              align-items: baseline;
              gap: 8px;
              margin-top: 8px;
              flex-wrap: wrap;
            }

            .lkpm-mobile-landing .price-strike {
              font-size: 13px;
              color: var(--muted);
              text-decoration: line-through;
            }

            .lkpm-mobile-landing .price-now {
              font-family: var(--font-display);
              font-weight: 700;
              font-size: 24px;
              color: var(--maroon-deep);
            }

            .lkpm-mobile-landing .price-note {
              font-size: 10.5px;
              color: var(--ok);
              margin-top: 4px;
              font-weight: 600;
            }

            .lkpm-mobile-landing .price-divider {
              border-top: 1px solid var(--line);
              margin: 16px 0;
            }

            .lkpm-mobile-landing .price-list {
              display: flex;
              flex-direction: column;
              gap: 9px;
            }

            .lkpm-mobile-landing .price-list li {
              display: flex;
              gap: 8px;
              font-size: 12.5px;
              line-height: 1.5;
              align-items: flex-start;
            }

            .lkpm-mobile-landing .price-list li::before {
              content: '✓';
              color: var(--ok);
              font-weight: 700;
              flex-shrink: 0;
            }

            .lkpm-mobile-landing .price-list li b {
              color: var(--ink);
            }

            .lkpm-mobile-landing .price-btn {
              margin-top: 18px;
            }

            /* ---------- Alur langkah ---------- */
            .lkpm-mobile-landing .alur-item {
              margin-top: 16px;
              background: #fff;
              border: 1px solid var(--line);
              border-radius: 12px;
              padding: 16px;
              display: flex;
              gap: 14px;
            }

            .lkpm-mobile-landing .alur-num {
              font-family: var(--font-display);
              font-weight: 700;
              font-size: 22px;
              color: var(--gold-soft);
              -webkit-text-stroke: 1.3px var(--maroon);
              flex-shrink: 0;
              line-height: 1;
            }

            .lkpm-mobile-landing .alur-text .a-title {
              font-weight: 700;
              font-size: 14px;
            }

            .lkpm-mobile-landing .alur-text .a-desc {
              font-size: 12px;
              color: var(--muted);
              margin-top: 4px;
              line-height: 1.5;
            }

            /* ---------- FAQ ---------- */
            .lkpm-mobile-landing .faq-item {
              border-bottom: 1px solid var(--line);
            }

            .lkpm-mobile-landing .faq-item summary {
              padding: 16px 2px;
              font-weight: 600;
              font-size: 13.5px;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 10px;
              list-style: none;
            }

            .lkpm-mobile-landing .faq-item summary::-webkit-details-marker {
              display: none;
            }

            .lkpm-mobile-landing .faq-item summary::after {
              content: '+';
              font-family: var(--font-mono);
              font-size: 18px;
              color: var(--maroon);
              flex-shrink: 0;
              transition: transform 0.2s ease;
            }

            .lkpm-mobile-landing .faq-item[open] summary::after {
              transform: rotate(45deg);
            }

            .lkpm-mobile-landing .faq-item p {
              font-size: 12.5px;
              color: var(--muted);
              line-height: 1.6;
              padding: 0 2px 16px;
            }

            /* ---------- Final CTA ---------- */
            .lkpm-mobile-landing .final-cta {
              margin: 40px 18px 0;
              background: var(--maroon-deep);
              color: var(--paper);
              border-radius: 18px;
              padding: 28px 22px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }

            .lkpm-mobile-landing .final-cta::before {
              content: '';
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at 80% 0%, rgba(200,16,46,0.35), transparent 55%);
            }

            .lkpm-mobile-landing .final-cta h2 {
              color: #fff;
              font-size: 21px;
              position: relative;
              z-index: 10;
            }

            .lkpm-mobile-landing .final-cta p {
              font-size: 13px;
              color: #f0c6cc;
              margin-top: 8px;
              position: relative;
              z-index: 10;
              max-width: 32ch;
              margin-left: auto;
              margin-right: auto;
            }

            .lkpm-mobile-landing .final-cta .hero-ctas {
              position: relative;
              z-index: 10;
              margin-top: 20px;
            }

            .lkpm-mobile-landing .final-cta .btn-primary {
              background: #fff;
              color: var(--maroon-deep);
            }

            .lkpm-mobile-landing .final-cta .btn-secondary {
              border-color: rgba(255,255,255,0.4);
              color: var(--paper);
            }

            .lkpm-mobile-landing .final-meta {
              font-family: var(--font-mono);
              font-size: 10px;
              color: #f0c6cc;
              margin-top: 14px;
              position: relative;
              z-index: 10;
              opacity: 0.85;
            }

            .lkpm-mobile-landing footer {
              padding: 30px 18px 40px;
              text-align: center;
            }

            .lkpm-mobile-landing footer .f-brand {
              font-family: var(--font-display);
              font-weight: 700;
              font-size: 15px;
              color: var(--maroon-deep);
            }

            .lkpm-mobile-landing footer p {
              font-size: 10.5px;
              color: var(--muted);
              margin-top: 8px;
            }
          ` }} />

          <div className="wrap">
            <div className="topbar">
              <div className="brand">Easy<span>Legal</span></div>
              <a
                className="topbar-cta"
                href={getWhatsAppLink("Halo EasyLegal, saya ingin bertanya tentang Pelaporan LKPM.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                WA Kami
              </a>
            </div>

            <div className="crumb">
              <Link href="/">Beranda</Link> &nbsp;/&nbsp; <span style={{ color: 'var(--muted)' }}>Layanan</span> &nbsp;/&nbsp; <b>Pelaporan LKPM</b>
            </div>

            {/* HERO */}
            <div className="hero">
              <div className="eyebrow">BKPM · OSS RBA</div>
              <h1>Lapor LKPM tepat waktu, <em>hindari sanksi</em> BKPM.</h1>
              <p>Pelaporan Laporan Kegiatan Penanaman Modal lewat OSS RBA — akurat &amp; sesuai format BKPM. Proses cepat 1–3 hari kerja.</p>

              <div className="stat-row">
                <div className="stat-chip">
                  <div className="num">1–3 Hari</div>
                  <div className="lbl">Proses cepat</div>
                </div>
                <div className="stat-chip">
                  <div className="num">Rp1,49jt</div>
                  <div className="lbl">Mulai, UMK</div>
                </div>
              </div>

              <div className="hero-ctas">
                <a className="btn btn-primary" href="#paket">Lihat Paket LKPM</a>
                <a
                  className="btn btn-secondary"
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin Konsultasi Gratis mengenai Pelaporan LKPM.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konsultasi Gratis
                </a>
              </div>
              <div className="hero-meta">Respons dalam 5 menit · Senin–Sabtu 08.00–20.00</div>
            </div>

            {/* SIGNATURE: RECEIPT */}
            <div className="receipt-zone">
              <div className="receipt">
                <div className="receipt-top">
                  <div className="receipt-logo">EL</div>
                  <div className="receipt-status">● Submitted</div>
                </div>
                <div className="receipt-title">PERIODE TRIWULAN I — 2026</div>
                <div className="receipt-period">Laporan Kegiatan Penanaman Modal</div>
                <div className="receipt-divider"></div>
                <div className="receipt-grid">
                  <div>
                    <div className="lbl">Realisasi</div>
                    <div className="val">Rp 1,2M</div>
                  </div>
                  <div>
                    <div className="lbl">Tenaga Kerja</div>
                    <div className="val">18 Orang</div>
                  </div>
                  <div>
                    <div className="lbl">Produksi</div>
                    <div className="val">Aktif</div>
                  </div>
                  <div>
                    <div className="lbl">Status</div>
                    <div className="val">On Track</div>
                  </div>
                </div>
                <div className="receipt-seal">
                  <span>TANDA<br />TERIMA<br />OSS·RBA</span>
                </div>
              </div>
            </div>

            {/* APA ITU LKPM */}
            <section>
              <div className="kicker">Pengertian</div>
              <h2>Apa itu LKPM &amp; kenapa wajib lapor?</h2>
              <p className="section-sub">Pelaporan rutin yang wajib untuk perusahaan dengan NIB &amp; izin usaha — bagian dari pengawasan investasi BKPM.</p>

              <div className="grid-2">
                <div className="card">
                  <div className="card-title">PMA &amp; PMDN</div>
                  <div className="card-desc">Wajib bagi semua perusahaan ber-NIB</div>
                </div>
                <div className="card">
                  <div className="card-title">Mikro &amp; Kecil</div>
                  <div className="card-desc">Lapor per 6 bulan (semester)</div>
                </div>
                <div className="card">
                  <div className="card-title">Menengah &amp; Besar</div>
                  <div className="card-desc">Lapor per 3 bulan (kuartal)</div>
                </div>
                <div className="card">
                  <div className="card-title">Konstruksi–Operasi</div>
                  <div className="card-desc">Berlaku sejak konstruksi sampai operasional</div>
                </div>
                <div className="card full">
                  <div className="card-title">Dasar Hukum</div>
                  <div className="card-desc">Peraturan BKPM No. 5/2021 &amp; UU Cipta Kerja</div>
                </div>
              </div>

              <div className="def-block">
                <div className="def-label">LKPM</div>
                <p><b>LKPM (Laporan Kegiatan Penanaman Modal)</b> adalah laporan berkala ke Kementerian Investasi/BKPM berisi data realisasi investasi, tenaga kerja, produksi/penjualan, lokasi proyek, &amp; kendala usaha — dilaporkan via sistem OSS RBA.</p>
                <p><b>Manfaat lapor tepat waktu:</b> menjaga validitas NIB &amp; izin usaha, menjaga rating compliance, avoiding sanksi cabut izin, memperlancar perpanjangan izin, &amp; memenuhi syarat tender pemerintah.</p>
              </div>
            </section>

            {/* PERIODE */}
            <section>
              <div className="kicker">Periode &amp; Batas Waktu</div>
              <h2>Kapan harus lapor LKPM?</h2>
              <p className="section-sub">Frekuensi tergantung skala usaha. Telat lapor = risiko sanksi BKPM.</p>

              <div className="period-card">
                <div className="period-head">
                  <div>
                    <div className="p-name">Mikro &amp; Kecil (UMK)</div>
                    <div className="p-freq">2× Setahun</div>
                  </div>
                  <div className="period-badge">Semesteran</div>
                </div>
                <div className="period-body">
                  <p>Modal usaha &lt; Rp 5 miliar (di luar tanah &amp; bangunan).</p>
                  <div className="deadline-list">
                    <div className="deadline-row">
                      <span className="d-name">Semester I</span>
                      <span className="d-date">Maks 10 Juli</span>
                    </div>
                    <div className="deadline-row">
                      <span className="d-name">Semester II</span>
                      <span className="d-date">Maks 10 Januari</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="period-card">
                <div className="period-head">
                  <div>
                    <div className="p-name">Menengah &amp; Besar</div>
                    <div className="p-freq">4× Setahun</div>
                  </div>
                  <div className="period-badge">Kuartalan</div>
                </div>
                <div className="period-body">
                  <p>Termasuk semua PMA &amp; PMDN dengan modal usaha &gt; Rp 5 miliar.</p>
                  <div className="deadline-list">
                    <div className="deadline-row">
                      <span className="d-name">Triwulan I</span>
                      <span className="d-date">Maks 10 April</span>
                    </div>
                    <div className="deadline-row">
                      <span className="d-name">Triwulan II</span>
                      <span className="d-date">Maks 10 Juli</span>
                    </div>
                    <div className="deadline-row">
                      <span className="d-name">Triwulan III</span>
                      <span className="d-date">Maks 10 Okt</span>
                    </div>
                    <div className="deadline-row">
                      <span className="d-name">Triwulan IV</span>
                      <span className="d-date">Maks 10 Jan</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DATA */}
            <section>
              <div className="kicker">Data yang Dilaporkan</div>
              <h2>Apa saja isi laporan LKPM?</h2>
              <p className="section-sub">5 kategori data utama setiap periode pelaporan.</p>

              <div className="data-list">
                <div className="data-item">
                  <div className="d-icon">01</div>
                  <div>
                    <div className="d-title">Realisasi Investasi</div>
                    <div className="d-desc">Nilai investasi yang sudah direalisasikan (modal tetap &amp; modal kerja).</div>
                  </div>
                </div>
                <div className="data-item">
                  <div className="d-icon">02</div>
                  <div>
                    <div className="d-title">Tenaga Kerja</div>
                    <div className="d-desc">Jumlah karyawan WNI &amp; WNA yang terserap.</div>
                  </div>
                </div>
                <div className="data-item">
                  <div className="d-icon">03</div>
                  <div>
                    <div className="d-title">Produksi / Penjualan</div>
                    <div className="d-desc">Volume &amp; nilai produksi barang atau jasa.</div>
                  </div>
                </div>
                <div className="data-item">
                  <div className="d-icon">04</div>
                  <div>
                    <div className="d-title">Perizinan</div>
                    <div className="d-desc">Progress perolehan izin terkait (lingkungan, bangunan, dll).</div>
                  </div>
                </div>
                <div className="data-item">
                  <div className="d-icon">05</div>
                  <div>
                    <div className="d-title">Kendala Usaha</div>
                    <div className="d-desc">Hambatan yang dihadapi dalam pengoperasian investasi.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* SANKSI */}
            <section>
              <div className="kicker">Sanksi Jika Tidak Lapor</div>
              <h2>Konsekuensi telat lapor LKPM.</h2>
              <p className="section-sub">Sanksi bertahap dari peringatan sampai pencabutan izin.</p>

              <div className="sanksi-list">
                <div className="sanksi-item">
                  <div className="sanksi-num">1</div>
                  <div className="sanksi-text">
                    <div className="s-title">Peringatan Tertulis</div>
                    <div className="s-desc">Surat peringatan dengan tenggat waktu untuk memenuhi kewajiban lapor.</div>
                  </div>
                </div>
                <div className="sanksi-item">
                  <div className="sanksi-num">2</div>
                  <div className="sanksi-text">
                    <div className="s-title">Penghentian Sementara</div>
                    <div className="s-desc">Suspensi NIB &amp; izin usaha — perusahaan tidak bisa beroperasi resmi.</div>
                  </div>
                </div>
                <div className="sanksi-item">
                  <div className="sanksi-num">3</div>
                  <div className="sanksi-text">
                    <div className="s-title">Pencabutan Izin</div>
                    <div className="s-desc">Pencabutan permanen NIB &amp; izin berusaha jika diabaikan terus-menerus.</div>
                  </div>
                </div>
                <div className="sanksi-item">
                  <div className="sanksi-num">✕</div>
                  <div className="sanksi-text">
                    <div className="s-title">Compliance Rating Turun</div>
                    <div className="s-desc">Mempengaruhi pengajuan izin lain, tender, &amp; insentif.</div>
                  </div>
                </div>
              </div>
            </section>

            {/* PRICING */}
            <section id="paket">
              <div className="kicker">Biaya Jasa Pelaporan</div>
              <h2>2 paket sesuai skala usaha.</h2>
              <p className="section-sub">Harga sudah termasuk konsultasi, pengisian, &amp; submit ke OSS.</p>

              <div className="price-card popular">
                <div className="badge-popular">Populer</div>
                <div className="price-seg">Mikro Kecil</div>
                <div className="price-row">
                  <span className="price-strike">Rp3.000.000</span>
                  <span className="price-now">Rp1.499.000</span>
                </div>
                <div className="price-note">Tanpa tambahan biaya apapun</div>
                <div className="price-divider"></div>
                <ul className="price-list">
                  <li><b>Tanda Terima</b> Pelaporan LKPM dari sistem OSS BKPM</li>
                  <li>Layanan Personal Legal Assistance</li>
                  <li><b>1 Kupon</b> Undian iPhone</li>
                  <li>Voucher EasyLegal <b>Rp250.000</b> + Dokumen SOP &amp; Kontrak Bisnis</li>
                </ul>
                <a
                  className="btn btn-primary price-btn"
                  href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket LKPM Mikro Kecil. Mohon info lengkap biaya dan prosesnya.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pilih LKPM Mikro Kecil
                </a>
              </div>

              <div className="price-card">
                <div className="price-seg">Menengah Besar</div>
                <div className="price-row">
                  <span className="price-strike">Rp5.000.000</span>
                  <span className="price-now">Rp2.499.000</span>
                </div>
                <div className="price-note">Tanpa tambahan biaya apapun</div>
                <div className="price-divider"></div>
                <ul className="price-list">
                  <li><b>Tanda Terima</b> Pelaporan LKPM dari sistem OSS BKPM</li>
                  <li>Layanan Personal Legal Assistance</li>
                  <li><b>1 Kupon</b> Undian iPhone</li>
                  <li>Voucher EasyLegal <b>Rp250.000</b> + Dokumen SOP &amp; Kontrak Bisnis</li>
                </ul>
                <a
                  className="btn btn-secondary price-btn"
                  href={getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket LKPM Menengah Besar. Mohon info lengkap biaya dan prosesnya.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pilih LKPM Menengah Besar
                </a>
              </div>
            </section>

            {/* ALUR */}
            <section>
              <div className="kicker">Alur Pelaporan di OSS RBA</div>
              <h2>5 langkah submit laporan.</h2>
              <p className="section-sub">Kami pegang seluruh alur — Anda terima Tanda Terima resmi.</p>

              <div className="alur-item">
                <div className="alur-num">01</div>
                <div className="alur-text">
                  <div className="a-title">Pengumpulan Data Periode</div>
                  <div className="a-desc">Konsultasi singkat, kumpulkan data realisasi, tenaga kerja, produksi, &amp; kendala.</div>
                </div>
              </div>
              <div className="alur-item">
                <div className="alur-num">02</div>
                <div className="alur-text">
                  <div className="a-title">Verifikasi &amp; Penyusunan</div>
                  <div className="a-desc">Tim review &amp; cross-check data dengan format resmi BKPM.</div>
                </div>
              </div>
              <div className="alur-item">
                <div className="alur-num">03</div>
                <div className="alur-text">
                  <div className="a-title">Submit via OSS RBA</div>
                  <div className="a-desc">Pelaporan resmi lewat sistem OSS RBA menggunakan kredensial perusahaan.</div>
                </div>
              </div>
              <div className="alur-item">
                <div className="alur-num">04</div>
                <div className="alur-text">
                  <div className="a-title">Penerbitan Tanda Terima</div>
                  <div className="a-desc">Sistem OSS menerbitkan Tanda Terima resmi sebagai bukti kepatuhan.</div>
                </div>
              </div>
              <div className="alur-item">
                <div className="alur-num">05</div>
                <div className="alur-text">
                  <div className="a-title">Arsip &amp; Reminder</div>
                  <div className="a-desc">Kami arsipkan bukti pelaporan &amp; kirim reminder periode berikutnya.</div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section style={{ paddingBottom: '30px' }}>
              <div className="kicker">FAQ</div>
              <h2>Pertanyaan yang sering ditanyakan.</h2>

              <div style={{ marginTop: '14px' }}>
                <details className="faq-item" open>
                  <summary>Apakah perusahaan saya wajib lapor LKPM?</summary>
                  <p>Wajib jika perusahaan Anda memiliki NIB &amp; izin berusaha — termasuk PMA, PMDN, UMK, sampai perusahaan besar, mulai tahap konstruksi sampai operasional.</p>
                </details>
                <details className="faq-item">
                  <summary>Berapa kali setahun harus lapor?</summary>
                  <p>Skala UMK melapor 2 kali setahun (semesteran). Skala Menengah &amp; Besar melapor 4 kali setahun (kuartalan).</p>
                </details>
                <details className="faq-item">
                  <summary>Apa yang terjadi kalau telat lapor?</summary>
                  <p>Sanksi bertahap: Peringatan Tertulis, Penghentian Sementara, Pembekuan NIB, hingga Pencabutan Izin Usaha permanen. Compliance rating juga turun.</p>
                </details>
                <details className="faq-item">
                  <summary>Bagaimana kalau belum ada realisasi?</summary>
                  <p>Setiap perusahaan tetap wajib melapor dengan nilai realisasi nihil (Rp0) atau mencantumkan kendala/tahapan konstruksi yang berjalan.</p>
                </details>
                <details className="faq-item">
                  <summary>Apakah bisa lapor sendiri tanpa jasa?</summary>
                  <p>Bisa lewat portal OSS RBA mandiri, namun banyak perusahaan kesulitan teknis memetakan realisasi &amp; menghitung rasio modal kerja.</p>
                </details>
                <details className="faq-item">
                  <summary>Bagaimana sistem reminder EasyLegal?</summary>
                  <p>Reminder otomatis via WhatsApp &amp; Email — 30 hari, 14 hari, dan 7 hari sebelum batas akhir pelaporan.</p>
                </details>
              </div>
            </section>

            {/* FINAL CTA */}
            <div className="final-cta">
              <h2>Mau lapor LKPM tanpa ribet?</h2>
              <p>Konsultasi gratis untuk cek kewajiban &amp; periode pelaporan perusahaan Anda.</p>
              <div className="hero-ctas">
                <a
                  className="btn btn-primary"
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai Pelaporan LKPM.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konsultasi via WhatsApp
                </a>
                <a
                  className="btn btn-secondary"
                  href={getWhatsAppLink("Halo EasyLegal, saya ingin menghubungi tim mengenai Pelaporan LKPM.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hubungi Tim Kami
                </a>
              </div>
              <div className="final-meta">Reminder otomatis tiap periode · Senin–Sabtu 08:00–20:00</div>
            </div>

            <footer>
              <div className="f-brand">EasyLegal</div>
              <p>© 2026 EasyLegal.id — Terdaftar PSE Kominfo.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
