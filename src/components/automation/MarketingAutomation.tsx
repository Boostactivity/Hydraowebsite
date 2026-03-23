import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Mail, MessageSquare, Bell, TrendingUp, Users, CheckCircle, Clock, Target, BarChart3, Settings } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  status: 'active' | 'paused' | 'completed';
  trigger: string;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  revenue: number;
  emoji: string;
}

interface Automation {
  id: string;
  name: string;
  description: string;
  category: 'welcome' | 'nurture' | 'retention' | 'winback' | 'upsell';
  steps: number;
  active: boolean;
  performance: { label: string; value: string }[];
  emoji: string;
}

export function MarketingAutomation() {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('all');

  const campaigns: Campaign[] = [
    {
      id: '1',
      name: language === 'fr' ? 'Série bienvenue nouveaux leads' : 'Welcome series new leads',
      type: 'email',
      status: 'active',
      trigger: language === 'fr' ? 'Inscription formulaire' : 'Form signup',
      sent: 2340,
      opened: 1872,
      clicked: 936,
      converted: 234,
      revenue: 114660,
      emoji: '👋',
    },
    {
      id: '2',
      name: language === 'fr' ? 'Rappel panier abandonné' : 'Abandoned cart reminder',
      type: 'email',
      status: 'active',
      trigger: language === 'fr' ? 'Panier >30min' : 'Cart >30min',
      sent: 892,
      opened: 623,
      clicked: 312,
      converted: 187,
      revenue: 91630,
      emoji: '🛒',
    },
    {
      id: '3',
      name: language === 'fr' ? 'Notification stock disponible' : 'Back in stock notification',
      type: 'push',
      status: 'active',
      trigger: language === 'fr' ? 'Produit restocké' : 'Product restocked',
      sent: 567,
      opened: 489,
      clicked: 278,
      converted: 123,
      revenue: 60270,
      emoji: '📦',
    },
    {
      id: '4',
      name: language === 'fr' ? 'SMS confirmation commande' : 'SMS order confirmation',
      type: 'sms',
      status: 'active',
      trigger: language === 'fr' ? 'Achat validé' : 'Purchase confirmed',
      sent: 1456,
      opened: 1456,
      clicked: 0,
      converted: 0,
      revenue: 0,
      emoji: '✅',
    },
    {
      id: '5',
      name: language === 'fr' ? 'Renouvellement filtre' : 'Filter renewal',
      type: 'email',
      status: 'active',
      trigger: language === 'fr' ? '5 mois après achat' : '5 months after purchase',
      sent: 734,
      opened: 587,
      clicked: 352,
      converted: 176,
      revenue: 15840,
      emoji: '🔄',
    },
    {
      id: '6',
      name: language === 'fr' ? 'Réactivation clients inactifs' : 'Inactive customer winback',
      type: 'email',
      status: 'active',
      trigger: language === 'fr' ? '6 mois inactif' : '6 months inactive',
      sent: 423,
      opened: 211,
      clicked: 95,
      converted: 38,
      revenue: 18620,
      emoji: '🎁',
    },
  ];

  const automations: Automation[] = [
    {
      id: '1',
      name: language === 'fr' ? 'Onboarding nouveau client' : 'New customer onboarding',
      description: language === 'fr'
        ? 'Séquence automatique de 7 emails sur 30 jours pour maximiser l\'adoption et satisfaction.'
        : 'Automatic 7-email sequence over 30 days to maximize adoption and satisfaction.',
      category: 'welcome',
      steps: 7,
      active: true,
      performance: [
        { label: language === 'fr' ? 'Taux complétion' : 'Completion rate', value: '78%' },
        { label: language === 'fr' ? 'Engagement' : 'Engagement', value: '4.2/5' },
        { label: language === 'fr' ? 'Upsell' : 'Upsell', value: '23%' },
      ],
      emoji: '🚀',
    },
    {
      id: '2',
      name: language === 'fr' ? 'Nurturing leads premium' : 'Premium lead nurturing',
      description: language === 'fr'
        ? 'Programme de nurturing intelligent qui s\'adapte au comportement du lead pour conversion optimale.'
        : 'Intelligent nurturing program that adapts to lead behavior for optimal conversion.',
      category: 'nurture',
      steps: 12,
      active: true,
      performance: [
        { label: language === 'fr' ? 'Lead → Client' : 'Lead → Customer', value: '34%' },
        { label: language === 'fr' ? 'Durée cycle' : 'Cycle time', value: '18 jours' },
        { label: language === 'fr' ? 'Panier moyen' : 'Avg basket', value: '620€' },
      ],
      emoji: '🌱',
    },
    {
      id: '3',
      name: language === 'fr' ? 'Programme fidélité automatique' : 'Automated loyalty program',
      description: language === 'fr'
        ? 'Récompenses automatiques basées sur comportement : points, avantages VIP et surprises personnalisées.'
        : 'Automatic behavior-based rewards: points, VIP benefits and personalized surprises.',
      category: 'retention',
      steps: 15,
      active: true,
      performance: [
        { label: language === 'fr' ? 'Rétention' : 'Retention', value: '+67%' },
        { label: language === 'fr' ? 'LTV' : 'LTV', value: '+89%' },
        { label: language === 'fr' ? 'Référencement' : 'Referrals', value: '+45%' },
      ],
      emoji: '💎',
    },
    {
      id: '4',
      name: language === 'fr' ? 'Récupération clients perdus' : 'Lost customer recovery',
      description: language === 'fr'
        ? 'Stratégie de reconquête en 5 étapes avec offres progressives et incentives personnalisés.'
        : '5-step recovery strategy with progressive offers and personalized incentives.',
      category: 'winback',
      steps: 5,
      active: true,
      performance: [
        { label: language === 'fr' ? 'Réactivation' : 'Reactivation', value: '28%' },
        { label: language === 'fr' ? 'ROI campagne' : 'Campaign ROI', value: '420%' },
        { label: language === 'fr' ? 'Valeur récup' : 'Recovery value', value: '78K€' },
      ],
      emoji: '🔄',
    },
  ];

  const stats = [
    {
      value: '23',
      label: language === 'fr' ? 'Campagnes actives' : 'Active campaigns',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      value: '6 412',
      label: language === 'fr' ? 'Messages envoyés' : 'Messages sent',
      icon: <Mail className="w-5 h-5" />,
    },
    {
      value: '42%',
      label: language === 'fr' ? 'Taux conversion' : 'Conversion rate',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      value: '301K€',
      label: language === 'fr' ? 'Revenue généré' : 'Revenue generated',
      icon: <Target className="w-5 h-5" />,
    },
  ];

  const types = [
    { id: 'all', label: language === 'fr' ? 'Tous' : 'All', count: campaigns.length, icon: <Zap className="w-4 h-4" /> },
    { id: 'email', label: 'Email', count: campaigns.filter(c => c.type === 'email').length, icon: <Mail className="w-4 h-4" /> },
    { id: 'sms', label: 'SMS', count: campaigns.filter(c => c.type === 'sms').length, icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'push', label: 'Push', count: campaigns.filter(c => c.type === 'push').length, icon: <Bell className="w-4 h-4" /> },
  ];

  const filteredCampaigns = selectedType === 'all'
    ? campaigns
    : campaigns.filter(c => c.type === selectedType);

  const formatRevenue = (amount: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateRate = (numerator: number, denominator: number) => {
    return ((numerator / denominator) * 100).toFixed(1) + '%';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Zap className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Automatisation Marketing'}
            {language === 'en' && 'Marketing Automation'}
            {language === 'es' && 'Automatización Marketing'}
            {language === 'it' && 'Automazione Marketing'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Campagnes et workflows automatisés intelligents'}
            {language === 'en' && 'Smart automated campaigns and workflows'}
            {language === 'es' && 'Campañas y workflows automatizados inteligentes'}
            {language === 'it' && 'Campagne e workflow automatizzati intelligenti'}
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

      {/* Type Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedType === type.id
                ? 'bg-[#6B1E3E] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.icon}
            {type.label}
            <span className="text-sm opacity-75">({type.count})</span>
          </button>
        ))}
      </div>

      {/* Campaigns */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Campagnes automatiques'}
          {language === 'en' && 'Automated campaigns'}
          {language === 'es' && 'Campañas automatizadas'}
          {language === 'it' && 'Campagne automatizzate'}
        </h3>

        <div className="space-y-4">
          {filteredCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Emoji */}
                <div className="text-4xl flex-shrink-0">{campaign.emoji}</div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{campaign.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {campaign.trigger}
                        </div>
                        <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                          {language === 'fr' ? 'Actif' : 'Active'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{formatRevenue(campaign.revenue)}</div>
                      <div className="text-xs text-gray-500">{language === 'fr' ? 'Revenue' : 'Revenue'}</div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900 mb-1">{campaign.sent}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Envoyés' : 'Sent'}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900 mb-1">{campaign.opened}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Ouverts' : 'Opened'}</div>
                      <div className="text-xs text-purple-600 font-semibold mt-1">
                        {calculateRate(campaign.opened, campaign.sent)}
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900 mb-1">{campaign.clicked}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Clics' : 'Clicked'}</div>
                      <div className="text-xs text-orange-600 font-semibold mt-1">
                        {calculateRate(campaign.clicked, campaign.opened || 1)}
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900 mb-1">{campaign.converted}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Conversions' : 'Converted'}</div>
                      <div className="text-xs text-green-600 font-semibold mt-1">
                        {calculateRate(campaign.converted, campaign.sent)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Automations */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Workflows automatisés'}
          {language === 'en' && 'Automated workflows'}
          {language === 'es' && 'Workflows automatizados'}
          {language === 'it' && 'Workflow automatizzati'}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {automations.map((automation, index) => (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{automation.emoji}</div>
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                  {automation.steps} {language === 'fr' ? 'étapes' : 'steps'}
                </div>
              </div>

              <h4 className="font-bold text-xl mb-2">{automation.name}</h4>
              <p className="text-sm opacity-90 mb-4">{automation.description}</p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="grid grid-cols-3 gap-3">
                  {automation.performance.map((perf, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold mb-1">{perf.value}</div>
                      <div className="text-xs opacity-75">{perf.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-8 text-white text-center">
        <Zap className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Automatisation intelligente 24/7'}
          {language === 'en' && 'Smart 24/7 automation'}
          {language === 'es' && 'Automatización inteligente 24/7'}
          {language === 'it' && 'Automazione intelligente 24/7'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && '23 campagnes actives • 6 412 messages/mois • 42% taux conversion • 301K€ revenue généré automatiquement'}
          {language === 'en' && '23 active campaigns • 6,412 messages/month • 42% conversion rate • €301K revenue generated automatically'}
          {language === 'es' && '23 campañas activas • 6,412 mensajes/mes • 42% tasa conversión • 301K€ revenue generado automáticamente'}
          {language === 'it' && '23 campagne attive • 6,412 messaggi/mese • 42% tasso conversione • 301K€ revenue generato automaticamente'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {language === 'fr' && 'Configurer automation'}
            {language === 'en' && 'Configure automation'}
            {language === 'es' && 'Configurar automatización'}
            {language === 'it' && 'Configura automazione'}
          </button>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {language === 'fr' && 'Voir analytics'}
            {language === 'en' && 'View analytics'}
            {language === 'es' && 'Ver analytics'}
            {language === 'it' && 'Vedi analytics'}
          </button>
        </div>
      </div>
    </div>
  );
}
