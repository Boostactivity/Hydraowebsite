import { useEffect } from 'react';
import { Page } from '../../App';
import { defaultImages } from '../../assets/products';

// DNS Preconnect pour origines externes
const EXTERNAL_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdn.jsdelivr.net'
];

// Pages à prefetch selon la navigation probable
const PREFETCH_ROUTES: Record<Page, Page[]> = {
  'home': ['concept', 'savings', 'configurator', 'gamme'],
  'concept': ['gamme', 'configurator', 'avantages'],
  'gamme': ['product', 'configurator', 'finitions'],
  'product': ['configurator', 'savings', 'installers'],
  'configurator': ['cart', 'savings', 'installers'],
  'savings': ['configurator', 'testimonials', 'ecoresponsable'],
  'cart': ['checkout', 'shop'],
  'checkout': ['testimonials', 'support'],
  'avantages': ['savings', 'ecoresponsable', 'configurator'],
  'testimonials': ['configurator', 'savings'],
  'installers': ['configurator', 'support'],
  'faq': ['support', 'configurator'],
  'subscriptions': ['configurator', 'savings'],
  // Autres pages avec prefetch minimal
  'modules': ['configurator'],
  'finitions': ['configurator'],
  'utilisations': ['configurator'],
  'securite': ['faq'],
  'ecoresponsable': ['savings'],
  'cube': ['configurator'],
  'prix': ['configurator'],
  'inspiration': ['gamme'],
  'support': ['faq'],
  'shop': ['cart'],
  'legal': ['home'],
  'objections': ['configurator'],
  'mobile-demo': ['home']
};

export function ResourceHints({ currentPage }: { currentPage: Page }) {
  useEffect(() => {
    // Preconnect DNS pour origines externes
    EXTERNAL_ORIGINS.forEach(origin => {
      addPreconnect(origin);
    });

    // Prefetch routes probables
    const routesToPrefetch = PREFETCH_ROUTES[currentPage] || [];
    routesToPrefetch.forEach(route => {
      prefetchRoute(route);
    });

    // Preload hero images selon la page
    preloadCriticalAssets(currentPage);
  }, [currentPage]);

  return null;
}

// Ajouter preconnect link
function addPreconnect(href: string) {
  if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);

  // Aussi ajouter dns-prefetch pour les navigateurs plus anciens
  const dnsPrefetch = document.createElement('link');
  dnsPrefetch.rel = 'dns-prefetch';
  dnsPrefetch.href = href;
  document.head.appendChild(dnsPrefetch);
}

// Prefetch route (charge le JS/CSS en avance)
function prefetchRoute(page: Page) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'script';
  link.href = `/pages/${page}.js`; // Chemin fictif - React gère ça via code splitting
  document.head.appendChild(link);
}

// Preload assets critiques selon la page
function preloadCriticalAssets(page: Page) {
  const criticalAssets: Record<Page, string[]> = {
    'home': [
      defaultImages.faucet
    ],
    'product': [
      defaultImages.faucet
    ],
    'configurator': [
      defaultImages.faucet
    ]
  };

  const assets = criticalAssets[page] || [];
  assets.forEach(url => {
    preloadImage(url);
  });
}

// Preload image
function preloadImage(href: string) {
  if (document.querySelector(`link[rel="preload"][href="${href}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = href;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
}

// Hook pour prefetch au hover (anticipation UX)
export function usePrefetchOnHover(page: Page) {
  const handleMouseEnter = () => {
    prefetchRoute(page);
  };

  return { onMouseEnter: handleMouseEnter };
}

// Preload fonts
export function preloadFonts() {
  const fonts = [
    '/fonts/Inter-Regular.woff2',
    '/fonts/Inter-SemiBold.woff2',
    '/fonts/Inter-Bold.woff2'
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = font;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Prefetch navigation intelligente basée sur le comportement
export function usePredictiveNavigation(currentPage: Page) {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let idleTimeout: NodeJS.Timeout;

    // Si scroll >50%, prefetch les pages suivantes
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 50) {
          const routesToPrefetch = PREFETCH_ROUTES[currentPage] || [];
          routesToPrefetch.slice(0, 2).forEach(route => prefetchRoute(route));
        }
      }, 100);
    };

    // Si idle >3s, prefetch configurator (haute priorité)
    const resetIdleTimer = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        if (currentPage !== 'configurator') {
          prefetchRoute('configurator');
        }
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', resetIdleTimer, { passive: true });
    window.addEventListener('keypress', resetIdleTimer);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keypress', resetIdleTimer);
      clearTimeout(scrollTimeout);
      clearTimeout(idleTimeout);
    };
  }, [currentPage]);
}

// Module preload (pour les gros modules comme configurator)
export function preloadModule(moduleName: string) {
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = `/src/pages/${moduleName}.tsx`;
  document.head.appendChild(link);
}

// Composant wrapper pour ResourceHints + PredictiveNavigation
export function PerformanceOptimizer({ currentPage }: { currentPage: Page }) {
  usePredictiveNavigation(currentPage);

  return <ResourceHints currentPage={currentPage} />;
}
