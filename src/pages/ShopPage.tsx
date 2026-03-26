import React, { useState } from 'react';
import { Page } from '../App';
import { shopItems } from '../data/products';
import { ShoppingCart, Check, Package, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

interface ShopPageProps {
  navigate: (page: Page) => void;
}

export function ShopPage({ navigate }: ShopPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { addToCart } = useCart();

  const filteredItems = activeCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: typeof shopItems[0]) => {
    addToCart({
      id: item.id,
      type: 'shop-item',
      name: item.name,
      price: item.price,
      quantity: 1
    });
  };

  const categories = [
    { id: 'all', label: 'Tout' },
    { id: 'filter', label: 'Filtres' },
    { id: 'co2', label: 'CO₂' },
    { id: 'bottle', label: 'Bouteilles' },
    { id: 'thermos', label: 'Thermos' },
    { id: 'accessory', label: 'Accessoires' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero ultra-minimaliste */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-6">
              <span className="block text-gray-900 font-light">Boutique</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed mb-8">
              Filtres, CO₂, bouteilles et accessoires pour votre robinet HYDRAL.
            </p>
            
            {/* Mention discrète abonnements */}
            <p className="text-sm text-[#8B7E74]">
              Besoin d'un abonnement ?{' '}
              <button
                onClick={() => navigate('subscriptions')}
                className="text-[#6B1E3E] hover:underline"
              >
                Voir les formules
              </button>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Produits à l'unité */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-[#FAF8F5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtres catégories */}
          <div className="flex flex-wrap gap-2 justify-center mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#6B1E3E] text-white'
                    : 'bg-white border border-gray-200 text-[#8B7E74] hover:border-[#6B1E3E] hover:text-[#6B1E3E]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grille produits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-8 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-[#FAF8F5] to-[#E8D5DC]/10 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-lg font-light text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-[#8B7E74] mb-6 min-h-[40px]">{item.description}</p>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-3xl font-light text-[#6B1E3E]">{item.price}€</p>
                  </div>
                  {item.stock > 0 && (
                    <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                      En stock
                    </div>
                  )}
                </div>

                <motion.button
                  onClick={() => handleAddToCart(item)}
                  className="w-full px-6 py-3 min-h-[48px] bg-[#6B1E3E] text-white rounded-full hover:bg-[#6B1E3E]/90 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter au panier
                </motion.button>
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#8B7E74]">Aucun produit dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info livraison - Version discrète intégrée */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-10 h-10 bg-[#6B1E3E]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Truck className="w-5 h-5 text-[#6B1E3E]" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Livraison gratuite</h4>
              <p className="text-xs text-[#8B7E74]">
                Livraison sous 5 à 7 jours ouvrés
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-[#6B1E3E]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5 text-[#6B1E3E]" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Retour 14 jours</h4>
              <p className="text-xs text-[#8B7E74]">
                Produits non ouverts
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-[#6B1E3E]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Package className="w-5 h-5 text-[#6B1E3E]" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Qualité garantie</h4>
              <p className="text-xs text-[#8B7E74]">
                Produits certifiés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final doux */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-gray-900 font-light">Des questions ?</h2>
          <p className="text-lg text-[#8B7E74] mb-10">
            Notre équipe est là pour vous aider.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate('faq')}
              className="px-10 py-4 bg-[#6B1E3E] text-white rounded-full text-sm hover:bg-[#6B1E3E]/90 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Consulter la FAQ
            </motion.button>
            <motion.button
              onClick={() => navigate('support')}
              className="px-10 py-4 border border-[#6B1E3E]/30 text-[#6B1E3E] rounded-full text-sm hover:border-[#6B1E3E] hover:bg-[#6B1E3E]/5 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Contacter le support
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}