import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, TrendingUp, Users, CheckCircle, ThumbsUp, AlertCircle, Lightbulb, BarChart3, Star, Send, Award } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface FeedbackCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  submissions: number;
  implemented: number;
  color: string;
}

interface FeedbackItem {
  id: string;
  category: string;
  title: string;
  description: string;
  author: string;
  votes: number;
  status: 'submitted' | 'under-review' | 'planned' | 'in-progress' | 'implemented';
  date: string;
  avatar: string;
}

export function CustomerFeedback() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: FeedbackCategory[] = [
    {
      id: 'feature',
      name: language === 'fr' ? 'Nouvelles fonctionnalités' : 'New features',
      description: language === 'fr' ? 'Suggérez de nouvelles fonctions' : 'Suggest new functions',
      icon: <Lightbulb className="w-5 h-5" />,
      submissions: 1247,
      implemented: 89,
      color: 'yellow',
    },
    {
      id: 'improvement',
      name: language === 'fr' ? 'Améliorations' : 'Improvements',
      description: language === 'fr' ? 'Améliorez l\'existant' : 'Improve existing',
      icon: <TrendingUp className="w-5 h-5" />,
      submissions: 892,
      implemented: 156,
      color: 'blue',
    },
    {
      id: 'bug',
      name: language === 'fr' ? 'Bugs & Problèmes' : 'Bugs & Issues',
      description: language === 'fr' ? 'Signalez des problèmes' : 'Report issues',
      icon: <AlertCircle className="w-5 h-5" />,
      submissions: 234,
      implemented: 198,
      color: 'red',
    },
    {
      id: 'experience',
      name: language === 'fr' ? 'Expérience utilisateur' : 'User experience',
      description: language === 'fr' ? 'Partagez votre expérience' : 'Share your experience',
      icon: <Star className="w-5 h-5" />,
      submissions: 2340,
      implemented: 67,
      color: 'purple',
    },
  ];

  const feedbackItems: FeedbackItem[] = [
    {
      id: '1',
      category: 'feature',
      title: language === 'fr' 
        ? 'App mobile pour contrôle à distance'
        : 'Mobile app for remote control',
      description: language === 'fr'
        ? 'Une application mobile pour contrôler HYDRAO à distance, ajuster la température et recevoir des notifications.'
        : 'A mobile app to control HYDRAO remotely, adjust temperature and receive notifications.',
      author: 'Marie L.',
      votes: 342,
      status: 'planned',
      date: '2024-11-15',
      avatar: '📱',
    },
    {
      id: '2',
      category: 'improvement',
      title: language === 'fr'
        ? 'Filtres longue durée 12 mois'
        : '12-month long-lasting filters',
      description: language === 'fr'
        ? 'Développer des filtres haute capacité qui durent 12 mois au lieu de 6 pour réduire la maintenance.'
        : 'Develop high-capacity filters lasting 12 months instead of 6 to reduce maintenance.',
      author: 'Thomas D.',
      votes: 287,
      status: 'in-progress',
      date: '2024-10-28',
      avatar: '🔧',
    },
    {
      id: '3',
      category: 'feature',
      title: language === 'fr'
        ? 'Mode enfant avec sécurité renforcée'
        : 'Child mode with enhanced safety',
      description: language === 'fr'
        ? 'Un mode spécial avec température limitée et verrouillage pour la sécurité des enfants.'
        : 'A special mode with limited temperature and lock for child safety.',
      author: 'Sophie M.',
      votes: 456,
      status: 'under-review',
      date: '2024-12-01',
      avatar: '👶',
    },
    {
      id: '4',
      category: 'improvement',
      title: language === 'fr'
        ? 'Indicateur visuel niveau filtre'
        : 'Visual filter level indicator',
      description: language === 'fr'
        ? 'Un indicateur LED qui montre le niveau restant du filtre en temps réel.'
        : 'An LED indicator showing real-time remaining filter level.',
      author: 'Pierre L.',
      votes: 198,
      status: 'implemented',
      date: '2024-09-12',
      avatar: '💡',
    },
    {
      id: '5',
      category: 'feature',
      title: language === 'fr'
        ? 'Aromatisation automatique eau'
        : 'Automatic water flavoring',
      description: language === 'fr'
        ? 'Système d\'injection d\'arômes naturels pour personnaliser le goût de l\'eau.'
        : 'Natural flavor injection system to customize water taste.',
      author: 'Emma R.',
      votes: 523,
      status: 'planned',
      date: '2024-11-20',
      avatar: '🍋',
    },
    {
      id: '6',
      category: 'experience',
      title: language === 'fr'
        ? 'Programme fidélité clients'
        : 'Customer loyalty program',
      description: language === 'fr'
        ? 'Un programme de points pour récompenser les clients fidèles avec des réductions et avantages.'
        : 'A points program to reward loyal customers with discounts and benefits.',
      author: 'Lucas B.',
      votes: 612,
      status: 'in-progress',
      date: '2024-11-05',
      avatar: '🎁',
    },
  ];

  const stats = [
    {
      value: '4 713',
      label: language === 'fr' ? 'Feedbacks reçus' : 'Feedbacks received',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      value: '510',
      label: language === 'fr' ? 'Implémentés' : 'Implemented',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      value: '8 940',
      label: language === 'fr' ? 'Participants' : 'Participants',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '89%',
      label: language === 'fr' ? 'Taux réponse 48h' : '48h response rate',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const filteredFeedback = selectedCategory === 'all'
    ? feedbackItems
    : feedbackItems.filter(f => f.category === selectedCategory);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'submitted': return language === 'fr' ? 'Soumis' : 'Submitted';
      case 'under-review': return language === 'fr' ? 'En analyse' : 'Under review';
      case 'planned': return language === 'fr' ? 'Planifié' : 'Planned';
      case 'in-progress': return language === 'fr' ? 'En cours' : 'In progress';
      case 'implemented': return language === 'fr' ? 'Implémenté' : 'Implemented';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'gray';
      case 'under-review': return 'blue';
      case 'planned': return 'purple';
      case 'in-progress': return 'orange';
      case 'implemented': return 'green';
      default: return 'gray';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Feedback Client'}
            {language === 'en' && 'Customer Feedback'}
            {language === 'es' && 'Feedback Cliente'}
            {language === 'it' && 'Feedback Clienti'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Votre voix façonne HYDRAO'}
            {language === 'en' && 'Your voice shapes HYDRAO'}
            {language === 'es' && 'Tu voz da forma a HYDRAO'}
            {language === 'it' && 'La tua voce plasma HYDRAO'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200"
          >
            <div className="flex items-center gap-2 mb-2 text-blue-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Catégories de feedback'}
          {language === 'en' && 'Feedback categories'}
          {language === 'es' && 'Categorías de feedback'}
          {language === 'it' && 'Categorie di feedback'}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`text-left bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 rounded-xl p-4 border-2 transition-all ${
                selectedCategory === category.id
                  ? 'border-[#6B1E3E] shadow-lg'
                  : 'border-' + category.color + '-200 hover:border-' + category.color + '-300'
              }`}
            >
              <div className={`w-12 h-12 bg-${category.color}-200 rounded-full flex items-center justify-center text-${category.color}-700 mb-3`}>
                {category.icon}
              </div>
              <div className="font-bold text-gray-900 mb-1">{category.name}</div>
              <div className="text-sm text-gray-600 mb-3">{category.description}</div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-700">
                  <span className="font-semibold">{category.submissions}</span> {language === 'fr' ? 'soumis' : 'submitted'}
                </div>
                <div className="text-green-600 font-semibold">
                  {category.implemented} ✓
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <button
          onClick={() => setSelectedCategory('all')}
          className={`mt-4 px-4 py-2 rounded-lg font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#6B1E3E] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {language === 'fr' ? 'Voir tout' : 'See all'}
        </button>
      </div>

      {/* Feedback Items */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Suggestions populaires'}
          {language === 'en' && 'Popular suggestions'}
          {language === 'es' && 'Sugerencias populares'}
          {language === 'it' && 'Suggerimenti popolari'}
        </h3>

        <div className="space-y-4">
          {filteredFeedback.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Avatar & Votes */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-4xl">{item.avatar}</div>
                  <button className="flex flex-col items-center gap-1 px-3 py-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors">
                    <ThumbsUp className="w-5 h-5 text-gray-600" />
                    <span className="font-bold text-sm text-gray-900">{item.votes}</span>
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-bold text-lg text-gray-900 flex-1">{item.title}</h4>
                    <div className={`bg-${getStatusColor(item.status)}-100 text-${getStatusColor(item.status)}-700 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap flex items-center gap-1`}>
                      {item.status === 'implemented' && <CheckCircle className="w-3 h-3" />}
                      {getStatusLabel(item.status)}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{item.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="font-semibold text-gray-700">{item.author}</div>
                    <div>•</div>
                    <div>{formatDate(item.date)}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Submit Feedback CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-blue-600 rounded-xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Award className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h3 className="font-bold text-2xl mb-3">
            {language === 'fr' && 'Partagez vos idées'}
            {language === 'en' && 'Share your ideas'}
            {language === 'es' && 'Comparte tus ideas'}
            {language === 'it' && 'Condividi le tue idee'}
          </h3>
          <p className="text-lg opacity-90 mb-6">
            {language === 'fr' && '510 suggestions déjà implémentées • 89% de taux de réponse sous 48h • Votre voix compte vraiment'}
            {language === 'en' && '510 suggestions already implemented • 89% response rate within 48h • Your voice truly matters'}
            {language === 'es' && '510 sugerencias ya implementadas • 89% de respuesta en 48h • Tu voz realmente importa'}
            {language === 'it' && '510 suggerimenti già implementati • 89% di risposta entro 48h • La tua voce conta davvero'}
          </p>

          {/* Simple Feedback Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <select className="px-4 py-3 rounded-lg bg-white text-gray-900 font-semibold">
                <option>{language === 'fr' ? 'Catégorie' : 'Category'}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder={language === 'fr' ? 'Votre nom' : 'Your name'}
                className="px-4 py-3 rounded-lg bg-white text-gray-900"
              />
            </div>
            <input
              type="text"
              placeholder={language === 'fr' ? 'Titre de votre suggestion' : 'Suggestion title'}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 mb-4"
            />
            <textarea
              placeholder={language === 'fr' ? 'Décrivez votre idée en détail...' : 'Describe your idea in detail...'}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 mb-4"
            />
            <button className="w-full px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              {language === 'fr' && 'Envoyer ma suggestion'}
              {language === 'en' && 'Submit my suggestion'}
              {language === 'es' && 'Enviar mi sugerencia'}
              {language === 'it' && 'Invia il mio suggerimento'}
            </button>
          </div>

          <div className="text-sm opacity-75">
            {language === 'fr' && 'Réponse garantie sous 48h • Transparence totale sur le statut'}
            {language === 'en' && 'Response guaranteed within 48h • Full transparency on status'}
            {language === 'es' && 'Respuesta garantizada en 48h • Transparencia total sobre el estado'}
            {language === 'it' && 'Risposta garantita entro 48h • Trasparenza totale sullo stato'}
          </div>
        </div>
      </div>
    </div>
  );
}
