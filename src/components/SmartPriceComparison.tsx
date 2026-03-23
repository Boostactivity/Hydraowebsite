import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, Check, X, AlertCircle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

interface ComparisonItem {
  category: string;
  hydrao: {
    price: number;
    unit: string;
    features: string[];
  };
  alternative: {
    name: string;
    price: number;
    unit: string;
    features: string[];
  };
  savings: {
    monthly: number;
    yearly: number;
    fiveYears: number;
  };
}

export function SmartPriceComparison() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('water');

  const comparisons: ComparisonItem[] = [
    {
      category: 'water',
      hydrao: {
        price: 490,
        unit: 'une fois',
        features: [
          'Eau filtrée illimitée',
          'Eau pétillante à volonté',
          'Garantie 5 ans',
          'Maintenance incluse'
        ]
      },
      alternative: {
        name: 'Eau en bouteille',
        price: 70,
        unit: 'par mois',
        features: [
          'Achat récurrent',
          'Transport pénible',
          'Stockage nécessaire',
          'Déchets plastiques',
          'Coût sur le long terme'
        ]
      },
      savings: {
        monthly: 70,
        yearly: 840,
        fiveYears: 4200
      }
    },
    {
      category: 'kettle',
      hydrao: {
        price: 490,
        unit: 'une fois',
        features: [
          'Eau bouillante instantanée',
          'Température précise',
          'Économie énergie 50%',
          'Pas d\'entretien',
          'Design intégré'
        ]
      },
      alternative: {
        name: 'Bouilloire classique',
        price: 15,
        unit: 'par mois (élec)',
        features: [
          'Attente 2-3 minutes',
          'Consommation élevée',
          'Détartrage régulier',
          'Encombrement plan travail',
          'Remplacement fréquent'
        ]
      },
      savings: {
        monthly: 15,
        yearly: 180,
        fiveYears: 900
      }
    },
    {
      category: 'competitor',
      hydrao: {
        price: 490,
        unit: 'TTC tout inclus',
        features: [
          'Toutes finitions incluses',
          'Garantie 5 ans',
          'Abonnement flexible',
          'SAV 48h'
        ]
      },
      alternative: {
        name: 'Robinets concurrents',
        price: 890,
        unit: 'hors options',
        features: [
          'Options en supplément',
          'Frais additionnels',
          'Garantie 2 ans',
          'Abonnement imposé',
          'SAV lent'
        ]
      },
      savings: {
        monthly: 33,
        yearly: 400,
        fiveYears: 2000
      }
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water': return '💧';
      case 'kettle': return '☕';
      case 'competitor': return '🏆';
      default: return '💰';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'water': return 'vs Eau en bouteille';
      case 'kettle': return 'vs Bouilloire';
      case 'competitor': return 'vs Concurrents';
      default: return '';
    }
  };

  const totalSavings = comparisons.reduce((acc, item) => ({
    monthly: acc.monthly + item.savings.monthly,
    yearly: acc.yearly + item.savings.yearly,
    fiveYears: acc.fiveYears + item.savings.fiveYears
  }), { monthly: 0, yearly: 0, fiveYears: 0 });

  return (
    <section className="section-padding bg-gradient-to-br from-white to-[#FAF8F5]">
      <div className="section-container max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full mb-6 shadow-lg"
          >
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Comparaison intelligente</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Pourquoi HYDRAO est le meilleur choix
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Économies réelles comparées à vos alternatives actuelles
          </p>
        </motion.div>

        {/* Total Savings Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-3xl shadow-2xl"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl mb-2">Économies totales cumulées</h3>
            <p className="text-white/80">En remplaçant toutes vos alternatives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { period: 'Par mois', amount: totalSavings.monthly, icon: '📅' },
              { period: 'Par an', amount: totalSavings.yearly, icon: '📆' },
              { period: 'Sur 5 ans', amount: totalSavings.fiveYears, icon: '🎯' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="text-3xl font-light mb-1">{item.amount}€</div>
                <div className="text-sm text-white/80">{item.period}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Comparisons */}
        <div className="space-y-4">
          {comparisons.map((comparison, index) => {
            const isExpanded = expandedCategory === comparison.category;

            return (
              <motion.div
                key={comparison.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-[#6B1E3E]/30 transition-all"
              >
                {/* Header - Always visible */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : comparison.category)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{getCategoryIcon(comparison.category)}</div>
                    <div className="text-left">
                      <h3 className="text-xl font-medium text-gray-900 mb-1">
                        HYDRAO {getCategoryLabel(comparison.category)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Économisez <span className="font-medium text-green-600">au minimum {comparison.savings.yearly}€/an</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-light text-[#6B1E3E]">
                        -{comparison.savings.yearly}€
                      </div>
                      <div className="text-xs text-gray-500">par an</div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200"
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* HYDRAO */}
                          <div className="p-6 bg-gradient-to-br from-[#6B1E3E]/5 to-transparent rounded-2xl border-2 border-[#6B1E3E]/20">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-[#6B1E3E] rounded-full flex items-center justify-center">
                                <Check className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">HYDRAO</h4>
                                <p className="text-sm text-gray-600">
                                  {comparison.hydrao.price}€ {comparison.hydrao.unit}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {comparison.hydrao.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Alternative */}
                          <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <X className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700">{comparison.alternative.name}</h4>
                                <p className="text-sm text-gray-500">
                                  {comparison.alternative.price}€ {comparison.alternative.unit}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {comparison.alternative.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Savings Breakdown */}
                        <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-5 h-5 text-green-600" />
                            <h5 className="font-medium text-green-900">Vos économies</h5>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-light text-green-600">
                                {comparison.savings.monthly}€
                              </div>
                              <div className="text-xs text-green-700">par mois</div>
                            </div>
                            <div>
                              <div className="text-2xl font-light text-green-600">
                                {comparison.savings.yearly}€
                              </div>
                              <div className="text-xs text-green-700">par an</div>
                            </div>
                            <div>
                              <div className="text-2xl font-light text-green-600">
                                {comparison.savings.fiveYears}€
                              </div>
                              <div className="text-xs text-green-700">sur 5 ans</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ROI Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-2 border-[#D4AF37]/30 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Investissement intelligent, rentable dès 6 mois
              </h4>
              <p className="text-sm text-gray-700">
                Avec des économies cumulées de <span className="font-medium text-[#6B1E3E]">{totalSavings.yearly}€ par an</span>, 
                votre robinet HYDRAO à 490€ est rentabilisé en moins de 6 mois. Ensuite, c'est du pur bénéfice.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}