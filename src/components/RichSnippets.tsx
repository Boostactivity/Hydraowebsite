/**
 * Composant pour injecter des rich snippets avancés
 * Données structurées pour améliorer l'affichage dans les SERPs
 */

interface RichSnippetsProps {
  type: 'product' | 'article' | 'video' | 'howto' | 'review';
  data: any;
}

export function RichSnippets({ type, data }: RichSnippetsProps) {
  let schema: any = {};

  switch (type) {
    case 'product':
      schema = createProductSchema(data);
      break;
    case 'article':
      schema = createArticleSchema(data);
      break;
    case 'video':
      schema = createVideoSchema(data);
      break;
    case 'howto':
      schema = createHowToSchema(data);
      break;
    case 'review':
      schema = createReviewSchema(data);
      break;
  }

  // Injecter le schema dans le DOM
  if (typeof window !== 'undefined') {
    const existingScript = document.querySelector(`script[data-rich-snippet="${type}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-rich-snippet', type);
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  return null;
}

// Product Schema avec toutes les informations
function createProductSchema(data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    image: data.images || [],
    brand: {
      '@type': 'Brand',
      name: 'HYDRAL'
    },
    offers: {
      '@type': 'Offer',
      url: data.url,
      priceCurrency: 'EUR',
      price: data.price,
      priceValidUntil: '2025-12-31',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'HYDRAL'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'EUR'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 5,
            unitCode: 'DAY'
          }
        }
      }
    },
    aggregateRating: data.rating ? {
      '@type': 'AggregateRating',
      ratingValue: data.rating.value,
      reviewCount: data.rating.count,
      bestRating: '5',
      worstRating: '1'
    } : undefined,
    review: data.reviews ? data.reviews.map((review: any) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      datePublished: review.date,
      reviewBody: review.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1'
      }
    })) : undefined,
    additionalProperty: data.features ? data.features.map((feature: string) => ({
      '@type': 'PropertyValue',
      name: 'Feature',
      value: feature
    })) : undefined
  };
}

// Article Schema pour les pages de contenu
function createArticleSchema(data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    author: {
      '@type': 'Organization',
      name: 'HYDRAO',
      url: 'https://hydrao.fr'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HYDRAO',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hydrao.fr/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url
    }
  };
}

// Video Schema pour les tutoriels vidéo
function createVideoSchema(data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: data.title,
    description: data.description,
    thumbnailUrl: data.thumbnail,
    uploadDate: data.uploadDate,
    duration: data.duration, // Format ISO 8601 (ex: PT2M30S)
    contentUrl: data.videoUrl,
    embedUrl: data.embedUrl,
    publisher: {
      '@type': 'Organization',
      name: 'HYDRAO',
      logo: {
        '@type': 'ImageObject',
        url: 'https://hydrao.fr/logo.png'
      }
    }
  };
}

// HowTo Schema pour les guides d'installation
function createHowToSchema(data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    image: data.image,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: data.cost
    },
    totalTime: data.duration, // Format ISO 8601 (ex: PT2H)
    supply: data.supplies ? data.supplies.map((supply: string) => ({
      '@type': 'HowToSupply',
      name: supply
    })) : undefined,
    tool: data.tools ? data.tools.map((tool: string) => ({
      '@type': 'HowToTool',
      name: tool
    })) : undefined,
    step: data.steps ? data.steps.map((step: any, index: number) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url
    })) : undefined
  };
}

// Review Schema pour les avis clients
function createReviewSchema(data: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: data.productName,
      brand: {
        '@type': 'Brand',
        name: 'HYDRAO'
      }
    },
    author: {
      '@type': 'Person',
      name: data.authorName
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: data.rating,
      bestRating: '5',
      worstRating: '1'
    },
    datePublished: data.date,
    reviewBody: data.text
  };
}

/**
 * Hook pour générer facilement des rich snippets
 */
export function useRichSnippet(type: RichSnippetsProps['type'], data: any) {
  return <RichSnippets type={type} data={data} />;
}

/**
 * Exemples d'utilisation dans les pages
 */

// Pour une page produit :
export const productSnippetExample = {
  name: 'Robinet HYDRAO 5-en-1',
  description: 'Robinet premium 5-en-1 avec eau bouillante, filtrée, pétillante, chaude réglable et robinet classique. 490€ TTC.',
  images: [
    'https://images.unsplash.com/photo-1610177534644-34d881503b83?w=1200',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200'
  ],
  price: '490',
  url: 'https://hydrao.fr',
  rating: {
    value: '4.9',
    count: '2347'
  },
  reviews: [
    {
      author: 'Sophie M.',
      date: '2024-11-15',
      text: 'J\'ai arrêté de compter le temps gagné chaque jour. Plus de bouilloire, plus de packs d\'eau à porter.',
      rating: '5'
    },
    {
      author: 'Thomas D.',
      date: '2024-10-28',
      text: 'HYDRAO offre un rapport qualité-prix exceptionnel avec ses 5 types d\'eau. Je ne reviendrai jamais en arrière.',
      rating: '5'
    },
    {
      author: 'Claire R.',
      date: '2024-12-02',
      text: '100% de mes projets de rénovation incluent maintenant un robinet 5-en-1. C\'est devenu le standard.',
      rating: '5'
    }
  ],
  features: [
    'Eau bouillante 100°C instantanée',
    'Eau froide filtrée 5 étapes',
    'Eau pétillante à volonté',
    'Eau chaude réglable 40-60°C',
    'Robinet classique préservé',
    'Garantie 5 ans',
    'Rentabilisé en 6 mois'
  ]
};

// Pour un guide d'installation :
export const howToSnippetExample = {
  name: 'Comment installer votre robinet HYDRAO 5-en-1',
  description: 'Guide complet d\'installation professionnelle en 6 étapes avec photos détaillées',
  image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
  cost: '0',
  duration: 'PT90M',
  tools: [
    'Clé à molette',
    'Tournevis cruciforme',
    'Niveau à bulle',
    'Téflon ou ruban d\'étanchéité',
    'Perceuse (si nouveau trou évier)'
  ],
  supplies: [
    'Robinet HYDRAO',
    'Module filtration',
    'Module carbonatation',
    'Raccords fournis',
    'Notice détaillée'
  ],
  steps: [
    {
      name: 'Préparation',
      text: 'Coupez l\'arrivée d\'eau principale et vidangez les canalisations. Préparez l\'espace sous l\'évier.',
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800'
    },
    {
      name: 'Démontage ancien robinet',
      text: 'Retirez l\'ancien robinet en dévissant les écrous de fixation sous l\'évier.',
      image: 'https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800'
    },
    {
      name: 'Installation robinet HYDRAO',
      text: 'Insérez le robinet dans le trou d\'évier et fixez-le avec les écrous fournis. Utilisez le niveau pour vérifier l\'alignement.',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800'
    },
    {
      name: 'Installation modules sous évier',
      text: 'Fixez le module de filtration et le module de carbonatation sous l\'évier selon le schéma fourni.',
      image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=800'
    },
    {
      name: 'Raccordements',
      text: 'Connectez les arrivées d\'eau chaude, froide et électrique aux modules. Utilisez le téflon pour l\'étanchéité.',
      image: 'https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=800'
    },
    {
      name: 'Test et mise en service',
      text: 'Rétablissez l\'eau, vérifiez l\'absence de fuites et testez chaque fonction. Purgez le système si nécessaire.',
      image: 'https://images.unsplash.com/photo-1610177534644-34d881503b83?w=800'
    }
  ]
};

// Pour un article de blog :
export const articleSnippetExample = {
  title: '5 raisons d\'installer un robinet 5-en-1 HYDRAO',
  description: 'Découvrez pourquoi plus de 2 347 foyers français ont choisi HYDRAO : économies, santé, écologie et gain de temps au quotidien.',
  image: 'https://images.unsplash.com/photo-1610177534644-34d881503b83?w=1200',
  datePublished: '2024-11-01',
  dateModified: '2024-12-19',
  url: 'https://hydrao.fr'
};