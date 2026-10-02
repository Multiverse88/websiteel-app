import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Pengurusan PKP - EasyLegal",
    },
    description:
      "Butuh jasa Pengurusan PKP? EasyLegal siap bantu prosesnya dengan cepat dan bergaransi. Biaya terjangkau mulai Rp1 jutaan. Konsultasi gratis sekarang!",
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
