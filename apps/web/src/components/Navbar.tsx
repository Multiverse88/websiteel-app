"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Building2, FileCheck2, Award, FileSignature, Files, ShieldCheck, Globe, ArrowRight, FileText, Users, BadgeCheck } from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";

// ponytail: "Hak Cipta" and "KITAS" reuse an existing page's content
// (/layanan/merek-haki, /layanan/visa-kitas) — there's no dedicated route
// for them yet. Give them their own page when that content exists.
const megaMenuData = {
  leftColumn: {
    header: "PERIZINAN & PENDIRIAN",
    subHeader: "Layanan inti legalitas bisnis",
    items: [
      {
        title: "Pendirian & Pembubaran Badan Usaha",
        description: "PT, PT PMA, PT Perorangan, CV, Yayasan, Perkumpulan, Firma, Koperasi",
        icon: Building2,
        href: "/layanan/pendirian-badan-usaha",
        subItems: [
          { label: "Pendirian PT", href: "/layanan/pendirian-badan-usaha" },
          { label: "PT PMA", href: "/layanan/pendirian-badan-usaha/pt-pma" },
          { label: "PT Perorangan", href: "/layanan/pendirian-badan-usaha/pt-perorangan" },
          { label: "CV", href: "/layanan/pendirian-badan-usaha/cv" },
          { label: "Yayasan", href: "/layanan/pendirian-badan-usaha/yayasan" },
          { label: "Perkumpulan", href: "/layanan/pendirian-badan-usaha/perkumpulan" },
          { label: "Firma", href: "/layanan/pendirian-badan-usaha/firma" },
          { label: "Koperasi", href: "/layanan/pendirian-badan-usaha/koperasi" },
          { label: "Pembubaran Perusahaan", href: "/layanan/pembubaran-perusahaan" },
        ]
      },
      {
        title: "Perizinan Usaha",
        description: "NIB, OSS, PKP, PSE, PKKPR, LKPM",
        icon: FileCheck2,
        href: "/layanan/nib-oss",
        subItems: [
          { label: "NIB & OSS", href: "/layanan/nib-oss" },
          { label: "Pengajuan PKP", href: "/layanan/pengajuan-pkp" },
          { label: "Pengurusan PSE", href: "/layanan/pengurusan-pse" },
          { label: "PKKPR", href: "/layanan/pkkpr" },
          { label: "Pelaporan LKPM", href: "/layanan/pelaporan-lkpm" },
        ]
      },
      {
        title: "Pengurusan Dokumen Perusahaan",
        description: "Perubahan Anggaran Dasar, Data Perusahaan, Cabang, Akta Jual Beli/Akuisisi",
        icon: Files,
        href: "/layanan/perubahan-akta",
        subItems: [
          { label: "Perubahan Akta & AD", href: "/layanan/perubahan-akta" },
          { label: "Pembubaran Perusahaan", href: "/layanan/pembubaran-perusahaan" },
        ]
      },
      {
        title: "Penyusunan & Review Perjanjian",
        description: "Kontrak Bisnis, Kerja Sama",
        icon: FileSignature,
        href: "/layanan/kontrak-bisnis",
        subItems: [
          { label: "Kontrak Bisnis", href: "/layanan/kontrak-bisnis" },
          { label: "Kerja Sama", href: "/layanan/kontrak-bisnis" },
        ]
      }
    ]
  },
  middleColumn: {
    header: "PERIZINAN KHUSUS",
    subHeader: "Layanan perizinan dan dokumen khusus",
    items: [
      {
        title: "Pendaftaran HKI",
        description: "Merek, Paten, Desain Industri, Hak Cipta",
        icon: ShieldCheck,
        href: "/layanan/merek-haki",
        subItems: [
          { label: "Merek", href: "/layanan/merek-haki" },
          { label: "Paten", href: "/layanan/merek-haki" },
          { label: "Desain Industri", href: "/layanan/merek-haki" },
          { label: "Hak Cipta", href: "/layanan/merek-haki" },
        ]
      },
      {
        title: "Apostille",
        description: "Legalisasi dokumen lintas negara",
        icon: FileText,
        href: "/layanan/apostille",
      },
      {
        title: "Layanan Imigrasi",
        description: "Visa, KITAS",
        icon: Globe,
        href: "/layanan/visa-kitas",
        subItems: [
          { label: "Visa", href: "/layanan/visa-kitas" },
          { label: "KITAS", href: "/layanan/visa-kitas" },
        ]
      },
      {
        title: "Perjanjian Pisah Harta",
        description: "Perjanjian Perkawinan",
        icon: FileSignature,
        href: "/layanan/perjanjian-perkawinan",
      },
      {
        title: "Pelaporan RUPS",
        description: "RUPS Tahunan & Luar Biasa",
        icon: Users,
        href: "/layanan/pelaporan-rups",
      }
    ]
  },
  rightColumn: {
    header: "BRAND & UNIT EKOSISTEM",
    subHeader: "Ekosistem terintegrasi via EasyCorp",
    items: [
      {
        brandPrefix: "Easy",
        brandSuffix: "Office",
        title: "Virtual Office",
        description: "Alamat Bisnis Prestisius, Layanan Resepsionis, Ruang Meeting",
        href: "/layanan/virtual-office",
      },
      {
        brandPrefix: "Easy",
        brandSuffix: "Tax",
        title: "Layanan Perpajakan",
        description: "Laporan SPT Tahunan Badan, Konsultasi Pajak, Kode Billing Pajak",
        href: "#",
      },
      {
        brandPrefix: "Easy",
        brandSuffix: "ISO",
        title: "Sertifikasi ISO",
        description: "ISO 9001, 14001, 45001, 27001, dan standar lainnya",
        href: "/layanan/sertifikasi-iso",
      },
      {
        brandPrefix: "Easy",
        brandSuffix: "Press",
        title: "PR & Media",
        description: "Publikasi Media Nasional, Siaran Pers",
        href: "/layanan/pr-media",
      },
      {
        brandPrefix: "Easy",
        brandSuffix: "Branding",
        title: "Branding & Company Profile",
        description: "Desain Logo, Company Profile, Website, Marketing Kit",
        href: "#",
      }
    ]
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const toolsDropdownRef = React.useRef<HTMLDivElement>(null);
  const mobileDrawerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleOpenMegaMenu = () => {
      setIsLayananOpen(true);
      if (window.innerWidth < 1024) {
        setIsOpen(true);
      }
    };
    window.addEventListener("open-layanan-mega-menu", handleOpenMegaMenu);

    const handleClickOutside = (event: MouseEvent) => {
      // Ignore if clicking inside the mobile drawer
      if (mobileDrawerRef.current && mobileDrawerRef.current.contains(event.target as Node)) {
        return;
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLayananOpen(false);
      }
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsLayananOpen(false);
    setIsToolsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          : "bg-white/90 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          {/* Logo */}
          <Link
            href="/home-gads"
            onClick={handleLinkClick}
            className="flex items-center group flex-shrink-0"
          >
            <div className="navbar-logo">
              <Image 
                src="/Logo EL.png" 
                alt="EasyLegal Logo" 
                width={150}
                height={52}
                className="w-auto h-[52px] object-contain"
                style={{ width: "auto", height: "52px" }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/home-gads"
              onClick={handleLinkClick}
              className={`text-[16px] font-medium transition-colors ${
                pathname === "/" || pathname === "/home-gads"
                  ? "text-dark font-semibold"
                  : "text-muted hover:text-dark"
              }`}
            >
              Home
            </Link>

            {/* Layanan Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={() => setIsLayananOpen(!isLayananOpen)}
                className={`flex items-center space-x-1 text-[16px] font-medium transition-colors ${
                  isLayananOpen
                    ? "text-dark font-semibold"
                    : "text-muted hover:text-dark"
                }`}
              >
                <span>Layanan</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLayananOpen ? "rotate-180" : ""}`} />
              </button>

              {isLayananOpen && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[1150px] max-w-[calc(100vw-2rem)] mt-0 pt-4 bg-transparent animate-slide-down">
                  <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-6 grid grid-cols-[1fr_1fr_1.15fr] gap-6">
                    
                    {/* Left Column */}
                    <div className="flex flex-col border-r border-slate-100 pr-5">
                      <div className="mb-4 px-3">
                        <h3 className="text-[12px] font-bold text-primary tracking-wider uppercase mb-1.5">{megaMenuData.leftColumn.header}</h3>
                        <p className="text-[14px] font-semibold text-slate-800 leading-snug">{megaMenuData.leftColumn.subHeader}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {megaMenuData.leftColumn.items.map((item, idx) => (
                          <div key={idx} className="group relative hover:z-[60]">
                            <Link href={item.href} onClick={handleLinkClick} className="flex items-start p-3 hover:bg-slate-50 rounded-xl transition-colors">
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                  <item.icon className="w-4 h-4" />
                                </div>
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-[14.5px] font-bold text-slate-900 group-hover:text-primary transition-colors">
                                    {item.title}
                                  </h4>
                                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                                </div>
                                <p className="mt-0.5 text-[13px] text-slate-500 leading-snug pr-2">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                            
                            {/* Sub items pop up */}
                            {item.subItems && (
                              <div className="absolute left-full top-0 w-[260px] bg-white before:absolute before:inset-y-0 before:-left-8 before:w-8 before:content-[''] rounded-xl shadow-xl border border-slate-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Pilih Layanan:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {item.subItems.map((sub, sIdx) => (
                                    <Link key={sIdx} href={sub.href} onClick={handleLinkClick} className="text-[12px] font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-primary hover:text-white hover:border-primary px-3 py-1.5 rounded-lg transition-colors">
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Middle Column */}
                    <div className="flex flex-col border-r border-slate-100 pr-5 pl-1">
                      <div className="mb-4 px-3">
                        <h3 className="text-[12px] font-bold text-primary tracking-wider uppercase mb-1.5">{megaMenuData.middleColumn.header}</h3>
                        <p className="text-[14px] font-semibold text-slate-800 leading-snug">{megaMenuData.middleColumn.subHeader}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {megaMenuData.middleColumn.items.map((item, idx) => (
                          <div key={idx} className="group relative hover:z-[60]">
                            <Link href={item.href} onClick={handleLinkClick} className="flex items-start p-3 hover:bg-slate-50 rounded-xl transition-colors">
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                  <item.icon className="w-4 h-4" />
                                </div>
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-[14.5px] font-bold text-slate-900 group-hover:text-primary transition-colors">
                                    {item.title}
                                  </h4>
                                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
                                </div>
                                <p className="mt-0.5 text-[13px] text-slate-500 leading-snug pr-2">
                                  {item.description}
                                </p>
                              </div>
                            </Link>

                            {/* Sub items pop up */}
                            {item.subItems && (
                              <div className="absolute left-full top-0 w-[260px] bg-white before:absolute before:inset-y-0 before:-left-8 before:w-8 before:content-[''] rounded-xl shadow-xl border border-slate-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Pilih Layanan:</h5>
                                <div className="flex flex-wrap gap-2">
                                  {item.subItems.map((sub, sIdx) => (
                                    <Link key={sIdx} href={sub.href} onClick={handleLinkClick} className="text-[12px] font-semibold bg-slate-50 border border-slate-200 text-slate-700 hover:bg-primary hover:text-white hover:border-primary px-3 py-1.5 rounded-lg transition-colors">
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col pl-2">
                      <div className="mb-4 px-3">
                        <h3 className="text-[12px] font-bold text-primary tracking-wider uppercase mb-1.5">{megaMenuData.rightColumn.header}</h3>
                        <p className="text-[14px] font-semibold text-slate-800 leading-snug">{megaMenuData.rightColumn.subHeader}</p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        {megaMenuData.rightColumn.items.map((item, idx) => (
                          <Link key={idx} href={item.href} onClick={handleLinkClick} className="group flex items-start p-3 hover:bg-slate-50 rounded-xl transition-colors">
                            <div className="flex-shrink-0 mt-0.5 w-[76px]">
                              <div className="flex items-center justify-center text-[11px] font-black tracking-tight border border-slate-200 rounded overflow-hidden">
                                <span className="bg-white text-slate-800 px-1.5 py-0.5">{item.brandPrefix}</span>
                                <span className="bg-primary text-white px-1.5 py-0.5 flex-1 text-center">{item.brandSuffix}</span>
                              </div>
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="text-[14.5px] font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                                  {item.title}
                                </h4>
                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 ml-2" />
                              </div>
                              <p className="mt-1 text-[13px] text-slate-500 leading-snug">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div
              className="relative"
              ref={toolsDropdownRef}
            >
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className={`flex items-center space-x-1 text-[16px] font-medium transition-colors ${
                  isToolsOpen
                    ? "text-dark font-semibold"
                    : "text-muted hover:text-dark"
                }`}
              >
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isToolsOpen ? "rotate-180" : ""}`} />
              </button>

              {isToolsOpen && (
                <div className="absolute top-full right-0 mt-6 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 py-2 animate-slide-down">
                  <Link href="/cek-nama" onClick={handleLinkClick} className="block px-4 py-2.5 text-[14px] font-medium text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">
                    Cek Nama PT
                  </Link>
                  <Link href="/cek-nama?tab=merek" onClick={handleLinkClick} className="block px-4 py-2.5 text-[14px] font-medium text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">
                    Cek Nama Merek
                  </Link>
                  <Link href="/cek-kbli" onClick={handleLinkClick} className="block px-4 py-2.5 text-[14px] font-medium text-slate-700 hover:text-primary hover:bg-slate-50 transition-colors">
                    Cek KBLI
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/artikel"
              onClick={handleLinkClick}
              className={`text-[16px] font-medium transition-colors ${
                pathname.startsWith("/artikel")
                  ? "text-dark font-semibold"
                  : "text-muted hover:text-dark"
              }`}
            >
              Artikel
            </Link>

            <Link
              href="/testimoni"
              onClick={handleLinkClick}
              className={`text-[16px] font-medium transition-colors ${
                pathname === "/testimoni"
                  ? "text-dark font-semibold"
                  : "text-muted hover:text-dark"
              }`}
            >
              Testimoni
            </Link>

            <Link
              href="/tentang-kami"
              onClick={handleLinkClick}
              className={`text-[16px] font-medium transition-colors ${
                pathname === "/tentang-kami"
                  ? "text-dark font-semibold"
                  : "text-muted hover:text-dark"
              }`}
            >
              Tentang Kami
            </Link>

            <Link
              href="/kontak"
              onClick={handleLinkClick}
              className={`text-[16px] font-medium transition-colors ${
                pathname === "/kontak"
                  ? "text-dark font-semibold"
                  : "text-muted hover:text-dark"
              }`}
            >
              Kontak
            </Link>
          </div>

          {/* Desktop CTAs - Right */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai legalitas bisnis.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-primary rounded-full text-[16px] font-bold text-white hover:bg-primary-hover shadow-sm hover:shadow transition-all duration-200"
            >
              Konsultasi Gratis
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-muted hover:text-dark p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div ref={mobileDrawerRef} className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-40 animate-slide-down max-h-[85vh] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link
              href="/home-gads"
              onClick={handleLinkClick}
              className={`block px-3 py-2.5 rounded-lg text-[16px] font-medium ${
                pathname === "/" || pathname === "/home-gads"
                  ? "bg-primary-light text-primary font-semibold"
                  : "text-muted hover:bg-bg-light hover:text-dark"
              }`}
            >
              Home
            </Link>

{/* Services accordion */}
            <div >
              <button
                onClick={() => setIsLayananOpen(!isLayananOpen)}
                className="w-full flex justify-between items-center px-3 py-2.5 text-[16px] font-medium text-muted hover:text-dark"
              >
                <span>Layanan</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isLayananOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLayananOpen && (
                <div className="pl-4 pr-2 mt-1 py-1 bg-bg-light/50 rounded-lg space-y-4 max-h-[60vh] overflow-y-auto">
                  
                  {/* Left Column */}
                  <div className="space-y-2 pt-2">
                    <div className="px-3 py-1 text-[12px] font-bold text-primary uppercase tracking-wider">
                      {megaMenuData.leftColumn.header}
                    </div>
                    <div className="space-y-1">
                      {megaMenuData.leftColumn.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                          {item.subItems ? (
                            <details className="group">
                              <summary className="flex items-center justify-between px-3 py-2 text-[14px] font-semibold text-dark group-open:text-primary cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:text-primary active:bg-slate-50 rounded-lg">
                                <div className="flex items-center">
                                  <item.icon className="w-4 h-4 mr-2 text-primary opacity-80 flex-shrink-0" />
                                  <span>{item.title}</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-400 group-open:text-primary group-open:rotate-180 transition-transform" />
                              </summary>
                              <div className="flex flex-col pl-9 pr-3 pb-2 space-y-2 mt-1">
                                {item.subItems.map((sub, sIdx) => (
                                  <Link key={sIdx} href={sub.href} onClick={handleLinkClick} className="text-[13px] text-slate-600 hover:text-primary">
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </details>
                          ) : (
                            <Link href={item.href} onClick={handleLinkClick} className="flex items-center px-3 py-2 text-[14px] font-semibold text-dark hover:text-primary">
                              <item.icon className="w-4 h-4 mr-2 text-primary opacity-80 flex-shrink-0" />
                              <span>{item.title}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Middle Column */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="px-3 py-1 text-[12px] font-bold text-primary uppercase tracking-wider">
                      {megaMenuData.middleColumn.header}
                    </div>
                    <div className="space-y-1">
                      {megaMenuData.middleColumn.items.map((item, idx) => (
                        <div key={idx} className="flex flex-col">
                          {item.subItems ? (
                            <details className="group">
                              <summary className="flex items-center justify-between px-3 py-2 text-[14px] font-semibold text-dark group-open:text-primary cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:text-primary active:bg-slate-50 rounded-lg">
                                <div className="flex items-center">
                                  <item.icon className="w-4 h-4 mr-2 text-primary opacity-80 flex-shrink-0" />
                                  <span>{item.title}</span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-400 group-open:text-primary group-open:rotate-180 transition-transform" />
                              </summary>
                              <div className="flex flex-col pl-9 pr-3 pb-2 space-y-2 mt-1">
                                {item.subItems.map((sub, sIdx) => (
                                  <Link key={sIdx} href={sub.href} onClick={handleLinkClick} className="text-[13px] text-slate-600 hover:text-primary">
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </details>
                          ) : (
                            <Link href={item.href} onClick={handleLinkClick} className="flex items-center px-3 py-2 text-[14px] font-semibold text-dark hover:text-primary">
                              <item.icon className="w-4 h-4 mr-2 text-primary opacity-80 flex-shrink-0" />
                              <span>{item.title}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="px-3 py-1 text-[12px] font-bold text-primary uppercase tracking-wider">
                      {megaMenuData.rightColumn.header}
                    </div>
                    <div className="space-y-1">
                      {megaMenuData.rightColumn.items.map((item, idx) => (
                        <Link key={idx} href={item.href} onClick={handleLinkClick} className="flex items-start px-3 py-2 text-[14px] font-semibold text-dark hover:text-primary">
                          <span className="text-[10px] font-black tracking-tight border border-slate-200 rounded overflow-hidden mr-2.5 mt-0.5 flex-shrink-0 flex">
                            <span className="bg-white text-slate-800 px-1 py-0.5">{item.brandPrefix}</span>
                            <span className="bg-primary text-white px-1 py-0.5">{item.brandSuffix}</span>
                          </span>
                          <span className="leading-snug">{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>


{/* Tools accordion */}
            <div >
              <button
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                className="w-full flex justify-between items-center px-3 py-2.5 text-[16px] font-medium text-muted hover:text-dark"
              >
                <span>Tools</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isToolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isToolsOpen && (
                <div className="pl-4 pr-2 mt-1 py-1 bg-bg-light/50 rounded-lg space-y-1">
                  <Link href="/cek-nama" onClick={handleLinkClick} className="block px-3 py-2 text-[14px] font-semibold text-dark hover:text-primary">
                    Cek Nama PT
                  </Link>
                  <Link href="/cek-nama?tab=merek" onClick={handleLinkClick} className="block px-3 py-2 text-[14px] font-semibold text-dark hover:text-primary">
                    Cek Nama Merek
                  </Link>
                  <Link href="/cek-kbli" onClick={handleLinkClick} className="block px-3 py-2 text-[14px] font-semibold text-dark hover:text-primary">
                    Cek KBLI
                  </Link>
                </div>
              )}
            </div>

            
            {[
              { name: "Artikel", href: "/artikel" },
              { name: "Testimoni", href: "/testimoni" },
              { name: "Tentang Kami", href: "/tentang-kami" },
              { name: "Kontak", href: "/kontak" },
            ].map((item) => {
              const isActive =
                item.href === "/home-gads"
                  ? (pathname === "/" || pathname === "/home-gads")
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`block px-3 py-2.5 rounded-lg text-[16px] font-medium ${
                    isActive
                      ? "bg-primary-light text-primary font-semibold"
                      : "text-muted hover:bg-bg-light hover:text-dark"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

                        <div className="border-t border-border pt-4 mt-4 flex flex-col space-y-3 px-3">
              <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi gratis mengenai legalitas bisnis saya.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full text-center py-2.5 bg-primary rounded-full text-[16px] font-bold text-white hover:bg-primary-hover transition-colors duration-200"
              >
                Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
