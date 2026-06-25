import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "PR Media — Publikasi di Media Nasional & Lokal",
  description:
    "Layanan publikasi artikel & berita di media nasional. Cocok untuk brand awareness, corporate communication, & kampanye.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/pr-media",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "PR Media", url: "/layanan/pr-media" },
];

export default function PrMediaLayout({
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
