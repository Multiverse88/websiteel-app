"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TypebotWidget } from "@/components/TypebotWidget";
import { Suspense } from "react";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/login");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <main id="main-content" className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
      <TypebotWidget />
    </>
  );
}
