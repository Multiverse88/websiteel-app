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

export default function PelaporanLKPM() {
  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("paket-harga");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
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
    </>
  );
}
