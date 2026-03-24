import React from 'react';
import { Helmet } from 'react-helmet';
import { Page } from '../../App';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Générateur automatique de breadcrumb selon la page
export function AutoBreadcrumbSchema({ currentPage }: { currentPage: Page }) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hydral.fr';

  const breadcrumbMap: Record<Page, BreadcrumbItem[]> = {
    'home': [
      { name: 'Accueil', url: baseUrl }
    ],
    'concept': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Le Concept', url: `${baseUrl}/concept` }
    ],
    'gamme': [
      { name: 'Accueil', url: baseUrl },
      { name: 'La Gamme', url: `${baseUrl}/gamme` }
    ],
    'product': [
      { name: 'Accueil', url: baseUrl },
      { name: 'La Gamme', url: `${baseUrl}/gamme` },
      { name: 'Robinet 5-en-1', url: `${baseUrl}/product` }
    ],
    'modules': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Modules & Options', url: `${baseUrl}/modules` }
    ],
    'finitions': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Finitions Premium', url: `${baseUrl}/finitions` }
    ],
    'configurator': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Configurateur', url: `${baseUrl}/configurator` }
    ],
    'avantages': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Avantages', url: `${baseUrl}/avantages` }
    ],
    'utilisations': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Utilisations', url: `${baseUrl}/utilisations` }
    ],
    'securite': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Sécurité', url: `${baseUrl}/securite` }
    ],
    'ecoresponsable': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Éco-responsable', url: `${baseUrl}/ecoresponsable` }
    ],
    'cube': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Le Cube', url: `${baseUrl}/cube` }
    ],
    'prix': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Prix Transparent', url: `${baseUrl}/prix` }
    ],
    'inspiration': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Inspiration', url: `${baseUrl}/inspiration` }
    ],
    'support': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Support', url: `${baseUrl}/support` }
    ],
    'shop': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Boutique', url: `${baseUrl}/shop` }
    ],
    'cart': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Boutique', url: `${baseUrl}/shop` },
      { name: 'Panier', url: `${baseUrl}/cart` }
    ],
    'checkout': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Boutique', url: `${baseUrl}/shop` },
      { name: 'Panier', url: `${baseUrl}/cart` },
      { name: 'Paiement', url: `${baseUrl}/checkout` }
    ],
    'installers': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Installateurs Agréés', url: `${baseUrl}/installers` }
    ],
    'subscriptions': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Abonnements', url: `${baseUrl}/subscriptions` }
    ],
    'faq': [
      { name: 'Accueil', url: baseUrl },
      { name: 'FAQ', url: `${baseUrl}/faq` }
    ],
    'legal': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Mentions Légales', url: `${baseUrl}/legal` }
    ],
    'testimonials': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Témoignages', url: `${baseUrl}/testimonials` }
    ],
    'savings': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Calculateur d\'Économies', url: `${baseUrl}/savings` }
    ],
    'objections': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Questions Fréquentes', url: `${baseUrl}/objections` }
    ],
    'mobile-demo': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Démo Mobile', url: `${baseUrl}/mobile-demo` }
    ],
    'warranty': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Garantie', url: `${baseUrl}/warranty` }
    ],
    'payment-security': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Paiement Sécurisé', url: `${baseUrl}/payment-security` }
    ],
    'blog': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Blog', url: `${baseUrl}/blog` }
    ],
    'video-hub': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Vidéos', url: `${baseUrl}/video-hub` }
    ],
    'resources': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Ressources', url: `${baseUrl}/resources` }
    ],
    'shipping-tracking': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Suivi de Commande', url: `${baseUrl}/shipping-tracking` }
    ],
    'virtual-showroom': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Showroom Virtuel', url: `${baseUrl}/virtual-showroom` }
    ],
    'personalization': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Personnalisation', url: `${baseUrl}/personalization` }
    ],
    'robinet-choice': [
      { name: 'Accueil', url: baseUrl },
      { name: 'Guide de Choix', url: `${baseUrl}/robinet-choice` }
    ]
  };

  const items = breadcrumbMap[currentPage] || breadcrumbMap['home'];

  return <BreadcrumbSchema items={items} />;
}
