import { lazy, Suspense, useState, useEffect, startTransition } from 'react';
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
import { motion, AnimatePresence, MotionConfig } from 'motion/react';

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
const MobileDemoPage = lazy(() => import('./pages/MobileDemoPage').then(m => ({ default: m.MobileDemoPage })));
const WarrantyPage = lazy(() => import('./pages/WarrantyPage').then(m => ({ default: m.WarrantyPage })));
const PaymentSecurityPage = lazy(() => import('./pages/PaymentSecurityPage').then(m => ({ default: m.PaymentSecurityPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const VideoHubPage = lazy(() => import('./pages/VideoHubPage').then(m => ({ default: m.VideoHubPage })));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const ShippingTrackingPage = lazy(() => import('./pages/ShippingTrackingPage').then(m => ({ default: m.ShippingTrackingPage })));
const VirtualShowroomPage = lazy(() => import('./pages/VirtualShowroomPage').then(m => ({ default: m.VirtualShowroom })));
const PersonalizationPage = lazy(() => import('./pages/PersonalizationPage').then(m => ({ default: m.PersonalizationPage })));
const RobinetChoicePage = lazy(() => import('./pages/RobinetChoicePage').then(m => ({ default: m.RobinetChoicePage })));

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

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [productId, setProductId] = useState<string>('');
  const [legalType, setLegalType] = useState<string>('mentions');

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentPage]);

  // Add smooth scroll globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const navigate = (page: Page, params?: { productId?: string; legalType?: string }) => {
    startTransition(() => {
      setCurrentPage(page);
      // Toujours réinitialiser les paramètres, puis appliquer les nouveaux si fournis
      setProductId(params?.productId || '');
      setLegalType(params?.legalType || 'mentions');
    });
  };

  const renderPage = () => {
    // HomePage chargée directement (pas de Suspense nécessaire)
    if (currentPage === 'home') {
      return <HomePage key="home" navigate={navigate} />;
    }
    
    // Autres pages avec Suspense (lazy loaded)
    // La key force React à recréer le composant lors du changement de page
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        {(() => {
          switch (currentPage) {
            case 'concept':
              return <ConceptPage key="concept" navigate={navigate} />;
            case 'gamme':
              return <GammePage key="gamme" navigate={navigate} />;
            case 'product':
              return <ProductPage key={`product-${productId}`} navigate={navigate} productId={productId} />;
            case 'modules':
              return <ModulesPage key="modules" navigate={navigate} />;
            case 'finitions':
              return <FinitionsPage key="finitions" navigate={navigate} />;
            case 'configurator':
              return <ConfiguratorPage key="configurator" navigate={navigate} />;
            case 'avantages':
              return <AvantagesPage key="avantages" navigate={navigate} />;
            case 'utilisations':
              return <UtilisationsPage key="utilisations" navigate={navigate} />;
            case 'securite':
              return <SecuritePage key="securite" navigate={navigate} />;
            case 'ecoresponsable':
              return <EcoresponsablePage key="ecoresponsable" navigate={navigate} />;
            case 'cube':
              return <CubePage key="cube" navigate={navigate} />;
            case 'prix':
              return <PrixPage key="prix" navigate={navigate} />;
            case 'faq':
              return <FAQPage key="faq" navigate={navigate} />;
            case 'inspiration':
              return <InspirationPage key="inspiration" navigate={navigate} />;
            case 'support':
              return <SupportPage key="support" navigate={navigate} />;
            case 'shop':
              return <ShopPage key="shop" navigate={navigate} />;
            case 'cart':
              return <CartPage key="cart" navigate={navigate} />;
            case 'checkout':
              return <CheckoutPage key="checkout" navigate={navigate} />;
            case 'installers':
              return <InstallersPage key="installers" navigate={navigate} />;
            case 'subscriptions':
              return <SubscriptionsPage key="subscriptions" navigate={navigate} />;
            case 'legal':
              return <LegalPage key={`legal-${legalType}`} navigate={navigate} type={legalType} />;
            case 'testimonials':
              return <TestimonialsPage key="testimonials" navigate={navigate} />;
            case 'savings':
              return <SavingsPage key="savings" navigate={navigate} />;
            case 'objections':
              return <ObjectionsPage key="objections" navigate={navigate} />;
            case 'mobile-demo':
              return <MobileDemoPage key="mobile-demo" navigate={navigate} />;
            case 'warranty':
              return <WarrantyPage key="warranty" navigate={navigate} />;
            case 'payment-security':
              return <PaymentSecurityPage key="payment-security" navigate={navigate} />;
            case 'blog':
              return <BlogPage key="blog" navigate={navigate} />;
            case 'video-hub':
              return <VideoHubPage key="video-hub" navigate={navigate} />;
            case 'resources':
              return <ResourcesPage key="resources" navigate={navigate} />;
            case 'shipping-tracking':
              return <ShippingTrackingPage key="shipping-tracking" navigate={navigate} />;
            case 'virtual-showroom':
              return <VirtualShowroomPage key="virtual-showroom" navigate={navigate} />;
            case 'personalization':
              return <PersonalizationPage key="personalization" navigate={navigate} />;
            case 'robinet-choice':
              return <RobinetChoicePage key="robinet-choice" navigate={navigate} />;
            default:
              return <HomePage key="home-default" navigate={navigate} />;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <>
      <SEOHead page={currentPage} productId={productId} />
      <ScrollProgress />
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
          <Header navigate={navigate} currentPage={currentPage} />
          
          {/* Trust Badges Bar - Juste sous la navigation */}
          <TrustBadgesBar />
          
          <main className="flex-1">
            {renderPage()}
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