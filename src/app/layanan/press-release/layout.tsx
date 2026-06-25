import { getBreadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Press Release — Distribusi Berita ke 3.998 Media Nasional",
  description:
    "Layanan press release & rilis berita profesional. Distribusi ke media nasional, SEO-optimized, laporanreach & clipping.",
  alternates: {
    canonical: "https://easylegal.my.id/layanan/press-release",
  },
};

const breadcrumbs = [
  { name: "Beranda", url: "/" },
  { name: "Layanan", url: "/layanan" },
  { name: "Press Release", url: "/layanan/press-release" },
];

export default function PressReleaseLayout({
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
