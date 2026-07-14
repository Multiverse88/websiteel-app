"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShieldCheck, Activity, Zap, Lock, Phone } from "lucide-react";
import type { ArticleItem } from "./InformasiHukumSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage({ articles }: { articles?: ArticleItem[] }) {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Scrubbing Text Reveal
    const splitText = gsap.utils.toArray(".scrub-text");
    splitText.forEach((text: any) => {
      gsap.fromTo(
        text,
        { opacity: 0.1 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          }
        }
      );
    });

    // Image Scale & Fade Scroll
    gsap.utils.toArray(".scale-img").forEach((img: any) => {
      gsap.fromTo(img,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 90%",
          }
        }
      );
    });
  }, { scope: container });

  return (
    <main ref={container} className="overflow-x-hidden w-full max-w-full bg-white text-gray-900 selection:bg-red-100 selection:text-red-900 font-sans">
      {/* Navigation (Floating Glass Pill) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-white/80 backdrop-blur-xl rounded-full border border-gray-200 flex items-center gap-12 shadow-sm">
        <div className="font-bold text-xl tracking-tight text-gray-900 flex items-center gap-2">
          <span className="w-7 h-7 rounded-md bg-[#990202] text-white flex items-center justify-center text-[11px]">EL</span>
          EasyLegal
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
          <Link href="#services" className="hover:text-gray-900 transition-colors">Services</Link>
          <Link href="#metrics" className="hover:text-gray-900 transition-colors">Metrics</Link>
          <Link href="#articles" className="hover:text-gray-900 transition-colors">Insights</Link>
        </div>
        <Link href="/dashboard" className="px-5 py-2.5 bg-[#990202] text-white rounded-full text-sm font-bold hover:scale-105 transition-transform duration-300 shadow-md shadow-red-900/20">
          Client Portal
        </Link>
      </nav>

      {/* ATTENTION: Hero Architecture (Cinematic Asymmetry) */}
      <section className="relative min-h-[95vh] flex items-center pt-40 pb-24 px-8 lg:px-16 overflow-hidden">
        {/* Deep Radial Blur Background */}
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-red-500/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8">
            <h1 className="text-[clamp(3.5rem,7vw,7rem)] leading-[0.9] font-extrabold tracking-tighter">
              Legalitas Bisnis <br />
              <span className="text-[#990202]">Tanpa Friksi.</span>
            </h1>
            <p className="mt-10 text-2xl text-gray-500 max-w-2xl leading-relaxed">
              Infrastruktur legal untuk perusahaan modern di Indonesia. Skala penuh, transparan, dan terotomatisasi.
            </p>
            <div className="mt-14 flex items-center gap-6">
              <Link href="/pendirian-badan-usaha" className="px-10 py-5 bg-[#990202] text-white font-bold rounded-full text-lg hover:scale-105 transition-transform duration-700 ease-out shadow-xl shadow-red-900/20">
                Mulai Pendirian
              </Link>
              <Link href="/konsultasi" className="px-10 py-5 border border-gray-200 bg-white text-gray-900 font-bold rounded-full text-lg hover:bg-gray-50 transition-colors duration-700 shadow-sm">
                Jadwalkan Demo
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 relative hidden lg:block">
            <div className="w-full aspect-[3/4] rounded-3xl overflow-hidden scale-img bg-gray-100">
              <img src="https://picsum.photos/seed/legaltech/800/1200" alt="Tech" className="w-full h-full object-cover opacity-90 contrast-125" />
            </div>
            {/* Overlapping Floating Element */}
            <div className="absolute -bottom-8 -left-16 bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl backdrop-blur-md">
              <div className="text-xs text-gray-400 font-mono mb-2 tracking-widest uppercase">Live Metrics</div>
              <div className="text-4xl font-mono text-[#990202] font-bold">1,402+</div>
              <div className="text-sm font-medium text-gray-900 mt-1">Perusahaan Aktif</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="w-full overflow-hidden py-16 border-y border-red-100 bg-red-50 flex whitespace-nowrap mt-12">
        <div className="animate-marquee inline-block font-mono text-3xl text-[#990202]/30 uppercase font-bold tracking-widest">
          &nbsp;&bull; PENDIRIAN PT &bull; LEGALITAS BISNIS &bull; IZIN USAHA &bull; HAKI &bull; PERJANJIAN KONTRAK &bull; NIB OSS &bull; VIRTUAL OFFICE 
          &nbsp;&bull; PENDIRIAN PT &bull; LEGALITAS BISNIS &bull; IZIN USAHA &bull; HAKI &bull; PERJANJIAN KONTRAK &bull; NIB OSS &bull; VIRTUAL OFFICE 
        </div>
      </div>

      {/* INTEREST: Gapless Bento Grid */}
      <section id="services" className="py-32 md:py-48 px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-[clamp(3rem,6vw,6rem)] leading-[0.95] font-bold mb-20 tracking-tighter max-w-4xl">
          Arsitektur Layanan <br className="hidden md:block"/>
          <span className="text-gray-400">Dirancang Untuk Skala.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-6 grid-flow-dense">
          {/* Card 1: col-span-2 row-span-2 */}
          <div className="md:col-span-2 md:row-span-2 bg-white rounded-[2rem] border border-gray-200 shadow-sm p-12 flex flex-col justify-between group overflow-hidden relative">
            <div className="relative z-10">
              <ShieldCheck className="w-14 h-14 text-[#990202] mb-8" />
              <h3 className="text-4xl font-bold mb-4 tracking-tight">Pendirian Badan Usaha</h3>
              <p className="text-gray-500 text-xl max-w-sm leading-relaxed">Proses pendirian PT, CV, dan Yayasan end-to-end tanpa hambatan birokrasi.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img src="https://picsum.photos/seed/building/1000/1000" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover mix-blend-overlay opacity-5 group-hover:scale-105 group-hover:opacity-10 transition-all duration-700 ease-out" alt="" />
          </div>

          {/* Card 2: col-span-2 row-span-1 */}
          <div className="md:col-span-2 md:row-span-1 bg-white rounded-[2rem] border border-gray-200 shadow-sm p-10 flex items-center gap-10 group overflow-hidden relative">
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-3 tracking-tight">Registrasi HAKI</h3>
              <p className="text-gray-500 text-lg">Amankan aset kekayaan intelektual perusahaan Anda secara global.</p>
            </div>
            <div className="w-20 h-20 shrink-0 rounded-full bg-red-50 border border-red-100 flex items-center justify-center group-hover:border-[#990202] transition-colors duration-500">
              <Lock className="w-8 h-8 text-[#990202]" />
            </div>
          </div>

          {/* Card 3: col-span-1 row-span-1 */}
          <div className="md:col-span-1 md:row-span-1 bg-[#990202] rounded-[2rem] p-10 flex flex-col justify-between group overflow-hidden hover:scale-[1.02] transition-transform duration-500 shadow-xl shadow-red-900/20">
            <Activity className="w-10 h-10 text-white mb-4" />
            <div>
              <div className="text-white/70 text-xs font-mono font-bold mb-2 tracking-widest uppercase">Client Portal</div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Monitor Progress</h3>
            </div>
          </div>

          {/* Card 4: col-span-1 row-span-1 */}
          <div className="md:col-span-1 md:row-span-1 bg-white rounded-[2rem] border border-gray-200 shadow-sm p-10 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Zap className="w-10 h-10 text-gray-400 mb-4 group-hover:text-[#990202] transition-colors relative z-10" />
            <h3 className="text-2xl font-bold tracking-tight relative z-10 group-hover:text-[#990202] transition-colors">Fast Track <br/>NIB OSS</h3>
          </div>
        </div>
      </section>

      {/* DESIRE: GSAP Scrubbing Text */}
      <section className="py-40 md:py-64 px-8 bg-gray-50 flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-red-500/5 blur-[200px] pointer-events-none" />
        <div className="max-w-6xl relative z-10">
          <p className="text-[clamp(2.5rem,5vw,6rem)] leading-[1.1] font-bold tracking-tighter text-gray-900">
            <span className="scrub-text block opacity-20">Kami tidak sekadar mengurus izin.</span>
            <span className="scrub-text block opacity-20">Kami merekayasa fondasi hukum </span>
            <span className="scrub-text block opacity-20">yang tidak bisa dipatahkan,</span>
            <span className="scrub-text block text-[#990202] opacity-20">agar bisnis Anda bisa melaju kencang.</span>
          </p>
        </div>
      </section>

      {/* ACTION: Massive Footer CTA */}
      <section className="py-32 px-8 lg:px-16 max-w-7xl mx-auto border-t border-gray-100">
        <div className="bg-white rounded-[3rem] p-16 md:p-32 text-center border border-gray-200 shadow-xl relative overflow-hidden group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent pointer-events-none group-hover:from-red-500/10 transition-colors duration-1000" />
          <h2 className="text-[clamp(3.5rem,7vw,7rem)] font-bold leading-none mb-10 relative z-10 tracking-tighter text-gray-900">
            Siap Berakselerasi?
          </h2>
          <p className="text-2xl text-gray-500 max-w-3xl mx-auto mb-16 relative z-10 leading-relaxed">
            Dapatkan konsultasi gratis dengan pakar hukum korporat kami. Tanpa komitmen, murni solusi strategis.
          </p>
          <Link href="/konsultasi" className="inline-flex items-center gap-3 px-12 py-6 bg-[#990202] text-white font-extrabold rounded-full text-xl hover:scale-105 transition-transform duration-500 relative z-10 shadow-xl shadow-red-900/20">
            <Phone className="w-6 h-6" />
            Mulai Konsultasi Sekarang
          </Link>
        </div>
        
        <footer className="mt-32 pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-gray-500">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <span className="w-6 h-6 rounded bg-[#990202] text-white flex items-center justify-center text-[10px]">EL</span>
            EasyLegal
          </div>
          <div className="text-sm mt-6 md:mt-0">&copy; 2026 EasyLegal Indonesia. Hak Cipta Dilindungi.</div>
          <div className="flex gap-8 mt-6 md:mt-0 text-sm font-medium">
            <Link href="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">System Status</Link>
          </div>
        </footer>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </main>
  );
}
