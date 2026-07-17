import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import SectionRenderer from '@/components/landing-page/SectionRenderer';
import { SectionData } from '@/types/landing-page';


interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await prisma.landingPage.findUnique({
    where: { slug, status: 'published' }
  });

  if (!page) {
    return { title: 'Halaman Tidak Ditemukan' };
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      images: page.ogImage ? [{ url: page.ogImage }] : [],
    }
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Hanya render page yang sudah di-publish
  const page = await prisma.landingPage.findUnique({
    where: { slug, status: 'published' }
  });

  if (!page) {
    notFound();
  }

  // Parse JSON data safely
  let sections: SectionData[] = [];
  try {
    if (page.sections) {
      sections = typeof page.sections === 'string' ? JSON.parse(page.sections) : page.sections;
    }
  } catch (e) {
    console.error("Failed to parse sections JSON", e);
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Render pixel / tracking script if any */}
      {page.pixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Placeholder for Pixel tracking code
              console.log("Pixel ID Loaded:", "${page.pixelId}");
            `,
          }}
        />
      )}

      {/* Render All Sections in Order */}
      {sections.map((section, idx) => (
        <SectionRenderer key={section.id || idx} section={section} landingPageId={page.id} />
      ))}
    </main>
  );
}
