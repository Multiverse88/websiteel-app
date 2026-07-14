"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { getWhatsAppLink } from "@/lib/config";
import { trackMetric } from "@/lib/metrics";

interface CTAProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  whatsappLink?: string;
  whatsappText?: string;
  contactLink?: string;
  contactText?: string;
  slaText?: string;
}

export default function CTA({
  title = (
    <h2 className="font-heading text-[20px] sm:text-[38px] font-extrabold text-gray-950 leading-[1.25] sm:leading-tight tracking-tight max-w-[480px]">
      Siap mulai urus legalitas bisnis Anda?
    </h2>
  ),
  description = "Konsultasikan kebutuhan Anda sekarang — gratis, tanpa komitmen. Tim kami akan menjelaskan syarat, timeline, dan biaya yang dibutuhkan.",
  whatsappLink,
  whatsappText = "Konsultasi via WhatsApp",
  contactLink = "/kontak",
  contactText = "Hubungi Tim Kami",
  slaText = "Respons dalam 5 menit · Senin–Sabtu 08.00–20.00",
}: CTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { rootMargin: "-50px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const waLink = whatsappLink || getWhatsAppLink();

  return (
    <section id="footer-cta" className="py-8 sm:py-20 bg-white border-t border-gray-100 overflow-hidden relative">
      <div
        ref={ref}
        className={`max-w-[1240px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        {/* Left Column: Heading & Description */}
        <div className="flex flex-col text-left max-w-xl">
          {title}
          <div className="text-[11.5px] sm:text-[14.5px] text-gray-500 leading-relaxed mt-2.5 sm:mt-4 max-w-[460px] font-normal">
            {description}
          </div>
        </div>

        {/* Right Column: CTA Buttons & SLA subtext */}
        <div className="flex flex-col items-start w-full lg:w-[380px] flex-shrink-0">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMetric("whatsapp_click", 1, { source: "cta" })}
            className="w-full bg-[#990202] hover:bg-[#800000] text-white font-extrabold py-2.5 sm:py-3.5 px-6 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 text-[11px] sm:text-[14px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.022-.079-.186-.208-.432-.332-.246-.123-1.455-.717-1.68-.8-.223-.082-.387-.122-.55.122-.165.245-.64.8-.787.969-.147.17-.294.19-.54.067-.244-.124-.992-.367-1.89-1.168-.698-.622-1.17-1.392-1.307-1.637-.136-.246-.015-.379.108-.501.112-.11.246-.287.37-.43.123-.14.164-.24.246-.4.082-.162.04-.303-.02-.427-.06-.124-.55-1.324-.752-1.815-.197-.474-.397-.41-.547-.418-.14-.008-.302-.008-.464-.008-.14-.008-.302-.008-.464-.008-.162 0-.427.06-.65.3-.224.24-.854.83-.854 2.03 0 1.201.874 2.36 1.996 3.86 1.123 1.5 2.617 2.29 4.193 2.97 1.573.68 2.36.545 3.208.435.85-.11 1.764-.72 2.012-1.417.25-.7.25-1.3.175-1.417-.075-.117-.24-.183-.34-.233zM12 22a9.96 9.96 0 01-5.066-1.378l-.363-.214-3.766.987 1.004-3.667-.235-.374A9.96 9.96 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm0-22C5.373 0 0 5.373 0 12a11.96 11.96 0 002.586 7.424L0 24l4.743-1.242A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
            <span>{whatsappText}</span>
          </a>

          <Link
            href={contactLink}
            className="w-full mt-2 bg-white shadow-md border border-black/[0.04] text-gray-800 hover:bg-gray-50 hover:border-gray-300 font-extrabold py-2.5 sm:py-3.5 px-6 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 text-[11.5px] sm:text-[14.5px] shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>{contactText}</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-800 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <div className="flex items-center gap-1.5 mt-2.5 sm:mt-4 text-[9px] sm:text-[11.5px] text-gray-500 font-bold leading-none pl-1">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#16A34A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{slaText}</span>
          </div>
        </div>
      </div>



    </section>
  );
}
