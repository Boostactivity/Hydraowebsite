import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Calendar, Sparkles, TrendingDown } from 'lucide-react';

interface CostPerDayDisplayProps {
  totalPrice?: number;
  years?: number;
  className?: string;
}

export function CostPerDayDisplay({ 
  totalPrice = 490, 
  years = 1,
  className = '' 
}: CostPerDayDisplayProps) {
  const days = years * 365;
  const costPerDay = totalPrice / days;
  const costPerWeek = costPerDay * 7;
  const costPerMonth = totalPrice / (years * 12);

  // Comparaisons quotidiennes
  const comparisons = [
    {
      item: 'Un café',
      price: 3.5,
      icon: Coffee,
      color: 'from-amber-500 to-orange-500'
    },
    {
      item: 'Un déjeuner',
      price: 12,
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      item: 'Un menu fast-food',
      price: 9,
      icon: Sparkles,
      color: 'from-red-500 to-pink-500'
    }
  ];

  const cheapestComparison = comparisons[0];
  const ratio = (cheapestComparison.price / costPerDay).toFixed(1);

  return (
    <div className={`bg-gradient-to-br from-white to-[#FAF8F5] rounded-3xl border-2 border-gray-200 p-8 md:p-10 ${className}`}>
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-6"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-sm uppercase tracking-wider font-medium">Coût journalier</span>
        </motion.div>

        <h2 className="mb-4 text-gray-900">
          Le prix d'un café pendant 1 an,
          <span className="block text-[#6B1E3E]">puis gratuit à vie</span>
        </h2>
      </div>

      {/* Hero stat - Coût par jour */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mb-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#6B1E3E]/5 to-[#D4AF37]/5 rounded-3xl blur-2xl"></div>
        
        <div className="relative bg-white border-2 border-[#6B1E3E]/20 rounded-3xl p-8 text-center">
          <div className="text-7xl md:text-8xl font-light text-[#6B1E3E] mb-4">
            {costPerDay.toFixed(2)}€
          </div>
          <div className="text-xl text-gray-600 mb-2">
            par jour pendant {years} {years === 1 ? 'an' : 'ans'}
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <TrendingDown className="w-4 h-4" />
            Puis 0€/jour à vie
          </div>
        </div>
      </motion.div>

      {/* Comparaisons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {comparisons.map((comp, idx) => (
          <motion.div
            key={comp.item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative group"
          >
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#6B1E3E]/30 transition-all text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${comp.color} flex items-center justify-center`}>
                <comp.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-gray-900 mb-1">
                {comp.price.toFixed(2)}€
              </div>
              <div className="text-sm text-gray-600">
                {comp.item}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insight principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl p-6 text-center"
      >
        <div className="text-4xl font-light mb-3">
          {ratio}×
        </div>
        <p className="text-lg">
          <strong>HYDRAL coûte {ratio} fois moins</strong> qu'un {cheapestComparison.item} par jour.
        </p>
        <p className="text-white/80 mt-2 text-sm">
          Pour le prix d'un {cheapestComparison.item}, vous avez de l'eau pure illimitée pendant {ratio} jours.
        </p>
      </motion.div>

      {/* Breakdown détaillé */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="text-2xl font-light text-[#6B1E3E] mb-1">
            {costPerDay.toFixed(2)}€
          </div>
          <div className="text-xs text-gray-600">par jour</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="text-2xl font-light text-[#6B1E3E] mb-1">
            {costPerWeek.toFixed(2)}€
          </div>
          <div className="text-xs text-gray-600">par semaine</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="text-2xl font-light text-[#6B1E3E] mb-1">
            {costPerMonth.toFixed(2)}€
          </div>
          <div className="text-xs text-gray-600">par mois</div>
        </div>
      </div>

      {/* Footnote */}
      <p className="text-xs text-gray-500 text-center mt-6">
        Calcul basé sur {totalPrice}€ répartis sur {years} {years === 1 ? 'an' : 'ans'} ({days} jours).
        Après cette période, le coût quotidien devient 0€ (hors abonnement filtres optionnel).
      </p>
    </div>
  );
}