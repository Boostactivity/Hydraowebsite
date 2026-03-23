import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Sparkles, TrendingUp, Shield } from 'lucide-react';

interface UpsellItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  icon: string;
  benefits: string[];
  popularity: number;
}

export function SmartUpsell() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const upsellItems: UpsellItem[] = [
    {
      id: 'extended-warranty',
      name: 'Garantie étendue 10 ans',
      description: 'Doublez votre tranquillité d\'esprit',
      price: 149,
      originalPrice: 199,
      badge: 'Populaire',
      icon: '🛡️',
      benefits: [
        'Couverture totale pendant 10 ans',
        'Remplacement gratuit en cas de panne',
        'Priorité sur le SAV'
      ],
      popularity: 95
    },
    {
      id: 'premium-filters',
      name: 'Pack filtres premium x3',
      description: '3 ans de filtration sans souci',
      price: 159,
      originalPrice: 189,
      badge: 'Économies -16%',
      icon: '💧',
      benefits: [
        'Économisez 30€ vs achat unitaire',
        'Livraison groupée gratuite',
        'Filtration maximale garantie'
      ],
      popularity: 78
    },
    {
      id: 'maintenance-kit',
      name: 'Kit d\'entretien professionnel',
      description: 'Maintenez votre robinet comme neuf',
      price: 49,
      originalPrice: 69,
      badge: 'Recommandé',
      icon: '🔧',
      benefits: [
        'Produits de nettoyage premium',
        'Guide d\'entretien détaillé',
        'Prolonge la durée de vie'
      ],
      popularity: 62
    },
    {
      id: 'co2-subscription',
      name: 'Abonnement CO₂ Premium',
      description: 'Eau pétillante illimitée pendant 2 ans',
      price: 199,
      originalPrice: 249,
      badge: 'Meilleure valeur',
      icon: '✨',
      benefits: [
        '24 cartouches CO₂ incluses',
        'Livraison automatique',
        'Économisez 50€'
      ],
      popularity: 88
    },
    {
      id: 'installation-express',
      name: 'Installation Express 24h',
      description: 'Installé dès demain',
      price: 79,
      badge: 'Nouveau',
      icon: '⚡',
      benefits: [
        'Intervention sous 24h',
        'Week-end & soir disponibles',
        'Priorité absolue'
      ],
      popularity: 45
    },
    {
      id: 'smart-monitoring',
      name: 'Système de monitoring IoT',
      description: 'Suivez votre consommation en temps réel',
      price: 99,
      originalPrice: 129,
      badge: 'Tech',
      icon: '📱',
      benefits: [
        'Application mobile dédiée',
        'Alertes filtres & CO₂',
        'Statistiques de consommation'
      ],
      popularity: 56
    }
  ];

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const totalSavings = selectedItems.reduce((acc, itemId) => {
    const item = upsellItems.find(i => i.id === itemId);
    return acc + (item?.originalPrice ? item.originalPrice - item.price : 0);
  }, 0);

  const totalPrice = selectedItems.reduce((acc, itemId) => {
    const item = upsellItems.find(i => i.id === itemId);
    return acc + (item?.price || 0);
  }, 0);

  // Trier par popularité
  const sortedItems = [...upsellItems].sort((a, b) => b.popularity - a.popularity);

  return (
    <section className="section-padding bg-gradient-to-br from-[#FAF8F5] to-white">
      <div className="section-container max-w-7xl mx-auto">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Recommandations personnalisées</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Optimisez votre expérience HYDRAO
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nos clients qui ont choisi ces options ont un taux de satisfaction 34% supérieur
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedItems.map((item, index) => {
            const isSelected = selectedItems.includes(item.id);
            const isPopular = item.popularity > 75;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => toggleItem(item.id)}
                className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                  isSelected
                    ? 'border-[#6B1E3E] bg-[#6B1E3E]/5 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                } ${isPopular ? 'ring-2 ring-[#D4AF37]/30' : ''}`}
                whileHover={{ y: -5 }}
              >
                {/* Badge popularité */}
                {isPopular && (
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white text-xs rounded-full shadow-lg flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Top {index + 1}</span>
                  </div>
                )}

                {/* Badge custom */}
                {item.badge && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-[#D4AF37] text-white text-xs rounded-full shadow-lg">
                    {item.badge}
                  </div>
                )}

                {/* Checkbox */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isSelected ? 1 : 0.8,
                      backgroundColor: isSelected ? '#6B1E3E' : '#fff'
                    }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#6B1E3E]' : 'border-gray-300'
                    }`}
                  >
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Icône */}
                <div className="text-4xl mb-4">{item.icon}</div>

                {/* Titre & prix */}
                <h3 className="text-lg text-gray-900 mb-2 pr-8">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                {/* Prix */}
                <div className="mb-4">
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through mr-2">
                      {item.originalPrice}€
                    </span>
                  )}
                  <span className="text-2xl text-[#6B1E3E] font-light">{item.price}€</span>
                </div>

                {/* Avantages */}
                <ul className="space-y-2">
                  {item.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Barre de popularité */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Choisi par</span>
                    <span className="text-xs font-medium text-[#6B1E3E]">{item.popularity}% des clients</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.popularity}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] h-1.5 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Résumé sélection */}
        <AnimatePresence>
          {selectedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="sticky bottom-6 mx-auto max-w-4xl bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium text-lg">
                      {selectedItems.length} option{selectedItems.length > 1 ? 's' : ''} sélectionnée{selectedItems.length > 1 ? 's' : ''}
                    </div>
                    {totalSavings > 0 && (
                      <div className="text-sm text-white/80">
                        Vous économisez au minimum {totalSavings}€ avec ces offres
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-white/80">Total options</div>
                    <div className="text-3xl font-light">{totalPrice}€</div>
                  </div>
                  <button className="px-8 py-3 bg-white text-[#6B1E3E] rounded-full font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
