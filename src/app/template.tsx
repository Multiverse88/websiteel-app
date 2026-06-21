"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SKIP_ANIMATION_ROUTES = ["/dashboard", "/login"];

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const shouldAnimate = !SKIP_ANIMATION_ROUTES.some((r) => pathname.startsWith(r));

  useGSAP(
    () => {
      if (!shouldAnimate) return;
      gsap.set(containerRef.current, { opacity: 0, y: 15 });
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        clearProps: "all",
      });
    },
    { scope: containerRef, dependencies: [shouldAnimate] }
  );

  return (
    <div ref={containerRef} className="flex flex-col flex-grow" style={shouldAnimate ? { opacity: 0 } : undefined}>
      {children}
    </div>
  );
}
