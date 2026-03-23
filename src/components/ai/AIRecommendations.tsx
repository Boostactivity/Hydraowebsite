import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Heart, ShoppingCart, Eye, X } from 'lucide-react';
import { Page } from '../../App';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  badge?: string;
  matchScore?: number;
}

interface AIRecommendationsProps {
  context: 'homepage' | 'product' | 'cart' | 'checkout';
  currentProductId?: string;
  navigate: (page: Page) => void;
}

export function AIRecommendations({ context, currentProductId, navigate }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Simulate AI recommendation engine
    const fetchRecommendations = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock recommendations based on context
      const mockRecommendations = getRecommendationsForContext(context, currentProductId);
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    };

    fetchRecommendations();
  }, [context, currentProductId]);

  const getRecommendationsForContext = (ctx: string, productId?: string): Product[] => {
    switch (ctx) {
      case 'homepage':
        return [
          {
            id: 'premium',
            name: 'HYDRAO Premium',
            price: '490€',
            image: '/api/placeholder/300/300',
            description: 'Notre best-seller - 5 fonctions en 1',
            badge: '⭐ Plus populaire',
            matchScore: 95
          },
          {
            id: 'essential',
            name: 'Pack Essential',
            price: '59€/an',
            image: '/api/placeholder/300/300',
            description: 'Filtres + Maintenance inclus',
            badge: '💰 Meilleur rapport qualité/prix',
            matchScore: 88
          },
          {
            id: 'filters',
            name: 'Pack Filtres Premium',
            price: '89€',
            image: '/api/placeholder/300/300',
            description: '6 mois de filtration',
            badge: '🌱 Éco-responsable',
            matchScore: 82
          }
        ];

      case 'product':
        return [
          {
            id: 'installation',
            name: 'Installation Pro',
            price: '280€',
            image: '/api/placeholder/300/300',
            description: 'Par un plombier certifié HYDRAO',
            badge: '✅ Recommandé',
            matchScore: 92
          },
          {
            id: 'premium-sub',
            name: 'Abonnement Premium',
            price: '99€/an',
            image: '/api/placeholder/300/300',
            description: 'Filtres + CO₂ + Maintenance',
            badge: '🎁 -15% si acheté maintenant',
            matchScore: 89
          },
          {
            id: 'warranty',
            name: 'Garantie 5 ans',
            price: '149€',
            image: '/api/placeholder/300/300',
            description: 'Extension de garantie ultime',
            badge: '🛡️ Sérénité totale',
            matchScore: 75
          }
        ];

      case 'cart':
        return [
          {
            id: 'co2',
            name: 'Cartouches CO₂',
            price: '39€',
            image: '/api/placeholder/300/300',
            description: '3 cartouches - 180L d\'eau pétillante',
            badge: '🥤 Complément parfait',
            matchScore: 94
          },
          {
            id: 'cleaning',
            name: 'Kit Entretien',
            price: '29€',
            image: '/api/placeholder/300/300',
            description: 'Produits de nettoyage spécialisés',
            badge: '✨ Longévité garantie',
            matchScore: 86
          }
        ];

      case 'checkout':
        return [
          {
            id: 'express-shipping',
            name: 'Livraison Express',
            price: '19€',
            image: '/api/placeholder/300/300',
            description: 'Livré demain avant 13h',
            badge: '⚡ Express',
            matchScore: 78
          }
        ];

      default:
        return [];
    }
  };

  const getContextTitle = (): string => {
    switch (context) {
      case 'homepage':
        return 'Recommandé pour vous';
      case 'product':
        return 'Complétez votre commande';
      case 'cart':
        return 'Souvent acheté ensemble';
      case 'checkout':
        return 'Améliorez votre commande';
      default:
        return 'Recommandations';
    }
  };

  const getContextSubtitle = (): string => {
    switch (context) {
      case 'homepage':
        return 'Sélection personnalisée par notre IA selon votre profil';
      case 'product':
        return '92% de nos clients ajoutent ces produits';
      case 'cart':
        return 'Les clients qui ont acheté ceci ont aussi acheté';
      case 'checkout':
        return 'Options populaires pour améliorer votre expérience';
      default:
        return '';
    }
  };

  if (isDismissed) return null;

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {getContextTitle()}
              </h2>
              <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                IA
              </div>
            </div>
            <p className="text-gray-600">{getContextSubtitle()}</p>
          </div>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-purple-300 transition-all group"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold shadow-lg">
                      {product.badge}
                    </div>
                  )}

                  {/* Match Score */}
                  {product.matchScore && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full text-white text-xs font-bold">
                      <TrendingUp className="w-3 h-3" />
                      <span>{product.matchScore}%</span>
                    </div>
                  )}

                  {/* Quick actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                      <Heart className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-[#6B1E3E]">
                      {product.price}
                    </div>
                    {product.matchScore && (
                      <div className="text-xs text-purple-600 font-medium">
                        Match IA
                      </div>
                    )}
                  </div>

                  <motion.button
                    onClick={() => navigate('product')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Ajouter</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* AI Explanation */}
        <div className="mt-8 p-6 bg-purple-50 rounded-2xl border border-purple-200">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-purple-900">
              <strong>Comment ça marche ?</strong> Notre IA analyse votre navigation, votre profil et les achats de +10,000 clients pour vous recommander les produits les plus adaptés à vos besoins.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline recommendations widget (smaller version for sidebars)
export function AIRecommendationsWidget({ 
  title = 'Recommandé pour vous',
  limit = 2,
  navigate
}: { 
  title?: string; 
  limit?: number;
  navigate: (page: Page) => void;
}) {
  const products: Product[] = [
    {
      id: 'premium-sub',
      name: 'Abonnement Premium',
      price: '99€/an',
      image: '/api/placeholder/150/150',
      description: 'Filtres + CO₂ inclus',
      matchScore: 92
    },
    {
      id: 'installation',
      name: 'Installation Pro',
      price: '280€',
      image: '/api/placeholder/150/150',
      description: 'Plombier certifié',
      matchScore: 88
    }
  ].slice(0, limit);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
          IA
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900 mb-1">
                {product.name}
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {product.description}
              </div>
              <div className="flex items-center justify-between">
                <div className="font-bold text-[#6B1E3E]">{product.price}</div>
                {product.matchScore && (
                  <div className="text-xs text-purple-600 font-medium">
                    {product.matchScore}% match
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('shop')}
        className="w-full mt-4 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
      >
        Voir plus de recommandations →
      </button>
    </div>
  );
}
