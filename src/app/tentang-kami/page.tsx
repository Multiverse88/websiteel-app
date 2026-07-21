import React from "react";
import Link from "next/link";
import Image from "next/image";
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

// Helper component for team member cards
const MemberCard = ({ member }: { member: { name: string; role: string; bio: string; img: string } }) => (
  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-black/[0.04] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col group">
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
      <Image
        src={member.img}
        alt={member.name}
        fill
        sizes="(max-width: 768px) 100vw, 300px"
        className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
      <div className="space-y-2">
        <div className="inline-flex items-center bg-[#FFF5F5] px-2 py-0.5 rounded-md border border-red-100/50">
          <span className="text-[16px] sm:text-[16px] font-extrabold text-[#990202] tracking-wider uppercase">{member.role}</span>
        </div>
        <h3 className="font-heading text-[16px] sm:text-[16px] font-extrabold text-gray-950 group-hover:text-[#990202] transition-colors leading-snug">
          {member.name}
        </h3>
        <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed font-normal line-clamp-2">
          {member.bio}
        </p>
      </div>
    </div>
  </div>
);

export default function TentangKami() {
  const stats = [
    { value: "12.500+", label: "Bisnis terlayani" },
    { value: "15+", label: "Jenis layanan legal" },
    { value: "4.9 ★", label: "Rating Google" },
    { value: "3 Kota", label: "Kantor Representatif" },
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
    // Legal Officers (LO)
    { name: "Akmal Abdul Arik", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Akmal Abdul Arik, S.H..jpg" },
    { name: "Risa Rizki Sharon", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Risa Rizki Sharon, S.H, M.H..jpg" },
    { name: "Tiara Nabila", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Tiara Nabila, S.H..jpg" },
    { name: "Fauzia Rahmawati", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Fauzia Rahmawati, S.H..jpg" },
    { name: "Amelia Ingrid Taruna", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Amelia Ingrid Taruna, S.H..jpg" },

    // Personal Legal Assistants (PLA)
    { name: "Mohammad Faddly Argahari", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Mohammad Faddly Argahari, S.H..jpg" },
    { name: "Naufal Nandi Pinto", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Naufal Nandi Pinto, S.H..jpg" },
    { name: "Ela Yuniar", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Ela Yuniar, S.H..jpg" },
    { name: "Mayang Cahyati", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Mayang Cahyati, S.H..jpg" },
    { name: "Indiana Oscar", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Indiana Oscar, S.H..jpg" },
  ];



  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── 1. HERO / HEADER ─── */}
      <section className="bg-white py-8 sm:py-20 border-b border-border/40 overflow-hidden relative">
        {/* Subtle top-left radial glow for premium aesthetics */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[16px] sm:text-[16px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[16px] sm:text-[16px] font-bold text-gray-900">Tentang Kami</span>
              </nav>

              {/* Pill Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100 shadow-sm animate-pulse-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[16px] sm:text-[16px] font-bold text-[#990202] tracking-wide">Tentang Kami</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-[26px] sm:text-[52px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.2] sm:leading-[1.12] tracking-tight">
                Memudahkan legalitas untuk{" "}
                <span className="relative inline-block text-[#990202] px-2 py-0.5 bg-red-500/5 rounded-lg border border-red-100/40">
                  setiap pengusaha
                </span>{" "}
                Indonesia.
              </h1>

              {/* Description */}
              <p className="text-[16px] sm:text-[16px] text-gray-600 leading-relaxed max-w-2xl font-normal">
                EasyLegal hadir karena kami believe legalitas bisnis tidak harus mahal, lama, atau ribet. Sejak 2020, kami sudah membantu lebih dari 12.500 UMKM mengurus PT, perizinan, sampai sertifikasi ISO.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-row gap-3 pt-2">
                <Link
                  href="/kontak"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 sm:px-7 py-3 sm:py-4 bg-[#990202] text-white font-bold text-[16px] sm:text-[16px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
                >
                  <span>Konsultasi Gratis</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 sm:ml-2" />
                </Link>
                <Link
                  href="/"
                  className="flex-1 sm:flex-initial px-4 sm:px-7 py-3 sm:py-4 shadow-md border border-black/[0.04] text-gray-800 font-bold text-[16px] sm:text-[16px] rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm"
                >
                  Lihat Layanan
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Corporate Image + Badges */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">

                {/* Main Corporate Image Container */}
                <div className="relative w-full max-w-[480px] lg:max-w-none group aspect-square lg:aspect-[4/5] flex items-end justify-center">
                  <Image
                    src="/images/home/tentang-kami-hero.png"
                    alt="Tim EasyLegal membantu UMKM pengurusan legalitas"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-contain object-bottom group-hover:scale-[1.02] transition-transform duration-700 drop-shadow-xl"
                    priority
                  />
                </div>

                {/* Floating Badge 1: 11.000+ Bisnis Terlayani */}
                <div className="absolute -top-4 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex items-center space-x-2 sm:space-x-3.5 w-[140px] sm:w-[210px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-red-50 flex items-center justify-center text-[#990202] flex-shrink-0">
                    <User className="w-4 h-4 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[16px] sm:text-[16px] font-black text-[#990202] leading-none">12.500+</div>
                    <div className="text-[16px] sm:text-[16px] text-[#990202]/85 font-bold mt-1">Bisnis terlayani</div>
                  </div>
                </div>

                {/* Floating Badge 2: 4.9/5 Rating Google */}
                <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex items-center space-x-2 sm:space-x-3.5 w-[130px] sm:w-[190px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-red-50 flex items-center justify-center text-[#D62828] flex-shrink-0">
                    <Star className="w-4 h-4 sm:w-5.5 sm:h-5.5 fill-[#D62828] text-[#D62828]" />
                  </div>
                  <div>
                    <div className="text-[16px] sm:text-[16px] font-black text-[#990202] leading-none">4.9 / 5</div>
                    <div className="text-[16px] sm:text-[16px] text-[#990202]/85 font-bold mt-1">Rating Google</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. CERITA KAMI ─── */}
      <section className="bg-white py-8 sm:py-20 border-b border-border/40 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* Left: Team Image + Floating Badge */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mb-8 lg:mb-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">

                {/* Main Team Image Container */}
                <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-md border border-black/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-white group aspect-[4/3] sm:aspect-[1.4] lg:aspect-[4/3]">
                  <Image
                    src="/images/home/tentang-kami-cerita.jpg"
                    alt="Tim EasyLegal bekerja bersama membantu perizinan UMKM"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>

                {/* Floating Badge: Berdiri 2023 */}
                <div className="absolute -bottom-4 left-2 sm:left-6 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.08)] flex items-center space-x-2 sm:space-x-3.5 w-[140px] sm:w-[210px] transition-transform hover:-translate-y-1 duration-300">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#990202] flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_12px_rgba(153,2,2,0.2)]">
                    <Calendar className="w-4 h-4 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="text-[16px] sm:text-[16px] font-black text-gray-900 leading-none">Berdiri 2023</div>
                    <div className="text-[16px] sm:text-[16px] text-gray-500 font-bold mt-1">4 tahun melayani UMKM</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Story Text */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <p className="text-[16px] sm:text-[16px] font-extrabold text-[#990202] uppercase tracking-wider">Cerita Kami</p>

              <h2 className="font-heading text-[16px] sm:text-[42px] font-extrabold text-gray-950 leading-[1.25] sm:leading-tight">
                Lahir dari pengalaman{" "}
                <span className="text-[#990202]">
                  mengurus PT sendiri
                </span>
              </h2>

              <p className="text-[16px] sm:text-[16px] text-gray-600 leading-relaxed font-normal">
                Founder kami pernah mengalaminya — bolak-balik ke notaris, antre panjang di kantor pemerintah, dan kebingungan dengan biaya yang tidak transparan. Kami pikir, kalau kami yang punya akses dan jaringan saja kesulitan, bagaimana dengan pelaku UMKM lain?
              </p>

              <p className="text-[16px] sm:text-[16px] text-gray-600 leading-relaxed font-normal">
                Dari sanalah <strong className="font-extrabold text-gray-900">EasyLegal.id</strong> dibangun: sebuah platform yang memudahkan akses legalitas untuk semua pengusaha Indonesia. Lebih dari 12.500 UMKM mengurus perizinan, pendirian badan usaha, hingga sertifikasi ISO — semua bisa diurus online dengan harga yang transparan.
              </p>

              {/* Trust points list */}
              <div className="space-y-3 sm:space-y-4 pt-4 border-t border-gray-200/60">
                {[
                  { bold: "Terdaftar PSE Kominfo", text: " — data Anda aman & terenkripsi sesuai regulasi." },
                  { bold: "Tim 30+ konsultan hukum", text: " dari berbagai latar industri." },
                  { bold: "Bermitra resmi", text: " dengan KEMENKUMHAM, BKPM, DJKI, dan PSE Kominfo." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2 sm:space-x-3 text-[16px] sm:text-[16px] text-gray-600">
                    <Check className="w-4 h-4 sm:w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
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

      {/* ─── 3. STATS & NILAI KAMI UNIFIED SECTION ─── */}
      <section className="relative bg-white py-16 sm:py-24 border-b border-gray-100 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-100/50 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          
          {/* STATS ROW */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-32">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="group relative flex flex-col items-center justify-center text-center py-8 sm:py-12 px-4 rounded-[24px] sm:rounded-[32px] bg-white border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-red-100 hover:shadow-[0_20px_40px_rgba(214,40,40,0.08)]"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-50/0 to-red-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 text-[36px] sm:text-[52px] font-extrabold text-[#990202] tracking-tight leading-none mb-3 flex items-center justify-center gap-1.5 sm:gap-2">
                  {stat.label === "Rating Google" && (
                    <Star className="w-8 h-8 sm:w-11 sm:h-11 text-amber-400 fill-amber-400" />
                  )}
                  <span>{stat.value.replace(" ★", "")}</span>
                </div>
                <div className="relative z-10 text-[16px] sm:text-[16px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* NILAI KAMI */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-red-50 border border-red-100 text-[#990202] rounded-full text-[16px] font-extrabold tracking-widest uppercase">
              Nilai Kami
            </div>
            <h2 className="font-heading text-[28px] sm:text-[44px] lg:text-[48px] font-extrabold text-gray-950 leading-[1.1] tracking-tight">
              6 prinsip yang menjadi fondasi kerja kami.
            </h2>
            <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed max-w-xl mx-auto">
              Setiap proses, harga, dan komunikasi kami dipandu oleh nilai-nilai ini — bukan sekadar slogan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {values.map((val, idx) => (
              <div 
                key={idx} 
                className="group bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 hover:border-red-100/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-50/50 to-transparent rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-[16px] sm:rounded-[20px] bg-gradient-to-br from-red-50 to-white border border-red-100/50 flex items-center justify-center flex-shrink-0 mb-5 sm:mb-6 group-hover:scale-110 group-hover:shadow-[0_8px_16px_rgba(214,40,40,0.1)] transition-all duration-300">
                  <val.Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#990202]" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-[16px] sm:text-[16px] font-extrabold text-gray-950 mb-2 sm:mb-3">{val.title}</h3>
                  <p className="text-[16px] sm:text-[16px] text-gray-500 leading-relaxed font-medium">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* ─── 5. TIM KAMI ─── */}
      <section className="bg-white py-8 sm:py-20 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 space-y-2 sm:space-y-3">
            <p className="text-[16px] sm:text-[16px] font-extrabold text-[#990202] uppercase tracking-wider">Tim Kami</p>
            <h2 className="font-heading text-[16px] sm:text-[42px] font-extrabold text-gray-950 leading-[1.25] sm:leading-tight">
              Tim di balik setiap proses Anda.
            </h2>
          </div>

          {/* Legal Officer Team */}
          <div className="mb-12 sm:mb-20">
            <h3 className="text-center text-[16px] font-black text-gray-950 mb-8 sm:mb-10 uppercase tracking-widest">Legal Officer (LO)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                { name: "Akmal Abdul Arik", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Akmal Abdul Arik, S.H..jpg" },
                { name: "Risa Rizki Sharon", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Risa Rizki Sharon, S.H, M.H..jpg" },
                { name: "Tiara Nabila", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Tiara Nabila, S.H..jpg" },
                { name: "Fauzia Rahmawati", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Fauzia Rahmawati, S.H..jpg" },
                { name: "Amelia Ingrid Taruna", role: "Legal Officer", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Amelia Ingrid Taruna, S.H..jpg" },
              ].map((member, idx) => (
                <MemberCard key={idx} member={member} />
              ))}
            </div>
          </div>

          {/* PLA Team */}
          <div>
            <h3 className="text-center text-[16px] font-black text-gray-950 mb-8 sm:mb-10 uppercase tracking-widest">Personal Legal Assistant (PLA)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {[
                { name: "Mohammad Faddly Argahari", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Mohammad Faddly Argahari, S.H..jpg" },
                { name: "Naufal Nandi Pinto", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Naufal Nandi Pinto, S.H..jpg" },
                { name: "Ela Yuniar", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Ela Yuniar, S.H..jpg" },
                { name: "Mayang Cahyati", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Mayang Cahyati, S.H..jpg" },
                { name: "Indiana Oscar", role: "Personal Legal Assistant", bio: "Konsultan hukum profesional di EasyLegal.", img: "/teamplalo/Indiana Oscar, S.H..jpg" },
              ].map((member, idx) => (
                <MemberCard key={idx} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. KANTOR KAMI ─── */}
      <Offices />

    </div>
  );
}
