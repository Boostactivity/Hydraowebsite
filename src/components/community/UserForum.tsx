import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Users, TrendingUp, Award, ThumbsUp, MessageCircle, Eye, Clock, Star, CheckCircle, Pin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface ForumTopic {
  id: string;
  category: 'installation' | 'recipes' | 'maintenance' | 'tips' | 'questions';
  title: string;
  author: string;
  avatar: string;
  replies: number;
  views: number;
  likes: number;
  isPinned: boolean;
  isSolved: boolean;
  lastActivity: string;
  excerpt: string;
}

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  topics: number;
  color: string;
}

export function UserForum() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: ForumCategory[] = [
    {
      id: 'installation',
      name: language === 'fr' ? 'Installation & Config' : 'Installation & Setup',
      description: language === 'fr' ? 'Questions installation et configuration' : 'Installation and setup questions',
      icon: <Award className="w-5 h-5" />,
      topics: 342,
      color: 'blue',
    },
    {
      id: 'recipes',
      name: language === 'fr' ? 'Recettes & Astuces' : 'Recipes & Tips',
      description: language === 'fr' ? 'Partagez vos recettes et astuces' : 'Share your recipes and tips',
      icon: <Star className="w-5 h-5" />,
      topics: 589,
      color: 'orange',
    },
    {
      id: 'maintenance',
      name: language === 'fr' ? 'Maintenance' : 'Maintenance',
      description: language === 'fr' ? 'Entretien et maintenance' : 'Care and maintenance',
      icon: <CheckCircle className="w-5 h-5" />,
      topics: 187,
      color: 'green',
    },
    {
      id: 'tips',
      name: language === 'fr' ? 'Conseils Pro' : 'Pro Tips',
      description: language === 'fr' ? 'Astuces des utilisateurs experts' : 'Expert user tips',
      icon: <TrendingUp className="w-5 h-5" />,
      topics: 423,
      color: 'purple',
    },
    {
      id: 'questions',
      name: language === 'fr' ? 'Questions Générales' : 'General Questions',
      description: language === 'fr' ? 'Toutes vos questions' : 'All your questions',
      icon: <MessageCircle className="w-5 h-5" />,
      topics: 756,
      color: 'pink',
    },
  ];

  const topics: ForumTopic[] = [
    {
      id: '1',
      category: 'installation',
      title: language === 'fr' 
        ? 'Installation HYDRAO : Mon retour d\'expérience complet'
        : 'HYDRAO Installation: My Complete Experience',
      author: 'Marc D.',
      avatar: '👨‍🔧',
      replies: 28,
      views: 1240,
      likes: 45,
      isPinned: true,
      isSolved: true,
      lastActivity: '2h',
      excerpt: language === 'fr'
        ? 'Après 6 mois d\'utilisation, voici mon retour complet sur l\'installation...'
        : 'After 6 months of use, here\'s my complete feedback on the installation...',
    },
    {
      id: '2',
      category: 'recipes',
      title: language === 'fr'
        ? '15 recettes de thé glacé maison avec HYDRAO'
        : '15 Homemade Iced Tea Recipes with HYDRAO',
      author: 'Sophie M.',
      avatar: '👩‍🍳',
      replies: 67,
      views: 3420,
      likes: 142,
      isPinned: true,
      isSolved: false,
      lastActivity: '4h',
      excerpt: language === 'fr'
        ? 'Ma collection de recettes de thé glacé préférées, toutes testées avec HYDRAO...'
        : 'My collection of favorite iced tea recipes, all tested with HYDRAO...',
    },
    {
      id: '3',
      category: 'tips',
      title: language === 'fr'
        ? 'Comment j\'économise 300€/mois avec HYDRAO'
        : 'How I Save $325/month with HYDRAO',
      author: 'Pierre L.',
      avatar: '💰',
      replies: 89,
      views: 5680,
      likes: 238,
      isPinned: true,
      isSolved: false,
      lastActivity: '1j',
      excerpt: language === 'fr'
        ? 'Voici exactement comment j\'ai réduit mes dépenses en bouteilles...'
        : 'Here\'s exactly how I cut my bottle expenses...',
    },
    {
      id: '4',
      category: 'maintenance',
      title: language === 'fr'
        ? 'Changement de filtre : Guide illustré étape par étape'
        : 'Filter Change: Step-by-Step Illustrated Guide',
      author: 'Julie B.',
      avatar: '🔧',
      replies: 34,
      views: 2140,
      likes: 76,
      isPinned: false,
      isSolved: true,
      lastActivity: '5h',
      excerpt: language === 'fr'
        ? 'J\'ai pris des photos à chaque étape pour vous faciliter la vie...'
        : 'I took photos at each step to make your life easier...',
    },
    {
      id: '5',
      category: 'questions',
      title: language === 'fr'
        ? 'Eau gazeuse : Quelle pression idéale ?'
        : 'Sparkling Water: What\'s the Ideal Pressure?',
      author: 'Thomas R.',
      avatar: '💧',
      replies: 12,
      views: 842,
      likes: 23,
      isPinned: false,
      isSolved: false,
      lastActivity: '3h',
      excerpt: language === 'fr'
        ? 'Je cherche le réglage parfait pour avoir une eau bien pétillante...'
        : 'Looking for the perfect setting to get really sparkling water...',
    },
    {
      id: '6',
      category: 'recipes',
      title: language === 'fr'
        ? 'Café glacé façon Starbucks à 0.10€'
        : 'Starbucks-Style Iced Coffee for $0.11',
      author: 'Emma K.',
      avatar: '☕',
      replies: 56,
      views: 4230,
      likes: 189,
      isPinned: false,
      isSolved: false,
      lastActivity: '8h',
      excerpt: language === 'fr'
        ? 'Ma recette secrète pour recréer les cafés glacés Starbucks...'
        : 'My secret recipe to recreate Starbucks iced coffees...',
    },
  ];

  const stats = [
    {
      value: '12 450',
      label: language === 'fr' ? 'Membres actifs' : 'Active members',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '2 297',
      label: language === 'fr' ? 'Discussions' : 'Topics',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      value: '18 340',
      label: language === 'fr' ? 'Réponses' : 'Replies',
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      value: '95%',
      label: language === 'fr' ? 'Taux de réponse' : 'Response rate',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const filteredTopics = selectedCategory === 'all'
    ? topics
    : topics.filter(t => t.category === selectedCategory);

  const formatTime = (time: string) => {
    if (language === 'fr') {
      return time.replace('h', 'h').replace('j', 'j');
    }
    return time.replace('h', 'h ago').replace('j', 'd ago');
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
            {language === 'fr' && 'Forum HYDRAO'}
            {language === 'en' && 'HYDRAO Forum'}
            {language === 'es' && 'Foro HYDRAO'}
            {language === 'it' && 'Forum HYDRAO'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Communauté d\'entraide entre utilisateurs'}
            {language === 'en' && 'Community support between users'}
            {language === 'es' && 'Comunidad de ayuda entre usuarios'}
            {language === 'it' && 'Comunità di supporto tra utenti'}
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
          {language === 'fr' && 'Catégories'}
          {language === 'en' && 'Categories'}
          {language === 'es' && 'Categorías'}
          {language === 'it' && 'Categorie'}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`text-left bg-gray-50 rounded-xl p-4 border-2 transition-all ${
              selectedCategory === 'all'
                ? 'border-[#6B1E3E] bg-gradient-to-br from-purple-50 to-pink-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {categories.reduce((sum, cat) => sum + cat.topics, 0)}
              </span>
            </div>
            <div className="font-bold text-gray-900">
              {language === 'fr' && 'Toutes les discussions'}
              {language === 'en' && 'All topics'}
              {language === 'es' && 'Todos los temas'}
              {language === 'it' && 'Tutti gli argomenti'}
            </div>
          </button>

          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`text-left bg-gray-50 rounded-xl p-4 border-2 transition-all ${
                selectedCategory === category.id
                  ? 'border-[#6B1E3E] bg-gradient-to-br from-purple-50 to-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 bg-${category.color}-100 rounded-full flex items-center justify-center text-${category.color}-600`}>
                  {category.icon}
                </div>
                <span className="text-2xl font-bold text-gray-900">{category.topics}</span>
              </div>
              <div className="font-bold text-gray-900 mb-1">{category.name}</div>
              <div className="text-sm text-gray-600">{category.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Topics List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl text-gray-900">
            {language === 'fr' && 'Discussions récentes'}
            {language === 'en' && 'Recent topics'}
            {language === 'es' && 'Temas recientes'}
            {language === 'it' && 'Argomenti recenti'}
          </h3>
          <button className="px-4 py-2 bg-[#6B1E3E] text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            {language === 'fr' && 'Nouvelle discussion'}
            {language === 'en' && 'New topic'}
            {language === 'es' && 'Nuevo tema'}
            {language === 'it' && 'Nuovo argomento'}
          </button>
        </div>

        <div className="space-y-3">
          {filteredTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-[#6B1E3E] hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="text-4xl flex-shrink-0">{topic.avatar}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    {topic.isPinned && (
                      <Pin className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-1" />
                    )}
                    <h4 className="font-bold text-gray-900 group-hover:text-[#6B1E3E] transition-colors flex-1">
                      {topic.title}
                    </h4>
                    {topic.isSolved && (
                      <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {language === 'fr' ? 'Résolu' : 'Solved'}
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-1">{topic.excerpt}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="font-semibold text-gray-700">{topic.author}</div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {topic.replies}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {topic.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {topic.likes}
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Clock className="w-4 h-4" />
                      {formatTime(topic.lastActivity)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 bg-gradient-to-br from-[#6B1E3E] to-blue-600 rounded-xl p-6 text-white text-center">
        <Users className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-xl mb-2">
          {language === 'fr' && 'Rejoignez la communauté HYDRAO'}
          {language === 'en' && 'Join the HYDRAO community'}
          {language === 'es' && 'Únete a la comunidad HYDRAO'}
          {language === 'it' && 'Unisciti alla comunità HYDRAO'}
        </h3>
        <p className="mb-4 opacity-90">
          {language === 'fr' && '12 450 membres vous attendent pour partager astuces, recettes et conseils'}
          {language === 'en' && '12,450 members waiting to share tips, recipes and advice'}
          {language === 'es' && '12,450 miembros esperando para compartir consejos, recetas y trucos'}
          {language === 'it' && '12,450 membri in attesa di condividere consigli, ricette e suggerimenti'}
        </p>
        <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          {language === 'fr' && 'Créer mon compte'}
          {language === 'en' && 'Create my account'}
          {language === 'es' && 'Crear mi cuenta'}
          {language === 'it' && 'Crea il mio account'}
        </button>
      </div>
    </div>
  );
}
