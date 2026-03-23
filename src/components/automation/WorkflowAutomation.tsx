import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Workflow, CheckCircle, Clock, Users, Zap, TrendingUp, Award, Play, Pause, Settings, BarChart3 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'support' | 'upsell' | 'retention' | 'billing';
  status: 'active' | 'paused';
  triggers: string[];
  steps: number;
  executed: number;
  successRate: number;
  timeSaved: string;
  emoji: string;
}

interface WorkflowStep {
  id: number;
  type: 'trigger' | 'wait' | 'action' | 'condition' | 'end';
  description: string;
  icon: React.ReactNode;
  color: string;
}

export function WorkflowAutomation() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const workflows: WorkflowItem[] = [
    {
      id: '1',
      name: language === 'fr' ? 'Onboarding nouveau client' : 'New customer onboarding',
      description: language === 'fr'
        ? 'Séquence automatique de 14 jours : emails de bienvenue, guides installation, astuces d\'utilisation et check-ins proactifs.'
        : '14-day automatic sequence: welcome emails, installation guides, usage tips and proactive check-ins.',
      category: 'onboarding',
      status: 'active',
      triggers: [
        language === 'fr' ? 'Achat validé' : 'Purchase confirmed',
        language === 'fr' ? 'Compte créé' : 'Account created',
      ],
      steps: 12,
      executed: 1456,
      successRate: 89,
      timeSaved: '340h',
      emoji: '🚀',
    },
    {
      id: '2',
      name: language === 'fr' ? 'Support proactif filtre' : 'Proactive filter support',
      description: language === 'fr'
        ? 'Notifications automatiques avant expiration filtre, rappels changement et offres de renouvellement personnalisées.'
        : 'Automatic notifications before filter expiration, change reminders and personalized renewal offers.',
      category: 'support',
      status: 'active',
      triggers: [
        language === 'fr' ? 'J-30 expiration' : 'D-30 expiration',
        language === 'fr' ? 'J-7 expiration' : 'D-7 expiration',
        language === 'fr' ? 'Expiration' : 'Expiration',
      ],
      steps: 8,
      executed: 2340,
      successRate: 76,
      timeSaved: '580h',
      emoji: '🔔',
    },
    {
      id: '3',
      name: language === 'fr' ? 'Upsell abonnement premium' : 'Premium subscription upsell',
      description: language === 'fr'
        ? 'Détection usage intensif et proposition automatique upgrade vers abonnement premium avec bénéfices personnalisés.'
        : 'Heavy usage detection and automatic premium upgrade proposal with personalized benefits.',
      category: 'upsell',
      status: 'active',
      triggers: [
        language === 'fr' ? 'Usage >80%' : 'Usage >80%',
        language === 'fr' ? '3 mois client' : '3 months customer',
      ],
      steps: 7,
      executed: 567,
      successRate: 42,
      timeSaved: '120h',
      emoji: '⬆️',
    },
    {
      id: '4',
      name: language === 'fr' ? 'Rétention clients à risque' : 'At-risk customer retention',
      description: language === 'fr'
        ? 'Identification automatique clients à risque et déclenchement séquence de rétention avec incentives progressifs.'
        : 'Automatic at-risk customer identification and retention sequence trigger with progressive incentives.',
      category: 'retention',
      status: 'active',
      triggers: [
        language === 'fr' ? 'Usage -50%' : 'Usage -50%',
        language === 'fr' ? 'NPS <7' : 'NPS <7',
        language === 'fr' ? 'Support -2 tickets' : 'Support -2 tickets',
      ],
      steps: 9,
      executed: 234,
      successRate: 68,
      timeSaved: '180h',
      emoji: '💚',
    },
    {
      id: '5',
      name: language === 'fr' ? 'Facturation automatique' : 'Automated billing',
      description: language === 'fr'
        ? 'Gestion complète cycle facturation : génération, envoi, relances impayés et mise à jour statut automatique.'
        : 'Complete billing cycle management: generation, sending, payment reminders and automatic status updates.',
      category: 'billing',
      status: 'active',
      triggers: [
        language === 'fr' ? 'Date facturation' : 'Billing date',
        language === 'fr' ? 'J+7 impayé' : 'D+7 unpaid',
        language === 'fr' ? 'J+14 impayé' : 'D+14 unpaid',
      ],
      steps: 10,
      executed: 3240,
      successRate: 94,
      timeSaved: '890h',
      emoji: '💳',
    },
  ];

  const exampleSteps: WorkflowStep[] = [
    {
      id: 1,
      type: 'trigger',
      description: language === 'fr' ? 'Déclencheur : Achat validé' : 'Trigger: Purchase confirmed',
      icon: <Play className="w-5 h-5" />,
      color: 'green',
    },
    {
      id: 2,
      type: 'action',
      description: language === 'fr' ? 'Envoyer email bienvenue' : 'Send welcome email',
      icon: <Zap className="w-5 h-5" />,
      color: 'blue',
    },
    {
      id: 3,
      type: 'wait',
      description: language === 'fr' ? 'Attendre 24 heures' : 'Wait 24 hours',
      icon: <Clock className="w-5 h-5" />,
      color: 'orange',
    },
    {
      id: 4,
      type: 'action',
      description: language === 'fr' ? 'Envoyer guide installation' : 'Send installation guide',
      icon: <Zap className="w-5 h-5" />,
      color: 'blue',
    },
    {
      id: 5,
      type: 'wait',
      description: language === 'fr' ? 'Attendre 3 jours' : 'Wait 3 days',
      icon: <Clock className="w-5 h-5" />,
      color: 'orange',
    },
    {
      id: 6,
      type: 'condition',
      description: language === 'fr' ? 'Produit activé ?' : 'Product activated?',
      icon: <Award className="w-5 h-5" />,
      color: 'purple',
    },
    {
      id: 7,
      type: 'action',
      description: language === 'fr' ? 'Envoyer astuces utilisation' : 'Send usage tips',
      icon: <Zap className="w-5 h-5" />,
      color: 'blue',
    },
    {
      id: 8,
      type: 'end',
      description: language === 'fr' ? 'Workflow terminé' : 'Workflow completed',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'green',
    },
  ];

  const stats = [
    {
      value: '47',
      label: language === 'fr' ? 'Workflows actifs' : 'Active workflows',
      icon: <Workflow className="w-5 h-5" />,
    },
    {
      value: '7 837',
      label: language === 'fr' ? 'Exécutions/mois' : 'Executions/month',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      value: '2 110h',
      label: language === 'fr' ? 'Temps économisé' : 'Time saved',
      icon: <Clock className="w-5 h-5" />,
    },
    {
      value: '86%',
      label: language === 'fr' ? 'Taux succès' : 'Success rate',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const categories = [
    { id: 'all', label: language === 'fr' ? 'Tous' : 'All', count: workflows.length },
    { id: 'onboarding', label: 'Onboarding', count: workflows.filter(w => w.category === 'onboarding').length },
    { id: 'support', label: 'Support', count: workflows.filter(w => w.category === 'support').length },
    { id: 'upsell', label: 'Upsell', count: workflows.filter(w => w.category === 'upsell').length },
    { id: 'retention', label: language === 'fr' ? 'Rétention' : 'Retention', count: workflows.filter(w => w.category === 'retention').length },
    { id: 'billing', label: 'Billing', count: workflows.filter(w => w.category === 'billing').length },
  ];

  const filteredWorkflows = selectedCategory === 'all'
    ? workflows
    : workflows.filter(w => w.category === selectedCategory);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <Workflow className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Automatisation Workflows'}
            {language === 'en' && 'Workflow Automation'}
            {language === 'es' && 'Automatización Workflows'}
            {language === 'it' && 'Automazione Workflow'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Processus clients automatisés de bout en bout'}
            {language === 'en' && 'End-to-end automated customer processes'}
            {language === 'es' && 'Procesos clientes automatizados de extremo a extremo'}
            {language === 'it' && 'Processi clienti automatizzati end-to-end'}
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

      {/* Workflows */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Workflows automatisés'}
          {language === 'en' && 'Automated workflows'}
          {language === 'es' && 'Workflows automatizados'}
          {language === 'it' && 'Workflow automatizzati'}
        </h3>

        <div className="space-y-4">
          {filteredWorkflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all p-6"
            >
              <div className="flex items-start gap-4">
                {/* Emoji & Status */}
                <div className="flex flex-col items-center gap-2">
                  <div className="text-5xl">{workflow.emoji}</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    workflow.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {workflow.status === 'active' 
                      ? (language === 'fr' ? 'Actif' : 'Active')
                      : (language === 'fr' ? 'Pausé' : 'Paused')
                    }
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{workflow.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>

                  {/* Triggers */}
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">
                      {language === 'fr' ? 'Déclencheurs' : 'Triggers'}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {workflow.triggers.map((trigger, i) => (
                        <div key={i} className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1 rounded-full border border-purple-200">
                          {trigger}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">{workflow.steps}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Étapes' : 'Steps'}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">{workflow.executed}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Exécutions' : 'Executions'}</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">{workflow.successRate}%</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Succès' : 'Success'}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-gray-900">{workflow.timeSaved}</div>
                      <div className="text-xs text-gray-600">{language === 'fr' ? 'Économisé' : 'Saved'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Example Workflow Visual */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Exemple : Workflow onboarding'}
          {language === 'en' && 'Example: Onboarding workflow'}
          {language === 'es' && 'Ejemplo: Workflow onboarding'}
          {language === 'it' && 'Esempio: Workflow onboarding'}
        </h3>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200">
          <div className="space-y-3">
            {exampleSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                {/* Step Number & Icon */}
                <div className={`w-12 h-12 bg-${step.color}-100 rounded-full flex items-center justify-center text-${step.color}-700 flex-shrink-0`}>
                  {step.icon}
                </div>

                {/* Step Description */}
                <div className={`flex-1 bg-${step.color}-50 rounded-lg p-4 border-2 border-${step.color}-200`}>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{step.description}</div>
                    <div className="text-sm text-gray-500">#{step.id}</div>
                  </div>
                </div>

                {/* Arrow */}
                {index < exampleSteps.length - 1 && (
                  <div className="text-gray-400">↓</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#6B1E3E] to-blue-600 rounded-xl p-8 text-white text-center">
        <Workflow className="w-12 h-12 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-2xl mb-3">
          {language === 'fr' && 'Automatisation complète 24/7'}
          {language === 'en' && 'Full 24/7 automation'}
          {language === 'es' && 'Automatización completa 24/7'}
          {language === 'it' && 'Automazione completa 24/7'}
        </h3>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          {language === 'fr' && '47 workflows actifs • 7 837 exécutions/mois • 2 110h économisées • 86% taux succès'}
          {language === 'en' && '47 active workflows • 7,837 executions/month • 2,110h saved • 86% success rate'}
          {language === 'es' && '47 workflows activos • 7,837 ejecuciones/mes • 2,110h ahorradas • 86% tasa éxito'}
          {language === 'it' && '47 workflow attivi • 7,837 esecuzioni/mese • 2,110h risparmiate • 86% tasso successo'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {language === 'fr' && 'Créer workflow'}
            {language === 'en' && 'Create workflow'}
            {language === 'es' && 'Crear workflow'}
            {language === 'it' && 'Crea workflow'}
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
