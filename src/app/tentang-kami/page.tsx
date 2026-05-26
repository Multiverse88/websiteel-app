import React from "react";
import Link from "next/link";
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
    { value: "8.000+", label: "Bisnis terlayani" },
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
    { name: "Andi Saputra", role: "Founder & CEO", bio: "Memimpin visi & strategi EasyLegal. 12+ tahun di legal tech.", initials: "AS" },
    { name: "Maya Kusumawati", role: "Head of Legal", bio: "Lawyer senior, spesialis hukum perusahaan & investasi.", initials: "MK" },
    { name: "Reza Pratama", role: "Operations Lead", bio: "Memastikan setiap pengurusan beres tepat waktu & sesuai SLA.", initials: "RP" },
    { name: "Dewi Lestari", role: "Customer Success", bio: "Memandu pengusaha dari konsultasi awal sampai dokumen di tangan.", initials: "DL" },
    { name: "Budi Hartono", role: "Senior Lawyer", bio: "Spesialis HAKI, merek dagang & perlindungan brand internasional.", initials: "BH" },
    { name: "Siti Wahyuni", role: "Compliance Lead", bio: "Memastikan setiap proses sesuai regulasi & standar ISO.", initials: "SW" },
    { name: "Bayu Setiawan", role: "Tech Lead", bio: "Membangun platform agar proses legal jadi semudah belanja online.", initials: "BS" },
    { name: "Linda Hartono", role: "Marketing Lead", bio: "Menyampaikan misi EasyLegal ke seluruh UMKM Indonesia.", initials: "LH" },
  ];

  const offices = [
    { city: "Bandung", tag: "Kantor Pusat", addr: "Jl. Asia Afrika No. 1, Sumur Bandung, Kota Bandung, Jawa Barat 40111", hours: "Sen–Sab · 08–17 WIB", tel: "022-1234-5678", map: "https://maps.google.com" },
    { city: "Jakarta", tag: "Branch Office", addr: "Jl. Jenderal Sudirman Kav. 52-53, Setiabudi, Jakarta Selatan, DKI Jakarta 12190", hours: "Sen–Sab · 08–17 WIB", tel: "021-1234-5678", map: "https://maps.google.com" },
    { city: "Bekasi", tag: "Branch Office", addr: "Jl. Ahmad Yani No. 10, Marga Jaya, Bekasi Selatan, Kota Bekasi, Jawa Barat 17141", hours: "Sen–Sab · 08–17 WIB", tel: "021-9876-5432", map: "https://maps.google.com" },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── 1. HERO / HEADER ─── */}
      <section className="bg-white py-16 lg:py-24 border-b border-border/40 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-[13px] text-muted">
                <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
                <span className="text-border">/</span>
                <span className="text-[13px] font-semibold text-dark">Tentang Kami</span>
              </nav>

              <div className="inline-flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[12.5px] font-semibold text-primary">Tentang Kami</span>
              </div>

              <h1 className="text-[52px] lg:text-[56px] font-extrabold text-dark leading-[1.1] tracking-tight">
                Memudahkan legalitas untuk setiap pengusaha Indonesia.
              </h1>
              <p className="text-[18px] text-muted leading-relaxed max-w-xl">
                EasyLegal hadir karena kami percaya legalitas bisnis tidak harus mahal, lama, atau ribet. Sejak 2020, kami sudah membantu lebih dari 8.000 UMKM mengurus PT, perizinan, sampai sertifikasi ISO.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/kontak" className="px-7 py-3.5 bg-primary text-white font-bold text-[15px] rounded-lg hover:bg-primary-hover shadow-sm transition-all duration-200 text-center">
                  Konsultasi Gratis
                </Link>
                <Link href="/" className="px-7 py-3.5 border border-border text-dark font-bold text-[15px] rounded-lg hover:bg-bg-light transition-colors text-center">
                  Lihat Layanan
                </Link>
              </div>
            </div>

            {/* Right: 2 photo placeholders + badges */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                {/* PLACEHOLDER: 2 gambar orang/tim */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-gray-400 text-xs">
                      <div className="text-3xl mb-1">👤</div>
                      <div>Foto Tim 1</div>
                    </div>
                  </div>
                  <div className="h-72 bg-gray-200 rounded-2xl mt-8 flex items-center justify-center">
                    <div className="text-center text-gray-400 text-xs">
                      <div className="text-3xl mb-1">👤</div>
                      <div>Foto Tim 2</div>
                    </div>
                  </div>
                </div>

                {/* Badge: 8.000+ */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-border">
                  <div className="text-[18px] font-black text-dark">8.000+</div>
                  <div className="text-[11px] text-muted">Bisnis terlayani</div>
                </div>

                {/* Badge: 4.9/5 */}
                <div className="absolute -top-4 right-4 bg-white rounded-xl px-3 py-2.5 shadow-lg border border-border flex items-center space-x-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <div>
                    <div className="text-[14px] font-black text-dark">4.9/5</div>
                    <div className="text-[10px] text-muted">Google Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. CERITA KAMI ─── */}
      <section className="bg-bg-light py-20 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: image placeholder + badges */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                {/* PLACEHOLDER: foto kantor/tim */}
                <div className="w-full h-[420px] bg-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">🏢</div>
                    <div className="text-sm">Foto Kantor / Tim</div>
                  </div>
                </div>

                {/* Badge: Berdiri 2020 */}
                <div className="absolute -bottom-5 -right-5 bg-white rounded-xl p-4 shadow-lg border border-border">
                  <div className="text-[11px] font-extrabold text-primary uppercase tracking-wider mb-1">Berdiri 2020</div>
                  <div className="text-[11px] text-muted">5 tahun melayani UMKM</div>
                </div>
              </div>
            </div>

            {/* Right: story text */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-[12.5px] font-bold text-primary uppercase tracking-wider">Cerita Kami</p>
              <h2 className="text-[42px] font-extrabold text-dark leading-tight">
                Lahir dari pengalaman mengurus PT sendiri.
              </h2>
              <p className="text-[15.5px] text-muted leading-relaxed">
                Founder kami pernah mengalaminya — bolak-balik ke notaris, antri panjang di kantor pemerintah, dan kebingungan dengan biaya yang tidak transparan. Kami pikir, kalau kami yang punya akses dan jaringan saja kesulitan, bagaimana dengan pelaku UMKM lain?
              </p>
              <p className="text-[15.5px] text-muted leading-relaxed">
                Dari sanalah EasyLegal.id dibangun: sebuah platform yang memudahkan akses legalitas untuk semua pengusaha Indonesia. Mulai dari pendirian PT, NIB, pendaftaran merek, hingga sertifikasi ISO — semua bisa diurus online dengan harga yang transparan.
              </p>

              {/* Trust points */}
              <div className="space-y-3 pt-4">
                {[
                  "Terdaftar PSE Kominfo — data Anda aman & terenkripsi sesuai regulasi.",
                  "Tim 30+ konsultan hukum dari berbagai latar industri.",
                  "Bermitra resmi dengan KEMENKUMHAM, BKPM, DJKI, dan PSE Kominfo.",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-white p-3.5 rounded-xl border border-border/60">
                    <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-[13.5px] font-bold text-dark">{point}</span>
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
              <div key={idx} className="text-center space-y-2 py-6 border border-border/40 rounded-2xl bg-bg-light">
                <div className="text-[44px] font-extrabold text-dark tracking-tight">{stat.value}</div>
                <div className="text-[13.5px] font-medium text-muted">{stat.label}</div>
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
            <h2 className="text-[42px] font-extrabold text-dark leading-tight">
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
            <p className="text-[12.5px] font-bold text-primary uppercase tracking-wider">Tim Kami</p>
            <h2 className="text-[42px] font-extrabold text-dark leading-tight">
              Tim di balik setiap proses Anda.
            </h2>
            <p className="text-[16.5px] text-muted leading-relaxed">
              Konsultan hukum, ahli compliance, dan tim customer success — semua siap membantu legalitas bisnis Anda.
            </p>
          </div>

          {/* 2 rows × 4 cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-border/60 p-5 hover:shadow-md transition-all duration-200 flex flex-col items-center text-center space-y-3 group">
                {/* PLACEHOLDER: foto anggota tim */}
                <div className="h-20 w-20 rounded-full bg-primary-light flex items-center justify-center text-primary text-[18px] font-black group-hover:scale-105 transition-transform duration-200">
                  {member.initials}
                </div>

                <div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{member.role}</div>
                  <h3 className="text-[16px] font-bold text-dark group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                </div>

                <p className="text-[13px] text-muted leading-relaxed line-clamp-3">{member.bio}</p>

                {/* LinkedIn placeholder */}
                <a href="/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 text-[11.5px] text-muted hover:text-primary transition-colors">
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. KANTOR KAMI ─── */}
      <section className="bg-bg-light py-20 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <p className="text-[12.5px] font-bold text-primary uppercase tracking-wider">Kantor Kami</p>
            <h2 className="text-[42px] font-extrabold text-dark leading-tight">
              Hadir di 3 kota, melayani seluruh Indonesia.
            </h2>
            <p className="text-[16.5px] text-muted leading-relaxed">
              Walaupun proses kami 100% online, kami tetap punya kantor fisik yang bisa Anda kunjungi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-md transition-all duration-200">
                {/* PLACEHOLDER: foto kantor */}
                <div className="h-44 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="text-3xl mb-1">🏢</div>
                    <div className="text-xs">Foto Kantor {office.city}</div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[20px] font-extrabold text-dark">{office.city}</h3>
                    <span className="text-[10px] font-extrabold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {office.tag}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start space-x-2.5 text-[13px] text-muted">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{office.addr}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-[12.5px] text-muted">
                      <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 text-[12.5px] text-muted">
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{office.tel}</span>
                    </div>
                  </div>

                  <a
                    href={office.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[12.5px] font-bold text-primary hover:text-primary-hover space-x-1.5 pt-2"
                  >
                    <span>Buka di Google Maps</span>
                    <Map className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. CTA BANNER ─── */}
      <section className="bg-white py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#990202] to-[#6A0101] rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-[38px] font-extrabold text-white leading-tight mb-4">
                Siap mulai urus legalitas bisnis Anda bareng kami?
              </h2>
              <p className="text-[16px] text-white/80 leading-relaxed mb-8">
                Konsultasi gratis, tanpa komitmen. Tim kami akan menjelaskan syarat, timeline, dan biaya yang dibutuhkan.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20konsultasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-[#25D366] text-white font-bold text-[15px] rounded-xl hover:bg-[#1EA760] shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                  <span>Konsultasi via WhatsApp</span>
                </a>
                <Link
                  href="/kontak"
                  className="flex items-center justify-center px-8 py-4 border border-white/30 bg-white/10 text-white font-bold text-[15px] rounded-xl hover:bg-white/20 transition-all duration-200"
                >
                  Hubungi Tim Kami
                </Link>
              </div>

              <p className="text-[12.5px] text-white/60 font-medium mt-6">
                Respons dalam 5 menit · Senin–Sabtu 08.00–20.00
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
