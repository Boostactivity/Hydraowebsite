import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, TrendingDown, Droplet, Zap, DollarSign, Award, Calendar, Clock, Target } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface UsageMetric {
  id: string;
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

interface TimeSeriesData {
  period: string;
  water: number;
  energy: number;
  savings: number;
}

export function UsageAnalytics() {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week');

  const metrics: UsageMetric[] = [
    {
      id: '1',
      name: language === 'fr' ? 'Consommation eau' : 'Water consumption',
      value: '234L',
      change: -23,
      trend: 'down',
      icon: <Droplet className="w-5 h-5" />,
      color: 'blue',
    },
    {
      id: '2',
      name: language === 'fr' ? 'Énergie utilisée' : 'Energy used',
      value: '12.4 kWh',
      change: -18,
      trend: 'down',
      icon: <Zap className="w-5 h-5" />,
      color: 'yellow',
    },
    {
      id: '3',
      name: language === 'fr' ? 'Économies réalisées' : 'Savings achieved',
      value: '47€',
      change: +34,
      trend: 'up',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'green',
    },
    {
      id: '4',
      name: language === 'fr' ? 'Score efficacité' : 'Efficiency score',
      value: '92/100',
      change: +8,
      trend: 'up',
      icon: <Award className="w-5 h-5" />,
      color: 'purple',
    },
  ];

  const timeSeriesData: TimeSeriesData[] = [
    { period: language === 'fr' ? 'Lun' : 'Mon', water: 32, energy: 1.8, savings: 6.4 },
    { period: language === 'fr' ? 'Mar' : 'Tue', water: 28, energy: 1.6, savings: 7.2 },
    { period: language === 'fr' ? 'Mer' : 'Wed', water: 35, energy: 2.0, savings: 5.8 },
    { period: language === 'fr' ? 'Jeu' : 'Thu', water: 30, energy: 1.7, savings: 6.8 },
    { period: language === 'fr' ? 'Ven' : 'Fri', water: 38, energy: 2.2, savings: 5.2 },
    { period: language === 'fr' ? 'Sam' : 'Sat', water: 42, energy: 2.4, savings: 4.8 },
    { period: language === 'fr' ? 'Dim' : 'Sun', water: 29, energy: 1.7, savings: 7.1 },
  ];

  const insights = [
    {
      id: '1',
      title: language === 'fr' ? 'Pic de consommation matinal' : 'Morning consumption peak',
      description: language === 'fr'
        ? 'Votre consommation est 34% plus élevée entre 7h-9h. Optimisez en programmant le préchauffage.'
        : 'Your consumption is 34% higher between 7am-9am. Optimize by programming preheating.',
      impact: language === 'fr' ? 'Économie potentielle: 8€/mois' : 'Potential saving: €8/month',
      icon: <Clock className="w-5 h-5" />,
      color: 'orange',
    },
    {
      id: '2',
      title: language === 'fr' ? 'Performance filtre excellente' : 'Excellent filter performance',
      description: language === 'fr'
        ? 'Votre filtre maintient 98% d\'efficacité. Changement recommandé dans 67 jours.'
        : 'Your filter maintains 98% efficiency. Change recommended in 67 days.',
      impact: language === 'fr' ? 'Durée de vie optimale' : 'Optimal lifespan',
      icon: <Award className="w-5 h-5" />,
      color: 'green',
    },
    {
      id: '3',
      title: language === 'fr' ? 'Comparaison voisins' : 'Neighbor comparison',
      description: language === 'fr'
        ? 'Vous consommez 23% moins que la moyenne de votre quartier. Excellent travail !'
        : 'You consume 23% less than your neighborhood average. Excellent work!',
      impact: language === 'fr' ? 'Top 15% utilisateurs' : 'Top 15% users',
      icon: <TrendingDown className="w-5 h-5" />,
      color: 'blue',
    },
  ];

  const goals = [
    {
      id: '1',
      name: language === 'fr' ? 'Objectif eau mensuel' : 'Monthly water goal',
      current: 234,
      target: 200,
      progress: 85,
      unit: 'L',
    },
    {
      id: '2',
      name: language === 'fr' ? 'Objectif économies' : 'Savings goal',
      current: 47,
      target: 60,
      progress: 78,
      unit: '€',
    },
    {
      id: '3',
      name: language === 'fr' ? 'Score efficacité' : 'Efficiency score',
      current: 92,
      target: 95,
      progress: 97,
      unit: '/100',
    },
  ];

  const stats = [
    {
      value: '234L',
      label: language === 'fr' ? 'Eau cette semaine' : 'Water this week',
      icon: <Droplet className="w-5 h-5" />,
    },
    {
      value: '12.4kWh',
      label: language === 'fr' ? 'Énergie' : 'Energy',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      value: '47€',
      label: language === 'fr' ? 'Économies' : 'Savings',
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      value: '92/100',
      label: language === 'fr' ? 'Score' : 'Score',
      icon: <Award className="w-5 h-5" />,
    },
  ];

  const maxWater = Math.max(...timeSeriesData.map(d => d.water));

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Analytics Usage'}
            {language === 'en' && 'Usage Analytics'}
            {language === 'es' && 'Analytics Uso'}
            {language === 'it' && 'Analytics Utilizzo'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Suivez et optimisez votre consommation'}
            {language === 'en' && 'Track and optimize your consumption'}
            {language === 'es' && 'Rastrea y optimiza tu consumo'}
            {language === 'it' && 'Traccia e ottimizza il tuo consumo'}
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

      {/* Key Metrics */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Métriques clés'}
          {language === 'en' && 'Key metrics'}
          {language === 'es' && 'Métricas clave'}
          {language === 'it' && 'Metriche chiave'}
        </h3>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 rounded-xl p-4 border-2 border-${metric.color}-200`}
            >
              <div className={`w-10 h-10 bg-${metric.color}-200 rounded-full flex items-center justify-center text-${metric.color}-700 mb-3`}>
                {metric.icon}
              </div>

              <div className="text-sm text-gray-600 mb-1">{metric.name}</div>
              <div className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</div>

              <div className="flex items-center gap-1">
                {metric.trend === 'down' && metric.change < 0 && (
                  <TrendingDown className="w-4 h-4 text-green-600" />
                )}
                {metric.trend === 'up' && metric.change > 0 && (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                )}
                <span className={`text-sm font-semibold ${
                  Math.abs(metric.change) > 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Time Series Chart */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl text-gray-900">
            {language === 'fr' && 'Consommation hebdomadaire'}
            {language === 'en' && 'Weekly consumption'}
            {language === 'es' && 'Consumo semanal'}
            {language === 'it' && 'Consumo settimanale'}
          </h3>

          <div className="flex gap-2">
            {['week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {period === 'week' && (language === 'fr' ? 'Semaine' : 'Week')}
                {period === 'month' && (language === 'fr' ? 'Mois' : 'Month')}
                {period === 'year' && (language === 'fr' ? 'Année' : 'Year')}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {timeSeriesData.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4"
            >
              <div className="w-16 text-sm font-semibold text-gray-700">{data.period}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-full bg-white rounded-full h-8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.water / maxWater) * 100}%` }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-end pr-2"
                    >
                      <span className="text-white text-xs font-bold">{data.water}L</span>
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="w-20 text-right">
                <div className="text-sm font-semibold text-green-600">+{data.savings}€</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Insights IA personnalisés'}
          {language === 'en' && 'Personalized AI insights'}
          {language === 'es' && 'Insights IA personalizados'}
          {language === 'it' && 'Insights IA personalizzati'}
        </h3>

        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br from-${insight.color}-50 to-${insight.color}-100 rounded-xl p-6 border-2 border-${insight.color}-200`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-${insight.color}-200 rounded-full flex items-center justify-center text-${insight.color}-700 flex-shrink-0`}>
                  {insight.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <div className={`bg-${insight.color}-500 text-white text-sm font-semibold px-4 py-2 rounded-full inline-block`}>
                    {insight.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Objectifs du mois'}
          {language === 'en' && 'Monthly goals'}
          {language === 'es' && 'Objetivos del mes'}
          {language === 'it' && 'Obiettivi del mese'}
        </h3>

        <div className="space-y-4">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-semibold text-gray-900">{goal.name}</div>
                  <div className="text-sm text-gray-600">
                    {goal.current}{goal.unit} / {goal.target}{goal.unit}
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-600">{goal.progress}%</div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-8 text-white text-center">
        <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Analytics avancés en temps réel'}
          {language === 'en' && 'Advanced real-time analytics'}
          {language === 'es' && 'Analytics avanzados en tiempo real'}
          {language === 'it' && 'Analytics avanzati in tempo reale'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && 'Suivez chaque détail • Insights IA personnalisés • Optimisation automatique • Objectifs intelligents'}
          {language === 'en' && 'Track every detail • Personalized AI insights • Automatic optimization • Smart goals'}
          {language === 'es' && 'Rastrea cada detalle • Insights IA personalizados • Optimización automática • Objetivos inteligentes'}
          {language === 'it' && 'Traccia ogni dettaglio • Insights IA personalizzati • Ottimizzazione automatica • Obiettivi intelligenti'}
        </p>

        <button className="px-8 py-4 bg-white text-[#6B1E3E] rounded-lg font-bold hover:bg-gray-100 transition-colors">
          {language === 'fr' && 'Voir dashboard complet'}
          {language === 'en' && 'View full dashboard'}
          {language === 'es' && 'Ver dashboard completo'}
          {language === 'it' && 'Vedi dashboard completo'}
        </button>
      </div>
    </div>
  );
}
