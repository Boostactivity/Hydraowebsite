import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Droplet,
  Heart,
  Leaf,
  Clock,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Target,
  PiggyBank,
  TreePine,
  AlertCircle,
  Star,
  Zap,
  Search,
  Package
} from 'lucide-react';
import { Page } from '../App';
import {
  getUniqueMarques,
  getFormatsForMarque,
  getMicroplasticsPerBottle,
  type AggregatedWater
} from '../data/waterDatabase';

interface UltimateCalculatorProps {
  navigate: (page: Page) => void;
}

// ==================== TYPES ====================
type CalculatorMode = 'simple' | 'detailed';
type HouseholdType = 'solo' | 'couple' | 'family' | 'family-plus';
type Priority = 'savings' | 'health' | 'environment' | 'time';
type SKUType = 'sku2' | 'sku1' | 'sku3';

// ==================== INTERFACES ====================
interface SimpleInput {
  household: HouseholdType;
  bottlesPerWeek: number;
  priorities: Priority[];
}

interface DetailedInput {
  waterType: 'plate' | 'gazeuse' | null;
  selectedBrand: string | null;
  selectedProduct: AggregatedWater | null;
  packsPerWeek: number;
  selectedSKU: SKUType | null;
  householdSize: number;
}

interface CalculatorResults {
  current: {
    yearlyBottleCost: number;
    monthlyBottleCost: number;
    yearlyMicroplastics: number;
    yearlyPlasticKg: number;
    yearlyBottles: number;
    shoppingHours: number;
    kettleHours: number;
  };
  withHydro: {
    yearlySavings: number;
    savings5Years: number;
    breakEvenMonths: number;
    microplasticsAvoided: number;
    plasticKgAvoided: number;
    co2KgAvoided: number;
    treesEquivalent: number;
    timeSavedHours: number;
    costPerDay: number;
    skuPrice: number;
    subscriptionYearly: number;
  };
  comparison: {
    costPerDayWithoutHydro: number;
    costPerDaySaved: number;
    savings1Year: number;
    if6MonthsLater: number;
  };
  peerData: {
    recommendedModel: string;
    recommendedSubscription: string;
    percentageChose: number;
  };
}

// ==================== SKU OPTIONS ====================
const skuOptions = [
  {
    value: 'sku2' as SKUType,
    label: 'SKU2 - Bouillant + Filtré',
    price: 490,
    description: 'Eau bouillante instantanée + eau filtrée',
    features: ['Eau bouillante', 'Eau filtrée', 'Idéal pour thé/café'],
    hasGazeux: false
  },
  {
    value: 'sku1' as SKUType,
    label: 'SKU1 - Froid + Gazeux + Filtré',
    price: 890,
    description: 'Eau froide + eau gazeuse + eau filtrée',
    features: ['Eau froide', 'Eau gazeuse', 'Eau filtrée', 'Parfait pour apéros'],
    hasGazeux: true
  },
  {
    value: 'sku3' as SKUType,
    label: 'SKU3 - Complet 5-en-1',
    price: 990,
    description: 'Tout-en-un : bouillant + froid + gazeux + filtré',
    features: ['Eau bouillante', 'Eau froide', 'Eau gazeuse', 'Eau filtrée', 'Solution complète'],
    hasGazeux: true,
    recommended: true
  }
];

// ==================== COMPOSANT PRINCIPAL ====================
export function UltimateCalculator({ navigate }: UltimateCalculatorProps) {
  const [mode, setMode] = useState<CalculatorMode>('detailed');

  // Simple mode state
  const [simpleStep, setSimpleStep] = useState<'input' | 'results'>('input');
  const [simpleInput, setSimpleInput] = useState<SimpleInput>({
    household: 'family',
    bottlesPerWeek: 12,
    priorities: []
  });

  // Detailed mode state
  const [detailedInput, setDetailedInput] = useState<DetailedInput>({
    waterType: null,
    selectedBrand: null,
    selectedProduct: null,
    packsPerWeek: 2,
    selectedSKU: null,
    householdSize: 0
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);

  const householdOptions = [
    { value: 'solo' as HouseholdType, label: 'Solo', subtitle: '1 personne', icon: Users, defaultBottles: 6 },
    { value: 'couple' as HouseholdType, label: 'Couple', subtitle: '2 personnes', icon: Users, defaultBottles: 10 },
    { value: 'family' as HouseholdType, label: 'Famille', subtitle: '3-4 personnes', icon: Users, defaultBottles: 16 },
    { value: 'family-plus' as HouseholdType, label: 'Famille+', subtitle: '5+ personnes', icon: Users, defaultBottles: 24 }
  ];

  const priorityOptions = [
    { value: 'savings' as Priority, label: 'Économiser de l\'argent', icon: PiggyBank },
    { value: 'health' as Priority, label: 'Protéger ma santé', icon: Heart },
    { value: 'environment' as Priority, label: 'Réduire mes déchets plastique', icon: Leaf },
    { value: 'time' as Priority, label: 'Gagner du temps au quotidien', icon: Clock }
  ];

  useEffect(() => {
    const selected = householdOptions.find(h => h.value === simpleInput.household);
    if (selected) {
      setSimpleInput(prev => ({ ...prev, bottlesPerWeek: selected.defaultBottles }));
    }
  }, [simpleInput.household]);

  // Auto-select SKU based on water type
  useEffect(() => {
    if (detailedInput.waterType === 'gazeuse' && detailedInput.selectedSKU === 'sku2') {
      setDetailedInput(prev => ({ ...prev, selectedSKU: 'sku1' }));
    }
  }, [detailedInput.waterType]);

  // ==================== FONCTIONS DE CALCUL ====================
  function getSubscriptionPrice(householdSize: number): number {
    if (householdSize <= 2) return 59;
    if (householdSize <= 4) return 99;
    return 119;
  }

  function getSKUPrice(sku: SKUType | null): number {
    const found = skuOptions.find(s => s.value === sku);
    return found ? found.price : 490;
  }

  const calculateSimpleResults = (): CalculatorResults => {
    const avgBottlePrice = 0.50; // prix moyen pondéré toutes eaux
    const avgLitersPerBottle = 1.5;
    const hydroPrice = 490;
    const subscriptionYearly = 99;

    const yearlyBottles = simpleInput.bottlesPerWeek * 52;
    const yearlyBottleCost = yearlyBottles * avgBottlePrice;
    const monthlyBottleCost = yearlyBottleCost / 12;

    const monthlySavings = monthlyBottleCost - (subscriptionYearly / 12);
    const yearlySavings = yearlyBottleCost - subscriptionYearly;
    const savings5Years = (yearlyBottleCost * 5) - (hydroPrice + (subscriptionYearly * 5));
    const breakEvenMonths = monthlySavings > 0 ? hydroPrice / monthlySavings : 999;

    const microplasticsPerBottle = getMicroplasticsPerBottle(avgLitersPerBottle);
    const yearlyMicroplastics = yearlyBottles * microplasticsPerBottle;
    const plasticWeightPerBottle = 0.034;
    const co2PerBottle = 0.063;
    const yearlyPlasticKg = yearlyBottles * plasticWeightPerBottle;
    const yearlyCO2kg = yearlyBottles * co2PerBottle;
    const treesEquivalent = Math.max(1, Math.round(yearlyCO2kg / 12));

    const kettleBoilsPerDay = simpleInput.household === 'solo' ? 3 : simpleInput.household === 'couple' ? 5 : simpleInput.household === 'family' ? 8 : 12;
    const shoppingTrips = Math.ceil(yearlyBottles / 26);
    const shoppingHours = shoppingTrips * 0.75;
    const kettleHoursPerYear = (kettleBoilsPerDay * 3 * 365) / 60;
    const totalTimeSaved = shoppingHours + kettleHoursPerYear;

    const costPerDayWithoutHydro = yearlyBottleCost / 365;
    const costPerDayWithHydro = subscriptionYearly / 365;
    const costPerDaySaved = costPerDayWithoutHydro - costPerDayWithHydro;
    const if6MonthsLater = monthlyBottleCost * 6;

    const peerData = simpleInput.household === 'family' || simpleInput.household === 'family-plus'
      ? { recommendedModel: 'SKU3', recommendedSubscription: 'Standard', percentageChose: 87 }
      : { recommendedModel: 'SKU2', recommendedSubscription: 'Essentiel', percentageChose: 76 };

    return {
      current: { yearlyBottleCost, monthlyBottleCost, yearlyMicroplastics, yearlyPlasticKg, yearlyBottles, shoppingHours, kettleHours: kettleHoursPerYear },
      withHydro: { yearlySavings, savings5Years, breakEvenMonths, microplasticsAvoided: yearlyMicroplastics, plasticKgAvoided: yearlyPlasticKg, co2KgAvoided: yearlyCO2kg, treesEquivalent, timeSavedHours: totalTimeSaved, costPerDay: costPerDayWithHydro, skuPrice: hydroPrice, subscriptionYearly },
      comparison: { costPerDayWithoutHydro, costPerDaySaved, savings1Year: yearlySavings, if6MonthsLater },
      peerData
    };
  };

  const calculateDetailedResults = (): CalculatorResults => {
    if (!detailedInput.selectedProduct) return calculateSimpleResults();

    const product = detailedInput.selectedProduct;
    const hydroPrice = getSKUPrice(detailedInput.selectedSKU);
    const subscriptionYearly = getSubscriptionPrice(detailedInput.householdSize);

    const packsPerYear = detailedInput.packsPerWeek * 52;
    const yearlyBottleCost = packsPerYear * product.prixMoyen;
    const monthlyBottleCost = yearlyBottleCost / 12;
    const yearlyBottles = packsPerYear * product.bottlesPerPack;

    const monthlySavings = monthlyBottleCost - (subscriptionYearly / 12);
    const yearlySavings = yearlyBottleCost - subscriptionYearly;
    const savings5Years = (yearlyBottleCost * 5) - (hydroPrice + (subscriptionYearly * 5));
    const breakEvenMonths = monthlySavings > 0 ? hydroPrice / monthlySavings : 999;

    const microplasticsPerBottle = getMicroplasticsPerBottle(product.litersPerBottle);
    const yearlyMicroplastics = yearlyBottles * microplasticsPerBottle;
    const plasticWeightPerBottle = 0.034;
    const co2PerBottle = 0.063;
    const yearlyPlasticKg = yearlyBottles * plasticWeightPerBottle;
    const yearlyCO2kg = yearlyBottles * co2PerBottle;
    const treesEquivalent = Math.max(1, Math.round(yearlyCO2kg / 12));

    const shoppingTrips = Math.ceil(yearlyBottles / 26);
    const shoppingHours = shoppingTrips * 0.75;
    const nbPersonnes = detailedInput.householdSize || 2;
    const kettleBoilsPerDay = nbPersonnes <= 1 ? 3 : nbPersonnes <= 2 ? 5 : nbPersonnes <= 4 ? 8 : 12;
    const kettleHoursPerYear = (kettleBoilsPerDay * 3 * 365) / 60;
    const totalTimeSaved = shoppingHours + kettleHoursPerYear;

    const costPerDayWithoutHydro = yearlyBottleCost / 365;
    const costPerDayWithHydro = subscriptionYearly / 365;
    const costPerDaySaved = costPerDayWithoutHydro - costPerDayWithHydro;
    const if6MonthsLater = monthlyBottleCost * 6;

    const recommendedModel = skuOptions.find(s => s.value === detailedInput.selectedSKU)?.label.split(' - ')[0] || 'SKU3';
    const recommendedSub = detailedInput.householdSize <= 2 ? 'Essentiel' : detailedInput.householdSize <= 4 ? 'Standard' : 'Plus';
    const peerData = { recommendedModel, recommendedSubscription: recommendedSub, percentageChose: 87 };

    return {
      current: { yearlyBottleCost, monthlyBottleCost, yearlyMicroplastics, yearlyPlasticKg, yearlyBottles, shoppingHours, kettleHours: kettleHoursPerYear },
      withHydro: { yearlySavings, savings5Years, breakEvenMonths, microplasticsAvoided: yearlyMicroplastics, plasticKgAvoided: yearlyPlasticKg, co2KgAvoided: yearlyCO2kg, treesEquivalent, timeSavedHours: totalTimeSaved, costPerDay: costPerDayWithHydro, skuPrice: hydroPrice, subscriptionYearly },
      comparison: { costPerDayWithoutHydro, costPerDaySaved, savings1Year: yearlySavings, if6MonthsLater },
      peerData
    };
  };

  const handleSimpleCalculate = () => {
    setResults(calculateSimpleResults());
    setSimpleStep('results');
  };

  const handleDetailedCalculate = () => {
    const calculatedResults = calculateDetailedResults();
    setResults(calculatedResults);

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('calculatorData', JSON.stringify({
        selectedSKU: detailedInput.selectedSKU,
        yearlySavings: calculatedResults.withHydro.yearlySavings,
        householdSize: detailedInput.householdSize
      }));
    }
  };

  const handleRecalculate = () => {
    if (mode === 'simple') setSimpleStep('input');
    setResults(null);
  };

  const formatNumber = (num: number) => new Intl.NumberFormat('fr-FR').format(Math.round(num));
  const formatCurrency = (num: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);

  const getDynamicSubtitle = (yearlyAmount: number): string => {
    if (yearlyAmount < 100) return "Soit le prix d'un bon restaurant chaque année";
    if (yearlyAmount < 250) return "Soit l'équivalent d'un week-end en famille chaque année";
    if (yearlyAmount < 500) return "Soit presque le prix d'un billet d'avion aller-retour";
    return "Soit le prix d'un robinet HYDRAL — chaque année";
  };

  const generate5YearChartData = () => {
    if (!results) return [];
    const data = [];
    for (let year = 0; year <= 5; year++) {
      const bottleCost = results.current.yearlyBottleCost * year;
      const hydroCost = results.withHydro.skuPrice + (results.withHydro.subscriptionYearly * year);
      data.push({
        year,
        'Eau embouteillée': Math.round(bottleCost),
        'HYDRAL': Math.round(hydroCost)
      });
    }
    return data;
  };

  const findBreakEvenPoint = () => {
    if (!results) return null;
    const breakEvenYear = results.withHydro.breakEvenMonths / 12;
    if (breakEvenYear > 5) return null;
    const bottleCost = results.current.yearlyBottleCost * breakEvenYear;
    return { year: breakEvenYear, value: Math.round(bottleCost) };
  };

  const canCalculate = detailedInput.waterType
    && detailedInput.selectedBrand
    && detailedInput.selectedProduct
    && detailedInput.packsPerWeek > 0
    && detailedInput.selectedSKU
    && detailedInput.householdSize > 0;

  const yearlyBottleCost = detailedInput.selectedProduct
    ? detailedInput.packsPerWeek * 52 * detailedInput.selectedProduct.prixMoyen
    : 0;
  const monthlyBottleCost = yearlyBottleCost / 12;

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-white to-[#F5E6ED]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6B1E3E]/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6B1E3E]/20 to-transparent"></div>
      <div className="absolute inset-0 shadow-[inset_0_2px_8px_rgba(107,30,62,0.03),inset_0_-2px_8px_rgba(107,30,62,0.03)] pointer-events-none"></div>

      <div className="relative section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-[#6B1E3E]/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#6B1E3E]" />
            <span className="text-sm font-medium text-[#6B1E3E]">Simulateur personnalisé</span>
          </div>
          <h2 className="mb-4">
            <span className="block text-gray-900">Découvrez en 30 secondes</span>
            <span className="block text-[#6B1E3E]">ce que HYDRAL change pour vous</span>
          </h2>
          <p className="text-lg text-[#6B5E54] max-w-2xl mx-auto mb-8">
            Votre simulation personnalisée : économies, santé, environnement, temps gagné.
          </p>

          <div className="inline-flex items-center gap-2 p-1 bg-white/80 backdrop-blur-sm border-2 border-[#6B1E3E]/10 rounded-full">
            <button
              onClick={() => { setMode('detailed'); setResults(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${mode === 'detailed' ? 'bg-[#6B1E3E] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Search className="w-4 h-4" />
              <span className="font-medium">Mode complet</span>
            </button>
            <button
              onClick={() => { setMode('simple'); setResults(null); setSimpleStep('input'); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${mode === 'simple' ? 'bg-[#6B1E3E] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <Zap className="w-4 h-4" />
              <span className="font-medium">Mode simple</span>
            </button>
          </div>
        </motion.div>

        {mode === 'simple' && (
          <AnimatePresence mode="wait">
            {simpleStep === 'input' ? (
              <SimpleInputView
                simpleInput={simpleInput}
                setSimpleInput={setSimpleInput}
                householdOptions={householdOptions}
                priorityOptions={priorityOptions}
                handleCalculate={handleSimpleCalculate}
              />
            ) : results ? (
              <SimpleResultsView
                results={results}
                simpleInput={simpleInput}
                navigate={navigate}
                handleRecalculate={handleRecalculate}
                formatNumber={formatNumber}
                formatCurrency={formatCurrency}
              />
            ) : null}
          </AnimatePresence>
        )}

        {mode === 'detailed' && !results && (
          <DetailedCalculator
            detailedInput={detailedInput}
            setDetailedInput={setDetailedInput}
            formatCurrency={formatCurrency}
            formatNumber={formatNumber}
            getDynamicSubtitle={getDynamicSubtitle}
            handleCalculate={handleDetailedCalculate}
            canCalculate={canCalculate}
            yearlyBottleCost={yearlyBottleCost}
            monthlyBottleCost={monthlyBottleCost}
            skuOptions={skuOptions}
            getSubscriptionPrice={getSubscriptionPrice}
          />
        )}

        {mode === 'detailed' && results && (
          <DetailedResultsView
            results={results}
            detailedInput={detailedInput}
            navigate={navigate}
            handleRecalculate={handleRecalculate}
            formatNumber={formatNumber}
            formatCurrency={formatCurrency}
            generate5YearChartData={generate5YearChartData}
            findBreakEvenPoint={findBreakEvenPoint}
            skuOptions={skuOptions}
          />
        )}
      </div>

      <style>{`
        .slider-thumb-bordeaux::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #6B1E3E;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(107, 30, 62, 0.3);
          transition: all 0.2s ease;
        }
        .slider-thumb-bordeaux::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(107, 30, 62, 0.4);
        }
        .slider-thumb-bordeaux::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #6B1E3E;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(107, 30, 62, 0.3);
          transition: all 0.2s ease;
        }
        .slider-thumb-bordeaux::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(107, 30, 62, 0.4);
        }
      `}</style>
    </section>
  );
}

// ==================== MODE SIMPLE : SAISIE ====================
function SimpleInputView({ simpleInput, setSimpleInput, householdOptions, priorityOptions, handleCalculate }: any) {
  return (
    <motion.div
      key="simple-input"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-10">
        <label className="block text-lg font-medium text-gray-900 mb-4">1. Votre foyer</label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {householdOptions.map((option: any) => {
            const Icon = option.icon;
            const isSelected = simpleInput.household === option.value;
            return (
              <motion.button
                key={option.value}
                onClick={() => setSimpleInput((prev: any) => ({ ...prev, household: option.value }))}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${isSelected ? 'bg-white border-[#6B1E3E] shadow-lg shadow-[#6B1E3E]/10' : 'bg-white/50 border-[#6B1E3E]/10 hover:border-[#6B1E3E]/30 hover:shadow-md'}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${isSelected ? 'text-[#6B1E3E]' : 'text-gray-400'}`} />
                <div className={`font-medium mb-1 ${isSelected ? 'text-[#6B1E3E]' : 'text-gray-900'}`}>{option.label}</div>
                <div className="text-sm text-gray-600">{option.subtitle}</div>
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3">
                    <CheckCircle2 className="w-5 h-5 text-[#6B1E3E]" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="mb-10">
        <label className="block text-lg font-medium text-gray-900 mb-4">2. Combien de bouteilles d'eau achetez-vous par semaine ?</label>
        <div className="bg-white/80 backdrop-blur-sm border-2 border-[#6B1E3E]/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Droplet className="w-10 h-10 text-[#6B1E3E]" />
              <div>
                <div className="text-4xl font-light text-[#6B1E3E]">{simpleInput.bottlesPerWeek}</div>
                <div className="text-sm text-gray-600">bouteilles / semaine</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-light text-gray-900">{simpleInput.bottlesPerWeek * 52}</div>
              <div className="text-sm text-gray-600">bouteilles / an</div>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="30"
            value={simpleInput.bottlesPerWeek}
            onChange={(e) => setSimpleInput((prev: any) => ({ ...prev, bottlesPerWeek: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-thumb-bordeaux"
            style={{ background: `linear-gradient(to right, #6B1E3E 0%, #6B1E3E ${(simpleInput.bottlesPerWeek / 30) * 100}%, #E5E7EB ${(simpleInput.bottlesPerWeek / 30) * 100}%, #E5E7EB 100%)` }}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>0</span>
            <span>30 bouteilles</span>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <label className="block text-lg font-medium text-gray-900 mb-2">
          3. Vos priorités <span className="text-sm font-normal text-gray-500">(optionnel, max 2)</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {priorityOptions.map((option: any) => {
            const Icon = option.icon;
            const isSelected = simpleInput.priorities.includes(option.value);
            return (
              <motion.button
                key={option.value}
                onClick={() => {
                  setSimpleInput((prev: any) => {
                    const newPriorities = isSelected
                      ? prev.priorities.filter((p: Priority) => p !== option.value)
                      : prev.priorities.length < 2
                        ? [...prev.priorities, option.value]
                        : prev.priorities;
                    return { ...prev, priorities: newPriorities };
                  });
                }}
                disabled={!isSelected && simpleInput.priorities.length >= 2}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-300 text-left ${isSelected ? 'bg-white border-[#6B1E3E] shadow-md' : 'bg-white/50 border-[#6B1E3E]/10 hover:border-[#6B1E3E]/30'} ${!isSelected && simpleInput.priorities.length >= 2 ? 'opacity-40 cursor-not-allowed' : ''}`}
                whileHover={isSelected || simpleInput.priorities.length < 2 ? { x: 4 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-[#6B1E3E]/10' : 'bg-gray-100'}`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-[#6B1E3E]' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${isSelected ? 'text-[#6B1E3E]' : 'text-gray-900'}`}>{option.label}</div>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-[#6B1E3E]" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <motion.button
          onClick={handleCalculate}
          disabled={simpleInput.bottlesPerWeek === 0}
          className="group px-12 py-5 gradient-bordeaux text-white rounded-full shadow-xl shadow-[#6B1E3E]/25 hover:shadow-2xl hover:shadow-[#6B1E3E]/35 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Voir mes résultats personnalisés
          <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.button>
        <p className="text-sm text-gray-500 mt-4">Résultat instantané</p>
      </div>
    </motion.div>
  );
}

// ==================== MODE SIMPLE : RÉSULTATS ====================
function SimpleResultsView({ results, simpleInput, navigate, handleRecalculate, formatNumber, formatCurrency }: any) {
  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 backdrop-blur-sm border-2 border-red-200 rounded-3xl p-8 lg:p-10 mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h3 className="text-2xl font-light text-gray-900">
            Votre situation actuelle <span className="text-red-600">(sans HYDRAL)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-2">Vous dépensez en bouteilles</div>
            <div className="text-3xl font-light text-red-600 mb-1">
              {formatCurrency(results.current.yearlyBottleCost)}<span className="text-lg">/an</span>
            </div>
            <div className="text-sm text-gray-500">= {formatCurrency(results.current.monthlyBottleCost)}/mois</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Vous ingérez</div>
            <div className="text-3xl font-light text-red-600 mb-1">{formatNumber(results.current.yearlyMicroplastics)}</div>
            <div className="text-sm text-gray-500">particules microplastiques/an</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Vous générez</div>
            <div className="text-3xl font-light text-red-600 mb-1">{formatNumber(results.current.yearlyBottles)}</div>
            <div className="text-sm text-gray-500">bouteilles plastique/an ({Math.round(results.current.yearlyPlasticKg)} kg)</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Vous passez</div>
            <div className="text-3xl font-light text-red-600 mb-1">{Math.round(results.current.shoppingHours + results.current.kettleHours)}h</div>
            <div className="text-sm text-gray-500">courses + attente bouilloire/an</div>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center justify-center my-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          className="px-6 py-3 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full shadow-lg"
        >
          <ArrowRight className="w-6 h-6" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-white via-[#F5E6ED]/30 to-white border-2 border-[#6B1E3E] rounded-3xl p-8 lg:p-10 shadow-2xl shadow-[#6B1E3E]/10"
      >
        <div className="flex items-center gap-3 mb-8">
          <CheckCircle2 className="w-7 h-7 text-[#6B1E3E]" />
          <h3 className="text-2xl font-light text-gray-900">
            Avec <span className="text-[#6B1E3E] font-medium">HYDRAL</span>
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-[#6B1E3E]/20">
          <div className="flex items-center gap-3 mb-6">
            <PiggyBank className="w-8 h-8 text-[#6B1E3E]" />
            <h4 className="text-xl font-medium text-[#6B1E3E]">
              {results.withHydro.yearlySavings > 0 ? 'ÉCONOMIES' : 'BILAN'}
            </h4>
          </div>

          {results.withHydro.yearlySavings > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Économies annuelles</div>
                  <div className="text-4xl font-light text-[#6B1E3E]">{formatCurrency(results.withHydro.yearlySavings)}</div>
                  <div className="text-sm text-gray-500 mt-1">= {formatCurrency(results.withHydro.yearlySavings / 12)} chaque mois</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Économies sur 5 ans</div>
                  <div className="text-4xl font-light text-[#6B1E3E]">{formatCurrency(results.withHydro.savings5Years)}</div>
                  <div className="text-sm text-gray-500 mt-1">{results.withHydro.savings5Years > 0 ? 'Rentabilité garantie' : 'Investissement initial amorti'}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Rentabilisé en</div>
                  <div className="text-4xl font-light text-[#6B1E3E]">{results.withHydro.breakEvenMonths < 100 ? results.withHydro.breakEvenMonths.toFixed(1) : '—'}</div>
                  <div className="text-sm text-gray-500 mt-1">mois</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700">
                  Chaque mois SANS HYDRAL = <strong>{formatCurrency(results.current.monthlyBottleCost)} en bouteilles</strong>
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-lg text-gray-700 mb-3">
                Votre consommation en bouteilles est déjà très économique ({formatCurrency(results.current.yearlyBottleCost)}/an).
              </p>
              <p className="text-sm text-[#8B7E74] mb-4">
                HYDRAL ne vous fera pas économiser sur le prix de l'eau, mais il vous apporte bien d'autres avantages :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-[#6B1E3E]/5 rounded-xl">
                  <p className="text-sm font-medium text-[#6B1E3E]">0 microplastique</p>
                  <p className="text-xs text-gray-600">Eau filtrée 5 étapes</p>
                </div>
                <div className="p-3 bg-[#6B1E3E]/5 rounded-xl">
                  <p className="text-sm font-medium text-[#6B1E3E]">0 bouteille plastique</p>
                  <p className="text-xs text-gray-600">Geste écologique</p>
                </div>
                <div className="p-3 bg-[#6B1E3E]/5 rounded-xl">
                  <p className="text-sm font-medium text-[#6B1E3E]">Eau bouillante en 3s</p>
                  <p className="text-xs text-gray-600">Confort au quotidien</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#6B1E3E]/10">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-[#6B1E3E]" />
              <h4 className="font-medium text-[#6B1E3E]">SANTÉ</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-2xl font-light text-gray-900 mb-1">0</div>
                <div className="text-gray-600">microplastique ingéré</div>
              </div>
              <div className="text-gray-600">
                <strong>{formatNumber(results.withHydro.microplasticsAvoided)}</strong> particules évitées/an
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Eau filtrée 5 étapes : chlore, calcaire, métaux lourds, perturbateurs endocriniens éliminés
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#6B1E3E]/10">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-[#6B1E3E]" />
              <h4 className="font-medium text-[#6B1E3E]">ENVIRONNEMENT</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-2xl font-light text-gray-900 mb-1">{formatNumber(results.withHydro.plasticKgAvoided)} kg</div>
                <div className="text-gray-600">plastique non produit/an</div>
              </div>
              <div className="text-gray-600">{formatNumber(results.current.yearlyBottles)} bouteilles évitées</div>
              <div className="flex items-center gap-2 text-gray-600">
                <TreePine className="w-4 h-4 text-green-600" />
                <span>= {results.withHydro.treesEquivalent} arbres plantés</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-[#6B1E3E]/10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-[#6B1E3E]" />
              <h4 className="font-medium text-[#6B1E3E]">TEMPS</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-2xl font-light text-gray-900 mb-1">{Math.round(results.withHydro.timeSavedHours)}h</div>
                <div className="text-gray-600">gagnées par an</div>
              </div>
              <div className="text-gray-600">= {Math.round(results.withHydro.timeSavedHours / 24)} jours</div>
              <div className="text-xs text-gray-500 leading-relaxed">
                Plus de courses, plus d'attente bouilloire. Eau bouillante instantanée.
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-8 bg-gradient-to-br from-[#6B1E3E]/5 to-[#6B1E3E]/10 rounded-2xl border border-[#6B1E3E]/20"
        >
          <h4 className="text-lg font-medium text-gray-900 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#6B1E3E]" />
            En d'autres termes...
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">Chaque jour SANS HYDRAL</div>
              <div className="text-3xl font-light text-red-600">{formatCurrency(results.comparison.costPerDayWithoutHydro)}</div>
              <div className="text-sm text-gray-500">gaspillés en bouteilles</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Si vous achetez dans 6 mois</div>
              <div className="text-3xl font-light text-red-600">{formatCurrency(results.comparison.if6MonthsLater)}</div>
              <div className="text-sm text-gray-500">déjà perdus</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/80 rounded-xl border border-[#6B1E3E]/20">
            <div className="text-sm font-medium text-gray-900 mb-2">Votre retour sur investissement</div>
            <div className="space-y-1 text-sm text-gray-700">
              <div>Année 1 : <strong className="text-[#6B1E3E]">{formatCurrency(results.withHydro.yearlySavings - results.withHydro.skuPrice)}</strong> {results.withHydro.yearlySavings - results.withHydro.skuPrice > 0 ? '(déjà rentabilisé)' : '(investissement initial)'}</div>
              <div>Année 2 : <strong className="text-[#6B1E3E]">+{formatCurrency(results.withHydro.yearlySavings)}</strong></div>
              <div>Année 5 : <strong className="text-[#6B1E3E]">+{formatCurrency(results.withHydro.savings5Years)}</strong></div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 p-6 bg-[#6B1E3E] text-white rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-light mb-1">
                  {results.peerData.percentageChose}% des {simpleInput.household === 'family' || simpleInput.household === 'family-plus' ? 'familles' : 'personnes'} comme vous
                </div>
                <div className="text-sm text-white/80">
                  ont choisi le modèle <strong>{results.peerData.recommendedModel}</strong> + Formule <strong>{results.peerData.recommendedSubscription}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <motion.button
          onClick={() => navigate('robinet-choice')}
          className="group px-10 py-5 gradient-bordeaux text-white rounded-full shadow-xl shadow-[#6B1E3E]/25 hover:shadow-2xl hover:shadow-[#6B1E3E]/35 font-medium text-lg"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Choisir mon HYDRAL pour ces économies
          <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          onClick={handleRecalculate}
          className="px-8 py-4 bg-white border-2 border-[#6B1E3E]/20 text-[#6B1E3E] rounded-full hover:border-[#6B1E3E]/40 hover:shadow-md font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Recalculer avec d'autres données
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 text-center"
      >
        <div className="inline-flex items-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 + (i * 0.1) }}>
              <Star className="w-5 h-5 fill-[#6B1E3E] text-[#6B1E3E]" />
            </motion.div>
          ))}
        </div>
        <p className="text-gray-700 italic max-w-2xl mx-auto">
          "J'aurais dû l'acheter plus tôt, j'ai perdu 2 ans à acheter des bouteilles.
          Le calculateur m'a ouvert les yeux sur tout l'argent gaspillé."
        </p>
        <p className="text-sm text-gray-500 mt-2">— Marie L., famille de 4, Paris</p>
      </motion.div>
    </motion.div>
  );
}

// ==================== MODE DÉTAILLÉ : CALCULATEUR COMPLET ====================
function DetailedCalculator({
  detailedInput,
  setDetailedInput,
  formatCurrency,
  formatNumber,
  getDynamicSubtitle,
  handleCalculate,
  canCalculate,
  yearlyBottleCost,
  monthlyBottleCost,
  skuOptions,
  getSubscriptionPrice
}: any) {
  const marques = detailedInput.waterType ? getUniqueMarques(detailedInput.waterType) : [];
  const formats = detailedInput.selectedBrand ? getFormatsForMarque(detailedInput.selectedBrand) : [];

  // Filter SKU options: if plate, hide gazeux-only SKU1
  const filteredSKUs = detailedInput.waterType === 'plate'
    ? skuOptions.filter((s: any) => s.value !== 'sku1')
    : skuOptions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <h3 className="text-2xl font-light text-gray-900 mb-2">Quelle eau achetez-vous ?</h3>
      <p className="text-gray-600 mb-8">Sélectionnez votre type d'eau, marque, format et consommation</p>

      {/* Étape 1 : Type d'eau */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">1. Type d'eau</label>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            onClick={() => setDetailedInput((prev: any) => ({ ...prev, waterType: 'plate', selectedBrand: null, selectedProduct: null, selectedSKU: null }))}
            className={`p-8 rounded-xl border-2 transition-all text-center ${detailedInput.waterType === 'plate' ? 'border-[#6B1E3E] bg-white shadow-lg' : 'border-gray-200 bg-white/50 hover:border-[#6B1E3E]/30'}`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Droplet className={`w-12 h-12 mx-auto mb-3 ${detailedInput.waterType === 'plate' ? 'text-[#6B1E3E]' : 'text-blue-300'}`} />
            <div className={`text-lg font-medium ${detailedInput.waterType === 'plate' ? 'text-[#6B1E3E]' : 'text-gray-900'}`}>Eau Plate</div>
            <div className="text-sm text-gray-600 mt-1">Evian, Vittel, Volvic...</div>
          </motion.button>

          <motion.button
            onClick={() => setDetailedInput((prev: any) => ({ ...prev, waterType: 'gazeuse', selectedBrand: null, selectedProduct: null, selectedSKU: null }))}
            className={`p-8 rounded-xl border-2 transition-all text-center ${detailedInput.waterType === 'gazeuse' ? 'border-[#6B1E3E] bg-white shadow-lg' : 'border-gray-200 bg-white/50 hover:border-[#6B1E3E]/30'}`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Droplet className={`w-12 h-12 mx-auto mb-3 ${detailedInput.waterType === 'gazeuse' ? 'text-[#6B1E3E]' : 'text-blue-500'}`} />
            <div className={`text-lg font-medium ${detailedInput.waterType === 'gazeuse' ? 'text-[#6B1E3E]' : 'text-gray-900'}`}>Eau Gazeuse</div>
            <div className="text-sm text-gray-600 mt-1">Perrier, Badoit, San Pellegrino...</div>
          </motion.button>
        </div>
      </div>

      {/* Étape 2 : Marque */}
      {detailedInput.waterType && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">2. Votre marque</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {marques.map((marque: string) => (
              <motion.button
                key={marque}
                onClick={() => setDetailedInput((prev: any) => ({ ...prev, selectedBrand: marque, selectedProduct: null }))}
                className={`p-6 rounded-xl border-2 transition-all text-center ${detailedInput.selectedBrand === marque ? 'border-[#6B1E3E] bg-white shadow-lg' : 'border-gray-200 bg-white/50 hover:border-[#6B1E3E]/30'}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`font-medium text-sm ${detailedInput.selectedBrand === marque ? 'text-[#6B1E3E]' : 'text-gray-900'}`}>{marque}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Étape 3 : Format */}
      {detailedInput.selectedBrand && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">3. Format habituel</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {formats.map((product: WaterProduct) => (
              <motion.button
                key={product.format}
                onClick={() => setDetailedInput((prev: any) => ({ ...prev, selectedProduct: product }))}
                className={`p-6 rounded-xl border-2 transition-all ${detailedInput.selectedProduct?.format === product.format ? 'border-[#6B1E3E] bg-white shadow-lg' : 'border-gray-200 bg-white/50 hover:border-[#6B1E3E]/30'}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-start gap-3">
                  <Package className={`w-8 h-8 flex-shrink-0 ${detailedInput.selectedProduct?.format === product.format ? 'text-[#6B1E3E]' : 'text-gray-400'}`} />
                  <div className="flex-1 text-left">
                    <div className={`font-medium mb-1 ${detailedInput.selectedProduct?.format === product.format ? 'text-[#6B1E3E]' : 'text-gray-900'}`}>
                      {product.format}
                    </div>
                    <div className="text-sm text-gray-600">Prix moyen : {formatCurrency(product.prixMoyen)}</div>
                    <div className="text-xs text-gray-500 mt-1">{formatCurrency(product.prixMin)} - {formatCurrency(product.prixMax)}</div>
                    {product.enseignes && product.enseignes.length > 0 && (
                      <div className="text-xs text-gray-400 mt-1">
                        {product.enseignes.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Étape 4 : Consommation */}
      {detailedInput.selectedProduct && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">4. Votre consommation</label>
          <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-3">
                Combien de {detailedInput.selectedProduct.format} achetez-vous par semaine ?
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDetailedInput((prev: any) => ({ ...prev, packsPerWeek: Math.max(1, prev.packsPerWeek - 1) }))}
                  className="w-12 h-12 rounded-full border-2 border-[#6B1E3E] text-[#6B1E3E] hover:bg-[#6B1E3E] hover:text-white transition-all flex items-center justify-center"
                >-</button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={detailedInput.packsPerWeek}
                    onChange={(e) => setDetailedInput((prev: any) => ({ ...prev, packsPerWeek: parseInt(e.target.value) }))}
                    className="w-full slider-thumb-bordeaux"
                  />
                </div>
                <button
                  onClick={() => setDetailedInput((prev: any) => ({ ...prev, packsPerWeek: Math.min(20, prev.packsPerWeek + 1) }))}
                  className="w-12 h-12 rounded-full border-2 border-[#6B1E3E] text-[#6B1E3E] hover:bg-[#6B1E3E] hover:text-white transition-all flex items-center justify-center"
                >+</button>
              </div>
              <div className="text-center mt-4">
                <span className="text-3xl font-light text-[#6B1E3E]">{detailedInput.packsPerWeek}</span>
                <span className="text-gray-600 ml-2">par semaine</span>
              </div>
            </div>

            {yearlyBottleCost > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Vos dépenses actuelles</div>
                  <div className="text-3xl font-light text-gray-900 mb-1">
                    {formatCurrency(yearlyBottleCost)}<span className="text-lg text-gray-600">/an</span>
                  </div>
                  <div className="text-sm text-gray-500">Soit {formatCurrency(monthlyBottleCost)}/mois</div>
                  <p className="text-xs text-gray-500 mt-3 italic">{getDynamicSubtitle(yearlyBottleCost)}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Étape 5 : Choix du robinet */}
      {detailedInput.selectedProduct && detailedInput.packsPerWeek > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">5. Choisissez votre robinet HYDRAL</label>

          {yearlyBottleCost > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Votre dépense actuelle :</div>
                  <div className="text-2xl font-medium text-red-600">{formatCurrency(yearlyBottleCost)}/an</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredSKUs.map((sku: any) => (
              <motion.button
                key={sku.value}
                onClick={() => setDetailedInput((prev: any) => ({ ...prev, selectedSKU: sku.value }))}
                className={`relative p-6 rounded-2xl border-2 transition-all text-left ${detailedInput.selectedSKU === sku.value ? 'border-[#6B1E3E] bg-white shadow-2xl scale-105' : 'border-gray-200 bg-white/50 hover:border-[#6B1E3E]/30 hover:shadow-lg'}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {sku.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white text-xs font-medium rounded-full whitespace-nowrap">
                    Recommandé
                  </div>
                )}
                <div className="text-3xl font-light text-[#6B1E3E] mb-2">{formatCurrency(sku.price)}</div>
                <div className="font-medium text-gray-900 mb-3">{sku.label.split(' - ')[1]}</div>
                <p className="text-sm text-gray-600 mb-4">{sku.description}</p>
                <div className="space-y-2">
                  {sku.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {detailedInput.selectedSKU === sku.value && yearlyBottleCost > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#6B1E3E]/20">
                    <div className="text-sm text-gray-600">Économie estimée :</div>
                    <div className="text-lg font-medium text-green-600">
                      {formatCurrency(yearlyBottleCost - getSubscriptionPrice(detailedInput.householdSize || 2))}/an
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Étape 6 : Taille du foyer */}
      {detailedInput.selectedSKU && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">6. Nombre de personnes dans votre foyer</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.button
                key={num}
                onClick={() => setDetailedInput((prev: any) => ({ ...prev, householdSize: num }))}
                className={`p-4 rounded-xl border-2 transition-all ${detailedInput.householdSize === num ? 'border-[#6B1E3E] bg-white shadow-lg' : 'border-gray-200 bg-white/50 hover:border-[#6B1E3E]/30'}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users className={`w-6 h-6 mx-auto mb-2 ${detailedInput.householdSize === num ? 'text-[#6B1E3E]' : 'text-gray-400'}`} />
                <div className="text-lg font-medium text-gray-900">{num}{num === 5 ? '+' : ''}</div>
              </motion.button>
            ))}
          </div>

          {detailedInput.householdSize > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-white border border-[#6B1E3E]/20 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-[#6B1E3E]">
                    Formule {detailedInput.householdSize <= 2 ? 'Essentiel' : detailedInput.householdSize <= 4 ? 'Standard' : 'Plus'}
                  </div>
                  <div className="text-xs text-gray-600">Filtres + consommables inclus</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-light text-[#6B1E3E]">{formatCurrency(getSubscriptionPrice(detailedInput.householdSize))}</div>
                  <div className="text-xs text-gray-600">/an</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Bouton Calculer */}
      {detailedInput.selectedSKU && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <motion.button
            onClick={handleCalculate}
            disabled={!canCalculate}
            className={`group px-12 py-5 rounded-full font-medium text-lg flex items-center justify-center gap-2 mx-auto transition-all ${canCalculate ? 'gradient-bordeaux text-white shadow-xl shadow-[#6B1E3E]/25 hover:shadow-2xl hover:shadow-[#6B1E3E]/35' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            whileHover={canCalculate ? { scale: 1.02, y: -2 } : {}}
            whileTap={canCalculate ? { scale: 0.98 } : {}}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Voir mes économies personnalisées</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          {!canCalculate && detailedInput.selectedSKU && detailedInput.householdSize === 0 && (
            <p className="text-sm text-gray-500 mt-3">Sélectionnez le nombre de personnes pour continuer</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// ==================== MODE DÉTAILLÉ : RÉSULTATS ====================
function DetailedResultsView({
  results,
  detailedInput,
  navigate,
  handleRecalculate,
  formatNumber,
  formatCurrency,
  generate5YearChartData,
  findBreakEvenPoint,
  skuOptions
}: any) {
  const selectedSKU = skuOptions.find((s: any) => s.value === detailedInput.selectedSKU);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-gray-900 mb-4">
          Voici vos <span className="text-[#6B1E3E] font-medium">économies personnalisées</span>
        </h2>
        <p className="text-gray-600">
          Basé sur votre consommation réelle de {detailedInput.selectedProduct?.marque} {detailedInput.selectedProduct?.format}
          {selectedSKU && <span> avec le {selectedSKU.label}</span>}
        </p>
      </div>

      {/* Situation actuelle */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
            <Package className="w-4 h-4 text-gray-500" />
          </div>
          <h3 className="text-2xl font-light text-gray-900">Votre situation actuelle</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <div className="text-sm text-gray-500 mb-2">Dépenses annuelles</div>
            <div className="text-4xl font-light text-gray-700 mb-1">{formatCurrency(results.current.yearlyBottleCost)}</div>
            <div className="text-sm text-gray-400">= {formatCurrency(results.current.monthlyBottleCost)}/mois</div>
          </div>
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <div className="text-sm text-gray-500 mb-2">Dépenses sur 5 ans</div>
            <div className="text-4xl font-light text-gray-700 mb-1">{formatCurrency(results.current.yearlyBottleCost * 5)}</div>
            <div className="text-sm text-gray-400">Un investissement invisible</div>
          </div>
          <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <div className="text-sm text-gray-500 mb-2">Bouteilles par an</div>
            <div className="text-4xl font-light text-gray-700 mb-1">{formatNumber(results.current.yearlyBottles)}</div>
            <div className="text-sm text-gray-400">{formatNumber(results.current.yearlyPlasticKg)} kg de plastique</div>
          </div>
        </div>
      </div>

      {/* Avec HYDRAL */}
      <div className="bg-gradient-to-br from-white via-[#F5E6ED]/30 to-white border-2 border-[#6B1E3E] rounded-3xl p-8 lg:p-10 shadow-2xl shadow-[#6B1E3E]/10 mb-8">
        <div className="flex items-center gap-3 mb-8">
          <CheckCircle2 className="w-7 h-7 text-[#6B1E3E]" />
          <h3 className="text-2xl font-light text-gray-900">
            Avec <span className="text-[#6B1E3E] font-medium">HYDRAL {selectedSKU?.label.split(' - ')[0]}</span>
          </h3>
        </div>

        {results.withHydro.yearlySavings <= 0 && (
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#6B1E3E]/20 mb-8 text-center">
            <p className="text-lg text-gray-700 mb-2">
              Votre consommation est déjà très économique ({formatCurrency(results.current.yearlyBottleCost)}/an).
            </p>
            <p className="text-sm text-[#8B7E74]">
              HYDRAL ne vous fera pas économiser sur le prix de l'eau, mais vous apporte confort, santé (0 microplastique) et zéro plastique au quotidien.
            </p>
          </div>
        )}

        {results.withHydro.yearlySavings > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#6B1E3E]/20">
            <div className="text-sm text-gray-600 mb-2">Économies annuelles</div>
            <div className="text-4xl font-light text-[#6B1E3E] mb-1">{formatCurrency(results.withHydro.yearlySavings)}</div>
            <div className="text-sm text-gray-500">= {formatCurrency(results.withHydro.yearlySavings / 12)}/mois</div>
          </div>
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#6B1E3E]/20">
            <div className="text-sm text-gray-600 mb-2">Économies sur 5 ans</div>
            <div className="text-4xl font-light text-[#6B1E3E] mb-1">{formatCurrency(results.withHydro.savings5Years)}</div>
            <div className="text-sm text-gray-500">Rentabilité garantie</div>
          </div>
          <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#6B1E3E]/20">
            <div className="text-sm text-gray-600 mb-2">Rentabilisé en</div>
            <div className="text-4xl font-light text-[#6B1E3E] mb-1">{results.withHydro.breakEvenMonths < 100 ? results.withHydro.breakEvenMonths.toFixed(1) : '—'}</div>
            <div className="text-sm text-gray-500">mois seulement</div>
          </div>
        </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-[#6B1E3E]/10">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-[#6B1E3E]" />
              <h4 className="font-medium text-[#6B1E3E]">SANTÉ</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-2xl font-light text-gray-900 mb-1">0</div>
                <div className="text-gray-600">microplastique ingéré</div>
              </div>
              <div className="text-gray-600"><strong>{formatNumber(results.withHydro.microplasticsAvoided)}</strong> particules évitées/an</div>
            </div>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-[#6B1E3E]/10">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-[#6B1E3E]" />
              <h4 className="font-medium text-[#6B1E3E]">ENVIRONNEMENT</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-2xl font-light text-gray-900 mb-1">{formatNumber(results.withHydro.plasticKgAvoided)} kg</div>
                <div className="text-gray-600">plastique non produit/an</div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <TreePine className="w-4 h-4 text-green-600" />
                <span>= {results.withHydro.treesEquivalent} arbres plantés</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-[#6B1E3E]/10">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-[#6B1E3E]" />
              <h4 className="font-medium text-[#6B1E3E]">TEMPS</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-2xl font-light text-gray-900 mb-1">{Math.round(results.withHydro.timeSavedHours)}h</div>
                <div className="text-gray-600">gagnées par an</div>
              </div>
              <div className="text-gray-600">= {Math.round(results.withHydro.timeSavedHours / 24)} jours</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <motion.button
          onClick={() => navigate('robinet-choice')}
          className="group px-10 py-5 gradient-bordeaux text-white rounded-full shadow-xl shadow-[#6B1E3E]/25 hover:shadow-2xl hover:shadow-[#6B1E3E]/35 font-medium text-lg"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Choisir mon robinet HYDRAL
          <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          onClick={handleRecalculate}
          className="px-8 py-4 bg-white border-2 border-[#6B1E3E]/20 text-[#6B1E3E] rounded-full hover:border-[#6B1E3E]/40 hover:shadow-md font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Recalculer avec d'autres données
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 text-center"
      >
        <div className="inline-flex items-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#6B1E3E] text-[#6B1E3E]" />
          ))}
        </div>
        <p className="text-gray-700 italic max-w-2xl mx-auto">
          "Le calculateur détaillé m'a convaincu. J'ai vu exactement ce que je dépensais en Evian chaque mois.
          Maintenant je ne regrette rien !"
        </p>
        <p className="text-sm text-gray-500 mt-2">— Sophie M., couple, Lyon</p>
      </motion.div>
    </motion.div>
  );
}
