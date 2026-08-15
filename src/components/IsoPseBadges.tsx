"use client";

import React, { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

export default function IsoPseBadges({ className = "" }: { className?: string }) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className={`flex items-center justify-center gap-2 sm:gap-4 bg-white/90 backdrop-blur-sm rounded-xl py-3 px-4 sm:px-6 shadow-[0_8px_25px_rgba(0,0,0,0.06)] border border-black/[0.03] w-fit ${className}`}>
        <Image
          src="/ISO-27001-2022.webp"
          alt="ISO 27001"
          width={4241}
          height={1352}
          className="h-[28px] sm:h-[36px] w-auto object-contain drop-shadow-sm cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setLightboxImage({ src: "/ISO-27001-2022.webp", alt: "ISO 27001" })}
        />
        <Image
          src="/ISO-sertifikat-scaled.jpg"
          alt="ISO Sertifikat"
          width={2560}
          height={816}
          className="h-[28px] sm:h-[36px] w-auto object-contain drop-shadow-sm cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setLightboxImage({ src: "/ISO-sertifikat-scaled.jpg", alt: "ISO Sertifikat" })}
        />
        <div className="h-[28px] sm:h-[36px] w-[1px] bg-gray-200 mx-1 sm:mx-2"></div>
        <Image
          src="/images/badges/pse-terdaftar.png"
          alt="PSE Terdaftar"
          width={4296}
          height={1614}
          className="h-[28px] sm:h-[36px] w-auto object-contain drop-shadow-sm cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setLightboxImage({ src: "/images/badges/pse-terdaftar.png", alt: "PSE Terdaftar" })}
        />
      </div>

      <ImageLightbox 
        isOpen={!!lightboxImage}
        src={lightboxImage?.src || ""}
        alt={lightboxImage?.alt || ""}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}
