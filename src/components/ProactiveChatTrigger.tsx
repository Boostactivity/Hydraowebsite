import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

interface ProactiveChatTriggerProps {
  onOpenChat: () => void;
}

export function ProactiveChatTrigger({ onOpenChat }: ProactiveChatTriggerProps) {
  const [showProactiveMessage, setShowProactiveMessage] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Trigger proactif après 15 secondes
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setShowProactiveMessage(true);
      }
    }, 15000);

    // Trigger basé sur le scroll
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Si l'utilisateur a scrollé à 30% et n'a pas encore vu le message
      if (scrollPercentage > 30 && !showProactiveMessage && !isDismissed) {
        setShowProactiveMessage(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDismissed, showProactiveMessage]);

  const handleOpenChat = () => {
    setShowProactiveMessage(false);
    setIsDismissed(true);
    onOpenChat();
  };

  const handleDismiss = () => {
    setShowProactiveMessage(false);
    setIsDismissed(true);
  };

  // Messages proactifs variés basés sur le contexte
  const proactiveMessages = [
    {
      text: "👋 Besoin d'aide pour calculer vos économies ?",
      subtext: "Notre conseiller est en ligne"
    },
    {
      text: "💡 Une question sur HYDRAO ?",
      subtext: "Cliquez ici pour discuter"
    },
    {
      text: "🎯 Envie de savoir si c'est compatible avec votre cuisine ?",
      subtext: "Demandez à notre expert"
    }
  ];

  const [currentMessage] = useState(proactiveMessages[Math.floor(Math.random() * proactiveMessages.length)]);

  return (
    <AnimatePresence>
      {showProactiveMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-24 right-6 z-40 max-w-sm"
        >
          <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-[#6B1E3E]/20 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Animated Background */}
            <motion.div
              animate={{
                background: [
                  'linear-gradient(135deg, #6B1E3E10 0%, #E8D5DC10 100%)',
                  'linear-gradient(135deg, #E8D5DC10 0%, #6B1E3E10 100%)',
                  'linear-gradient(135deg, #6B1E3E10 0%, #E8D5DC10 100%)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 opacity-50"
            />

            {/* Content */}
            <div className="relative p-6">
              {/* Avatar avec badge */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  {/* Badge "en ligne" */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">Équipe HYDRAO</span>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    </motion.div>
                  </div>
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    En ligne maintenant
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="mb-4">
                <p className="text-gray-900 mb-1 font-medium">
                  {currentMessage.text}
                </p>
                <p className="text-sm text-gray-600">
                  {currentMessage.subtext}
                </p>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleOpenChat}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Démarrer la conversation
              </motion.button>

              {/* Trust indicator */}
              <p className="text-xs text-gray-500 text-center mt-3">
                ⚡ Réponse en moins de 2 minutes
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#6B1E3E]/5 rounded-full blur-3xl -z-10" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
