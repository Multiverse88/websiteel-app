import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Apostille Dokumen — Legalisasi untuk 129+ Negara",
  description:
    "Layanan Apostille dokumen resmi Indonesia untuk 129+ negara anggota Konvensi Hague. Proses cepat, mudah, & bisa 100% online. Mulai dari Rp1,3jt termasuk PNBP.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/apostille",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Apostille", url: "/layanan/apostille" },
];

export default function ApostilleLayout({
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
