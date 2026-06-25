import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Daftar Merek & HAKI Online — Proses Cepat & Resmi",
  description:
    "Jasa pendaftaran merek dagang & HAKI di DJKI. Cek merek, perpanjangan, pengalihan, & tanggapan penolakan. Mulai dari Rp279rb.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/merek-haki",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Merek & HAKI", url: "/layanan/merek-haki" },
];

export default function MerekHakiLayout({
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
