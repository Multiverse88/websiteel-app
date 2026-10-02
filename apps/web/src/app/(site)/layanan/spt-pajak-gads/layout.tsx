import type { Metadata } from "next";
import { headers } from "next/headers";
import { permanentRedirect } from "next/navigation";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

const SPT_URL = "https://easylegal.biz.id/layanan/spt-pajak-gads";

export function generateMetadata(): Metadata {
  return {
    title: "Jasa Laporan SPT Pajak Tahunan Badan Usaha & Pribadi | EasyTax",
    description:
      "Jasa lapor SPT Tahunan Badan Usaha & Pribadi oleh EasyTax, layanan perpajakan grup EasyCorp yang bekerja sama dengan EasyLegal. Biaya mulai Rp499.000, seluruh Indonesia.",
    alternates: {
      canonical: SPT_URL,
    },
    openGraph: {
      title: "Jasa Laporan SPT Pajak Tahunan Badan Usaha & Pribadi | EasyTax",
      description:
        "Jasa lapor SPT Tahunan Badan Usaha & Pribadi oleh EasyTax, layanan perpajakan grup EasyCorp yang bekerja sama dengan EasyLegal. Biaya mulai Rp499.000, seluruh Indonesia.",
      url: SPT_URL,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "https://easylegal.biz.id/" },
  { name: "Layanan", url: "https://easylegal.biz.id/layanan" },
  { name: "Lapor SPT Tahunan", url: SPT_URL },
];

export default async function LayananSptPajakGadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("x-forwarded-host") || requestHeaders.get("host"))?.split(":")[0];
  if (host !== "easylegal.biz.id") permanentRedirect(SPT_URL);
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
