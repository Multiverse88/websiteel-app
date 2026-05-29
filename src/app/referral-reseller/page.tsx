"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Users,
  Share2,
  Building,
  Briefcase,
  Gift,
  ArrowRight,
  Clock,
  Home,
  Mail,
  Phone,
  ShieldCheck,
  Award
} from "lucide-react";

export default function ReferralResellerPage() {
  // FAQ state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Simulasi Penghasilan state
  const [selectedScenario, setSelectedScenario] = useState("Santai");

  const scenarios = [
    { id: "Santai",    color: "#22c55e", txPerMonth: 3,  avgComisi: 250000, desc: "Sambil kerja lain, promosi sesekali" },
    { id: "Aktif",    color: "#3b82f6", txPerMonth: 8,  avgComisi: 300000, desc: "Rutin promosi di komunitas & media sosial" },
    { id: "Serius",   color: "#eab308", txPerMonth: 15, avgComisi: 350000, desc: "Fokus promosi harian, punya jaringan luas" },
    { id: "Full-time", color: "#ef4444", txPerMonth: 30, avgComisi: 400000, desc: "Dedikasi penuh sebagai mitra referral" },
  ];

  const topCommissions = [
    { rank: 1, name: "KITAS TKA (Baru)", amount: 1270000 },
    { rank: 2, name: "KITAS TKA (Perpanjangan)", amount: 1150000 },
    { rank: 3, name: "Sertifikasi ISO (Premium)", amount: 950000 },
    { rank: 4, name: "KITAS Investor (2 Tahun)", amount: 850000 },
    { rank: 5, name: "Pendirian PT Express", amount: 800000 },
    { rank: 6, name: "KITAS Investor (1 Tahun)", amount: 750000 },
    { rank: 7, name: "Visa Bisnis Multiple Entry", amount: 700000 },
    { rank: 8, name: "Press Release (Paket C)", amount: 650000 },
    { rank: 9, name: "Pendirian PT Complete", amount: 620000 },
    { rank: 10, name: "Perjanjian Pisah Harta", amount: 600000 },
  ];

  const faqs = [
    {
      question: "Siapa saja yang bisa gabung program referral?",
      answer: "Siapa saja boleh gabung! Tidak ada syarat khusus — usia min. 17 tahun, punya WhatsApp aktif & rekening bank. Cocok untuk: freelancer, konsultan, agen properti, content creator, mahasiswa, ibu rumah tangga, karyawan yang cari side income, atau pelaku bisnis dengan jaringan luas. Tidak ada syarat minimum follower atau pengalaman sales."
    },
    {
      question: "Apakah ada biaya pendaftaran atau minimum transaksi?",
      answer: "Tidak ada biaya pendaftaran sama sekali (100% gratis) dan tidak ada target minimum transaksi bulanan. Anda bisa mereferensikan kapan saja tanpa tekanan target."
    },
    {
      question: "Berapa lama komisi cair setelah klien bayar?",
      answer: "Komisi Anda akan diproses dan ditransfer ke rekening bank Anda dalam waktu maksimal 3 hari kerja setelah klien melakukan pembayaran lunas kepada EasyLegal."
    },
    {
      question: "Bagaimana cara klien pakai kode referral saya?",
      answer: "Saat klien menghubungi kami via WhatsApp atau formulir, mereka cukup menginfokan nama atau kode referral Anda kepada tim kami. Kami akan mencatat transaksi tersebut di bawah referral Anda secara otomatis."
    },
    {
      question: "Apakah komisi berbeda untuk setiap layanan?",
      answer: "Ya, besaran komisi bervariasi bergantung pada jenis layanan yang diambil oleh klien. Layanan komisi terbesar dapat Anda lihat pada tabel Top 10 Komisi di atas."
    },
    {
      question: "Apakah saya bisa pakai kode untuk diri sendiri?",
      answer: "Tentu saja! Anda bisa menggunakan kode referral sendiri untuk mendapatkan diskon langsung (cashback) saat mendirikan PT atau menggunakan layanan legalitas lainnya dari EasyLegal."
    },
    {
      question: "Layanan apa saja yang bisa direferralkan?",
      answer: "Seluruh layanan EasyLegal yang berjumlah 90+ layanan dapat direferralkan, termasuk pendirian PT/CV, pendaftaran Merek/Paten, pengurusan KITAS/Visa, sertifikasi ISO, LKPM, hingga pembuatan perjanjian hukum."
    },
    {
      question: "Bagaimana cara mulai gabung?",
      answer: "Sangat mudah! Klik tombol 'Daftar Gratis Sekarang' untuk menghubungi tim partnership kami melalui WhatsApp. Kami akan memverifikasi data Anda dan mengirimkan kode referral aktif Anda dalam waktu 5 menit."
    }
  ];

  const activeScenario = scenarios.find(s => s.id === selectedScenario) ?? scenarios[0];
  const formatRp = (n: number) => n.toLocaleString("id-ID");;

  const scrollToCaraKerja = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("cara-kerja");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBFA] text-gray-900 font-sans">

      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white pt-12 pb-20 lg:pt-16 lg:pb-24 relative overflow-hidden">
        {/* Soft Pink/Rose Radial Gradient Background — kiri pekat, kanan putih */}
        {/* Blob utama: pink/rose besar di kiri-tengah */}
        <div
          className="absolute -left-[200px] top-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] aspect-square rounded-full pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(253, 180, 196, 0.55) 0%, rgba(253, 218, 222, 0.3) 40%, rgba(253, 218, 222, 0) 70%)",
            filter: "blur(55px)",
          }}
        />
        {/* Blob kedua: pink sangat lembut di kiri-atas untuk kesan foto referensi */}
        <div
          className="absolute -left-[100px] -top-[100px] w-[500px] sm:w-[650px] aspect-square rounded-full pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(253, 200, 215, 0.45) 0%, rgba(253, 218, 222, 0) 65%)",
            filter: "blur(50px)",
          }}
        />
        {/* Kanan bawah: sangat transparan agar sisi kanan tetap putih bersih */}
        <div
          className="absolute right-0 bottom-0 w-[350px] sm:w-[500px] aspect-square rounded-full pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(255, 240, 245, 0.25) 0%, rgba(255, 255, 255, 0) 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
              {/* Badge Pill */}
              <div className="inline-flex items-center space-x-2 bg-white py-1.5 px-3.5 rounded-full border border-gray-150 shadow-[0_2px_12px_rgba(0,0,0,0.015)] w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[11.5px] font-bold text-gray-800 tracking-wider">Program Referral & Reseller</span>
              </div>

              {/* Headline */}
              <h1 className="font-inter text-[36px] sm:text-[48px] lg:text-[54px] font-black text-gray-900 leading-[1.12] tracking-tight max-w-2xl">
                Cuan sampai Rp 1,27jt per transaksi — tanpa modal sepeser pun.
              </h1>

              {/* Subtitle */}
              <p className="text-[15px] sm:text-[16px] text-gray-500 leading-relaxed max-w-xl font-normal">
                Rekomendasikan layanan legalitas EasyLegal ke kontakmu — terima komisi langsung tiap transaksi closing. Cocok untuk freelancer, konsultan, agen properti, & siapa saja yang punya jaringan bisnis.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20mendaftar%20Program%20Referral%20%26%20Reseller%20tanpa%20modal."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[15px] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center cursor-pointer space-x-2 shrink-0"
                >
                  {/* WhatsApp SVG Icon */}
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.34 4.96L2 22l5.22-1.37A9.91 9.91 0 0 0 12.004 22c5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.73 14.1c-.24.68-1.42 1.25-1.95 1.32-.48.06-1.1.11-3.1-.71-2.56-1.07-4.22-3.69-4.35-3.86-.13-.17-.96-1.28-.96-2.43 0-1.16.61-1.73.83-1.97.22-.24.47-.3.63-.3.16 0 .32 0 .46.01.14 0 .33-.05.52.4.19.47.65 1.59.7 1.7.06.12.1.25.02.4-.08.16-.12.25-.23.38-.11.13-.24.3-.34.4-.11.12-.23.24-.1.47.13.23.6 1 1.29 1.62.88.79 1.63 1.03 1.86 1.15.23.12.37.1.5-.05.13-.15.57-.67.73-.99.15-.31.3-.26.5-.18.2.08 1.27.6 1.48.7.22.11.36.16.41.25.06.09.06.52-.18 1.2z" />
                  </svg>
                  <span>Daftar Gratis via WhatsApp</span>
                </a>
                <a
                  href="#cara-kerja"
                  onClick={scrollToCaraKerja}
                  className="inline-flex items-center justify-center px-7 py-3.5 border border-gray-250 text-gray-800 font-extrabold text-[15px] rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Pelajari Cara Kerja
                </a>
              </div>

              {/* Checkpoints Row */}
              <div className="border-t border-gray-150 pt-8 mt-10 grid grid-cols-3 gap-4">
                {/* Checkpoint 1 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#990202] shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#990202]" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[14px] sm:text-[15px] text-gray-900 leading-tight">6.500+</div>
                    <div className="text-[11px] sm:text-[12px] text-gray-500 font-semibold mt-0.5">Klien terlayani</div>
                  </div>
                </div>
                {/* Checkpoint 2 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#990202] shrink-0">
                    <Check className="w-5 h-5 text-[#990202]" strokeWidth={3.5} />
                  </div>
                  <div>
                    <div className="font-extrabold text-[14px] sm:text-[15px] text-gray-900 leading-tight">90+ Layanan</div>
                    <div className="text-[11px] sm:text-[12px] text-gray-500 font-semibold mt-0.5">Satu kode komisi</div>
                  </div>
                </div>
                {/* Checkpoint 3 */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#990202] shrink-0">
                    <Award className="w-5 h-5 text-[#990202]" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[14px] sm:text-[15px] text-gray-900 leading-tight">ISO Certified</div>
                    <div className="text-[11px] sm:text-[12px] text-gray-500 font-semibold mt-0.5">9001 & 27001</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (col-span-5) */}
            <div className="lg:col-span-5 relative flex justify-center items-center py-12 lg:py-0">

              {/* Backglow element specific to this mockup card */}
              <div
                className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] rounded-full pointer-events-none z-0"
                style={{
                  background: "radial-gradient(circle, rgba(153, 2, 2, 0.065) 0%, rgba(153, 2, 2, 0) 70%)",
                  filter: "blur(40px)",
                }}
              />

              <div className="relative w-full max-w-[390px] z-10">
                {/* 1. Main Commission Card */}
                <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_20px_50px_rgba(0,0,0,0.035)] relative">

                  {/* Floating badge centered on the top card border */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#990202] text-white text-[9.5px] font-black tracking-widest px-4.5 py-1.5 rounded-full uppercase border border-[#990202] shadow-md z-20 whitespace-nowrap">
                    CONTOH KOMISI · 1 KLIEN
                  </div>

                  <div className="text-center mt-4">
                    <span className="text-gray-450 text-[10px] font-extrabold tracking-widest block mb-1">
                      TOTAL KOMISI POTENSIAL
                    </span>
                    <div className="flex items-start justify-center text-[#990202] font-black leading-none mb-1 font-sans">
                      <span className="text-[20px] sm:text-[24px] mt-2 sm:mt-2.5 mr-0.5">Rp</span>
                      <span className="text-[48px] sm:text-[56px] tracking-tight">850.000</span>
                    </div>
                    <span className="text-gray-400 text-[9.5px] font-bold tracking-wider block mb-6">
                      DARI 1 PAKET LAYANAN KLIEN
                    </span>
                  </div>

                  {/* Checklist of Services */}
                  <div className="space-y-4 mb-5 border-t border-b border-gray-100 py-5">
                    {/* Item 1 */}
                    <div className="flex items-center justify-between text-[13px] sm:text-[13.5px]">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <Check className="w-3.5 h-3.5" strokeWidth={4} />
                        </div>
                        <span className="font-semibold text-gray-700">Pendirian PT</span>
                      </div>
                      <span className="font-extrabold text-gray-850">Rp 400.000</span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center justify-between text-[13px] sm:text-[13.5px]">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <Check className="w-3.5 h-3.5" strokeWidth={4} />
                        </div>
                        <span className="font-semibold text-gray-700">Daftar Merek</span>
                      </div>
                      <span className="font-extrabold text-gray-850">Rp 250.000</span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center justify-between text-[13px] sm:text-[13.5px]">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <Check className="w-3.5 h-3.5" strokeWidth={4} />
                        </div>
                        <span className="font-semibold text-gray-700">NIB &amp; OSS</span>
                      </div>
                      <span className="font-extrabold text-gray-850">Rp 100.000</span>
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-center justify-between text-[13px] sm:text-[13.5px]">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <Check className="w-3.5 h-3.5" strokeWidth={4} />
                        </div>
                        <span className="font-semibold text-gray-700">Virtual Office</span>
                      </div>
                      <span className="font-extrabold text-gray-850">Rp 100.000</span>
                    </div>
                  </div>

                  {/* Total per Klien */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-gray-500 font-extrabold text-[12px] sm:text-[12.5px] tracking-wide">
                      TOTAL PER KLIEN
                    </span>
                    <span className="text-[#990202] font-black text-[14.5px] sm:text-[15.5px]">
                      Rp 850.000
                    </span>
                  </div>

                </div>

                {/* 2. Floating Badge: Transfer 3 Hari (Top Right, overlapping slightly) */}
                <div className="absolute -top-20 -right-4 sm:-right-8 bg-white rounded-2xl p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_15px_35px_rgba(0,0,0,0.04)] flex items-center space-x-3 max-w-[190px] z-20 hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-9 h-9 bg-[#990202] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                    <Check className="w-5 h-5 text-white" strokeWidth={3.5} />
                  </div>
                  <div>
                    <div className="font-black text-[12.5px] text-gray-900 leading-tight">Transfer 3 Hari</div>
                    <div className="text-[10px] text-gray-450 font-semibold mt-0.5">Setelah klien bayar</div>
                  </div>
                </div>

                {/* 3. Floating Badge: Unlimited Income (Bottom Left, overlapping slightly) */}
                <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white rounded-2xl p-3 shadow-[0_0_0_1px_rgba(0,0,0,0.03),_0_15px_35px_rgba(0,0,0,0.04)] flex items-center space-x-3 max-w-[190px] z-20 hover:scale-[1.02] transition-transform duration-300">
                  <div className="w-9 h-9 bg-[#990202] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <line x1="18" y1="20" x2="18" y2="10" />
                      <line x1="12" y1="20" x2="12" y2="4" />
                      <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-black text-[12.5px] text-gray-900 leading-tight">Unlimited Income</div>
                    <div className="text-[10px] text-gray-450 font-semibold mt-0.5">Tidak ada batas komisi</div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. CARA KERJA SECTION ─── */}

      <section id="cara-kerja" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">CARA KERJA</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-black text-gray-900 leading-tight tracking-tight">
              4 langkah <span className="text-[#990202]">mulai cuan</span> dari rumah.
            </h2>
            <p className="text-[15px] text-gray-500 font-normal leading-relaxed max-w-xl mx-auto">
              Cuma butuh 5 menit untuk gabung. Tidak ada syarat minimum transaksi, tidak ada biaya pendaftaran.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] mx-auto">

            {/* Step 1 */}
            <div className="bg-white rounded-[20px] p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.055),_0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-0.5">
              {/* Number circle — outline style */}
              <div className="w-14 h-14 rounded-full border-2 border-[#990202] flex items-center justify-center mb-6 shrink-0">
                <span className="text-[#990202] font-black text-[18px] leading-none">1</span>
              </div>
              <h3 className="text-[16px] font-black text-gray-900 leading-tight mb-3">Daftar Gratis</h3>
              <p className="text-[13px] text-gray-500 font-normal leading-relaxed">
                Chat tim kami via WhatsApp. Isi data singkat — tidak ada biaya pendaftaran sama sekali.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-[20px] p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.055),_0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-full border-2 border-[#990202] flex items-center justify-center mb-6 shrink-0">
                <span className="text-[#990202] font-black text-[18px] leading-none">2</span>
              </div>
              <h3 className="text-[16px] font-black text-gray-900 leading-tight mb-3">Terima Kode Unik</h3>
              <p className="text-[13px] text-gray-500 font-normal leading-relaxed">
                Kami kirim kode referral unikmu dalam 1×24 jam. Satu kode untuk semua 90+ layanan kami.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-[20px] p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.055),_0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-full border-2 border-[#990202] flex items-center justify-center mb-6 shrink-0">
                <span className="text-[#990202] font-black text-[18px] leading-none">3</span>
              </div>
              <h3 className="text-[16px] font-black text-gray-900 leading-tight mb-3">Share ke Kontak</h3>
              <p className="text-[13px] text-gray-500 font-normal leading-relaxed">
                Sebar kode ke teman, klien, follower — siapa saja yang butuh jasa legalitas bisnis.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-[20px] p-8 shadow-[0_0_0_1px_rgba(0,0,0,0.055),_0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.08),_0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-0.5">
              <div className="w-14 h-14 rounded-full border-2 border-[#990202] flex items-center justify-center mb-6 shrink-0">
                <span className="text-[#990202] font-black text-[18px] leading-none">4</span>
              </div>
              <h3 className="text-[16px] font-black text-gray-900 leading-tight mb-3">Terima Komisi</h3>
              <p className="text-[13px] text-gray-500 font-normal leading-relaxed">
                Komisi otomatis ditransfer ke rekeningmu dalam <strong className="font-extrabold text-gray-900">3 hari kerja</strong> setelah klien bayar.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. KENAPA GABUNG SECTION ─── */}
      <section className="py-20 bg-[#F8F7F5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">KENAPA GABUNG</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-black text-gray-900 leading-tight tracking-tight">
              Lebih dari sekadar referral biasa.
            </h2>
            <p className="text-[15px] text-gray-500 font-normal leading-relaxed max-w-xl mx-auto">
              Program kami dirancang biar partner untung maksimal — komisi tinggi, klien dapat diskon, semua menang.
            </p>
          </div>

          {/* Main Grid: Left big card + Right 2x2 grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">

            {/* LEFT: Dark Crimson Gradient Card */}
            <div
              className="lg:col-span-1 rounded-[24px] p-8 flex flex-col justify-between relative overflow-hidden min-h-[360px]"
              style={{
                background: "linear-gradient(160deg, #6b0a0a 0%, #990202 35%, #7a0808 70%, #4a0505 100%)",
              }}
            >
              {/* Gold $ Icon */}
              <div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(212, 175, 55, 0.2)", border: "1px solid rgba(212, 175, 55, 0.4)" }}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="rgb(212,175,55)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>

                <h3 className="text-white font-black text-[22px] sm:text-[24px] leading-tight tracking-tight mb-4">
                  Komisi Tertinggi sampai Rp 1.270.000
                </h3>
                <p className="text-white/65 text-[13.5px] font-normal leading-relaxed max-w-[280px]">
                  Setiap layanan punya rate komisi berbeda — beberapa layanan premium kasih komisi sampai jutaan rupiah per transaksi.
                </p>
              </div>

              {/* Big bottom stat */}
              <div className="mt-10">
                <span
                  className="font-black text-[54px] sm:text-[60px] leading-none tracking-tight"
                  style={{ color: "rgb(212, 175, 55)" }}
                >
                  Rp 1,27jt
                </span>
              </div>
            </div>

            {/* RIGHT: 2×2 grid of white feature cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Card 1: Transfer 3 Hari */}
              <div className="bg-white rounded-[20px] p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.045),_0_4px_20px_rgba(0,0,0,0.025)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.07),_0_12px_35px_rgba(153,2,2,0.04)] transition-all duration-300 flex flex-col space-y-4 hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#990202]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-[16px] text-gray-900 leading-tight mb-2">Transfer 3 Hari</h4>
                  <p className="text-[13px] text-gray-500 font-normal leading-relaxed">
                    Komisi cair otomatis tiga hari kerja setelah pembayaran klien.
                  </p>
                </div>
              </div>

              {/* Card 2: Klien Dapat Diskon */}
              <div className="bg-white rounded-[20px] p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.045),_0_4px_20px_rgba(0,0,0,0.025)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.07),_0_12px_35px_rgba(153,2,2,0.04)] transition-all duration-300 flex flex-col space-y-4 hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#990202]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-[16px] text-gray-900 leading-tight mb-2">Klien Dapat Diskon</h4>
                  <p className="text-[13px] text-gray-500 font-normal leading-relaxed">
                    Klien hemat sampai Rp 80.000 dengan kodemu — win-win.
                  </p>
                </div>
              </div>

              {/* Card 3: 90+ Layanan, 1 Kode */}
              <div className="bg-white rounded-[20px] p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.045),_0_4px_20px_rgba(0,0,0,0.025)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.07),_0_12px_35px_rgba(153,2,2,0.04)] transition-all duration-300 flex flex-col space-y-4 hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#990202]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-[16px] text-gray-900 leading-tight mb-2">90+ Layanan, 1 Kode</h4>
                  <p className="text-[13px] text-gray-500 font-normal leading-relaxed">
                    Satu kode untuk seluruh layanan — pendirian PT, merek, NIB, ISO, KITAS, dll.
                  </p>
                </div>
              </div>

              {/* Card 4: Unlimited Income */}
              <div className="bg-white rounded-[20px] p-7 shadow-[0_0_0_1px_rgba(0,0,0,0.045),_0_4px_20px_rgba(0,0,0,0.025)] hover:shadow-[0_0_0_1px_rgba(153,2,2,0.07),_0_12px_35px_rgba(153,2,2,0.04)] transition-all duration-300 flex flex-col space-y-4 hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-[#990202]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-black text-[16px] text-gray-900 leading-tight mb-2">Unlimited Income</h4>
                  <p className="text-[13px] text-gray-500 font-normal leading-relaxed">
                    Tidak ada batas maksimum komisi — semakin banyak referral, semakin besar penghasilan.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. SIMULASI PENGHASILAN SECTION ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-10 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">SIMULASI PENGHASILAN</p>
            <h2 className="font-inter text-[36px] sm:text-[44px] font-black text-gray-900 leading-tight tracking-tight">
              Berapa potensi <span className="text-[#990202]">cuan per bulan?</span>
            </h2>
            <p className="text-[15px] text-gray-500 font-normal leading-relaxed max-w-lg mx-auto">
              Estimasi berdasarkan jumlah transaksi closing per bulan — pilih skenario sesuai gayamu.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-[#F4F3F1] rounded-full p-1 gap-1">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScenario(s.id)}
                  className={`px-5 py-2 rounded-full text-[13.5px] font-extrabold transition-all duration-200 cursor-pointer ${
                    selectedScenario === s.id
                      ? "bg-[#990202] text-white shadow-md"
                      : "bg-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>

          {/* ── Crimson Estimasi Card — standalone rectangle ── */}
          <div
            className="rounded-[20px] px-7 sm:px-8 py-7 sm:py-8"
            style={{ background: "linear-gradient(150deg, #7a0a0a 0%, #990202 45%, #6b0606 100%)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Left: estimasi number */}
              <div className="space-y-2">
                <p className="text-white/60 text-[10.5px] font-extrabold tracking-widest uppercase">ESTIMASI PENGHASILAN BULANAN</p>
                <p className="text-white font-black text-[36px] sm:text-[40px] leading-none tracking-tight">
                  Rp {formatRp(activeScenario.txPerMonth * activeScenario.avgComisi)}
                </p>
                <p className="text-white/55 text-[12.5px] italic font-normal">{activeScenario.desc}</p>
              </div>


              {/* Right: 3 stat pills in a row */}
              <div className="flex flex-row gap-3 shrink-0">
                <div className="rounded-xl px-5 py-3.5 text-center min-w-[85px]" style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
                  <div className="text-white font-black text-[22px] leading-tight">{activeScenario.txPerMonth}</div>
                  <div className="text-white/55 text-[10px] font-semibold mt-1">Transaksi/Bln</div>
                </div>
                <div className="rounded-xl px-5 py-3.5 text-center min-w-[95px]" style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
                  <div className="text-white font-black text-[22px] leading-tight">
                    Rp {activeScenario.avgComisi >= 1000000
                      ? (activeScenario.avgComisi / 1000000).toFixed(1) + "jt"
                      : (activeScenario.avgComisi / 1000) + "rb"}
                  </div>
                  <div className="text-white/55 text-[10px] font-semibold mt-1">Rata-rata Komisi</div>
                </div>
                <div className="rounded-xl px-5 py-3.5 text-center min-w-[85px]" style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
                  <div className="text-white font-black text-[22px] leading-tight">
                    Rp {(activeScenario.txPerMonth * activeScenario.avgComisi * 12) >= 1000000
                      ? Math.round((activeScenario.txPerMonth * activeScenario.avgComisi * 12) / 1000000) + " jt"
                      : formatRp(activeScenario.txPerMonth * activeScenario.avgComisi * 12)}
                  </div>
                  <div className="text-white/55 text-[10px] font-semibold mt-1">Potensi/Tahun</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Table — separate container below ── */}
          <div className="mt-4 rounded-[20px] overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.06),_0_8px_40px_rgba(0,0,0,0.05)]">
            {/* Table Header — dark strip */}
            <div className="grid grid-cols-4 bg-gray-900 px-6 py-3">
              <span className="text-gray-400 text-[10px] font-extrabold tracking-widest uppercase">SKENARIO</span>
              <span className="text-gray-400 text-[10px] font-extrabold tracking-widest uppercase">TRANSAKSI/BULAN</span>
              <span className="text-gray-400 text-[10px] font-extrabold tracking-widest uppercase">RATA-RATA KOMISI</span>
              <span className="text-gray-400 text-[10px] font-extrabold tracking-widest uppercase text-right">TOTAL/BULAN</span>
            </div>

            {/* Table Rows */}
            <div className="bg-white">
              {scenarios.map((s) => {
                const isActive = s.id === selectedScenario;
                const total = s.txPerMonth * s.avgComisi;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedScenario(s.id)}
                    className={`grid grid-cols-4 px-6 py-4 cursor-pointer transition-colors duration-150 border-t border-gray-100 ${
                      isActive ? "bg-[#FFF5F5]" : "hover:bg-gray-50/70"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-[14px] font-extrabold text-gray-900">{s.id}</span>
                    </div>
                    <span className="text-[13.5px] font-medium text-gray-500 self-center">{s.txPerMonth} transaksi</span>
                    <span className="text-[13.5px] font-medium text-gray-500 self-center">Rp {formatRp(s.avgComisi)}</span>
                    <span className="text-[14px] font-black text-right text-[#990202] self-center">Rp {formatRp(total)}</span>
                  </div>
                );
              })}

              {/* Legend + Disclaimer */}
              <div className="px-6 py-5 border-t border-gray-100 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
                  {scenarios.map((s) => (
                    <div key={s.id} className="flex items-center space-x-2 text-[12px] text-gray-500 font-medium">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="font-extrabold text-gray-800">{s.id}</span>
                      <span>= {s.desc.toLowerCase()}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-[11px] font-normal leading-relaxed italic">
                  *Rata-rata komisi dihitung dari mix layanan populer. Belum termasuk potensi cross-sell ketika klien menggunakan layanan tambahan dari ekosistem EasyLegal.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── 5.5. TOP 10 KOMISI TERTINGGI SECTION ─── */}
      <section className="py-20 bg-[#FCFBFA] border-t border-b border-gray-100/70">
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-10 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">TOP 10 KOMISI TERTINGGI</p>
            <h2 className="font-inter text-[36px] sm:text-[44px] font-black text-gray-900 leading-tight tracking-tight">
              Layanan dengan <span className="text-[#990202]">komisi terbesar.</span>
            </h2>
            <p className="text-[15px] text-gray-550 font-medium leading-relaxed max-w-lg mx-auto">
              Fokus referral di layanan ini untuk maksimalkan penghasilanmu.
            </p>
          </div>

          {/* Table Container */}
          <div className="rounded-[20px] overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.045),_0_8px_30px_rgba(0,0,0,0.03)] border border-gray-100">
            {/* Table Header */}
            <div className="grid grid-cols-[35px_1fr_120px] sm:grid-cols-[60px_1fr_200px] bg-[#111111] px-6 py-3.5 items-center">
              <span className="text-gray-400 text-[10px] font-extrabold tracking-widest uppercase text-center">#</span>
              <span className="text-gray-400 text-[10px] font-extrabold tracking-widest uppercase">LAYANAN</span>
              <span className="text-gray-400 text-[10px] font-extrabold tracking-widest uppercase text-right">KOMISI/TRANSAKSI</span>
            </div>

            {/* Table Rows */}
            <div className="bg-white">
              {topCommissions.map((item) => (
                <div
                  key={item.rank}
                  className="grid grid-cols-[35px_1fr_120px] sm:grid-cols-[60px_1fr_200px] px-6 py-[18px] border-t border-gray-100 hover:bg-gray-50/50 transition-colors duration-150 items-center"
                >
                  <span className="text-[#990202] font-black text-[14px] text-center">{item.rank}</span>
                  <span className="text-[13.5px] font-extrabold text-gray-900">{item.name}</span>
                  <span className="text-[14px] font-black text-[#990202] text-right">Rp {formatRp(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── 5.6. TESTIMONI PARTNER SECTION ─── */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">TESTIMONI PARTNER</p>
            <h2 className="font-inter text-[36px] sm:text-[44px] font-black text-gray-900 leading-tight tracking-tight">
              Cerita partner yang sudah cuan.
            </h2>
            <p className="text-[15px] text-gray-500 font-medium leading-relaxed max-w-lg mx-auto">
              Lebih dari 500 partner aktif di seluruh Indonesia. Berikut beberapa cerita mereka.
            </p>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Testimonial 1 */}
            <div className="relative bg-white border border-gray-200/80 rounded-[20px] p-6 sm:p-8 pt-10 sm:pt-12 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] transition-all duration-300">
              <div className="absolute -top-4 left-6 bg-white px-2 text-[#990202] text-[48px] font-serif leading-none select-none">
                “
              </div>
              <p className="text-[13.5px] sm:text-[14px] text-gray-600 font-medium leading-relaxed flex-grow">
                Saya agen properti di Bandung — banyak klien beli rumah perlu PT untuk investasi. Sejak gabung 6 bulan lalu, tambahan income rata-rata <strong className="font-extrabold text-gray-900">Rp 4 juta/bulan</strong> hanya dari rekomendasi. Komisi cair tepat waktu, gak perlu push hard sell.
              </p>
              <div>
                <div className="border-t border-dashed border-gray-200/80 my-5" />
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <span className="text-[#990202] text-[12.5px] font-black">RA</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-black text-gray-900 leading-tight">Rian Aditya</span>
                    <span className="text-[11.5px] text-gray-400 font-semibold mt-0.5">Agen Properti - Bandung</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="relative bg-white border border-gray-200/80 rounded-[20px] p-6 sm:p-8 pt-10 sm:pt-12 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] transition-all duration-300">
              <div className="absolute -top-4 left-6 bg-white px-2 text-[#990202] text-[48px] font-serif leading-none select-none">
                “
              </div>
              <p className="text-[13.5px] sm:text-[14px] text-gray-600 font-medium leading-relaxed flex-grow">
                Sebagai konsultan UMKM, saya sering ditanyai "gimana cara daftar PT?" — sebelumnya saya kasih info gratis. Sekarang dengan kode referral EasyLegal, klien tetap dapat diskon, saya dapat komisi. <strong className="font-extrabold text-gray-900">Pure win-win.</strong>
              </p>
              <div>
                <div className="border-t border-dashed border-gray-200/80 my-5" />
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <span className="text-[#990202] text-[12.5px] font-black">DS</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-black text-gray-900 leading-tight">Dina Sartika</span>
                    <span className="text-[11.5px] text-gray-400 font-semibold mt-0.5">Konsultan UMKM - Jakarta</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="relative bg-white border border-gray-200/80 rounded-[20px] p-6 sm:p-8 pt-10 sm:pt-12 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(0,0,0,0.04)] transition-all duration-300">
              <div className="absolute -top-4 left-6 bg-white px-2 text-[#990202] text-[48px] font-serif leading-none select-none">
                “
              </div>
              <p className="text-[13.5px] sm:text-[14px] text-gray-600 font-medium leading-relaxed flex-grow">
                Sebagai freelance content creator di niche bisnis, audience saya banyak yang butuh legalitas. Bulan terbaik kemarin saya hasilkan <strong className="font-extrabold text-gray-900">Rp 9,5 juta dari referral EasyLegal</strong>. Honestly, kode referral lainnya gak ada yang sebesar ini.
              </p>
              <div>
                <div className="border-t border-dashed border-gray-200/80 my-5" />
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <span className="text-[#990202] text-[12.5px] font-black">FH</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-black text-gray-900 leading-tight">Fariz Hadyan</span>
                    <span className="text-[11.5px] text-gray-400 font-semibold mt-0.5">Content Creator - Surabaya</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─── 6. FAQ SECTION ─── */}
      <section id="faq" className="py-24 bg-white scroll-mt-16 border-t border-gray-100/50">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em] font-sans">FAQ</p>
            <h2 className="font-inter text-[36px] sm:text-[44px] font-black text-gray-900 leading-tight tracking-tight">
              Pertanyaan tentang Program Referral.
            </h2>
            <p className="text-[15px] text-gray-550 font-medium leading-relaxed max-w-lg mx-auto">
              Belum yakin? Mungkin jawabannya ada di sini.
            </p>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-gray-150 border-t border-b border-gray-150">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className={`text-[15px] sm:text-[16px] font-extrabold transition-colors duration-200 ${isOpen ? "text-[#990202]" : "text-gray-900 group-hover:text-[#990202]"}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isOpen ? "bg-[#990202] text-white" : "bg-gray-100 text-gray-600 group-hover:bg-[#990202]/10"}`}>
                      {isOpen ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="text-[13.5px] sm:text-[14px] text-gray-550 font-medium leading-relaxed">
                      {idx === 0 ? (
                        <>
                          <strong className="text-gray-800 font-extrabold">Siapa saja boleh gabung!</strong> Tidak ada syarat khusus — usia min. 17 tahun, punya WhatsApp aktif &amp; rekening bank. Cocok untuk: freelancer, konsultan, agen properti, content creator, mahasiswa, ibu rumah tangga, karyawan yang cari side income, atau pelaku bisnis dengan jaringan luas. Tidak ada syarat minimum follower atau pengalaman sales.
                        </>
                      ) : (
                        faq.answer
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 7. CTA SECTION ─── */}
      <section id="cta" className="py-24 relative overflow-hidden bg-white border-t border-gray-100">
        {/* Soft radial glows in the background for a modern premium aesthetic */}
        {/* Background glow images on left and right */}
        <div className="absolute left-0 top-0 bottom-0 w-[45%] overflow-hidden pointer-events-none z-0 select-none">
          <img
            src="/cta-bg-glow.jpg"
            alt=""
            className="w-full h-full object-cover object-left opacity-90 mix-blend-multiply"
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-[45%] overflow-hidden pointer-events-none z-0 select-none">
          <img
            src="/cta-bg-glow.jpg"
            alt=""
            className="w-full h-full object-cover object-left scale-x-[-1] opacity-90 mix-blend-multiply"
          />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-inter text-[36px] sm:text-[48px] font-black text-gray-900 leading-tight tracking-tight mb-4">
            Siap mulai cuan dari rumah?
          </h2>
          <p className="text-[14.5px] sm:text-[15.5px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Gabung lebih dari 500 partner aktif di seluruh Indonesia — proses pendaftaran 5 menit, komisi cair otomatis.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20siap%20gabung%20Program%20Referral%20%26%20Reseller%20sekarang."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[14.5px] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 space-x-2.5 cursor-pointer"
            >
              {/* WhatsApp SVG Icon */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.76.46 3.42 1.34 4.96L2 22l5.22-1.37A9.91 9.91 0 0 0 12.004 22c5.52 0 10-4.48 10-10S17.524 2 12.004 2zm5.73 14.1c-.24.68-1.42 1.25-1.95 1.32-.48.06-1.1.11-3.1-.71-2.56-1.07-4.22-3.69-4.35-3.86-.13-.17-.96-1.28-.96-2.43 0-1.16.61-1.73.83-1.97.22-.24.47-.3.63-.3.16 0 .32 0 .46.01.14 0 .33-.05.52.4.19.47.65 1.59.7 1.7.06.12.1.25.02.4-.08.16-.12.25-.23.38-.11.13-.24.3-.34.4-.11.12-.23.24-.1.47.13.23.6 1 1.29 1.62.88.79 1.63 1.03 1.86 1.15.23.12.37.1.5-.05.13-.15.57-.67.73-.99.15-.31.3-.26.5-.18.2.08 1.27.6 1.48.7.22.11.36.16.41.25.06.09.06.52-.18 1.2z" />
              </svg>
              <span>Daftar Gratis Sekarang</span>
            </a>
            <a
              href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20bertanya%20mengenai%20kemitraan%20referral."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 border border-gray-200 text-gray-850 font-extrabold text-[14.5px] rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Tanya Tim Kami
            </a>
          </div>

          {/* Checklist items */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-gray-500 font-semibold">
            <span className="flex items-center">
              <span className="text-[#990202] mr-1">✓</span> Gratis pendaftaran
            </span>
            <span className="flex items-center">
              <span className="text-[#990202] mr-1">✓</span> Tanpa minimum transaksi
            </span>
            <span className="flex items-center">
              <span className="text-[#990202] mr-1">✓</span> Transfer komisi 3 hari kerja
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
