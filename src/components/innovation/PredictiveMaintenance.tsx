import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wrench, AlertTriangle, CheckCircle, Clock, TrendingUp, Shield, Zap, Calendar, Award } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface MaintenanceAlert {
  id: string;
  type: 'filter' | 'cleaning' | 'calibration' | 'inspection';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  dueDate: string;
  prediction: number;
  impact: string;
  emoji: string;
}

interface HealthMetric {
  id: string;
  component: string;
  health: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  nextMaintenance: string;
  icon: React.ReactNode;
  color: string;
}

export function PredictiveMaintenance() {
  const { language } = useLanguage();

  const alerts: MaintenanceAlert[] = [
    {
      id: '1',
      type: 'filter',
      priority: 'medium',
      title: language === 'fr' ? 'Changement filtre recommandé' : 'Filter change recommended',
      description: language === 'fr'
        ? 'Votre filtre atteindra 10% d\'efficacité dans 14 jours. Commandez maintenant pour livraison optimale.'
        : 'Your filter will reach 10% efficiency in 14 days. Order now for optimal delivery.',
      dueDate: '14 jours',
      prediction: 94,
      impact: language === 'fr' ? 'Performance -15%' : 'Performance -15%',
      emoji: '🔵',
    },
    {
      id: '2',
      type: 'cleaning',
      priority: 'low',
      title: language === 'fr' ? 'Nettoyage préventif' : 'Preventive cleaning',
      description: language === 'fr'
        ? 'L\'IA détecte une accumulation légère de calcaire. Un nettoyage préventif prolongera la durée de vie.'
        : 'AI detects slight limescale buildup. Preventive cleaning will extend lifespan.',
      dueDate: '30 jours',
      prediction: 78,
      impact: language === 'fr' ? 'Durée de vie +20%' : 'Lifespan +20%',
      emoji: '🧼',
    },
    {
      id: '3',
      type: 'calibration',
      priority: 'low',
      title: language === 'fr' ? 'Calibration capteurs' : 'Sensor calibration',
      description: language === 'fr'
        ? 'Recalibrage automatique des capteurs de température prévu dans 45 jours pour précision optimale.'
        : 'Automatic temperature sensor recalibration scheduled in 45 days for optimal accuracy.',
      dueDate: '45 jours',
      prediction: 89,
      impact: language === 'fr' ? 'Précision +5%' : 'Accuracy +5%',
      emoji: '🎯',
    },
  ];

  const healthMetrics: HealthMetric[] = [
    {
      id: '1',
      component: language === 'fr' ? 'Système filtration' : 'Filtration system',
      health: 67,
      status: 'good',
      nextMaintenance: language === 'fr' ? '14 jours' : '14 days',
      icon: <Wrench className="w-5 h-5" />,
      color: 'blue',
    },
    {
      id: '2',
      component: language === 'fr' ? 'Capteurs température' : 'Temperature sensors',
      health: 95,
      status: 'excellent',
      nextMaintenance: language === 'fr' ? '45 jours' : '45 days',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'green',
    },
    {
      id: '3',
      component: language === 'fr' ? 'Pompe & valves' : 'Pump & valves',
      health: 88,
      status: 'excellent',
      nextMaintenance: language === 'fr' ? '90 jours' : '90 days',
      icon: <Shield className="w-5 h-5" />,
      color: 'emerald',
    },
    {
      id: '4',
      component: language === 'fr' ? 'Connectivité IoT' : 'IoT connectivity',
      health: 99,
      status: 'excellent',
      nextMaintenance: language === 'fr' ? 'Auto' : 'Auto',
      icon: <Zap className="w-5 h-5" />,
      color: 'purple',
    },
  ];

  const stats = [
    {
      value: '99.2%',
      label: language === 'fr' ? 'Précision prédiction' : 'Prediction accuracy',
      icon: <Award className="w-5 h-5" />,
    },
    {
      value: '87%',
      label: language === 'fr' ? 'Pannes évitées' : 'Failures avoided',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      value: '-340€',
      label: language === 'fr' ? 'Coûts économisés' : 'Costs saved',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      value: '3.2 ans',
      label: language === 'fr' ? 'Durée vie +' : 'Lifespan +',
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'yellow';
      case 'low': return 'blue';
      default: return 'gray';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return language === 'fr' ? 'Critique' : 'Critical';
      case 'high': return language === 'fr' ? 'Élevée' : 'High';
      case 'medium': return language === 'fr' ? 'Moyenne' : 'Medium';
      case 'low': return language === 'fr' ? 'Faible' : 'Low';
      default: return priority;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'green';
    if (health >= 70) return 'blue';
    if (health >= 50) return 'yellow';
    return 'red';
  };

  const getHealthLabel = (status: string) => {
    switch (status) {
      case 'excellent': return language === 'fr' ? 'Excellent' : 'Excellent';
      case 'good': return language === 'fr' ? 'Bon' : 'Good';
      case 'fair': return language === 'fr' ? 'Correct' : 'Fair';
      case 'poor': return language === 'fr' ? 'Faible' : 'Poor';
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <Wrench className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Maintenance Prédictive'}
            {language === 'en' && 'Predictive Maintenance'}
            {language === 'es' && 'Mantenimiento Predictivo'}
            {language === 'it' && 'Manutenzione Predittiva'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'L\'IA anticipe les besoins avant les pannes'}
            {language === 'en' && 'AI anticipates needs before failures'}
            {language === 'es' && 'La IA anticipa necesidades antes de fallos'}
            {language === 'it' && 'L\'IA anticipa i bisogni prima dei guasti'}
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
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200"
          >
            <div className="flex items-center gap-2 mb-2 text-orange-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Health Metrics */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Santé des composants'}
          {language === 'en' && 'Component health'}
          {language === 'es' && 'Salud componentes'}
          {language === 'it' && 'Salute componenti'}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 rounded-xl p-6 border-2 border-${metric.color}-200`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${metric.color}-200 rounded-full flex items-center justify-center text-${metric.color}-700`}>
                  {metric.icon}
                </div>
                <div className={`bg-${getHealthColor(metric.health)}-500 text-white text-sm font-bold px-3 py-1 rounded-full`}>
                  {getHealthLabel(metric.status)}
                </div>
              </div>

              <h4 className="font-bold text-lg text-gray-900 mb-3">{metric.component}</h4>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">
                    {language === 'fr' ? 'État de santé' : 'Health status'}
                  </span>
                  <span className="font-bold text-gray-900">{metric.health}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.health}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className={`bg-gradient-to-r from-${getHealthColor(metric.health)}-500 to-${getHealthColor(metric.health)}-600 h-3 rounded-full`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {language === 'fr' ? 'Prochain entretien :' : 'Next maintenance:'} <span className="font-semibold text-gray-900">{metric.nextMaintenance}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Maintenance Alerts */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Alertes maintenance'}
          {language === 'en' && 'Maintenance alerts'}
          {language === 'es' && 'Alertas mantenimiento'}
          {language === 'it' && 'Avvisi manutenzione'}
        </h3>

        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Emoji & Priority */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="text-5xl">{alert.emoji}</div>
                  <div className={`bg-${getPriorityColor(alert.priority)}-100 text-${getPriorityColor(alert.priority)}-700 text-xs font-bold px-3 py-1 rounded-full`}>
                    {getPriorityLabel(alert.priority)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{alert.description}</p>

                  <div className="grid md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="text-xs text-gray-600 mb-1">
                        {language === 'fr' ? 'Échéance' : 'Due date'}
                      </div>
                      <div className="font-bold text-gray-900">{alert.dueDate}</div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                      <div className="text-xs text-gray-600 mb-1">
                        {language === 'fr' ? 'Fiabilité prédiction' : 'Prediction confidence'}
                      </div>
                      <div className="font-bold text-gray-900">{alert.prediction}%</div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="text-xs text-gray-600 mb-1">
                        {language === 'fr' ? 'Impact' : 'Impact'}
                      </div>
                      <div className="font-bold text-gray-900">{alert.impact}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                      {language === 'fr' && 'Planifier maintenance'}
                      {language === 'en' && 'Schedule maintenance'}
                      {language === 'es' && 'Programar mantenimiento'}
                      {language === 'it' && 'Programma manutenzione'}
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                      {language === 'fr' && 'Plus tard'}
                      {language === 'en' && 'Later'}
                      {language === 'es' && 'Más tarde'}
                      {language === 'it' && 'Più tardi'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Bénéfices maintenance prédictive'}
          {language === 'en' && 'Predictive maintenance benefits'}
          {language === 'es' && 'Beneficios mantenimiento predictivo'}
          {language === 'it' && 'Benefici manutenzione predittiva'}
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="font-bold text-gray-900 mb-1">
              {language === 'fr' ? '87% pannes évitées' : '87% failures avoided'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Anticipation avant problème' : 'Anticipation before issue'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">💰</div>
            <div className="font-bold text-gray-900 mb-1">
              {language === 'fr' ? '-340€ économisés' : '-€340 saved'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Réparations d\'urgence évitées' : 'Emergency repairs avoided'}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="font-bold text-gray-900 mb-1">
              {language === 'fr' ? '+3.2 ans durée vie' : '+3.2 years lifespan'}
            </div>
            <div className="text-sm text-gray-600">
              {language === 'fr' ? 'Maintenance optimale' : 'Optimal maintenance'}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-orange-600 rounded-xl p-8 text-white text-center">
        <Wrench className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Maintenance intelligente par IA'}
          {language === 'en' && 'AI-powered smart maintenance'}
          {language === 'es' && 'Mantenimiento inteligente por IA'}
          {language === 'it' && 'Manutenzione intelligente con IA'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && '99.2% précision • 87% pannes évitées • -340€ coûts • +3.2 ans durée vie • Zéro stress'}
          {language === 'en' && '99.2% accuracy • 87% failures avoided • -€340 costs • +3.2 years lifespan • Zero stress'}
          {language === 'es' && '99.2% precisión • 87% fallos evitados • -340€ costes • +3.2 años vida • Cero estrés'}
          {language === 'it' && '99.2% precisione • 87% guasti evitati • -340€ costi • +3.2 anni vita • Zero stress'}
        </p>

        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Prédiction IA' : 'AI prediction'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Alertes proactives' : 'Proactive alerts'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Auto-diagnostic' : 'Self-diagnostic'}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold">
            {language === 'fr' ? 'Optimisation continue' : 'Continuous optimization'}
          </div>
        </div>
      </div>
    </div>
  );
}
