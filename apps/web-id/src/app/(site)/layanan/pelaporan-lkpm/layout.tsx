import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Pelaporan LKPM - EasyLegal",
    },
    description:
      "Butuh jasa pelaporan LKPM? EasyLegal siap bantu kelola laporan kegiatan penanaman modal Anda tepat waktu dan bebas sanksi mulai Rp1 jutaan. Konsultasi gratis sekarang!",
    alternates: {
      canonical: `${baseUrl}/layanan/pelaporan-lkpm`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Pelaporan LKPM", url: "/layanan/pelaporan-lkpm" },
];

export default function PelaporanLkpmLayout({
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
