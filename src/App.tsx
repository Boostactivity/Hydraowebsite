import { lazy, Suspense, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollProgress } from './components/ScrollProgress';
import { SmartBreadcrumbs } from './components/conversion/SmartBreadcrumbs';
import { SEOSchemas } from './components/seo/SEOSchemas';
import { PerformanceOptimizer } from './components/performance/ResourceHints';
import { ServiceWorkerProvider, OfflineIndicator } from './components/performance/ServiceWorkerProvider';
import { PerformanceMonitor } from './components/performance/PerformanceMonitor';
import { TrustBadgesBar } from './components/TrustBadgesBar';
import { CartProvider } from './context/CartContext';
import { PersonaProvider } from './context/PersonaContext';
import { SEOHead } from './components/SEOHead';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { MotionConfig } from 'motion/react';

// Import direct de HomePage pour chargement instantané
import { HomePage } from './pages/HomePage';

// Lazy load des autres pages uniquement
const ConceptPage = lazy(() => import('./pages/ConceptPage').then(m => ({ default: m.ConceptPage })));
const GammePage = lazy(() => import('./pages/GammePage').then(m => ({ default: m.GammePage })));
const ProductPage = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductPage })));
const ModulesPage = lazy(() => import('./pages/ModulesPage').then(m => ({ default: m.ModulesPage })));
const FinitionsPage = lazy(() => import('./pages/FinitionsPage').then(m => ({ default: m.FinitionsPage })));
const ConfiguratorPage = lazy(() => import('./pages/ConfiguratorPage').then(m => ({ default: m.ConfiguratorPage })));
const AvantagesPage = lazy(() => import('./pages/AvantagesPage').then(m => ({ default: m.AvantagesPage })));
const UtilisationsPage = lazy(() => import('./pages/UtilisationsPage').then(m => ({ default: m.UtilisationsPage })));
const SecuritePage = lazy(() => import('./pages/SecuritePage').then(m => ({ default: m.SecuritePage })));
const EcoresponsablePage = lazy(() => import('./pages/EcoresponsablePage').then(m => ({ default: m.EcoresponsablePage })));
const CubePage = lazy(() => import('./pages/CubePage').then(m => ({ default: m.CubePage })));
const PrixPage = lazy(() => import('./pages/PrixTransparentPage').then(m => ({ default: m.PrixTransparentPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const InspirationPage = lazy(() => import('./pages/InspirationPage').then(m => ({ default: m.InspirationPage })));
const SupportPage = lazy(() => import('./pages/SupportPage').then(m => ({ default: m.SupportPage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const InstallersPage = lazy(() => import('./pages/InstallersPage').then(m => ({ default: m.InstallersPage })));
const SubscriptionsPage = lazy(() => import('./pages/SubscriptionsPage').then(m => ({ default: m.SubscriptionsPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(m => ({ default: m.LegalPage })));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage').then(m => ({ default: m.TestimonialsPage })));
const SavingsPage = lazy(() => import('./pages/SavingsPage').then(m => ({ default: m.SavingsPage })));
const ObjectionsPage = lazy(() => import('./pages/ObjectionsPage').then(m => ({ default: m.ObjectionsPage })));
const WarrantyPage = lazy(() => import('./pages/WarrantyPage').then(m => ({ default: m.WarrantyPage })));
const PaymentSecurityPage = lazy(() => import('./pages/PaymentSecurityPage').then(m => ({ default: m.PaymentSecurityPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const VideoHubPage = lazy(() => import('./pages/VideoHubPage').then(m => ({ default: m.VideoHubPage })));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const ShippingTrackingPage = lazy(() => import('./pages/ShippingTrackingPage').then(m => ({ default: m.ShippingTrackingPage })));
const VirtualShowroomPage = lazy(() => import('./pages/VirtualShowroomPage').then(m => ({ default: m.VirtualShowroom })));
const PersonalizationPage = lazy(() => import('./pages/PersonalizationPage').then(m => ({ default: m.PersonalizationPage })));

export type Page =
  | 'home'
  | 'concept'
  | 'gamme'
  | 'product'
  | 'modules'
  | 'finitions'
  | 'configurator'
  | 'avantages'
  | 'utilisations'
  | 'securite'
  | 'ecoresponsable'
  | 'cube'
  | 'prix'
  | 'inspiration'
  | 'support'
  | 'shop'
  | 'cart'
  | 'checkout'
  | 'installers'
  | 'subscriptions'
  | 'faq'
  | 'legal'
  | 'testimonials'
  | 'savings'
  | 'objections'
  | 'mobile-demo'
  | 'warranty'
  | 'payment-security'
  | 'blog'
  | 'video-hub'
  | 'resources'
  | 'shipping-tracking'
  | 'virtual-showroom'
  | 'personalization'
  | 'robinet-choice';

// Mapping Page → URL path
const PAGE_TO_PATH: Record<Page, string> = {
  'home': '/',
  'concept': '/concept',
  'gamme': '/gamme',
  'product': '/produit',
  'modules': '/modules',
  'finitions': '/finitions',
  'configurator': '/configurateur',
  'avantages': '/avantages',
  'utilisations': '/utilisations',
  'securite': '/securite',
  'ecoresponsable': '/ecoresponsable',
  'cube': '/cube',
  'prix': '/prix',
  'inspiration': '/inspiration',
  'support': '/support',
  'shop': '/boutique',
  'cart': '/panier',
  'checkout': '/commande',
  'installers': '/installation',
  'subscriptions': '/abonnements',
  'faq': '/faq',
  'legal': '/mentions-legales',
  'testimonials': '/temoignages',
  'savings': '/calculateur',
  'objections': '/objections',
  'mobile-demo': '/',
  'warranty': '/garantie',
  'payment-security': '/paiement-securise',
  'blog': '/blog',
  'video-hub': '/videos',
  'resources': '/ressources',
  'shipping-tracking': '/suivi-livraison',
  'virtual-showroom': '/showroom',
  'personalization': '/personnalisation',
  'robinet-choice': '/',
};

// Reverse mapping: URL path → Page
const PATH_TO_PAGE: Record<string, Page> = {};
for (const [page, path] of Object.entries(PAGE_TO_PATH)) {
  // Skip duplicates (mobile-demo, robinet-choice map to '/' but 'home' should win)
  if (page !== 'mobile-demo' && page !== 'robinet-choice') {
    PATH_TO_PAGE[path] = page as Page;
  }
}

/** Derive the current Page from the router location pathname */
function useCurrentPage(): Page {
  const location = useLocation();
  return PATH_TO_PAGE[location.pathname] || 'home';
}

/** Hook that returns a navigate function with the same signature as the old one */
function useAppNavigate() {
  const routerNavigate = useNavigate();

  return useCallback((page: Page, params?: { productId?: string; legalType?: string }) => {
    let path = PAGE_TO_PATH[page] || '/';

    // Handle query params
    const searchParams = new URLSearchParams();
    if (params?.productId) {
      searchParams.set('product', params.productId);
    }
    if (params?.legalType) {
      searchParams.set('type', params.legalType);
    }

    const search = searchParams.toString();
    routerNavigate(path + (search ? `?${search}` : ''));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [routerNavigate]);
}

/** Wrapper for pages that need productId from query params */
function ProductRoute({ navigate }: { navigate: (page: Page, params?: { productId?: string; legalType?: string }) => void }) {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product') || '';
  return <ProductPage navigate={navigate} productId={productId} />;
}

/** Wrapper for legal page that needs type from query params */
function LegalRoute({ navigate }: { navigate: (page: Page, params?: { productId?: string; legalType?: string }) => void }) {
  const [searchParams] = useSearchParams();
  const type = (searchParams.get('type') || 'mentions') as 'mentions' | 'privacy' | 'cookies' | 'cgv';
  return <LegalPage navigate={navigate} type={type} />;
}

function AppContent() {
  const navigate = useAppNavigate();
  const currentPage = useCurrentPage();
  const location = useLocation();

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  // Add smooth scroll globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Derive productId and legalType from search params for SEOHead
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const productId = searchParams.get('product') || '';

  return (
    <>
      <SEOHead page={currentPage} productId={productId} />
      <ScrollProgress />
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col overflow-x-hidden">
          <Header navigate={navigate} currentPage={currentPage} />

          {/* Trust Badges Bar - Juste sous la navigation */}
          <TrustBadgesBar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage navigate={navigate} />} />
              <Route path="/concept" element={<Suspense fallback={<LoadingSkeleton />}><ConceptPage navigate={navigate} /></Suspense>} />
              <Route path="/gamme" element={<Suspense fallback={<LoadingSkeleton />}><GammePage navigate={navigate} /></Suspense>} />
              <Route path="/produit" element={<Suspense fallback={<LoadingSkeleton />}><ProductRoute navigate={navigate} /></Suspense>} />
              <Route path="/modules" element={<Suspense fallback={<LoadingSkeleton />}><ModulesPage navigate={navigate} /></Suspense>} />
              <Route path="/finitions" element={<Suspense fallback={<LoadingSkeleton />}><FinitionsPage navigate={navigate} /></Suspense>} />
              <Route path="/configurateur" element={<Suspense fallback={<LoadingSkeleton />}><ConfiguratorPage navigate={navigate} /></Suspense>} />
              <Route path="/avantages" element={<Suspense fallback={<LoadingSkeleton />}><AvantagesPage navigate={navigate} /></Suspense>} />
              <Route path="/utilisations" element={<Suspense fallback={<LoadingSkeleton />}><UtilisationsPage navigate={navigate} /></Suspense>} />
              <Route path="/securite" element={<Suspense fallback={<LoadingSkeleton />}><SecuritePage navigate={navigate} /></Suspense>} />
              <Route path="/ecoresponsable" element={<Suspense fallback={<LoadingSkeleton />}><EcoresponsablePage navigate={navigate} /></Suspense>} />
              <Route path="/cube" element={<Suspense fallback={<LoadingSkeleton />}><CubePage navigate={navigate} /></Suspense>} />
              <Route path="/prix" element={<Suspense fallback={<LoadingSkeleton />}><PrixPage navigate={navigate} /></Suspense>} />
              <Route path="/faq" element={<Suspense fallback={<LoadingSkeleton />}><FAQPage navigate={navigate} /></Suspense>} />
              <Route path="/inspiration" element={<Suspense fallback={<LoadingSkeleton />}><InspirationPage navigate={navigate} /></Suspense>} />
              <Route path="/support" element={<Suspense fallback={<LoadingSkeleton />}><SupportPage navigate={navigate} /></Suspense>} />
              <Route path="/boutique" element={<Suspense fallback={<LoadingSkeleton />}><ShopPage navigate={navigate} /></Suspense>} />
              <Route path="/panier" element={<Suspense fallback={<LoadingSkeleton />}><CartPage navigate={navigate} /></Suspense>} />
              <Route path="/commande" element={<Suspense fallback={<LoadingSkeleton />}><CheckoutPage navigate={navigate} /></Suspense>} />
              <Route path="/installation" element={<Suspense fallback={<LoadingSkeleton />}><InstallersPage navigate={navigate} /></Suspense>} />
              <Route path="/abonnements" element={<Suspense fallback={<LoadingSkeleton />}><SubscriptionsPage navigate={navigate} /></Suspense>} />
              <Route path="/mentions-legales" element={<Suspense fallback={<LoadingSkeleton />}><LegalRoute navigate={navigate} /></Suspense>} />
              <Route path="/temoignages" element={<Suspense fallback={<LoadingSkeleton />}><TestimonialsPage navigate={navigate} /></Suspense>} />
              <Route path="/calculateur" element={<Suspense fallback={<LoadingSkeleton />}><SavingsPage navigate={navigate} /></Suspense>} />
              <Route path="/objections" element={<Suspense fallback={<LoadingSkeleton />}><ObjectionsPage navigate={navigate} /></Suspense>} />
              <Route path="/garantie" element={<Suspense fallback={<LoadingSkeleton />}><WarrantyPage navigate={navigate} /></Suspense>} />
              <Route path="/paiement-securise" element={<Suspense fallback={<LoadingSkeleton />}><PaymentSecurityPage navigate={navigate} /></Suspense>} />
              <Route path="/blog" element={<Suspense fallback={<LoadingSkeleton />}><BlogPage navigate={navigate} /></Suspense>} />
              <Route path="/videos" element={<Suspense fallback={<LoadingSkeleton />}><VideoHubPage navigate={navigate} /></Suspense>} />
              <Route path="/ressources" element={<Suspense fallback={<LoadingSkeleton />}><ResourcesPage navigate={navigate} /></Suspense>} />
              <Route path="/suivi-livraison" element={<Suspense fallback={<LoadingSkeleton />}><ShippingTrackingPage navigate={navigate} /></Suspense>} />
              <Route path="/showroom" element={<Suspense fallback={<LoadingSkeleton />}><VirtualShowroomPage navigate={navigate} /></Suspense>} />
              <Route path="/personnalisation" element={<Suspense fallback={<LoadingSkeleton />}><PersonalizationPage navigate={navigate} /></Suspense>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer navigate={navigate} />

          {/* BATCH 24 - Smart Breadcrumbs (Bonus SEO) */}
          <SmartBreadcrumbs currentPage={currentPage} navigate={navigate} />

          {/* BATCH 26 - SEO Schemas (Points 126-129) - Rich Snippets Google */}
          <SEOSchemas currentPage={currentPage} />

          {/* BATCH 27 - Performance Optimizer (Points 131-135) - Web Vitals */}
          <PerformanceOptimizer currentPage={currentPage} />

          {/* BATCH 27 - Offline Indicator */}
          <OfflineIndicator />

          {/* BATCH 27 - Performance Monitor (Dev only) */}
          <PerformanceMonitor />
        </div>
      </MotionConfig>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ServiceWorkerProvider>
        <CartProvider>
          <PersonaProvider>
            <AppContent />
          </PersonaProvider>
        </CartProvider>
      </ServiceWorkerProvider>
    </ErrorBoundary>
  );
}
