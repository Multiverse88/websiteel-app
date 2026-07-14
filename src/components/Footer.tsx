import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Building, Award, Search, HelpCircle, Shield, FileText } from "lucide-react";
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

const WaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M16.5 13.52c-.63-.64-1.63-.64-2.27 0l-.39.4a1 1 0 0 1-1.35.08A6.84 6.84 0 0 1 9.4 10.9a1 1 0 0 1 .08-1.35l.4-.39c.64-.63.64-1.64 0-2.27l-.6-.6c-.63-.64-1.64-.64-2.27 0l-.6.6c-.63.64-.52 2.11.23 3.65A9.85 9.85 0 0 0 9.8 14.1a9.85 9.85 0 0 0 3.56 2.56c1.54.75 3 .86 3.65.23l.6-.6c.64-.63.64-1.64 0-2.27z" />
  </svg>
);


export default function Footer() {
  const virtualOfficeLinks = [
    { name: "Jakarta - Sovereign Plaza", href: "/layanan/virtual-office" },
    { name: "Jakarta Selatan - Serpong", href: "/layanan/virtual-office" },
    { name: "Bekasi - Summarecon", href: "/layanan/virtual-office" },
    { name: "Bandung - EasyBuilding", href: "/layanan/virtual-office" },
  ];

  const layananLinks = [
    { name: "Pendirian PT", href: "/layanan/pendirian-badan-usaha/pt" },
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
    { name: "Program Reseller", href: "/referral-reseller" },
    { name: "Kerjasama", href: "/kerjasama" },
    { name: "Karier", href: "/tentang-kami" },
  ];

  const toolsLinks = [
    { name: "Cek Nama PT", href: "/cek-nama" },
    { name: "Cek Nama Merek", href: "/cek-nama" },
    { name: "Cek Kode KBLI", href: "/cek-kbli" },
    { name: "FAQ", href: "/kontak#faq" },
    { name: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    { name: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
  ];

  return (
    <>

      <footer className="bg-[#F8F9FA] border-t border-[#EAEAEA] pt-14 pb-8 md:pt-20 md:pb-10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          
          {/* ─── HEADER ROW (Logo & Badges) ─── */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 w-full">
            <Link href="/" className="inline-block flex-shrink-0">
              <Image
                src="/Logo EL.png"
                alt="EasyLegal Logo"
                width={160}
                height={60}
                className="object-contain"
                priority
              />
            </Link>
            
            <div className="flex flex-col items-center md:items-end">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Terdaftar resmi di</div>
              <div className="flex items-center gap-5">
                <Image 
                  src="/images/badges/pse-terdaftar.png" 
                  alt="PSE Kominfo" 
                  width={140} 
                  height={60} 
                  className="object-contain h-[45px] w-auto" 
                />
                <Image 
                  src="/images/badges/iso-sertifikat.png" 
                  alt="ISO Certified" 
                  width={140} 
                  height={60} 
                  className="object-contain h-[45px] w-auto" 
                />
              </div>
            </div>
          </div>

          {/* ─── MAIN LINKS GRID ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">
            
            {/* Col 1: Description & Contacts */}
            <div className="lg:col-span-4 flex flex-col space-y-7">
              <p className="text-[13px] leading-relaxed text-[#666] max-w-[320px]">
                Platform legalitas bisnis terpercaya untuk UMKM dan pengusaha Indonesia. Proses mudah, harga transparan, hasil terjamin.
              </p>
              
              <div className="space-y-3">
                <a href="mailto:care@easylegal.id" className="flex items-center space-x-3 text-[13px] font-bold text-[#333] hover:text-[#990202] transition-colors">
                  <Mail className="w-[15px] h-[15px] text-[#990202]" />
                  <span>care@easylegal.id</span>
                </a>
                <a href="tel:02232093292" className="flex items-center space-x-3 text-[13px] font-bold text-[#333] hover:text-[#990202] transition-colors">
                  <Phone className="w-[15px] h-[15px] text-[#990202]" />
                  <span>022 3209 3292</span>
                </a>
                <a href="https://wa.me/62817770048" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-[13px] font-bold text-[#333] hover:text-[#990202] transition-colors">
                  <WaIcon className="w-[15px] h-[15px] text-[#990202]" />
                  <span>0817 770 048</span>
                </a>
                <a href="https://wa.me/62817321162" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-[13px] font-bold text-[#333] hover:text-[#990202] transition-colors">
                  <WaIcon className="w-[15px] h-[15px] text-[#990202]" />
                  <span>0817 321 162</span>
                </a>
                <a href="https://wa.me/62818818090" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-[13px] font-bold text-[#333] hover:text-[#990202] transition-colors">
                  <WaIcon className="w-[15px] h-[15px] text-[#990202]" />
                  <span>0818 818 090</span>
                </a>
              </div>
            </div>

            {/* Col 2: VIRTUAL OFFICE */}
            <div className="lg:col-span-2">
              <h3 className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider mb-6">
                VIRTUAL OFFICE
              </h3>
              <ul className="space-y-4">
                {virtualOfficeLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-[13px] text-[#666] hover:text-[#990202] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: LAYANAN */}
            <div className="lg:col-span-2">
              <h3 className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider mb-6">
                LAYANAN
              </h3>
              <ul className="space-y-4">
                {layananLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-[13px] text-[#666] hover:text-[#990202] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: PERUSAHAAN */}
            <div className="lg:col-span-2">
              <h3 className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider mb-6">
                PERUSAHAAN
              </h3>
              <ul className="space-y-4">
                {perusahaanLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-[13px] text-[#666] hover:text-[#990202] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: TOOLS GRATIS */}
            <div className="lg:col-span-2">
              <h3 className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider mb-6">
                TOOLS GRATIS
              </h3>
              <ul className="space-y-4">
                {toolsLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-[13px] text-[#666] hover:text-[#990202] transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>

          <div className="w-full h-px bg-gray-200 mb-10" />

          {/* ─── ADDRESSES ROW ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
            {[
              {
                title: "EasyLegal Bandung (Head Office)",
                building: "EasyBuilding",
                street1: "Jl. Cihampelas No. 201A, Cipaganti, Coblong,",
                street2: "Kota Bandung, Jawa Barat 40131"
              },
              {
                title: "EasyLegal Jakarta (Branch Office)",
                building: "Dewata Office - Sovereign Plaza 12th Floor",
                street1: "Jl. TB Simatupang No. 36, Cilandak Barat, Cilandak,",
                street2: "Kota Jakarta Selatan, DKI Jakarta 12430"
              },
              {
                title: "EasyLegal Bekasi (Branch Office)",
                building: "Emerald Commercial Summarecon Bekasi Blok UF No. 10",
                street1: "Jl. Bulevar Selatan, Marga Mulya, Bekasi Utara,",
                street2: "Kota Bekasi, Jawa Barat 17142"
              }
            ].map((addr, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <MapPin className="w-[16px] h-[16px] text-[#990202] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11.5px] font-bold text-[#1A1A1A] mb-1.5">{addr.title}</span>
                  <span className="text-[12px] text-[#666] leading-relaxed">{addr.building}</span>
                  <span className="text-[12px] text-[#666] leading-relaxed">{addr.street1}</span>
                  <span className="text-[12px] text-[#666] leading-relaxed">{addr.street2}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-gray-200 mb-8" />

          {/* ─── COPYRIGHT & SOCIALS ─── */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-[12.5px] font-medium text-[#777] text-center sm:text-left">
              © 2026 EasyLegal.id — Terdaftar PSE Kominfo. All rights reserved.
            </p>

            <div className="flex items-center space-x-2.5">
              {[
                { Icon: IgIcon, href: "https://instagram.com/id.easylegal", label: "Instagram" },
                { Icon: FbIcon, href: "https://facebook.com/easylegal.id", label: "Facebook" },
                { Icon: LiIcon, href: "https://id.linkedin.com/company/easylegal-id", label: "LinkedIn" },
                { Icon: YtIcon, href: "https://youtube.com/@easylegal.official", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-[34px] h-[34px] bg-white border border-[#E5E7EB] rounded-[8px] flex items-center justify-center text-[#555] hover:text-[#990202] hover:border-[#990202] transition-all duration-200 shadow-sm"
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
