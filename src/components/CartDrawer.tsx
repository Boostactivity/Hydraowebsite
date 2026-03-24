import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ChevronRight, Shield, Truck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Page } from '../App';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (page: Page) => void;
}

export function CartDrawer({ isOpen, onClose, navigate }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate('checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl text-gray-900">Votre panier</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {cartCount} {cartCount > 1 ? 'articles' : 'article'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  aria-label="Fermer le panier"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl text-gray-900 mb-2">Votre panier est vide</h3>
                  <p className="text-gray-600 mb-8">
                    Configurez votre robinet HYDRAL pour commencer.
                  </p>
                  <motion.button
                    onClick={() => {
                      onClose();
                      navigate('configurator');
                    }}
                    className="px-8 py-4 bg-[#6B1E3E] text-white rounded-full hover:bg-[#8B2E4E] transition-all"
                    whileHover={{ y: -2 }}
                  >
                    Créer mon HYDRAL
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-[#FAF8F5] rounded-2xl p-4 border border-gray-200/50"
                    >
                      <div className="flex gap-4">
                        {/* Image placeholder */}
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0"></div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-900 mb-1 truncate">{item.name}</h3>
                          {item.details && (
                            <p className="text-xs text-gray-600 mb-2">
                              {typeof item.details === 'string' ? item.details : JSON.stringify(item.details)}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-[#FAF8F5]"
                                aria-label={`Diminuer la quantité de ${item.name}`}
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="text-gray-900 w-8 text-center" aria-label={`Quantité: ${item.quantity}`}>{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-[#FAF8F5]"
                                aria-label={`Augmenter la quantité de ${item.name}`}
                              >
                                <Plus className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="text-lg text-gray-900">{item.price * item.quantity}€</div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors flex-shrink-0"
                          aria-label={`Supprimer ${item.name} du panier`}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Sticky */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 bg-white p-6 space-y-4">
                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center text-center p-2">
                    <Shield className="w-5 h-5 text-[#6B1E3E] mb-1" />
                    <span className="text-xs text-gray-600">Garantie 5 ans</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2">
                    <Truck className="w-5 h-5 text-[#6B1E3E] mb-1" />
                    <span className="text-xs text-gray-600">Livraison 5-7j</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2">
                    <CreditCard className="w-5 h-5 text-[#6B1E3E] mb-1" />
                    <span className="text-xs text-gray-600">Paiement 4x</span>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Sous-total</span>
                    <span>{cartTotal}€</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex items-center justify-between text-xl">
                    <span className="text-gray-900">Total</span>
                    <span className="text-[#6B1E3E]">{cartTotal}€</span>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    ou 4 × {(cartTotal / 4).toFixed(2)}€ sans frais
                  </p>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-[#6B1E3E] to-[#6B1E3E]/90 text-white rounded-full shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Commander maintenant
                  <ChevronRight className="w-5 h-5" />
                </motion.button>

                <button
                  onClick={onClose}
                  className="w-full text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}