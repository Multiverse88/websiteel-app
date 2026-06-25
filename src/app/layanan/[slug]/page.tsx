import { notFound } from "next/navigation";
import LayananTemplate from "@/components/layanan/LayananTemplate";
import { layananLainnyaData } from "@/data/layanan-lainnya";

export function generateStaticParams() {
  return Object.keys(layananLainnyaData).map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function LayananDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = layananLainnyaData[slug];

  if (!content) {
    notFound();
  }

  return <LayananTemplate content={content} />;
}
