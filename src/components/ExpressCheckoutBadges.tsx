import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

interface ExpressCheckoutBadgesProps {
  variant?: 'default' | 'compact' | 'detailed';
  showPaymentSplit?: boolean;
  totalAmount?: number;
}

export function ExpressCheckoutBadges({ 
  variant = 'default', 
  showPaymentSplit = true,
  totalAmount 
}: ExpressCheckoutBadgesProps) {
  
  const paymentMethods = [
    { name: 'Apple Pay', logo: '🍎', color: 'bg-black' },
    { name: 'Google Pay', logo: 'G', color: 'bg-blue-600' },
    { name: 'Klarna', logo: 'K', color: 'bg-pink-500' },
    { name: 'Alma', logo: 'A', color: 'bg-purple-600' }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <CreditCard className="w-4 h-4" />
        <span>Paiement sécurisé •</span>
        <div className="flex items-center gap-1">
          {paymentMethods.map((method, idx) => (
            <div key={idx} className={`w-6 h-6 rounded ${method.color} text-white text-xs flex items-center justify-center`}>
              {method.logo}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="space-y-6">
        {/* Express Checkout Buttons */}
        <div>
          <h4 className="text-sm text-gray-600 mb-3">Paiement express</h4>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              className="flex items-center justify-center gap-2 py-3 px-4 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">🍎</span>
              <span className="text-sm">Apple Pay</span>
            </motion.button>
            <motion.button
              className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-bold">G</span>
              <span className="text-sm">Google Pay</span>
            </motion.button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou paiement classique</span>
          </div>
        </div>

        {/* Payment Split Options */}
        {showPaymentSplit && totalAmount && (
          <div>
            <h4 className="text-sm text-gray-600 mb-3">Paiement en plusieurs fois</h4>
            <div className="space-y-2">
              <div className="p-4 rounded-xl border-2 border-pink-200 bg-pink-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-pink-500 text-white text-xs flex items-center justify-center font-bold">
                      K
                    </div>
                    <span className="text-sm text-gray-900">Klarna</span>
                  </div>
                  <span className="text-sm text-gray-600">Sans frais</span>
                </div>
                <div className="text-lg text-gray-900">
                  4 × {(totalAmount / 4).toFixed(2)}€
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Premier paiement aujourd'hui, puis tous les 30 jours
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                      A
                    </div>
                    <span className="text-sm text-gray-900">Alma</span>
                  </div>
                  <span className="text-sm text-gray-600">Sans frais</span>
                </div>
                <div className="text-lg text-gray-900">
                  3 × {(totalAmount / 3).toFixed(2)}€
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  Éligible sous conditions, vérification instantanée
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security badges */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <span>Paiement sécurisé 3DS</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span>Données cryptées SSL</span>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-gray-200/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-[#6B1E3E]" />
        </div>
        <div>
          <h4 className="text-gray-900">Paiement rapide et sécurisé</h4>
          <p className="text-sm text-gray-600">En un clic avec vos moyens de paiement favoris</p>
        </div>
      </div>

      {/* Payment methods grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${method.color} text-white rounded-xl p-3 flex items-center justify-center gap-2`}
          >
            <span className="text-lg font-bold">{method.logo}</span>
            <span className="text-sm">{method.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Payment split info */}
      {showPaymentSplit && totalAmount && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-700">Ou payez en 4 fois sans frais</span>
            <span className="text-[#6B1E3E]">4 × {(totalAmount / 4).toFixed(2)}€</span>
          </div>
        </div>
      )}
    </div>
  );
}
