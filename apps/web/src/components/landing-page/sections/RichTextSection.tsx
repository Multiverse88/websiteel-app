import React from 'react';
import { posStyle, sectionScale } from '../utils';
import { RichTextSectionData } from '@/types/landing-page';

;

export default function RichTextSection({ data }: { data: RichTextSectionData }) {
  const htmlContent = data.html || data.content?.text || data.content?.title || '';
  const pos = data.styles?.positions;
  
  

return (
    <section className="bg-white py-12 sm:py-16" style={data.styles?.sectionHeight ? { minHeight: data.styles.sectionHeight } : {}}><div style={sectionScale(data.styles) !== 1 ? { transform: `scale(${sectionScale(data.styles)})`, transformOrigin: 'top center', width: '100%' } : {}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative">
        <div style={posStyle(pos, 'title')}>
          <div 
            className="prose prose-lg prose-red max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
      </div>
    </section>
  );
}
