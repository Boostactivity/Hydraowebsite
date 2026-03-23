import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, TrendingUp, Eye, ExternalLink, Filter, Calendar, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface MediaMention {
  id: string;
  outlet: string;
  logo: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'tech' | 'business' | 'lifestyle' | 'sustainability';
  tier: 'tier1' | 'tier2' | 'tier3';
  url: string;
  featured: boolean;
}

export function MediaMentions() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const mediaMentions: MediaMention[] = [
    {
      id: '1',
      outlet: 'TechCrunch',
      logo: '📱',
      title: language === 'fr' 
        ? 'HYDRAO lève 5M€ pour sa révolution du robinet intelligent'
        : 'HYDRAO raises €5M for smart tap revolution',
      excerpt: language === 'fr'
        ? 'La startup française HYDRAO annonce une levée de fonds de 5 millions d\'euros pour accélérer son expansion internationale...'
        : 'French startup HYDRAO announces €5 million funding round to accelerate international expansion...',
      date: '2024-11-15',
      category: 'tech',
      tier: 'tier1',
      url: '#',
      featured: true,
    },
    {
      id: '2',
      outlet: 'Forbes',
      logo: '💼',
      title: language === 'fr'
        ? 'HYDRAO : Comment ce robinet fait économiser 2340€/an aux familles'
        : 'HYDRAO: How This Tap Saves Families $2,550/Year',
      excerpt: language === 'fr'
        ? 'Dans un contexte d\'inflation, HYDRAO propose une solution innovante qui permet aux foyers de réduire drastiquement leurs dépenses en bouteilles...'
        : 'In a context of inflation, HYDRAO offers an innovative solution that allows households to drastically reduce their bottle expenses...',
      date: '2024-10-28',
      category: 'business',
      tier: 'tier1',
      url: '#',
      featured: true,
    },
    {
      id: '3',
      outlet: 'Les Échos',
      logo: '📰',
      title: language === 'fr'
        ? 'La French Tech à l\'assaut du marché des robinets premium'
        : 'French Tech Storms Premium Tap Market',
      excerpt: language === 'fr'
        ? 'HYDRAO s\'impose comme le leader européen des robinets 5-en-1 avec une croissance de 280% en 2024...'
        : 'HYDRAO establishes itself as European leader in 5-in-1 taps with 280% growth in 2024...',
      date: '2024-10-12',
      category: 'business',
      tier: 'tier1',
      url: '#',
      featured: false,
    },
    {
      id: '4',
      outlet: 'Vogue Living',
      logo: '✨',
      title: language === 'fr'
        ? '10 innovations design qui vont transformer votre cuisine'
        : '10 Design Innovations That Will Transform Your Kitchen',
      excerpt: language === 'fr'
        ? 'Le robinet HYDRAO combine élégance minimaliste et technologie de pointe. Un must-have pour les cuisines modernes...'
        : 'The HYDRAO tap combines minimalist elegance and cutting-edge technology. A must-have for modern kitchens...',
      date: '2024-09-20',
      category: 'lifestyle',
      tier: 'tier2',
      url: '#',
      featured: false,
    },
    {
      id: '5',
      outlet: 'The Guardian',
      logo: '🌍',
      title: language === 'fr'
        ? 'Comment HYDRAO élimine 3000 bouteilles plastique par foyer'
        : 'How HYDRAO Eliminates 3,000 Plastic Bottles Per Household',
      excerpt: language === 'fr'
        ? 'L\'impact environnemental de HYDRAO est considérable : 36 millions de bouteilles plastique évitées en 2024...'
        : 'HYDRAO\'s environmental impact is considerable: 36 million plastic bottles avoided in 2024...',
      date: '2024-09-05',
      category: 'sustainability',
      tier: 'tier1',
      url: '#',
      featured: true,
    },
    {
      id: '6',
      outlet: 'Wired',
      logo: '⚡',
      title: language === 'fr'
        ? 'La technologie derrière le robinet le plus intelligent du monde'
        : 'The Technology Behind The World\'s Smartest Tap',
      excerpt: language === 'fr'
        ? 'Analyse technique approfondie du système 5-en-1 de HYDRAO qui intègre filtration, carbonatation, chauffage et refroidissement...'
        : 'In-depth technical analysis of HYDRAO\'s 5-in-1 system integrating filtration, carbonation, heating and cooling...',
      date: '2024-08-18',
      category: 'tech',
      tier: 'tier2',
      url: '#',
      featured: false,
    },
    {
      id: '7',
      outlet: 'Elle Décoration',
      logo: '🏠',
      title: language === 'fr'
        ? 'HYDRAO élu "Meilleur produit innovation cuisine 2024"'
        : 'HYDRAO Voted "Best Kitchen Innovation Product 2024"',
      excerpt: language === 'fr'
        ? 'Le jury a salué l\'alliance parfaite entre design épuré et fonctionnalités avancées...'
        : 'The jury praised the perfect alliance between sleek design and advanced features...',
      date: '2024-07-10',
      category: 'lifestyle',
      tier: 'tier2',
      url: '#',
      featured: false,
    },
    {
      id: '8',
      outlet: 'Bloomberg',
      logo: '💹',
      title: language === 'fr'
        ? 'HYDRAO vise 100M€ de CA en 2025'
        : 'HYDRAO Targets €100M Revenue in 2025',
      excerpt: language === 'fr'
        ? 'La startup vise une expansion agressive en Europe et aux États-Unis avec l\'ouverture de 15 nouveaux marchés...'
        : 'The startup aims for aggressive expansion in Europe and the United States with the opening of 15 new markets...',
      date: '2024-06-22',
      category: 'business',
      tier: 'tier1',
      url: '#',
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', label: language === 'fr' ? 'Tous' : 'All', count: mediaMentions.length },
    { id: 'tech', label: language === 'fr' ? 'Tech' : 'Tech', count: mediaMentions.filter(m => m.category === 'tech').length },
    { id: 'business', label: language === 'fr' ? 'Business' : 'Business', count: mediaMentions.filter(m => m.category === 'business').length },
    { id: 'lifestyle', label: language === 'fr' ? 'Lifestyle' : 'Lifestyle', count: mediaMentions.filter(m => m.category === 'lifestyle').length },
    { id: 'sustainability', label: language === 'fr' ? 'Environnement' : 'Sustainability', count: mediaMentions.filter(m => m.category === 'sustainability').length },
  ];

  const tierColors = {
    tier1: 'from-yellow-400 to-orange-500',
    tier2: 'from-gray-300 to-gray-500',
    tier3: 'from-orange-300 to-amber-500',
  };

  const filteredMentions = selectedCategory === 'all' 
    ? mediaMentions 
    : mediaMentions.filter(m => m.category === selectedCategory);

  const stats = [
    {
      value: '85+',
      label: language === 'fr' ? 'Mentions presse' : 'Press mentions',
      icon: <Newspaper className="w-5 h-5" />,
    },
    {
      value: '24M',
      label: language === 'fr' ? 'Lecteurs atteints' : 'Readers reached',
      icon: <Eye className="w-5 h-5" />,
    },
    {
      value: '18',
      label: language === 'fr' ? 'Tier 1 média' : 'Tier 1 media',
      icon: <Star className="w-5 h-5" />,
    },
    {
      value: '+340%',
      label: language === 'fr' ? 'Croissance PR' : 'PR growth',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Newspaper className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'HYDRAO dans les Médias'}
            {language === 'en' && 'HYDRAO in the Media'}
            {language === 'es' && 'HYDRAO en los Medios'}
            {language === 'it' && 'HYDRAO nei Media'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Ils parlent de nous'}
            {language === 'en' && 'They talk about us'}
            {language === 'es' && 'Hablan de nosotros'}
            {language === 'it' && 'Parlano di noi'}
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
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
          >
            <div className="flex items-center gap-2 mb-2 text-purple-600">
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
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-[#6B1E3E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
            <span className="ml-2 text-sm opacity-75">({category.count})</span>
          </button>
        ))}
      </div>

      {/* Featured Mentions */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" />
          {language === 'fr' && 'À la Une'}
          {language === 'en' && 'Featured'}
          {language === 'es' && 'Destacado'}
          {language === 'it' && 'In Evidenza'}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredMentions.filter(m => m.featured).map((mention, index) => (
            <motion.a
              key={mention.id}
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${tierColors[mention.tier]} rounded-xl p-6 text-white hover:shadow-2xl transition-all group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{mention.logo}</div>
                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="text-sm font-semibold mb-2 opacity-90">{mention.outlet}</div>
              <h4 className="font-bold text-xl mb-3 line-clamp-2">{mention.title}</h4>
              <p className="text-sm opacity-90 mb-4 line-clamp-2">{mention.excerpt}</p>

              <div className="flex items-center gap-2 text-sm opacity-75">
                <Calendar className="w-4 h-4" />
                {formatDate(mention.date)}
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* All Mentions */}
      <div>
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Toutes les Mentions'}
          {language === 'en' && 'All Mentions'}
          {language === 'es' && 'Todas las Menciones'}
          {language === 'it' && 'Tutte le Menzioni'}
        </h3>

        <div className="space-y-3">
          {filteredMentions.filter(m => !m.featured).map((mention, index) => (
            <motion.a
              key={mention.id}
              href={mention.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-[#6B1E3E] hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{mention.logo}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="text-sm font-semibold text-gray-600 mb-1">{mention.outlet}</div>
                      <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-[#6B1E3E] transition-colors">
                        {mention.title}
                      </h4>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#6B1E3E] flex-shrink-0 transition-colors" />
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{mention.excerpt}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(mention.date)}
                    </div>
                    <div className={`px-2 py-1 rounded-full ${
                      mention.tier === 'tier1' ? 'bg-yellow-100 text-yellow-700' :
                      mention.tier === 'tier2' ? 'bg-gray-200 text-gray-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {mention.tier === 'tier1' ? '⭐ Tier 1' : mention.tier === 'tier2' ? 'Tier 2' : 'Tier 3'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-6 text-white text-center">
        <h3 className="font-bold text-xl mb-2">
          {language === 'fr' && 'Vous êtes journaliste ?'}
          {language === 'en' && 'Are you a journalist?'}
          {language === 'es' && '¿Eres periodista?'}
          {language === 'it' && 'Sei un giornalista?'}
        </h3>
        <p className="mb-4 opacity-90">
          {language === 'fr' && 'Accédez à notre kit presse complet et contactez notre équipe'}
          {language === 'en' && 'Access our complete press kit and contact our team'}
          {language === 'es' && 'Accede a nuestro kit de prensa completo y contacta a nuestro equipo'}
          {language === 'it' && 'Accedi al nostro kit stampa completo e contatta il nostro team'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {language === 'fr' && 'Télécharger le kit presse'}
            {language === 'en' && 'Download press kit'}
            {language === 'es' && 'Descargar kit de prensa'}
            {language === 'it' && 'Scarica kit stampa'}
          </button>
          <a
            href="mailto:press@hydrao.com"
            className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors"
          >
            press@hydrao.com
          </a>
        </div>
      </div>
    </div>
  );
}
