import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="pt-[72px] flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-[16px] focus:font-bold focus:shadow-lg focus:outline-none"
        >
          Lewati ke konten utama
        </a>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main id="main-content" className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}

