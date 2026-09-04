import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Pengajuan PKP — Daftar Wajib Pajak PKP Online",
    description:
      "Pengurusan pengukuhan Pengusaha Kena Pajak (PKP) untuk UMKM & korporasi. Proses cepat 3-5 hari kerja.",
    alternates: {
      canonical: `${baseUrl}/layanan/pengajuan-pkp`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Pengajuan PKP", url: "/layanan/pengajuan-pkp" },
];

export default function PengajuanPkpLayout({
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
