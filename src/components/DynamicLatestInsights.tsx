"use client";

import dynamic from "next/dynamic";

const LatestInsights = dynamic(() => import("./home/LatestInsights"), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-white">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="mb-12">
          <div className="h-4 w-40 bg-gray-100 rounded mb-3 animate-pulse" />
          <div className="h-10 w-80 bg-gray-100 rounded mb-4 animate-pulse" />
          <div className="h-4 w-64 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 h-80 bg-gray-100 rounded-3xl animate-pulse" />
          <div className="lg:col-span-7 grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-3xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
});

export default LatestInsights;
