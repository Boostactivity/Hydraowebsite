import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, X, Send, Check } from 'lucide-react';

export function ReviewCollectionWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'rating' | 'comment' | 'success'>('rating');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    
    // Fermer après 3 secondes
    setTimeout(() => {
      setIsOpen(false);
      // Reset
      setTimeout(() => {
        setStep('rating');
        setRating(0);
        setComment('');
        setName('');
      }, 500);
    }, 3000);
  };

  return (
    <>
      {/* Floating Review Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-64 right-6 z-40 w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white rounded-full shadow-2xl hover:shadow-[#D4AF37]/50 flex items-center justify-center group"
          >
            <Star className="w-7 h-7 fill-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal de collecte d'avis */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, x: 100 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: 100 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-1/2 -translate-y-1/2 right-6 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              {step === 'success' ? (
                // Écran de confirmation
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-green-600" />
                  </motion.div>
                  
                  <h3 className="text-2xl text-gray-900 mb-3">Merci pour votre avis ! 🙏</h3>
                  <p className="text-gray-600 mb-6">
                    Votre retour nous aide à améliorer continuellement HYDRAO
                  </p>

                  <div className="p-4 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20">
                    <div className="flex items-center gap-2 justify-center mb-2">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">
                      Votre note : {rating}/5 étoiles
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <Star className="w-6 h-6 fill-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium">Donnez votre avis</h3>
                          <p className="text-sm text-white/80">Sur votre expérience HYDRAO</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Formulaire */}
                  <form onSubmit={handleSubmit} className="p-6">
                    {step === 'rating' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="text-center mb-8">
                          <h4 className="text-lg text-gray-900 mb-4">
                            Comment évaluez-vous HYDRAO ?
                          </h4>
                          
                          {/* Étoiles */}
                          <div className="flex items-center justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <motion.button
                                key={value}
                                type="button"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setRating(value)}
                                onMouseEnter={() => setHoveredRating(value)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`w-12 h-12 transition-all ${
                                    value <= (hoveredRating || rating)
                                      ? 'fill-[#D4AF37] text-[#D4AF37]'
                                      : 'text-gray-300'
                                  }`}
                                />
                              </motion.button>
                            ))}
                          </div>

                          {rating > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-gray-600"
                            >
                              {rating === 5 && '⭐ Excellent !'}
                              {rating === 4 && '😊 Très bien !'}
                              {rating === 3 && '👍 Bien'}
                              {rating === 2 && '😐 Moyen'}
                              {rating === 1 && '😞 Décevant'}
                            </motion.div>
                          )}
                        </div>

                        <motion.button
                          type="button"
                          onClick={() => rating > 0 && setStep('comment')}
                          disabled={rating === 0}
                          whileHover={rating > 0 ? { scale: 1.02, y: -2 } : {}}
                          whileTap={rating > 0 ? { scale: 0.98 } : {}}
                          className="w-full px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Continuer
                        </motion.button>
                      </motion.div>
                    )}

                    {step === 'comment' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="mb-6">
                          <button
                            type="button"
                            onClick={() => setStep('rating')}
                            className="text-sm text-gray-600 hover:text-gray-900 mb-4"
                          >
                            ← Retour
                          </button>

                          <h4 className="text-lg text-gray-900 mb-4">
                            Parlez-nous de votre expérience
                          </h4>

                          {/* Nom */}
                          <div className="mb-4">
                            <label className="block text-sm text-gray-700 mb-2">
                              Votre prénom
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Ex: Sophie"
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                          </div>

                          {/* Commentaire */}
                          <div className="mb-4">
                            <label className="block text-sm text-gray-700 mb-2">
                              Votre avis (optionnel)
                            </label>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Qu'avez-vous apprécié ? Comment HYDRAO a-t-il transformé votre quotidien ?"
                              rows={4}
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
                            />
                          </div>

                          {/* Note sélectionnée */}
                          <div className="flex items-center justify-center gap-1 mb-6 p-3 bg-[#FAF8F5] rounded-xl">
                            <span className="text-sm text-gray-600 mr-2">Votre note :</span>
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                            ))}
                          </div>
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Send className="w-5 h-5" />
                          Envoyer mon avis
                        </motion.button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          Votre avis sera publié après validation
                        </p>
                      </motion.div>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
