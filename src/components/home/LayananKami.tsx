import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Check, Users } from "lucide-react";
import { layananIndividual } from "./data";

export default function LayananKami() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add("layanan-revealed");
        obs.unobserve(el);
      }
    }, { rootMargin: "0px 0px -15% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      className="py-20 bg-white" 
      id="layanan"
      ref={sectionRef}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[10.5px] font-bold text-primary uppercase tracking-[0.15em]">
            Solusi EasyLegal
          </span>
          <h2 className="text-[34px] sm:text-[40px] font-extrabold text-dark mt-2 tracking-tight leading-[1.1]">
            Temukan layanan legal yang<br />paling tepat untuk bisnis Anda.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
          {/* LEFT: Layanan Individual */}
          <div className="border border-border/80 rounded-2xl p-6">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0">
                <span className="text-[13px] text-primary font-bold leading-none">⊞</span>
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-dark leading-tight">Layanan Individual</h3>
                <p className="text-[11px] text-muted leading-tight mt-0.5">Layanan siap pakai untuk berbagai kebutuhan legalitas bisnis</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {layananIndividual.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="group layanan-card rounded-2xl p-5 hover:shadow-md shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden"
                    style={{
                      minHeight: "175px",
                      background: `linear-gradient(180deg, #ffffff 30%, ${item.cardTint} 100%)`,
                    }}
                  >
                    <div>
                      <h4 className="text-[13.5px] font-bold text-dark leading-snug">{item.name}</h4>
                      <p className="text-[11px] text-muted mt-0.5 leading-snug">{item.desc}</p>
                    </div>

                    <div className="flex justify-center mt-4">
                      <div
                        className="w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: `${item.cardTint}` }}
                      >
                        <div
                          className="w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-md"
                          style={{ backgroundColor: item.circleBg }}
                        >
                          <Icon className="w-[22px] h-[22px] text-white" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Solusi Korporat */}
          <div
            className="rounded-2xl p-6 flex flex-col border border-black/[0.06]"
            style={{ 
              background: "radial-gradient(100% 100% at 100% 0%, #FFE2E2 0%, transparent 50%), radial-gradient(80% 80% at 100% 100%, #FFF6DA 0%, transparent 50%), #FFFCFC" 
            }}
          >
            <div className="flex items-start gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-[18px] h-[18px] text-primary" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[17px] font-extrabold text-dark leading-tight">Solusi Korporat</h3>
                <p className="text-[11.5px] text-muted leading-snug mt-0.5">
                  Dirancang untuk kebutuhan perusahaan & partnership B2B
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-border/60 mb-5 self-start">
              <div className="w-6 h-5 overflow-hidden rounded-[4px] relative flex items-center justify-center">
                <Image 
                  src="/Logo EL.png" 
                  alt="EL Icon" 
                  fill
                  sizes="24px"
                  className="object-cover scale-150" 
                  style={{ objectPosition: "center 22%" }}
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[12.5px] font-extrabold text-[#D62828] tracking-tight">Easy</span>
                <span className="text-[12.5px] font-bold text-[#111827] tracking-tight">Legal</span>
              </div>
              <div className="w-px h-3.5 bg-border mx-1" />
              <span className="text-[9px] font-bold text-dark/40 uppercase tracking-[0.15em]">CORPORATE</span>
            </div>

            <p className="text-[13px] text-muted leading-relaxed mb-5">
              Solusi kustom oleh tim partnership EasyLegal yang dirancang sesuai kebutuhan korporasi — dari volume tinggi, integrasi sistem, sampai dedicated support.
            </p>

            <ul className="space-y-3 mb-6">
              {[
                "Alur kerja & integrasi terkustomisasi",
                "Dedicated Account Manager & MOU resmi",
                "Volume discount & branded partner portal",
                "Priority processing & co-marketing support",
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13px] text-dark/85">
                  <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#16A34A]" strokeWidth={3} />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/kontak"
              className="inline-flex items-center justify-center px-7 py-3 bg-primary text-white text-[13.5px] font-bold rounded-xl hover:bg-primary-hover transition-colors self-start shadow-sm hover:shadow-md"
            >
              Pelajari lebih lanjut
            </Link>

            {/* Dashboard mockup */}
            <div className="mt-6 rounded-2xl bg-white border border-border/60 shadow-sm overflow-hidden relative pb-6">
              <div className="bg-[#F5F5F5] px-3.5 py-2.5 flex items-center gap-1.5 border-b border-border/40">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>

              <div className="p-4 space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-24 bg-primary/80 rounded-md flex-shrink-0" />
                  <div className="h-2 bg-dark/15 rounded-full flex-1" />
                </div>
                <div className="h-px bg-border/60" />
                <div className="flex gap-2 pt-1">
                  <div className="flex-1 space-y-1.5">
                    <div className="h-5 bg-primary/15 rounded-md" />
                    <div className="h-2 bg-dark/8 rounded-full w-3/4" />
                    <div className="h-2 bg-dark/8 rounded-full w-1/2" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="h-5 bg-primary/15 rounded-md" />
                    <div className="h-2 bg-dark/8 rounded-full w-3/4" />
                    <div className="h-2 bg-dark/8 rounded-full w-1/2" />
                  </div>
                </div>
                <div className="h-2 bg-dark/6 rounded-full w-2/3 mt-1" />
              </div>

              <div className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow-md border border-border/60 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-muted" strokeWidth={2} />
                <span className="text-[10.5px] font-bold text-dark">50+ Mitra</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1.5 shadow-md border border-border/60 flex items-center gap-1.5">
                <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                <span className="text-[10.5px] font-bold text-dark">MOU Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
