import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Package, TrendingDown, Sparkles, Plus, Minus } from 'lucide-react';

interface BundleItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'essential' | 'comfort' | 'premium';
  quantity: number;
}

export function BundleConfigurator() {
  const [selectedBundle, setSelectedBundle] = useState<'custom' | 'starter' | 'family' | 'premium'>('family');
  const [customItems, setCustomItems] = useState<BundleItem[]>([]);

  const basePrice = 490;

  const availableItems: BundleItem[] = [
    {
      id: 'filter-pack-1',
      name: 'Pack 3 filtres',
      description: '1 an de filtration',
      price: 159,
      icon: '💧',
      category: 'essential',
      quantity: 0
    },
    {
      id: 'co2-pack',
      name: 'Pack 12 CO₂',
      description: '6 mois d\'eau pétillante',
      price: 99,
      icon: '✨',
      category: 'essential',
      quantity: 0
    },
    {
      id: 'maintenance-kit',
      name: 'Kit entretien pro',
      description: 'Produits premium',
      price: 49,
      icon: '🔧',
      category: 'comfort',
      quantity: 0
    },
    {
      id: 'extended-warranty',
      name: 'Garantie 10 ans',
      description: 'Tranquillité absolue',
      price: 149,
      icon: '🛡️',
      category: 'comfort',
      quantity: 0
    },
    {
      id: 'smart-monitoring',
      name: 'Monitoring IoT',
      description: 'App de suivi',
      price: 99,
      icon: '📱',
      category: 'premium',
      quantity: 0
    },
    {
      id: 'installation-express',
      name: 'Installation 24h',
      description: 'Service express',
      price: 79,
      icon: '⚡',
      category: 'premium',
      quantity: 0
    }
  ];

  const predefinedBundles = {
    starter: {
      name: 'Pack Starter',
      description: 'L\'essentiel pour commencer',
      items: ['filter-pack-1', 'co2-pack'],
      savings: 30,
      badge: 'Populaire'
    },
    family: {
      name: 'Pack Famille',
      description: 'Le plus complet',
      items: ['filter-pack-1', 'co2-pack', 'maintenance-kit', 'extended-warranty'],
      savings: 80,
      badge: 'Meilleur rapport'
    },
    premium: {
      name: 'Pack Premium',
      description: 'Tout inclus',
      items: ['filter-pack-1', 'co2-pack', 'maintenance-kit', 'extended-warranty', 'smart-monitoring', 'installation-express'],
      savings: 150,
      badge: 'Maximum'
    }
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCustomItems(prev => {
      const existing = prev.find(i => i.id === itemId);
      const item = availableItems.find(i => i.id === itemId);
      if (!item) return prev;

      if (!existing && delta > 0) {
        return [...prev, { ...item, quantity: 1 }];
      }

      return prev.map(i => {
        if (i.id === itemId) {
          const newQuantity = Math.max(0, i.quantity + delta);
          return { ...i, quantity: newQuantity };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const calculateBundlePrice = (bundleType: string) => {
    if (bundleType === 'custom') {
      return customItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }
    
    const bundle = predefinedBundles[bundleType as keyof typeof predefinedBundles];
    if (!bundle) return 0;
    
    return bundle.items.reduce((acc, itemId) => {
      const item = availableItems.find(i => i.id === itemId);
      return acc + (item?.price || 0);
    }, 0);
  };

  const calculateSavings = (bundleType: string) => {
    if (bundleType === 'custom') {
      const itemCount = customItems.reduce((acc, item) => acc + item.quantity, 0);
      return Math.floor(itemCount * 15);
    }
    return predefinedBundles[bundleType as keyof typeof predefinedBundles]?.savings || 0;
  };

  const bundlePrice = calculateBundlePrice(selectedBundle);
  const savings = calculateSavings(selectedBundle);
  const totalPrice = basePrice + bundlePrice - savings;

  return (
    <section className="section-padding bg-gradient-to-br from-white to-[#FAF8F5]">
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
            <Package className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Choisissez votre pack</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Configurez votre pack HYDRAL
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Économisez jusqu'à 150€ en choisissant un pack complet
          </p>
        </motion.div>

        {/* Sélecteur de bundles prédéfinis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(predefinedBundles).map(([key, bundle], index) => {
            const isSelected = selectedBundle === key;
            const price = calculateBundlePrice(key);
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedBundle(key as any)}
                className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all ${
                  isSelected
                    ? 'border-[#6B1E3E] bg-[#6B1E3E]/5 shadow-xl scale-105'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                {/* Badge */}
                {bundle.badge && (
                  <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white text-xs rounded-full shadow-lg">
                    {bundle.badge}
                  </div>
                )}

                {/* Checkmark */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-4 left-4 w-8 h-8 bg-[#6B1E3E] rounded-full flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`text-center ${isSelected ? 'mt-4' : ''}`}>
                  <h3 className="text-xl text-gray-900 mb-2">{bundle.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{bundle.description}</p>

                  {/* Prix */}
                  <div className="mb-4">
                    <div className="text-3xl text-[#6B1E3E] font-light mb-1">{price}€</div>
                    {bundle.savings > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Économisez au minimum {bundle.savings}€
                      </div>
                    )}
                  </div>

                  {/* Items inclus */}
                  <div className="space-y-2 text-sm text-gray-700">
                    {bundle.items.map(itemId => {
                      const item = availableItems.find(i => i.id === itemId);
                      return item ? (
                        <div key={itemId} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#6B1E3E]" />
                          <span>{item.icon} {item.name}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Configurateur custom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 border-2 border-gray-200 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl text-gray-900 mb-2">Ou créez votre pack personnalisé</h3>
              <p className="text-gray-600">Sélectionnez uniquement ce dont vous avez besoin</p>
            </div>
            <button
              onClick={() => setSelectedBundle('custom')}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedBundle === 'custom'
                  ? 'bg-[#6B1E3E] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mode personnalisé
            </button>
          </div>

          {selectedBundle === 'custom' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {availableItems.map((item, index) => {
                const customItem = customItems.find(i => i.id === item.id);
                const quantity = customItem?.quantity || 0;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#FAF8F5] rounded-2xl p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <h4 className="text-gray-900 font-medium mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                        <div className="text-[#6B1E3E] font-medium">{item.price}€</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={quantity === 0}
                        className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-[#6B1E3E] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="flex-1 text-center font-medium text-gray-900">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-[#6B1E3E] text-white hover:bg-[#8B2E4E] flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Résumé sticky */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-6 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl p-6 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm text-white/80 mb-1">Robinet</div>
                <div className="text-2xl font-light">{basePrice}€</div>
              </div>
              <div className="text-2xl text-white/40">+</div>
              <div className="text-center">
                <div className="text-sm text-white/80 mb-1">Pack sélectionné</div>
                <div className="text-2xl font-light">{bundlePrice}€</div>
              </div>
              {savings > 0 && (
                <>
                  <div className="text-2xl text-white/40">-</div>
                  <div className="text-center">
                    <div className="text-sm text-white/80 mb-1">Économies</div>
                    <div className="text-2xl font-light text-[#D4AF37]">-{savings}€</div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-white/80">Total</div>
                <div className="text-4xl font-light">{totalPrice}€</div>
                {savings > 0 && (
                  <div className="text-xs text-white/70">
                    Au lieu de {basePrice + bundlePrice}€
                  </div>
                )}
              </div>
              <button className="px-8 py-4 bg-white text-[#6B1E3E] rounded-full font-medium hover:bg-gray-100 transition-colors whitespace-nowrap shadow-xl">
                Ajouter au panier
              </button>
            </div>
          </div>

          {savings > 0 && (
            <div className="mt-4 pt-4 border-t border-white/20 text-center">
              <div className="flex items-center justify-center gap-2 text-sm">
                <TrendingDown className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-white/90">
                  Vous économisez <span className="font-medium text-[#D4AF37]">au minimum {savings}€</span> avec ce pack
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}