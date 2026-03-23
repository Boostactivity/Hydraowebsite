export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] animate-pulse">
      {/* Hero skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="h-16 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6"></div>
        <div className="h-8 bg-gray-200 rounded-lg w-1/2 mx-auto mb-12"></div>
        <div className="h-96 bg-gray-200 rounded-2xl mb-12"></div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-gray-200 rounded-xl"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
