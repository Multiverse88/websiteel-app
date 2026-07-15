import React from 'react';
import { RichTextSectionData } from '@/types/landing-page';

export default function RichTextSection({ data }: { data: RichTextSectionData }) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div 
          className="prose prose-lg prose-red max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: data.html }}
        />
      </div>
    </section>
  );
}
