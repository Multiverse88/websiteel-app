import React from 'react';
import Image from 'next/image';
import { TestimonialsSectionData } from '@/types/landing-page';

export default function TestimonialsSection({ data }: { data: TestimonialsSectionData }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {data.title && (
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-12">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                {item.photo && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={item.photo.url}
                      alt={item.photo.alt || item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                </div>
              </div>
              <p className="text-gray-600 italic">&quot;{item.quote}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
