import React from 'react';
import { posStyle, sectionScale } from '../utils';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  data: {
    title?: string;
    subtitle?: string;
    items?: FAQItem[];
    styles?: Record<string, any>;
    [key: string]: any;
  };
}

;

export default function FAQSection({ data }: Props) {
  const styles = data.styles || {};
  const items = data.items || [];
  const pos = styles.positions;

  
  

return (
    <section
      className="bg-white py-16 sm:py-24"
      style={{ ...(data.styles?.sectionHeight ? { minHeight: data.styles.sectionHeight } : {}),  paddingTop: styles.paddingTop, paddingBottom: styles.paddingBottom, ...(styles.height ? { minHeight: styles.height } : {}) }}
    >
      <div style={sectionScale(data.styles) !== 1 ? { transform: `scale(${sectionScale(data.styles)})`, transformOrigin: "top center", width: "100%" } : {}}>

      <div className="max-w-[800px] mx-auto px-4 sm:px-8 relative">
        {data.title && (
          <div style={posStyle(pos, 'title')}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-4">{data.title}</h2>
          </div>
        )}
        {data.subtitle && (
          <div style={posStyle(pos, 'subtitle')}>
            <p className="text-center text-sm sm:text-base text-gray-500 max-w-xl mx-auto mb-12">{data.subtitle}</p>
          </div>
        )}
        <div className="space-y-4">
          {items.map((faq, idx) => (
            <div key={idx} className="bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-100 text-left">
              <div className="flex items-start gap-3">
                <HelpCircle size={18} className="text-[#990202] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900">{faq.question}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

    </section>
  );
}
