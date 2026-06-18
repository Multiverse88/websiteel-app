import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import CTA from "@/components/CTA";
import { config } from "@/lib/config";

// Simple social icon components matching the Figma screenshot's clean line aesthetics
const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px]">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LiIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YtIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const trustedBy = ["PT Maju Jaya", "CV Sukses Abadi", "UD Berkah", "PT Nusantara", "CV Mitra", "PT Globalindo"];

export default function Footer() {
  const layananLinks = [
    { name: "Pendirian Badan Usaha", href: "/layanan/pendirian-badan-usaha" },
    { name: "Daftar Merek", href: "/layanan/merek-haki" },
    { name: "NIB & OSS", href: "/layanan/nib-oss" },
    { name: "Pengajuan PKP", href: "/layanan/pengajuan-pkp" },
    { name: "Sertifikasi ISO", href: "/layanan/sertifikasi-iso" },
    { name: "Visa & KITAS", href: "/layanan/visa-kitas" },
    { name: "Press Release", href: "/layanan/press-release" },
  ];

  const perusahaanLinks = [
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Blog & Artikel", href: "/artikel" },
    { name: "Testimoni", href: "/testimoni" },
    { name: "Referral dan Reseller", href: "/referral-reseller" },
    { name: "Kerjasama", href: "/kerjasama" },
    { name: "Karier", href: "/tentang-kami" },
  ];

  const toolsLinks = [
    { name: "Cek Nama PT", href: "/cek-nama" },
    { name: "Cek Nama Merek", href: "/cek-nama" },
    { name: "Cek Kode KBLI", href: "/cek-kbli" },
    { name: "FAQ", href: "/kontak#faq" },
    { name: "Kebijakan Privasi", href: "/tentang-kami" },
    { name: "Syarat & Ketentuan", href: "/tentang-kami" },
  ];

  return (
    <>
      {/* ─── CTA SECTION ─── */}
      <CTA />

      {/* ─── TRUSTED BY SECTION ─── */}
      <section className="py-12 bg-bg-light border-y border-border">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-[12px] text-muted mb-8 font-medium uppercase tracking-widest">
            Dipercaya oleh <span className="font-bold text-primary">12.000+ pengusaha</span> di seluruh Indonesia
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBy.map((c, idx) => (
              <span key={idx} className="text-[14px] font-semibold text-dark/30 hover:text-dark/50 transition-colors">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#F9F9F9] border-t border-[#EAEAEA] pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">

          {/* Col 1: Logo, description, contact details & addresses */}
          <div className="lg:col-span-5 flex flex-col space-y-6">

            {/* Stacking Brand Logo exactly like navbar */}
            <Link href="/home-gads" className="inline-flex items-start group w-fit">
              <Image
                src="/Logo EL.png"
                alt="EasyLegal Logo"
                width={200}
                height={100}
                className="h-[100px] w-auto object-contain"
                style={{ width: "auto" }}
                priority
              />
            </Link>

            {/* Description */}
            <p className="text-[13px] leading-relaxed text-[#555555] max-w-[340px]">
              Platform legalitas bisnis terpercaya untuk UMKM dan pengusaha Indonesia. Proses mudah, harga transparan, hasil terjamin.
            </p>

            {/* Contact info with red icons and bold text */}
            <div className="space-y-2.5 pt-1">
              <a
                href="mailto:info@easylegal.id"
                className="flex items-center space-x-2.5 text-[13px] font-bold text-[#1A1A1A] hover:text-[#D62828] transition-colors"
              >
                <Mail className="w-[15px] h-[15px] text-[#D62828] flex-shrink-0" />
                <span>info@easylegal.id</span>
              </a>
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2.5 text-[13px] font-bold text-[#1A1A1A] hover:text-[#D62828] transition-colors"
              >
                <Phone className="w-[15px] h-[15px] text-[#D62828] flex-shrink-0" />
                <span>{config.company.whatsapp}</span>
              </a>
            </div>

            {/* Office addresses with side-aligned map pins */}
            <div className="space-y-4 pt-2">
              {[
                { city: "Bandung", addr: "Jl. Asia Afrika No. 1, Bandung" },
                { city: "Jakarta", addr: "Jl. Sudirman Kav. 52, Jakarta" },
                { city: "Bekasi", addr: "Jl. Ahmad Yani No. 10, Bekasi" },
              ].map((office, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <MapPin className="w-[15px] h-[15px] text-[#D62828] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[13px] font-bold text-[#1A1A1A]">{office.city}</div>
                    <div className="text-[12px] text-[#666666] mt-0.5">{office.addr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: LAYANAN */}
          <div className="lg:col-span-2">
            <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-5">
              LAYANAN
            </h3>
            <ul className="space-y-3.5">
              {layananLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#555555] hover:text-[#D62828] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: PERUSAHAAN */}
          <div className="lg:col-span-2">
            <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-5">
              PERUSAHAAN
            </h3>
            <ul className="space-y-3.5">
              {perusahaanLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#555555] hover:text-[#D62828] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: TOOLS GRATIS */}
          <div className="lg:col-span-3">
            <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-wider mb-5">
              TOOLS GRATIS
            </h3>
            <ul className="space-y-3.5">
              {toolsLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[#555555] hover:text-[#D62828] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar with copyright and rounded-xl social cards */}
        <div className="border-t border-[#EAEAEA] pt-6 pb-2 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[12.5px] text-[#666666]">
            © 2026 EasyLegal.id — Terdaftar PSE Kominfo. All rights reserved.
          </p>

          {/* Social media card-style boxes */}
          <div className="flex items-center space-x-2">
            {[
              { Icon: IgIcon, href: "https://instagram.com/easylegal.id", label: "Instagram" },
              { Icon: FbIcon, href: "https://facebook.com/easylegal.id", label: "Facebook" },
              { Icon: LiIcon, href: "https://linkedin.com/company/easylegal", label: "LinkedIn" },
              { Icon: YtIcon, href: "https://youtube.com/@easylegal", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 bg-white border border-[#E5E7EB] rounded-[10px] flex items-center justify-center text-[#444444] hover:text-[#D62828] hover:border-[#D62828] hover:scale-105 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
