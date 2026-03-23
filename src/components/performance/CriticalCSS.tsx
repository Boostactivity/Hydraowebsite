import { useEffect } from 'react';

// Critical CSS inlining pour above-the-fold
export function CriticalCSS() {
  useEffect(() => {
    // Defer non-critical CSS
    const deferCSS = () => {
      const links = document.querySelectorAll('link[rel="stylesheet"][data-defer]');
      links.forEach((link) => {
        link.setAttribute('media', 'all');
      });
    };

    // Load deferred CSS after page load
    if (document.readyState === 'complete') {
      deferCSS();
    } else {
      window.addEventListener('load', deferCSS);
      return () => window.removeEventListener('load', deferCSS);
    }
  }, []);

  return null;
}

// Critical styles inline (above the fold)
export const criticalStyles = `
  /* Reset & Base - CRITICAL */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #FAF8F5;
    color: #1F2937;
    line-height: 1.6;
  }

  /* Layout - CRITICAL */
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Header - CRITICAL (always visible) */
  header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #E5E7EB;
  }

  /* Hero - CRITICAL (above fold) */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #FAF8F5 0%, #F3F0EC 100%);
  }

  /* Buttons - CRITICAL */
  .btn-primary {
    background: linear-gradient(135deg, #6B1E3E 0%, #8B2E4E 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 9999px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(107, 30, 62, 0.3);
  }

  /* Typography - CRITICAL */
  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    line-height: 1.2;
    color: #111827;
  }

  h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 600;
    line-height: 1.3;
    color: #1F2937;
  }

  /* Loading state - CRITICAL */
  .skeleton {
    background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }

  @keyframes skeleton-loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Spinner - CRITICAL */
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #E5E7EB;
    border-top-color: #6B1E3E;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Mobile responsive - CRITICAL */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }

  /* Performance hints */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Inject critical CSS dans le head
export function injectCriticalCSS() {
  if (typeof document === 'undefined') return;

  const existingStyle = document.getElementById('critical-css');
  if (existingStyle) return;

  const style = document.createElement('style');
  style.id = 'critical-css';
  style.innerHTML = criticalStyles;
  document.head.insertBefore(style, document.head.firstChild);
}

// Font preload pour éviter FOUT (Flash of Unstyled Text)
export function preloadFonts() {
  if (typeof document === 'undefined') return;

  const fonts = [
    { 
      family: 'Inter', 
      weight: '400',
      display: 'swap'
    },
    { 
      family: 'Inter', 
      weight: '600',
      display: 'swap'
    },
    { 
      family: 'Inter', 
      weight: '700',
      display: 'swap'
    }
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = `/fonts/Inter-${font.weight}.woff2`;
    document.head.appendChild(link);
  });
}

// Utility pour mesurer FCP (First Contentful Paint)
export function measureFCP() {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log(`[Performance] FCP: ${entry.startTime.toFixed(2)}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });
  } catch (error) {
    // PerformanceObserver not supported
  }
}

// Utility pour mesurer LCP (Largest Contentful Paint)
export function measureLCP() {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`[Performance] LCP: ${lastEntry.startTime.toFixed(2)}ms`);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (error) {
    // PerformanceObserver not supported
  }
}

// Utility pour mesurer CLS (Cumulative Layout Shift)
export function measureCLS() {
  if (typeof window === 'undefined') return;

  let clsScore = 0;

  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
          console.log(`[Performance] CLS: ${clsScore.toFixed(4)}`);
        }
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    // PerformanceObserver not supported
  }
}

// Export all performance metrics
export function initPerformanceMonitoring() {
  if (process.env.NODE_ENV === 'development') {
    measureFCP();
    measureLCP();
    measureCLS();
  }
}
