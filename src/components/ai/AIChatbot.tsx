import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader, Bot, User, Sparkles, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';
import { Page } from '../../App';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  isTyping?: boolean;
}

interface AIChatbotProps {
  navigate: (page: Page) => void;
}

export function AIChatbot({ navigate }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Bonjour ! 👋 Je suis Hydra, votre assistant intelligent HYDRAO. Comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(),
      suggestions: [
        'Quels sont les avantages du robinet ?',
        'Prix et abonnements ?',
        'Installation difficile ?',
        'Parler à un humain'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Simulate AI response (in production: call real AI API - OpenAI, Claude, etc.)
  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simple keyword matching (replace with real AI API)
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes('prix') || lowercaseMessage.includes('coût') || lowercaseMessage.includes('tarif')) {
      return 'Le robinet HYDRAO Premium est à **490€ TTC**.\n\nVous avez ensuite le choix entre 3 formules d\'abonnement :\n\n• **Essential** : 59€/an - Filtres + Maintenance\n• **Premium** : 99€/an - Filtres + CO₂ + Maintenance\n• **Ultimate** : 139€/an - Tout inclus + Garantie 5 ans\n\n💡 En moyenne, nos clients économisent **2340€/an** sur l\'eau en bouteille !';
    }

    if (lowercaseMessage.includes('installation') || lowercaseMessage.includes('installer') || lowercaseMessage.includes('difficile')) {
      return 'L\'installation est **très simple** ! 🔧\n\n✅ 80% de nos clients l\'installent eux-mêmes en 20 minutes\n✅ Tutoriel vidéo complet inclus\n✅ Outils standards (clé à molette, tournevis)\n\nSi vous préférez, nous avons un **réseau d\'installateurs certifiés** dans toute la France (280€).\n\nVoulez-vous voir la vidéo d\'installation ?';
    }

    if (lowercaseMessage.includes('avantage') || lowercaseMessage.includes('pourquoi') || lowercaseMessage.includes('bénéfice')) {
      return 'Le robinet HYDRAO vous offre **5 fonctions en 1** : 🚰\n\n1. **Eau plate filtrée** - Pure et délicieuse\n2. **Eau pétillante** - À la demande, comme un soda stream\n3. **Eau bouillante** - 100°C instantané pour thé/café\n4. **Eau glacée** - 4°C rafraîchissante\n5. **Eau du robinet** - Classique\n\n💰 **Économies** : 2340€/an vs eau en bouteille\n🌍 **Écologie** : -156kg plastique/an\n⏱️ **Temps** : -3h/mois de courses\n\nQue souhaitez-vous approfondir ?';
    }

    if (lowercaseMessage.includes('humain') || lowercaseMessage.includes('conseiller') || lowercaseMessage.includes('personne')) {
      return 'Bien sûr ! Je vous mets en relation avec un **conseiller expert** 👨‍💼\n\nNos horaires :\n• Lun-Ven : 9h-19h\n• Sam : 10h-18h\n\nSouhaitez-vous :\n📞 Être rappelé sous 2 minutes ?\n💬 Chat avec un humain maintenant ?\n📧 Envoyer un email ?';
    }

    if (lowercaseMessage.includes('garantie') || lowercaseMessage.includes('sav') || lowercaseMessage.includes('panne')) {
      return 'Notre **garantie** est imbattable ! 🛡️\n\n✅ **3 ans inclus** sur tout le robinet\n✅ **5 ans** avec abonnement Ultimate\n✅ **SAV réactif** : réponse sous 2h\n✅ **Pièces détachées** : 10 ans minimum\n\nTaux de panne : **< 0.5%** (meilleur du marché)\n\nBesoin d\'info sur le SAV ?';
    }

    // Default response
    return 'Je comprends votre question ! 🤔\n\nPour vous donner la meilleure réponse, je peux vous orienter vers :\n\n• Notre **page FAQ** complète\n• Un **conseiller expert** (rappel sous 2 min)\n• La **documentation technique**\n\nQue préférez-vous ?';
  };

  const handleSendMessage = async (message?: string) => {
    const messageText = message || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get AI response
    const aiResponseText = await getAIResponse(messageText);

    // Add bot response
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: aiResponseText,
      timestamp: new Date(),
      suggestions: getSuggestions(messageText)
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const getSuggestions = (userMessage: string): string[] | undefined => {
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes('installation')) {
      return ['Voir la vidéo d\'installation', 'Trouver un installateur', 'Liste des outils nécessaires'];
    }

    if (lowercaseMessage.includes('prix')) {
      return ['Comparer les abonnements', 'Calculer mes économies', 'Voir le configurateur'];
    }

    if (lowercaseMessage.includes('avantage')) {
      return ['Voir les témoignages clients', 'Calculateur d\'économies', 'Comparaison vs eau bouteille'];
    }

    return ['Autre question', 'Parler à un humain', 'Voir le site'];
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    console.log(`Feedback for message ${messageId}: ${isPositive ? 'positive' : 'negative'}`);
    // In production: send feedback to analytics
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        type: 'bot',
        content: 'Conversation réinitialisée ! Comment puis-je vous aider ?',
        timestamp: new Date(),
        suggestions: [
          'Quels sont les avantages du robinet ?',
          'Prix et abonnements ?',
          'Installation difficile ?',
          'Parler à un humain'
        ]
      }
    ]);
  };

  return (
    <>
      {/* Chat Button (Floating) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-7 h-7" />
            
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
              IA
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '600px', maxHeight: 'calc(100vh - 100px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Hydra Assistant IA</h3>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>En ligne • Répond en quelques secondes</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Nouvelle conversation"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* AI Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs">
                <Sparkles className="w-3 h-3" />
                <span>Propulsé par IA • Instantané 24/7</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-[#6B1E3E]' 
                      : 'bg-gradient-to-br from-purple-500 to-pink-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message bubble */}
                  <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-[#6B1E3E] text-white rounded-tr-none'
                          : 'bg-white border border-gray-200 text-gray-900 rounded-tl-none'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content.split('**').map((part, index) => 
                          index % 2 === 0 ? part : <strong key={index}>{part}</strong>
                        )}
                      </div>
                    </motion.div>

                    {/* Suggestions */}
                    {message.suggestions && message.type === 'bot' && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1.5 text-xs bg-white border border-purple-200 text-purple-700 rounded-full hover:bg-purple-50 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Feedback buttons (bot messages only) */}
                    {message.type === 'bot' && !message.suggestions && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Cette réponse est-elle utile ?</span>
                        <button
                          onClick={() => handleFeedback(message.id, true)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id, false)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
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
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full hover:from-purple-600 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isTyping ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-2">
                Propulsé par IA • Les réponses peuvent contenir des inexactitudes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}