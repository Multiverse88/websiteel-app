"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ImageLightboxProps {
  isOpen: boolean;
  src: string;
  alt: string;
  onClose: () => void;
}

export default function ImageLightbox({ isOpen, src, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button 
        className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>
      <div 
        className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl scale-in-center" 
        />
      </div>
    </div>
  );
}
