import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Video, Heart, MessageCircle, Share2, TrendingUp, Award, Filter, Instagram, Users, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface UGCPost {
  id: string;
  type: 'photo' | 'video' | 'story';
  author: string;
  username: string;
  avatar: string;
  content: string;
  media: string;
  likes: number;
  comments: number;
  shares: number;
  category: 'recipes' | 'kitchen' | 'lifestyle' | 'savings';
  featured: boolean;
}

export function UGCHub() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const posts: UGCPost[] = [
    {
      id: '1',
      type: 'photo',
      author: 'Marie Laurent',
      username: '@marie_cooking',
      avatar: '👩‍🍳',
      content: language === 'fr'
        ? 'Ma nouvelle routine matinale : café glacé maison en 30 secondes avec HYDRAO ☕❄️ Plus besoin d\'acheter chez Starbucks !'
        : 'My new morning routine: homemade iced coffee in 30 seconds with HYDRAO ☕❄️ No more Starbucks runs!',
      media: '☕',
      likes: 1247,
      comments: 89,
      shares: 156,
      category: 'recipes',
      featured: true,
    },
    {
      id: '2',
      type: 'photo',
      author: 'Thomas Dubois',
      username: '@thomas_home',
      avatar: '🏠',
      content: language === 'fr'
        ? 'Installation terminée ! Le design minimaliste de HYDRAO s\'intègre parfaitement dans ma cuisine moderne 🔥'
        : 'Installation complete! HYDRAO\'s minimalist design integrates perfectly into my modern kitchen 🔥',
      media: '🔧',
      likes: 892,
      comments: 67,
      shares: 124,
      category: 'kitchen',
      featured: true,
    },
    {
      id: '3',
      type: 'video',
      author: 'Sophie Martin',
      username: '@sophie_eco',
      avatar: '🌱',
      content: language === 'fr'
        ? '6 mois avec HYDRAO = 312€ économisés + 450 bouteilles plastique évitées 🌍 Mon bilan complet dans cette vidéo !'
        : '6 months with HYDRAO = $340 saved + 450 plastic bottles avoided 🌍 My complete review in this video!',
      media: '📹',
      likes: 2341,
      comments: 234,
      shares: 567,
      category: 'savings',
      featured: true,
    },
    {
      id: '4',
      type: 'photo',
      author: 'Pierre Lefebvre',
      username: '@pierre_drinks',
      avatar: '🍹',
      content: language === 'fr'
        ? 'Mojito maison parfait grâce à l\'eau gazeuse ultra fraîche de HYDRAO 🍹🌿 Recette en story !'
        : 'Perfect homemade mojito thanks to HYDRAO\'s ultra-fresh sparkling water 🍹🌿 Recipe in story!',
      media: '🍹',
      likes: 1567,
      comments: 145,
      shares: 289,
      category: 'recipes',
      featured: false,
    },
    {
      id: '5',
      type: 'story',
      author: 'Emma Rousseau',
      username: '@emma_lifestyle',
      avatar: '💎',
      content: language === 'fr'
        ? 'Mon invité : "C\'est quoi ce robinet futuriste ?!" 😂 HYDRAO impressionne à chaque fois ✨'
        : 'My guest: "What\'s this futuristic tap?!" 😂 HYDRAO impresses every time ✨',
      media: '✨',
      likes: 734,
      comments: 52,
      shares: 98,
      category: 'lifestyle',
      featured: false,
    },
    {
      id: '6',
      type: 'photo',
      author: 'Lucas Bernard',
      username: '@lucas_savings',
      avatar: '💰',
      content: language === 'fr'
        ? 'Calcul fait : HYDRAO amorti en 5 mois ! Désormais tout est économie pure 📊💚'
        : 'Calculated: HYDRAO paid off in 5 months! Now it\'s pure savings 📊💚',
      media: '📊',
      likes: 1089,
      comments: 178,
      shares: 234,
      category: 'savings',
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', label: language === 'fr' ? 'Tous' : 'All', count: posts.length, icon: <Camera className="w-4 h-4" /> },
    { id: 'recipes', label: language === 'fr' ? 'Recettes' : 'Recipes', count: posts.filter(p => p.category === 'recipes').length, icon: <Star className="w-4 h-4" /> },
    { id: 'kitchen', label: language === 'fr' ? 'Cuisine' : 'Kitchen', count: posts.filter(p => p.category === 'kitchen').length, icon: <Award className="w-4 h-4" /> },
    { id: 'lifestyle', label: language === 'fr' ? 'Lifestyle' : 'Lifestyle', count: posts.filter(p => p.category === 'lifestyle').length, icon: <Heart className="w-4 h-4" /> },
    { id: 'savings', label: language === 'fr' ? 'Économies' : 'Savings', count: posts.filter(p => p.category === 'savings').length, icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const stats = [
    {
      value: '24 500+',
      label: language === 'fr' ? 'Publications' : 'Posts',
      icon: <Camera className="w-5 h-5" />,
    },
    {
      value: '340K',
      label: language === 'fr' ? 'Interactions' : 'Interactions',
      icon: <Heart className="w-5 h-5" />,
    },
    {
      value: '18 200',
      label: language === 'fr' ? 'Créateurs' : 'Creators',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '+580%',
      label: language === 'fr' ? 'Croissance' : 'Growth',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
          <Camera className="w-5 h-5 text-pink-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Contenu Communauté'}
            {language === 'en' && 'Community Content'}
            {language === 'es' && 'Contenido Comunidad'}
            {language === 'it' && 'Contenuto Comunità'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Découvrez ce que partagent les utilisateurs HYDRAO'}
            {language === 'en' && 'Discover what HYDRAO users are sharing'}
            {language === 'es' && 'Descubre lo que comparten los usuarios HYDRAO'}
            {language === 'it' && 'Scopri cosa condividono gli utenti HYDRAO'}
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
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200"
          >
            <div className="flex items-center gap-2 mb-2 text-pink-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-[#6B1E3E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.icon}
            {category.label}
            <span className="text-sm opacity-75">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Featured Posts */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          {language === 'fr' && 'À la Une'}
          {language === 'en' && 'Featured'}
          {language === 'es' && 'Destacado'}
          {language === 'it' && 'In Evidenza'}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {filteredPosts.filter(p => p.featured).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white group hover:shadow-2xl transition-all cursor-pointer"
            >
              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{post.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold truncate">{post.author}</div>
                  <div className="text-sm opacity-75 truncate">{post.username}</div>
                </div>
                {post.type === 'video' && <Video className="w-5 h-5 opacity-75" />}
              </div>

              {/* Media */}
              <div className="text-6xl text-center my-6">{post.media}</div>

              {/* Content */}
              <p className="text-sm opacity-90 mb-4 line-clamp-3">{post.content}</p>

              {/* Engagement */}
              <div className="flex items-center gap-4 text-sm border-t border-white/20 pt-3">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {formatNumber(post.likes)}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {formatNumber(post.comments)}
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  {formatNumber(post.shares)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Posts Grid */}
      <div>
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Dernières Publications'}
          {language === 'en' && 'Latest Posts'}
          {language === 'es' && 'Últimas Publicaciones'}
          {language === 'it' && 'Ultime Pubblicazioni'}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.filter(p => !p.featured).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border-2 border-gray-200 hover:border-pink-500 hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
            >
              {/* Media Preview */}
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 flex items-center justify-center relative">
                <div className="text-6xl">{post.media}</div>
                {post.type === 'video' && (
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Video
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Author */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-2xl">{post.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 truncate">{post.author}</div>
                    <div className="text-xs text-gray-500 truncate">{post.username}</div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{post.content}</p>

                {/* Engagement */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {formatNumber(post.likes)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {formatNumber(post.comments)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-3 h-3" />
                    {formatNumber(post.shares)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Share Your Content */}
      <div className="mt-6 bg-gradient-to-br from-[#6B1E3E] to-pink-600 rounded-xl p-8 text-white text-center">
        <Instagram className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Partagez votre expérience HYDRAO'}
          {language === 'en' && 'Share your HYDRAO experience'}
          {language === 'es' && 'Comparte tu experiencia HYDRAO'}
          {language === 'it' && 'Condividi la tua esperienza HYDRAO'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && 'Utilisez #MyHYDRAO sur Instagram et TikTok pour une chance d\'être mis en avant et gagner des cadeaux exclusifs !'}
          {language === 'en' && 'Use #MyHYDRAO on Instagram and TikTok for a chance to be featured and win exclusive gifts!'}
          {language === 'es' && 'Usa #MyHYDRAO en Instagram y TikTok para tener la oportunidad de ser destacado y ganar regalos exclusivos!'}
          {language === 'it' && 'Usa #MyHYDRAO su Instagram e TikTok per avere la possibilità di essere presentato e vincere regali esclusivi!'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            #MyHYDRAO
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            #HYDRAOLife
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            #EcoFriendly
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            #ZeroWaste
          </div>
        </div>

        <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          {language === 'fr' && 'Publier mon contenu'}
          {language === 'en' && 'Share my content'}
          {language === 'es' && 'Compartir mi contenido'}
          {language === 'it' && 'Condividi il mio contenuto'}
        </button>
      </div>
    </div>
  );
}
