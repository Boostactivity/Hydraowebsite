import { useEffect } from 'react';
import { Page } from '../App';

interface SEOHeadProps {
  page: Page;
  productId?: string;
}

interface SEOData {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  ogType: 'website' | 'product' | 'article';
  structuredData?: any;
}

const BASE_URL = 'https://hydral.fr';
const BRAND_NAME = 'HYDRAL';
const SITE_NAME = 'HYDRAL - Robinet 5-en-1 Premium';

export function SEOHead({ page, productId }: SEOHeadProps) {
  const seoData = getSEOData(page, productId);

  useEffect(() => {
    // Update title
    document.title = seoData.title;

    // Update or create meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords.join(', '));
    
    // Canonical URL
    updateLinkTag('canonical', seoData.canonical);

    // Open Graph
    updateMetaTag('og:title', seoData.title, 'property');
    updateMetaTag('og:description', seoData.description, 'property');
    updateMetaTag('og:url', seoData.canonical, 'property');
    updateMetaTag('og:type', seoData.ogType, 'property');
    updateMetaTag('og:site_name', SITE_NAME, 'property');
    updateMetaTag('og:locale', 'fr_FR', 'property');
    updateMetaTag('og:image', `${BASE_URL}/og-image.jpg`, 'property');
    updateMetaTag('og:image:alt', 'Robinet HYDRAL 5-en-1 - Eau bouillante, filtrée, pétillante', 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', seoData.title, 'name');
    updateMetaTag('twitter:description', seoData.description, 'name');
    updateMetaTag('twitter:image', `${BASE_URL}/og-image.jpg`, 'name');

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', 'name');
    updateMetaTag('language', 'French', 'name');
    updateMetaTag('author', BRAND_NAME, 'name');
    
    // Mobile theme color
    updateMetaTag('theme-color', '#6B1E3E', 'name');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent', 'name');
    updateMetaTag('apple-mobile-web-app-capable', 'yes', 'name');

    // Structured Data
    if (seoData.structuredData) {
      updateStructuredData(seoData.structuredData);
    }
  }, [page, productId]);

  return null;
}

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  
  element.setAttribute('href', href);
}

function updateStructuredData(data: any) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

function getSEOData(page: Page, productId?: string): SEOData {
  const seoPages: Record<Page, SEOData> = {
    home: {
      title: `${BRAND_NAME} - Robinet 5-en-1 Premium | Eau Bouillante, Filtrée, Pétillante`,
      description: 'Découvrez HYDRAL, le robinet 5-en-1 haut de gamme à 490€. Eau bouillante instantanée, filtrée, pétillante, chaude et froide. Transformez votre cuisine avec la technologie européenne premium.',
      canonical: `${BASE_URL}/`,
      keywords: ['robinet 5 en 1', 'robinet eau bouillante', 'robinet premium', 'eau pétillante robinet', 'HYDRAL', 'robinet cuisine', 'eau filtrée', 'robinet intelligent'],
      ogType: 'website',
      structuredData: getOrganizationSchema()
    },
    concept: {
      title: `Le Concept ${BRAND_NAME} - 5 Types d'Eau en Un Seul Robinet`,
      description: 'Le robinet HYDRAL révolutionne votre cuisine : eau bouillante 100°C, froide filtrée, pétillante, chaude et froide en un seul point. Design européen premium.',
      canonical: `${BASE_URL}/concept`,
      keywords: ['concept HYDRAL', 'robinet multifonction', '5 types eau', 'innovation cuisine', 'technologie robinet'],
      ogType: 'article',
      structuredData: getArticleSchema('Le Concept HYDRAL', 'Découvrez comment HYDRAL transforme votre expérience en cuisine')
    },
    gamme: {
      title: `Gamme ${BRAND_NAME} - 5 Modèles de Robinets Premium | FLEX, SQUARE, FUSION`,
      description: 'Découvrez nos 5 modèles de robinets HYDRAL : FLEX extractible, SQUARE moderne, FUSION minimaliste, CLASSIC intemporel, PRO professionnel. Design premium pour tous les styles.',
      canonical: `${BASE_URL}/gamme`,
      keywords: ['gamme HYDRAL', 'modèles robinets', 'robinet FLEX', 'robinet SQUARE', 'robinet design', 'choix robinet'],
      ogType: 'website',
      structuredData: getProductCollectionSchema()
    },
    product: {
      title: `Robinet ${BRAND_NAME} ${productId?.toUpperCase()} - 490€ TTC | 5 Types d'Eau`,
      description: `Robinet ${productId?.toUpperCase()} HYDRAL : design premium, 5 types d'eau (bouillante, filtrée, pétillante, chaude, froide). Prix transparent 490€ TTC avec abonnement consommables dès 59€/an.`,
      canonical: `${BASE_URL}/produit/${productId}`,
      keywords: [`robinet ${productId}`, 'HYDRAL', 'robinet premium', 'eau bouillante', 'prix robinet', '490 euros'],
      ogType: 'product',
      structuredData: getProductSchema(productId || '')
    },
    modules: {
      title: `Modules Techniques ${BRAND_NAME} - Boiler, Chiller, CO₂, Filtration`,
      description: 'Modules sous-évier HYDRAL : boiler compact 3L pour eau bouillante, chiller pro réfrigération, système CO₂ pour eau pétillante, filtre premium. Technologie européenne.',
      canonical: `${BASE_URL}/modules`,
      keywords: ['modules HYDRAL', 'boiler eau bouillante', 'chiller', 'système CO2', 'filtre eau', 'modules sous-évier'],
      ogType: 'article'
    },
    finitions: {
      title: `Finitions Premium ${BRAND_NAME} - Chrome, Noir Mat, Or Brossé, 8 Options`,
      description: 'Choisissez parmi 8 finitions premium HYDRAL : chrome brillant, acier brossé, noir mat, blanc mat, or brossé, cuivre, champagne, gun metal. Personnalisez votre robinet.',
      canonical: `${BASE_URL}/finitions`,
      keywords: ['finitions robinet', 'robinet noir mat', 'robinet or', 'robinet chrome', 'personnalisation robinet', 'couleur robinet'],
      ogType: 'article'
    },
    configurator: {
      title: `Configurateur ${BRAND_NAME} - Choisissez Votre Robinet 5-en-1`,
      description: 'Choisissez votre robinet HYDRAL en ligne : modèle, finition, modules et abonnement. Visualisation 3D en temps réel. Devis instantané.',
      canonical: `${BASE_URL}/configurateur`,
      keywords: ['configurateur robinet', 'personnaliser robinet', 'devis robinet', 'configurateur HYDRAL', 'robinet sur mesure'],
      ogType: 'website'
    },
    avantages: {
      title: `Avantages ${BRAND_NAME} - Économies, Confort, Écologie, Santé`,
      description: 'Les avantages du robinet HYDRAL : économies jusqu\'à 1 000€/an, gain de place, écologie (fin des bouteilles plastique), eau purifiée, confort au quotidien.',
      canonical: `${BASE_URL}/avantages`,
      keywords: ['avantages robinet', 'économies eau', 'robinet écologique', 'eau purifiée', 'confort cuisine', 'fin bouteilles plastique'],
      ogType: 'article'
    },
    utilisations: {
      title: `Utilisations ${BRAND_NAME} - Thé, Café, Cuisine, Biberon, 50+ Usages`,
      description: 'Plus de 50 utilisations quotidiennes avec HYDRAL : thé et café parfaits, cuisson rapide, préparation biberon, boissons froides, eau pétillante. Simplicité au quotidien.',
      canonical: `${BASE_URL}/utilisations`,
      keywords: ['utilisations robinet', 'eau bouillante thé', 'café robinet', 'cuisine rapide', 'préparation biberon', 'eau pétillante maison'],
      ogType: 'article'
    },
    securite: {
      title: `Sécurité ${BRAND_NAME} - Protection Brûlures, Sécurité Enfants, Normes CE`,
      description: 'Sécurité maximale HYDRAL : protection anti-brûlure, sécurité enfants intégrée, normes CE et NF, détection de fuite, isolation thermique. Tranquillité garantie.',
      canonical: `${BASE_URL}/securite`,
      keywords: ['sécurité robinet', 'protection anti-brûlure', 'sécurité enfants', 'normes CE', 'robinet sécurisé', 'protection eau bouillante'],
      ogType: 'article'
    },
    ecoresponsable: {
      title: `Écoresponsabilité ${BRAND_NAME} - Fin du Plastique, Économies d'Énergie`,
      description: 'HYDRAL écoresponsable : éliminez 2000 bouteilles plastique/an, réduisez votre empreinte carbone de 80%, économies d\'énergie A++, filtration écologique.',
      canonical: `${BASE_URL}/ecoresponsable`,
      keywords: ['robinet écologique', 'fin bouteilles plastique', 'économies énergie', 'empreinte carbone', 'développement durable', 'eau écologique'],
      ogType: 'article'
    },
    cube: {
      title: `CUBE ${BRAND_NAME} - Unité Sous-Évier Compacte | Installation Facile`,
      description: 'Le CUBE HYDRAL : unité sous-évier ultra-compacte, installation en environ 1h, technologie tout-en-un. Boiler, chiller, CO₂ et filtration dans un seul module 40x40cm.',
      canonical: `${BASE_URL}/cube`,
      keywords: ['cube HYDRAL', 'unité sous-évier', 'installation robinet', 'module compact', 'système tout-en-un'],
      ogType: 'product'
    },
    prix: {
      title: `Prix Transparent ${BRAND_NAME} - 490€ TTC + Abonnement 59-119€/an`,
      description: 'Prix transparent HYDRAL : robinet 490€ TTC, abonnements consommables de 59€ à 119€/an. TCO complet détaillé, comparaison avec bouteilles, calcul économies réelles.',
      canonical: `${BASE_URL}/prix`,
      keywords: ['prix HYDRAL', '490 euros', 'abonnement robinet', 'coût total', 'TCO robinet', 'prix transparent', 'économies robinet'],
      ogType: 'article'
    },
    faq: {
      title: `FAQ ${BRAND_NAME} - Questions Fréquentes | Installation, Utilisation, Entretien`,
      description: 'Toutes vos questions sur HYDRAL : installation, compatibilité, entretien, garantie, abonnements, consommation électrique. Réponses détaillées et transparentes.',
      canonical: `${BASE_URL}/faq`,
      keywords: ['FAQ HYDRAL', 'questions robinet', 'installation robinet', 'entretien robinet', 'garantie HYDRAL', 'aide HYDRAL'],
      ogType: 'article',
      structuredData: getFAQSchema()
    },
    inspiration: {
      title: `Inspiration ${BRAND_NAME} - Galerie de Cuisines Premium avec Robinet 5-en-1`,
      description: 'Découvrez des cuisines équipées HYDRAL : designs modernes, classiques, minimalistes. Inspirez-vous de vraies installations pour votre projet cuisine premium.',
      canonical: `${BASE_URL}/inspiration`,
      keywords: ['inspiration cuisine', 'galerie HYDRAL', 'cuisine moderne', 'design cuisine', 'robinet cuisine premium'],
      ogType: 'article'
    },
    support: {
      title: `Support ${BRAND_NAME} - Assistance, Documentation, Contact`,
      description: 'Support HYDRAL : guides d\'utilisation, vidéos tutoriels, documentation technique, assistance par téléphone, email et chat. Équipe disponible 6j/7.',
      canonical: `${BASE_URL}/support`,
      keywords: ['support HYDRAL', 'assistance robinet', 'aide HYDRAL', 'contact HYDRAL', 'documentation technique', 'service client'],
      ogType: 'website'
    },
    shop: {
      title: `Boutique ${BRAND_NAME} - Filtres, CO₂, Accessoires, Consommables`,
      description: 'Boutique HYDRAL : filtres premium, cartouches CO₂, bouteilles réutilisables, kits d\'entretien. Commandez vos consommables en ligne, livraison rapide.',
      canonical: `${BASE_URL}/boutique`,
      keywords: ['boutique HYDRAL', 'filtres robinet', 'cartouches CO2', 'accessoires HYDRAL', 'consommables robinet', 'achat filtres'],
      ogType: 'website'
    },
    cart: {
      title: `Panier - ${BRAND_NAME}`,
      description: 'Votre panier HYDRAL : finalisez votre commande de robinet 5-en-1, modules et accessoires. Paiement sécurisé, livraison gratuite.',
      canonical: `${BASE_URL}/panier`,
      keywords: ['panier HYDRAL', 'commander robinet', 'achat HYDRAL'],
      ogType: 'website'
    },
    checkout: {
      title: `Commande - ${BRAND_NAME}`,
      description: 'Finalisez votre commande HYDRAL : paiement sécurisé, livraison gratuite. Transformez votre cuisine aujourd\'hui.',
      canonical: `${BASE_URL}/commande`,
      keywords: ['commande HYDRAL', 'achat robinet', 'paiement sécurisé'],
      ogType: 'website'
    },
    installers: {
      title: `Installation ${BRAND_NAME} - Guide et Compatibilité Plomberie`,
      description: 'Installation simple du robinet HYDRAL : guide vidéo, compatibilité plomberie standard, réalisable par un bricoleur ou le plombier de votre choix.',
      canonical: `${BASE_URL}/installateurs`,
      keywords: ['pose robinet', 'installation robinet', 'compatibilité plomberie', 'robinet HYDRAL'],
      ogType: 'website'
    },
    subscriptions: {
      title: `Abonnements ${BRAND_NAME} - Filtres et CO₂ dès 59€/an | 3 Formules`,
      description: 'Abonnements HYDRAL : Filtre Only 59€/an, Standard 99€/an, Plus 119€/an. Livraison automatique filtres et CO₂, sans engagement, cadeaux inclus.',
      canonical: `${BASE_URL}/abonnements`,
      keywords: ['abonnements HYDRAL', 'abonnement filtre', 'abonnement CO2', '59 euros par an', 'consommables robinet', 'livraison automatique'],
      ogType: 'website',
      structuredData: getSubscriptionSchema()
    },
    legal: {
      title: `Mentions Légales - ${BRAND_NAME}`,
      description: 'Mentions légales, CGV, politique de confidentialité et conditions d\'utilisation HYDRAL. Transparence et conformité RGPD.',
      canonical: `${BASE_URL}/mentions-legales`,
      keywords: ['mentions légales', 'CGV HYDRAL', 'confidentialité', 'RGPD'],
      ogType: 'website'
    },
    testimonials: {
      title: `Avis Clients ${BRAND_NAME} - Témoignages Vérifiés | 4.9/5`,
      description: 'Découvrez les avis clients HYDRAL : témoignages vérifiés, retours d\'expérience authentiques, photos installations. Note moyenne 4.9/5 sur 47 avis.',
      canonical: `${BASE_URL}/avis`,
      keywords: ['avis HYDRAL', 'témoignages clients', 'retours expérience', 'avis robinet', 'satisfaction clients'],
      ogType: 'article',
      structuredData: getReviewsSchema()
    },
    savings: {
      title: `Calculez Vos Économies ${BRAND_NAME} - Combien Vous Allez Économiser`,
      description: 'Découvrez combien vous économisez avec HYDRAL : jusqu\'à 300€ à 1 000€/an selon votre foyer. Comparaison transparente eau embouteillée vs robinet 5-en-1.',
      canonical: `${BASE_URL}/economies`,
      keywords: ['économies eau robinet', 'prix eau bouteille vs robinet', 'calculer économies HYDRAL', 'rentabilité robinet 5-en-1', 'économies annuelles'],
      ogType: 'website'
    },
    objections: {
      title: `Vos Questions sur ${BRAND_NAME} - Nous Répondons Sans Détour`,
      description: 'Trop cher ? Installation compliquée ? Locataire ? Nous répondons honnêtement à toutes vos objections sur le robinet HYDRAL.',
      canonical: `${BASE_URL}/objections`,
      keywords: ['robinet trop cher', 'installation robinet', 'locataire robinet', 'objections HYDRAL'],
      ogType: 'article'
    },
    'mobile-demo': {
      title: `Démo Mobile ${BRAND_NAME} - Découvrez HYDRAL sur Votre Smartphone`,
      description: 'Explorez les fonctionnalités HYDRAL optimisées pour mobile : vidéos, carrousel tactile, formulaires simplifiés.',
      canonical: `${BASE_URL}/demo-mobile`,
      keywords: ['demo HYDRAL', 'robinet mobile', 'HYDRAL smartphone'],
      ogType: 'website'
    },
    warranty: {
      title: `Garantie 3 Ans ${BRAND_NAME} - SAV Français, Pièces & Main d'Oeuvre`,
      description: 'Garantie constructeur 3 ans HYDRAL : pièces et main d\'oeuvre, SAV français réactif, technicien à domicile. Tranquillité totale.',
      canonical: `${BASE_URL}/garantie`,
      keywords: ['garantie HYDRAL', 'SAV robinet', 'garantie 3 ans', 'service après-vente'],
      ogType: 'article'
    },
    'payment-security': {
      title: `Paiement Sécurisé ${BRAND_NAME} - SSL, 3D Secure, Données Protégées`,
      description: 'Paiement 100% sécurisé sur HYDRAL : SSL, 3D Secure, conformité PCI-DSS. Vos données sont protégées.',
      canonical: `${BASE_URL}/paiement-securise`,
      keywords: ['paiement sécurisé', 'HYDRAL sécurité', 'SSL', '3D Secure'],
      ogType: 'article'
    },
    blog: {
      title: `Blog ${BRAND_NAME} - Conseils, Recettes et Actualités`,
      description: 'Le blog HYDRAL : conseils d\'utilisation, recettes avec eau pétillante, guides d\'entretien, témoignages clients.',
      canonical: `${BASE_URL}/blog`,
      keywords: ['blog HYDRAL', 'conseils robinet', 'recettes eau pétillante', 'entretien robinet'],
      ogType: 'article'
    },
    'video-hub': {
      title: `Vidéos ${BRAND_NAME} - Tutoriels, Démonstrations et Témoignages`,
      description: 'Vidéos HYDRAL : tutoriels d\'installation, démonstrations produit, témoignages clients en vidéo.',
      canonical: `${BASE_URL}/videos`,
      keywords: ['vidéos HYDRAL', 'tutoriel installation', 'démonstration robinet'],
      ogType: 'website'
    },
    resources: {
      title: `Ressources ${BRAND_NAME} - Guides, Documentation et FAQ`,
      description: 'Centre de ressources HYDRAL : guides téléchargeables, documentation technique, FAQ complète.',
      canonical: `${BASE_URL}/ressources`,
      keywords: ['ressources HYDRAL', 'guides robinet', 'documentation technique'],
      ogType: 'website'
    },
    'shipping-tracking': {
      title: `Suivi de Commande ${BRAND_NAME} - Livraison et Tracking`,
      description: 'Suivez votre commande HYDRAL en temps réel. Livraison gratuite en France, suivi détaillé.',
      canonical: `${BASE_URL}/suivi-commande`,
      keywords: ['suivi commande HYDRAL', 'livraison robinet', 'tracking'],
      ogType: 'website'
    },
    'virtual-showroom': {
      title: `Showroom Virtuel ${BRAND_NAME} - Visualisez HYDRAL dans Votre Cuisine`,
      description: 'Explorez le showroom virtuel HYDRAL : visualisez nos robinets dans différents styles de cuisines.',
      canonical: `${BASE_URL}/showroom`,
      keywords: ['showroom HYDRAL', 'visualisation cuisine', 'robinet 3D'],
      ogType: 'website'
    },
    personalization: {
      title: `Personnalisation ${BRAND_NAME} - Couleurs et Gravures sur Mesure`,
      description: 'Personnalisez votre HYDRAL : choix de couleurs, gravures, pack de bienvenue personnalisé.',
      canonical: `${BASE_URL}/personnalisation`,
      keywords: ['personnalisation HYDRAL', 'robinet sur mesure', 'couleurs robinet'],
      ogType: 'website'
    },
    'robinet-choice': {
      title: `Guide de Choix ${BRAND_NAME} - Quel Robinet est Fait Pour Vous ?`,
      description: 'Trouvez le robinet HYDRAL idéal pour votre cuisine. Guide interactif basé sur vos besoins.',
      canonical: `${BASE_URL}/guide-choix`,
      keywords: ['guide choix robinet', 'quel robinet choisir', 'HYDRAL modèles'],
      ogType: 'website'
    }
  };

  return seoPages[page] || seoPages.home;
}

// Structured Data Schemas

function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: 'HYDRAL - Robinets 5-en-1 premium avec eau bouillante, filtrée, pétillante. Design européen premium.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33 1 76 34 00 00',
      contactType: 'customer service',
      availableLanguage: ['French'],
      areaServed: 'FR'
    },
    sameAs: [
      'https://www.facebook.com/hydral',
      'https://www.instagram.com/hydral',
      'https://www.linkedin.com/company/hydral'
    ]
  };
}

function getProductSchema(productId: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Robinet HYDRAL ${productId.toUpperCase()} 5-en-1`,
    description: 'Robinet premium 5 types d\'eau : bouillante 100°C, froide filtrée, pétillante, chaude et froide.',
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME
    },
    offers: {
      '@type': 'Offer',
      price: '490',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/produit/${productId}`,
      priceValidUntil: '2026-12-31',
      seller: {
        '@type': 'Organization',
        name: BRAND_NAME
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

function getProductCollectionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Gamme de Robinets HYDRAL',
    description: '5 modèles de robinets premium 5-en-1',
    url: `${BASE_URL}/gamme`
  };
}

function getArticleSchema(title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: BRAND_NAME
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`
      }
    },
    datePublished: '2025-01-01',
    dateModified: '2026-03-01'
  };
}

function getFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quel est le prix du robinet HYDRAL ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le robinet HYDRAL coûte 490€ TTC, avec des abonnements consommables de 59€ à 119€ par an selon vos besoins.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quels types d\'eau propose HYDRAL ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HYDRAL propose 5 types d\'eau : bouillante à 100°C, froide filtrée, pétillante réfrigérée, chaude et froide classique, le tout en un seul robinet.'
        }
      },
      {
        '@type': 'Question',
        name: 'L\'installation est-elle difficile ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'L\'installation prend environ 1h et peut être réalisée par un bricoleur ou un professionnel de votre choix.'
        }
      }
    ]
  };
}

function getSubscriptionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Abonnements HYDRAL',
    description: 'Abonnements consommables pour robinet HYDRAL : filtres premium et cartouches CO₂',
    provider: {
      '@type': 'Organization',
      name: BRAND_NAME
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Filtre Only',
        price: '59',
        priceCurrency: 'EUR',
        billingDuration: 'P1Y'
      },
      {
        '@type': 'Offer',
        name: 'Standard',
        price: '99',
        priceCurrency: 'EUR',
        billingDuration: 'P1Y'
      },
      {
        '@type': 'Offer',
        name: 'Plus',
        price: '119',
        priceCurrency: 'EUR',
        billingDuration: 'P1Y'
      },
    ]
  };
}

function getReviewsSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Robinet HYDRAL 5-en-1',
    description: 'Robinet premium offrant 5 types d\'eau : bouillante, filtrée, pétillante, chaude et froide. Installation simple.',
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME
    },
    offers: {
      '@type': 'Offer',
      price: '490',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
      url: `${BASE_URL}/configurator`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sophie M.'
        },
        datePublished: '2026-01-15',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'J\'ai arrêté de compter le temps gagné chaque jour. Plus de bouilloire, plus de packs d\'eau à porter. HYDRAL a transformé ma cuisine.'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Thomas D.'
        },
        datePublished: '2026-02-22',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'HYDRAL offre un excellent rapport qualité-prix pour un robinet premium 5-en-1. Produit de qualité, service client réactif. Je recommande.'
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Claire R.'
        },
        datePublished: '2026-03-05',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: '100% de mes projets de rénovation incluent maintenant un robinet 5-en-1. C\'est devenu le standard pour mes clients.'
      }
    ]
  };
}