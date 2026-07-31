export default function DashboardLoading() {
  return (
    <div className="dashboard-shell h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Sidebar skeleton */}
      <div className="fixed left-0 top-0 h-screen w-[260px] bg-white border-r border-gray-200 animate-pulse" />

      {/* Main content skeleton */}
      <main className="ml-[260px] h-screen overflow-y-auto">
        <div className="space-y-6 p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />

          {/* Content blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>

          <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </main>
    </div>
  );
}
