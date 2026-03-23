import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Beaker, 
  TrendingUp, 
  TrendingDown,
  Users,
  Target,
  Award,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  BarChart3,
  Zap,
  Plus,
  Settings
} from 'lucide-react';

interface ABTest {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  variants: ABVariant[];
  startDate: Date;
  endDate?: Date;
  traffic: number;
  goal: string;
  winner?: string;
}

interface ABVariant {
  id: string;
  name: string;
  description: string;
  traffic: number;
  visitors: number;
  conversions: number;
  conversionRate: number;
  improvement: number;
  confidence: number;
}

export function ABTestingDashboard() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  // Mock A/B tests
  const tests: ABTest[] = [
    {
      id: 'test-1',
      name: 'CTA Principal - Couleur',
      status: 'running',
      startDate: new Date('2024-12-01'),
      traffic: 50,
      goal: 'Clics CTA',
      variants: [
        { 
          id: 'A', 
          name: 'Control (Bordeaux)', 
          description: 'CTA bordeaux #6B1E3E actuel',
          traffic: 50,
          visitors: 5420,
          conversions: 285,
          conversionRate: 5.26,
          improvement: 0,
          confidence: 100
        },
        { 
          id: 'B', 
          name: 'Variant (Vert)', 
          description: 'CTA vert émeraude',
          traffic: 50,
          visitors: 5380,
          conversions: 312,
          conversionRate: 5.80,
          improvement: 10.3,
          confidence: 94
        }
      ]
    },
    {
      id: 'test-2',
      name: 'Headline Homepage',
      status: 'completed',
      startDate: new Date('2024-11-15'),
      endDate: new Date('2024-12-10'),
      traffic: 50,
      goal: 'Engagement',
      winner: 'B',
      variants: [
        { 
          id: 'A', 
          name: 'Control', 
          description: '"Le robinet 5-en-1 qui change tout"',
          traffic: 50,
          visitors: 12500,
          conversions: 780,
          conversionRate: 6.24,
          improvement: 0,
          confidence: 100
        },
        { 
          id: 'B', 
          name: 'Winner', 
          description: '"Économisez 2340€/an avec HYDRAO"',
          traffic: 50,
          visitors: 12450,
          conversions: 925,
          conversionRate: 7.43,
          improvement: 19.1,
          confidence: 99
        }
      ]
    },
    {
      id: 'test-3',
      name: 'Prix - Affichage',
      status: 'draft',
      startDate: new Date('2024-12-25'),
      traffic: 33,
      goal: 'Ajouts panier',
      variants: [
        { 
          id: 'A', 
          name: 'Prix seul', 
          description: '490€ TTC',
          traffic: 33,
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
          improvement: 0,
          confidence: 0
        },
        { 
          id: 'B', 
          name: 'Prix + économies', 
          description: '490€ → Économisez 2340€/an',
          traffic: 33,
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
          improvement: 0,
          confidence: 0
        },
        { 
          id: 'C', 
          name: 'Prix + finance', 
          description: '490€ ou 3×163€ sans frais',
          traffic: 34,
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
          improvement: 0,
          confidence: 0
        }
      ]
    }
  ];

  const stats = {
    activeTests: tests.filter(t => t.status === 'running').length,
    completedTests: tests.filter(t => t.status === 'completed').length,
    avgImprovement: 14.7,
    totalVisitors: 35750
  };

  const activeTest = tests.find(t => t.id === selectedTest) || tests[0];

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
              A/B Testing Framework
            </motion.h1>
            <p className="text-gray-600">
              Testez, optimisez, améliorez continuellement vos conversions
            </p>
          </div>
          <button className="px-6 py-3 bg-[#6B1E3E] text-white rounded-xl font-semibold hover:bg-[#8B2E4E] transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Nouveau test</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Play className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Tests actifs</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.activeTests}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Tests complétés</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.completedTests}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Amélioration moy.</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">+{stats.avgImprovement}%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-600">Visiteurs testés</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalVisitors.toLocaleString()}</div>
          </motion.div>
        </div>

        {/* Active Test Details */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Beaker className="w-7 h-7 text-[#6B1E3E]" />
                {activeTest.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  Objectif: {activeTest.goal}
                </span>
                <span>•</span>
                <span>Démarré le {activeTest.startDate.toLocaleDateString('fr-FR')}</span>
                <span>•</span>
                <span>{activeTest.traffic}% du traffic</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-full font-semibold ${
                activeTest.status === 'running' 
                  ? 'bg-green-100 text-green-700'
                  : activeTest.status === 'completed'
                  ? 'bg-blue-100 text-blue-700'
                  : activeTest.status === 'paused'
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {activeTest.status === 'running' && 'En cours'}
                {activeTest.status === 'completed' && 'Terminé'}
                {activeTest.status === 'paused' && 'En pause'}
                {activeTest.status === 'draft' && 'Brouillon'}
              </div>
              {activeTest.status === 'running' && (
                <button className="p-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                  <Pause className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Variants Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeTest.variants.map((variant) => {
              const isWinner = activeTest.winner === variant.id;
              const isControl = variant.id === 'A';
              
              return (
                <motion.div
                  key={variant.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`relative p-6 rounded-2xl border-2 transition-all ${
                    isWinner
                      ? 'border-green-500 bg-green-50'
                      : isControl
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {/* Winner Badge */}
                  {isWinner && (
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  )}

                  {/* Variant Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        isWinner ? 'bg-green-500 text-white' : isControl ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                      }`}>
                        {variant.id}
                      </div>
                      {isControl && (
                        <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                          Control
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{variant.name}</h3>
                    <p className="text-sm text-gray-600">{variant.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Visiteurs</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {variant.visitors.toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">Conversions</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {variant.conversions.toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-1">Taux de conversion</div>
                      <div className="text-3xl font-bold text-gray-900">
                        {variant.conversionRate.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* Improvement */}
                  {!isControl && variant.improvement !== 0 && (
                    <div className={`p-3 rounded-xl ${
                      variant.improvement > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          vs Control
                        </span>
                        {variant.improvement > 0 ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div className={`text-2xl font-bold ${
                        variant.improvement > 0 ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {variant.improvement > 0 ? '+' : ''}{variant.improvement}%
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        Confiance: {variant.confidence}%
                      </div>
                    </div>
                  )}

                  {/* Confidence Bar */}
                  {variant.confidence > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Confiance statistique</span>
                        <span>{variant.confidence}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${variant.confidence}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full ${
                            variant.confidence >= 95 ? 'bg-green-500' : 'bg-orange-500'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Statistical Significance Warning */}
          {activeTest.status === 'running' && activeTest.variants.some(v => v.confidence < 95) && (
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
              <Zap className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-orange-900 mb-1">
                  Test en cours - Significativité non atteinte
                </div>
                <div className="text-sm text-orange-800">
                  Continuez le test jusqu'à atteindre 95% de confiance statistique pour des résultats fiables.
                  Actuellement: {Math.max(...activeTest.variants.map(v => v.confidence))}% de confiance.
                </div>
              </div>
            </div>
          )}

          {/* Winner Declaration */}
          {activeTest.status === 'completed' && activeTest.winner && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <Award className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-green-900 mb-1">
                  🎉 Variant gagnant: {activeTest.variants.find(v => v.id === activeTest.winner)?.name}
                </div>
                <div className="text-sm text-green-800">
                  Amélioration de +{activeTest.variants.find(v => v.id === activeTest.winner)?.improvement}% 
                  avec {activeTest.variants.find(v => v.id === activeTest.winner)?.confidence}% de confiance.
                  Déployez cette version pour tous les utilisateurs.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* All Tests List */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tous les tests</h2>
          <div className="space-y-3">
            {tests.map((test) => (
              <div
                key={test.id}
                onClick={() => setSelectedTest(test.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedTest === test.id || (!selectedTest && test === tests[0])
                    ? 'bg-purple-50 border-2 border-purple-300'
                    : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Beaker className="w-6 h-6 text-[#6B1E3E]" />
                    <div>
                      <div className="font-semibold text-gray-900">{test.name}</div>
                      <div className="text-sm text-gray-600">
                        Objectif: {test.goal} • {test.variants.length} variants
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {test.status === 'completed' && test.winner && (
                      <div className="text-sm">
                        <span className="text-gray-600">Gagnant: </span>
                        <span className="font-semibold text-green-600">
                          Variant {test.winner} (+
                          {test.variants.find(v => v.id === test.winner)?.improvement}%)
                        </span>
                      </div>
                    )}
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      test.status === 'running' 
                        ? 'bg-green-100 text-green-700'
                        : test.status === 'completed'
                        ? 'bg-blue-100 text-blue-700'
                        : test.status === 'paused'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {test.status === 'running' && 'En cours'}
                      {test.status === 'completed' && 'Terminé'}
                      {test.status === 'paused' && 'Pause'}
                      {test.status === 'draft' && 'Brouillon'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
