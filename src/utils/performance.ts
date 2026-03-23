/**
 * Utilitaires d'optimisation des performances Web
 * Amélioration du Core Web Vitals (LCP, FID, CLS)
 */

/**
 * Préchargement des ressources critiques
 */
export function preloadCriticalResources() {
  // Précharger les polices
  const fonts = [
    '/fonts/inter-var.woff2',
    '/fonts/inter-bold.woff2'
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = font;
    document.head.appendChild(link);
  });
}

/**
 * Lazy loading pour les images
 */
export function setupLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Le navigateur supporte le lazy loading natif
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      const imgElement = img as HTMLImageElement;
      imgElement.src = imgElement.dataset.src || '';
      imgElement.loading = 'lazy';
    });
  } else {
    // Fallback avec Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll('img.lazy');
    images.forEach(img => imageObserver.observe(img));
  }
}

/**
 * Optimisation du chargement des scripts tiers
 */
export function loadScriptAsync(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Vérifier si le script existe déjà
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

/**
 * Préconnexion aux domaines externes
 */
export function preconnectDomains(domains: string[]) {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Métriques Core Web Vitals
 */
export function trackWebVitals() {
  // LCP (Largest Contentful Paint)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('LCP:', entry);
      // Envoyer à Google Analytics
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(entry.startTime),
          non_interaction: true
        });
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.warn('LCP observation not supported');
  }

  // FID (First Input Delay)
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fid = (entry as any).processingStart - entry.startTime;
      console.log('FID:', fid);
      
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'FID',
          value: Math.round(fid),
          non_interaction: true
        });
      }
    }
  });

  try {
    fidObserver.observe({ entryTypes: ['first-input'] });
  } catch (e) {
    console.warn('FID observation not supported');
  }

  // CLS (Cumulative Layout Shift)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
        console.log('CLS:', clsValue);
      }
    }
  });

  try {
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.warn('CLS observation not supported');
  }

  // Envoyer CLS final lors du unload
  window.addEventListener('beforeunload', () => {
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'CLS',
        value: Math.round(clsValue * 1000),
        non_interaction: true
      });
    }
  });
}

/**
 * Détection de la vitesse de connexion
 */
export function getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) return 'medium';

  const effectiveType = connection.effectiveType;
  
  if (effectiveType === '4g') return 'fast';
  if (effectiveType === '3g') return 'medium';
  return 'slow';
}

/**
 * Adapter la qualité des images selon la connexion
 */
export function getOptimalImageQuality(): number {
  const speed = getConnectionSpeed();
  
  switch (speed) {
    case 'slow':
      return 60; // Qualité réduite
    case 'medium':
      return 80; // Qualité standard
    case 'fast':
      return 95; // Haute qualité
    default:
      return 80;
  }
}

/**
 * Préchargement des pages importantes
 */
export function prefetchPage(url: string) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Service Worker pour le cache
 */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    });
  }
}

/**
 * Compression et optimisation des requêtes
 */
export function enableBrotliCompression() {
  // Vérifier le support de Brotli
  const acceptEncoding = 'br, gzip, deflate';
  
  // Configurer les headers pour les requêtes fetch
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const [url, options = {}] = args;
    const headers = new Headers(options.headers || {});
    
    if (!headers.has('Accept-Encoding')) {
      headers.set('Accept-Encoding', acceptEncoding);
    }
    
    return originalFetch(url, { ...options, headers });
  };
}

/**
 * Initialisation globale des optimisations
 */
export function initPerformanceOptimizations() {
  // Préconnexion aux domaines critiques
  preconnectDomains([
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdn.jsdelivr.net'
  ]);

  // Setup lazy loading
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLazyLoading);
  } else {
    setupLazyLoading();
  }

  // Track Web Vitals
  trackWebVitals();

  // Précharger les pages importantes
  setTimeout(() => {
    prefetchPage('/configurateur');
    prefetchPage('/gamme');
    prefetchPage('/prix');
  }, 3000);
}

// Type augmentation pour gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
