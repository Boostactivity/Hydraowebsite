import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, Globe, Target, Award, Zap, Eye, DollarSign, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'market' | 'consumer' | 'competitor' | 'trend';
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  source: string;
  date: string;
  stats: { label: string; value: string }[];
  emoji: string;
}

export function MarketResearch() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const insights: Insight[] = [
    {
      id: '1',
      title: language === 'fr'
        ? 'Marché robinets premium +42% en 2024'
        : 'Premium tap market +42% in 2024',
      description: language === 'fr'
        ? 'Le marché des robinets premium (>400€) explose avec +42% de croissance. Les consommateurs privilégient qualité et multifonction.'
        : 'Premium tap market (>$435) explodes with +42% growth. Consumers favor quality and multifunction.',
      category: 'market',
      impact: 'high',
      confidence: 94,
      source: 'Global Market Analysis',
      date: '2024-12',
      stats: [
        { label: language === 'fr' ? 'Croissance marché' : 'Market growth', value: '+42%' },
        { label: language === 'fr' ? 'Taille marché' : 'Market size', value: '2.8B€' },
        { label: language === 'fr' ? 'CAGR 2024-2028' : 'CAGR 2024-2028', value: '+38%' },
      ],
      emoji: '📈',
    },
    {
      id: '2',
      title: language === 'fr'
        ? '78% veulent réduire bouteilles plastique'
        : '78% want to reduce plastic bottles',
      description: language === 'fr'
        ? 'Étude de 12 400 consommateurs : 78% cherchent activement des alternatives aux bouteilles plastique pour raisons écologiques.'
        : 'Study of 12,400 consumers: 78% actively seek alternatives to plastic bottles for environmental reasons.',
      category: 'consumer',
      impact: 'high',
      confidence: 92,
      source: 'Consumer Survey 2024',
      date: '2024-11',
      stats: [
        { label: language === 'fr' ? 'Échantillon' : 'Sample', value: '12 400' },
        { label: language === 'fr' ? 'Motivation écolo' : 'Eco motivation', value: '78%' },
        { label: language === 'fr' ? 'Prêts à payer +30%' : 'Willing to pay +30%', value: '64%' },
      ],
      emoji: '🌍',
    },
    {
      id: '3',
      title: language === 'fr'
        ? 'Concurrent #1 perd 23% parts de marché'
        : 'Competitor #1 loses 23% market share',
      description: language === 'fr'
        ? 'Le leader historique perd 23% de parts en 18 mois. Cause : prix élevés, SAV médiocre et manque d\'innovation.'
        : 'Historical leader loses 23% share in 18 months. Cause: high prices, poor service and lack of innovation.',
      category: 'competitor',
      impact: 'high',
      confidence: 89,
      source: 'Competitive Intelligence',
      date: '2024-12',
      stats: [
        { label: language === 'fr' ? 'Perte parts' : 'Share loss', value: '-23%' },
        { label: language === 'fr' ? 'Satisfaction client' : 'Customer satisfaction', value: '3.2/5' },
        { label: language === 'fr' ? 'Opportunité HYDRAO' : 'HYDRAO opportunity', value: '+18%' },
      ],
      emoji: '🎯',
    },
    {
      id: '4',
      title: language === 'fr'
        ? 'Tendance santé & bien-être explose'
        : 'Health & wellness trend explodes',
      description: language === 'fr'
        ? 'Le marché de l\'eau filtrée pour santé croît de +58%. Les consommateurs investissent dans qualité de l\'eau à domicile.'
        : 'Filtered water for health market grows +58%. Consumers invest in home water quality.',
      category: 'trend',
      impact: 'high',
      confidence: 96,
      source: 'Health Trend Report',
      date: '2024-11',
      stats: [
        { label: language === 'fr' ? 'Croissance' : 'Growth', value: '+58%' },
        { label: language === 'fr' ? 'Budget moyen' : 'Average budget', value: '890€/an' },
        { label: language === 'fr' ? 'Adoption' : 'Adoption', value: '34%' },
      ],
      emoji: '💚',
    },
    {
      id: '5',
      title: language === 'fr'
        ? 'Segment luxe cuisine +67% 2024'
        : 'Kitchen luxury segment +67% 2024',
      description: language === 'fr'
        ? 'Le segment luxe/premium cuisine explose. Les propriétaires investissent massivement dans équipements haut de gamme.'
        : 'Kitchen luxury/premium segment explodes. Owners invest heavily in high-end equipment.',
      category: 'market',
      impact: 'high',
      confidence: 91,
      source: 'Luxury Market Study',
      date: '2024-12',
      stats: [
        { label: language === 'fr' ? 'Croissance' : 'Growth', value: '+67%' },
        { label: language === 'fr' ? 'Panier moyen' : 'Average basket', value: '4 200€' },
        { label: language === 'fr' ? 'Priorité design' : 'Design priority', value: '89%' },
      ],
      emoji: '💎',
    },
    {
      id: '6',
      title: language === 'fr'
        ? '82% privilégient marques responsables'
        : '82% favor responsible brands',
      description: language === 'fr'
        ? 'Les consommateurs premium choisissent des marques engagées environnement (82%) et privilégient transparence totale.'
        : 'Premium consumers choose environmentally committed brands (82%) and favor total transparency.',
      category: 'consumer',
      impact: 'medium',
      confidence: 93,
      source: 'Brand Ethics Survey',
      date: '2024-11',
      stats: [
        { label: language === 'fr' ? 'Priorité RSE' : 'CSR priority', value: '82%' },
        { label: language === 'fr' ? 'Exigence transparence' : 'Transparency demand', value: '76%' },
        { label: language === 'fr' ? 'Prime éthique' : 'Ethics premium', value: '+25%' },
      ],
      emoji: '🌱',
    },
  ];

  const categories = [
    { id: 'all', label: language === 'fr' ? 'Tous' : 'All', count: insights.length, icon: <BarChart3 className="w-4 h-4" />, color: 'gray' },
    { id: 'market', label: language === 'fr' ? 'Marché' : 'Market', count: insights.filter(i => i.category === 'market').length, icon: <TrendingUp className="w-4 h-4" />, color: 'blue' },
    { id: 'consumer', label: language === 'fr' ? 'Consommateur' : 'Consumer', count: insights.filter(i => i.category === 'consumer').length, icon: <Users className="w-4 h-4" />, color: 'green' },
    { id: 'competitor', label: language === 'fr' ? 'Concurrence' : 'Competitor', count: insights.filter(i => i.category === 'competitor').length, icon: <Target className="w-4 h-4" />, color: 'red' },
    { id: 'trend', label: language === 'fr' ? 'Tendances' : 'Trends', count: insights.filter(i => i.category === 'trend').length, icon: <Zap className="w-4 h-4" />, color: 'purple' },
  ];

  const stats = [
    {
      value: '127',
      label: language === 'fr' ? 'Insights 2024' : '2024 Insights',
      icon: <Eye className="w-5 h-5" />,
    },
    {
      value: '45K+',
      label: language === 'fr' ? 'Data points' : 'Data points',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      value: '23',
      label: language === 'fr' ? 'Sources' : 'Sources',
      icon: <Globe className="w-5 h-5" />,
    },
    {
      value: '94%',
      label: language === 'fr' ? 'Précision moyenne' : 'Avg accuracy',
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const filteredInsights = selectedCategory === 'all'
    ? insights
    : insights.filter(i => i.category === selectedCategory);

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high': return language === 'fr' ? 'Fort' : 'High';
      case 'medium': return language === 'fr' ? 'Moyen' : 'Medium';
      case 'low': return language === 'fr' ? 'Faible' : 'Low';
      default: return impact;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Insights Marché'}
            {language === 'en' && 'Market Insights'}
            {language === 'es' && 'Insights Mercado'}
            {language === 'it' && 'Insights Mercato'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Données et tendances automatisées en temps réel'}
            {language === 'en' && 'Automated real-time data and trends'}
            {language === 'es' && 'Datos y tendencias automatizadas en tiempo real'}
            {language === 'it' && 'Dati e tendenze automatizzate in tempo reale'}
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

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
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

      {/* Insights Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {filteredInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 text-white">
              <div className="flex items-start justify-between mb-3">
                <div className="text-5xl">{insight.emoji}</div>
                <div className={`bg-${getImpactColor(insight.impact)}-500 text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {getImpactLabel(insight.impact)}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">{insight.title}</h3>
              <p className="text-sm opacity-90">{insight.description}</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {insight.stats.map((stat, i) => (
                  <div key={i} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 text-center border border-purple-200">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Confidence Bar */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">
                    {language === 'fr' ? 'Fiabilité' : 'Confidence'}
                  </span>
                  <span className="font-bold text-green-600">{insight.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">{insight.source}</span>
                </div>
                <div>{formatDate(insight.date)}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Takeaways */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-600" />
          {language === 'fr' && 'Points clés pour HYDRAO'}
          {language === 'en' && 'Key takeaways for HYDRAO'}
          {language === 'es' && 'Puntos clave para HYDRAO'}
          {language === 'it' && 'Punti chiave per HYDRAO'}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Opportunité marché' : 'Market opportunity'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' 
                ? 'Marché premium +42% avec concurrent #1 en baisse -23%'
                : 'Premium market +42% with competitor #1 down -23%'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">💚</div>
            <div className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Tendance écologique' : 'Eco trend'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr'
                ? '78% veulent réduire plastique, 82% privilégient marques responsables'
                : '78% want to reduce plastic, 82% favor responsible brands'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">💎</div>
            <div className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Premium & santé' : 'Premium & health'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr'
                ? 'Luxe cuisine +67%, eau filtrée santé +58%'
                : 'Kitchen luxury +67%, filtered health water +58%'}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-blue-600 rounded-xl p-8 text-white text-center">
        <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Recherche automatisée en continu'}
          {language === 'en' && 'Continuous automated research'}
          {language === 'es' && 'Investigación automatizada continua'}
          {language === 'it' && 'Ricerca automatizzata continua'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && '127 insights en 2024 • 45K+ data points • 23 sources • 94% précision moyenne • Mise à jour temps réel'}
          {language === 'en' && '127 insights in 2024 • 45K+ data points • 23 sources • 94% avg accuracy • Real-time updates'}
          {language === 'es' && '127 insights en 2024 • 45K+ puntos de datos • 23 fuentes • 94% precisión media • Actualización en tiempo real'}
          {language === 'it' && '127 insights nel 2024 • 45K+ punti dati • 23 fonti • 94% precisione media • Aggiornamenti in tempo reale'}
        </p>

        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Analyse marché' : 'Market analysis'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Comportement consommateur' : 'Consumer behavior'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Intelligence concurrentielle' : 'Competitive intelligence'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Tendances émergentes' : 'Emerging trends'}
          </div>
        </div>
      </div>
    </div>
  );
}
