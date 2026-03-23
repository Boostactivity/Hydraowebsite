import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Zap,
  Target,
  Calendar
} from 'lucide-react';

interface FunnelStep {
  id: string;
  name: string;
  icon: React.ElementType;
  visitors: number;
  dropoff: number;
  dropoffRate: number;
  conversionRate: number;
  avgTime: number;
  color: string;
}

export function FunnelAnalytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock funnel data
  const funnelSteps: FunnelStep[] = [
    {
      id: 'landing',
      name: 'Page d\'accueil',
      icon: Eye,
      visitors: 50000,
      dropoff: 0,
      dropoffRate: 0,
      conversionRate: 100,
      avgTime: 45,
      color: 'blue'
    },
    {
      id: 'product',
      name: 'Page produit',
      icon: MousePointer,
      visitors: 35000,
      dropoff: 15000,
      dropoffRate: 30,
      conversionRate: 70,
      avgTime: 120,
      color: 'purple'
    },
    {
      id: 'calculator',
      name: 'Calculateur ROI',
      icon: Target,
      visitors: 22000,
      dropoff: 13000,
      dropoffRate: 37.1,
      conversionRate: 44,
      avgTime: 180,
      color: 'pink'
    },
    {
      id: 'cart',
      name: 'Panier',
      icon: ShoppingCart,
      visitors: 8500,
      dropoff: 13500,
      dropoffRate: 61.4,
      conversionRate: 17,
      avgTime: 90,
      color: 'orange'
    },
    {
      id: 'checkout',
      name: 'Paiement',
      icon: CreditCard,
      visitors: 3200,
      dropoff: 5300,
      dropoffRate: 62.4,
      conversionRate: 6.4,
      avgTime: 240,
      color: 'red'
    },
    {
      id: 'confirmation',
      name: 'Confirmation',
      icon: CheckCircle,
      visitors: 2400,
      dropoff: 800,
      dropoffRate: 25,
      conversionRate: 4.8,
      avgTime: 30,
      color: 'green'
    }
  ];

  const overallStats = {
    totalVisitors: funnelSteps[0].visitors,
    totalConversions: funnelSteps[funnelSteps.length - 1].visitors,
    conversionRate: ((funnelSteps[funnelSteps.length - 1].visitors / funnelSteps[0].visitors) * 100).toFixed(2),
    avgTimeToConversion: 11.5 // minutes
  };

  // Critical drop-off points
  const criticalDropoffs = funnelSteps
    .filter(step => step.dropoffRate > 50)
    .sort((a, b) => b.dropoffRate - a.dropoffRate);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              Funnel Analytics
            </motion.h1>
            <p className="text-gray-600">
              Analysez le parcours client et identifiez les points de friction
            </p>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-200">
            {[
              { value: '7d', label: '7 jours' },
              { value: '30d', label: '30 jours' },
              { value: '90d', label: '90 jours' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value as any)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  timeRange === option.value
                    ? 'bg-[#6B1E3E] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Visiteurs totaux</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {overallStats.totalVisitors.toLocaleString()}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Conversions</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {overallStats.totalConversions.toLocaleString()}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Taux conversion</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {overallStats.conversionRate}%
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-600">Temps moy. conversion</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {overallStats.avgTimeToConversion} min
            </div>
          </motion.div>
        </div>

        {/* Funnel Visualization */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Entonnoir de conversion
          </h2>

          <div className="space-y-6">
            {funnelSteps.map((step, index) => {
              const isLast = index === funnelSteps.length - 1;
              const width = (step.visitors / funnelSteps[0].visitors) * 100;
              
              return (
                <div key={step.id}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Step Bar */}
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-3 w-64">
                        <div className={`w-12 h-12 rounded-full bg-${step.color}-100 flex items-center justify-center`}>
                          <step.icon className={`w-6 h-6 text-${step.color}-600`} />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{step.name}</div>
                          <div className="text-sm text-gray-500">{step.avgTime}s moy.</div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${width}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                            className={`h-full bg-gradient-to-r from-${step.color}-400 to-${step.color}-600 flex items-center justify-end pr-4`}
                          >
                            <div className="text-white font-bold text-lg">
                              {step.visitors.toLocaleString()}
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      <div className="w-32 text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {step.conversionRate}%
                        </div>
                        <div className="text-sm text-gray-500">du total</div>
                      </div>
                    </div>

                    {/* Drop-off indicator */}
                    {!isLast && step.dropoff > 0 && (
                      <div className="flex items-center gap-3 ml-80 mb-3">
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          step.dropoffRate > 50
                            ? 'bg-red-100 text-red-700'
                            : step.dropoffRate > 30
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          <TrendingDown className="w-4 h-4" />
                          <span>-{step.dropoff.toLocaleString()} visiteurs ({step.dropoffRate}%)</span>
                        </div>
                        {step.dropoffRate > 50 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm font-semibold">Point critique</span>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Critical Drop-off Points */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            Points critiques de friction
          </h2>

          <div className="space-y-4">
            {criticalDropoffs.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-red-50 border-2 border-red-200 rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-900">{step.name}</h3>
                      <p className="text-red-700">Perte de {step.dropoffRate}% des visiteurs</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-900">
                      -{step.dropoff.toLocaleString()}
                    </div>
                    <div className="text-sm text-red-700">visiteurs perdus</div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <div className="font-semibold text-red-900 mb-2">
                    🎯 Recommandations d'optimisation
                  </div>
                  <ul className="space-y-2 text-sm text-red-800">
                    {step.id === 'calculator' && (
                      <>
                        <li>• Simplifier l'interface du calculateur ROI</li>
                        <li>• Ajouter des exemples pré-remplis</li>
                        <li>• Afficher les économies en temps réel</li>
                      </>
                    )}
                    {step.id === 'cart' && (
                      <>
                        <li>• Réduire les champs du formulaire</li>
                        <li>• Ajouter des badges de réassurance (livraison, garantie)</li>
                        <li>• Afficher le calcul d'économies dans le panier</li>
                      </>
                    )}
                    {step.id === 'checkout' && (
                      <>
                        <li>• Proposer le paiement en 3× sans frais en évidence</li>
                        <li>• Simplifier le processus de paiement (1 page)</li>
                        <li>• Ajouter plus de moyens de paiement (PayPal, Apple Pay)</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Potential Impact */}
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-3 border border-green-200">
                    <div className="text-sm text-green-900 font-semibold mb-1">
                      Potentiel d'optimisation
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      +{Math.round(step.dropoff * 0.25).toLocaleString()} conversions
                    </div>
                    <div className="text-xs text-green-700">
                      En réduisant la perte de 25%
                    </div>
                  </div>

                  <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
                    Créer A/B test
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Details */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Détails par étape
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Étape</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900">Visiteurs</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900">Perte</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900">Taux perte</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900">Conversion</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900">Temps moy.</th>
                </tr>
              </thead>
              <tbody>
                {funnelSteps.map((step, index) => (
                  <tr key={step.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-${step.color}-100 flex items-center justify-center`}>
                          <step.icon className={`w-4 h-4 text-${step.color}-600`} />
                        </div>
                        <span className="font-medium text-gray-900">{step.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-semibold text-gray-900">
                      {step.visitors.toLocaleString()}
                    </td>
                    <td className="text-right py-4 px-4 text-red-600 font-semibold">
                      {step.dropoff > 0 ? `-${step.dropoff.toLocaleString()}` : '-'}
                    </td>
                    <td className="text-right py-4 px-4">
                      {step.dropoffRate > 0 && (
                        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          step.dropoffRate > 50
                            ? 'bg-red-100 text-red-700'
                            : step.dropoffRate > 30
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {step.dropoffRate}%
                        </span>
                      )}
                    </td>
                    <td className="text-right py-4 px-4 font-bold text-gray-900">
                      {step.conversionRate}%
                    </td>
                    <td className="text-right py-4 px-4 text-gray-600">
                      {step.avgTime}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
