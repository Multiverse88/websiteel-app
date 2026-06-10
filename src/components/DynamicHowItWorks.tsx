"use client";

import dynamic from "next/dynamic";

const HowItWorks = dynamic(() => import("./home/HowItWorks"), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-white overflow-hidden relative">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="h-4 w-32 bg-gray-100 rounded mb-3 animate-pulse" />
            <div className="h-10 w-80 bg-gray-100 rounded mb-4 animate-pulse" />
            <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="lg:col-span-7 h-[520px] bg-gray-50 rounded-3xl animate-pulse" />
        </div>
      </div>
    </section>
  ),
});

export default HowItWorks;
