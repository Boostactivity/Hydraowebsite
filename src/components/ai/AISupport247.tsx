import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  MessageCircle, 
  Phone, 
  Mail, 
  Video, 
  Bot, 
  User, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Zap
} from 'lucide-react';

interface SupportOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  availability: string;
  responseTime: string;
  color: string;
  action: () => void;
}

export function AISupport247() {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<'low' | 'medium' | 'high'>('medium');

  const supportOptions: SupportOption[] = [
    {
      id: 'ai-chat',
      icon: <Bot className="w-8 h-8" />,
      title: 'Chat IA Instantané',
      description: 'Réponse en moins de 10 secondes par notre assistant intelligent',
      availability: '24/7',
      responseTime: '< 10 sec',
      color: 'from-purple-500 to-pink-600',
      action: () => console.log('Open AI Chat')
    },
    {
      id: 'human-chat',
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Chat avec Expert',
      description: 'Discussion en direct avec un conseiller humain certifié',
      availability: 'Lun-Sam 9h-19h',
      responseTime: '< 2 min',
      color: 'from-blue-500 to-cyan-600',
      action: () => console.log('Open Human Chat')
    },
    {
      id: 'phone',
      icon: <Phone className="w-8 h-8" />,
      title: 'Rappel Téléphonique',
      description: 'Un expert vous rappelle au moment de votre choix',
      availability: 'Lun-Sam 9h-19h',
      responseTime: '< 5 min',
      color: 'from-green-500 to-emerald-600',
      action: () => console.log('Request Callback')
    },
    {
      id: 'video',
      icon: <Video className="w-8 h-8" />,
      title: 'Visio-assistance',
      description: 'Support vidéo pour installation ou dépannage en direct',
      availability: 'Sur RDV',
      responseTime: 'Sous 1h',
      color: 'from-orange-500 to-red-600',
      action: () => console.log('Schedule Video Call')
    }
  ];

  const commonIssues = [
    {
      id: 'installation',
      title: 'Installation',
      icon: '🔧',
      aiCanHelp: true,
      avgResolutionTime: '5 min'
    },
    {
      id: 'leak',
      title: 'Fuite d\'eau',
      icon: '💧',
      aiCanHelp: true,
      avgResolutionTime: '3 min',
      urgent: true
    },
    {
      id: 'taste',
      title: 'Goût de l\'eau',
      icon: '🚰',
      aiCanHelp: true,
      avgResolutionTime: '2 min'
    },
    {
      id: 'co2',
      title: 'Cartouche CO₂',
      icon: '🥤',
      aiCanHelp: true,
      avgResolutionTime: '2 min'
    },
    {
      id: 'pressure',
      title: 'Pression faible',
      icon: '⚡',
      aiCanHelp: true,
      avgResolutionTime: '4 min'
    },
    {
      id: 'warranty',
      title: 'Garantie/SAV',
      icon: '🛡️',
      aiCanHelp: false,
      avgResolutionTime: '10 min'
    },
    {
      id: 'order',
      title: 'Ma commande',
      icon: '📦',
      aiCanHelp: true,
      avgResolutionTime: '1 min'
    },
    {
      id: 'other',
      title: 'Autre',
      icon: '❓',
      aiCanHelp: false,
      avgResolutionTime: '15 min'
    }
  ];

  const getRecommendedSupport = (): SupportOption => {
    if (selectedIssue === 'leak') {
      return supportOptions[2]; // Phone callback for urgency
    }
    if (selectedIssue === 'warranty' || selectedIssue === 'other') {
      return supportOptions[1]; // Human chat for complex issues
    }
    return supportOptions[0]; // AI chat by default
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 font-semibold mb-4">
            <Clock className="w-4 h-4" />
            <span>Support disponible 24/7</span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Support IA Intelligent
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Assistance instantanée par IA ou conseiller humain selon vos besoins
          </p>
        </motion.div>

        {/* Issue Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Quel est votre problème ?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {commonIssues.map((issue) => (
              <button
                key={issue.id}
                onClick={() => setSelectedIssue(issue.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedIssue === issue.id
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="text-3xl mb-2">{issue.icon}</div>
                <div className="font-semibold text-sm text-gray-900 mb-1">
                  {issue.title}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>{issue.avgResolutionTime}</span>
                </div>
                {issue.urgent && (
                  <div className="mt-2 px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full inline-flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Urgent</span>
                  </div>
                )}
                {issue.aiCanHelp && (
                  <div className="mt-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full inline-block">
                    ✨ IA disponible
                  </div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Recommended Support */}
        <AnimatePresence>
          {selectedIssue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-8 text-white mb-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">
                    Recommandation IA pour votre problème
                  </h3>
                  <p className="text-white/90">
                    Selon notre analyse, voici la meilleure solution pour vous :
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      {getRecommendedSupport().icon}
                    </div>
                    <div>
                      <div className="font-bold text-xl">
                        {getRecommendedSupport().title}
                      </div>
                      <div className="text-sm text-white/80">
                        {getRecommendedSupport().description}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/80">Temps de réponse</div>
                    <div className="font-bold text-lg">
                      {getRecommendedSupport().responseTime}
                    </div>
                  </div>
                </div>

                <button
                  onClick={getRecommendedSupport().action}
                  className="w-full px-6 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Démarrer maintenant</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Toutes les options de support
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all group cursor-pointer"
                onClick={option.action}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center text-white`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{option.availability}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 font-semibold">
                      {option.responseTime}
                    </span>
                  </div>
                </div>

                <button className={`w-full px-6 py-3 bg-gradient-to-r ${option.color} text-white rounded-xl font-semibold hover:shadow-md transition-shadow flex items-center justify-center gap-2`}>
                  <span>Contacter</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div className="text-3xl font-bold text-green-900">94%</div>
            </div>
            <div className="text-sm text-green-800">
              Problèmes résolus dès le 1er contact
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-blue-600" />
              <div className="text-3xl font-bold text-blue-900">{'< 2 min'}</div>
            </div>
            <div className="text-sm text-blue-800">
              Temps de réponse moyen avec l'IA
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-purple-600" />
              <div className="text-3xl font-bold text-purple-900">24/7</div>
            </div>
            <div className="text-sm text-purple-800">
              Disponibilité IA sans interruption
            </div>
          </div>
        </motion.div>

        {/* Self-service resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-gray-50 rounded-3xl p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Ressources en libre-service
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="#" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                📚
              </div>
              <div>
                <div className="font-semibold text-gray-900">Base de connaissances</div>
                <div className="text-sm text-gray-600">150+ articles</div>
              </div>
            </a>

            <a href="#" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                🎥
              </div>
              <div>
                <div className="font-semibold text-gray-900">Tutoriels vidéo</div>
                <div className="text-sm text-gray-600">25 guides complets</div>
              </div>
            </a>

            <a href="#" className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                💬
              </div>
              <div>
                <div className="font-semibold text-gray-900">Forum communauté</div>
                <div className="text-sm text-gray-600">5000+ membres</div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Compact support widget for sidebars
export function AISupportWidget() {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <div className="font-bold">Besoin d'aide ?</div>
          <div className="text-sm text-white/80">Support IA 24/7</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Réponse en {'< 10 sec'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span>Disponible 24/7</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4" />
          <span>Experts humains si besoin</span>
        </div>
      </div>

      <button className="w-full px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
        Démarrer le chat
      </button>
    </div>
  );
}
