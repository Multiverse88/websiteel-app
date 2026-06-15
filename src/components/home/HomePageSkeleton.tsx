export default function HomePageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-br from-white via-gray-50 to-red-50/30 pt-20 pb-24 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              {/* Tag */}
              <div className="h-8 w-40 bg-gray-200 rounded-full"></div>
              
              {/* Title Lines */}
              <div className="space-y-3">
                <div className="h-12 w-full bg-gray-200 rounded"></div>
                <div className="h-12 w-4/5 bg-gray-200 rounded"></div>
                <div className="h-12 w-3/5 bg-gray-200 rounded"></div>
              </div>
              
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <div className="h-12 w-40 bg-gray-300 rounded-xl"></div>
                <div className="h-12 w-36 bg-gray-200 rounded-xl"></div>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="h-6 w-28 bg-gray-200 rounded"></div>
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                <div className="h-6 w-28 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Section Skeleton */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
            <div className="h-10 w-96 bg-gray-200 rounded mx-auto"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
          </div>
          
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center space-y-2">
                <div className="h-12 w-24 bg-gray-200 rounded mx-auto"></div>
                <div className="h-4 w-32 bg-gray-200 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section Skeleton */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
            <div className="h-10 w-80 bg-gray-200 rounded mx-auto"></div>
          </div>
          
          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="h-4 w-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="space-y-1">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <div className="h-10 w-96 bg-gray-200 rounded mx-auto"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="h-5 w-4/5 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 bg-gradient-to-br from-[#990202] to-[#800000]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="h-10 w-96 bg-white/20 rounded mx-auto"></div>
          <div className="h-4 w-64 bg-white/20 rounded mx-auto"></div>
          <div className="flex justify-center gap-4">
            <div className="h-12 w-48 bg-white/30 rounded-xl"></div>
            <div className="h-12 w-40 bg-white/20 rounded-xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
