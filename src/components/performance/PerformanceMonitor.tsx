import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Zap, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  });
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    // Seulement en dev
    if (process.env.NODE_ENV !== 'development') return;

    // Mesurer FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
        }
      });
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Mesurer LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Mesurer FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Mesurer CLS (Cumulative Layout Shift)
    let clsScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
          setMetrics(prev => ({ ...prev, cls: clsScore }));
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Mesurer TTFB (Time to First Byte)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      setMetrics(prev => ({ 
        ...prev, 
        ttfb: navigationEntry.responseStart - navigationEntry.requestStart 
      }));
    }

    // Toggle debug avec Ctrl+Shift+P
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setShowDebug(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Évaluer les métriques (Web Vitals thresholds)
  const getMetricStatus = (metric: keyof PerformanceMetrics, value: number | null) => {
    if (value === null) return 'loading';

    const thresholds: Record<keyof PerformanceMetrics, [number, number]> = {
      fcp: [1800, 3000],      // Good < 1.8s, Needs improvement < 3s
      lcp: [2500, 4000],      // Good < 2.5s, Needs improvement < 4s
      fid: [100, 300],        // Good < 100ms, Needs improvement < 300ms
      cls: [0.1, 0.25],       // Good < 0.1, Needs improvement < 0.25
      ttfb: [800, 1800]       // Good < 800ms, Needs improvement < 1.8s
    };

    const [good, needsImprovement] = thresholds[metric];
    
    if (value <= good) return 'good';
    if (value <= needsImprovement) return 'warning';
    return 'poor';
  };

  const formatMetric = (value: number | null, unit: string = 'ms') => {
    if (value === null) return '...';
    return `${value.toFixed(0)}${unit}`;
  };

  if (process.env.NODE_ENV !== 'development' || !showDebug) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed bottom-4 right-4 z-[1000] w-80"
      >
        <div className="bg-gray-900 text-white rounded-2xl shadow-2xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              <h3 className="font-semibold text-sm">Performance Monitor</h3>
            </div>
            <button
              onClick={() => setShowDebug(false)}
              className="text-gray-400 hover:text-white transition-colors text-xs"
            >
              Fermer
            </button>
          </div>

          <div className="space-y-3">
            {/* FCP */}
            <MetricRow
              label="FCP"
              value={formatMetric(metrics.fcp)}
              status={getMetricStatus('fcp', metrics.fcp)}
              description="First Contentful Paint"
            />

            {/* LCP */}
            <MetricRow
              label="LCP"
              value={formatMetric(metrics.lcp)}
              status={getMetricStatus('lcp', metrics.lcp)}
              description="Largest Contentful Paint"
            />

            {/* FID */}
            <MetricRow
              label="FID"
              value={formatMetric(metrics.fid)}
              status={getMetricStatus('fid', metrics.fid)}
              description="First Input Delay"
            />

            {/* CLS */}
            <MetricRow
              label="CLS"
              value={formatMetric(metrics.cls, '')}
              status={getMetricStatus('cls', metrics.cls)}
              description="Cumulative Layout Shift"
            />

            {/* TTFB */}
            <MetricRow
              label="TTFB"
              value={formatMetric(metrics.ttfb)}
              status={getMetricStatus('ttfb', metrics.ttfb)}
              description="Time to First Byte"
            />
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3" />
              <span>Ctrl+Shift+P pour toggle</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

interface MetricRowProps {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'poor' | 'loading';
  description: string;
}

function MetricRow({ label, value, status, description }: MetricRowProps) {
  const statusColors = {
    good: 'text-green-400',
    warning: 'text-yellow-400',
    poor: 'text-red-400',
    loading: 'text-gray-400'
  };

  const statusIcons = {
    good: '●',
    warning: '●',
    poor: '●',
    loading: '○'
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`text-xs ${statusColors[status]}`}>
          {statusIcons[status]}
        </span>
        <div>
          <div className="text-xs font-medium">{label}</div>
          <div className="text-[10px] text-gray-500">{description}</div>
        </div>
      </div>
      <div className={`text-sm font-mono font-semibold ${statusColors[status]}`}>
        {value}
      </div>
    </div>
  );
}

// Hook pour logger les performances
export function usePerformanceLogger(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        console.warn(
          `[Performance] ${componentName} took ${renderTime.toFixed(2)}ms to render (>16ms threshold)`
        );
      }
    };
  }, [componentName]);
}

// Hook pour mesurer le temps de chargement d'une page
export function usePageLoadTime(pageName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      console.log(`[Performance] ${pageName} loaded in ${loadTime.toFixed(2)}ms`);
    };
  }, [pageName]);
}
