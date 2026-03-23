import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Gift, TrendingDown, X, Check, Sparkles, Lock } from 'lucide-react';

export function AdvancedEmailCapture() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Détecter le scroll pour déclencher l'apparition
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Apparaît après 50% de scroll
      if (scrollPercentage > 50 && !hasScrolled) {
        setHasScrolled(true);
        
        // Délai de 3 secondes après avoir atteint 50% de scroll
        setTimeout(() => {
          const hasSubmittedEmail = localStorage.getItem('hydral_email_captured');
          if (!hasSubmittedEmail) {
            setIsVisible(true);
          }
        }, 3000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) return;

    // Simuler l'envoi
    setIsSubmitted(true);
    localStorage.setItem('hydral_email_captured', 'true');

    // Fermer après 3 secondes
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Se souvenir que l'utilisateur a fermé
    localStorage.setItem('hydral_email_dismissed', 'true');
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {!isSubmitted ? (
              <>
                {/* Header avec gradient */}
                <div className="relative bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white p-8 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                  />

                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4"
                    >
                      <Gift className="w-8 h-8" />
                    </motion.div>

                    <h2 className="text-3xl mb-2">Offre exclusive</h2>
                    <p className="text-xl text-white/90">
                      -50€ sur votre première commande
                    </p>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-8">
                  {/* Bénéfices */}
                  <div className="mb-6">
                    <p className="text-gray-700 mb-6 text-center">
                      Recevez votre code promo immédiatement par email
                    </p>

                    <div className="space-y-3">
                      {[
                        { icon: TrendingDown, text: '50€ de réduction sur votre commande' },
                        { icon: Gift, text: 'Accès prioritaire aux nouvelles offres' },
                        { icon: Sparkles, text: 'Livraison offerte sous 7 jours' }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#6B1E3E]/5 to-transparent rounded-xl"
                        >
                          <div className="w-8 h-8 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-4 h-4 text-[#6B1E3E]" />
                          </div>
                          <span className="text-sm text-gray-700">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Formulaire */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-full focus:border-[#6B1E3E] focus:outline-none transition-colors text-gray-900"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 gradient-bordeaux text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                      Recevoir mon code -50€
                    </motion.button>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <Lock className="w-3 h-3" />
                      <span>Vos données sont protégées et ne seront jamais partagées</span>
                    </div>
                  </form>

                  {/* Urgence */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-center"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border-2 border-orange-200 rounded-full">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-orange-500 rounded-full"
                      />
                      <span className="text-sm text-orange-700 font-medium">
                        Offre limitée : 47 codes restants aujourd'hui
                      </span>
                    </div>
                  </motion.div>

                  {/* Social proof */}
                  <div className="mt-6 text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white"
                          />
                        ))}
                      </div>
                      <span className="font-medium text-gray-700">+2 347 clients</span>
                    </div>
                    <p className="text-xs">ont profité de cette offre ce mois-ci</p>
                  </div>
                </div>
              </>
            ) : (
              // État succès
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-600" />
                </motion.div>

                <h3 className="text-2xl font-medium text-gray-900 mb-3">
                  Parfait ! 🎉
                </h3>
                <p className="text-gray-600 mb-6">
                  Votre code promo <span className="font-bold text-[#6B1E3E]">HYDRAL50</span> a été envoyé à :
                </p>
                <p className="text-lg font-medium text-gray-900 mb-6">
                  {email}
                </p>

                <div className="p-4 bg-[#6B1E3E]/5 rounded-2xl border-2 border-[#6B1E3E]/20">
                  <p className="text-sm text-gray-700">
                    💡 <span className="font-medium">Conseil :</span> Vérifiez vos spams si vous ne recevez pas l'email dans 2 minutes
                  </p>
                </div>

                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-8 py-3 gradient-bordeaux text-white rounded-full font-medium shadow-lg"
                >
                  Continuer ma visite
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}