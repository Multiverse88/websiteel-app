"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const services = [
    { name: "Pendirian Badan Usaha", desc: "Pendirian PT, CV, Yayasan, dll", href: "/layanan/pendirian-badan-usaha" },
    { name: "Pendirian Yayasan", desc: "Pendirian Yayasan Sosial & Keagamaan", href: "/layanan/pendirian-yayasan" },
    { name: "Merek & HAKI", desc: "Pendaftaran Merek & HAKI DJKI", href: "/layanan/merek-haki" },
    { name: "NIB & OSS", desc: "NIB, OSS RBA & Perizinan Usaha", href: "/layanan/nib-oss" },
    { name: "Pengajuan PKP", desc: "Pengusaha Kena Pajak", href: "/layanan/pengajuan-pkp" },
    { name: "Visa & KITAS", desc: "Izin Kerja & Visa Bisnis", href: "/layanan/visa-kitas" },
    { name: "PR & Media", desc: "Publikasi Media Online", href: "/layanan/pr-media" },
    { name: "Perjanjian Perkawinan", desc: "Pisah Harta & Perjanjian", href: "/layanan/perjanjian-perkawinan" },
    { name: "Pelaporan LKPM", desc: "Pelaporan LKPM Online", href: "/layanan/pelaporan-lkpm" },
    { name: "Virtual Office", desc: "Alamat Bisnis Strategis & Legal", href: "/layanan/virtual-office" },
    { name: "Referral & Reseller", desc: "Program Kemitraan & Komisi", href: "/referral-reseller" },
    { name: "Cek Nama PT", desc: "Cek Ketersediaan Nama PT", href: "/cek-nama" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsLayananOpen(false);
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
            className="flex items-center space-x-2 group flex-shrink-0"
          >
            {/* Red rounded square icon cropped from Logo EL.png */}
            <div className="w-[38px] h-[32px] overflow-hidden rounded-[8px] relative flex items-center justify-center">
              <img 
                src="/Logo EL.png" 
                alt="EL Icon" 
                className="absolute w-[160%] h-[160%] max-w-none object-cover" 
                style={{ objectPosition: "center 22%" }}
              />
            </div>
            <div className="flex items-baseline">
              <span className="text-[14.5px] font-black text-[#D62828] tracking-tight">easy</span>
              <span className="text-[14.5px] font-black text-[#111827] tracking-tight">legal</span>
            </div>
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
              onMouseLeave={() => setIsLayananOpen(false)}
            >
              <button
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
                  <div className="bg-white rounded-xl shadow-xl border border-border/60 p-5 grid grid-cols-2 gap-1">
                    {services.map((item, idx) => (
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
                    ))}
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
              href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20konsultasi%20mengenai%20legalitas%20bisnis."
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
                  {services.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block px-3 py-1.5 text-[13px] font-medium text-muted hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
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
                href="https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20ingin%20konsultasi%20mengenai%20legalitas%20bisnis."
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
