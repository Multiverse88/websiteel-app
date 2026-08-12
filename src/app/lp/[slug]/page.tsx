import React from 'react';
import Script from 'next/script';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import SectionRenderer from '@/components/landing-page/SectionRenderer';
import { SectionData } from '@/types/landing-page';


interface PageProps {
  params: Promise<{ slug: string }>;
}

// Landing pages can be locked to a specific domain (Domain model / LandingPage.domainId).
// We forward our own Host header so admin-api can 404 requests coming from a
// domain the page isn't assigned to.
async function fetchLandingPage(slug: string) {
  const host = (await headers()).get('host') || '';
  const apiUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/landing-pages/${slug}`);
  if (host) apiUrl.searchParams.set('hostname', host);

  const res = await fetch(apiUrl.toString(), { next: { revalidate: 60 } });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let page = null;
  try {
    page = await fetchLandingPage(slug);
  } catch (e) {
    console.error("Error fetching landing page for metadata:", e);
  }

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

  // Hanya render page yang sudah di-publish (dan cocok domain-nya)
  let page = null;
  try {
    page = await fetchLandingPage(slug);
  } catch (e) {
    console.error("Error fetching landing page:", e);
  }

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
        <Script
          id="pixel-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              console.log("Pixel ID Loaded:", "${page.pixelId}");
            `,
          }}
        />
      )}

      {/* Render All Sections in Order */}
      {sections.map((section, idx) => (
        <SectionRenderer key={section.id || idx} section={section} />
      ))}
    </main>
  );
}
