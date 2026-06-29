import React from "react";
import Link from "next/link";
import Image from "next/image";
import Testimonials from "@/components/home/Testimonials";
import { Star, ArrowRight, Home } from "lucide-react";

export default function TestimoniPage() {
  const stats = [
    { value: "4.9/5", label: "Rating Google" },
    { value: "500+", label: "Review positif" },
    { value: "11.000+", label: "Bisnis terlayani" },
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
              <nav className="flex items-center space-x-2 text-[11px] sm:text-[13px] font-medium text-gray-500">
                <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Beranda</span>
                </Link>
                <span className="text-gray-300 font-normal">&gt;</span>
                <span className="text-[11px] sm:text-[13px] font-bold text-gray-900">Testimoni</span>
              </nav>

              <div className="inline-flex items-center space-x-2 bg-[#FFF5F5] py-1 px-3 sm:py-1.5 sm:px-3.5 rounded-full border border-red-100 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#990202]" />
                <span className="text-[10px] sm:text-[12.5px] font-bold text-[#990202] tracking-wide">Testimoni</span>
              </div>

              <h1 className="font-heading text-[26px] sm:text-[52px] lg:text-[56px] font-extrabold text-gray-950 leading-[1.2] sm:leading-[1.12] tracking-tight">
                Apa kata{" "}
                <span className="relative inline-block text-[#990202] px-2 py-0.5 bg-red-500/5 rounded-lg border border-red-100/40">
                  11.000+ pengusaha
                </span>{" "}
                tentang kami.
              </h1>

              <p className="text-[13px] sm:text-[18px] text-gray-600 leading-relaxed max-w-2xl font-normal">
                Dari UMKM kuliner hingga startup teknologi — semuanya percaya EasyLegal untuk urusan legalitas bisnis mereka.
              </p>

              <div className="flex flex-row gap-3 pt-2">
                <Link
                  href="/kontak"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 sm:px-7 py-3 sm:py-4 bg-[#990202] text-white font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-[#800000] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
                >
                  <span>Konsultasi Gratis</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 sm:ml-2" />
                </Link>
                <Link
                  href="/"
                  className="flex-1 sm:flex-initial px-4 sm:px-7 py-3 sm:py-4 shadow-md border border-black/[0.04] text-gray-800 font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 text-center shadow-sm"
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
                    <div className="text-[14px] sm:text-[20px] font-black text-[#990202] leading-none">4.9 / 5</div>
                    <div className="text-[9px] sm:text-[12px] text-[#990202]/85 font-bold mt-1">Rating Google</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── 3. STATS ROW ─── */}
      <section className="bg-white py-8 sm:py-14 border-b border-border/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-1 sm:space-y-2 py-4 sm:py-6 shadow-sm border border-black/[0.03] rounded-2xl bg-bg-light transition-all duration-300 hover:border-red-100 hover:shadow-md">
                <div className="text-[26px] sm:text-[44px] font-extrabold text-[#990202] tracking-tight">{stat.value}</div>
                <div className="text-[10px] sm:text-[13.5px] font-bold text-[#990202]/85">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#990202] py-10 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 text-left sm:text-center">
          <h2 className="text-[20px] sm:text-[38px] font-extrabold text-white leading-[1.25] sm:leading-tight mb-3 sm:mb-4">
            Siap bergabung dengan 11.000+ pengusaha lainnya?
          </h2>
          <p className="text-[12.5px] sm:text-[16px] text-red-100 max-w-[560px] sm:mx-auto mb-6 sm:mb-8 font-medium">
            Konsultasi gratis sekarang. Tim legal kami siap membantu Anda dari awal hingga selesai.
          </p>
          <div className="flex flex-row sm:flex-row gap-3 justify-start sm:justify-center">
            <Link
              href="/kontak"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 bg-white text-[#990202] font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-gray-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              <span>Konsultasi Gratis</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 sm:ml-2" />
            </Link>
            <Link
              href="/"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 sm:px-8 py-3 sm:py-4 border-2 border-white/40 text-white font-bold text-[12px] sm:text-[15px] rounded-xl hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 text-center"
            >
              Lihat Layanan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
