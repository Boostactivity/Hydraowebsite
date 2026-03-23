import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Mail, Clock, Sparkles, ArrowRight } from 'lucide-react';

interface ExitIntentOfferProps {
  onClose?: () => void;
  onEmailCapture?: (email: string) => void;
  className?: string;
}

export function ExitIntentOffer({ onClose, onEmailCapture, className = '' }: ExitIntentOfferProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(48);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà vu l'offre (localStorage)
    const hasSeenOffer = localStorage.getItem('hydrao_exit_intent_seen');
    if (hasSeenOffer) return;

    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Détecter mouvement vers le haut (sortie)
      if (e.clientY <= 10 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        setIsVisible(true);
        localStorage.setItem('hydrao_exit_intent_seen', 'true');
      }
    };

    // Délai avant d'activer la détection (éviter trigger immédiat)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      setIsSubmitted(true);
      if (onEmailCapture) {
        onEmailCapture(email);
      }

      // Fermer automatiquement après 3 secondes
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[101] ${className}`}
          >
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mx-4">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header with gradient */}
                  <div className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white px-8 py-8 text-center relative overflow-hidden">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
                    />
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4"
                    >
                      <Gift className="w-5 h-5" />
                      <span className="text-sm font-medium uppercase tracking-wider">Offre Exclusive</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl mb-3">
                      Attendez !
                    </h2>
                    <p className="text-xl text-white/90">
                      Avant de partir, profitez de <span className="font-bold">50€ de réduction</span>
                    </p>
                  </div>

                  {/* Content */}
                  <div className="px-8 py-8">
                    {/* Benefits grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {[
                        { icon: Gift, label: '-50€', description: 'Sur votre 1ère commande' },
                        { icon: Clock, label: '48h', description: 'Pour en profiter' },
                        { icon: Sparkles, label: 'Gratuit', description: 'Livraison offerte' }
                      ].map((benefit, idx) => {
                        const Icon = benefit.icon;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="text-center p-4 bg-gradient-to-br from-[#6B1E3E]/5 to-[#8B2E4E]/5 rounded-2xl border border-[#6B1E3E]/20"
                          >
                            <Icon className="w-8 h-8 text-[#6B1E3E] mx-auto mb-2" />
                            <div className="text-2xl font-light text-[#6B1E3E] mb-1">{benefit.label}</div>
                            <div className="text-xs text-gray-600">{benefit.description}</div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Timer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mb-6 text-center"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-200 text-red-600 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Offre valable pendant <span className="font-bold">{countdown}h</span>
                        </span>
                      </div>
                    </motion.div>

                    {/* Email form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="exit-email" className="block text-sm text-gray-700 mb-2 text-center">
                          Entrez votre email pour recevoir votre code promo :
                        </label>
                        <div className="flex gap-3">
                          <div className="flex-1 relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              id="exit-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="votre@email.com"
                              required
                              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-full focus:border-[#6B1E3E] focus:outline-none text-gray-900 transition-colors"
                            />
                          </div>
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
                          >
                            Obtenir -50€
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 text-center">
                        Code promo envoyé instantanément. Pas de spam, promis.
                      </p>
                    </form>

                    {/* Social proof */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-600"
                    >
                      ✅ <strong>2 347 clients</strong> ont déjà profité de cette offre
                    </motion.div>
                  </div>
                </>
              ) : (
                // Success state
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-8 py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                    >
                      ✓
                    </motion.div>
                  </motion.div>

                  <h3 className="text-2xl text-gray-900 mb-3">
                    Parfait ! 🎉
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Votre code promo <span className="px-3 py-1 bg-[#6B1E3E] text-white rounded-full font-mono">HYDRAO50</span> a été envoyé à :
                  </p>
                  <p className="font-medium text-[#6B1E3E] mb-6">{email}</p>
                  
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 text-sm text-gray-700">
                    💡 <strong>Astuce :</strong> Vérifiez vos spams si vous ne recevez rien dans 2 minutes
                  </div>

                  <p className="text-xs text-gray-500 mt-6">
                    Cette fenêtre se fermera automatiquement...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
