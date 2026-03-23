import { ChevronRight, Home } from 'lucide-react';
import { Page } from '../App';

interface BreadcrumbsProps {
  currentPage: Page;
  productName?: string;
  navigate: (page: Page) => void;
}

interface BreadcrumbItem {
  label: string;
  page?: Page;
  active: boolean;
}

export function Breadcrumbs({ currentPage, productName, navigate }: BreadcrumbsProps) {
  const breadcrumbConfig: Record<Page, BreadcrumbItem[]> = {
    home: [
      { label: 'Accueil', page: 'home', active: true }
    ],
    concept: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Le Concept', active: true }
    ],
    gamme: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Gamme', active: true }
    ],
    product: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Gamme', page: 'gamme', active: false },
      { label: productName || 'Produit', active: true }
    ],
    modules: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Modules', active: true }
    ],
    finitions: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Finitions', active: true }
    ],
    configurator: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Configurateur', active: true }
    ],
    avantages: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Avantages', active: true }
    ],
    utilisations: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Utilisations', active: true }
    ],
    securite: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Sécurité', active: true }
    ],
    ecoresponsable: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Écoresponsable', active: true }
    ],
    cube: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Le CUBE', active: true }
    ],
    prix: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Prix Transparent', active: true }
    ],
    faq: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'FAQ', active: true }
    ],
    inspiration: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Inspiration', active: true }
    ],
    support: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Support', active: true }
    ],
    shop: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Boutique', active: true }
    ],
    cart: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Boutique', page: 'shop', active: false },
      { label: 'Panier', active: true }
    ],
    checkout: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Boutique', page: 'shop', active: false },
      { label: 'Panier', page: 'cart', active: false },
      { label: 'Commande', active: true }
    ],
    account: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Mon Compte', active: true }
    ],
    installers: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Installateurs', active: true }
    ],
    subscriptions: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Abonnements', active: true }
    ],
    legal: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Mentions Légales', active: true }
    ],
    testimonials: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Avis Clients', active: true }
    ],
    comparison: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Comparatif', active: true }
    ],
    calculator: [
      { label: 'Accueil', page: 'home', active: false },
      { label: 'Calculateur', active: true }
    ]
  };

  const breadcrumbs = breadcrumbConfig[currentPage] || breadcrumbConfig.home;

  // Ne pas afficher sur la page d'accueil
  if (currentPage === 'home') {
    return null;
  }

  // Générer les données structurées pour SEO
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.page ? `https://hydral.fr/${item.page === 'home' ? '' : item.page}` : undefined
    }))
  };

  // Injecter les données structurées
  if (typeof window !== 'undefined') {
    const existingScript = document.querySelector('script[data-breadcrumb]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb', 'true');
    script.text = JSON.stringify(breadcrumbStructuredData);
    document.head.appendChild(script);
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-white/50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              
              {item.active ? (
                <span className="text-[#6B1E3E]" aria-current="page">
                  {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => item.page && navigate(item.page)}
                  className="text-gray-600 hover:text-[#6B1E3E] transition-colors"
                >
                  {index === 0 && <Home className="w-4 h-4 inline mr-1" />}
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}