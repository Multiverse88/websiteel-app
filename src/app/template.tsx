"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Pastikan posisi awalnya diset dulu agar animasi mulus saat berpindah cepat
      gsap.set(containerRef.current, { opacity: 0, y: 15 });

      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "all", // Bersihkan properti gsap setelah selesai agar tidak bentrok dengan CSS lain
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col flex-grow" style={{ opacity: 0 }}>
      {children}
    </div>
  );
}