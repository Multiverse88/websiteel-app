import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  badge?: string;
  price: string;
  period?: string;
  ctaLink?: string;
  ctaText?: string;
  features?: string[];
  isPopular?: boolean;
}

interface Props {
  data: {
    title?: string;
    subtitle?: string;
    plans?: Plan[];
    styles?: Record<string, any>;
    [key: string]: any;
  };
}

export default function PricingSection({ data }: Props) {
  const styles = data.styles || {};
  const plans = data.plans || [];

  const bgClass =
    styles.bgTheme === 'dark'
      ? 'bg-gray-900 text-white'
      : styles.bgTheme === 'brand-crimson'
        ? 'bg-[#990202] text-white'
        : 'bg-white text-gray-900';

  return (
    <section
      className={`${bgClass} py-16 sm:py-24`}
      style={{ paddingTop: styles.paddingTop, paddingBottom: styles.paddingBottom }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {data.title && (
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-4">{data.title}</h2>
        )}
        {data.subtitle && (
          <p className="text-center text-sm sm:text-base opacity-80 max-w-xl mx-auto mb-12">{data.subtitle}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-8 border flex flex-col justify-between ${
                plan.isPopular
                  ? 'border-yellow-400 shadow-xl ring-2 ring-yellow-400/30'
                  : 'border-white/20 shadow-sm'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <div>
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{plan.price}</span>
                  {plan.period && <span className="text-xs opacity-60">/ {plan.period}</span>}
                </div>
                {plan.features && plan.features.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm">
                        <Check size={16} className="text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-white/20">
                {plan.ctaLink && (
                  <Link
                    href={plan.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center py-3 rounded-xl font-bold text-sm transition ${
                      plan.isPopular
                        ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                        : 'bg-white text-[#990202] hover:bg-gray-100'
                    }`}
                  >
                    {plan.ctaText || 'Pilih Paket'}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
