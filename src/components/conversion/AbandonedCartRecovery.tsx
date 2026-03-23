import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Mail, Clock, Gift, X, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface AbandonedCartRecoveryProps {
  cartItems: CartItem[];
  userEmail?: string;
  onEmailCapture?: (email: string) => void;
  className?: string;
}

export function AbandonedCartRecovery({ 
  cartItems, 
  userEmail,
  onEmailCapture,
  className = '' 
}: AbandonedCartRecoveryProps) {
  const [showReminder, setShowReminder] = useState(false);
  const [email, setEmail] = useState(userEmail || '');
  const [reminderStage, setReminderStage] = useState<'initial' | 'early' | 'late' | 'final'>('initial');
  const [isEmailCaptured, setIsEmailCaptured] = useState(false);

  // Simuler les étapes de récupération basées sur le temps
  useEffect(() => {
    if (cartItems.length === 0) return;

    // Stage 1 : Après 30 secondes (simulé pour démo - normalement 1h)
    const timer1 = setTimeout(() => {
      setReminderStage('early');
      setShowReminder(true);
    }, 30000);

    // Stage 2 : Après 2 minutes (simulé - normalement 24h)
    const timer2 = setTimeout(() => {
      setReminderStage('late');
      setShowReminder(true);
    }, 120000);

    // Stage 3 : Après 5 minutes (simulé - normalement 3 jours)
    const timer3 = setTimeout(() => {
      setReminderStage('final');
      setShowReminder(true);
    }, 300000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [cartItems]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsEmailCaptured(true);
      if (onEmailCapture) {
        onEmailCapture(email);
      }
    }
  };

  const getReminderContent = () => {
    switch (reminderStage) {
      case 'early':
        return {
          title: 'Votre HYDRAO vous attend',
          message: 'Finalisez votre commande maintenant et recevez-le sous 7 jours',
          discount: 0,
          urgency: 'Panier réservé pour 1h',
          icon: ShoppingCart,
          color: 'from-blue-500 to-cyan-500'
        };
      case 'late':
        return {
          title: 'Ne manquez pas -30€',
          message: 'Offre spéciale valable 24h pour finaliser votre commande',
          discount: 30,
          urgency: 'Expire dans 24h',
          icon: Gift,
          color: 'from-[#6B1E3E] to-[#8B2E4E]'
        };
      case 'final':
        return {
          title: 'Dernière chance !',
          message: 'Votre panier expire bientôt. -50€ pour vous décider maintenant.',
          discount: 50,
          urgency: 'Dernières heures',
          icon: Clock,
          color: 'from-red-500 to-rose-600'
        };
      default:
        return {
          title: 'Votre panier HYDRAO',
          message: 'Vos articles sont toujours disponibles',
          discount: 0,
          urgency: '',
          icon: ShoppingCart,
          color: 'from-gray-500 to-gray-600'
        };
    }
  };

  const content = getReminderContent();
  const Icon = content.icon;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const finalPrice = totalPrice - content.discount;

  if (cartItems.length === 0) return null;

  return (
    <AnimatePresence>
      {showReminder && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReminder(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[91] ${className}`}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mx-4">
              {/* Close button */}
              <button
                onClick={() => setShowReminder(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors z-10 shadow-lg"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Header */}
              <div className={`bg-gradient-to-r ${content.color} text-white px-6 py-6 text-center`}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Icon className="w-8 h-8" />
                </motion.div>

                <h3 className="text-2xl mb-2">{content.title}</h3>
                <p className="text-white/90 text-sm">{content.message}</p>

                {content.urgency && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm"
                  >
                    <Clock className="w-4 h-4" />
                    {content.urgency}
                  </motion.div>
                )}
              </div>

              {/* Cart items */}
              <div className="px-6 py-6">
                <div className="space-y-3 mb-6">
                  {cartItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.price}€</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Price summary */}
                <div className="space-y-2 mb-6 p-4 bg-gradient-to-br from-[#6B1E3E]/5 to-[#8B2E4E]/5 rounded-xl border border-[#6B1E3E]/20">
                  {content.discount > 0 && (
                    <>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Sous-total</span>
                        <span>{totalPrice}€</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600 font-medium">
                        <span>Réduction spéciale</span>
                        <span>-{content.discount}€</span>
                      </div>
                      <div className="h-px bg-gray-300 my-2" />
                    </>
                  )}
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium text-gray-900">Total</span>
                    <div className="text-right">
                      {content.discount > 0 && (
                        <span className="text-sm text-gray-400 line-through mr-2">{totalPrice}€</span>
                      )}
                      <span className="text-2xl font-light text-[#6B1E3E]">{finalPrice}€</span>
                    </div>
                  </div>
                </div>

                {/* Email capture if not captured */}
                {!isEmailCaptured && !userEmail && (
                  <form onSubmit={handleEmailSubmit} className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      Recevez un rappel par email :
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre@email.com"
                          required
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-full focus:border-[#6B1E3E] focus:outline-none text-sm"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        OK
                      </motion.button>
                    </div>
                  </form>
                )}

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowReminder(false);
                    // Navigate to checkout
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Finaliser ma commande
                  {content.discount > 0 && <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">-{content.discount}€</span>}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Trust message */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Paiement sécurisé • ✓ Livraison 7 jours • ✓ Garantie 5 ans
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Email sequence tracker (backend simulation)
export const abandonedCartEmailSequence = {
  stage1: {
    delay: '1h',
    subject: 'Votre HYDRAO vous attend 💧',
    template: `
      Bonjour,
      
      Vous avez commencé à configurer votre robinet HYDRAO mais n'avez pas finalisé votre commande.
      
      Votre panier est réservé pendant 24h.
      
      [Bouton CTA : Finaliser ma commande]
      
      Questions ? Notre équipe est là pour vous aider.
    `
  },
  stage2: {
    delay: '24h',
    subject: 'Ne manquez pas -30€ sur votre HYDRAO 🎁',
    template: `
      Bonjour,
      
      Votre HYDRAO attend toujours dans votre panier.
      
      Pour vous aider à vous décider, nous vous offrons 30€ de réduction avec le code : HYDRAO30
      
      ⏰ Code valable 48h uniquement
      
      [Bouton CTA : Profiter de -30€]
      
      Économisez 1000€/an + 30€ de réduction = C'est le moment !
    `
  },
  stage3: {
    delay: '3 jours',
    subject: '⚠️ Dernière chance : Votre panier expire bientôt',
    template: `
      Bonjour,
      
      Votre panier HYDRAO expire dans quelques heures.
      
      Dernière opportunité : -50€ avec le code HYDRAO50LAST
      
      ⚡ Expire ce soir à minuit
      
      [Bouton CTA : Commander maintenant]
      
      Après cette date, le code ne sera plus valable et votre panier sera supprimé.
    `
  }
};
