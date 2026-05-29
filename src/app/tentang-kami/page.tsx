import React from "react";
import Link from "next/link";
import CTA from "@/components/CTA";
import Offices from "@/components/Offices";
import {
  ShieldCheck,
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Map,
  Check,
  Star,
  DollarSign,
  Zap,
  Users,
  Lock,
  Globe,
  Heart,
  Home,
  ArrowRight,
  User,
  Calendar,
  Mail,
} from "lucide-react";

// LinkedIn inline icon (not in lucide-react)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function TentangKami() {
  const stats = [
    { value: "11.000+", label: "Bisnis terlayani" },
    { value: "15+", label: "Jenis layanan legal" },
    { value: "5 thn", label: "Pengalaman melayani" },
    { value: "3 kota", label: "Office presence" },
  ];

  const values = [
    {
      title: "Transparan",
      desc: "Harga jelas di awal, tanpa biaya tersembunyi. Anda tahu pasti yang Anda bayar.",
      Icon: DollarSign,
    },
    {
      title: "Cepat",
      desc: "SLA jelas 7–14 hari kerja. Proses paperless dengan tracking real-time.",
      Icon: Zap,
    },
    {
      title: "Profesional",
      desc: "Ditangani konsultan hukum bersertifikat dengan pengalaman ribuan kasus.",
      Icon: Users,
    },
    {
      title: "Aman",
      desc: "Terdaftar PSE Kominfo. Data terenkripsi end-to-end di setiap proses.",
      Icon: Lock,
    },
    {
      title: "Lokal",
      desc: "Buatan Indonesia, memahami regulasi lokal & kebutuhan UMKM nusantara.",
      Icon: Globe,
    },
    {
      title: "Customer-first",
      desc: "CS responsif via WhatsApp 24/7 — respons rata-rata kurang dari 5 menit.",
      Icon: Heart,
    },
  ];

  const team = [
    { name: "Andi Saputra", role: "Founder & CEO", bio: "Memimpin visi & strategi EasyLegal. 12+ tahun di legal tech.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=600&h=600&q=80" },
    { name: "Maya Kusumawati", role: "Head of Legal", bio: "Lawyer senior, spesialis hukum perusahaan & investasi.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=600&h=600&q=80" },
    { name: "Reza Pratama", role: "Operations Lead", bio: "Memastikan setiap pengurusan beres tepat waktu & sesuai SLA.", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?fit=crop&w=600&h=600&q=80" },
    { name: "Dewi Lestari", role: "Customer Success", bio: "Memandu pengusaha dari konsultasi awal sampai dokumen di tangan.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=600&h=600&q=80" },
    { name: "Budi Hartono", role: "Senior Lawyer", bio: "Spesialis HAKI, merek dagang & perlindungan brand internasional.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=600&h=600&q=80" },
    { name: "Siti Wahyuni", role: "Compliance Lead", bio: "Memastikan setiap proses sesuai regulasi & standar ISO.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=600&h=600&q=80" },
    { name: "Bayu Setiawan", role: "Tech Lead", bio: "Membangun platform agar proses legal jadi semudah belanja online.", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fit=crop&w=600&h=600&q=80" },
    { name: "Linda Hartono", role: "Marketing Lead", bio: "Menyampaikan misi EasyLegal ke seluruh UMKM Indonesia.", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=600&h=600&q=80" },
  ];



  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── 1. HERO / HEADER ─── */}
      <section className="bg-white pt-8 lg:pt-12 pb-16 lg:pb-24 border-b border-border/40 overflow-hidden relative">
        {/* Subtle top-left radial glow for premium aesthetics */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[13px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[13px] font-bold text-gray-900">Tentang Kami</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1.5 px-3.5 rounded-full border border-red-100 shadow-sm animate-pulse-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[12.5px] font-bold text-[#990202] tracking-wide">Tentang Kami</span>
              </div>

              {/* Headline */}
              <h1 className="font-inter text-[44px] sm:text-[52px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.12] tracking-tight">
                Memudahkan legalitas untuk{" "}
                <span className="relative inline-block text-[#990202] px-2 py-0.5 bg-red-500/5 rounded-lg border border-red-100/40">
                  setiap pengusaha
                </span>{" "}
                Indonesia.
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[18px] text-gray-600 leading-relaxed max-w-2xl font-normal">
                EasyLegal hadir karena kami percaya legalitas bisnis tidak harus mahal, lama, atau ribet. Sejak 2020, kami sudah membantu lebih dari 11.000 UMKM mengurus PT, perizinan, sampai sertifikasi ISO.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Link
                  href="/kontak"
                  className="inline-flex items-center justify-center px-7 py-4 bg-[#990202] text-white font-bold text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
                >
                  <span>Konsultasi Gratis</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/"
                  className="px-7 py-4 border border-gray-200 text-gray-800 font-bold text-[15px] rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm"
                >
                  Lihat Layanan
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Corporate Image + Badges */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">
                
                {/* Main Corporate Image Container */}
                <div className="relative overflow-hidden rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                  <img
                    src="/hero-tentang-kami.png"
                    alt="Tim EasyLegal membantu UMKM pengurusan legalitas"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  
                  {/* Decorative Subtle Orange Logo at Top-Right */}
                  <div className="absolute top-5 right-5 bg-black/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
                    <svg width="24" height="20" viewBox="0 0 24 20" fill="none" className="text-amber-500 w-6 h-6">
                      <path d="M4 4L10 10L4 16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 4L14 10L20 16" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Floating Badge 1: 11.000+ Bisnis Terlayani */}
                <div className="absolute -top-6 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center space-x-3.5 w-[210px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <User className="w-5.5 h-5.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[20px] font-black text-[#990202] leading-none">11.000+</div>
                    <div className="text-[12px] text-[#990202]/85 font-bold mt-1">Bisnis terlayani</div>
                  </div>
                </div>

                {/* Floating Badge 2: 4.9/5 Rating Google */}
                <div className="absolute -bottom-6 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center space-x-3.5 w-[190px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-[#D62828] flex-shrink-0">
                    <Star className="w-5.5 h-5.5 fill-[#D62828] text-[#D62828]" />
                  </div>
                  <div>
                    <div className="text-[20px] font-black text-[#990202] leading-none">4.9 / 5</div>
                    <div className="text-[12px] text-[#990202]/85 font-bold mt-1">Rating Google</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. CERITA KAMI ─── */}
      <section className="bg-bg-light py-20 border-b border-border/40 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Team Image + Floating Badge */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mb-12 lg:mb-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">
                
                {/* Main Team Image Container */}
                <div className="relative overflow-hidden rounded-[32px] border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white group aspect-[4/3] sm:aspect-[1.4] lg:aspect-[4/3]">
                  <img
                    src="/cerita-kami-team.png"
                    alt="Tim EasyLegal bekerja bersama membantu perizinan UMKM"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge: Berdiri 2020 */}
                <div className="absolute -bottom-6 left-2 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center space-x-3.5 w-[210px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-11 h-11 rounded-xl bg-[#990202] flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_12px_rgba(153,2,2,0.2)]">
                    <Calendar className="w-5.5 h-5.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[15px] font-black text-gray-900 leading-none">Berdiri 2020</div>
                    <div className="text-[12px] text-gray-500 font-bold mt-1.5">5 tahun melayani UMKM</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-wider">Cerita Kami</p>
              
              <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
                Lahir dari pengalaman{" "}
                <span className="text-[#990202]">
                  mengurus PT sendiri.
                </span>
              </h2>
              
              <p className="text-[15.5px] text-gray-600 leading-relaxed font-normal">
                Founder kami pernah mengalaminya — bolak-balik ke notaris, antri panjang di kantor pemerintah, dan kebingungan dengan biaya yang tidak transparan. Kami pikir, kalau kami yang punya akses dan jaringan saja kesulitan, bagaimana dengan pelaku UMKM lain?
              </p>
              
              <p className="text-[15.5px] text-gray-600 leading-relaxed font-normal">
                Dari sanalah <strong className="font-extrabold text-gray-900">EasyLegal.id</strong> dibangun: sebuah platform yang memudahkan akses legalitas untuk semua pengusaha Indonesia. Mulai dari pendirian PT, NIB, pendaftaran merek, hingga sertifikasi ISO — semua bisa diurus online dengan harga yang transparan.
              </p>

              {/* Trust points list */}
              <div className="space-y-4 pt-4 border-t border-gray-200/60">
                {[
                  { bold: "Terdaftar PSE Kominfo", text: " — data Anda aman & terenkripsi sesuai regulasi." },
                  { bold: "Tim 30+ konsultan hukum", text: " dari berbagai latar industri." },
                  { bold: "Bermitra resmi", text: " dengan KEMENKUMHAM, BKPM, DJKI, dan PSE Kominfo." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-[14.5px] text-gray-600">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                    <span>
                      <strong className="font-extrabold text-gray-950">{item.bold}</strong>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. STATS ROW ─── */}
      <section className="bg-white py-14 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2 py-6 border border-border/40 rounded-2xl bg-bg-light transition-all duration-300 hover:border-red-100 hover:shadow-md">
                <div className="text-[44px] font-extrabold text-[#990202] tracking-tight">{stat.value}</div>
                <div className="text-[13.5px] font-bold text-[#990202]/85">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. NILAI KAMI ─── */}
      <section className="bg-bg-light py-20 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <p className="text-[12.5px] font-bold text-primary uppercase tracking-wider">Nilai Kami</p>
            <h2 className="font-inter text-[42px] font-extrabold text-dark leading-tight">
              6 prinsip yang menjadi fondasi kerja kami.
            </h2>
            <p className="text-[16.5px] text-muted leading-relaxed">
              Setiap proses, harga, dan komunikasi kami dipandu oleh nilai-nilai ini — bukan sekadar slogan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white rounded-xl p-7 border border-border/60 hover:border-primary/20 hover:shadow-sm transition-all duration-200 flex space-x-4">
                <div className="h-10 w-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <val.Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-dark mb-2">{val.title}</h3>
                  <p className="text-[13.5px] text-muted leading-relaxed">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. TIM KAMI ─── */}
      <section className="bg-white py-20 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <p className="text-[12px] font-extrabold text-[#990202] uppercase tracking-wider">Tim Kami</p>
            <h2 className="font-inter text-[36px] sm:text-[42px] font-extrabold text-gray-950 leading-tight">
              Tim di balik setiap proses Anda.
            </h2>
            <p className="text-[14.5px] text-gray-500 leading-relaxed font-normal">
              Konsultan hukum, ahli compliance, dan tim customer success — semua siap membantu legalitas bisnis Anda.
            </p>
          </div>

          {/* 2 rows × 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                
                {/* Team Member Image */}
                <div className="relative aspect-[1.15] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Team Member Info */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {/* Role Pill */}
                    <div className="inline-flex items-center bg-[#FFF5F5] px-2.5 py-0.5 rounded-md border border-red-100/50">
                      <span className="text-[10px] font-extrabold text-[#990202] tracking-wider uppercase">{member.role}</span>
                    </div>
                    
                    {/* Name */}
                    <h3 className="font-inter text-[17px] font-extrabold text-gray-950 group-hover:text-[#990202] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    
                    {/* Bio */}
                    <p className="text-[13px] text-gray-500 leading-relaxed font-normal line-clamp-2">
                      {member.bio}
                    </p>
                  </div>

                  {/* Social Links Footer */}
                  <div className="flex items-center space-x-2 mt-5 pt-4 border-t border-gray-100">
                    <a
                      href="#"
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#990202] hover:border-red-200 hover:bg-[#FFF5F5] transition-all duration-200"
                      title="LinkedIn Profile"
                    >
                      <LinkedinIcon />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#990202] hover:border-red-200 hover:bg-[#FFF5F5] transition-all duration-200"
                      title="Send Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. KANTOR KAMI ─── */}
      <Offices />

      {/* ─── 7. CTA BANNER ─── */}
      <CTA />

    </div>
  );
}
