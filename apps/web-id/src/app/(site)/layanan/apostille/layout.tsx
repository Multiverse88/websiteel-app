import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Apostille Dokumen — Legalisasi untuk 129+ Negara",
    description:
      "Layanan Apostille dokumen resmi Indonesia untuk 129+ negara anggota Konvensi Hague. Proses cepat, mudah, & bisa 100% online. Mulai dari Rp1,3jt termasuk PNBP.",
    alternates: {
      canonical: `${baseUrl}/layanan/apostille`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Apostille", url: "/layanan/apostille" },
];

export default function ApostilleLayout({
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
