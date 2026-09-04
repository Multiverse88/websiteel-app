import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Visa Bisnis & KITAS — Izin Tinggal WNA di Indonesia",
    description:
      "Pengurusan visa bisnis, KITAS investor, & KITAS tenaga kerja asing. Proses cepat, 100% resmi Ditjen Imigrasi.",
    alternates: {
      canonical: `${baseUrl}/layanan/visa-kitas`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Visa & KITAS", url: "/layanan/visa-kitas" },
];

export default function VisaKitasLayout({
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
