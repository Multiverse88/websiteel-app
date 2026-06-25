import BadanUsahaTemplate from "@/components/layanan/BadanUsahaTemplate";
import { dataPT } from "@/data/layanan-badan-usaha";
import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Pendirian Badan Usaha — PT, CV, Yayasan & Lainnya",
  description:
    "Jasa pendirian PT, CV, Firma, Yayasan, dan Koperasi dengan proses cepat, harga transparan, dan tuntas. Mulai dari Rp2,5jt.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/pendirian-badan-usaha",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Pendirian Badan Usaha", url: "/layanan/pendirian-badan-usaha" },
];

export default function PendirianBadanUsaha() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <BadanUsahaTemplate content={dataPT} />
    </>
  );
}
