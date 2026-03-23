import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, Clock, Trophy, Zap, Target, ChevronRight, Check, Sparkles } from 'lucide-react';
import { Page } from '../App';

interface InteractiveSavingsTimelineProps {
  navigate: (page: Page) => void;
}

type TimelineMilestone = {
  months: number;
  label: string;
  savings: number;
  withHydral: number;
  traditional: number;
  icon: React.ElementType;
  color: string;
  highlight: string;
  comparison: string;
};

export function InteractiveSavingsTimeline({ navigate }: InteractiveSavingsTimelineProps) {
  const [householdSize, setHouseholdSize] = useState(4);
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);

  // Calculs basés sur la taille du foyer
  const getCalculations = (size: number) => {
    const savingsMap: Record<number, number> = {
      1: 380,
      2: 500,
      3: 750,
      4: 1000,
      5: 1200
    };
    
    const annualSavings = savingsMap[size] || 1000;
    const hydroInitialCost = 490;
    const hydroYearlyCost = size <= 2 ? 59 : 139;
    const traditionalYearlyCost = annualSavings + hydroYearlyCost;

    return {
      annualSavings,
      hydroInitialCost,
      hydroYearlyCost,
      traditionalYearlyCost
    };
  };

  const calc = getCalculations(householdSize);

  const milestones: TimelineMilestone[] = [
    {
      months: 6,
      label: 'Break-even',
      savings: Math.round((calc.annualSavings / 2) - calc.hydroInitialCost),
      withHydral: Math.round(calc.hydroInitialCost + (calc.hydroYearlyCost / 2)),
      traditional: Math.round(calc.traditionalYearlyCost / 2),
      icon: Target,
      color: 'from-[#6B1E3E] to-[#8B2E4E]',
      highlight: 'Investissement rentabilisé',
      comparison: 'Dès maintenant, vous économisez'
    },
    {
      months: 12,
      label: '1 an',
      savings: Math.round(calc.annualSavings - calc.hydroInitialCost - calc.hydroYearlyCost),
      withHydral: calc.hydroInitialCost + calc.hydroYearlyCost,
      traditional: calc.traditionalYearlyCost,
      icon: Check,
      color: 'from-[#6B1E3E] to-[#8B2E4E]',
      highlight: `${Math.round(calc.annualSavings)}€ économisés`,
      comparison: 'Première année positive'
    },
    {
      months: 36,
      label: '3 ans',
      savings: Math.round((calc.annualSavings * 3) - calc.hydroInitialCost - (calc.hydroYearlyCost * 3)),
      withHydral: Math.round(calc.hydroInitialCost + (calc.hydroYearlyCost * 3)),
      traditional: Math.round(calc.traditionalYearlyCost * 3),
      icon: TrendingDown,
      color: 'from-[#6B1E3E] to-[#8B2E4E]',
      highlight: `${Math.round((calc.annualSavings * 3) - calc.hydroInitialCost - (calc.hydroYearlyCost * 3))}€ de gains nets`,
      comparison: 'Économies significatives'
    },
    {
      months: 60,
      label: '5 ans',
      savings: Math.round((calc.annualSavings * 5) - calc.hydroInitialCost - (calc.hydroYearlyCost * 5)),
      withHydral: Math.round(calc.hydroInitialCost + (calc.hydroYearlyCost * 5)),
      traditional: Math.round(calc.traditionalYearlyCost * 5),
      icon: Trophy,
      color: 'from-[#D4AF37] to-[#B8941F]',
      highlight: `${Math.round((calc.annualSavings * 5) - calc.hydroInitialCost - (calc.hydroYearlyCost * 5))}€ économisés`,
      comparison: 'Équivalent d\'un voyage de rêve'
    },
    {
      months: 120,
      label: '10 ans',
      savings: Math.round((calc.annualSavings * 10) - calc.hydroInitialCost - (calc.hydroYearlyCost * 10)),
      withHydral: Math.round(calc.hydroInitialCost + (calc.hydroYearlyCost * 10)),
      traditional: Math.round(calc.traditionalYearlyCost * 10),
      icon: Zap,
      color: 'from-[#D4AF37] to-[#B8941F]',
      highlight: `${Math.round((calc.annualSavings * 10) - calc.hydroInitialCost - (calc.hydroYearlyCost * 10))}€ de gains cumulés`,
      comparison: 'Équivalent d\'une voiture'
    }
  ];

  const householdOptions = [
    { size: 1, label: 'Solo', emoji: '👤' },
    { size: 2, label: 'Couple', emoji: '👥' },
    { size: 3, label: 'Trio', emoji: '👨‍👩‍👦' },
    { size: 4, label: 'Famille', emoji: '👨‍👩‍👧‍👦' },
    { size: 5, label: 'Famille+', emoji: '👨‍👩‍👧‍👧' }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container max-w-6xl mx-auto">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-6 border border-[#6B1E3E]/20"
          >
            <Clock className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Projection temporelle</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Vos économies dans le temps
          </h2>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Visualisez l'impact financier sur 10 ans
          </p>
        </motion.div>

        {/* Sélecteur taille foyer */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <label className="text-lg text-gray-700">Votre foyer :</label>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {householdOptions.map((option) => (
              <motion.button
                key={option.size}
                onClick={() => setHouseholdSize(option.size)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full border-2 transition-all ${
                  householdSize === option.size
                    ? 'border-[#6B1E3E] bg-[#6B1E3E] text-white shadow-lg'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-[#6B1E3E]/50'
                }`}
              >
                <span className="mr-2">{option.emoji}</span>
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mb-16">
          {/* Ligne de progression */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#6B1E3E] via-[#8B2E4E] to-[#D4AF37] -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4 relative">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isActive = activeMilestone === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setActiveMilestone(index)}
                  onHoverEnd={() => setActiveMilestone(null)}
                  className="relative"
                >
                  {/* Milestone Card */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.05 }}
                    className={`relative bg-gradient-to-br ${milestone.color} text-white rounded-2xl p-6 shadow-xl cursor-pointer ${
                      isActive ? 'ring-4 ring-[#D4AF37] ring-offset-2' : ''
                    }`}
                  >
                    {/* Icon Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                      className="w-14 h-14 mx-auto mb-4 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40"
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>

                    {/* Label */}
                    <div className="text-center mb-4">
                      <div className="text-sm uppercase tracking-wider text-white/80 mb-1">
                        {milestone.label}
                      </div>
                      <div className="text-sm text-white/70">{milestone.months} mois</div>
                    </div>

                    {/* Économies */}
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="text-center mb-4"
                    >
                      <div className="text-3xl lg:text-4xl font-light mb-1">
                        {milestone.savings > 0 ? '+' : ''}{milestone.savings}€
                      </div>
                      <div className="text-xs text-white/80">économisés</div>
                    </motion.div>

                    {/* Highlight */}
                    <div className="text-center text-sm text-white/90 mb-2">
                      {milestone.highlight}
                    </div>

                    {/* Hover: Détails */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-white/20"
                        >
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Avec HYDRAL</span>
                              <span className="text-white font-medium">{milestone.withHydral}€</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Sans HYDRAL</span>
                              <span className="text-white font-medium">{milestone.traditional}€</span>
                            </div>
                            <div className="text-xs text-white/60 mt-2">
                              {milestone.comparison}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Desktop: Point sur la ligne */}
                  <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-[#6B1E3E] rounded-full z-10" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Graphique comparatif */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl p-8 lg:p-12 border-2 border-gray-200"
        >
          <h3 className="text-2xl text-gray-900 mb-8 text-center">
            Comparaison visuelle : Avec vs Sans HYDRAL
          </h3>

          <div className="space-y-6">
            {milestones.slice(1).map((milestone, index) => {
              const maxValue = milestone.traditional;
              const withHydralPercent = (milestone.withHydral / maxValue) * 100;
              const traditionalPercent = 100;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{milestone.label}</span>
                    <span className="text-lg font-medium text-[#6B1E3E]">
                      -{milestone.savings}€ économisés
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* Avec HYDRAL */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-gray-600 w-24">Avec HYDRAL</span>
                        <div className="flex-1 h-10 bg-gray-100 rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${withHydralPercent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] flex items-center justify-end pr-3"
                          >
                            <span className="text-white text-sm font-medium">{milestone.withHydral}€</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Sans HYDRAL */}
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-gray-600 w-24">Sans HYDRAL</span>
                        <div className="flex-1 h-10 bg-gray-100 rounded-lg overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${traditionalPercent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                            className="h-full bg-gray-400 flex items-center justify-end pr-3"
                          >
                            <span className="text-white text-sm font-medium">{milestone.traditional}€</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full shadow-xl">
              <Sparkles className="w-6 h-6" />
              <span className="text-lg">
                Sur 10 ans : <span className="font-medium">{milestones[4].savings}€ économisés</span>
              </span>
            </div>
          </div>

          <motion.button
            onClick={() => navigate('configurator')}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium text-lg shadow-2xl hover:shadow-[#6B1E3E]/50 transition-all inline-flex items-center gap-3"
          >
            Commencer à économiser maintenant
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          <p className="text-sm text-gray-500 mt-6">
            490€ d'investissement • Rentabilisé en 6 mois • Économies garanties
          </p>
        </motion.div>
      </div>
    </section>
  );
}
