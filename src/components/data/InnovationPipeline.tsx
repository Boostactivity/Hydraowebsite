import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, Lightbulb, Calendar, TrendingUp, Users, CheckCircle, Clock, Sparkles, Award, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface Innovation {
  id: string;
  title: string;
  description: string;
  category: 'product' | 'feature' | 'service' | 'sustainability';
  stage: 'research' | 'development' | 'testing' | 'launching' | 'launched';
  impact: 'low' | 'medium' | 'high' | 'revolutionary';
  expectedDate: string;
  progress: number;
  votes: number;
  emoji: string;
  benefits: string[];
}

export function InnovationPipeline() {
  const { language } = useLanguage();
  const [selectedStage, setSelectedStage] = useState<string>('all');

  const innovations: Innovation[] = [
    {
      id: '1',
      title: language === 'fr'
        ? 'HYDRAO 2.0 - Nouvelle Génération'
        : 'HYDRAO 2.0 - Next Generation',
      description: language === 'fr'
        ? 'Version révolutionnaire avec écran tactile, contrôle vocal, filtration avancée et design encore plus premium.'
        : 'Revolutionary version with touchscreen, voice control, advanced filtration and even more premium design.',
      category: 'product',
      stage: 'development',
      impact: 'revolutionary',
      expectedDate: '2025-03',
      progress: 67,
      votes: 2340,
      emoji: '🚀',
      benefits: [
        language === 'fr' ? 'Écran tactile 7 pouces' : '7-inch touchscreen',
        language === 'fr' ? 'Contrôle vocal Alexa/Google' : 'Alexa/Google voice control',
        language === 'fr' ? 'Filtration 3 étapes avancée' : '3-stage advanced filtration',
        language === 'fr' ? 'Design ultra-premium' : 'Ultra-premium design',
      ],
    },
    {
      id: '2',
      title: language === 'fr'
        ? 'Application Mobile HYDRAO'
        : 'HYDRAO Mobile App',
      description: language === 'fr'
        ? 'App iOS/Android pour contrôler HYDRAO à distance, suivre consommation, recevoir alertes et accéder à des recettes exclusives.'
        : 'iOS/Android app to control HYDRAO remotely, track consumption, receive alerts and access exclusive recipes.',
      category: 'feature',
      stage: 'testing',
      impact: 'high',
      expectedDate: '2025-01',
      progress: 85,
      votes: 1876,
      emoji: '📱',
      benefits: [
        language === 'fr' ? 'Contrôle à distance' : 'Remote control',
        language === 'fr' ? 'Suivi consommation temps réel' : 'Real-time consumption tracking',
        language === 'fr' ? 'Notifications intelligentes' : 'Smart notifications',
        language === 'fr' ? '200+ recettes intégrées' : '200+ integrated recipes',
      ],
    },
    {
      id: '3',
      title: language === 'fr'
        ? 'Filtres Bio-Compostables'
        : 'Bio-Compostable Filters',
      description: language === 'fr'
        ? 'Filtres nouvelle génération 100% compostables fabriqués à partir de matériaux végétaux renouvelables.'
        : 'Next-gen 100% compostable filters made from renewable plant-based materials.',
      category: 'sustainability',
      stage: 'testing',
      impact: 'high',
      expectedDate: '2025-02',
      progress: 78,
      votes: 1567,
      emoji: '🌱',
      benefits: [
        language === 'fr' ? '100% compostable' : '100% compostable',
        language === 'fr' ? 'Matériaux végétaux' : 'Plant-based materials',
        language === 'fr' ? 'Performance identique' : 'Same performance',
        language === 'fr' ? 'Zéro déchet plastique' : 'Zero plastic waste',
      ],
    },
    {
      id: '4',
      title: language === 'fr'
        ? 'Service Installation Premium'
        : 'Premium Installation Service',
      description: language === 'fr'
        ? 'Service d\'installation à domicile par des techniciens certifiés HYDRAO avec garantie satisfaction 100%.'
        : 'Home installation service by HYDRAO certified technicians with 100% satisfaction guarantee.',
      category: 'service',
      stage: 'launching',
      impact: 'medium',
      expectedDate: '2024-12',
      progress: 92,
      votes: 892,
      emoji: '🔧',
      benefits: [
        language === 'fr' ? 'Techniciens certifiés' : 'Certified technicians',
        language === 'fr' ? 'Installation garantie' : 'Guaranteed installation',
        language === 'fr' ? 'Formation utilisateur' : 'User training',
        language === 'fr' ? 'Support prioritaire' : 'Priority support',
      ],
    },
    {
      id: '5',
      title: language === 'fr'
        ? 'Système d\'Aromatisation Naturelle'
        : 'Natural Flavoring System',
      description: language === 'fr'
        ? 'Module optionnel pour infuser automatiquement votre eau avec des arômes 100% naturels (citron, menthe, fruits...).'
        : 'Optional module to automatically infuse your water with 100% natural flavors (lemon, mint, fruits...).',
      category: 'feature',
      stage: 'development',
      impact: 'high',
      expectedDate: '2025-04',
      progress: 54,
      votes: 2134,
      emoji: '🍋',
      benefits: [
        language === 'fr' ? 'Arômes 100% naturels' : '100% natural flavors',
        language === 'fr' ? '12 saveurs disponibles' : '12 flavors available',
        language === 'fr' ? 'Dosage automatique' : 'Automatic dosing',
        language === 'fr' ? 'Cartouches rechargeables' : 'Refillable cartridges',
      ],
    },
    {
      id: '6',
      title: language === 'fr'
        ? 'Mode Eco-Intelligent'
        : 'Eco-Intelligent Mode',
      description: language === 'fr'
        ? 'Intelligence artificielle qui apprend vos habitudes pour optimiser consommation énergie et maximiser économies.'
        : 'Artificial intelligence that learns your habits to optimize energy consumption and maximize savings.',
      category: 'feature',
      stage: 'research',
      impact: 'high',
      expectedDate: '2025-06',
      progress: 32,
      votes: 1456,
      emoji: '🧠',
      benefits: [
        language === 'fr' ? 'IA apprentissage automatique' : 'Machine learning AI',
        language === 'fr' ? 'Optimisation auto consommation' : 'Auto consumption optimization',
        language === 'fr' ? '+30% économies estimées' : '+30% estimated savings',
        language === 'fr' ? 'Suggestions personnalisées' : 'Personalized suggestions',
      ],
    },
    {
      id: '7',
      title: language === 'fr'
        ? 'Programme Abonnement Flexible'
        : 'Flexible Subscription Program',
      description: language === 'fr'
        ? 'Nouvelle offre d\'abonnement modulable : pause, ajustement, cadeaux surprises et tarifs préférentiels.'
        : 'New modular subscription offer: pause, adjustment, surprise gifts and preferential rates.',
      category: 'service',
      stage: 'launched',
      impact: 'medium',
      expectedDate: '2024-11',
      progress: 100,
      votes: 734,
      emoji: '💳',
      benefits: [
        language === 'fr' ? 'Pause/reprise facile' : 'Easy pause/resume',
        language === 'fr' ? 'Ajustement mensuel' : 'Monthly adjustment',
        language === 'fr' ? 'Cadeaux surprises' : 'Surprise gifts',
        language === 'fr' ? '-20% vs achat unitaire' : '-20% vs one-time purchase',
      ],
    },
  ];

  const stages = [
    { id: 'all', label: language === 'fr' ? 'Tout voir' : 'See all', count: innovations.length, icon: <Rocket className="w-4 h-4" /> },
    { id: 'research', label: language === 'fr' ? 'Recherche' : 'Research', count: innovations.filter(i => i.stage === 'research').length, icon: <Lightbulb className="w-4 h-4" /> },
    { id: 'development', label: language === 'fr' ? 'Développement' : 'Development', count: innovations.filter(i => i.stage === 'development').length, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'testing', label: language === 'fr' ? 'Test' : 'Testing', count: innovations.filter(i => i.stage === 'testing').length, icon: <Clock className="w-4 h-4" /> },
    { id: 'launching', label: language === 'fr' ? 'Lancement' : 'Launching', count: innovations.filter(i => i.stage === 'launching').length, icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'launched', label: language === 'fr' ? 'Lancé' : 'Launched', count: innovations.filter(i => i.stage === 'launched').length, icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const stats = [
    {
      value: '23',
      label: language === 'fr' ? 'Innovations actives' : 'Active innovations',
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      value: '7',
      label: language === 'fr' ? 'Lancées 2024' : 'Launched 2024',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      value: '12 400+',
      label: language === 'fr' ? 'Votes communauté' : 'Community votes',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '100%',
      label: language === 'fr' ? 'Transparence' : 'Transparency',
      icon: <Star className="w-5 h-5" />,
    },
  ];

  const filteredInnovations = selectedStage === 'all'
    ? innovations
    : innovations.filter(i => i.stage === selectedStage);

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'research': return language === 'fr' ? 'Recherche' : 'Research';
      case 'development': return language === 'fr' ? 'Développement' : 'Development';
      case 'testing': return language === 'fr' ? 'Test' : 'Testing';
      case 'launching': return language === 'fr' ? 'Lancement' : 'Launching';
      case 'launched': return language === 'fr' ? 'Lancé' : 'Launched';
      default: return stage;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'research': return 'purple';
      case 'development': return 'blue';
      case 'testing': return 'orange';
      case 'launching': return 'yellow';
      case 'launched': return 'green';
      default: return 'gray';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'low': return language === 'fr' ? 'Faible' : 'Low';
      case 'medium': return language === 'fr' ? 'Moyen' : 'Medium';
      case 'high': return language === 'fr' ? 'Fort' : 'High';
      case 'revolutionary': return language === 'fr' ? 'Révolutionnaire' : 'Revolutionary';
      default: return impact;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'gray';
      case 'medium': return 'blue';
      case 'high': return 'orange';
      case 'revolutionary': return 'red';
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
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Rocket className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Pipeline d\'Innovation'}
            {language === 'en' && 'Innovation Pipeline'}
            {language === 'es' && 'Pipeline de Innovación'}
            {language === 'it' && 'Pipeline di Innovazione'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Découvrez les innovations HYDRAO en développement'}
            {language === 'en' && 'Discover HYDRAO innovations in development'}
            {language === 'es' && 'Descubre las innovaciones HYDRAO en desarrollo'}
            {language === 'it' && 'Scopri le innovazioni HYDRAO in sviluppo'}
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

      {/* Stage Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => setSelectedStage(stage.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedStage === stage.id
                ? 'bg-[#6B1E3E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {stage.icon}
            {stage.label}
            <span className="text-sm opacity-75">({stage.count})</span>
          </button>
        ))}
      </div>

      {/* Innovation Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {filteredInnovations.map((innovation, index) => (
          <motion.div
            key={innovation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-white">
              <div className="flex items-start justify-between mb-3">
                <div className="text-5xl">{innovation.emoji}</div>
                <div className="flex flex-col gap-2">
                  <div className={`bg-${getStageColor(innovation.stage)}-500 text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {getStageLabel(innovation.stage)}
                  </div>
                  <div className={`bg-${getImpactColor(innovation.impact)}-500 text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {getImpactLabel(innovation.impact)}
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">{innovation.title}</h3>
              <p className="text-sm opacity-90">{innovation.description}</p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold text-gray-700">
                    {language === 'fr' ? 'Progression' : 'Progress'}
                  </span>
                  <span className="font-bold text-purple-600">{innovation.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                    style={{ width: `${innovation.progress}%` }}
                  />
                </div>
              </div>

              {/* Expected Date */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-semibold">
                    {language === 'fr' ? 'Date prévue' : 'Expected date'}
                  </span>
                </div>
                <div className="font-bold text-gray-900">{formatDate(innovation.expectedDate)}</div>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200 mb-4">
                <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  {language === 'fr' ? 'Bénéfices' : 'Benefits'}
                </div>
                <div className="space-y-1">
                  {innovation.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Votes */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">{innovation.votes}</span> votes
                </div>
                <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors">
                  {language === 'fr' ? 'Voter' : 'Vote'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Roadmap Visual */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-6">
          {language === 'fr' && 'Roadmap 2025'}
          {language === 'en' && '2025 Roadmap'}
          {language === 'es' && 'Roadmap 2025'}
          {language === 'it' && 'Roadmap 2025'}
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-200">
            <div className="text-2xl mb-2">Q1</div>
            <div className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Janv-Mars' : 'Jan-Mar'}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• App Mobile</div>
              <div>• HYDRAO 2.0</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-200">
            <div className="text-2xl mb-2">Q2</div>
            <div className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Avr-Juin' : 'Apr-Jun'}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Filtres Bio</div>
              <div>• Aromatisation</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
            <div className="text-2xl mb-2">Q3</div>
            <div className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Juil-Sept' : 'Jul-Sep'}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Mode Eco-IA</div>
              <div>• Beta features</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
            <div className="text-2xl mb-2">Q4</div>
            <div className="font-bold text-gray-900 mb-2">
              {language === 'fr' ? 'Oct-Déc' : 'Oct-Dec'}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Surprise 🎁</div>
              <div>• Innovation majeure</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-8 text-white text-center">
        <Rocket className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Influencez l\'avenir de HYDRAO'}
          {language === 'en' && 'Influence the future of HYDRAO'}
          {language === 'es' && 'Influye en el futuro de HYDRAO'}
          {language === 'it' && 'Influenza il futuro di HYDRAO'}
        </h3>
        <p className="text-lg opacity-90 mb-6">
          {language === 'fr' && 'Votez pour vos innovations préférées et proposez vos idées. 100% de transparence sur notre roadmap produit.'}
          {language === 'en' && 'Vote for your favorite innovations and propose your ideas. 100% transparency on our product roadmap.'}
          {language === 'es' && 'Vota por tus innovaciones favoritas y propone tus ideas. 100% transparencia en nuestro roadmap de producto.'}
          {language === 'it' && 'Vota per le tue innovazioni preferite e proponi le tue idee. 100% trasparenza sulla nostra roadmap di prodotto.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {language === 'fr' && 'Voter pour une innovation'}
            {language === 'en' && 'Vote for an innovation'}
            {language === 'es' && 'Votar por una innovación'}
            {language === 'it' && 'Vota per un\'innovazione'}
          </button>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors">
            {language === 'fr' && 'Proposer une idée'}
            {language === 'en' && 'Propose an idea'}
            {language === 'es' && 'Proponer una idea'}
            {language === 'it' && 'Proponi un\'idea'}
          </button>
        </div>
      </div>
    </div>
  );
}
