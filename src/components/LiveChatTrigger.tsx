import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';

export function LiveChatTrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Afficher le bubble après 10 secondes
    const timer = setTimeout(() => setShowBubble(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const quickQuestions = [
    'Pourquoi choisir HYDRAO ?',
    'L\'installation est-elle compliquée ?',
    'Puis-je payer en plusieurs fois ?',
    'Comment fonctionne la garantie ?'
  ];

  return (
    <>
      {/* Chat bubble */}
      <AnimatePresence>
        {!isOpen && showBubble && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 gradient-bordeaux rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="gradient-bordeaux text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                </div>
                <div>
                  <div className="font-medium">Équipe HYDRAO</div>
                  <div className="text-xs text-white/80">En ligne • Répond en ~2 min</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="p-6 bg-gray-50 h-80 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm inline-block max-w-[85%]">
                  <p className="text-gray-800 text-sm">
                    Bonjour ! 👋 Je suis là pour répondre à toutes vos questions sur HYDRAO.
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-1 ml-1">Il y a quelques instants</div>
              </motion.div>

              {/* Quick questions */}
              <div className="mt-6">
                <p className="text-xs text-gray-500 mb-3">Questions fréquentes :</p>
                <div className="space-y-2">
                  {quickQuestions.map((q, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => setMessage(q)}
                      className="block w-full text-left px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:border-[#6B1E3E]/30 hover:shadow-sm transition-all text-sm text-gray-700"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:border-[#6B1E3E] focus:outline-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      // Simuler l'envoi
                      setMessage('');
                    }
                  }}
                />
                <button
                  disabled={!message.trim()}
                  className="w-10 h-10 gradient-bordeaux rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Nous répondons généralement en moins de 2 minutes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
