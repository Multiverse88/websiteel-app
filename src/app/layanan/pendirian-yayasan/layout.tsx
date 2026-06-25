import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Pendirian Yayasan — Pembuatan Yayasan Resmi & Akta Notaris",
  description:
    "Pendirian yayasan dengan akta notaris, pengesahan Kemenkumham, & registrasi NPWP. Proses 2-3 minggu. Mulai dari Rp1,5jt.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/pendirian-yayasan",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Pendirian Yayasan", url: "/layanan/pendirian-yayasan" },
];

export default function PendirianYayasanLayout({
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
