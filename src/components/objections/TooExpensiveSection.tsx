import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, TrendingDown, Zap, Coffee, ShoppingCart, Calculator, ChevronRight } from 'lucide-react';

interface TooExpensiveSectionProps {
  className?: string;
}

export function TooExpensiveSection({ className = '' }: TooExpensiveSectionProps) {
  const [selectedComparison, setSelectedComparison] = useState<'nespresso' | 'bottles' | 'total'>('total');

  const comparisons = {
    nespresso: {
      title: 'Machine à café Nespresso',
      icon: Coffee,
      initial: 200,
      yearly: 365,
      total5years: 200 + (365 * 5),
      description: 'Prix machine + capsules quotidiennes'
    },
    bottles: {
      title: 'Eau en bouteille (famille)',
      icon: ShoppingCart,
      initial: 0,
      yearly: 1200,
      total5years: 1200 * 5,
      description: 'Famille de 4 personnes'
    },
    total: {
      title: 'Solution actuelle complète',
      icon: Calculator,
      initial: 280,
      yearly: 1565,
      total5years: 280 + (1565 * 5),
      description: 'Bouteilles + bouilloire + électricité'
    }
  };

  const hydroCost5years = 490 + (99 * 5); // 490€ + 5 ans d'abonnement
  const selected = comparisons[selectedComparison];
  const savings5years = selected.total5years - hydroCost5years;

  return (
    <section className={`section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/5 ${className}`}>
      <div className="section-container max-w-6xl mx-auto">
        {/* Header avec objection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Objection en gros */}
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-red-50 border-2 border-red-200 rounded-2xl mb-8">
            <X className="w-6 h-6 text-red-600" />
            <span className="text-2xl text-red-700 font-medium">"490€ c'est trop cher"</span>
          </div>

          <h2 className="mb-6 text-gray-900">
            Arrêtons de comparer
            <span className="block text-[#6B1E3E]">un investissement à une dépense</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            HYDRAL n'est pas une dépense de 490€. C'est un investissement qui vous rapporte de l'argent.
          </p>
        </motion.div>

        {/* Prix journalier HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl border-2 border-[#6B1E3E]/20 p-8 md:p-12 text-center shadow-xl">
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">HYDRAL coûte</div>
              <div className="text-7xl md:text-8xl font-light text-[#6B1E3E] mb-4">
                1.34€
              </div>
              <div className="text-2xl text-gray-700 mb-6">par jour la première année</div>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-full">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium text-lg">Puis GRATUIT à vie</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-light text-[#6B1E3E] mb-1">9.40€</div>
                <div className="text-sm text-gray-600">par semaine</div>
              </div>
              <div>
                <div className="text-3xl font-light text-[#6B1E3E] mb-1">40€</div>
                <div className="text-sm text-gray-600">par mois</div>
              </div>
              <div>
                <div className="text-3xl font-light text-[#6B1E3E] mb-1">6 mois</div>
                <div className="text-sm text-gray-600">pour rentabiliser</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparaison avec produits quotidiens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { item: 'Un café', price: 3.5, times: 2.6 },
            { item: 'Un déjeuner', price: 12, times: 9 },
            { item: 'Un menu McDo', price: 9, times: 6.7 }
          ].map((comp, idx) => (
            <motion.div
              key={comp.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 text-center"
            >
              <Coffee className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
              <div className="text-2xl font-light text-gray-900 mb-1">{comp.price}€</div>
              <div className="text-sm text-gray-600 mb-4">{comp.item}</div>
              <div className="text-xs text-gray-500">
                HYDRAL = {comp.times.toFixed(1)}× moins cher par jour
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparaison interactive avec autres dépenses */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-10 mb-12">
          <h3 className="text-center mb-8 text-gray-900">
            Comparé à vos autres dépenses
          </h3>

          {/* Sélecteur */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.entries(comparisons).map(([key, comp]) => {
              const Icon = comp.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedComparison(key as any)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                    selectedComparison === key
                      ? 'bg-[#6B1E3E] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {comp.title}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedComparison}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Barres comparatives */}
              <div className="space-y-4">
                {/* HYDRAL */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-[#6B1E3E]">HYDRAL</span>
                    <span className="text-2xl font-light text-[#6B1E3E]">{hydroCost5years.toLocaleString()}€</span>
                  </div>
                  <div className="h-12 bg-gray-100 rounded-xl overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(hydroCost5years / selected.total5years) * 100}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] flex items-center justify-end pr-4"
                    >
                      <span className="text-white text-sm font-medium">490€ + 495€</span>
                    </motion.div>
                  </div>
                </div>

                {/* Comparaison sélectionnée */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">{selected.title}</span>
                    <span className="text-2xl font-light text-gray-700">{selected.total5years.toLocaleString()}€</span>
                  </div>
                  <div className="h-12 bg-gray-100 rounded-xl overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-end pr-4"
                    >
                      <span className="text-white text-sm font-medium">
                        {selected.initial > 0 && `${selected.initial}€ + `}{selected.yearly}€/an
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Résultat */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
                <div className="text-center">
                  <div className="text-sm text-gray-700 mb-2">Vous économisez sur 5 ans</div>
                  <div className="text-5xl font-light text-green-600 mb-4">
                    {savings5years.toLocaleString()}€
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <div className="font-medium text-green-700">{Math.round(savings5years / 60)}€/mois</div>
                      <div>économisés en moyenne</div>
                    </div>
                    <div>
                      <div className="font-medium text-green-700">{((selected.total5years - hydroCost5years) / hydroCost5years * 100).toFixed(0)}%</div>
                      <div>de rentabilité</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Le vrai coût */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="mb-6">Le vrai coût, c'est de ne PAS acheter HYDRAL</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-4xl font-light mb-2">6 240€</div>
              <div className="text-white/80">gaspillés en bouteilles sur 5 ans</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">60h</div>
              <div className="text-white/80">perdues à attendre que l'eau chauffe par an</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">2 400</div>
              <div className="text-white/80">bouteilles plastique jetées par an</div>
            </div>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full">
            <Zap className="w-5 h-5" />
            <span className="font-medium">Le calcul est simple : ne pas investir 490€ vous coûte 6 000€</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
