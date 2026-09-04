import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Virtual Office — Alamat Bisnis Prestisius 3 Kota",
    description:
      "Sewa virtual office Bandung, Jakarta, & Bekasi untuk domisili PT, NPWP, PKP. Harga mulai Rp1,5jt/tahun + meeting room 70 jam.",
    alternates: {
      canonical: `${baseUrl}/layanan/virtual-office`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Virtual Office", url: "/layanan/virtual-office" },
];

export default function VirtualOfficeLayout({
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
