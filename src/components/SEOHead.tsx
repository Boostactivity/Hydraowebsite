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
      title: `HYDRAL — Robinet 5-en-1 Eau Bouillante, Gazeuse, Filtrée | Alternative Quooker dès 490€`,
      description: 'Robinet multifonction cuisine : eau bouillante instantanée, gazeuse, filtrée et froide. Le robinet 5-en-1 premium dès 490€. Alternative Quooker 3x moins cher. Livraison offerte France.',
      canonical: `${BASE_URL}/`,
      keywords: ['robinet eau bouillante', 'robinet 5 en 1', 'robinet eau gazeuse cuisine', 'alternative quooker', 'quooker pas cher', 'robinet multifonction cuisine', 'robinet eau filtrée', 'robinet eau bouillante instantanée', 'robinet cuisine multifonction 5 en 1', 'HYDRAL', 'robinet type quooker moins cher', 'meilleur robinet multifonction cuisine 2026'],
      ogType: 'website',
      structuredData: getOrganizationSchema()
    },
    concept: {
      title: `Comment fonctionne le robinet HYDRAL 5-en-1 | Eau bouillante, gazeuse, filtrée`,
      description: 'Découvrez le fonctionnement du robinet eau bouillante instantanée HYDRAL. Eau gazeuse cuisine, eau filtrée et eau froide en un seul robinet multifonction 5-en-1. Technologie premium dès 490€.',
      canonical: `${BASE_URL}/concept`,
      keywords: ['robinet eau bouillante instantanée', 'robinet eau gazeuse cuisine', 'robinet multifonction cuisine', 'robinet 5 en 1', 'comment fonctionne robinet eau bouillante', 'eau bouillante instantanée avantages', 'robinet eau gazeuse et bouillante'],
      ogType: 'article',
      structuredData: getArticleSchema('Comment fonctionne le robinet HYDRAL 5-en-1', 'Robinet eau bouillante instantanée, gazeuse et filtrée : découvrez le fonctionnement du robinet multifonction HYDRAL')
    },
    gamme: {
      title: `Nos robinets multifonction : Pure, Spark, One | HYDRAL dès 490€`,
      description: 'Comparez nos 3 robinets 5-en-1 : Pure (490€), Spark (890€), One (990€). Robinet multifonction cuisine avec eau bouillante, gazeuse et filtrée. Prix transparent, livraison offerte.',
      canonical: `${BASE_URL}/gamme`,
      keywords: ['robinet 5 en 1 prix', 'robinet multifonction cuisine', 'robinet eau bouillante prix', 'combien coûte un robinet 5 en 1', 'HYDRAL Pure', 'HYDRAL Spark', 'HYDRAL One', 'alternative quooker', 'robinet eau bouillante gazeuse filtrée cuisine'],
      ogType: 'website',
      structuredData: getProductCollectionSchema()
    },
    product: {
      title: `Robinet HYDRAL ${productId?.toUpperCase()} — Eau bouillante gazeuse filtrée | À partir de 490€ TTC`,
      description: `Robinet multifonction ${productId?.toUpperCase()} HYDRAL : eau bouillante instantanée, gazeuse, filtrée, chaude et froide. Robinet 5-en-1 premium dès 490€ TTC. Alternative Quooker jusqu'à 3x moins cher. Livraison offerte.`,
      canonical: `${BASE_URL}/produit/${productId}`,
      keywords: ['robinet eau bouillante', 'robinet 5 en 1', 'robinet eau gazeuse cuisine', 'robinet multifonction cuisine', 'alternative quooker', `HYDRAL ${productId}`, 'robinet eau filtrée', 'robinet eau bouillante gazeuse filtrée cuisine'],
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
      title: `Pourquoi choisir un robinet 5-en-1 ? Économies, santé, écologie | HYDRAL`,
      description: 'Alternative Quooker dès 490€ : économies jusqu\'à 1 000€/an, eau filtrée sans microplastiques, zéro bouteille plastique. Découvrez les avantages du robinet eau filtrée multifonction HYDRAL.',
      canonical: `${BASE_URL}/avantages`,
      keywords: ['alternative quooker', 'robinet eau filtrée', 'robinet 5 en 1', 'microplastique eau bouteille danger', 'eau du robinet vs eau en bouteille', 'robinet multifonction cuisine', 'avis robinet multifonction cuisine', 'filtrer eau du robinet'],
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
      title: `Sécurité robinet eau bouillante | Verrouillage enfant HYDRAL`,
      description: 'Sécurité maximale du robinet eau bouillante HYDRAL : verrouillage enfant intégré, protection anti-brûlure, normes CE et NF, détection de fuite. Robinet 5-en-1 sécurisé pour toute la famille.',
      canonical: `${BASE_URL}/securite`,
      keywords: ['sécurité robinet eau bouillante', 'verrouillage enfant robinet', 'protection anti-brûlure', 'robinet eau bouillante', 'normes CE robinet', 'robinet 5 en 1 sécurité'],
      ogType: 'article'
    },
    ecoresponsable: {
      title: `Robinet écologique : zéro bouteille plastique | HYDRAL écoresponsable`,
      description: 'Éliminez 2000 bouteilles plastique/an avec le robinet 5-en-1 HYDRAL. Microplastiques eau en bouteille : danger évité grâce à l\'eau filtrée. Réduisez votre empreinte carbone de 85%.',
      canonical: `${BASE_URL}/ecoresponsable`,
      keywords: ['microplastique eau bouteille danger', 'plastique bouteille eau santé', 'eau du robinet vs eau en bouteille', 'robinet écologique', 'filtrer eau du robinet', 'robinet eau filtrée', 'zéro bouteille plastique'],
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
      title: `Prix robinet HYDRAL : 490€ à 990€ | Alternative Quooker jusqu'à 3x moins cher`,
      description: 'Robinet eau bouillante prix : HYDRAL dès 490€ vs Quooker à 1500-3500€. Robinet 5-en-1 pas cher avec eau gazeuse, filtrée et bouillante. Comparatif prix complet et TCO détaillé.',
      canonical: `${BASE_URL}/prix`,
      keywords: ['quooker pas cher', 'robinet eau bouillante prix', 'eau bouillante robinet prix', 'combien coûte un robinet 5 en 1', 'alternative quooker', 'robinet type quooker moins cher', 'robinet 5 en 1 prix', 'prix HYDRAL'],
      ogType: 'article'
    },
    faq: {
      title: `FAQ Robinet 5-en-1 HYDRAL | Installation, prix, fonctionnement`,
      description: 'Questions fréquentes sur le robinet eau bouillante HYDRAL : combien coûte un robinet 5-en-1, comment ça fonctionne, installation, alternative Quooker, entretien et garantie.',
      canonical: `${BASE_URL}/faq`,
      keywords: ['robinet eau bouillante', 'combien coûte un robinet 5 en 1', 'robinet 5 en 1', 'alternative quooker', 'comment fonctionne robinet eau bouillante', 'installation robinet 5 en 1', 'avis robinet multifonction cuisine'],
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
      description: 'Abonnements HYDRAL : Essentiel 59€/an, Standard 99€/an, Plus 119€/an. Livraison automatique filtres et CO₂, sans engagement, cadeaux inclus.',
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
      title: `Calculateur d'économies eau en bouteille | Combien économiser avec HYDRAL`,
      description: 'Calculez vos économies : jusqu\'à 1 000€/an en remplaçant l\'eau en bouteille par un robinet 5-en-1 HYDRAL. Comparatif eau du robinet vs eau en bouteille, fin des microplastiques.',
      canonical: `${BASE_URL}/economies`,
      keywords: ['eau du robinet vs eau en bouteille', 'économies eau robinet', 'prix eau bouteille vs robinet', 'microplastique eau bouteille danger', 'robinet 5 en 1', 'calculer économies HYDRAL', 'plastique bouteille eau santé'],
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
      title: `Blog HYDRAL | Microplastiques, eau filtrée, économies eau en bouteille`,
      description: 'Blog HYDRAL : danger des microplastiques dans l\'eau en bouteille, avantages de l\'eau filtrée, comparatif eau du robinet vs eau en bouteille, économies et conseils cuisine.',
      canonical: `${BASE_URL}/blog`,
      keywords: ['microplastique eau bouteille danger', 'eau du robinet vs eau en bouteille', 'plastique bouteille eau santé', 'filtrer eau du robinet', 'eau bouillante instantanée avantages', 'robinet eau filtrée', 'blog HYDRAL'],
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
    description: 'HYDRAL - Robinet multifonction cuisine 5-en-1 : eau bouillante instantanée, gazeuse, filtrée. Alternative Quooker dès 490€. Livraison offerte France.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'FR'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33 6 60 96 85 16',
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
  const productPrices: Record<string, string> = {
    'pure': '490',
    'spark': '890',
    'one': '990'
  };
  const productNames: Record<string, string> = {
    'pure': 'HYDRAL Pure — Robinet eau bouillante et filtrée 5-en-1',
    'spark': 'HYDRAL Spark — Robinet eau bouillante, gazeuse et filtrée 5-en-1',
    'one': 'HYDRAL One — Robinet multifonction cuisine eau bouillante gazeuse filtrée 5-en-1'
  };
  const price = productPrices[productId.toLowerCase()] || '490';
  const name = productNames[productId.toLowerCase()] || `Robinet HYDRAL ${productId.toUpperCase()} 5-en-1`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: 'Robinet multifonction cuisine 5-en-1 : eau bouillante instantanée 100°C, gazeuse, filtrée, chaude et froide. Alternative Quooker premium dès 490€. Robinet eau bouillante, gazeuse et filtrée pour cuisine.',
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME
    },
    category: 'Robinets de cuisine multifonction',
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/produit/${productId}`,
      priceValidUntil: '2027-12-31',
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
    name: 'Robinets multifonction cuisine HYDRAL — Pure, Spark, One',
    description: 'Gamme de robinets 5-en-1 HYDRAL : eau bouillante, gazeuse, filtrée dès 490€. Alternative Quooker jusqu\'à 3x moins cher. 3 modèles de robinets multifonction cuisine.',
    url: `${BASE_URL}/gamme`,
    hasPart: [
      {
        '@type': 'Product',
        name: 'HYDRAL Pure — Robinet eau bouillante et filtrée',
        offers: { '@type': 'Offer', price: '490', priceCurrency: 'EUR' }
      },
      {
        '@type': 'Product',
        name: 'HYDRAL Spark — Robinet eau bouillante, gazeuse et filtrée',
        offers: { '@type': 'Offer', price: '890', priceCurrency: 'EUR' }
      },
      {
        '@type': 'Product',
        name: 'HYDRAL One — Robinet multifonction 5-en-1 complet',
        offers: { '@type': 'Offer', price: '990', priceCurrency: 'EUR' }
      }
    ]
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
        name: 'Combien coûte un robinet 5-en-1 ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le robinet 5-en-1 HYDRAL est disponible à partir de 490€ TTC (modèle Pure). Le Spark est à 890€ et le One à 990€. Les abonnements consommables vont de 59€ à 119€/an. C\'est jusqu\'à 3 fois moins cher qu\'un Quooker (1500€ à 3500€).'
        }
      },
      {
        '@type': 'Question',
        name: 'Quelle est la meilleure alternative au Quooker ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HYDRAL est la meilleure alternative au Quooker en France. Avec un robinet 5-en-1 dès 490€ contre 1500€ à 3500€ pour un Quooker, HYDRAL offre eau bouillante instantanée, gazeuse, filtrée, chaude et froide avec la même qualité premium à un prix jusqu\'à 3x moins cher.'
        }
      },
      {
        '@type': 'Question',
        name: 'Comment fonctionne un robinet eau bouillante ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le robinet eau bouillante HYDRAL intègre un boiler compact sous l\'évier qui maintient 3L d\'eau à 100°C en permanence. L\'eau bouillante instantanée est disponible en tournant la poignée de sécurité. Le système est isolé thermiquement et consomme seulement 15€/an en électricité.'
        }
      },
      {
        '@type': 'Question',
        name: 'Est-ce que l\'eau du robinet filtrée est meilleure que l\'eau en bouteille ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, l\'eau filtrée HYDRAL élimine 99,9% des impuretés (chlore, métaux lourds, microplastiques, pesticides) sans les risques des microplastiques présents dans les bouteilles. Des études montrent que l\'eau en bouteille contient jusqu\'à 240 000 particules de plastique par litre. L\'eau du robinet filtrée est plus sûre, plus économique et plus écologique.'
        }
      },
      {
        '@type': 'Question',
        name: 'Le robinet eau bouillante est-il sécurisé pour les enfants ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, le robinet HYDRAL dispose d\'un verrouillage enfant intégré : double action poussée + rotation pour l\'eau bouillante, impossible à actionner par un enfant. Protection anti-brûlure sur le corps du robinet, normes CE et NF respectées.'
        }
      },
      {
        '@type': 'Question',
        name: 'L\'installation du robinet 5-en-1 est-elle compliquée ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non, l\'installation du robinet HYDRAL 5-en-1 prend environ 1h. 80% des clients l\'installent eux-mêmes grâce à notre guide vidéo. Il suffit d\'un évier avec trou standard (35-40mm), une arrivée d\'eau froide et une prise 230V à proximité.'
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
        name: 'Essentiel',
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