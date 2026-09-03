import { Metadata } from "next";
import BadanUsahaTemplate from "@/components/layanan/BadanUsahaTemplate";
import { dataPembubaran } from "@/data/layanan-pembubaran";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Pembubaran PT & CV — EasyLegal",
  description: "Urus likuidasi dan pembubaran PT atau CV secara resmi. Proses pencabutan status badan hukum Kemenkumham dan penutupan NPWP perusahaan secara sah dan tuntas.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/pembubaran-perusahaan",
  },
};

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
