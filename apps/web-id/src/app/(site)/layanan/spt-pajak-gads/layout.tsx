import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Jasa Laporan SPT Pajak Tahunan Badan Usaha & Pribadi | EasyTax",
    description:
      "Jasa lapor SPT Tahunan Badan Usaha & Pribadi oleh EasyTax, layanan perpajakan grup EasyCorp yang bekerja sama dengan EasyLegal. Biaya mulai Rp499.000, seluruh Indonesia.",
    alternates: {
      canonical: `${baseUrl}/layanan/spt-pajak-gads`,
    },
    openGraph: {
      title: "Jasa Laporan SPT Pajak Tahunan Badan Usaha & Pribadi | EasyTax",
      description:
        "Jasa lapor SPT Tahunan Badan Usaha & Pribadi oleh EasyTax, layanan perpajakan grup EasyCorp yang bekerja sama dengan EasyLegal. Biaya mulai Rp499.000, seluruh Indonesia.",
      url: `${baseUrl}/layanan/spt-pajak-gads`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Lapor SPT Tahunan", url: "/layanan/spt-pajak-gads" },
];

export default function LayananSptPajakGadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      {children}
    </>
  );
}
