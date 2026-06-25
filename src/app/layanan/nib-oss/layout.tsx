import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "NIB & OSS RBA — Perizinan Usaha Resmi BKPM",
  description:
    "Pengurusan NIB, OSS RBA, perubahan KBLI, & sertifikat standar. Proses 1-3 hari kerja. Mulai dari Rp499rb.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/nib-oss",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "NIB & OSS", url: "/layanan/nib-oss" },
];

export default function NibOssLayout({
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
