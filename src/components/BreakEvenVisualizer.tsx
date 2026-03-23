import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Calendar, CheckCircle2, Zap } from 'lucide-react';

interface BreakEvenVisualizerProps {
  initialInvestment?: number;
  monthlySavings?: number;
  className?: string;
}

export function BreakEvenVisualizer({ 
  initialInvestment = 490, 
  monthlySavings = 83,
  className = '' 
}: BreakEvenVisualizerProps) {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const breakEvenMonth = Math.ceil(initialInvestment / monthlySavings);
  const totalMonths = 24; // Afficher 24 mois

  // Calcul des coûts cumulés par mois
  const getCumulativeCost = (month: number, isHydral: boolean) => {
    if (isHydral) {
      // HYDRAL : 490€ initial - économies mensuelles
      return initialInvestment - (month * monthlySavings);
    } else {
      // Alternative (bouteilles + bouilloire) : coût mensuel continu
      return month * monthlySavings;
    }
  };

  const maxValue = Math.max(
    initialInvestment,
    getCumulativeCost(totalMonths, false)
  );

  const getYPosition = (cost: number) => {
    return (cost / maxValue) * 100;
  };

  // Détection du point de croisement
  const crossoverMonth = breakEvenMonth;

  return (
    <div className={`bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-10 ${className}`}>
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-100 text-green-700 rounded-full mb-6"
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm uppercase tracking-wider font-medium">Point de Rentabilité</span>
        </motion.div>

        <h2 className="mb-4 text-gray-900">
          HYDRAL rentabilisé en
          <span className="block text-[#6B1E3E]">{breakEvenMonth} mois</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Après {breakEvenMonth} mois, chaque euro économisé est pur profit
        </p>
      </div>

      {/* Graphique Timeline */}
      <div className="relative h-80 mb-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
        {/* Axe Y - Coûts */}
        <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between text-xs text-gray-500 py-6">
          <span>{maxValue.toLocaleString()}€</span>
          <span>{Math.round(maxValue * 0.75).toLocaleString()}€</span>
          <span>{Math.round(maxValue * 0.5).toLocaleString()}€</span>
          <span>{Math.round(maxValue * 0.25).toLocaleString()}€</span>
          <span>0€</span>
        </div>

        {/* Zone graphique */}
        <div className="ml-16 h-full relative">
          {/* Grille horizontale */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <div
              key={percent}
              className="absolute left-0 right-0 border-t border-gray-200"
              style={{ top: `${percent}%` }}
            />
          ))}

          {/* Ligne de croisement (break-even) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute left-0 right-0 border-t-2 border-dashed border-green-500"
            style={{ 
              top: `${100 - getYPosition(getCumulativeCost(crossoverMonth, false))}%` 
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full whitespace-nowrap">
              Point de rentabilité
            </div>
          </motion.div>

          {/* Courbe Alternative (coût croissant) */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d={`M 0 ${100} L ${100} ${100 - getYPosition(getCumulativeCost(totalMonths, false))}`}
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Courbe HYDRAO (coût décroissant puis profit) */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
              d={`M 0 ${100 - getYPosition(initialInvestment)} L ${(crossoverMonth / totalMonths) * 100} ${100 - getYPosition(0)} L ${100} ${100 - getYPosition(-(totalMonths - crossoverMonth) * monthlySavings)}`}
              fill="none"
              stroke="#6B1E3E"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Point de croisement animé */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 200 }}
            className="absolute w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg"
            style={{
              left: `${(crossoverMonth / totalMonths) * 100}%`,
              top: `${100 - getYPosition(0)}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="px-3 py-2 bg-green-500 text-white text-sm rounded-lg shadow-lg">
                Mois {crossoverMonth}
              </div>
            </div>
          </motion.div>

          {/* Axe X - Mois */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 -mb-6">
            <span>0</span>
            <span>6 mois</span>
            <span>12 mois</span>
            <span>18 mois</span>
            <span>24 mois</span>
          </div>
        </div>
      </div>

      {/* Légende */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
          <div className="w-12 h-1 bg-red-500 rounded"></div>
          <div>
            <div className="font-medium text-gray-900">Solution classique</div>
            <div className="text-sm text-gray-600">Coût continu (bouteilles + électricité)</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-[#6B1E3E]/5 rounded-xl border border-[#6B1E3E]/20">
          <div className="w-12 h-1 bg-[#6B1E3E] rounded"></div>
          <div>
            <div className="font-medium text-gray-900">HYDRAL</div>
            <div className="text-sm text-gray-600">Investissement puis économies</div>
          </div>
        </div>
      </div>

      {/* Stats clés */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center p-6 bg-gradient-to-br from-[#6B1E3E]/5 to-[#6B1E3E]/10 rounded-2xl"
        >
          <Calendar className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
          <div className="text-3xl font-light text-[#6B1E3E] mb-2">
            {breakEvenMonth} mois
          </div>
          <div className="text-sm text-gray-600">
            Pour rentabiliser
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl"
        >
          <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-light text-green-600 mb-2">
            {Math.round((24 - breakEvenMonth) * monthlySavings)}€
          </div>
          <div className="text-sm text-gray-600">
            Économisés après 2 ans
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl"
        >
          <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <div className="text-3xl font-light text-blue-600 mb-2">
            {monthlySavings}€
          </div>
          <div className="text-sm text-gray-600">
            Économisés par mois
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl text-center"
      >
        <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-medium">Le calcul est simple</span>
        </div>
        <p className="text-gray-700">
          Après seulement <strong>{breakEvenMonth} mois</strong>, HYDRAL ne vous coûte plus rien.
          Vous économisez ensuite <strong>au minimum {monthlySavings}€ chaque mois</strong> en eau pure illimitée.
        </p>
      </motion.div>
    </div>
  );
}