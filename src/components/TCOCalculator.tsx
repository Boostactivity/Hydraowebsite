import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, Droplet, ShoppingCart, Zap, ArrowRight, Check } from 'lucide-react';

interface TCOCalculatorProps {
  className?: string;
}

export function TCOCalculator({ className = '' }: TCOCalculatorProps) {
  const [years, setYears] = useState(5);
  const [householdSize, setHouseholdSize] = useState(4);

  // Calculs TCO (Total Cost of Ownership)
  const hydraoCost = 490 + (years * 99); // 490€ + moyenne abonnement 99€/an
  const bottlesCost = years * (householdSize * 300); // ~300€/an/personne pour eau en bouteille
  const kettleCost = 80 + (years * 50); // Bouilloire 80€ + 50€ élec/an

  const totalSavings = (bottlesCost + kettleCost) - hydraoCost;
  const monthlySavings = totalSavings / (years * 12);
  const breakEvenMonths = Math.ceil(490 / monthlySavings);

  const yearOptions = [
    { value: 1, label: '1 an' },
    { value: 3, label: '3 ans' },
    { value: 5, label: '5 ans' },
    { value: 10, label: '10 ans' },
  ];

  const householdOptions = [
    { value: 1, label: '1 personne', icon: '👤' },
    { value: 2, label: 'Couple', icon: '👥' },
    { value: 4, label: 'Famille', icon: '👨‍👩‍👧‍👦' },
    { value: 6, label: 'Famille+', icon: '👨‍👩‍👧‍👧' },
  ];

  // Calcul pourcentages pour barres
  const maxCost = Math.max(hydraoCost, bottlesCost, kettleCost);
  const hydroPercent = (hydraoCost / maxCost) * 100;
  const bottlesPercent = (bottlesCost / maxCost) * 100;
  const kettlePercent = (kettleCost / maxCost) * 100;

  return (
    <div className={`bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-10 ${className}`}>
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-6"
        >
          <TrendingDown className="w-5 h-5" />
          <span className="text-sm uppercase tracking-wider font-medium">Coût Total de Possession</span>
        </motion.div>

        <h2 className="mb-4 text-gray-900">
          Combien coûte vraiment
          <span className="block text-[#6B1E3E]">votre solution actuelle ?</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculez le coût réel sur {years} {years === 1 ? 'an' : 'ans'} : HYDRAO vs vos dépenses actuelles
        </p>
      </div>

      {/* Contrôles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Durée */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Période de calcul
          </label>
          <div className="grid grid-cols-4 gap-2">
            {yearOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setYears(option.value)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  years === option.value
                    ? 'bg-[#6B1E3E] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Taille foyer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Taille du foyer
          </label>
          <div className="grid grid-cols-4 gap-2">
            {householdOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setHouseholdSize(option.value)}
                className={`px-3 py-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-1 ${
                  householdSize === option.value
                    ? 'bg-[#6B1E3E] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-xs">{option.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparaison visuelle */}
      <div className="space-y-6 mb-8">
        {/* HYDRAO */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center">
                <Droplet className="w-5 h-5 text-[#6B1E3E]" />
              </div>
              <span className="font-medium text-gray-900">HYDRAO</span>
            </div>
            <span className="text-2xl font-light text-[#6B1E3E]">
              {hydraoCost.toLocaleString()}€
            </span>
          </div>
          <div className="h-12 bg-gray-100 rounded-xl overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${hydroPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] flex items-center justify-end pr-4"
            >
              <span className="text-white text-sm font-medium">490€ + {years * 99}€</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bouteilles */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Eau en bouteille</span>
            </div>
            <span className="text-2xl font-light text-gray-700">
              {bottlesCost.toLocaleString()}€
            </span>
          </div>
          <div className="h-12 bg-gray-100 rounded-xl overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${bottlesPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end pr-4"
            >
              <span className="text-white text-sm font-medium">
                {householdSize} × {years} ans × 300€
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bouilloire + Électricité */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <span className="font-medium text-gray-900">Bouilloire + Électricité</span>
            </div>
            <span className="text-2xl font-light text-gray-700">
              {kettleCost.toLocaleString()}€
            </span>
          </div>
          <div className="h-12 bg-gray-100 rounded-xl overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${kettlePercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-end pr-4"
            >
              <span className="text-white text-sm font-medium">
                80€ + {years} ans × 50€
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Résultats */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${years}-${householdSize}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-light text-green-600 mb-2">
                {totalSavings.toLocaleString()}€
              </div>
              <div className="text-sm text-gray-600">
                Économisés sur {years} {years === 1 ? 'an' : 'ans'}
              </div>
            </div>
            <div>
              <div className="text-4xl font-light text-green-600 mb-2">
                {Math.round(monthlySavings)}€
              </div>
              <div className="text-sm text-gray-600">
                Économisés par mois
              </div>
            </div>
            <div>
              <div className="text-4xl font-light text-green-600 mb-2">
                {breakEvenMonths}
              </div>
              <div className="text-sm text-gray-600">
                Mois pour rentabiliser
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-green-200">
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p>
                Après <strong>{breakEvenMonths} mois</strong>, HYDRAO est entièrement rentabilisé.
                Vous économisez ensuite <strong>au minimum {Math.round(monthlySavings)}€ par mois</strong> en eau pure illimitée.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Détails calculs */}
      <details className="mt-6 text-sm text-gray-600">
        <summary className="cursor-pointer hover:text-[#6B1E3E] font-medium">
          📊 Voir le détail des calculs
        </summary>
        <div className="mt-4 space-y-2 pl-4 border-l-2 border-gray-200">
          <p>• HYDRAO : 490€ (robinet) + {years * 99}€ (abonnements {years} ans)</p>
          <p>• Eau en bouteille : {householdSize} personnes × 300€/an × {years} ans = {bottlesCost}€</p>
          <p>• Bouilloire : 80€ (achat) + {years} ans × 50€/an (électricité) = {kettleCost}€</p>
          <p className="pt-2 border-t border-gray-200">
            <strong>Total économies :</strong> ({bottlesCost}€ + {kettleCost}€) - {hydraoCost}€ = {totalSavings}€
          </p>
        </div>
      </details>
    </div>
  );
}
