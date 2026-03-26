import React, { useState, useEffect } from 'react';
import { ChevronRight, Lock, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

interface StickyCheckoutSummaryProps {
  onCheckout?: () => void;
  showPromoCode?: boolean;
}

export function StickyCheckoutSummary({ 
  onCheckout, 
  showPromoCode = true 
}: StickyCheckoutSummaryProps) {
  const { cart, cartTotal, cartCount } = useCart();
  const [isSticky, setIsSticky] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApplyPromo = () => {
    // Simulation codes promo
    const validCodes: { [key: string]: number } = {
      'HYDRAL10': 10,
      'BIENVENUE': 5,
      'PREMIER': 15
    };

    const discount = validCodes[promoCode.toUpperCase()];
    if (discount) {
      setPromoApplied(true);
      setPromoDiscount(discount);
    } else {
      // Code promo invalide - TODO: show inline error
    }
  };

  const shipping = 0; // Livraison gratuite
  const discountAmount = (cartTotal * promoDiscount) / 100;
  const finalTotal = cartTotal - discountAmount + shipping;

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block"
      >
        <div className={`${isSticky ? 'sticky top-24' : ''}`}>
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl text-gray-900 mb-6">Récapitulatif</h3>

            {/* Items */}
            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-gray-900 truncate">{item.name}</h4>
                      {item.details && (
                        <p className="text-xs text-gray-500 mt-1">
                          {typeof item.details === 'string' 
                            ? item.details 
                            : JSON.stringify(item.details)}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">Qté: {item.quantity}</span>
                        <span className="text-sm text-gray-900">{item.price * item.quantity}€</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Promo Code */}
            {showPromoCode && !promoApplied && (
              <div className="mb-6">
                <label className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Code promo
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="HYDRAL10"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-[#6B1E3E] text-sm"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm hover:bg-gray-800 transition-colors"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            )}

            {promoApplied && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-700">Code promo appliqué</span>
                  <span className="text-green-700 font-medium">-{promoDiscount}%</span>
                </div>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-gray-700">
                <span>Sous-total</span>
                <span>{cartTotal.toFixed(2)}€</span>
              </div>

              {promoApplied && (
                <div className="flex items-center justify-between text-green-600">
                  <span>Remise ({promoDiscount}%)</span>
                  <span>-{discountAmount.toFixed(2)}€</span>
                </div>
              )}

              <div className="flex items-center justify-between text-gray-700">
                <span>Livraison</span>
                <span className="text-green-600">Gratuite</span>
              </div>

              <div className="h-px bg-gray-200"></div>

              <div className="flex items-center justify-between text-xl">
                <span className="text-gray-900">Total</span>
                <span className="text-[#6B1E3E]">{finalTotal.toFixed(2)}€</span>
              </div>

              <p className="text-xs text-gray-500 text-center">
                ou 4 × {(finalTotal / 4).toFixed(2)}€ sans frais
              </p>
            </div>

            {/* CTA */}
            <motion.button
              onClick={onCheckout}
              disabled={cart.length === 0}
              className={`w-full py-4 rounded-full flex items-center justify-center gap-2 transition-all ${
                cart.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#6B1E3E] to-[#6B1E3E]/90 text-white shadow-lg hover:shadow-xl'
              }`}
              whileHover={cart.length > 0 ? { scale: 1.02 } : {}}
              whileTap={cart.length > 0 ? { scale: 0.98 } : {}}
            >
              <Lock className="w-5 h-5" />
              Passer la commande
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            {/* Security badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Paiement sécurisé</span>
                </div>
                <span>•</span>
                <span>Garantie 3 ans</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Sticky Bottom Bar */}
      <AnimatePresence>
        {isSticky && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm text-gray-600">{cartCount} article{cartCount > 1 ? 's' : ''}</div>
                <div className="text-xl text-[#6B1E3E]">{finalTotal.toFixed(2)}€</div>
              </div>
              <motion.button
                onClick={onCheckout}
                disabled={cart.length === 0}
                className={`px-8 py-3 rounded-full flex items-center gap-2 ${
                  cart.length === 0
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-[#6B1E3E] text-white'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                Commander
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
