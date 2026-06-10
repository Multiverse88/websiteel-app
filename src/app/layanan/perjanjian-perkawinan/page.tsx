"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  ChevronDown,
  BookOpen,
  Award,
  Calendar,
  Shield,
  Layers,
  Heart,
  Menu
} from "lucide-react";

export default function PerjanjianPerkawinan() {
  // State for FAQ expanded accordions (default: index 0 expanded)
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setExpandedFaqIdx((prev) => (prev === idx ? null : idx));
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
      title: "Konsultasi & Pengisian Kuesioner",
      duration: "1 HARI",
      desc: "Diskusi gratis dengan tim hukum kami untuk mengidentifikasi kebutuhan spesifik Anda dan pasangan, seperti pemisahan aset, utang, atau pengelolaan nafkah.",
      points: [
        "Identifikasi aset, utang & kewajiban",
        "Formulir kuesioner data pribadi",
        "Penentuan jenis (Pra-Nikah / Pasca-Nikah)",
      ],
    },
    {
      no: "02",
      title: "Penyusunan Draf Perjanjian",
      duration: "2-3 HARI",
      desc: "Draf perjanjian disusun secara detail oleh <strong>Spesialis Hukum Perdata Keluarga</strong> EasyLegal. Gratis draf Bilingual (dwibahasa) bagi Kawin Campur.",
      points: [
        "Penyusunan pasal pemisahan harta secara rinci",
        "Penentuan pengelolaan nafkah & pembagian utang",
        "Draf dwibahasa (Indonesian & English) gratis",
      ],
    },
    {
      no: "03",
      title: "Review & Revisi Tanpa Batas",
      duration: "1-2 HARI",
      desc: "Kami menjelaskan detail isi pasal demi pasal kepada Anda dan pasangan. Bebas melakukan revisi klausul sampai kedua belah pihak 100% sepakat.",
      points: [
        "Penjelasan detail konsekuensi hukum tiap pasal",
        "Revisi draf tanpa batas hingga sepakat",
        "Persetujuan draf final (Final Draft Approval)",
      ],
    },
    {
      no: "04",
      title: "Tanda Tangan Akta di Hadapan Notaris",
      duration: "1 HARI",
      desc: "Kedua belah pihak <strong>wajib hadir fisik</strong> di hadapan Notaris partner resmi kami untuk menandatangani <strong>Akta Otentik</strong> perjanjian perkawinan.",
      points: [
        "Penentuan lokasi & jadwal notaris terdekat",
        "Tanda tangan basah Akta Otentik resmi",
        "Pencocokan dokumen identitas & sidik jari",
      ],
    },
    {
      no: "05",
      title: "Penerbitan Salinan Akta Resmi",
      duration: "2-3 HARI",
      desc: "Notaris partner menerbitkan Salinan Akta resmi dengan stempel basah. Dokumen ini menjadi dasar legalitas kuat untuk dilaporkan ke instansi terkait.",
      points: [
        "Pembuatan Minuta Akta (dokumen asli notaris)",
        "Penerbitan Salinan Akta resmi bertanda tangan",
        "Dokumen siap digunakan untuk pelaporan",
      ],
    },
    {
      no: "06",
      title: "Registrasi KUA / Dukcapil",
      duration: "5-10 HARI",
      desc: "Pelaporan resmi ke KUA (Muslim) atau Dukcapil (Non-Muslim). <strong>Tanpa registrasi, perjanjian tidak mengikat pihak ketiga</strong> (seperti bank/kreditor).",
      points: [
        "Pengurusan pelaporan resmi oleh tim legal kami",
        "Penerbitan Surat Bukti Pencatatan resmi",
        "Pencatatan catatan pinggir pada Akta/Buku Nikah",
      ],
    },
    {
      no: "07",
      title: "Penyerahan Dokumen & Perjanjian Aktif",
      duration: "1 HARI",
      desc: "Penyerahan seluruh dokumen legal fisik ke alamat Anda dalam map kulit premium pelindung. <strong>Perjanjian aktif & berlaku penuh</strong> melindungi Anda.",
      points: [
        "Pengemasan dengan map eksklusif pelindung",
        "Pengiriman gratis bergaransi ke seluruh Indonesia",
        "Perjanjian aktif & berlaku penuh secara hukum",
      ],
    },
  ];

  const faqItems = [
    {
      q: "Apa beda Prenup dengan Postnup?",
      a: "<strong>Prenup (Prenuptial Agreement)</strong> dibuat <strong>sebelum menikah</strong> & berlaku sejak hari pernikahan. <strong>Postnup (Postnuptial Agreement)</strong> dibuat <strong>setelah menikah</strong> berdasarkan putusan Mahkamah Konstitusi No. 69/PUU-XIII/2015 yang mengakui keabsahannya. Keduanya sama sah secara hukum — bedanya cuma <strong>timing pembuatan</strong>."
    },
    {
      q: "Apa yang bisa diatur dalam perjanjian pisah harta?",
      a: "Perjanjian ini dapat mengatur <strong>pemisahan aset pribadi</strong> (bawaan maupun yang diperoleh selama pernikahan), pembagian tanggung jawab terhadap <strong>utang bisnis/pribadi</strong>, kontribusi nafkah rumah tangga, kepemilikan properti, hingga pengelolaan waris/hibah keluarga agar tidak bercampur."
    },
    {
      q: "Apakah semua pasangan perlu perjanjian pisah harta?",
      a: "Tidak semua, namun sangat direkomendasikan jika Anda: (1) Menikah dengan WNA (Kawin Campur) agar WNI tetap bisa membeli properti Hak Milik, (2) Memiliki atau berencana mendirikan bisnis/usaha sendiri, (3) Memiliki utang/kewajiban finansial yang besar, atau (4) Membawa aset bawaan bernilai tinggi."
    },
    {
      q: "Kalau WNI menikah dengan WNA, apa pengaruhnya?",
      a: "Tanpa perjanjian pisah harta, seluruh properti yang dibeli setelah menikah otomatis dianggap milik bersama (WNA ikut memiliki). Karena hukum Indonesia melarang WNA memiliki properti Hak Milik (SHM), maka pasangan WNI otomatis kehilangan hak membeli properti SHM. Dengan <strong>perjanjian pemisahan harta</strong>, hak WNI tetap terlindungi penuh untuk membeli properti SHM atas namanya sendiri."
    },
    {
      q: "Apakah perjanjian bisa diubah setelah dibuat?",
      a: "Ya, perjanjian perkawinan (baik prenup maupun postnup) <strong>dapat diubah atau dicabut</strong> di kemudian hari. Perubahan harus didasarkan pada kesepakatan sukarela dari suami dan istri, dituangkan kembali ke dalam akta notaris resmi, dan didaftarkan ulang ke instansi terkait."
    },
    {
      q: "Apa beda registrasi di KUA vs Dukcapil?",
      a: "Pelaporan disesuaikan dengan tempat pernikahan dicatatkan. Bagi pasangan Muslim yang menikah di bawah hukum Islam dan memegang Buku Nikah, registrasi dilakukan di <strong>Kantor Urusan Agama (KUA)</strong>. Sedangkan bagi pasangan Non-Muslim, registrasi dilakukan di <strong>Dinas Kependudukan dan Pencatatan Sipil (Dukcapil)</strong>."
    },
    {
      q: "Apakah notaris bisa di domisili kami atau harus di Bandung?",
      a: "Penandatanganan akta notaris <strong>bisa dilakukan di wilayah domisili Anda</strong>. Notaris partner resmi kami tersebar luas di seluruh Indonesia. Tim legal kami akan menjadwalkan tanda tangan di hadapan Notaris partner terdekat di kota Anda, sehingga Anda tidak perlu datang ke kantor pusat kami di Bandung."
    },
    {
      q: "Apakah harus didaftarkan ke KUA/Dukcapil juga?",
      a: "Ya, pendaftaran itu <strong>sangat wajib</strong>. Akta notaris saja hanya mengikat secara internal antara suami dan istri. Agar perjanjian tersebut diakui secara sah dan mengikat pihak ketiga (seperti bank, kreditor, atau BPN saat transaksi properti), akta tersebut harus didaftarkan resmi ke KUA atau Dukcapil."
    },
    {
      q: "Berapa lama prosesnya total?",
      a: "Proses lengkap biasanya memakan waktu <strong>7 hingga 14 hari kerja</strong>. Penyusunan draf awal selesai dalam 1-2 hari kerja. Penandatanganan akta notaris dilakukan dalam 1 hari kerja. Proses pendaftaran resmi ke KUA atau Dukcapil memakan waktu sekitar 5 hingga 10 hari kerja."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FCFBFA] text-gray-900 font-sans">

      {/* ─── 1. HERO SECTION ─── */}
      <section className="bg-white pt-8 lg:pt-12 pb-16 lg:pb-24 border-b border-gray-200/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6 text-left">

              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[12.5px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-gray-500 font-medium">Layanan</span>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[12.5px] font-bold text-gray-900">Perjanjian Perkawinan</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-4 rounded-full border border-red-100 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[12.5px] font-bold text-[#990202] tracking-wide">Hukum Perdata · Pernikahan</span>
              </div>

              {/* Headline */}
              <h1 className="font-inter text-[42px] sm:text-[50px] lg:text-[54px] font-extrabold text-gray-950 leading-[1.15] tracking-tight">
                Lindungi aset pribadi dengan <span className="text-[#990202]">Perjanjian Pisah Harta</span> resmi.
              </h1>

              {/* Description */}
              <p className="text-[15px] sm:text-[16px] text-gray-500 leading-relaxed max-w-2xl font-normal">
                Bantuan pembuatan akta perjanjian perkawinan (prenup &amp; postnup) sampai registrasi resmi di KUA atau Dukcapil. Aset pribadi &amp; bisnis Anda terlindungi secara hukum.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="#paket-harga"
                  onClick={scrollToPricing}
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[15px] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-center cursor-pointer"
                >
                  Lihat Paket Perjanjian
                </a>
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20ingin%20berkonsultasi%20mengenai%20layanan%20Perjanjian%20Perkawinan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-4 border border-gray-250 text-gray-800 font-extrabold text-[15px] rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm cursor-pointer"
                >
                  Konsultasi Gratis
                </a>
              </div>

              {/* Checkpoints Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-150 max-w-[620px]">
                {/* Checkpoint 1 */}
                <div className="flex items-center space-x-3 bg-[#FFF5F5] p-2.5 rounded-xl border border-red-50/50 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                    <Clock className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[13px] font-black text-gray-950">7–14 Hari</div>
                    <div className="text-[10px] text-gray-500 font-semibold">Proses lengkap</div>
                  </div>
                </div>

                {/* Checkpoint 2 */}
                <div className="flex items-center space-x-3 bg-[#FFF5F5] p-2.5 rounded-xl border border-red-50/50 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                    <FileText className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[13px] font-black text-gray-950">Akta Notaris</div>
                    <div className="text-[10px] text-gray-500 font-semibold">Resmi &amp; legal</div>
                  </div>
                </div>

                {/* Checkpoint 3 */}
                <div className="flex items-center space-x-3 bg-[#FFF5F5] p-2.5 rounded-xl border border-red-50/50 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-red-100">
                    <Check className="w-4 h-4 text-[#990202]" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[13px] font-black text-gray-950">KUA/Dukcapil</div>
                    <div className="text-[10px] text-gray-500 font-semibold">Terdaftar resmi</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-[460px] aspect-[1.05] sm:aspect-square lg:aspect-[1.05] rounded-[36px] bg-gradient-to-br from-[#1E1E1E] via-[#141414] to-[#7B080C] p-8 shadow-2xl overflow-hidden border border-gray-800 flex items-center justify-center">

                {/* Main White Document Mockup - Slightly rotated */}
                <div className="bg-[#FAF8F5] rounded-[12px] p-4.5 shadow-2xl relative w-[235px] h-[265px] border border-gray-300/40 text-left flex flex-col justify-between transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">

                  {/* Red Seal */}
                  <div className="absolute -top-3 -right-3 w-[56px] h-[56px] rounded-full bg-[#990202] border-2 border-dashed border-white/45 flex items-center justify-center text-center shadow-lg transform rotate-[12deg] z-10">
                    <span className="text-[6.5px] font-black text-white leading-tight uppercase p-1 tracking-wider">
                      AKTA NOTARIS RESMI
                    </span>
                  </div>

                  {/* Document Header */}
                  <div className="text-center space-y-0.5 border-b border-gray-300/80 pb-2">
                    <span className="text-[7px] font-black text-[#990202]/90 tracking-[0.2em] uppercase block">
                      AKTA PERJANJIAN
                    </span>
                    <h4 className="text-[9.5px] font-extrabold text-gray-900 leading-tight tracking-tight uppercase">
                      PERJANJIAN PERKAWINAN / PISAH HARTA
                    </h4>
                  </div>

                  {/* Document Lines */}
                  <div className="space-y-2 mt-3.5 flex-1">
                    <div className="h-1 bg-gray-200 rounded w-full" />
                    <div className="h-1 bg-gray-200 rounded w-[92%]" />
                    <div className="h-1 bg-gray-200 rounded w-[85%]" />
                    <div className="h-1 bg-gray-200 rounded w-[96%]" />
                    <div className="h-1 bg-gray-200 rounded w-[60%]" />
                  </div>

                  {/* Document Signatures */}
                  <div className="flex justify-between items-end pt-3 border-t border-gray-200/80">
                    <div className="text-center space-y-0.5">
                      <svg className="w-10 h-5 text-gray-500 mx-auto" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10,40 Q25,10 40,40 T70,20 T90,40" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[6.5px] font-black text-gray-400 block tracking-wider">
                        PIHAK I
                      </span>
                    </div>
                    <div className="text-center space-y-0.5">
                      <svg className="w-10 h-5 text-gray-500 mx-auto" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15,35 Q30,45 45,15 T75,35 T85,25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[6.5px] font-black text-gray-400 block tracking-wider">
                        PIHAK II
                      </span>
                    </div>
                  </div>

                </div>

                {/* Floating Badge 1: Top Right */}
                <div className="absolute top-8 right-4 bg-white rounded-xl py-2.5 px-3.5 shadow-xl border border-gray-100 flex items-center space-x-2.5 w-[200px] z-20">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-[#990202]" strokeWidth={2.5} />
                  </div>
                  <div className="text-left">
                    <div className="text-[11.5px] font-black text-gray-900 leading-none">Aset Terlindung</div>
                    <div className="text-[8.5px] text-gray-500 font-medium mt-1">Pisah harta secara hukum</div>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Left */}
                <div className="absolute bottom-8 left-4 bg-white rounded-xl py-2.5 px-3.5 shadow-xl border border-gray-100 flex items-center space-x-2.5 w-[220px] z-20">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-[#990202]" strokeWidth={3.5} />
                  </div>
                  <div className="text-left">
                    <div className="text-[11.5px] font-black text-gray-900 leading-none">Prenup &amp; Postnup</div>
                    <div className="text-[8.5px] text-gray-500 font-medium mt-1">Bisa sebelum atau setelah nikah</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. PENJELASAN SECTION ─── */}
      <section className="bg-white py-24 border-b border-gray-200/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">PENGERTIAN</p>
            <h2 className="font-inter text-[36px] sm:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Apa itu Perjanjian Perkawinan / Pisah Harta?
            </h2>
            <p className="text-[14.5px] text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
              Perjanjian resmi antara suami-istri untuk mengatur pemisahan harta &amp; tanggung jawab masing-masing — dilindungi hukum.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Column: YANG BISA DIATUR DALAM PERJANJIAN (Unified pink container) */}
            <div className="lg:col-span-5 bg-[#FFF5F5] rounded-[32px] p-6 sm:p-7.5 space-y-3.5 text-left border border-red-50/60 shadow-[0_10px_35px_rgba(153,2,2,0.02)]">
              <h3 className="text-[12px] sm:text-[13px] font-black text-[#990202] tracking-wider uppercase mb-5 pl-1.5 mt-1.5">
                YANG BISA DIATUR DALAM PERJANJIAN
              </h3>

              {/* Item 1 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-[#990202]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Pemisahan Harta Pribadi</h4>
                  <p className="text-[11.5px] text-gray-500 font-medium mt-0.5 leading-snug">Aset masing-masing tetap milik pribadi</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <span className="text-[18px] font-black text-[#990202]">$</span>
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Tanggung Jawab Utang</h4>
                  <p className="text-[11.5px] text-gray-500 font-medium mt-0.5 leading-snug">Utang pribadi tidak menjadi utang bersama</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#990202]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Aset Bisnis</h4>
                  <p className="text-[11.5px] text-gray-500 font-medium mt-0.5 leading-snug">Saham, PT, dan aset usaha tetap milik pribadi</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-[#990202]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Properti / Real Estate</h4>
                  <p className="text-[11.5px] text-gray-500 font-medium mt-0.5 leading-snug">Rumah, tanah, &amp; investasi properti</p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="bg-white rounded-2xl p-4 border border-[#FFF0F0] shadow-[0_4px_18px_rgba(153,2,2,0.025)] flex items-center space-x-4 hover:shadow-md transition-shadow duration-200">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF0F0] text-[#990202] flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-[#990202]" strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-gray-900 leading-tight">Hak Waris &amp; Hibah</h4>
                  <p className="text-[11.5px] text-gray-500 font-medium mt-0.5 leading-snug">Warisan keluarga tidak menjadi harta bersama</p>
                </div>
              </div>

              {/* Item 6: Dasar Hukum (Standout dark card) */}
              <div className="bg-[#151515] rounded-2xl p-4 border border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center space-x-4">
                <div className="w-[45px] h-[45px] rounded-2xl bg-[#990202] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" strokeWidth={3.5} />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-white leading-tight">Dasar Hukum</h4>
                  <p className="text-[11.5px] text-gray-400 font-medium mt-0.5 leading-snug">UU No. 1/1974 &amp; Pasal 119–138 KUHPerdata</p>
                </div>
              </div>
            </div>

            {/* Right Column: Explanations (3 Separate cards matching mockup text) */}
            <div className="lg:col-span-7 space-y-6 text-left">

              {/* Card 1: PERJANJIAN PERKAWINAN */}
              <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-md transition-shadow duration-300 space-y-4">
                <div className="flex items-center space-x-2.5 text-[#990202]">
                  <FileText className="w-5 h-5" strokeWidth={2.5} />
                  <h4 className="text-[12.5px] sm:text-[13px] font-black tracking-wider uppercase">PERJANJIAN PERKAWINAN</h4>
                </div>
                <p className="text-[13.5px] sm:text-[14px] text-gray-600 leading-relaxed font-normal">
                  Perjanjian Perkawinan adalah perjanjian tertulis antara calon/pasangan suami-istri yang <strong className="font-extrabold text-gray-900">mengatur pemisahan harta &amp; kewajiban</strong> selama perkawinan. Dibuat di hadapan notaris dalam bentuk <strong className="font-extrabold text-gray-900">Akta Otentik</strong>, kemudian didaftarkan di KUA (Muslim) atau Dukcapil (Non-Muslim).
                </p>
              </div>

              {/* Card 2: PRENUP & POSTNUP */}
              <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-md transition-shadow duration-300 space-y-4">
                <div className="flex items-center space-x-2.5 text-[#990202]">
                  <Layers className="w-5 h-5 rotate-90" strokeWidth={2.5} />
                  <h4 className="text-[12.5px] sm:text-[13px] font-black tracking-wider uppercase">PRENUP &amp; POSTNUP</h4>
                </div>
                <p className="text-[13.5px] sm:text-[14px] text-gray-600 leading-relaxed font-normal">
                  <strong className="font-extrabold text-gray-900">Prenuptial Agreement (Prenup):</strong> dibuat <strong className="font-extrabold text-gray-900">sebelum menikah</strong> &amp; berlaku sejak hari pernikahan. <strong className="font-extrabold text-gray-900">Postnuptial Agreement (Postnup):</strong> dibuat <strong className="font-extrabold text-gray-900">setelah menikah</strong> berdasarkan putusan MK No. 69/2015 &amp; berlaku sejak terdaftar. Keduanya sama-sama sah secara hukum.
                </p>
              </div>

              {/* Card 3: MANFAAT PERJANJIAN PISAH HARTA */}
              <div className="bg-white border border-gray-150 rounded-2xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-md transition-shadow duration-300 space-y-4">
                <div className="flex items-center space-x-2.5 text-[#990202]">
                  <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
                  <h4 className="text-[12.5px] sm:text-[13px] font-black tracking-wider uppercase">MANFAAT PERJANJIAN PISAH HARTA</h4>
                </div>
                <p className="text-[13.5px] sm:text-[14px] text-gray-600 leading-relaxed font-normal">
                  <strong className="font-extrabold text-gray-900">(1)</strong> Lindungi aset pribadi dari kewajiban pasangan, <strong className="font-extrabold text-gray-900">(2)</strong> WNI bisa beli properti dengan SHM meski menikah dengan WNA, <strong className="font-extrabold text-gray-900">(3)</strong> Aset bisnis aman dari risiko perceraian, <strong className="font-extrabold text-gray-900">(4)</strong> Lebih transparan soal keuangan pasangan, <strong className="font-extrabold text-gray-900">(5)</strong> Hindari sengketa harta di masa depan.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 2.5. DOKUMEN PERSYARATAN SECTION ─── */}
      <section className="bg-[#FAF9F7] py-24 border-b border-gray-200/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.2em]">DOKUMEN PERSYARATAN</p>
            <h2 className="font-inter text-[36px] sm:text-[44px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Yang perlu disiapkan.
            </h2>
            <p className="text-[14.5px] text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
              Dokumen yang dibutuhkan beda untuk pembuatan akta &amp; registrasi resmi. Tim kami pandu pengumpulan &amp; verifikasi.
            </p>
          </div>

          {/* Grid Layout of 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1140px] mx-auto items-stretch">

            {/* Left Card: Pembuatan Akta */}
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center space-x-4 pb-5 border-b border-gray-100">
                  <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-[#990202]" strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[16px] font-black text-gray-900 leading-tight">Pembuatan Akta Perjanjian</h4>
                    <p className="text-[12px] text-gray-500 font-medium mt-0.5 leading-snug">Untuk drafting di hadapan notaris</p>
                  </div>
                </div>

                {/* Requirements Checkpoints */}
                <ul className="space-y-4 pt-6 text-left">
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">KTP &amp; KK</strong> kedua pihak (suami &amp; istri)</span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">NPWP</strong> kedua pihak (jika ada)</span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">Buku Nikah / Akta Perkawinan</strong> (untuk postnup)</span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">Daftar aset &amp; utang</strong> masing-masing pihak</span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">Surat keterangan domisili</strong> kedua pihak</span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">Kehadiran kedua pihak</strong> saat penandatanganan</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Card: Registrasi */}
            <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-gray-150 shadow-sm flex flex-col justify-between">
              <div>
                {/* Card Header */}
                <div className="flex items-center space-x-4 pb-5 border-b border-gray-100">
                  <div className="w-[45px] h-[45px] rounded-2xl bg-[#FFF5F5] text-[#990202] flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-[#990202]" strokeWidth={2} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[16px] font-black text-gray-900 leading-tight">Registrasi KUA / Dukcapil</h4>
                    <p className="text-[12px] text-gray-500 font-medium mt-0.5 leading-snug">Agar perjanjian berkekuatan hukum penuh</p>
                  </div>
                </div>

                {/* Requirements Checkpoints */}
                <ul className="space-y-4 pt-6 text-left">
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">Akta Perjanjian</strong> dari notaris (asli + salinan)</span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">Buku Nikah / Akta Perkawinan</strong></span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">KTP &amp; KK</strong> kedua pihak (asli + fotokopi)</span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">Surat Permohonan</strong> ke KUA / Dukcapil</span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">Untuk Muslim</strong>: ke KUA tempat pernikahan tercatat</span>
                  </li>
                  <li className="flex items-start text-[13.5px] text-gray-650 font-normal leading-relaxed">
                    <Check className="w-4.5 h-4.5 text-[#990202] mr-3.5 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                    <span><strong className="font-extrabold text-gray-900">Untuk Non-Muslim</strong>: ke Dukcapil sesuai domisili</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 5. HARGA & PAKET SECTION ─── */}
      <section id="paket-harga" className="bg-white py-24 border-b border-gray-200/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-16 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.22em] font-sans">BIAYA PERJANJIAN PERKAWINAN</p>
            <h2 className="font-inter text-[34px] sm:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
              2 layanan — bisa pilih salah satu atau kombinasi.
            </h2>
            <p className="text-[14.5px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Pembuatan akta &amp; registrasi resmi bisa dipesan terpisah. Tim kami rekomendasikan keduanya untuk perlindungan hukum penuh.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[960px] mx-auto items-stretch">

            {/* Left Card: Pembuatan Perjanjian */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[28px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-[28px] overflow-hidden flex flex-col h-full justify-between border-[2.5px] border-[#990202] shadow-[0_20px_50px_rgba(0,0,0,0.045)] group-hover:shadow-[0_20px_50px_rgba(153,2,2,0.12)] transition-all duration-300">
                <div>
                  {/* Header Container (Crimson) */}
                  <div className="bg-[#990202] px-6 py-9 text-center text-white relative flex flex-col items-center">
                    {/* Paling Populer Badge */}
                    <div className="bg-[#800000] text-white text-[9.5px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-3.5 shadow-sm border border-red-500/20">
                      Paling Populer
                    </div>
                    <h4 className="text-[14px] font-black tracking-widest uppercase">
                      PEMBUATAN PERJANJIAN
                    </h4>
                    <div className="mt-3 text-[13px] text-white/50 line-through font-bold">
                      Rp 8.000.000
                    </div>
                    <div className="mt-0.5 text-[34px] sm:text-[38px] font-black tracking-tight flex items-start justify-center text-white">
                      <span className="text-[18px] mt-1.5 font-extrabold mr-1">Rp</span>
                      <span>3.999.000</span>
                    </div>
                    <p className="text-[9.5px] font-black text-white/70 tracking-widest uppercase mt-2.5">
                      TANPA TAMBAHAN BIAYA APAPUN
                    </p>
                  </div>

                  {/* Features Detail */}
                  <div className="p-6 sm:p-8 space-y-6 text-left">
                    {/* Lama Proses */}
                    <div className="space-y-2">
                      <h5 className="text-[11.5px] font-extrabold text-[#990202] tracking-wider uppercase">
                        LAMA PROSES(1)
                      </h5>
                      <div className="flex items-center text-[14px] font-black text-gray-900">
                        <Check className="w-5 h-5 text-emerald-600 mr-2.5 flex-shrink-0" strokeWidth={3.5} />
                        <span>7–14 hari kerja</span>
                      </div>
                    </div>

                    {/* Yang Diperoleh */}
                    <div className="space-y-3.5 border-t border-gray-100 pt-5">
                      <h5 className="text-[11.5px] font-extrabold text-[#990202] tracking-wider uppercase mb-3">
                        YANG DIPEROLEH
                      </h5>
                      <div className="flex items-start text-[13.5px] text-gray-700 leading-relaxed font-semibold">
                        <Check className="w-5 h-5 text-emerald-600 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span>Konsultasi Pisah Harta dengan ahli hukum keluarga</span>
                      </div>
                      <div className="flex items-start text-[13.5px] text-gray-700 leading-relaxed font-semibold">
                        <Check className="w-5 h-5 text-emerald-600 mr-2.5 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span>Akta Perjanjian Pisah Harta di hadapan notaris</span>
                      </div>
                    </div>

                    {/* Bonus Block */}
                    <div className="bg-[#F7F7F7] rounded-2xl p-4.5 space-y-3 border border-gray-150/50">
                      <h5 className="text-[11px] font-extrabold text-[#990202] tracking-wider uppercase mb-1">
                        BONUS
                      </h5>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Layanan Personal Legal Assistance</span>
                      </div>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>1 Kupon Undian iPhone</span>
                      </div>
                    </div>

                    {/* Extra Bonus Block */}
                    <div className="bg-[#F7F7F7] rounded-2xl p-4.5 space-y-3 border border-gray-150/50">
                      <h5 className="text-[11px] font-extrabold text-[#990202] tracking-wider uppercase mb-1">
                        EXTRA BONUS
                      </h5>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Voucher EasyLegal Rp 250.000</span>
                      </div>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Dokumen SOP Karyawan</span>
                      </div>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Dokumen SOP Perusahaan</span>
                      </div>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Dokumen Kontrak Bisnis</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Order Button */}
                <div className="p-6 sm:p-8 pt-0">
                  <a
                    href={`https://wa.me/6281123456789?text=${encodeURIComponent("Halo EasyLegal, saya tertarik dengan Layanan Pembuatan Perjanjian Perkawinan seharga Rp 3.999.000.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 text-center font-black text-[14px] rounded-xl text-white bg-[#990202] hover:bg-[#800000] hover:scale-[1.01] transition-all duration-200 cursor-pointer shadow-md shadow-red-900/10"
                  >
                    Pilih Pembuatan Perjanjian
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card: Registrasi KUA / Dukcapil */}
            <div className="relative group h-full">
              {/* Interactive Red Hover Glow behind Card */}
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/[0.12] rounded-[28px] blur-[28px] transition-all duration-500 -z-10 pointer-events-none scale-[0.97] group-hover:scale-[1.04]" />
              
              <div className="bg-white rounded-[28px] overflow-hidden flex flex-col h-full justify-between border border-gray-200 shadow-[0_4px_25px_rgba(0,0,0,0.01)] group-hover:shadow-[0_12px_40px_rgba(153,2,2,0.05)] transition-all duration-300">
                <div>
                  {/* Header Container (Black) */}
                  <div className="bg-[#151515] px-6 py-9 text-center text-white relative flex flex-col items-center justify-center min-h-[174px]">
                    <h4 className="text-[14px] font-black tracking-widest uppercase">
                      REGISTRASI KUA / DUKCAPIL
                    </h4>
                    <div className="mt-3 text-[13px] text-white/40 line-through font-bold">
                      Rp 4.000.000
                    </div>
                    <div className="mt-0.5 text-[34px] sm:text-[38px] font-black tracking-tight flex items-start justify-center text-white">
                      <span className="text-[18px] mt-1.5 font-extrabold mr-1">Rp</span>
                      <span>1.999.000</span>
                    </div>
                    <p className="text-[9.5px] font-black text-white/60 tracking-widest uppercase mt-2.5">
                      TANPA TAMBAHAN BIAYA APAPUN
                    </p>
                  </div>

                  {/* Features Detail */}
                  <div className="p-6 sm:p-8 space-y-6 text-left">
                    {/* Lama Proses */}
                    <div className="space-y-2">
                      <h5 className="text-[11.5px] font-extrabold text-[#990202] tracking-wider uppercase">
                        LAMA PROSES(2)
                      </h5>
                      <div className="flex items-center text-[14px] font-black text-gray-900">
                        <Check className="w-5 h-5 text-emerald-600 mr-2.5 flex-shrink-0" strokeWidth={3.5} />
                        <span>7–14 hari kerja</span>
                      </div>
                    </div>

                    {/* Yang Diperoleh */}
                    <div className="space-y-3.5 border-t border-gray-100 pt-5">
                      <h5 className="text-[11.5px] font-extrabold text-[#990202] tracking-wider uppercase mb-3">
                        YANG DIPEROLEH
                      </h5>
                      <div className="flex items-start gap-2.5 text-[13.5px] text-gray-700 leading-relaxed font-semibold">
                        <Check className="w-5 h-5 text-emerald-600 mr-0.5 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <div className="flex-1 grid grid-cols-12 gap-x-1">
                          <span className="col-span-12 sm:col-span-6 font-semibold text-gray-700">Registrasi Perjanjian Pisah Harta di</span>
                          <span className="col-span-6 sm:col-span-3 font-bold text-gray-900">KUA Kota Bandung</span>
                          <span className="col-span-6 sm:col-span-3 text-gray-500 font-medium text-right sm:text-left sm:pl-1">(untuk Muslim)</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 text-[13.5px] text-gray-700 leading-relaxed font-semibold">
                        <Check className="w-5 h-5 text-emerald-600 mr-0.5 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <div className="flex-1 grid grid-cols-12 gap-x-1">
                          <span className="col-span-12 sm:col-span-6 font-semibold text-gray-700">Registrasi Perjanjian Pisah Harta di</span>
                          <span className="col-span-6 sm:col-span-3 font-bold text-gray-900">Dukcapil Kota Bandung</span>
                          <span className="col-span-6 sm:col-span-3 text-gray-500 font-medium text-right sm:text-left sm:pl-1">(untuk Non-Muslim)</span>
                        </div>
                      </div>
                    </div>

                    {/* Bonus Block */}
                    <div className="bg-[#F7F7F7] rounded-2xl p-4.5 space-y-3 border border-gray-150/50">
                      <h5 className="text-[11px] font-extrabold text-[#990202] tracking-wider uppercase mb-1">
                        BONUS
                      </h5>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Layanan Personal Legal Assistance</span>
                      </div>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>1 Kupon Undian iPhone</span>
                      </div>
                    </div>

                    {/* Extra Bonus Block */}
                    <div className="bg-[#F7F7F7] rounded-2xl p-4.5 space-y-3 border border-gray-150/50">
                      <h5 className="text-[11px] font-extrabold text-[#990202] tracking-wider uppercase mb-1">
                        EXTRA BONUS
                      </h5>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Voucher EasyLegal Rp 250.000</span>
                      </div>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Dokumen SOP Karyawan</span>
                      </div>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Dokumen SOP Perusahaan</span>
                      </div>
                      <div className="flex items-start text-[12.5px] text-gray-700 font-semibold leading-relaxed">
                        <Check className="w-4.5 h-4.5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5" strokeWidth={3.5} />
                        <span>Dokumen Kontrak Bisnis</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Order Button */}
                <div className="p-6 sm:p-8 pt-0">
                  <a
                    href={`https://wa.me/6281123456789?text=${encodeURIComponent("Halo EasyLegal, saya tertarik dengan Layanan Registrasi KUA / Dukcapil Perjanjian Perkawinan seharga Rp 1.999.000.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 text-center font-black text-[14px] rounded-xl text-gray-800 bg-white hover:bg-gray-50 border border-gray-250 hover:border-gray-400 transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    Pilih Registrasi KUA / Dukcapil
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 6. ALUR PROSES SECTION ─── */}
      <section className="bg-[#FAF9F7] py-24 border-b border-gray-200/50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Section Header */}
          <div className="max-w-3xl mx-auto mb-20 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-[0.22em] font-sans">SKEMA PEMBUATAN</p>
            <h2 className="font-inter text-[34px] sm:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Alur kerja dari konsultasi sampai registrasi.
            </h2>
            <p className="text-[14.5px] text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Tim notaris &amp; legal kami pegang seluruh tahapan — Anda cukup datang sekali untuk tanda tangan.
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
                  <div className="absolute top-0 left-6 w-10 h-10 rounded-full border-2 border-[#990202] text-[#990202] bg-white flex items-center justify-center font-black text-[14.5px] z-20 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {step.no}
                  </div>
                  
                  {/* Card Container */}
                  <div className="bg-white border border-gray-150 rounded-[24px] py-6 px-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow duration-350 flex flex-col justify-between flex-grow text-left h-full relative">
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

      {/* ─── 7. FAQ SECTION ─── */}
      <section className="bg-white py-24 border-b border-gray-200/50">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 text-center">

          {/* Section Header */}
          <div className="mb-16 space-y-4">
            <p className="text-[11.5px] font-black text-[#990202] uppercase tracking-[0.22em]">FAQ</p>
            <h2 className="font-inter text-[36px] sm:text-[40px] font-extrabold text-gray-900 leading-tight tracking-tight">
              Pertanyaan seputar Perjanjian Perkawinan.
            </h2>
            <p className="text-[14.5px] text-gray-500 font-bold leading-relaxed max-w-2xl mx-auto">
              Belum yakin? Mungkin jawabannya ada di sini.
            </p>
          </div>

          {/* Custom Accordion FAQ List */}
          <div className="border-t border-b border-gray-150 divide-y divide-gray-150 max-w-[860px] mx-auto">
            {faqItems.map((faq, idx) => {
              const isExpanded = expandedFaqIdx === idx;
              return (
                <div key={idx} className="py-6 text-left transition-all duration-300">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center text-left focus:outline-none group cursor-pointer"
                  >
                    <span className={`text-[15px] sm:text-[16px] font-black leading-snug transition-colors duration-200 pr-6 ${isExpanded ? "text-[#990202]" : "text-gray-900 group-hover:text-[#990202]"
                      }`}>
                      {faq.q}
                    </span>

                    {/* Circle icon container */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isExpanded
                        ? "bg-[#990202] text-white shadow-sm"
                        : "bg-[#F5F5F5] text-gray-700 hover:bg-gray-200"
                      }`}>
                      {isExpanded ? (
                        <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[500px] mt-4.5 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <p
                      className="text-[13.5px] sm:text-[14px] text-gray-500 leading-relaxed font-semibold pr-10 pt-1 pb-1"
                      dangerouslySetInnerHTML={{ __html: faq.a }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── 8. CTA SECTION ─── */}
      <section className="bg-white py-20 border-t border-gray-150/60">
        <div className="max-w-[1140px] mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-12 text-left">

          {/* Left Column */}
          <div className="space-y-3.5 max-w-2xl">
            <h2 className="font-inter text-[34px] sm:text-[40px] font-extrabold leading-tight tracking-tight text-[#141414]">
              Siap lindungi <span className="text-[#990202]">aset pribadi?</span>
            </h2>
            <p className="text-[15px] sm:text-[15.5px] text-[#5E5E5E] leading-relaxed font-normal">
              Konsultasi gratis dengan tim hukum keluarga — pilih paket yang sesuai &amp; mulai proses tanpa komitmen.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-auto flex flex-col gap-3.5 min-w-[320px] sm:min-w-[360px] max-w-[400px]">
            {/* WhatsApp Action */}
            <a
              href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Perjanjian%20Perkawinan."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2.5 px-6 py-4 bg-[#990202] hover:bg-[#800000] text-white font-extrabold text-[14.5px] rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-red-950/5"
            >
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.122.953 11.5.953c-5.439 0-9.859 4.37-9.864 9.8-.001 1.73.457 3.41 1.32 4.927l-.982 3.58 3.673-.956zm11.517-5.595c-.3-.15-1.774-.875-2.048-.975-.274-.1-.474-.15-.674.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.625-.924-2.225-.244-.588-.491-.508-.674-.518-.174-.01-.374-.012-.574-.012-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.116 4.52 1.228.531 2.186.848 2.93 1.083.755.238 1.44.205 1.984.124.606-.091 1.774-.725 2.024-1.425.25-.7.25-1.299.175-1.425-.076-.125-.275-.2-.575-.35z" />
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>

            {/* Hubungi Tim Kami Action */}
            <a
              href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20menghubungi%20tim%20spesialis%20hukum%20perjanjian."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-gray-55 text-gray-900 border border-gray-200 hover:border-gray-300 font-extrabold text-[14.5px] rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
            >
              <span>Hubungi Tim Kami</span>
              <span className="text-[15px] font-bold">→</span>
            </a>

            {/* Response Info */}
            <div className="flex items-center justify-center gap-1.5 text-[12px] sm:text-[12.5px] text-[#5E5E5E] font-medium pt-1 px-1">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Konsultasi rahasia · Senin–Sabtu 08:00–20:00</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
