import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Suspense } from "react";
import { GtmHead, GtmNoscript } from "@/components/GoogleTagManager";
import { getDomainConfig } from "@/lib/domains";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Multi-tenant: this app serves more than one domain (see src/lib/domains.ts
// + docker-compose.dokploy.yml Traefik rules). Metadata is generated
// per-request from the Host header so canonical/OG URLs match whichever
// domain the visitor is actually on, instead of always saying
// easylegal.biz.id. Note: reading headers() here makes every page under
// this layout dynamically rendered (no static/ISR caching for metadata) —
// an accepted tradeoff for correct per-domain SEO. Individual pages that
// hardcode their own absolute canonical URL (most /layanan/* pages) aren't
// affected by this and still need their own fix if they should vary by
// domain too.
export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "EasyLegal — Layanan Hukum & Legalitas Bisnis Terpercaya",
      template: "%s | EasyLegal",
    },
    description: "Pendirian PT, Pendaftaran Merek, NIB & OSS, dan Sertifikasi ISO dengan proses cepat, transparan, dan terpercaya.",
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: "EasyLegal",
      title: "EasyLegal — Layanan Hukum & Legalitas Bisnis Terpercaya",
      description: "Pendirian PT, Pendaftaran Merek, NIB & OSS, dan Sertifikasi ISO dengan proses cepat, transparan, dan terpercaya.",
      url: baseUrl,
      images: [
        {
          url: "/Logo EL.png",
          width: 1200,
          height: 630,
          alt: "EasyLegal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "EasyLegal — Layanan Hukum & Legalitas Bisnis Terpercaya",
      description: "Pendirian PT, Pendaftaran Merek, NIB & OSS, dan Sertifikasi ISO dengan proses cepat, transparan, dan terpercaya.",
      images: ["/Logo EL.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: "/apple-touch-icon.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#990202",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <GtmHead />
      </head>
      <body className="min-h-full flex flex-col pt-[72px] bg-white text-dark font-sans">
        <GtmNoscript />
        <div className="noise-overlay" />
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
      </body>
    </html>
  );
}

