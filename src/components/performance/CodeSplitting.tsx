import React, { lazy, Suspense, ComponentType } from 'react';
import { motion } from 'motion/react';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string;
}

// Composant de fallback élégant
export function ComponentSkeleton({ minHeight = '400px' }: { minHeight?: string }) {
  return (
    <div 
      className="w-full bg-gray-100 animate-pulse rounded-2xl"
      style={{ minHeight }}
    >
      <div className="p-8 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  );
}

// Wrapper pour lazy loading avec fallback élégant
export function LazyLoad({ children, fallback, minHeight = '400px' }: LazyLoadProps) {
  return (
    <Suspense fallback={fallback || <ComponentSkeleton minHeight={minHeight} />}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </Suspense>
  );
}

// Helper pour créer un composant lazy avec types
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallbackMinHeight?: string
) {
  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <LazyLoad minHeight={fallbackMinHeight}>
      <LazyComponent {...props} />
    </LazyLoad>
  );
}

// Préchargement intelligent des composants
export function preloadComponent(importFunc: () => Promise<any>) {
  // Précharge le composant sans le monter
  importFunc();
}

// Hook pour précharger au hover (anticipation UX)
export function usePreloadOnHover(importFunc: () => Promise<any>) {
  const handleMouseEnter = () => {
    preloadComponent(importFunc);
  };

  return { onMouseEnter: handleMouseEnter };
}

// Composants lourds à lazy loader
export const HeavyComponents = {
  // Configurator (lourd)
  Configurator: createLazyComponent(
    () => import('../../pages/ConfiguratorPage').then(m => ({ default: m.ConfiguratorPage })),
    '800px'
  ),

  // Calculateur d'économies (lourd)
  SavingsCalculator: createLazyComponent(
    () => import('../conversion/ROICalculator').then(m => ({ default: m.ROICalculator })),
    '600px'
  ),

  // Video Player (lourd)
  VideoPlayer: createLazyComponent(
    () => import('../mobile/MobileOptimizedVideo').then(m => ({ default: m.MobileOptimizedVideo })),
    '400px'
  ),

  // Carousel (lourd)
  Carousel: createLazyComponent(
    () => import('../mobile/TouchGestureCarousel').then(m => ({ default: m.TouchGestureCarousel })),
    '500px'
  ),

  // 3D Product Viewer (très lourd - si on l'ajoute plus tard)
  // Product3D: createLazyComponent(
  //   () => import('../Product3DViewer'),
  //   '600px'
  // ),
};

// Bundle analyzer helper (dev only)
export function logBundleSize(componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Bundle] Loading: ${componentName}`);
  }
}
