import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Pembuatan & Review Kontrak Bisnis - EasyLegal",
    },
    description:
      "Butuh jasa buat atau review kontrak bisnis? EasyLegal siap bantu drafting NDA, MoU, PKS, & SPK oleh praktisi hukum berpengalaman. Biaya terjangkau mulai dari Rp2 jutaan. Konsultasi gratis sekarang!",
    alternates: {
      canonical: `${baseUrl}/layanan/kontrak-bisnis`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Kontrak Bisnis", url: "/layanan/kontrak-bisnis" },
];

export default function KontrakBisnisLayout({
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
