import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Send, Bot, User, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  quickReplies?: string[];
}

interface LiveChatProps {
  onClose: () => void;
}

export function LiveChat({ onClose }: LiveChatProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! 👋 Je suis l'assistant HYDRAO. Comment puis-je vous aider aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: [
        'Calculer mes économies',
        'Compatibilité de mon évier',
        'Voir les finitions',
        'Parler à un conseiller'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses: Record<string, { text: string; quickReplies?: string[] }> = {
    'calculer mes économies': {
      text: "Excellent choix ! 💰 Pour calculer vos économies précises, j'ai besoin de savoir : Combien de personnes dans votre foyer ?",
      quickReplies: ['1-2 personnes', '3-4 personnes', '5+ personnes']
    },
    'compatibilité de mon évier': {
      text: "99% des éviers sont compatibles ! ✅ HYDRAO nécessite :\n\n• Un trou de 32-35mm (standard)\n• 40x50cm d'espace sous l'évier\n• Arrivée d'eau froide + prise électrique\n\nVous avez un doute sur votre installation ?",
      quickReplies: ['Oui, besoin de conseils', 'Non, tout est OK', 'Planifier une visite gratuite']
    },
    'voir les finitions': {
      text: "Excellent ! 🎨 HYDRAO propose 6 finitions premium :\n\n✨ Chrome poli (classique)\n🖤 Noir mat (tendance)\n🤍 Blanc mat (minimaliste)\n🥉 Bronze brossé (caractère)\n🥈 Inox brossé (moderne)\n🏆 Or champagne (luxe)\n\nQuelle finition vous attire le plus ?",
      quickReplies: ['Chrome poli', 'Noir mat', 'Or champagne', 'Toutes les finitions']
    },
    'parler à un conseiller': {
      text: "Bien sûr ! 📞 Nos conseillers sont disponibles :\n\n• Par téléphone : 01 23 45 67 89\n• Par WhatsApp (réponse immédiate)\n• Par email : contact@hydrao.fr\n\nQue préférez-vous ?",
      quickReplies: ['Appeler maintenant', 'Ouvrir WhatsApp', 'Envoyer un email']
    },
    '1-2 personnes': {
      text: "Parfait ! Pour un foyer de 1-2 personnes, vous économisez au minimum :\n\n💰 500€/an minimum\n📅 42€/mois minimum\n⏱️ ROI en 12 mois\n\nFormule recommandée : Essentielle (549€ TTC tout compris). Je configure ?",
      quickReplies: ['Oui, configurer', 'Voir toutes les formules', 'Plus d\'infos']
    },
    '3-4 personnes': {
      text: "Super ! Pour une famille de 3-4 personnes, vous économisez au minimum :\n\n💰 1 000€/an minimum\n📅 83€/mois minimum\n⏱️ ROI en 6 mois\n\nFormule recommandée : Premium (629€ TTC). C'est notre best-seller ! 🏆",
      quickReplies: ['Commander maintenant', 'Personnaliser', 'Autres questions']
    },
    '5+ personnes': {
      text: "Excellente nouvelle ! Pour 5+ personnes, vos économies minimales :\n\n💰 1 200€/an minimum\n📅 100€/mois minimum\n⏱️ ROI en 5 mois seulement !\n\nFormule Premium fortement recommandée. Rentabilité record ! 🚀",
      quickReplies: ['Je commande', 'Simulation détaillée', 'Questions']
    },
    'default': {
      text: "Je comprends votre question ! Pour une réponse personnalisée, nos experts sont à votre disposition :\n\n📞 01 23 45 67 89 (Lun-Ven 9h-18h)\n💬 WhatsApp (réponse immédiate)\n\nOu je peux vous aider sur :",
      quickReplies: [
        'Prix & économies',
        'Installation',
        'Comparaison produits',
        'Garanties'
      ]
    }
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const normalizedInput = messageText.toLowerCase();
      let response = botResponses['default'];

      // Find matching response
      for (const [key, value] of Object.entries(botResponses)) {
        if (normalizedInput.includes(key.toLowerCase())) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: response.quickReplies
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? 'auto' : '600px'
      }}
      exit={{ opacity: 0, y: 100, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-gray-200 flex flex-col overflow-hidden"
      style={{ maxHeight: '90vh' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-medium">Assistant HYDRAO</h3>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>En ligne • Répond en ~1 min</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Minimize2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, idx) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-[#6B1E3E] text-white' 
                      : 'bg-white border-2 border-gray-200'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4 text-[#6B1E3E]" />
                    )}
                  </div>
                  <div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    </div>
                    {message.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.quickReplies.map((reply, i) => (
                          <motion.button
                            key={i}
                            onClick={() => handleQuickReply(reply)}
                            className="px-3 py-1.5 bg-white border border-[#6B1E3E]/30 text-[#6B1E3E] rounded-full text-xs font-medium hover:bg-[#6B1E3E] hover:text-white transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {reply}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#6B1E3E]" />
                </div>
                <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#6B1E3E] transition-colors"
              />
              <motion.button
                type="submit"
                disabled={!inputValue.trim()}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  inputValue.trim()
                    ? 'bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white shadow-lg'
                    : 'bg-gray-200 text-gray-400'
                }`}
                whileHover={inputValue.trim() ? { scale: 1.1 } : {}}
                whileTap={inputValue.trim() ? { scale: 0.95 } : {}}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </>
      )}
    </motion.div>
  );
}