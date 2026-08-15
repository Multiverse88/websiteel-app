"use client";
import React from "react";
import FadeIn from "@/components/FadeIn";

export default function MediaCoverage() {
  const BANKS = [
    { id: 1, name: "BCA", src: "/images/banks/bca.png" },
    { id: 2, name: "BSI", src: "/images/banks/bsi.png" },
    { id: 3, name: "Mekari", src: "/images/banks/mekari.png" },
    { id: 4, name: "OCBC", src: "/images/banks/ocbc.png" },
    { id: 5, name: "Permata Bank", src: "/images/banks/permata-bank.png" },
    { id: 6, name: "Privy", src: "/images/banks/privy.png" },
    { id: 7, name: "Everpro", src: "/images/banks/everpro.png" },
    { id: 8, name: "JNE", src: "/images/banks/jne.png" },
  ];

  const CLIENTS = [
    { file: "akiha.png", scale: "" },
    { file: "arava-tour.png", scale: "" },
    { file: "artave.png", scale: "" },
    { file: "beeskin.png", scale: "" }, 
    { file: "bss.png", scale: "" },
    { file: "callme.png", scale: "" },
    { file: "daingsuper.png", scale: "" },
    { file: "dewa-rackindo.png", scale: "" }, 
    { file: "gmk-door.png", scale: "" },
    { file: "guri-senbei.png", scale: "" },
    { file: "happyeats.png", scale: "scale-[1.4]" },
    { file: "javarudraksha.png", scale: "scale-[1.7]" }, 
    { file: "kafeel.netz.png", scale: "" },
    { file: "kms.png", scale: "scale-[1.5]" },
    { file: "moonbow.png", scale: "scale-[1.4]" },
    { file: "oseal.png", scale: "scale-[1.4]" }, 
    { file: "pabriek-kuweh.png", scale: "" },
    { file: "power-computerindo.png", scale: "" },
    { file: "satoshi.png", scale: "scale-[1.3]" }, 
    { file: "sumber-aneka-wangi.png", scale: "" },
    { file: "tantri.png", scale: "" },
    { file: "vidichi.png", scale: "" }
  ];

  const MEDIA = [
    { 
      id: 1, 
      scale: "scale-[1.8] sm:scale-[2]",
      href: "https://m.jpnn.com/amp/news/legalitas-umkm-penting-untuk-pengembangan-bisnis-easylegal-kasi-solusi"
    },
    { 
      id: 2, 
      scale: "",
      href: "https://www.industry.co.id/read/129087/easylegal-bawa-inovasi-dalam-menangani-legalitas-umkm-indonesia"
    },
    { 
      id: 3, 
      scale: "",
      href: "https://finance.detik.com/berita-ekonomi-bisnis/d-6615480/biaya-pendirian-pt-perorangan-kurang-dari-rp-1-juta-dalam-1-hari-kerja"
    },
    { 
      id: 4, 
      scale: "",
      href: "https://www.idntimes.com/business/finance/vadhia-lidyana-1/tips-perkuat-eksistensi-bisnis-umkm-merapat"
    },
    { 
      id: 5, 
      scale: "scale-[1.8] sm:scale-[2]",
      href: "https://ekbis.sindonews.com/read/1285135/34/solusi-legalitas-sebagai-katalis-pertumbuhan-umkm-di-indonesia-1703509943"
    },
    { 
      id: 6, 
      scale: "",
      href: "https://regional.kontan.co.id/news/hadirkan-inovasi-atas-tantangan-legalitas-bagi-umkm-indonesia"
    },
  ];

  return (
    <FadeIn delay={0.2}>
      <section className="bg-white border-t border-gray-100/60 py-16 sm:py-24">
        
        {/* Unified Header */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center mb-16 sm:mb-20">
          <h2 className="text-[28px] sm:text-[36px] font-black text-[#1A1A1A] mb-4 tracking-tight">
            Mitra Legalitas yang Bisa Diandalkan
          </h2>
          <p className="text-gray-500 text-[14px] sm:text-[16px] max-w-2xl mb-8 leading-relaxed">
            Lebih dari 13.000 pengusaha mempercayakan pendirian usaha, perizinan, hingga perlindungan merek mereka kepada kami.
          </p>
          <div className="bg-[#FEF2F2] text-[#D62828] text-[10px] sm:text-[12px] font-bold uppercase tracking-widest px-6 py-2 rounded-full">
            SUPPORTED BY &bull; OUR CLIENTS
          </div>
        </div>

        {/* Marquees Container */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col space-y-12 sm:space-y-16">
          
          {/* OUR CLIENTS */}
          <div className="w-full relative">
            <div className="text-[12px] font-bold text-gray-800 uppercase tracking-widest mb-6 pl-4 sm:pl-8">
              OUR CLIENTS
            </div>
            <div className="relative w-full flex overflow-hidden group">
              {[1, 2].map((groupIndex) => (
                <div 
                  key={`clients-${groupIndex}`} 
                  className="flex items-center justify-around flex-shrink-0 animate-marquee-left min-w-full space-x-8 sm:space-x-16 px-4 sm:px-8 group-hover:[animation-play-state:paused]"
                >
                  {CLIENTS.map((client, idx) => (
                    <div key={`client-${groupIndex}-${idx}`} className="flex items-center justify-center flex-shrink-0 w-32 sm:w-48 h-16 sm:h-20 relative transition-transform duration-300 hover:scale-110 cursor-pointer">
                      <img
                        src={`/images/logo-klien/${client.file}`}
                        alt={`Client Logo ${idx + 1}`}
                        className={`max-w-full max-h-[48px] sm:max-h-[64px] w-auto h-auto object-contain ${client.scale}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
              <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            </div>
          </div>

          {/* SUPPORTED BY */}
          <div className="w-full relative">
            <div className="text-[12px] font-bold text-gray-800 uppercase tracking-widest mb-6 pl-4 sm:pl-8">
              SUPPORTED BY
            </div>
            <div className="relative w-full flex overflow-hidden group">
              {[1, 2].map((groupIndex) => (
                <div 
                  key={`banks-${groupIndex}`} 
                  className="flex items-center justify-around flex-shrink-0 animate-marquee-left min-w-full space-x-8 sm:space-x-16 px-4 sm:px-8 group-hover:[animation-play-state:paused]"
                >
                  {BANKS.map((bank, idx) => (
                    <div key={`bank-${groupIndex}-${idx}`} className="flex items-center justify-center flex-shrink-0 w-32 sm:w-48 h-16 sm:h-20 relative transition-transform duration-300 hover:scale-110 cursor-pointer">
                      <img
                        src={bank.src}
                        alt={bank.name}
                        className="max-w-full max-h-[48px] sm:max-h-[64px] w-auto h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
              <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            </div>
          </div>

          {/* LIPUTAN MEDIA (Static, Centered) */}
          <div className="w-full relative mt-8 sm:mt-12 pt-12 sm:pt-16 border-t border-[#EAE8E3]">
            <div className="text-[14px] sm:text-[16px] font-bold text-gray-800 uppercase tracking-[0.15em] mb-10 text-center">
              LIPUTAN MEDIA EASYLEGAL
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-6 sm:gap-10 px-4 sm:px-8 w-full">
              {MEDIA.map((item) => (
                <a 
                  key={`media-item-static-${item.id}`} 
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center flex-shrink-1 sm:flex-shrink-0 w-24 sm:w-36 relative transition-transform duration-300 hover:scale-110 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
                >
                  <img
                    src={`/logo-berita/logo${item.id}.png`}
                    alt={`Media Liputan ${item.id}`}
                    className={`max-w-full max-h-[36px] sm:max-h-[52px] w-auto h-auto object-contain ${item.scale}`}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>
    </FadeIn>
  );
}
