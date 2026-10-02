import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Perubahan Akta Perusahaan PT dan CV - EasyLegal",
    },
    description:
      "Butuh jasa perubahan akta perusahaan? EasyLegal siap bantu prosesnya sampai tuntas, resmi, dan tanpa ribet. Biaya Terjangkau mulai Rp4 jutaan. Konsultasi gratis sekarang!",
    alternates: {
      canonical: `${baseUrl}/layanan/perubahan-akta`,
    },
  };
}

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Perubahan Akta Perusahaan", url: "/layanan/perubahan-akta" },
];

export default function PerubahanAktaLayout({
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
