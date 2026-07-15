"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export default function BadgeLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const badges = [
    { src: "/images/badges/pse-terdaftar.png", alt: "PSE Kominfo" },
    { src: "/images/badges/iso-sertifikat.png", alt: "ISO Certified" }
  ];

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center md:items-end">
        <div className="text-[14px] font-bold text-gray-400 uppercase tracking-wider mb-2">Terdaftar resmi di</div>
        <div className="flex items-center gap-5">
          {badges.map((badge, idx) => (
            <button 
              key={idx} 
              onClick={() => openLightbox(badge.src)}
              className="hover:scale-105 transition-transform duration-200 cursor-pointer focus:outline-none"
            >
              <Image 
                src={badge.src} 
                alt={badge.alt} 
                width={140} 
                height={60} 
                className="object-contain h-[45px] w-auto drop-shadow-sm" 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>
          <div 
            className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl flex items-center justify-center p-2 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Sertifikat" 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl bg-white p-4" 
            />
          </div>
        </div>
      )}
    </>
  );
}

