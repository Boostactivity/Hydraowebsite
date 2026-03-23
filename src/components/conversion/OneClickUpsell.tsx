import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check, Sparkles, TrendingUp, Shield, X } from 'lucide-react';

interface UpsellProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  savings?: string;
  benefits: string[];
  image: string;
  badge?: string;
}

interface OneClickUpsellProps {
  mainProduct: {
    name: string;
    price: number;
  };
  onUpsellAccepted?: (productId: string) => void;
  onUpsellDeclined?: () => void;
  className?: string;
}

export function OneClickUpsell({ 
  mainProduct, 
  onUpsellAccepted, 
  onUpsellDeclined,
  className = '' 
}: OneClickUpsellProps) {
  const [selectedUpsell, setSelectedUpsell] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const upsellProducts: UpsellProduct[] = [
    {
      id: 'filters-yearly',
      name: 'Pack Filtres Premium 1 an',
      description: 'Recevez automatiquement vos filtres tous les 6 mois',
      price: 89,
      originalPrice: 120,
      savings: '31€ économisés',
      benefits: [
        '2 jeux de filtres haute performance',
        'Livraison automatique incluse',
        'Rappel avant chaque envoi',
        'Sans engagement, pausable'
      ],
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
      badge: 'Recommandé'
    },
    {
      id: 'co2-yearly',
      name: 'Abonnement CO₂ Annuel',
      description: 'Eau pétillante à volonté pendant 1 an',
      price: 79,
      originalPrice: 99,
      savings: '20€ économisés',
      benefits: [
        '4 cartouches CO₂ par an',
        'Équivaut à 240L d\'eau gazeuse',
        'Livraison tous les 3 mois',
        'Recyclage des cartouches'
      ],
      image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400',
      badge: 'Populaire'
    },
    {
      id: 'protection-plan',
      name: 'Protection Premium 5 ans',
      description: 'Sérénité totale avec garantie étendue',
      price: 149,
      savings: 'Rempl. gratuit en cas de panne',
      benefits: [
        'Remplacement gratuit pièces défectueuses',
        'Intervention plombier incluse',
        'Hotline prioritaire 7j/7',
        'Transfert possible si déménagement'
      ],
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400',
      badge: 'Tranquillité'
    }
  ];

  const handleAddUpsell = (productId: string) => {
    setSelectedUpsell(productId);
    setIsAdded(true);
    
    if (onUpsellAccepted) {
      onUpsellAccepted(productId);
    }

    // Reset after animation
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const handleDecline = () => {
    if (onUpsellDeclined) {
      onUpsellDeclined();
    }
  };

  return (
    <section className={`section-padding bg-gradient-to-br from-[#FAF8F5] to-white ${className}`}>
      <div className="section-container max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Complétez votre équipement</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Maximisez votre investissement
            <span className="block text-[#6B1E3E]">dès maintenant</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Profitez d'offres exclusives réservées aux nouveaux clients HYDRAO
          </p>
        </motion.div>

        {/* Current order summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 p-6 bg-white rounded-2xl border-2 border-gray-200 max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Votre commande actuelle</div>
              <div className="font-medium text-gray-900">{mainProduct.name}</div>
            </div>
            <div className="text-2xl font-light text-gray-900">{mainProduct.price}€</div>
          </div>
        </motion.div>

        {/* Upsell products grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {upsellProducts.map((product, idx) => {
            const isSelected = selectedUpsell === product.id;
            const wasAdded = isAdded && isSelected;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative bg-white rounded-3xl border-2 overflow-hidden transition-all ${
                  isSelected 
                    ? 'border-[#6B1E3E] ring-2 ring-[#6B1E3E]/30 shadow-xl' 
                    : 'border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-lg'
                }`}
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#6B1E3E] text-white text-xs rounded-full font-medium z-10">
                    {product.badge}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">{product.originalPrice}€</span>
                      )}
                      <span className="text-3xl font-light text-[#6B1E3E]">{product.price}€</span>
                    </div>
                    {product.savings && (
                      <div className="text-sm text-green-600 font-medium">
                        💰 {product.savings}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <AnimatePresence mode="wait">
                    {wasAdded ? (
                      <motion.div
                        key="added"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="w-full py-3 bg-green-500 text-white rounded-full font-medium flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Ajouté !
                      </motion.div>
                    ) : (
                      <motion.button
                        key="add"
                        onClick={() => handleAddUpsell(product.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                          isSelected
                            ? 'bg-[#6B1E3E] text-white'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        <Plus className="w-5 h-5" />
                        Ajouter en 1 clic
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Value proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Pourquoi commander maintenant ?
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    Prix bloqués : Évitez les hausses tarifaires 2024
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    Livraison groupée : Économisez les frais de port
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    Installation unique : Tout configuré dès le départ
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Trust seals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Annulable à tout moment</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Garantie satisfait ou remboursé</span>
            </div>
          </div>
        </motion.div>

        {/* Decline option */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button
            onClick={handleDecline}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Non merci, continuer sans ces options
          </button>
        </motion.div>
      </div>
    </section>
  );
}
