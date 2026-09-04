import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: "Perjanjian Perkawinan — Kontrak Prenupial Notaris Resmi",
    description:
      "Pembuatan perjanjian perkawinan (prenupial) dengan akta notaris. Lindungi aset bisnis & pribadi sebelum menikah.",
    alternates: {
      canonical: `${baseUrl}/layanan/perjanjian-perkawinan`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Perjanjian Perkawinan", url: "/layanan/perjanjian-perkawinan" },
];

export default function PerjanjianPerkawinanLayout({
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
