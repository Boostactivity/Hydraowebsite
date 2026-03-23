import React, { useState } from 'react';
import { Page } from '../App';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, Check, Lock, Truck, Shield, ArrowRight, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface CartPageProps {
  navigate: (page: Page) => void;
}

export function CartPage({ navigate }: CartPageProps) {
  const { cart, removeFromCart, cartTotal, clearCart } = useCart();
  const [showInstallationInfo, setShowInstallationInfo] = useState(false);

  const shipping = 0; // Livraison offerte
  const installation = 280; // Installation standard (optionnelle)
  const [includeInstallation, setIncludeInstallation] = useState(false);

  const total = cartTotal + shipping + (includeInstallation ? installation : 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-12 h-12 text-[#6B1E3E]" />
            </div>
            <h1 className="mb-6 text-gray-900">Votre panier est vide</h1>
            <p className="text-xl text-[#8B7E74] mb-10">
              Configurez votre robinet HYDRAL en 3 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={() => navigate('configurator')}
                className="px-12 py-5 bg-[#6B1E3E] text-white rounded-full text-lg hover:bg-[#6B1E3E]/90 transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Configurer mon robinet
              </motion.button>
              <motion.button
                onClick={() => navigate('gamme')}
                className="px-12 py-5 border-2 border-gray-300 text-gray-700 rounded-full text-lg hover:border-[#6B1E3E] hover:text-[#6B1E3E] transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir la gamme
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-gray-900">Votre panier</h1>
          <p className="text-xl text-[#8B7E74]">
            Vérifiez votre commande avant de passer au paiement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl border border-gray-200/50"
              >
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#FAF8F5] to-[#E8D5DC]/20 rounded-2xl flex-shrink-0 flex items-center justify-center">
                    <span className="text-3xl">🚰</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl text-gray-900 mb-2">{item.name}</h3>
                        <p className="text-sm text-[#8B7E74]">{item.type}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-50 rounded-xl transition-colors text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl text-[#6B1E3E]">{item.price}€</p>
                        <p className="text-sm text-[#8B7E74]">TTC</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-[#8B7E74] mb-1">Quantité</p>
                        <p className="text-lg text-gray-900">×{item.quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Installation optionnelle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`bg-white p-8 rounded-3xl border-2 transition-all cursor-pointer ${
                includeInstallation
                  ? 'border-[#6B1E3E] bg-[#6B1E3E]/5'
                  : 'border-gray-200 hover:border-[#6B1E3E]/30'
              }`}
              onClick={() => setIncludeInstallation(!includeInstallation)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    includeInstallation
                      ? 'border-[#6B1E3E] bg-[#6B1E3E]'
                      : 'border-gray-300'
                  }`}>
                    {includeInstallation && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-gray-900 mb-2">Installation professionnelle</h3>
                    <p className="text-[#8B7E74] mb-4 leading-relaxed">
                      Un installateur agréé HYDRAL intervient chez vous sous 7-10 jours. Installation complète en 2-3h (raccordement, boiler, tests).
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowInstallationInfo(!showInstallationInfo);
                      }}
                      className="flex items-center gap-2 text-sm text-[#6B1E3E] hover:underline"
                    >
                      <Info className="w-4 h-4" />
                      {showInstallationInfo ? 'Masquer les détails' : 'Voir les détails'}
                    </button>

                    {showInstallationInfo && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-4 p-4 bg-[#FAF8F5] rounded-2xl"
                      >
                        <p className="text-sm text-[#8B7E74] mb-3">L'installation inclut :</p>
                        <ul className="space-y-2 text-sm text-[#8B7E74]">
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                            <span>Dépose ancien robinet</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                            <span>Pose robinet HYDRAL + boiler</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                            <span>Raccordement électrique (230V)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                            <span>Tests + explication fonctionnement</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                            <span>Nettoyage du chantier</span>
                          </li>
                        </ul>
                        <p className="text-xs text-[#8B7E74] mt-4">
                          Vous pouvez aussi installer vous-même (notice fournie) ou faire appel à votre plombier.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl text-[#6B1E3E]">280€</p>
                  <p className="text-sm text-[#8B7E74]">HT</p>
                </div>
              </div>
            </motion.div>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              Vider le panier
            </button>
          </div>

          {/* Résumé */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-gray-200/50 sticky top-24">
              <h2 className="text-2xl mb-8 text-gray-900">Récapitulatif</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-[#8B7E74]">
                  <span>Robinet HYDRAL</span>
                  <span className="text-gray-900">{cartTotal}€</span>
                </div>
                {includeInstallation && (
                  <div className="flex justify-between text-[#8B7E74]">
                    <span>Installation pro</span>
                    <span className="text-gray-900">{installation}€</span>
                  </div>
                )}
                <div className="flex justify-between text-[#8B7E74]">
                  <span>Livraison</span>
                  <span className="text-green-600 font-medium">Offerte</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-8">
                <span className="text-xl text-gray-900">Total TTC</span>
                <span className="text-4xl text-[#6B1E3E]">{total}€</span>
              </div>

              {/* Paiement sécurisé */}
              <motion.button
                onClick={() => navigate('checkout')}
                className="w-full px-8 py-5 bg-[#6B1E3E] text-white rounded-full text-lg hover:bg-[#6B1E3E]/90 transition-colors flex items-center justify-center gap-3 mb-6"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Passer au paiement
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              {/* Réassurances */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-[#8B7E74]">
                  <div className="w-8 h-8 bg-[#6B1E3E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-[#6B1E3E]" />
                  </div>
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#8B7E74]">
                  <div className="w-8 h-8 bg-[#6B1E3E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-[#6B1E3E]" />
                  </div>
                  <span>Livraison 5-7 jours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#8B7E74]">
                  <div className="w-8 h-8 bg-[#6B1E3E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-[#6B1E3E]" />
                  </div>
                  <span>Garantie 5 ans</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transparence prix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-gradient-to-br from-[#6B1E3E]/5 to-white rounded-3xl border border-[#6B1E3E]/20"
        >
          <h3 className="text-xl mb-4 text-gray-900">Ce qui est inclus dans le prix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#8B7E74]">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
              <span>Robinet HYDRAL complet (mitigeur + boiler + module filtration)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
              <span>1 filtre 5 étapes (durée : 6 mois)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
              <span>Notice d'installation détaillée</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
              <span>Garantie 5 ans pièces & main d'œuvre</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
              <span>Support technique 7j/7</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
              <span>Livraison offerte (5-7 jours)</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-[#8B7E74]">
              <strong className="text-gray-900">Non inclus :</strong> Filtres de remplacement (fournis avec formules d'entretien ou à l'unité 35€), cartouches CO₂ si module pétillant (incluses dans formules).
            </p>
          </div>
        </motion.div>

        {/* Questions ? */}
        <div className="mt-12 text-center">
          <p className="text-[#8B7E74] mb-6">Des questions avant de commander ?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => navigate('faq')}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[#6B1E3E] hover:text-[#6B1E3E] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Consulter la FAQ
            </motion.button>
            <motion.button
              onClick={() => navigate('support')}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[#6B1E3E] hover:text-[#6B1E3E] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Contacter le support
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}