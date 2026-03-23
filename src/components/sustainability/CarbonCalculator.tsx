import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, TrendingDown, Award, CheckCircle, AlertCircle, BarChart3, Globe, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';

interface CalculatorResult {
  scenario: string;
  carbonKg: number;
  plasticKg: number;
  waterL: number;
  treesEquivalent: number;
  color: string;
}

export function CarbonCalculator() {
  const { language } = useLanguage();
  const [householdSize, setHouseholdSize] = useState<number>(4);
  const [bottlesPerWeek, setBottlesPerWeek] = useState<number>(20);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Calculations
  const bottlesPerYear = bottlesPerWeek * 52;
  
  // Scenario 1: Bouteilles plastique
  const bottlesCarbon = bottlesPerYear * 0.082; // 82g CO2 per bottle
  const bottlesPlastic = bottlesPerYear * 0.025; // 25g plastic per bottle
  const bottlesWater = 0; // No water waste
  const bottlesTrees = bottlesCarbon / 21; // 1 tree absorbs ~21kg CO2/year

  // Scenario 2: HYDRAO
  const hydraoCarbon = 12.5; // Manufacturing + shipping (one-time)
  const hydraoPlastic = 0.5; // Minimal packaging
  const hydraoWater = -15600; // Water saved (filtration vs bottled)
  const hydraoTrees = hydraoCarbon / 21;

  // Savings
  const carbonSaved = bottlesCarbon - hydraoCarbon;
  const plasticSaved = bottlesPlastic - hydraoPlastic;
  const waterSaved = Math.abs(hydraoWater);
  const treesSaved = bottlesTrees - hydraoTrees;

  const results: CalculatorResult[] = [
    {
      scenario: language === 'fr' ? 'Bouteilles plastique' : 'Plastic bottles',
      carbonKg: bottlesCarbon,
      plasticKg: bottlesPlastic,
      waterL: bottlesWater,
      treesEquivalent: bottlesTrees,
      color: 'red',
    },
    {
      scenario: 'HYDRAO',
      carbonKg: hydraoCarbon,
      plasticKg: hydraoPlastic,
      waterL: hydraoWater,
      treesEquivalent: hydraoTrees,
      color: 'green',
    },
  ];

  const impacts = [
    {
      label: language === 'fr' ? 'CO₂ économisé' : 'CO₂ saved',
      value: carbonSaved.toFixed(0),
      unit: 'kg/an',
      icon: <Leaf className="w-5 h-5" />,
      color: 'green',
      percentage: ((carbonSaved / bottlesCarbon) * 100).toFixed(0),
    },
    {
      label: language === 'fr' ? 'Plastique évité' : 'Plastic avoided',
      value: plasticSaved.toFixed(0),
      unit: 'kg/an',
      icon: <TrendingDown className="w-5 h-5" />,
      color: 'blue',
      percentage: ((plasticSaved / bottlesPlastic) * 100).toFixed(0),
    },
    {
      label: language === 'fr' ? 'Eau économisée' : 'Water saved',
      value: waterSaved.toFixed(0),
      unit: 'L/an',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'cyan',
      percentage: '100',
    },
    {
      label: language === 'fr' ? 'Arbres équivalent' : 'Trees equivalent',
      value: treesSaved.toFixed(1),
      unit: language === 'fr' ? 'arbres' : 'trees',
      icon: <Globe className="w-5 h-5" />,
      color: 'emerald',
      percentage: ((treesSaved / bottlesTrees) * 100).toFixed(0),
    },
  ];

  const stats = [
    {
      value: '97%',
      label: language === 'fr' ? 'Réduction CO₂' : 'CO₂ reduction',
      icon: <TrendingDown className="w-5 h-5" />,
    },
    {
      value: '98%',
      label: language === 'fr' ? 'Plastique évité' : 'Plastic avoided',
      icon: <Leaf className="w-5 h-5" />,
    },
    {
      value: '15 600L',
      label: language === 'fr' ? 'Eau économisée' : 'Water saved',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      value: '49',
      label: language === 'fr' ? 'Arbres équiv.' : 'Trees equiv.',
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Leaf className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Calculateur Empreinte Carbone'}
            {language === 'en' && 'Carbon Footprint Calculator'}
            {language === 'es' && 'Calculadora Huella Carbono'}
            {language === 'it' && 'Calcolatore Impronta Carbonio'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Mesurez votre impact environnemental avec HYDRAO'}
            {language === 'en' && 'Measure your environmental impact with HYDRAO'}
            {language === 'es' && 'Mide tu impacto ambiental con HYDRAO'}
            {language === 'it' && 'Misura il tuo impatto ambientale con HYDRAO'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
          >
            <div className="flex items-center gap-2 mb-2 text-green-600">
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Calculator Form */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
        <h3 className="font-bold text-xl text-gray-900 mb-4">
          {language === 'fr' && 'Calculez votre impact'}
          {language === 'en' && 'Calculate your impact'}
          {language === 'es' && 'Calcula tu impacto'}
          {language === 'it' && 'Calcola il tuo impatto'}
        </h3>

        <div className="space-y-6">
          {/* Household Size */}
          <div>
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

          {/* Bottles per Week */}
          <div>
            <label className="block font-semibold text-gray-900 mb-3">
              {language === 'fr' && 'Bouteilles d\'eau achetées par semaine'}
              {language === 'en' && 'Water bottles purchased per week'}
              {language === 'es' && 'Botellas de agua compradas por semana'}
              {language === 'it' && 'Bottiglie d\'acqua acquistate a settimana'}
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="50"
                value={bottlesPerWeek}
                onChange={(e) => setBottlesPerWeek(parseInt(e.target.value))}
                className="flex-1 h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="w-16 h-12 bg-white rounded-lg border-2 border-blue-300 flex items-center justify-center font-bold text-xl text-gray-900">
                {bottlesPerWeek}
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              {language === 'fr' ? 'Soit' : 'That\'s'} <span className="font-bold text-blue-600">{bottlesPerYear}</span> {language === 'fr' ? 'bouteilles/an' : 'bottles/year'}
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            {language === 'fr' && 'Calculer mon impact'}
            {language === 'en' && 'Calculate my impact'}
            {language === 'es' && 'Calcular mi impacto'}
            {language === 'it' && 'Calcola il mio impatto'}
          </button>
        </div>
      </div>

      {/* Results */}
      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Comparison */}
          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-4">
              {language === 'fr' && 'Comparaison environnementale'}
              {language === 'en' && 'Environmental comparison'}
              {language === 'es' && 'Comparación ambiental'}
              {language === 'it' && 'Confronto ambientale'}
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className={`bg-gradient-to-br from-${result.color}-500 to-${result.color}-600 rounded-xl p-6 text-white`}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">
                      {result.color === 'red' ? '🏭' : '🌿'}
                    </div>
                    <h4 className="font-bold text-2xl">{result.scenario}</h4>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-sm opacity-75 mb-1">
                        {language === 'fr' ? 'Émissions CO₂' : 'CO₂ emissions'}
                      </div>
                      <div className="text-2xl font-bold">{result.carbonKg.toFixed(1)} kg/an</div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-sm opacity-75 mb-1">
                        {language === 'fr' ? 'Plastique utilisé' : 'Plastic used'}
                      </div>
                      <div className="text-2xl font-bold">{result.plasticKg.toFixed(1)} kg/an</div>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-sm opacity-75 mb-1">
                        {language === 'fr' ? 'Arbres équivalent' : 'Trees equivalent'}
                      </div>
                      <div className="text-2xl font-bold">{result.treesEquivalent.toFixed(1)} {language === 'fr' ? 'arbres' : 'trees'}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Savings Impact */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-xl text-gray-900">
                {language === 'fr' && 'Votre impact positif avec HYDRAO'}
                {language === 'en' && 'Your positive impact with HYDRAO'}
                {language === 'es' && 'Tu impacto positivo con HYDRAO'}
                {language === 'it' && 'Il tuo impatto positivo con HYDRAO'}
              </h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {impacts.map((impact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`bg-gradient-to-br from-${impact.color}-50 to-${impact.color}-100 rounded-xl p-4 border-2 border-${impact.color}-200 text-center`}
                >
                  <div className={`w-12 h-12 bg-${impact.color}-200 rounded-full flex items-center justify-center text-${impact.color}-700 mx-auto mb-3`}>
                    {impact.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {impact.value}
                    <span className="text-lg ml-1">{impact.unit}</span>
                  </div>
                  <div className="text-sm text-gray-700 font-semibold mb-2">{impact.label}</div>
                  <div className={`bg-${impact.color}-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block`}>
                    -{impact.percentage}%
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contextual Examples */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
            <h3 className="font-bold text-xl text-gray-900 mb-4">
              {language === 'fr' && 'Pour mieux comprendre...'}
              {language === 'en' && 'To better understand...'}
              {language === 'es' && 'Para entender mejor...'}
              {language === 'it' && 'Per capire meglio...'}
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl mb-2">🚗</div>
                <div className="font-bold text-gray-900 mb-1">
                  {language === 'fr' ? 'Équivalent voiture' : 'Car equivalent'}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'fr' 
                    ? `${(carbonSaved / 0.12).toFixed(0)} km évités`
                    : `${(carbonSaved / 0.12).toFixed(0)} km avoided`}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl mb-2">🌳</div>
                <div className="font-bold text-gray-900 mb-1">
                  {language === 'fr' ? 'Forêt plantée' : 'Forest planted'}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'fr'
                    ? `${treesSaved.toFixed(0)} arbres préservés`
                    : `${treesSaved.toFixed(0)} trees preserved`}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="text-3xl mb-2">🏊</div>
                <div className="font-bold text-gray-900 mb-1">
                  {language === 'fr' ? 'Piscines olympiques' : 'Olympic pools'}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'fr'
                    ? `${(waterSaved / 2500).toFixed(1)} piscines`
                    : `${(waterSaved / 2500).toFixed(1)} pools`}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#6B1E3E] to-green-600 rounded-xl p-8 text-white text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-90" />
            <h3 className="font-bold text-2xl mb-3">
              {language === 'fr' && 'Rejoignez le mouvement écologique HYDRAO'}
              {language === 'en' && 'Join the HYDRAO ecological movement'}
              {language === 'es' && 'Únete al movimiento ecológico HYDRAO'}
              {language === 'it' && 'Unisciti al movimento ecologico HYDRAO'}
            </h3>
            <p className="text-lg opacity-90 mb-6">
              {language === 'fr' && `En 1 an avec HYDRAO, vous économisez ${carbonSaved.toFixed(0)}kg de CO₂ et évitez ${plasticSaved.toFixed(0)}kg de plastique.`}
              {language === 'en' && `In 1 year with HYDRAO, you save ${carbonSaved.toFixed(0)}kg of CO₂ and avoid ${plasticSaved.toFixed(0)}kg of plastic.`}
              {language === 'es' && `En 1 año con HYDRAO, ahorras ${carbonSaved.toFixed(0)}kg de CO₂ y evitas ${plasticSaved.toFixed(0)}kg de plástico.`}
              {language === 'it' && `In 1 anno con HYDRAO, risparmi ${carbonSaved.toFixed(0)}kg di CO₂ ed eviti ${plasticSaved.toFixed(0)}kg di plastica.`}
            </p>

            <button className="px-8 py-4 bg-white text-[#6B1E3E] rounded-lg font-bold hover:bg-gray-100 transition-colors">
              {language === 'fr' && 'Commander HYDRAO maintenant'}
              {language === 'en' && 'Order HYDRAO now'}
              {language === 'es' && 'Pedir HYDRAO ahora'}
              {language === 'it' && 'Ordina HYDRAO ora'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
