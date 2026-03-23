import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, TrendingUp, Users, Award, Zap, Star, CheckCircle, AlertCircle, Clock, BarChart3 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface Lead {
  id: string;
  name: string;
  email: string;
  score: number;
  tier: 'hot' | 'warm' | 'cold' | 'qualified';
  source: string;
  signals: string[];
  lastActivity: string;
  probability: number;
  estimatedValue: number;
  avatar: string;
}

interface ScoringFactor {
  id: string;
  category: 'demographic' | 'behavioral' | 'engagement' | 'firmographic';
  name: string;
  points: number;
  weight: string;
  icon: React.ReactNode;
}

export function LeadScoring() {
  const { language } = useLanguage();
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const leads: Lead[] = [
    {
      id: '1',
      name: 'Sophie Martin',
      email: 'sophie.m@email.com',
      score: 92,
      tier: 'hot',
      source: 'Website',
      signals: [
        language === 'fr' ? 'Calculateur utilisé 3x' : 'Calculator used 3x',
        language === 'fr' ? 'Prix consulté 5 min' : 'Price viewed 5 min',
        language === 'fr' ? 'Video regardée 100%' : 'Video watched 100%',
        language === 'fr' ? 'Comparaison téléchargée' : 'Comparison downloaded',
      ],
      lastActivity: '12 min',
      probability: 87,
      estimatedValue: 490,
      avatar: '👩‍💼',
    },
    {
      id: '2',
      name: 'Thomas Dubois',
      email: 'thomas.d@email.com',
      score: 85,
      tier: 'hot',
      source: 'Google Ads',
      signals: [
        language === 'fr' ? 'Formulaire premium rempli' : 'Premium form filled',
        language === 'fr' ? 'FAQ lue 80%' : 'FAQ read 80%',
        language === 'fr' ? '4 pages visitées' : '4 pages visited',
        language === 'fr' ? 'Email ouvert 2x' : 'Email opened 2x',
      ],
      lastActivity: '1h',
      probability: 78,
      estimatedValue: 490,
      avatar: '👨‍💻',
    },
    {
      id: '3',
      name: 'Marie Laurent',
      email: 'marie.l@email.com',
      score: 68,
      tier: 'warm',
      source: 'Facebook',
      signals: [
        language === 'fr' ? 'Webinar inscrit' : 'Webinar registered',
        language === 'fr' ? 'Blog lu 3 articles' : 'Blog read 3 articles',
        language === 'fr' ? 'Newsletter ouverte' : 'Newsletter opened',
      ],
      lastActivity: '2j',
      probability: 54,
      estimatedValue: 490,
      avatar: '👩',
    },
    {
      id: '4',
      name: 'Pierre Lefebvre',
      email: 'pierre.l@email.com',
      score: 45,
      tier: 'cold',
      source: 'Instagram',
      signals: [
        language === 'fr' ? '1 page visitée' : '1 page visited',
        language === 'fr' ? 'Email non ouvert' : 'Email not opened',
      ],
      lastActivity: '7j',
      probability: 28,
      estimatedValue: 490,
      avatar: '👨',
    },
    {
      id: '5',
      name: 'Emma Rousseau',
      email: 'emma.r@email.com',
      score: 95,
      tier: 'qualified',
      source: 'Referral',
      signals: [
        language === 'fr' ? 'Démo demandée' : 'Demo requested',
        language === 'fr' ? 'Budget confirmé' : 'Budget confirmed',
        language === 'fr' ? 'Décideur identifié' : 'Decision maker',
        language === 'fr' ? 'Timeline: 2 semaines' : 'Timeline: 2 weeks',
        language === 'fr' ? 'Contact commercial' : 'Sales contact',
      ],
      lastActivity: '3h',
      probability: 94,
      estimatedValue: 639,
      avatar: '💼',
    },
  ];

  const scoringFactors: ScoringFactor[] = [
    {
      id: '1',
      category: 'demographic',
      name: language === 'fr' ? 'Revenu >80K€/an' : 'Income >€80K/year',
      points: 15,
      weight: language === 'fr' ? 'Fort' : 'High',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: '2',
      category: 'behavioral',
      name: language === 'fr' ? 'Calculateur utilisé' : 'Calculator used',
      points: 20,
      weight: language === 'fr' ? 'Très fort' : 'Very high',
      icon: <Target className="w-5 h-5" />,
    },
    {
      id: '3',
      category: 'engagement',
      name: language === 'fr' ? 'Email ouvert >2x' : 'Email opened >2x',
      points: 10,
      weight: language === 'fr' ? 'Moyen' : 'Medium',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      id: '4',
      category: 'behavioral',
      name: language === 'fr' ? 'Page prix visitée' : 'Pricing page visited',
      points: 18,
      weight: language === 'fr' ? 'Fort' : 'High',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: '5',
      category: 'engagement',
      name: language === 'fr' ? 'Vidéo regardée 100%' : 'Video watched 100%',
      points: 12,
      weight: language === 'fr' ? 'Moyen' : 'Medium',
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: '6',
      category: 'behavioral',
      name: language === 'fr' ? 'Formulaire rempli' : 'Form submitted',
      points: 25,
      weight: language === 'fr' ? 'Très fort' : 'Very high',
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const stats = [
    {
      value: '2 340',
      label: language === 'fr' ? 'Leads actifs' : 'Active leads',
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: '287',
      label: language === 'fr' ? 'Leads chauds' : 'Hot leads',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      value: '34%',
      label: language === 'fr' ? 'Taux qualification' : 'Qualification rate',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      value: '78%',
      label: language === 'fr' ? 'Précision prédiction' : 'Prediction accuracy',
      icon: <Target className="w-5 h-5" />,
    },
  ];

  const tiers = [
    { id: 'all', label: language === 'fr' ? 'Tous' : 'All', count: leads.length, color: 'gray' },
    { id: 'qualified', label: language === 'fr' ? 'Qualifié' : 'Qualified', count: leads.filter(l => l.tier === 'qualified').length, color: 'purple' },
    { id: 'hot', label: language === 'fr' ? 'Chaud' : 'Hot', count: leads.filter(l => l.tier === 'hot').length, color: 'red' },
    { id: 'warm', label: language === 'fr' ? 'Tiède' : 'Warm', count: leads.filter(l => l.tier === 'warm').length, color: 'orange' },
    { id: 'cold', label: language === 'fr' ? 'Froid' : 'Cold', count: leads.filter(l => l.tier === 'cold').length, color: 'blue' },
  ];

  const filteredLeads = selectedTier === 'all'
    ? leads
    : leads.filter(l => l.tier === selectedTier);

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'qualified': return language === 'fr' ? 'Qualifié' : 'Qualified';
      case 'hot': return language === 'fr' ? 'Chaud' : 'Hot';
      case 'warm': return language === 'fr' ? 'Tiède' : 'Warm';
      case 'cold': return language === 'fr' ? 'Froid' : 'Cold';
      default: return tier;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'qualified': return 'purple';
      case 'hot': return 'red';
      case 'warm': return 'orange';
      case 'cold': return 'blue';
      default: return 'gray';
    }
  };

  const formatValue = (amount: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
          <Target className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Scoring des Leads'}
            {language === 'en' && 'Lead Scoring'}
            {language === 'es' && 'Scoring de Leads'}
            {language === 'it' && 'Scoring Lead'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Priorisation automatique basée sur l\'IA'}
            {language === 'en' && 'AI-based automatic prioritization'}
            {language === 'es' && 'Priorización automática basada en IA'}
            {language === 'it' && 'Prioritizzazione automatica basata su IA'}
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
            className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200"
          >
            <div className="flex items-center gap-2 mb-2 text-red-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tier Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {tiers.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTier(tier.id)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedTier === tier.id
                ? 'bg-[#6B1E3E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tier.label}
            <span className="ml-2 text-sm opacity-75">({tier.count})</span>
          </button>
        ))}
      </div>

      {/* Leads List */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Leads prioritaires'}
          {language === 'en' && 'Priority leads'}
          {language === 'es' && 'Leads prioritarios'}
          {language === 'it' && 'Lead prioritari'}
        </h3>

        <div className="space-y-4">
          {filteredLeads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-red-500 hover:shadow-xl transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Avatar & Score */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-5xl">{lead.avatar}</div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold text-${getTierColor(lead.tier)}-600`}>
                      {lead.score}
                    </div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">{lead.name}</h4>
                      <div className="text-sm text-gray-600">{lead.email}</div>
                    </div>
                    <div className={`bg-${getTierColor(lead.tier)}-100 text-${getTierColor(lead.tier)}-700 text-sm font-bold px-4 py-2 rounded-full`}>
                      {getTierLabel(lead.tier)}
                    </div>
                  </div>

                  {/* Signals */}
                  <div className="mb-3">
                    <div className="text-sm font-semibold text-gray-700 mb-2">
                      {language === 'fr' ? 'Signaux d\'achat' : 'Buying signals'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lead.signals.map((signal, i) => (
                        <div key={i} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-200">
                          {signal}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-purple-50 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-gray-900">{lead.probability}%</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Probabilité' : 'Probability'}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-gray-900">{formatValue(lead.estimatedValue)}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Valeur' : 'Value'}</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-gray-900">{lead.source}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Source' : 'Source'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-gray-900">{lead.lastActivity}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Activité' : 'Activity'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scoring Factors */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Facteurs de scoring'}
          {language === 'en' && 'Scoring factors'}
          {language === 'es' && 'Factores de scoring'}
          {language === 'it' && 'Fattori di scoring'}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {scoringFactors.map((factor, index) => (
            <motion.div
              key={factor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700">
                  {factor.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">+{factor.points}</div>
                  <div className="text-xs text-gray-600">{language === 'fr' ? 'points' : 'points'}</div>
                </div>
              </div>
              <div className="font-bold text-gray-900 mb-1">{factor.name}</div>
              <div className="text-sm text-gray-600">{factor.weight}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-red-600 rounded-xl p-8 text-white text-center">
        <Target className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Scoring intelligent par IA'}
          {language === 'en' && 'AI-powered intelligent scoring'}
          {language === 'es' && 'Scoring inteligente por IA'}
          {language === 'it' && 'Scoring intelligente con IA'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && '2 340 leads actifs • 287 leads chauds • 78% précision prédiction • Priorisation automatique 24/7'}
          {language === 'en' && '2,340 active leads • 287 hot leads • 78% prediction accuracy • Automatic 24/7 prioritization'}
          {language === 'es' && '2,340 leads activos • 287 leads calientes • 78% precisión predicción • Priorización automática 24/7'}
          {language === 'it' && '2,340 lead attivi • 287 lead caldi • 78% precisione previsione • Prioritizzazione automatica 24/7'}
        </p>

        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Scoring temps réel' : 'Real-time scoring'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Priorisation automatique' : 'Auto prioritization'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Prédiction IA' : 'AI prediction'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Valeur estimée' : 'Estimated value'}
          </div>
        </div>
      </div>
    </div>
  );
}
