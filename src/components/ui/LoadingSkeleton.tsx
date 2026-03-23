import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'page' | 'card' | 'text' | 'image';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({ variant = 'page', count = 1, className = '' }: LoadingSkeletonProps) {
  const skeletonBase = 'animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-2xl';

  if (variant === 'page') {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Hero skeleton */}
          <div className="mb-20">
            <div className={`${skeletonBase} h-12 w-3/4 mb-6`}></div>
            <div className={`${skeletonBase} h-6 w-1/2 mb-8`}></div>
            <div className="flex gap-4">
              <div className={`${skeletonBase} h-14 w-48`}></div>
              <div className={`${skeletonBase} h-14 w-48`}></div>
            </div>
          </div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className={`${skeletonBase} h-64 w-full`}></div>
                <div className={`${skeletonBase} h-6 w-3/4`}></div>
                <div className={`${skeletonBase} h-4 w-full`}></div>
                <div className={`${skeletonBase} h-4 w-2/3`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`space-y-4 ${className}`}>
            <div className={`${skeletonBase} h-64 w-full`}></div>
            <div className={`${skeletonBase} h-6 w-3/4`}></div>
            <div className={`${skeletonBase} h-4 w-full`}></div>
            <div className={`${skeletonBase} h-4 w-2/3`}></div>
          </div>
        ))}
      </>
    );
  }

  if (variant === 'text') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`${skeletonBase} h-4 w-full mb-3 ${className}`}></div>
        ))}
      </>
    );
  }

  if (variant === 'image') {
    return <div className={`${skeletonBase} w-full h-full ${className}`}></div>;
  }

  return null;
}
