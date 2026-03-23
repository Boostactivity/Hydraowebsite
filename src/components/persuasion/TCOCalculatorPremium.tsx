import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, DollarSign, Calendar, Award, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

type TimeRange = '1' | '3' | '5' | '10';

interface Scenario {
  id: string;
  name: string;
  color: string;
  icon: string;
  costs: {
    initial: number;
    yearly: number;
  };
}

export function TCOCalculatorPremium() {
  const { language } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>('5');
  const [householdSize, setHouseholdSize] = useState<number>(4);

  const years = parseInt(timeRange);

  // Calculs basés sur taille du foyer
  const bottlesPerWeek = householdSize * 5; // 5 bouteilles/personne/semaine
  const bottlesPerYear = bottlesPerWeek * 52;
  const bottlesCost = bottlesPerYear * 0.30; // 0.30€/bouteille

  const scenarios: Scenario[] = [
    {
      id: 'hydrao',
      name: 'HYDRAO',
      color: '#6B1E3E',
      icon: '💎',
      costs: {
        initial: 490,
        yearly: 89, // Abonnement moyen
      },
    },
    {
      id: 'bottles',
      name: language === 'fr' ? 'Bouteilles' : 'Bottles',
      color: '#EF4444',
      icon: '🍾',
      costs: {
        initial: 0,
        yearly: bottlesCost,
      },
    },
    {
      id: 'kettle',
      name: language === 'fr' ? 'Bouilloire' : 'Kettle',
      color: '#F97316',
      icon: '☕',
      costs: {
        initial: 150,
        yearly: 380, // Bouteilles + électricité bouilloire
      },
    },
  ];

  const calculateTCO = (scenario: Scenario) => {
    return scenario.costs.initial + scenario.costs.yearly * years;
  };

  const hydraoTCO = calculateTCO(scenarios[0]);
  const bottlesTCO = calculateTCO(scenarios[1]);
  const kettleTCO = calculateTCO(scenarios[2]);

  const savingsVsBottles = bottlesTCO - hydraoTCO;
  const savingsVsKettle = kettleTCO - hydraoTCO;

  // Calcul point de rentabilité (break-even)
  const breakEvenMonths = Math.ceil(
    scenarios[0].costs.initial / ((bottlesCost - scenarios[0].costs.yearly) / 12)
  );

  const maxTCO = Math.max(hydraoTCO, bottlesTCO, kettleTCO);

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: '1', label: language === 'fr' ? '1 an' : '1 year' },
    { value: '3', label: language === 'fr' ? '3 ans' : '3 years' },
    { value: '5', label: language === 'fr' ? '5 ans' : '5 years' },
    { value: '10', label: language === 'fr' ? '10 ans' : '10 years' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-[#6B1E3E]/10 rounded-full flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-[#6B1E3E]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Coût Total de Possession (TCO)'}
            {language === 'en' && 'Total Cost of Ownership (TCO)'}
            {language === 'es' && 'Coste Total de Propiedad (TCO)'}
            {language === 'it' && 'Costo Totale di Proprietà (TCO)'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Comparez le coût réel sur plusieurs années'}
            {language === 'en' && 'Compare real cost over multiple years'}
            {language === 'es' && 'Compara el coste real durante varios años'}
            {language === 'it' && 'Confronta il costo reale su più anni'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Household Size */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
          <label className="block font-semibold text-gray-900 mb-3">
            {language === 'fr' && 'Nombre de personnes au foyer'}
            {language === 'en' && 'Household members'}
            {language === 'es' && 'Miembros del hogar'}
            {language === 'it' && 'Membri della famiglia'}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="8"
              value={householdSize}
              onChange={(e) => setHouseholdSize(parseInt(e.target.value))}
              className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="w-16 h-12 bg-white rounded-lg border-2 border-blue-300 flex items-center justify-center font-bold text-xl text-gray-900">
              {householdSize}
            </div>
          </div>
        </div>

        {/* Time Range */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
          <label className="block font-semibold text-gray-900 mb-3">
            {language === 'fr' && 'Période d\'analyse'}
            {language === 'en' && 'Analysis period'}
            {language === 'es' && 'Período de análisis'}
            {language === 'it' && 'Periodo di analisi'}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                  timeRange === range.value
                    ? 'bg-[#6B1E3E] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TCO Comparison Bars */}
      <div className="mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && `Coût total sur ${years} ${years === 1 ? 'an' : 'ans'}`}
          {language === 'en' && `Total cost over ${years} ${years === 1 ? 'year' : 'years'}`}
          {language === 'es' && `Coste total en ${years} ${years === 1 ? 'año' : 'años'}`}
          {language === 'it' && `Costo totale su ${years} ${years === 1 ? 'anno' : 'anni'}`}
        </h3>

        <div className="space-y-4">
          {scenarios.map((scenario, index) => {
            const tco = calculateTCO(scenario);
            const percentage = (tco / maxTCO) * 100;
            const isHydrao = scenario.id === 'hydrao';

            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br ${
                  isHydrao
                    ? 'from-[#6B1E3E]/10 to-purple-50 border-2 border-[#6B1E3E]'
                    : 'from-gray-50 to-gray-100 border border-gray-200'
                } rounded-xl p-4`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{scenario.icon}</div>
                    <div>
                      <div className="font-bold text-gray-900">{scenario.name}</div>
                      <div className="text-sm text-gray-600">
                        {language === 'fr' ? 'Initial' : 'Initial'}: {scenario.costs.initial}€ + {scenario.costs.yearly}€/an
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      {tco.toLocaleString()}€
                    </div>
                    {isHydrao && (
                      <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mt-1">
                        {language === 'fr' ? 'Meilleur choix' : 'Best choice'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                    className={`h-4 rounded-full`}
                    style={{ 
                      background: isHydrao 
                        ? 'linear-gradient(to right, #6B1E3E, #9333EA)' 
                        : `linear-gradient(to right, ${scenario.color}, ${scenario.color}dd)`
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Savings Highlight */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-6 h-6" />
            <div className="font-semibold">
              {language === 'fr' && 'Économies vs Bouteilles'}
              {language === 'en' && 'Savings vs Bottles'}
              {language === 'es' && 'Ahorros vs Botellas'}
              {language === 'it' && 'Risparmi vs Bottiglie'}
            </div>
          </div>
          <div className="text-4xl font-bold mb-1">
            {savingsVsBottles.toLocaleString()}€
          </div>
          <div className="text-sm opacity-90">
            {language === 'fr' && `Sur ${years} ${years === 1 ? 'an' : 'ans'}`}
            {language === 'en' && `Over ${years} ${years === 1 ? 'year' : 'years'}`}
            {language === 'es' && `En ${years} ${years === 1 ? 'año' : 'años'}`}
            {language === 'it' && `Su ${years} ${years === 1 ? 'anno' : 'anni'}`}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6" />
            <div className="font-semibold">
              {language === 'fr' && 'Point de rentabilité'}
              {language === 'en' && 'Break-even point'}
              {language === 'es' && 'Punto de equilibrio'}
              {language === 'it' && 'Punto di pareggio'}
            </div>
          </div>
          <div className="text-4xl font-bold mb-1">
            {breakEvenMonths} {language === 'fr' ? 'mois' : 'months'}
          </div>
          <div className="text-sm opacity-90">
            {language === 'fr' && 'Puis 100% profit'}
            {language === 'en' && 'Then 100% profit'}
            {language === 'es' && 'Luego 100% beneficio'}
            {language === 'it' && 'Poi 100% profitto'}
          </div>
        </motion.div>
      </div>

      {/* Timeline Visualization */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
        <h3 className="font-bold text-lg text-gray-900 mb-4">
          {language === 'fr' && 'Évolution du coût mois par mois'}
          {language === 'en' && 'Cost evolution month by month'}
          {language === 'es' && 'Evolución del coste mes a mes'}
          {language === 'it' && 'Evoluzione del costo mese per mese'}
        </h3>

        <div className="grid grid-cols-12 gap-1 mb-4">
          {Array.from({ length: Math.min(years * 12, 60) }).map((_, month) => {
            const monthNum = month + 1;
            const hydraoMonthCost = scenarios[0].costs.initial + (scenarios[0].costs.yearly / 12) * monthNum;
            const bottlesMonthCost = (bottlesCost / 12) * monthNum;
            const isBreakEven = monthNum === breakEvenMonths;

            return (
              <div
                key={month}
                className={`h-16 rounded ${
                  isBreakEven
                    ? 'bg-yellow-400 ring-2 ring-yellow-500'
                    : hydraoMonthCost < bottlesMonthCost
                    ? 'bg-green-500'
                    : 'bg-red-400'
                }`}
                title={`Mois ${monthNum}`}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded" />
            <span className="text-gray-700">
              {language === 'fr' ? 'Investissement' : 'Investment'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded ring-2 ring-yellow-500" />
            <span className="text-gray-700">
              {language === 'fr' ? 'Break-even' : 'Break-even'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded" />
            <span className="text-gray-700">
              {language === 'fr' ? 'Économies' : 'Savings'}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-6 text-white text-center"
      >
        <Award className="w-10 h-10 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-xl mb-2">
          {language === 'fr' && `Économisez ${savingsVsBottles.toLocaleString()}€ en ${years} ans`}
          {language === 'en' && `Save €${savingsVsBottles.toLocaleString()} in ${years} years`}
          {language === 'es' && `Ahorra ${savingsVsBottles.toLocaleString()}€ en ${years} años`}
          {language === 'it' && `Risparmia ${savingsVsBottles.toLocaleString()}€ in ${years} anni`}
        </h3>
        <p className="text-sm opacity-90 mb-4">
          {language === 'fr' && `Rentabilisé en ${breakEvenMonths} mois, puis profit pur`}
          {language === 'en' && `Paid off in ${breakEvenMonths} months, then pure profit`}
          {language === 'es' && `Amortizado en ${breakEvenMonths} meses, luego beneficio puro`}
          {language === 'it' && `Ammortizzato in ${breakEvenMonths} mesi, poi profitto puro`}
        </p>
        <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-bold hover:bg-gray-100 transition-colors">
          {language === 'fr' && 'Commencer mes économies'}
          {language === 'en' && 'Start saving'}
          {language === 'es' && 'Empezar a ahorrar'}
          {language === 'it' && 'Inizia a risparmiare'}
        </button>
      </motion.div>
    </div>
  );
}
