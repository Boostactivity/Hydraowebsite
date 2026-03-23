import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Clock } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppWidget({ 
  phoneNumber = "+33612345678",
  message = "Bonjour, j'ai une question sur HYDRAO"
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Prompt bubble */}
        <AnimatePresence>
          {showPrompt && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute bottom-20 right-0 mb-2 w-64"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
                <button
                  onClick={() => setShowPrompt(false)}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium mb-1">
                      Une question ?
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Notre équipe répond en moins de 5 minutes
                    </p>
                    <button
                      onClick={() => setIsOpen(true)}
                      className="text-xs text-[#25D366] font-medium hover:underline"
                    >
                      Démarrer la conversation →
                    </button>
                  </div>
                </div>

                {/* Arrow pointer */}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-2xl flex items-center justify-center group"
        >
          {/* Pulse effect */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[#25D366]"
          />

          {/* Icon */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-7 h-7 text-white relative z-10" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="w-7 h-7 text-white relative z-10" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
          >
            <span className="text-xs text-white font-medium">1</span>
          </motion.div>
        </motion.button>

        {/* Chat panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute bottom-20 right-0 w-96 max-w-[calc(100vw-3rem)]"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Support HYDRAO</h3>
                      <div className="flex items-center gap-1.5 text-xs text-white/90">
                        <div className="w-2 h-2 bg-green-300 rounded-full" />
                        <span>En ligne • Répond en ~5 min</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 bg-[#E5DDD5] min-h-[200px] max-h-[400px] overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-3"
                  >
                    <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
                      <p className="text-sm text-gray-900 mb-1">
                        👋 Bonjour ! Comment puis-je vous aider ?
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Il y a 2 min</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick replies */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <p className="text-xs text-gray-600 mb-2">Réponses rapides :</p>
                    {[
                      '💰 Calculer mes économies',
                      '🔧 Vérifier la compatibilité',
                      '📦 Délai de livraison',
                      '❓ Poser une question'
                    ].map((text, idx) => (
                      <button
                        key={idx}
                        onClick={handleWhatsAppClick}
                        className="block w-full text-left px-4 py-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-sm text-gray-700 transition-colors"
                      >
                        {text}
                      </button>
                    ))}
                  </motion.div>
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-full hover:from-[#20BD5A] hover:to-[#0F7A6A] transition-all shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span className="font-medium">Ouvrir WhatsApp</span>
                  </button>
                  
                  <p className="text-xs text-center text-gray-500 mt-3">
                    Réponse garantie sous 5 minutes pendant les heures d'ouverture
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
