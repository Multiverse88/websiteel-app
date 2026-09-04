import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Sertifikasi ISO UAF Accredited — 9001, 14001, 27001 & Lainnya",
    description:
      "Jasa sertifikasi ISO terakreditasi UAF untuk berbagai standar. Pendampingan A-Z dari konsultasi sampai sertifikat terbit. Mulai dari Rp9,9jt.",
    alternates: {
      canonical: `${baseUrl}/layanan/sertifikasi-iso`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Sertifikasi ISO", url: "/layanan/sertifikasi-iso" },
];

export default function SertifikasiIsoLayout({
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
