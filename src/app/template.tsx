"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackMetric } from "@/lib/metrics";

const SKIP_ANIMATION_ROUTES = ["/dashboard", "/login"];

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldAnimate = !SKIP_ANIMATION_ROUTES.some((r) => pathname.startsWith(r));

  useEffect(() => {
    trackMetric("page_view", 1, { path: pathname });
  }, [pathname]);

  return (
    <div className={`flex flex-col flex-grow ${shouldAnimate ? "animate-page-enter" : ""}`}>
      {children}
    </div>
  );
}
