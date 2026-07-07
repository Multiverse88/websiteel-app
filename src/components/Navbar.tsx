"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [isPendirianOpen, setIsPendirianOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
    const handleOpenPendirian = () => {
      setIsLayananOpen(true);
      setIsPendirianOpen(true);
    };
    window.addEventListener("open-pendirian", handleOpenPendirian);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-pendirian", handleOpenPendirian);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const services = [
    { name: "Merek & HAKI", desc: "Pendaftaran Merek & HAKI DJKI", href: "/layanan/merek-haki" },
    {
      name: "Pendirian Badan Usaha",
      desc: "Pendirian PT, CV, Yayasan, dsb",
      href: "/layanan/pendirian-badan-usaha",
      sublinks: [
        { name: "PT", href: "/layanan/pendirian-badan-usaha/pt" },
        { name: "CV", href: "/layanan/pendirian-badan-usaha/cv" },
        { name: "PT PMA", href: "/layanan/pendirian-badan-usaha/pt-pma" },
        { name: "PT Perorangan", href: "/layanan/pendirian-badan-usaha/pt-perorangan" },
        { name: "Firma", href: "/layanan/pendirian-badan-usaha/firma" },
        { name: "Yayasan", href: "/layanan/pendirian-badan-usaha/yayasan" },
        { name: "Perkumpulan", href: "/layanan/pendirian-badan-usaha/perkumpulan" },
        { name: "Koperasi", href: "/layanan/pendirian-badan-usaha/koperasi" },
      ],
    },
    { name: "NIB & OSS", desc: "NIB, OSS RBA & Perizinan Usaha", href: "/layanan/nib-oss" },
    { name: "Apostille", desc: "Legalitas dokumen untuk luar negeri", href: "/layanan/apostille" },
    { name: "Sertifikasi ISO", desc: "ISO 9001, 14001, 27001 & lainnya", href: "/layanan/sertifikasi-iso" },
    { name: "Pengajuan PKP", desc: "Pengusaha Kena Pajak", href: "/layanan/pengajuan-pkp" },
    { name: "Visa & KITAS", desc: "Izin Kerja & Visa Bisnis", href: "/layanan/visa-kitas" },
    { name: "PR & Media", desc: "Publikasi Media Online", href: "/layanan/pr-media" },
    { name: "Perjanjian Perkawinan", desc: "Pisah Harta & Perjanjian", href: "/layanan/perjanjian-perkawinan" },
    { name: "Pelaporan LKPM", desc: "Pelaporan LKPM Online", href: "/layanan/pelaporan-lkpm" },
    { name: "Pelaporan RUPS", desc: "RUPS Tahunan & Luar Biasa", href: "/layanan/pelaporan-rups" },
    { name: "Referensi & Reseller", desc: "Program Kemitraan & Komisi", href: "/referral-reseller" },
    { name: "Cek Nama PT", desc: "Cek Ketersediaan Nama PT", href: "/cek-nama" },
  ];


  const handleLinkClick = () => {
    setIsOpen(false);
    setIsLayananOpen(false);
    setIsPendirianOpen(false);
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
            <Image 
              src="/Logo EL.png" 
              alt="EasyLegal Logo" 
              width={150}
              height={52}
              className="h-[52px] w-auto object-contain"
              style={{ height: "52px" }}
              priority
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/home-gads"
              onClick={handleLinkClick}
              className={`text-[14px] font-medium transition-colors ${
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
              onMouseEnter={() => setIsLayananOpen(true)}
              onMouseLeave={() => { setIsLayananOpen(false); setIsPendirianOpen(false); }}
            >
              <button
                onClick={() => setIsLayananOpen(!isLayananOpen)}
                className={`flex items-center space-x-1 text-[14px] font-medium transition-colors ${
                  isLayananOpen
                    ? "text-dark font-semibold"
                    : "text-muted hover:text-dark"
                }`}
              >
                <span>Layanan</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isLayananOpen ? "rotate-180" : ""}`} />
              </button>

              {isLayananOpen && (
                <div className="absolute top-full -left-20 w-[560px] mt-0 pt-3 bg-transparent animate-slide-down">
                  <div className="bg-white rounded-xl shadow-xl shadow-sm border border-black/[0.03] p-5 grid grid-cols-2 gap-1">
                    {services.map((item, idx) => 
                      "sublinks" in item ? (
                        <div
                          key={idx}
                          className="relative"
                        >
                          <button
                            onClick={() => setIsPendirianOpen(!isPendirianOpen)}
                            className="flex items-start p-3 rounded-lg hover:bg-primary-light transition-colors w-full text-left"
                          >
                            <div className="h-2 w-2 rounded-full bg-primary/30 mt-1.5 mr-3 transition-colors flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-bold text-dark transition-colors">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-muted mt-0.5 line-clamp-1">
                                {item.desc}
                              </div>
                            </div>
                            <ChevronRight className={`w-4 h-4 text-muted/40 flex-shrink-0 self-center ml-2 transition-all duration-200 ${isPendirianOpen ? "rotate-180 translate-x-0.5 text-primary/60" : ""}`} />
                          </button>
                          {isPendirianOpen && (
                            <div className="absolute left-full top-0 ml-2 bg-transparent">
                              <div className="bg-white rounded-xl shadow-xl shadow-sm border border-black/[0.03] p-3 min-w-[200px]">
                                {item.sublinks!.map((sub, subIdx) => (
                                  <Link
                                    key={subIdx}
                                    href={sub.href}
                                    onClick={handleLinkClick}
                                    className="block px-3 py-2 text-[13px] font-medium text-muted hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={handleLinkClick}
                          className="group flex items-start p-3 rounded-lg hover:bg-primary-light transition-colors"
                        >
                          <div className="h-2 w-2 rounded-full bg-primary/30 group-hover:bg-primary mt-1.5 mr-3 transition-colors flex-shrink-0" />
                          <div>
                            <div className="text-[13px] font-bold text-dark group-hover:text-primary transition-colors">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-muted mt-0.5 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/cek-kbli"
              onClick={handleLinkClick}
              className="text-[14px] font-medium text-muted hover:text-dark transition-colors"
            >
              Cek KBLI
            </Link>

            <Link
              href="/layanan/virtual-office"
              onClick={handleLinkClick}
              className="text-[14px] font-medium text-muted hover:text-dark transition-colors"
            >
              Virtual Office
            </Link>

            <Link
              href="/artikel"
              onClick={handleLinkClick}
              className={`text-[14px] font-medium transition-colors ${
                pathname.startsWith("/artikel")
                  ? "text-dark font-semibold"
                  : "text-muted hover:text-dark"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/testimoni"
              onClick={handleLinkClick}
              className={`text-[14px] font-medium transition-colors ${
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
              className={`text-[14px] font-medium transition-colors ${
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
              className={`text-[14px] font-medium transition-colors ${
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
            <Link
              href="/cek-nama"
              className="px-5 py-2.5 border border-dark rounded-full text-[14px] font-bold text-dark hover:bg-dark hover:text-white transition-all duration-200"
            >
              Cek Nama PT
            </Link>
            <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai legalitas bisnis.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-primary rounded-full text-[14px] font-bold text-white hover:bg-primary-hover shadow-sm hover:shadow transition-all duration-200"
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-40 animate-slide-down max-h-[85vh] overflow-y-auto">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {[
              { name: "Home", href: "/home-gads" },
              { name: "Cek KBLI", href: "/cek-kbli" },
              { name: "Virtual Office", href: "/layanan/virtual-office" },
              { name: "Blog", href: "/artikel" },
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
                  className={`block px-3 py-2.5 rounded-lg text-[15px] font-medium ${
                    isActive
                      ? "bg-primary-light text-primary font-semibold"
                      : "text-muted hover:bg-bg-light hover:text-dark"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Services accordion */}
            <div className="border-t border-border pt-2 mt-2">
              <button
                onClick={() => setIsLayananOpen(!isLayananOpen)}
                className="w-full flex justify-between items-center px-3 py-2.5 text-[15px] font-medium text-muted hover:text-dark"
              >
                <span>Layanan</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isLayananOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLayananOpen && (
                <div className="pl-4 pr-2 mt-1 py-1 bg-bg-light/50 rounded-lg grid grid-cols-1 gap-0.5">
                  {services.map((item, idx) =>
                    "sublinks" in item ? (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex items-center px-3 py-1.5">
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className="text-[13px] font-bold text-muted hover:text-primary flex-1"
                          >
                            {item.name}
                          </Link>
                          <ChevronRight className="w-3.5 h-3.5 text-muted/40 flex-shrink-0" />
                        </div>
                        <div className="pl-4 border-l-2 border-primary/20 ml-3 space-y-0.5">
                          {item.sublinks!.map((sub, subIdx) => (
                            <Link
                              key={subIdx}
                              href={sub.href}
                              onClick={handleLinkClick}
                              className="block px-3 py-1 text-[12px] font-medium text-muted hover:text-primary"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block px-3 py-1.5 text-[13px] font-medium text-muted hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-border pt-4 mt-4 flex flex-col space-y-3 px-3">
              <Link
                href="/cek-nama"
                onClick={handleLinkClick}
                className="w-full text-center py-2.5 border border-dark rounded-full text-[14px] font-bold text-dark hover:bg-dark hover:text-white transition-colors duration-200"
              >
                Cek Nama PT
              </Link>
              <a
              href={getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi gratis mengenai legalitas bisnis saya.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full text-center py-2.5 bg-primary rounded-full text-[14px] font-bold text-white hover:bg-primary-hover transition-colors duration-200"
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
