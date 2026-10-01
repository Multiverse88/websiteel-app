import type { Metadata } from "next";
import SptLandingClient from "./SptLandingClient";

export const metadata: Metadata = {
  title: "Jasa Laporan SPT Pajak Tahunan Badan Usaha & Pribadi — EasyTax",
  description:
    "Jasa lapor SPT Tahunan Badan Usaha & Pribadi oleh EasyTax, layanan perpajakan grup EasyCorp yang bekerja sama dengan EasyLegal. Biaya mulai Rp499.000, seluruh Indonesia.",
  alternates: {
    canonical: "https://easylegal.id/layanan-spt-pajak-gads/",
  },
  openGraph: {
    title: "Jasa Laporan SPT Pajak Tahunan Badan Usaha & Pribadi — EasyTax",
    description:
      "Jasa lapor SPT Tahunan Badan Usaha & Pribadi oleh EasyTax, layanan perpajakan grup EasyCorp yang bekerja sama dengan EasyLegal. Biaya mulai Rp499.000, seluruh Indonesia.",
    url: "https://easylegal.id/layanan-spt-pajak-gads/",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      />
      <SptLandingClient />
    </>
  );
}
