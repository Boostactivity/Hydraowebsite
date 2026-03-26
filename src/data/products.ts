// PRIX OFFICIELS ET DONNÉES PRODUITS

// Prix des modèles HYDRAL
export const HYDRAL_PRICES = {
  pure: 490,   // Eau filtrée uniquement
  spark: 890,  // Eau filtrée + gazeuse + froide
  one: 990     // Tout-en-un (5 eaux)
};

export const BASE_PRICE = 490; // Prix de base (Pure) - conservé pour compatibilité

export interface Finish {
  id: string;
  name: string;
  color: string;
  premium?: boolean;
}

export const finishes: Finish[] = [
  { id: 'chrome', name: 'Chrome Brillant', color: 'bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400' },
  { id: 'brushed', name: 'Acier Brossé', color: 'bg-gradient-to-br from-gray-400 to-gray-500' },
  { id: 'black-matt', name: 'Noir Mat', color: 'bg-gradient-to-br from-gray-900 to-black' },
  { id: 'white-matt', name: 'Blanc Mat', color: 'bg-gradient-to-br from-gray-50 to-gray-200' },
  { id: 'gold', name: 'Or Brossé', color: 'bg-gradient-to-br from-[#D4AF37] to-[#C59B2A]', premium: true },
  { id: 'copper', name: 'Cuivre', color: 'bg-gradient-to-br from-orange-600 to-orange-700', premium: true },
  { id: 'champagne', name: 'Champagne', color: 'bg-gradient-to-br from-[#D4AF37] to-[#E5C158]', premium: true },
  { id: 'gunmetal', name: 'Gun Metal', color: 'bg-gradient-to-br from-gray-600 to-gray-700', premium: true }
];

export interface FaucetModel {
  id: string;
  name: string;
  description: string;
  shortDesc: string;
  features: string[];
  finishes: string[];
  image: string;
  style: 'modern' | 'classic' | 'minimalist' | 'industrial';
}

export const faucetModels: FaucetModel[] = [
  {
    id: 'flex',
    name: 'FLEX',
    description: 'Le robinet tout-en-un avec bec extractible flexible pour une utilisation optimale',
    shortDesc: 'Bec extractible et flexible',
    features: [
      'Bec extractible 360°',
      'Douchette intégrée',
      'Hauteur ajustable',
      'Design ergonomique',
      '5 types d\'eau'
    ],
    finishes: ['chrome', 'brushed', 'black-matt', 'gold'],
    image: 'faucet-flex',
    style: 'modern'
  },
  {
    id: 'square',
    name: 'SQUARE',
    description: 'Design carré et moderne, pour les cuisines contemporaines exigeantes',
    shortDesc: 'Design carré moderne',
    features: [
      'Lignes carrées épurées',
      'Bec haut fixe',
      'Commande tactile',
      'Style architectural',
      '5 types d\'eau'
    ],
    finishes: ['chrome', 'brushed', 'black-matt', 'white-matt', 'gunmetal'],
    image: 'faucet-square',
    style: 'modern'
  },
  {
    id: 'fusion',
    name: 'FUSION',
    description: 'Lignes épurées et minimalistes pour une intégration parfaite dans tous les styles',
    shortDesc: 'Lignes épurées minimalistes',
    features: [
      'Design minimaliste',
      'Bec arrondi',
      'Finition ultra-lisse',
      'Compact et élégant',
      '5 types d\'eau'
    ],
    finishes: ['chrome', 'brushed', 'black-matt', 'white-matt', 'champagne'],
    image: 'faucet-fusion',
    style: 'minimalist'
  },
  {
    id: 'classic',
    name: 'CLASSIC',
    description: 'Style intemporel et élégant, le mariage parfait entre tradition et innovation',
    shortDesc: 'Style intemporel élégant',
    features: [
      'Design classique raffiné',
      'Bec col de cygne',
      'Poignées traditionnelles',
      'Élégance intemporelle',
      '5 types d\'eau'
    ],
    finishes: ['chrome', 'brushed', 'gold', 'copper'],
    image: 'faucet-classic',
    style: 'classic'
  },
  {
    id: 'pro',
    name: 'PRO',
    description: 'Inspiré des cuisines professionnelles, robuste et ultra-fonctionnel',
    shortDesc: 'Style professionnel robuste',
    features: [
      'Style cuisine pro',
      'Bec extra-haut',
      'Ressort apparent',
      'Douchette puissante',
      '5 types d\'eau'
    ],
    finishes: ['chrome', 'brushed', 'black-matt', 'gunmetal'],
    image: 'faucet-pro',
    style: 'industrial'
  }
];

export interface Module {
  id: string;
  name: string;
  type: 'boiler' | 'chiller' | 'co2' | 'filter';
  description: string;
  features: string[];
  specs: { [key: string]: string };
  required: boolean;
}

export const modules: Module[] = [
  {
    id: 'boiler-compact',
    name: 'Boiler Compact',
    type: 'boiler',
    description: 'Réservoir d\'eau bouillante instantanée 3L',
    features: [
      'Capacité 3 litres',
      'Eau à 100°C instantanée',
      'Isolation thermique',
      'Consommation réduite'
    ],
    specs: {
      'Capacité': '3 litres',
      'Température': '100°C',
      'Puissance': '2400W',
      'Dimensions': '30 x 40 x 25 cm'
    },
    required: true
  },
  {
    id: 'chiller-pro',
    name: 'Chiller Pro',
    type: 'chiller',
    description: 'Système de réfrigération pour eau fraîche',
    features: [
      'Eau réfrigérée 4-8°C',
      'Technologie silencieuse',
      'Économie d\'énergie A++',
      'Débit continu'
    ],
    specs: {
      'Température': '4-8°C',
      'Débit': '2L/min',
      'Puissance': '150W',
      'Dimensions': '25 x 35 x 30 cm'
    },
    required: false
  },
  {
    id: 'co2-system',
    name: 'Système CO₂',
    type: 'co2',
    description: 'Gazéificateur intégré pour eau pétillante',
    features: [
      'Eau pétillante à la demande',
      'Cartouches CO₂ standard',
      'Niveau de gazéification réglable',
      'Installation facile'
    ],
    specs: {
      'Cartouche': 'CO₂ 425g standard',
      'Capacité': '60L par cartouche',
      'Pression': 'Réglable',
      'Dimensions': '15 x 35 x 15 cm'
    },
    required: false
  },
  {
    id: 'filter-premium',
    name: 'Filtre Premium',
    type: 'filter',
    description: 'Système de filtration avancée multi-étapes',
    features: [
      'Filtration 5 étapes',
      'Élimine chlore, calcaire, impuretés',
      'Améliore le goût',
      'Durée 6 mois'
    ],
    specs: {
      'Technologie': 'Charbon actif + résine',
      'Capacité': '10 000 litres',
      'Débit': 'Sans perte de pression',
      'Changement': 'Clip & Click'
    },
    required: true
  }
];

export interface Subscription {
  id: string;
  name: string;
  priceYear: number;
  priceMonth: number;
  priceQuarter: number;
  filters: number;
  co2: number;
  gift: 'small' | 'medium' | 'large' | null;
  features: string[];
  popular?: boolean;
}

export const subscriptions: Subscription[] = [
  {
    id: 'filter-only',
    name: 'Filtre Only',
    priceYear: 59,
    priceMonth: 4.92,
    priceQuarter: 14.75,
    filters: 2,
    co2: 0,
    gift: null,
    features: [
      '2 filtres premium par an',
      'Livraison automatique',
      'Remplacement tous les 6 mois',
      'Sans engagement'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    priceYear: 99,
    priceMonth: 8.25,
    priceQuarter: 24.75,
    filters: 4,
    co2: 8,
    gift: 'small',
    features: [
      '4 filtres premium par an',
      '8 cartouches CO₂',
      'Livraison prioritaire',
      'Check-up technique offert',
      'Rappels automatiques'
    ]
  },
  {
    id: 'plus',
    name: 'Plus',
    priceYear: 119,
    priceMonth: 9.92,
    priceQuarter: 29.75,
    filters: 6,
    co2: 12,
    gift: 'medium',
    features: [
      '6 filtres premium par an',
      '12 cartouches CO₂',
      'Livraison express',
      '2 check-ups offerts',
      'Pièces d\'usure à prix réduit'
    ],
    popular: true
  },
  {
    id: 'plus-plus',
    name: 'Premium',
    priceYear: 139,
    priceMonth: 11.58,
    priceQuarter: 34.75,
    filters: 6,
    co2: 12,
    gift: 'large',
    features: [
      '6 filtres premium par an',
      '12 cartouches CO₂',
      'Livraison express',
      '2 check-ups offerts',
      'Pièces d\'usure à prix réduit'
    ]
  }
];

export interface Gift {
  id: string;
  name: string;
  items: { name: string; quantity: number }[];
}

export const gifts: { [key: string]: Gift } = {
  small: {
    id: 'small',
    name: 'Petit Pack',
    items: [
      { name: 'Bouteille 50cl', quantity: 2 },
      { name: 'Bouteille 1L', quantity: 1 }
    ]
  },
  medium: {
    id: 'medium',
    name: 'Moyen Pack',
    items: [
      { name: 'Bouteille 50cl', quantity: 2 },
      { name: 'Bouteille 1L', quantity: 2 }
    ]
  },
  large: {
    id: 'large',
    name: 'Grand Pack',
    items: [
      { name: 'Bouteille 50cl', quantity: 3 },
      { name: 'Bouteille 1L', quantity: 3 },
      { name: 'Thermos', quantity: 2 }
    ]
  }
};

export interface ShopItem {
  id: string;
  category: 'filter' | 'co2' | 'bottle' | 'thermos' | 'accessory';
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export const shopItems: ShopItem[] = [
  {
    id: 'filter-pack-2',
    category: 'filter',
    name: 'Pack 2 Filtres Premium',
    description: 'Filtres de remplacement haute performance',
    price: 39,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1657186593846-8d3e67155468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGZpbHRlciUyMGNhcnRyaWRnZSUyMHJlcGxhY2VtZW50fGVufDF8fHx8MTc3MjI0NjkyMXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'co2-pack-3',
    category: 'co2',
    name: 'Pack 3 Cartouches CO₂',
    description: 'Cartouches CO₂ 425g standard',
    price: 29,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1653333641041-e099dd1e6631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDTzIlMjBnYXMlMjBjYXJ0cmlkZ2UlMjBzcGFya2xpbmclMjB3YXRlcnxlbnwxfHx8fDE3NzIzMjU1NjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'bottle-50cl-glass',
    category: 'bottle',
    name: 'Bouteille Verre 50cl',
    description: 'Bouteille en verre borosilicate',
    price: 8,
    stock: 200,
    image: 'https://images.unsplash.com/photo-1608397981882-47bc3baec431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHdhdGVyJTIwYm90dGxlJTIwMUwlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc3MjMyNTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'bottle-1l-glass',
    category: 'bottle',
    name: 'Bouteille Verre 1L',
    description: 'Grande bouteille en verre borosilicate',
    price: 12,
    stock: 180,
    image: 'https://images.unsplash.com/photo-1608397981882-47bc3baec431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHdhdGVyJTIwYm90dGxlJTIwMUwlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc3MjMyNTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'bottle-50cl-tritan',
    category: 'bottle',
    name: 'Bouteille Tritan 50cl',
    description: 'Bouteille incassable sans BPA',
    price: 5,
    stock: 220,
    image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cml0YW4lMjBwbGFzdGljJTIwcmV1c2FibGUlMjB3YXRlciUyMGJvdHRlJTIwNTAgY2wlfGVufDF8fHx8MTc3MjMyNTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'bottle-1l-tritan',
    category: 'bottle',
    name: 'Bouteille Tritan 1L',
    description: 'Grande bouteille incassable sans BPA',
    price: 7,
    stock: 220,
    image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cml0YW4lMjBwbGFzdGljJTIwcmV1c2FibGUlMjB3YXRlciUyMGJvdHRlJTIwNTAgY2wlfGVufDF8fHx8MTc3MjMyNTU2Nnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'thermos-500ml',
    category: 'thermos',
    name: 'Thermos 500ml',
    description: 'Isotherme 12h chaud/24h froid',
    price: 10,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1664714628878-9d2aa898b9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpbmxlc3MlMjBzdGVlbCUyMHRoZXJtb3MlMjBib3R0bGUlMjA1MDBtbHxlbnwxfHx8fDE3NzIzMjU1NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'cleaning-kit',
    category: 'accessory',
    name: 'Kit d\'entretien',
    description: 'Produits d\'entretien spécifiques',
    price: 19,
    stock: 90,
    image: 'https://images.unsplash.com/photo-1765516469361-f4bd614fa926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY2xlYW5pbmclMjBwcm9kdWN0cyUyMGVjbyUyMGZyaWVuZGx5fGVufDF8fHx8MTc3MjMyNTU3NXww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export const waterTypes = [
  {
    id: 'boiling',
    name: 'Eau Bouillante',
    temp: '100°C',
    description: 'Eau bouillante instantanée pour thé, café, cuisson rapide',
    icon: 'flame',
    color: 'text-[#6B1E3E]'
  },
  {
    id: 'cold-filtered',
    name: 'Eau Filtrée',
    temp: 'Ambiante',
    description: 'Eau pure filtrée, débarrassée des impuretés et du chlore',
    icon: 'droplet',
    color: 'text-[#6B1E3E]'
  },
  {
    id: 'chilled',
    name: 'Eau Réfrigérée',
    temp: '4-8°C',
    description: 'Eau fraîche constamment disponible',
    icon: 'snowflake',
    color: 'text-[#D4AF37]'
  },
  {
    id: 'sparkling',
    name: 'Eau Pétillante',
    temp: '4-8°C',
    description: 'Eau pétillante fraîche à la demande',
    icon: 'sparkles',
    color: 'text-[#6B1E3E]'
  },
  {
    id: 'regular',
    name: 'Mitigeur Classique',
    temp: 'Variable',
    description: 'Eau chaude/froide traditionnelle pour usage quotidien',
    icon: 'waves',
    color: 'text-gray-600'
  }
];