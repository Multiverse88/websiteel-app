import type { Metadata } from "next";
import { headers } from "next/headers";
import BadanUsahaTemplate from "@/components/layanan/BadanUsahaTemplate";
import { dataPembubaran } from "@/data/layanan-pembubaran";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";
import { getDomainConfig } from "@/lib/domains";

export async function generateMetadata(): Promise<Metadata> {
  const host = (await headers()).get("host");
  const { baseUrl } = getDomainConfig(host);

  return {
    title: {
      absolute: "Jasa Pembubaran Perusahaan - EasyLegal",
    },
    description:
      "Butuh jasa Pembubaran Perusahaan? EasyLegal siap bantu proses likuidasi dengan cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp1 jutaan. Konsultasi gratis sekarang!",
    alternates: {
      canonical: `${baseUrl}/layanan/pembubaran-perusahaan`,
    },
  };
}

export default function PembubaranPerusahaanPage() {
  const content = dataPembubaran;

  const breadcrumbs = [
    { name: "Beranda", url: "/" },
    { name: "Layanan", url: "/layanan" },
    { name: content.nama, url: "/layanan/pembubaran-perusahaan" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <BadanUsahaTemplate content={content} />
    </>
  );
}
