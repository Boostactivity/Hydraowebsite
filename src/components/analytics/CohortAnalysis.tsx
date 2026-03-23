import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  DollarSign,
  Repeat,
  Heart,
  Award,
  Filter,
  Download
} from 'lucide-react';

interface Cohort {
  month: string;
  users: number;
  retention: { [key: string]: number };
  revenue: number;
  ltv: number;
}

export function CohortAnalysis() {
  const [metric, setMetric] = useState<'retention' | 'revenue'>('retention');
  const [timeRange, setTimeRange] = useState<'3m' | '6m' | '12m'>('6m');

  // Mock cohort data
  const cohorts: Cohort[] = [
    {
      month: 'Juin 2024',
      users: 450,
      retention: { '0': 100, '1': 68, '2': 52, '3': 45, '4': 42, '5': 40 },
      revenue: 220500,
      ltv: 980
    },
    {
      month: 'Juillet 2024',
      users: 520,
      retention: { '0': 100, '1': 72, '2': 58, '3': 50, '4': 48, '5': 45 },
      revenue: 254800,
      ltv: 1050
    },
    {
      month: 'Août 2024',
      users: 680,
      retention: { '0': 100, '1': 75, '2': 62, '3': 55, '4': 52, '5': 0 },
      revenue: 333200,
      ltv: 1120
    },
    {
      month: 'Sept 2024',
      users: 720,
      retention: { '0': 100, '1': 78, '2': 65, '3': 58, '4': 0, '5': 0 },
      revenue: 352800,
      ltv: 1180
    },
    {
      month: 'Oct 2024',
      users: 850,
      retention: { '0': 100, '1': 82, '2': 70, '3': 0, '4': 0, '5': 0 },
      revenue: 416500,
      ltv: 1250
    },
    {
      month: 'Nov 2024',
      users: 920,
      retention: { '0': 100, '1': 85, '2': 0, '3': 0, '4': 0, '5': 0 },
      revenue: 450800,
      ltv: 1320
    },
    {
      month: 'Déc 2024',
      users: 1050,
      retention: { '0': 100, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      revenue: 514500,
      ltv: 1400
    }
  ];

  const stats = {
    totalUsers: cohorts.reduce((sum, c) => sum + c.users, 0),
    avgRetentionM1: Math.round(
      cohorts.filter(c => c.retention['1'] > 0)
        .reduce((sum, c) => sum + c.retention['1'], 0) / 
      cohorts.filter(c => c.retention['1'] > 0).length
    ),
    avgLTV: Math.round(
      cohorts.reduce((sum, c) => sum + c.ltv, 0) / cohorts.length
    ),
    totalRevenue: cohorts.reduce((sum, c) => sum + c.revenue, 0)
  };

  const getRetentionColor = (value: number) => {
    if (value === 0) return 'bg-gray-100 text-gray-400';
    if (value >= 80) return 'bg-green-500 text-white';
    if (value >= 60) return 'bg-green-400 text-white';
    if (value >= 40) return 'bg-yellow-400 text-gray-900';
    if (value >= 20) return 'bg-orange-400 text-white';
    return 'bg-red-400 text-white';
  };

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
              Cohort Analysis
            </motion.h1>
            <p className="text-gray-600">
              Analysez la rétention et la lifetime value par cohorte d'acquisition
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
            </button>
            <button className="px-4 py-2 bg-[#6B1E3E] text-white rounded-lg font-semibold hover:bg-[#8B2E4E] transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
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
              <span className="text-sm text-gray-600">Utilisateurs totaux</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.totalUsers.toLocaleString()}
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
                <Repeat className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Rétention M1 moy.</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.avgRetentionM1}%</div>
            <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>+5% vs période précédente</span>
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
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">LTV moyenne</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.avgLTV}€</div>
            <div className="text-sm text-purple-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs période précédente</span>
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
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-600">Revenue total</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {(stats.totalRevenue / 1000).toFixed(0)}k€
            </div>
          </motion.div>
        </div>

        {/* Metric Selector */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Table de cohortes</h2>
            <div className="flex gap-2">
              {[
                { value: 'retention', label: 'Rétention', icon: Repeat },
                { value: 'revenue', label: 'Revenue', icon: DollarSign }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMetric(option.value as any)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    metric === option.value
                      ? 'bg-[#6B1E3E] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <option.icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Retention Cohort Table */}
          {metric === 'retention' && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-900 border-b-2 border-gray-300 bg-gray-50">
                      Cohorte
                    </th>
                    <th className="text-right p-3 font-semibold text-gray-900 border-b-2 border-gray-300 bg-gray-50">
                      Utilisateurs
                    </th>
                    {[0, 1, 2, 3, 4, 5].map((month) => (
                      <th key={month} className="text-center p-3 font-semibold text-gray-900 border-b-2 border-gray-300 bg-gray-50">
                        M{month}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cohorts.map((cohort, index) => (
                    <motion.tr
                      key={cohort.month}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-3 font-semibold text-gray-900 border-b border-gray-200">
                        {cohort.month}
                      </td>
                      <td className="p-3 text-right font-semibold text-gray-900 border-b border-gray-200">
                        {cohort.users}
                      </td>
                      {[0, 1, 2, 3, 4, 5].map((month) => {
                        const value = cohort.retention[month.toString()] || 0;
                        return (
                          <td key={month} className="p-2 border-b border-gray-200">
                            <div
                              className={`py-2 px-3 rounded-lg text-center font-semibold ${getRetentionColor(value)}`}
                            >
                              {value > 0 ? `${value}%` : '-'}
                            </div>
                          </td>
                        );
                      })}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Revenue Cohort Table */}
          {metric === 'revenue' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 bg-gray-50">Cohorte</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900 bg-gray-50">Utilisateurs</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900 bg-gray-50">Revenue total</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900 bg-gray-50">LTV</th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900 bg-gray-50">ARPU</th>
                  </tr>
                </thead>
                <tbody>
                  {cohorts.map((cohort, index) => (
                    <motion.tr
                      key={cohort.month}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4 font-semibold text-gray-900">{cohort.month}</td>
                      <td className="py-4 px-4 text-right text-gray-900">{cohort.users}</td>
                      <td className="py-4 px-4 text-right font-bold text-gray-900">
                        {cohort.revenue.toLocaleString()}€
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold">
                          {cohort.ltv}€
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right text-gray-900">
                        {Math.round(cohort.revenue / cohort.users)}€
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Legend */}
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span className="text-gray-600">Excellente (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-400"></div>
              <span className="text-gray-600">Bonne (60-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-400"></div>
              <span className="text-gray-600">Moyenne (40-60%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-400"></div>
              <span className="text-gray-600">Faible (20-40%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-400"></div>
              <span className="text-gray-600">Critique (&lt;20%)</span>
            </div>
          </div>
        </div>

        {/* Insights & Trends */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Retention Trend */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Tendance de rétention
            </h3>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">
                +15%
              </div>
              <div className="text-gray-600">
                Amélioration de la rétention M1 sur 6 mois
              </div>
            </div>

            {/* Retention Chart */}
            <div className="space-y-3">
              {cohorts.slice(0, 6).reverse().map((cohort, index) => {
                const m1Retention = cohort.retention['1'] || 0;
                return (
                  <div key={cohort.month} className="flex items-center gap-3">
                    <div className="w-20 text-sm text-gray-600">{cohort.month}</div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${m1Retention}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-end pr-2"
                      >
                        <span className="text-white font-semibold text-sm">{m1Retention}%</span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LTV Trend */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Évolution LTV
            </h3>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                +42%
              </div>
              <div className="text-gray-600">
                Augmentation de la LTV moyenne sur 6 mois
              </div>
            </div>

            {/* LTV Chart */}
            <div className="space-y-3">
              {cohorts.slice(0, 6).reverse().map((cohort, index) => {
                const maxLTV = 1400;
                const width = (cohort.ltv / maxLTV) * 100;
                return (
                  <div key={cohort.month} className="flex items-center gap-3">
                    <div className="w-20 text-sm text-gray-600">{cohort.month}</div>
                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-end pr-2"
                      >
                        <span className="text-white font-semibold text-sm">{cohort.ltv}€</span>
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Insights actionnables
          </h3>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">🎯</div>
              <div className="font-semibold mb-2">Rétention M1 en hausse</div>
              <div className="text-sm text-white/90">
                Les cohortes récentes montrent une rétention M1 de 85%, soit +17% vs juin.
                L'onboarding amélioré fonctionne !
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">💰</div>
              <div className="font-semibold mb-2">LTV croissante</div>
              <div className="text-sm text-white/90">
                La LTV moyenne passe de 980€ à 1400€ (+42%).
                Les abonnements Premium/Ultimate cartonnent.
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl mb-3">📈</div>
              <div className="font-semibold mb-2">Croissance soutenue</div>
              <div className="text-sm text-white/90">
                +133% d'acquisitions de juin à décembre.
                Le scaling fonctionne sans dégrader la qualité.
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <div className="font-semibold mb-2">🚀 Recommandation stratégique</div>
            <div className="text-sm text-white/90">
              Avec une rétention M1 à 85% et une LTV de 1400€, vous pouvez augmenter le budget acquisition jusqu'à 
              <strong> 350€ CAC</strong> tout en restant rentable (LTV/CAC &gt; 4). Actuellement à ~200€ CAC, 
              vous avez une marge de +75% pour scaler agressivement.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
