"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  MapPin,
  CheckCircle,
  ChevronDown,
  X,
  Send,
  Map,
} from "lucide-react";

export default function Kontak() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0); // first FAQ open by default
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    topic: "",
    message: "",
    consent: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const closeToast = () => {
    setFormSubmitted(false);
    setFormData({ name: "", whatsapp: "", topic: "", message: "", consent: false });
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq((prev) => (prev === idx ? null : idx));
  };

  const offices = [
    { city: "Bandung", tag: "Kantor Pusat", addr: "Jl. Asia Afrika No. 1, Sumur Bandung, Kota Bandung, Jawa Barat 40111", hours: "Sen–Sab · 08–17", tel: "022-1234-5678", map: "https://maps.google.com" },
    { city: "Jakarta", tag: "Branch Office", addr: "Jl. Jenderal Sudirman Kav. 52-53, Setiabudi, Jakarta Selatan, DKI Jakarta 12190", hours: "Sen–Sab · 08–17", tel: "021-1234-5678", map: "https://maps.google.com" },
    { city: "Bekasi", tag: "Branch Office", addr: "Jl. Ahmad Yani No. 10, Marga Jaya, Bekasi Selatan, Kota Bekasi, Jawa Barat 17141", hours: "Sen–Sab · 08–17", tel: "021-9876-5432", map: "https://maps.google.com" },
  ];

  const faqs = [
    {
      q: "Berapa lama proses pendirian PT di EasyLegal?",
      a: "Rata-rata 7–14 hari kerja sejak dokumen lengkap diterima. Untuk PT Perorangan bisa lebih cepat (3–5 hari kerja). Anda akan mendapat tracking status real-time dari dashboard setiap tahap.",
    },
    {
      q: "Apakah harga sudah termasuk biaya pemerintah?",
      a: "Ya, semua harga paket EasyLegal bersifat All-In. Sudah termasuk biaya PNBP Kemenkumham, jasa notaris, SK Kemenkumham, dan NIB. Tidak ada biaya tersembunyi di kemudian hari.",
    },
    {
      q: "Apakah saya harus datang ke kantor EasyLegal?",
      a: "Tidak perlu. Seluruh proses kami dirancang 100% online & paperless. Anda cukup mengunggah berkas melalui dashboard kami. Namun jika ingin berkonsultasi langsung, kantor kami selalu terbuka.",
    },
    {
      q: "Bagaimana kalau dokumen saya kurang lengkap?",
      a: "Tim compliance kami akan memeriksa kembali seluruh berkas Anda sebelum diproses. Jika ada yang kurang atau perlu revisi, kami akan segera mengabari Anda via WhatsApp dan memandu Anda.",
    },
    {
      q: "Apakah EasyLegal terdaftar resmi?",
      a: "Ya, EasyLegal terdaftar resmi sebagai Penyelenggara Sistem Elektronik (PSE) di Kominfo dan bermitra dengan Notaris terpercaya di Indonesia.",
    },
    {
      q: "Bagaimana metode pembayarannya?",
      a: "Kami menerima transfer bank (VA BCA, Mandiri, BNI, BRI), kartu kredit, dan cicilan. Pembayaran bisa dilakukan DP 50% di awal atau cicilan sesuai kesepakatan.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─── 1. HERO ─── */}
      <section className="bg-white py-16 lg:py-24 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-[13px] text-muted mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
            <span className="text-border">/</span>
            <span className="text-[13px] font-semibold text-dark">Kontak</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-1.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[12.5px] font-semibold text-primary">Hubungi Kami</span>
            </div>
            <h1 className="text-[48px] font-extrabold text-dark leading-tight tracking-tight mb-5">
              Mari bicarakan kebutuhan legal bisnis Anda.
            </h1>
            <p className="text-[17.5px] text-muted leading-relaxed max-w-2xl">
              Tim kami siap membantu — dari pertanyaan teknis sampai konsultasi mendalam. Pilih cara yang paling nyaman untuk Anda.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. CONTACT CHANNELS ─── */}
      <section className="bg-bg-light py-14 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* WhatsApp Card */}
            <div className="bg-white rounded-2xl p-7 border border-border/60 hover:border-green-300 hover:shadow-md transition-all duration-200 flex flex-col">
              <span className="text-[11px] font-bold text-dark uppercase tracking-wider mb-4">WhatsApp · Tercepat</span>
              <div className="h-14 w-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7 text-[#25D366]" />
              </div>
              <h3 className="text-[18px] font-black text-dark mb-2">0811-2345-6789</h3>
              <p className="text-[13px] text-muted leading-relaxed flex-grow">
                Respons rata-rata kurang dari 5 menit. Tersedia Senin–Sabtu, 08:00–20:00 WIB.
              </p>
              <a
                href="https://wa.me/6281123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 pt-5 border-t border-border/60 inline-flex items-center text-[13px] font-bold text-[#25D366] hover:text-[#1EA760] transition-colors"
              >
                Mulai chat →
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-7 border border-border/60 hover:border-blue-200 hover:shadow-md transition-all duration-200 flex flex-col">
              <span className="text-[11px] font-bold text-dark uppercase tracking-wider mb-4">Email · Formal</span>
              <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-[18px] font-black text-dark mb-2">info@easylegal.id</h3>
              <p className="text-[13px] text-muted leading-relaxed flex-grow">
                Untuk pertanyaan detail, dokumentasi, atau kerjasama. Dibalas dalam 24 jam kerja.
              </p>
              <a
                href="mailto:info@easylegal.id"
                className="mt-6 pt-5 border-t border-border/60 inline-flex items-center text-[13px] font-bold text-primary hover:text-primary-hover transition-colors"
              >
                Kirim email →
              </a>
            </div>

            {/* Telepon Card */}
            <div className="bg-white rounded-2xl p-7 border border-border/60 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col">
              <span className="text-[11px] font-bold text-dark uppercase tracking-wider mb-4">Telepon · Kantor</span>
              <div className="h-14 w-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <Phone className="w-7 h-7 text-gray-500" />
              </div>
              <h3 className="text-[18px] font-black text-dark mb-2">(022) 1234-5678</h3>
              <p className="text-[13px] text-muted leading-relaxed flex-grow">
                Hubungi kantor pusat Bandung. Tim operations siap menjawab di jam kerja.
              </p>
              <a
                href="tel:02212345678"
                className="mt-6 pt-5 border-t border-border/60 inline-flex items-center text-[13px] font-bold text-primary hover:text-primary-hover transition-colors"
              >
                Telepon kami →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. FORM + SIDEBAR ─── */}
      <section className="bg-white py-20 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Form */}
            <div className="lg:col-span-7 bg-white border border-border rounded-2xl relative overflow-hidden shadow-sm">
              {/* Red top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

              <div className="p-8 md:p-10">
                <h2 className="text-[24px] font-black text-dark mb-1">Kirim pertanyaan Anda</h2>
                <p className="text-[14px] text-muted mb-7">
                  Isi form berikut dan tim kami akan menghubungi Anda kembali dalam 1×24 jam kerja.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Topik */}
                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">
                      Topik Konsultasi*
                    </label>
                    <select
                      name="topic"
                      required
                      value={formData.topic}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-[14.5px] bg-bg-light/40 text-muted"
                    >
                      <option value="" disabled>Pilih Topik Konsultasi</option>
                      <option value="Pendirian PT / CV">Pendirian PT / CV</option>
                      <option value="Pendaftaran Merek & HAKI">Pendaftaran Merek & HAKI</option>
                      <option value="NIB, OSS RBA & KBLI">NIB, OSS RBA & KBLI</option>
                      <option value="Sertifikasi ISO">Sertifikasi ISO</option>
                      <option value="Pengajuan PKP">Pengajuan PKP</option>
                      <option value="Visa & KITAS">Visa & KITAS</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  {/* Nama + WA */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-dark mb-1.5">Nama Lengkap*</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nama lengkap Anda"
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-dark mb-1.5">Nomor WhatsApp*</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="08xxxxxxxxxx"
                        className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40"
                      />
                    </div>
                  </div>

                  {/* Pesan */}
                  <div>
                    <label className="block text-[13px] font-semibold text-dark mb-1.5">Pesan / Pertanyaan*</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Ceritakan kebutuhan legalitas bisnis Anda — kami akan bantu rekomendasikan solusi yang sesuai."
                      className="w-full px-4 py-3 rounded-lg border border-border focus:outline-none focus:border-primary text-sm bg-bg-light/40 resize-none"
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 accent-primary border-border rounded"
                    />
                    <label htmlFor="consent" className="text-[13px] text-muted leading-snug">
                      Saya setuju data yang saya kirim akan diproses sesuai{" "}
                      <Link href="/" className="text-primary font-semibold hover:underline">Kebijakan Privasi</Link> EasyLegal.id.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold text-[15px] rounded-lg shadow hover:shadow-md transition-all duration-200 flex justify-center items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Pertanyaan</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-5">
              {/* Respons cepat badge */}
              <div className="bg-primary-light border border-primary/10 rounded-2xl p-5 flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-dark">Respons cepat</div>
                  <div className="text-[12px] text-muted">Rata-rata kurang dari 5 menit via WhatsApp.</div>
                </div>
              </div>

              {/* Info box */}
              <div className="bg-white border border-border/60 rounded-2xl p-6 space-y-5">
                {/* Jam Operasional */}
                <div className="space-y-2 pb-5 border-b border-border/60">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-[14px] font-bold text-dark">Jam Operasional</span>
                  </div>
                  <p className="text-[13.5px] text-muted pl-6">Senin – Sabtu · 08.00 – 20.00 WIB</p>
                </div>

                {/* Kantor Pusat */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-[14px] font-bold text-dark">Kantor Pusat</span>
                  </div>
                  <p className="text-[13.5px] text-muted pl-6">
                    Jl. Asia Afrika No. 1, Sumur Bandung, Kota Bandung, Jawa Barat 40111
                  </p>
                  <Link
                    href="/tentang-kami"
                    className="pl-6 inline-flex items-center text-[12.5px] font-bold text-primary hover:text-primary-hover space-x-1"
                  >
                    <span>Lihat semua kantor</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. KANTOR KAMI ─── */}
      <section className="bg-bg-light py-20 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="text-[12.5px] font-bold text-primary uppercase tracking-wider">Kantor Kami</p>
            <h2 className="text-[36px] font-extrabold text-dark leading-tight">
              Kunjungi kami di 3 kota.
            </h2>
            <p className="text-[16px] text-muted leading-relaxed">
              Walaupun proses 100% online, kantor fisik kami terbuka untuk konsultasi tatap muka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-md transition-all duration-200">
                {/* PLACEHOLDER: foto kantor */}
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-400 text-xs">
                    <div className="text-3xl mb-1">🏢</div>
                    <div>Foto Kantor {office.city}</div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[20px] font-extrabold text-dark">{office.city}</h3>
                    <span className="text-[10px] font-bold text-primary bg-primary-light px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {office.tag}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2 text-[13.5px] text-muted">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{office.addr}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[12.5px] text-muted">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[12.5px] text-muted">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{office.tel}</span>
                  </div>
                  <a
                    href={office.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[12.5px] font-bold text-primary hover:text-primary-hover space-x-1 pt-1"
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

      {/* ─── 5. FAQ ACCORDION ─── */}
      <section className="bg-white py-20">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <p className="text-[12.5px] font-bold text-primary uppercase tracking-wider">FAQ</p>
            <h2 className="text-[36px] font-extrabold text-dark leading-tight">
              Pertanyaan yang sering ditanyakan.
            </h2>
            <p className="text-[16px] text-muted leading-relaxed">
              Sebelum hubungi kami, mungkin jawabannya sudah ada di sini.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
                    isExpanded ? "border-primary/30 shadow-sm" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className={`text-[16.5px] font-${isExpanded ? "bold" : "semibold"} ${isExpanded ? "text-dark" : "text-dark"} leading-snug`}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 ml-4 transition-all duration-200 ${
                        isExpanded ? "rotate-180 text-primary" : "text-muted"
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-[300px]" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-5 border-t border-border/60 pt-4">
                      <p className="text-[14.5px] text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Toast notification */}
      {formSubmitted && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-down">
          <div className="bg-white border border-border rounded-2xl p-5 shadow-2xl max-w-xs flex items-start space-x-3 relative">
            <button onClick={closeToast} className="absolute top-3 right-3 p-1 rounded-full hover:bg-bg-light text-muted">
              <X className="w-4 h-4" />
            </button>
            <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-dark mb-1">Pertanyaan Dikirim!</div>
              <p className="text-[11.5px] text-muted leading-relaxed">
                Tim kami akan menghubungi <strong>{formData.name}</strong> secepatnya.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
