import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Pengurusan Izin PSE - EasyLegal",
    },
    description:
      "Butuh jasa pengurusan izin PSE? EasyLegal siap bantu pendaftaran sistem elektronik Anda dengan cepat, resmi, dan anti blokir mulai Rp1 jutaan. Konsultasi gratis sekarang!",
    alternates: {
      canonical: `${baseUrl}/layanan/pengurusan-pse`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Pengurusan Izin PSE", url: "/layanan/pengurusan-pse" },
];

export default function PengurusanPseLayout({
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
