import React from "react";
import Link from "next/link";
import Image from "next/image";
import Testimonials from "@/components/home/Testimonials";
import { Star, ArrowRight, Home } from "lucide-react";

export default function TestimoniPage() {
  const stats = [
    { value: "4.9/5", label: "Rating Google" },
    { value: "500+", label: "Review positif" },
    { value: "12.500+", label: "Bisnis terlayani" },
    { value: "98%", label: "Client puas" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── HERO ─── */}
      <section className="bg-white py-8 sm:py-20 border-b border-border/40 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <nav className="flex items-center space-x-2 text-[16px] sm:text-[16px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[16px] sm:text-[16px] font-bold text-gray-900">Testimoni</span>
              </nav>

              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[16px] sm:text-[16px] font-bold text-[#990202] tracking-wide">Testimoni</span>
              </div>

              <h1 className="font-heading text-[26px] sm:text-[52px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.2] sm:leading-[1.12] tracking-tight">
                Apa kata{" "}
                <span className="relative inline-block text-[#990202] px-2 py-0.5 bg-red-500/5 rounded-lg border border-red-100/40">
                  12.500+ pengusaha
                </span>{" "}
                tentang kami.
              </h1>

              <p className="text-[16px] sm:text-[16px] text-gray-600 leading-relaxed max-w-2xl font-normal">
                Dari UMKM kuliner hingga startup teknologi — semuanya percaya EasyLegal untuk urusan legalitas bisnis mereka.
              </p>

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

            {/* Right */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center mt-8 lg:mt-0">
              <div className="relative w-full max-w-[480px] lg:max-w-none px-4 sm:px-0">
                <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white group aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?fit=crop&w=600&h=800&q=80"
                    alt="Testimoni EasyLegal"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute top-5 right-5 bg-black/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                </div>

                {/* Floating badge: 4.9/5 */}
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

      {/* ─── TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── 3. STATS & CTA UNIFIED SECTION ─── */}
      <section className="relative bg-white py-16 sm:py-24 overflow-hidden border-t border-gray-100">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          {/* STATS ROW */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-24">
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
                  <span>{stat.value}</span>
                </div>
                <div className="relative z-10 text-[16px] sm:text-[16px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="max-w-[1100px] mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D62828] to-[#990202] rounded-[32px] sm:rounded-[48px] blur-xl opacity-20" />
            <div className="relative bg-gradient-to-br from-[#D62828] to-[#990202] border border-red-500/30 rounded-[32px] sm:rounded-[48px] p-10 sm:p-20 shadow-2xl overflow-hidden">
              
              {/* Inner Decorative Elements */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-white/10 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-black/20 to-transparent rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
                <div className="lg:w-3/5 text-center lg:text-left">
                  <h2 className="font-heading text-[30px] sm:text-[44px] lg:text-[50px] font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
                    Siap bergabung dengan <br className="hidden lg:block" />
                    <span className="text-red-100">
                      12.500+ pengusaha
                    </span> lainnya?
                  </h2>
                  <p className="text-[16px] sm:text-[16px] text-white/90 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Ribuan bisnis telah mempercayakan legalitas mereka pada EasyLegal. Kini giliran Anda. Konsultasi gratis sekarang, tanpa komitmen.
                  </p>
                </div>
                
                <div className="lg:w-2/5 flex flex-col w-full sm:w-auto gap-4">
                  <Link
                    href="/kontak"
                    className="w-full inline-flex items-center justify-center px-8 py-4 sm:py-5 bg-white text-[#990202] font-extrabold text-[16px] sm:text-[16px] rounded-2xl hover:bg-red-50 hover:scale-[1.02] shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-300 group"
                  >
                    <span>Konsultasi Gratis</span>
                    <ArrowRight className="w-5 h-5 ml-2.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/"
                    className="w-full inline-flex items-center justify-center px-8 py-4 sm:py-5 border-2 border-white/30 bg-transparent text-white font-bold text-[16px] sm:text-[16px] rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  >
                    Lihat Layanan
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
