import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Droplet, AlertCircle } from 'lucide-react';

interface LocationData {
  city: string;
  region: string;
  waterQuality: 'hard' | 'soft' | 'chlorinated' | 'good';
  message: string;
  specificIssues: string[];
}

const LOCATION_DATABASE: Record<string, LocationData> = {
  'paris': {
    city: 'Paris',
    region: 'Île-de-France',
    waterQuality: 'hard',
    message: 'L\'eau parisienne est très calcaire',
    specificIssues: [
      'Taux de calcaire élevé (25-30°f)',
      'Goût chloré parfois prononcé',
      'Traces de plomb dans certains vieux immeubles'
    ]
  },
  'marseille': {
    city: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    waterQuality: 'chlorinated',
    message: 'L\'eau marseillaise a un taux de chlore élevé',
    specificIssues: [
      'Chloration importante pour assurer la qualité',
      'Goût et odeur de chlore marqués',
      'Calcaire modéré à élevé'
    ]
  },
  'lyon': {
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    waterQuality: 'good',
    message: 'L\'eau lyonnaise est de bonne qualité',
    specificIssues: [
      'Eau de source du Mont d\'Or',
      'Peu calcaire',
      'Qualité globalement bonne mais améliorable'
    ]
  },
  'toulouse': {
    city: 'Toulouse',
    region: 'Occitanie',
    waterQuality: 'soft',
    message: 'L\'eau toulousaine est douce',
    specificIssues: [
      'Eau peu calcaire',
      'Traces de pesticides agricoles',
      'Filtration recommandée pour usage culinaire'
    ]
  },
  'nice': {
    city: 'Nice',
    region: 'Provence-Alpes-Côte d\'Azur',
    waterQuality: 'hard',
    message: 'L\'eau niçoise est calcaire',
    specificIssues: [
      'Calcaire élevé',
      'Résidus de traitement',
      'Goût parfois métallique'
    ]
  },
  'lille': {
    city: 'Lille',
    region: 'Hauts-de-France',
    waterQuality: 'hard',
    message: 'L\'eau lilloise est calcaire',
    specificIssues: [
      'Eau très calcaire (>30°f)',
      'Traces de nitrates agricoles',
      'Dépôts blancs fréquents'
    ]
  }
};

export function LocationBasedContent() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    try {
      // Essayer avec l'API de géolocalisation (nécessite HTTPS)
      if ('geolocation' in navigator) {
        // Pour la démo, on simule avec une ville aléatoire
        simulateLocation();
      } else {
        // Fallback: détection par IP (nécessiterait une API externe)
        simulateLocation();
      }
    } catch (error) {
      console.error('Location detection failed:', error);
      setIsDetecting(false);
    }
  };

  const simulateLocation = () => {
    // Simuler une détection aléatoire pour la démo
    const cities = Object.keys(LOCATION_DATABASE);
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    setTimeout(() => {
      setLocation(LOCATION_DATABASE[randomCity]);
      setIsDetecting(false);
    }, 1000);
  };

  if (isDetecting) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-4 h-4 border-2 border-[#6B1E3E] border-t-transparent rounded-full animate-spin" />
        <span>Détection de votre localisation...</span>
      </div>
    );
  }

  if (!location) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900">
              Vous êtes à {location.city}
            </h3>
            <WaterQualityBadge quality={location.waterQuality} />
          </div>

          <p className="text-gray-700 mb-4">
            {location.message}
          </p>

          <div className="space-y-2">
            {location.specificIssues.map((issue, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>{issue}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-sm font-medium text-[#6B1E3E] flex items-center gap-2">
              <Droplet className="w-4 h-4" />
              HYDRAO élimine 99.9% de ces impuretés pour une eau pure et saine
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WaterQualityBadge({ quality }: { quality: string }) {
  const config = {
    hard: { label: 'Eau calcaire', color: 'bg-orange-100 text-orange-700' },
    soft: { label: 'Eau douce', color: 'bg-green-100 text-green-700' },
    chlorinated: { label: 'Eau chlorée', color: 'bg-yellow-100 text-yellow-700' },
    good: { label: 'Bonne qualité', color: 'bg-blue-100 text-blue-700' }
  };

  const { label, color } = config[quality as keyof typeof config] || config.good;

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}

// Version inline pour affichage dans le texte
export function InlineLocationMessage() {
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    // Simuler détection
    const cities = Object.keys(LOCATION_DATABASE);
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setLocation(LOCATION_DATABASE[randomCity]);
  }, []);

  if (!location) return null;

  return (
    <span className="text-[#6B1E3E] font-medium">
      {location.message.toLowerCase()}
    </span>
  );
}

// Recommandations personnalisées selon la ville
export function LocationRecommendations() {
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const cities = Object.keys(LOCATION_DATABASE);
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setLocation(LOCATION_DATABASE[randomCity]);
  }, []);

  if (!location) return null;

  const getRecommendation = () => {
    switch (location.waterQuality) {
      case 'hard':
        return {
          title: 'Filtration anti-calcaire essentielle',
          description: 'Avec une eau aussi calcaire, HYDRAO vous protège des dépôts et prolonge la vie de vos appareils',
          benefit: 'Économisez jusqu\'à 300€/an en détartrage et réparations'
        };
      case 'chlorinated':
        return {
          title: 'Élimination du chlore prioritaire',
          description: 'Le goût et l\'odeur de chlore disparaissent totalement avec la filtration HYDRAO 5 étapes',
          benefit: 'Redécouvrez le vrai goût de l\'eau et des boissons'
        };
      case 'soft':
        return {
          title: 'Filtration anti-pesticides recommandée',
          description: 'Même avec une eau douce, les résidus agricoles nécessitent une filtration avancée',
          benefit: 'Protection maximale pour toute la famille'
        };
      default:
        return {
          title: 'Optimisation de la qualité',
          description: 'Même une bonne eau du robinet contient des impuretés invisibles',
          benefit: 'Eau ultra-pure à 99.9% garantie'
        };
    }
  };

  const recommendation = getRecommendation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 border-2 border-[#6B1E3E]/20 shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#6B1E3E] flex items-center justify-center flex-shrink-0">
          <Droplet className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">
            {recommendation.title}
          </h4>
          <p className="text-gray-600 mb-3 text-sm">
            {recommendation.description}
          </p>
          <div className="px-3 py-2 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-800">
              ✓ {recommendation.benefit}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
