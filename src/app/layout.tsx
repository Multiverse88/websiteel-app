import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollManager from "@/components/ScrollManager";
import { ViewTransitions } from "next-view-transitions";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EasyLegal — Layanan Hukum & Legalitas Bisnis Terpercaya",
  description: "Pendirian PT, Pendaftaran Merek, NIB & OSS, dan Sertifikasi ISO dengan proses cepat, transparan, dan terpercaya.",
};

export const viewport = {
  themeColor: "#990202",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="id"
        data-scroll-behavior="smooth"
        className={`${dmSans.variable} h-full antialiased scroll-smooth`}
      >
        <body className="min-h-full flex flex-col pt-[72px] bg-white text-dark font-sans">
          <ScrollManager />
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
