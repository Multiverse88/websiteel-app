import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KARTU_PEOPLE, getKartuPerson } from "@/data/kartu";
import KartuClient from "./KartuClient";

// Halaman kartu nama digital: /kartu/<slug>. Statis penuh — semua orang
// di KARTU_PEOPLE di-prerender saat build.
export function generateStaticParams() {
  return KARTU_PEOPLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const person = getKartuPerson(slug);
  if (!person) return { title: "Kartu tidak ditemukan — EasyLegal" };

  return {
    title: `${person.name} — ${person.title} EasyLegal`,
    description: `Kartu nama digital ${person.name}, ${person.title} di EasyLegal. Hubungi via WhatsApp ${person.phone} untuk konsultasi legalitas bisnis.`,
    openGraph: {
      title: `${person.name} — ${person.title} EasyLegal`,
      description: `Kartu nama digital EasyLegal. Hubungi via WhatsApp untuk konsultasi legalitas bisnis.`,
      images: [{ url: person.photo, width: 2482, height: 3190, alt: `Foto ${person.name}` }],
    },
  };
}

export default async function KartuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const person = getKartuPerson(slug);
  if (!person) notFound();
  return <KartuClient person={person} />;
}
