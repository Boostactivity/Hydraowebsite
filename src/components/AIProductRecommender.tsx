import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp, Users, Star, ChevronRight, Zap, Check } from 'lucide-react';
import { Page } from '../App';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'subscription' | 'accessory' | 'upgrade';
  match: number; // 0-100 score de pertinence
  benefits: string[];
  popular: boolean;
}

interface AIProductRecommenderProps {
  navigate: (page: Page) => void;
}

export function AIProductRecommender({ navigate }: AIProductRecommenderProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<'all' | 'subscription' | 'accessory' | 'upgrade'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation de recommandations IA basées sur le comportement
    setTimeout(() => {
      const products: Product[] = [
        {
          id: '1',
          name: 'Abonnement Confort',
          description: 'Filtres + CO₂ livrés automatiquement tous les 3 mois',
          price: 89,
          image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
          category: 'subscription',
          match: 95,
          benefits: [
            'Filtres premium automatiques',
            '2 cartouches CO₂ incluses',
            'Livraison gratuite'
          ],
          popular: true
        },
        {
          id: '2',
          name: 'Kit filtres premium',
          description: 'Pack de 4 filtres haute performance',
          price: 129,
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
          category: 'accessory',
          match: 88,
          benefits: [
            'Filtration 5 étapes',
            'Durée 12 mois',
            'Installation facile'
          ],
          popular: false
        },
        {
          id: '3',
          name: 'Module eau chaude UV',
          description: 'Stérilisation UV pour eau ultra-pure',
          price: 199,
          image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400',
          category: 'upgrade',
          match: 82,
          benefits: [
            'Stérilisation UV-C',
            'Élimine 99.9% bactéries',
            'Installation rapide'
          ],
          popular: false
        },
        {
          id: '4',
          name: 'Pack cartouches CO₂',
          description: '6 cartouches pour 6 mois d\'eau pétillante',
          price: 59,
          image: 'https://images.unsplash.com/photo-1610177534644-34d881503b83?w=400',
          category: 'accessory',
          match: 90,
          benefits: [
            '360L d\'eau pétillante',
            'Compatible tous modèles',
            'Livraison rapide'
          ],
          popular: true
        },
        {
          id: '5',
          name: 'Abonnement Premium',
          description: 'Tout inclus + maintenance préventive',
          price: 139,
          image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
          category: 'subscription',
          match: 85,
          benefits: [
            'Filtres + CO₂ illimités',
            'Maintenance annuelle',
            'SAV prioritaire 24h'
          ],
          popular: false
        },
        {
          id: '6',
          name: 'Kit nettoyage professionnel',
          description: 'Entretien complet pour robinet HYDRAL',
          price: 39,
          image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
          category: 'accessory',
          match: 75,
          benefits: [
            'Produits écologiques',
            'Guide d\'entretien',
            'Durée 6 mois'
          ],
          popular: false
        }
      ];

      setRecommendations(products.sort((a, b) => b.match - a.match));
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? recommendations 
    : recommendations.filter(p => p.category === activeCategory);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'subscription': return 'Abonnement';
      case 'accessory': return 'Accessoire';
      case 'upgrade': return 'Amélioration';
      default: return '';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'subscription': return 'from-[#6B1E3E] to-[#8B2E4E]';
      case 'accessory': return 'from-blue-500 to-indigo-500';
      case 'upgrade': return 'from-[#D4AF37] to-[#B8941F]';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white to-[#FAF8F5]">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mb-6 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Recommandé pour vous</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Personnalisez votre expérience HYDRAL
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nos algorithmes analysent vos besoins pour vous proposer les meilleures options
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          {[
            { id: 'all', label: 'Tout voir', icon: Sparkles },
            { id: 'subscription', label: 'Abonnements', icon: TrendingUp },
            { id: 'accessory', label: 'Accessoires', icon: Zap },
            { id: 'upgrade', label: 'Améliorations', icon: Star }
          ].map((filter) => {
            const Icon = filter.icon;
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all inline-flex items-center gap-2 ${
                  activeCategory === filter.id
                    ? 'gradient-bordeaux text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-[#6B1E3E]/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-[#6B1E3E]/20 border-t-[#6B1E3E] rounded-full"
                />
                <p className="text-gray-600">Analyse de vos préférences...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-xl transition-all"
                >
                  {/* Badge popularité */}
                  {product.popular && (
                    <div className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-[#D4AF37] text-white rounded-full text-xs font-medium shadow-lg">
                      🔥 Populaire
                    </div>
                  )}

                  {/* Score de match */}
                  <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-medium shadow-lg">
                    {product.match}% match
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(product.category)} opacity-20`} />
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    {/* Catégorie */}
                    <div className="mb-3">
                      <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(product.category)} text-white rounded-full text-xs font-medium`}>
                        {getCategoryLabel(product.category)}
                      </span>
                    </div>

                    {/* Nom et description */}
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                    {/* Bénéfices */}
                    <div className="space-y-2 mb-6">
                      {product.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* Prix et CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-3xl font-light text-gray-900">{product.price}€</div>
                        <div className="text-xs text-gray-500">
                          {product.category === 'subscription' ? '/an' : 'TTC'}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('configurator')}
                        className="px-6 py-3 gradient-bordeaux text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                      >
                        Ajouter
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, value: '2 347', label: 'Clients satisfaits' },
            { icon: Star, value: '4.9/5', label: 'Note moyenne' },
            { icon: TrendingUp, value: '95%', label: 'Recommandent' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white rounded-2xl border-2 border-gray-200"
            >
              <stat.icon className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
              <div className="text-3xl font-light text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}