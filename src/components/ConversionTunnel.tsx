import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import * as React from 'react';
import { motion } from 'motion/react';
import { Droplets, Sparkles, Zap, Check, X, ChevronDown, ShoppingCart, TrendingDown, Trash2, Wrench } from 'lucide-react';
import { Page } from '../App';
import { ColorisSelector, ROBINET_COLORIS } from './ColorisSelector';
import { ProductImageGallery } from './ProductImageGallery';
import { defaultImages } from '../assets/products';

// Types
type SKUType = 'pure' | 'spark' | 'one';
type PlanType = 'essentiel' | 'standard' | 'plus';
type PaymentRhythm = 'monthly' | 'quarterly' | 'annual';
type AccentColor = 'bordeaux' | 'blanc' | 'noir' | 'or' | 'vert-sauge' | 'bleu-nuit' | 'rose-poudre' | 'gris-anthracite';
type WaterType = 'still' | 'sparkling' | 'both';

interface WaterData {
  brand: string;
  format: string;
  packPrice: number;
  pricePerLiter: number;
  type: 'still' | 'sparkling';
}

interface SelectedWater extends WaterData {
  quantity: number;
  period: 'week' | 'month';
}

interface ExtraBottle {
  id: string;
  type: string;
  name: string;
  price: number;
  color: AccentColor;
  customName?: string;
}

interface ConversionState {
  // Section 1 - Calcul
  waterType?: WaterType;
  selectedWaters: SelectedWater[];
  monthlyTotal?: number;
  yearlyTotal?: number;
  
  // Section 2 - Robinet
  selectedSKU?: SKUType;
  selectedColoris: string;
  
  // Section 3 - Formule
  selectedPlan?: PlanType;
  paymentRhythm: PaymentRhythm;
  
  // Section 4 - Personnalisation
  itemColors: { [key: string]: AccentColor };
  itemNames: { [key: string]: string };
  extraBottles: ExtraBottle[];
}

// Base de données eaux - importée depuis la DB centralisée
import { getWaterListForTunnel } from '../data/waterDatabase';
const WATER_DATABASE: WaterData[] = getWaterListForTunnel();

const ROBINETS = [
  {
    sku: 'pure' as SKUType,
    name: 'Hydral Pure',
    tagline: 'L\'essentiel premium',
    price: 490,
    icon: Droplets,
    image: defaultImages.faucet,
    features: [
      { label: 'Eau filtrée', desc: 'Chlore éliminé, goût amélioré', included: true },
      { label: 'Eau bouillante instantanée', desc: '100°C à la demande, fini la bouilloire', included: true },
      { label: 'Eau gazeuse', desc: '', included: false },
      { label: 'Eau froide réfrigérée', desc: '', included: false }
    ],
    idealFor: 'Célibataires, couples, amateurs de thé/café, cuisiniers',
    hasCO2: false
  },
  {
    sku: 'spark' as SKUType,
    name: 'Hydral Spark',
    tagline: 'Le préféré des familles',
    price: 890,
    icon: Sparkles,
    image: defaultImages.sparkling,
    features: [
      { label: 'Eau filtrée', desc: 'Chlore éliminé, goût amélioré', included: true },
      { label: 'Eau gazeuse à la demande', desc: 'Fini les bouteilles Perrier/Badoit', included: true },
      { label: 'Eau froide réfrigérée', desc: 'Rafraîchissante sans glaçons', included: true }
    ],
    idealFor: 'Amateurs d\'eau gazeuse, familles qui remplacent les bouteilles pétillantes',
    hasCO2: true
  },
  {
    sku: 'one' as SKUType,
    name: 'Hydral One',
    tagline: 'Le tout-en-un',
    price: 990,
    icon: Zap,
    image: defaultImages.boiling,
    recommended: true,
    popular: true,
    features: [
      { label: 'Eau filtrée', desc: 'Chlore éliminé, goût amélioré', included: true },
      { label: 'Eau bouillante instantanée', desc: '100°C à la demande', included: true },
      { label: 'Eau gazeuse à la demande', desc: 'Pétillante illimitée', included: true },
      { label: 'Eau froide réfrigérée', desc: 'Rafraîchissante sans glaçons', included: true }
    ],
    idealFor: 'Familles, grands consommateurs, ceux qui veulent tout sans compromis',
    hasCO2: true
  }
];

const PLANS = {
  essentiel: {
    name: 'Essentiel',
    price: 59,
    priceMonthly: 4.92,
    priceQuarterly: 14.75,
    description: '1–2 personnes',
    filters: 2,
    co2: 0,
    delivery: 'Incluse',
    welcomePack: {
      items: [
        { id: 'verre-1l-1', name: 'Bouteille en verre 1L', qty: 2 },
        { id: 'tritan-1l-1', name: 'Tritan 1L (plastique résistant)', qty: 2, customizable: true },
        { id: 'tritan-50cl-1', name: 'Tritan 50cl (plastique résistant)', qty: 2, customizable: true }
      ],
      value: 40
    }
  },
  standard: {
    name: 'Standard',
    price: 99,
    priceMonthly: 8.25,
    priceQuarterly: 24.75,
    description: '3–4 personnes',
    filters: 2,
    co2: 6,
    delivery: 'Incluse',
    popular: true,
    welcomePack: {
      items: [
        { id: 'verre-1l-1', name: 'Bouteille en verre 1L', qty: 3 },
        { id: 'tritan-1l-1', name: 'Tritan 1L (plastique résistant)', qty: 3, customizable: true },
        { id: 'tritan-50cl-1', name: 'Tritan 50cl (plastique résistant)', qty: 3, customizable: true },
        { id: 'carafe-ouverte-1', name: 'Carafe ouverte', qty: 1 }
      ],
      value: 75
    }
  },
  plus: {
    name: 'Plus',
    price: 119,
    priceMonthly: 9.92,
    priceQuarterly: 29.75,
    description: '5+ personnes',
    filters: 2,
    co2: 8,
    delivery: 'Incluse',
    welcomePack: {
      items: [
        { id: 'verre-1l-1', name: 'Bouteille en verre 1L', qty: 4 },
        { id: 'tritan-1l-1', name: 'Tritan 1L (plastique résistant)', qty: 4, customizable: true },
        { id: 'tritan-50cl-1', name: 'Tritan 50cl (plastique résistant)', qty: 4, customizable: true },
        { id: 'carafe-ouverte-1', name: 'Carafe ouverte', qty: 1 },
        { id: 'carafe-fermee-1', name: 'Carafe hermétique', qty: 1 },
        { id: 'thermos-1', name: 'Thermos', qty: 1, customizable: true }
      ],
      value: 120
    }
  }
};

const ACCENT_COLORS = [
  { id: 'bordeaux' as AccentColor, label: 'Bordeaux Hydral', hex: '#6B1E3E' },
  { id: 'blanc' as AccentColor, label: 'Blanc', hex: '#FFFFFF' },
  { id: 'noir' as AccentColor, label: 'Noir mat', hex: '#1A1A1A' },
  { id: 'or' as AccentColor, label: 'Or/Doré', hex: '#D4AF37' },
  { id: 'vert-sauge' as AccentColor, label: 'Vert sauge', hex: '#9CAF88' },
  { id: 'bleu-nuit' as AccentColor, label: 'Bleu nuit', hex: '#1E3A5F' },
  { id: 'rose-poudre' as AccentColor, label: 'Rose poudré', hex: '#E8C4D8' },
  { id: 'gris-anthracite' as AccentColor, label: 'Gris anthracite', hex: '#3E4A59' }
];

interface ConversionTunnelProps {
  navigate: (page: Page) => void;
}

export function ConversionTunnel({ navigate }: ConversionTunnelProps) {
  const [state, setState] = useState<ConversionState>({
    selectedWaters: [],
    paymentRhythm: 'annual',
    itemColors: {},
    itemNames: {},
    extraBottles: [],
    selectedColoris: 'chrome-brillant' // Valeur par défaut
  });

  const [currentSection, setCurrentSection] = useState(0);

  // Restore state on mount (runs once)
  useEffect(() => {
    const saved = sessionStorage.getItem('hydral-tunnel');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.selectedWaters?.length > 0 || parsed.selectedSKU || parsed.selectedPlan) {
          setState(parsed);
        }
      } catch {}
    }
  }, []);

  // Persist state (skip initial empty state)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (state.selectedWaters.length > 0 || state.selectedSKU || state.selectedPlan) {
      sessionStorage.setItem('hydral-tunnel', JSON.stringify(state));
    }
  }, [state]);

  // Refs pour chaque section
  const section0Ref = useRef<HTMLElement>(null);
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const section4Ref = useRef<HTMLElement>(null);

  // Observer pour détecter quelle section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-section') || '0');
            setCurrentSection(sectionIndex);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
    );

    [section0Ref, section1Ref, section2Ref, section3Ref, section4Ref].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Calculs économies - Mémoïsés pour performances
  const calculateSavings = useCallback((robinetPrice: number, subscriptionYearly: number = 59) => {
    const yearlyBottle = state.yearlyTotal || 0;
    const savingsPerYear = yearlyBottle - subscriptionYearly;
    const savings1y = savingsPerYear - robinetPrice;
    const savings5y = (savingsPerYear * 5) - robinetPrice;
    const monthlySavings = savingsPerYear / 12;
    const rawBreakEven = monthlySavings > 0 ? Math.ceil(robinetPrice / monthlySavings) : 999;
    const breakEvenMonths = rawBreakEven > 60 ? 999 : rawBreakEven;
    const yearlySavings = savingsPerYear;

    return { savings1y, savings5y, breakEvenMonths, yearlySavings, subscriptionYearly };
  }, [state.yearlyTotal]);

  const selectedRobinet = useMemo(() => 
    state.selectedSKU ? ROBINETS.find(r => r.sku === state.selectedSKU) : null,
    [state.selectedSKU]
  );
  
  const selectedPlanData = useMemo(() => 
    state.selectedPlan ? PLANS[state.selectedPlan] : null,
    [state.selectedPlan]
  );

  return (
    <div className="relative bg-[#FAF8F5]">
      {/* SECTION 0 - INTRO */}
      <Section0
        ref={section0Ref}
        onStart={() => scrollToSection(section1Ref)}
      />

      {/* SECTION 1 - CALCULATEUR */}
      <Section1
        ref={section1Ref}
        state={state}
        setState={setState}
        calculateSavings={calculateSavings}
        onNext={() => {
          // Auto-select model based on water type
          if (!state.selectedSKU) {
            if (state.selectedWaters.some(w => w.type === 'sparkling') || state.waterType === 'sparkling' || state.waterType === 'both') {
              setState(prev => ({ ...prev, selectedSKU: 'one' }));
            }
          }
          scrollToSection(section2Ref);
        }}
      />

      {/* SECTION 2 - CHOIX ROBINET */}
      <Section2
        ref={section2Ref}
        state={state}
        setState={setState}
        calculateSavings={calculateSavings}
        onNext={() => scrollToSection(section3Ref)}
      />

      {/* SECTION 3 - CHOIX FORMULE */}
      <Section3
        ref={section3Ref}
        state={state}
        setState={setState}
        onNext={() => scrollToSection(section4Ref)}
      />

      {/* SECTION 4 - PERSONNALISATION */}
      <Section4
        ref={section4Ref}
        state={state}
        setState={setState}
      />
    </div>
  );
}

// SECTION 0 - TRANSITION RAPIDE VERS LE TUNNEL
const Section0 = React.forwardRef<HTMLElement, { onStart: () => void }>(
  ({ onStart }, ref) => {
    return (
      <section
        ref={ref}
        data-section="0"
        className="px-4 sm:px-6 py-12 sm:py-16"
      >
        <div className="max-w-5xl mx-auto">
          {/* Accroche + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="mb-3">
              <span className="text-gray-900">Combien vous coûtent </span>
              <span className="text-[#6B1E3E]">vos bouteilles ?</span>
            </h2>
            <p className="text-lg text-[#8B7E74] max-w-2xl mx-auto mb-8">
              En 3 minutes : calculez vos économies, choisissez votre robinet, recevez votre pack personnalisé.
            </p>

            {/* Mini étapes horizontales */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { num: '1', label: 'Vos économies' },
                { num: '2', label: 'Votre robinet' },
                { num: '3', label: 'Votre formule' },
                { num: '4', label: 'Votre pack' }
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center text-xs font-bold">
                    {step.num}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{step.label}</span>
                  {idx < 3 && <span className="text-gray-300 ml-1 hidden sm:inline">—</span>}
                </div>
              ))}
            </div>

            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-[#6B1E3E] text-white rounded-full text-lg font-medium shadow-xl hover:bg-[#6B1E3E]/90 transition-colors inline-flex items-center gap-2"
            >
              C'est parti
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Social proof compact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#8B7E74]"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-amber-400" />
                ))}
              </div>
              <span>5/5 — Avis clients</span>
            </div>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>Rentabilisé en quelques mois</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>Sans engagement</span>
          </motion.div>
        </div>
      </section>
    );
  }
);

// SECTION 1 - CALCULATEUR (à compléter dans le prochain message - fichier trop long)
const Section1 = React.forwardRef<HTMLElement, {
  state: ConversionState;
  setState: React.Dispatch<React.SetStateAction<ConversionState>>;
  calculateSavings: (robinetPrice: number, subscriptionYearly?: number) => { savings1y: number; savings5y: number; breakEvenMonths: number; yearlySavings: number; subscriptionYearly: number };
  onNext: () => void;
}>(({ state, setState, calculateSavings, onNext }, ref) => {
  const [showDetail, setShowDetail] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [detailTab, setDetailTab] = useState<'still' | 'sparkling'>('still');
  const [detailOverride, setDetailOverride] = useState(false);

  // Profiles with default monthly spend
  const profiles = [
    { id: 'solo', label: 'Solo', subtitle: '1 personne', monthly: 20 },
    { id: 'couple', label: 'Couple', subtitle: '2 personnes', monthly: 35 },
    { id: 'family', label: 'Famille', subtitle: '3-4 personnes', monthly: 75 },
    { id: 'family-plus', label: 'Grande famille', subtitle: '5+ personnes', monthly: 100 }
  ];

  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [monthlyBudget, setMonthlyBudget] = useState(0);

  // When profile clicked, set budget
  const handleProfileClick = (profile: typeof profiles[0]) => {
    setSelectedProfile(profile.id);
    setMonthlyBudget(profile.monthly);
    setDetailOverride(false);
    const yearly = profile.monthly * 12;
    setState(prev => ({ ...prev, yearlyTotal: yearly, monthlyTotal: profile.monthly }));
  };

  // When slider changes
  const handleSliderChange = (value: number) => {
    setMonthlyBudget(value);
    setSelectedProfile(null);
    setDetailOverride(false);
    const yearly = value * 12;
    setState(prev => ({ ...prev, yearlyTotal: yearly, monthlyTotal: value }));
  };

  // Reset everything
  const handleReset = () => {
    setSelectedProfile(null);
    setMonthlyBudget(0);
    setShowDetail(false);
    setBrandSearch('');
    setDetailOverride(false);
    setState(prev => ({ ...prev, selectedWaters: [], yearlyTotal: 0, monthlyTotal: 0 }));
  };

  // Popular waters deduped by brand+format
  const popularStill = useMemo(() => {
    const seen = new Set<string>();
    return WATER_DATABASE.filter(w => {
      if (w.type !== 'still') return false;
      const key = `${w.brand}|${w.format}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 10);
  }, []);

  const popularSparkling = useMemo(() => {
    const seen = new Set<string>();
    return WATER_DATABASE.filter(w => {
      if (w.type !== 'sparkling') return false;
      const key = `${w.brand}|${w.format}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 10);
  }, []);

  const displayWaters = detailTab === 'still' ? popularStill : popularSparkling;

  // Filter by search
  const filteredWaters = useMemo(() => {
    if (brandSearch.trim()) {
      const q = brandSearch.toLowerCase();
      return WATER_DATABASE.filter(w =>
        w.brand.toLowerCase().includes(q) || w.format.toLowerCase().includes(q)
      );
    }
    return displayWaters;
  }, [brandSearch, displayWaters]);

  // Get quantity of a specific water in selectedWaters
  const getWaterQty = useCallback((brand: string, format: string) => {
    const found = state.selectedWaters.find(w => w.brand === brand && w.format === format);
    return found ? found.quantity : 0;
  }, [state.selectedWaters]);

  // Stepper: increment water
  const incrementWater = useCallback((water: WaterData) => {
    setState(prev => {
      const idx = prev.selectedWaters.findIndex(w => w.brand === water.brand && w.format === water.format);
      let updated: SelectedWater[];
      if (idx >= 0) {
        updated = [...prev.selectedWaters];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
      } else {
        updated = [...prev.selectedWaters, { ...water, quantity: 1, period: 'week' as const }];
      }
      const yearlyTotal = updated.reduce((sum, w) => sum + (w.quantity * 52 * w.packPrice), 0);
      return { ...prev, selectedWaters: updated, yearlyTotal: Math.round(yearlyTotal), monthlyTotal: Math.round(yearlyTotal / 12) };
    });
    setDetailOverride(true);
  }, [setState]);

  // Stepper: decrement water
  const decrementWater = useCallback((water: WaterData) => {
    setState(prev => {
      const idx = prev.selectedWaters.findIndex(w => w.brand === water.brand && w.format === water.format);
      if (idx < 0) return prev;
      let updated: SelectedWater[];
      if (prev.selectedWaters[idx].quantity <= 1) {
        updated = prev.selectedWaters.filter((_, i) => i !== idx);
      } else {
        updated = [...prev.selectedWaters];
        updated[idx] = { ...updated[idx], quantity: updated[idx].quantity - 1 };
      }
      if (updated.length === 0) {
        setDetailOverride(false);
        return { ...prev, selectedWaters: [], yearlyTotal: monthlyBudget * 12, monthlyTotal: monthlyBudget };
      }
      const yearlyTotal = updated.reduce((sum, w) => sum + (w.quantity * 52 * w.packPrice), 0);
      return { ...prev, selectedWaters: updated, yearlyTotal: Math.round(yearlyTotal), monthlyTotal: Math.round(yearlyTotal / 12) };
    });
  }, [setState, monthlyBudget]);

  // Detail weekly + yearly totals
  const detailWeekly = useMemo(() => {
    return state.selectedWaters.reduce((sum, w) => sum + (w.quantity * w.packPrice), 0);
  }, [state.selectedWaters]);

  const detailYearly = useMemo(() => {
    return state.selectedWaters.reduce((sum, w) => sum + (w.quantity * 52 * w.packPrice), 0);
  }, [state.selectedWaters]);

  // The effective yearly total for calculations
  const effectiveYearly = state.yearlyTotal || 0;

  // Live savings calculation
  const savingsPure = useMemo(() => calculateSavings(490, 59), [effectiveYearly, calculateSavings]);
  const savingsSpark = useMemo(() => calculateSavings(890, 99), [effectiveYearly, calculateSavings]);
  const savingsOne = useMemo(() => calculateSavings(990, 99), [effectiveYearly, calculateSavings]);

  return (
    <section
      ref={ref}
      data-section="1"
      className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 pt-8 pb-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto w-full"
      >
        <h2 className="text-center mb-4">
          <span className="block text-gray-900">Calculez vos économies</span>
        </h2>
        <p className="text-center text-lg sm:text-xl text-[#8B7E74] mb-12">
          Combien dépensez-vous vraiment en eau embouteillée ?
        </p>

        {/* ZONE 1 — Profile chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleProfileClick(profile)}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                selectedProfile === profile.id
                  ? 'bg-[#6B1E3E] text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#6B1E3E]/40'
              }`}
            >
              <span>{profile.label}</span>
              <span className={`ml-1.5 text-xs ${selectedProfile === profile.id ? 'text-white/70' : 'text-[#8B7E74]'}`}>
                {profile.subtitle}
              </span>
            </button>
          ))}
        </div>

        {/* ZONE 2 — Budget slider */}
        <div className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
            Combien dépensez-vous en eau par mois ?
          </label>
          <div className="text-center mb-4">
            <span className="text-4xl sm:text-5xl font-bold text-gray-900">
              {detailOverride ? Math.round(detailYearly / 12) : monthlyBudget}€
            </span>
            <span className="text-lg text-gray-500">/mois</span>
          </div>
          <input
            type="range"
            min={0}
            max={200}
            step={5}
            value={detailOverride ? Math.round(detailYearly / 12) : monthlyBudget}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            disabled={detailOverride}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb-bordeaux ${detailOverride ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-[#8B7E74]">0€</span>
            <span className="text-sm font-medium text-[#6B1E3E]">
              {detailOverride ? Math.round(detailYearly) : monthlyBudget * 12}€/an
            </span>
            <span className="text-xs text-[#8B7E74]">200€</span>
          </div>
          <p className="text-xs text-[#8B7E74] text-center mt-3">
            Estimation ajustable. Glissez pour affiner.
          </p>
        </div>

        {/* ZONE 3 — Live results */}
        {effectiveYearly > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border-2 border-[#6B1E3E]/20 shadow-xl p-6 mb-8"
          >
            {savingsPure.yearlySavings > 0 ? (
              <>
                {/* Savings summary */}
                <div className="text-center mb-6">
                  <p className="text-sm text-[#8B7E74] mb-1">Avec le robinet le plus accessible</p>
                  <p className="text-3xl sm:text-4xl font-bold text-[#6B1E3E] mb-1">
                    {Math.round(savingsPure.yearlySavings)}€/an
                  </p>
                  <p className="text-sm text-gray-600">d'économies</p>
                </div>

                {/* Break-even + progress */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[#8B7E74]">Rentabilisé en</span>
                    <span className="font-semibold text-gray-900">
                      {savingsPure.breakEvenMonths < 100 ? `${savingsPure.breakEvenMonths} mois` : '--'}
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6B1E3E] rounded-full transition-all duration-700"
                      style={{ width: `${savingsPure.breakEvenMonths < 100 ? Math.min((savingsPure.breakEvenMonths / 24) * 100, 100) : 100}%` }}
                    />
                  </div>
                </div>

                {/* 5-year projection */}
                <div className="text-center mb-6 p-3 bg-[#6B1E3E]/5 rounded-xl">
                  <p className="text-sm text-gray-700">
                    Sur 5 ans : <span className="font-bold text-[#6B1E3E]">+{Math.round(savingsPure.savings5y)}€</span> d'économies nettes
                  </p>
                </div>

                {/* Compact robinet comparison row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { name: 'Pure', savings: savingsPure },
                    { name: 'Spark', savings: savingsSpark },
                    { name: 'One', savings: savingsOne }
                  ].map((r) => (
                    <div key={r.name} className="text-center p-3 bg-[#FAF8F5] rounded-xl">
                      <p className="text-xs font-medium text-gray-500 mb-1">{r.name}</p>
                      <p className={`text-sm font-bold ${r.savings.yearlySavings > 0 ? 'text-[#6B1E3E]' : 'text-gray-400'}`}>
                        {r.savings.yearlySavings > 0 ? `${Math.round(r.savings.yearlySavings)}€/an` : '--'}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Conviction arguments when not financially advantageous */}
                <h4 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  Vous faites déjà attention à votre budget eau.
                </h4>
                <p className="text-sm text-[#8B7E74] text-center mb-6">
                  HYDRAL n'est pas un choix financier pour vous. Mais saviez-vous que l'eau en bouteille pose d'autres problèmes ?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
                    <p className="text-xl font-bold text-gray-900 mb-1">240 000</p>
                    <p className="text-xs font-medium text-gray-900 mb-1">microplastiques par litre d'eau en bouteille</p>
                    <p className="text-xs text-gray-600">Étude PNAS 2024 — Columbia University. La filtration HYDRAL les élimine.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                    <p className="text-xl font-bold text-gray-900 mb-1">9 kg</p>
                    <p className="text-xs font-medium text-gray-900 mb-1">le poids d'un pack de 6 bouteilles</p>
                    <p className="text-xs text-gray-600">Fini les courses lourdes. Votre eau sort du robinet, filtrée et fraîche.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#6B1E3E]/5 to-[#6B1E3E]/10 border border-[#6B1E3E]/10">
                    <p className="text-xl font-bold text-gray-900 mb-1">73%</p>
                    <p className="text-xs font-medium text-gray-900 mb-1">des bouteilles non recyclées en France</p>
                    <p className="text-xs text-gray-600">450 ans pour se décomposer. HYDRAL élimine des centaines de bouteilles/an.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100">
                    <p className="text-xl font-bold text-gray-900 mb-1">3 secondes</p>
                    <p className="text-xs font-medium text-gray-900 mb-1">pour de l'eau bouillante</p>
                    <p className="text-xs text-gray-600">Thé, café, biberon, pâtes... Plus de bouilloire, plus d'attente.</p>
                  </div>
                </div>

                <div className="text-center p-3 bg-[#6B1E3E]/5 rounded-xl border border-[#6B1E3E]/10">
                  <p className="text-sm font-medium text-[#6B1E3E]">L'eau que vous buvez est plus importante que son prix.</p>
                  <p className="text-xs text-[#8B7E74] mt-1">À partir de 490€ une fois, puis 59€/an pour les filtres. Garantie 3 ans.</p>
                </div>
              </>
            )}

            {/* CTA */}
            <button
              onClick={onNext}
              className="w-full mt-6 py-4 bg-[#6B1E3E] text-white font-semibold text-lg rounded-xl hover:bg-[#6B1E3E]/90 transition-all shadow-lg hover:shadow-xl"
            >
              Choisir mon robinet →
            </button>

            {/* Reset link */}
            <div className="text-center mt-4">
              <button
                onClick={handleReset}
                className="text-sm text-[#8B7E74] hover:text-[#6B1E3E] transition-colors underline"
              >
                Réinitialiser
              </button>
            </div>
          </motion.div>
        )}

        {/* ZONE 4 — "Préciser mes achats" (collapsed by default) */}
        <div className="mb-8">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full py-3 text-sm font-medium text-[#6B1E3E] hover:text-[#6B1E3E]/80 transition-colors flex items-center justify-center gap-2"
          >
            Préciser mes achats
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDetail ? 'rotate-180' : ''}`} />
          </button>

          {showDetail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200/50 shadow-sm p-6 mt-2"
            >
              {/* Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => { setDetailTab('still'); setBrandSearch(''); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    detailTab === 'still'
                      ? 'bg-[#6B1E3E] text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  Eaux plates
                </button>
                <button
                  onClick={() => { setDetailTab('sparkling'); setBrandSearch(''); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    detailTab === 'sparkling'
                      ? 'bg-[#6B1E3E] text-white'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }`}
                >
                  Eaux gazeuses
                </button>
              </div>

              {/* Search */}
              <input
                type="text"
                placeholder="Rechercher une marque ou un format..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="w-full px-4 py-2.5 mb-4 rounded-xl border border-gray-200 focus:border-[#6B1E3E] focus:outline-none text-sm"
              />

              {/* Water list with steppers */}
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {filteredWaters.map((water, idx) => {
                  const qty = getWaterQty(water.brand, water.format);
                  return (
                    <div
                      key={`${water.brand}-${water.format}-${idx}`}
                      className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#FAF8F5] transition-colors"
                    >
                      <div className="flex-1 min-w-0 mr-3">
                        <span className="text-sm font-medium text-gray-900">{water.brand}</span>
                        <span className="text-xs text-[#8B7E74] ml-2">{water.format}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700 mr-4 flex-shrink-0">
                        {water.packPrice.toFixed(2)}€
                      </span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => decrementWater(water)}
                          disabled={qty === 0}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            qty > 0
                              ? 'border border-gray-300 text-gray-600 hover:border-[#6B1E3E] hover:text-[#6B1E3E]'
                              : 'border border-gray-200 text-gray-300 cursor-not-allowed'
                          }`}
                        >
                          -
                        </button>
                        <span className={`w-6 text-center text-sm font-semibold ${qty > 0 ? 'text-gray-900' : 'text-gray-400'}`}>
                          {qty}
                        </span>
                        <button
                          onClick={() => incrementWater(water)}
                          className="w-8 h-8 rounded-full bg-[#6B1E3E] text-white flex items-center justify-center hover:bg-[#6B1E3E]/90 transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredWaters.length === 0 && (
                  <p className="text-sm text-[#8B7E74] text-center py-4">Aucun résultat trouvé</p>
                )}
              </div>

              {/* Detail total */}
              {state.selectedWaters.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-700">
                    Total détaillé : <span className="font-semibold">{detailWeekly.toFixed(2)}€/semaine</span>
                    {' → '}
                    <span className="font-bold text-[#6B1E3E]">{Math.round(detailYearly)}€/an</span>
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
});

// SECTION 2, 3, 4 dans le prochain fichier (trop long)
const Section2 = React.forwardRef<HTMLElement, {
  state: ConversionState;
  setState: React.Dispatch<React.SetStateAction<ConversionState>>;
  calculateSavings: (robinetPrice: number, subscriptionYearly?: number) => { savings1y: number; savings5y: number; breakEvenMonths: number; yearlySavings: number; subscriptionYearly: number };
  onNext: () => void;
}>(({ state, setState, calculateSavings, onNext }, ref) => {
  return (
    <section
      ref={ref}
      data-section="2"
      className="px-4 sm:px-6 py-12 transition-colors duration-500"
      style={{
        background: state.selectedColoris === 'or-brosse' ? 'linear-gradient(to bottom, #FAF8F5, #FBF5E8)' :
          state.selectedColoris === 'noir-mat' ? 'linear-gradient(to bottom, #FAF8F5, #F0EEEC)' :
          state.selectedColoris === 'gris-metallise' ? 'linear-gradient(to bottom, #FAF8F5, #EEEEF0)' :
          undefined
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto w-full"
      >
        <h2 className="text-center mb-4">
          <span className="block text-gray-900">
            {state.yearlyTotal && state.yearlyTotal > 0 && (state.yearlyTotal - 59) > 0
              ? 'Vous pouvez économiser. Quel modèle choisissez-vous ?'
              : 'Choisissez votre robinet'}
          </span>
        </h2>
        <p className="text-center text-lg sm:text-xl text-[#8B7E74] mb-12">
          {state.yearlyTotal && state.yearlyTotal > 0 && (state.yearlyTotal - 59) > 0
            ? `Avec vos ${state.yearlyTotal}€/an en bouteilles, voici vos options.`
            : 'Le bon robinet pour le bon foyer'}
        </p>

        {/* Robinet Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {ROBINETS.map((robinet, idx) => {
            const subYearly = robinet.hasCO2 ? 99 : 59;
            const { breakEvenMonths, yearlySavings } = calculateSavings(robinet.price, subYearly);

            return (
              <motion.div
                key={robinet.sku}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white rounded-2xl border-2 transition-all overflow-hidden flex flex-col ${
                  state.selectedSKU === robinet.sku
                    ? 'ring-2 ring-[#6B1E3E]/20 border-[#6B1E3E] shadow-xl'
                    : 'border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-lg'
                }`}
              >
                {/* Badge for recommended */}
                {robinet.recommended && (
                  <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-[#6B1E3E] text-white text-xs font-medium rounded-full">
                    Le tout-en-un
                  </div>
                )}

                {/* BIG image */}
                <div className="relative bg-[#FAF8F5] overflow-hidden">
                  <img src={robinet.image} alt={robinet.name} className="w-full h-52 sm:h-60 object-cover" />
                </div>

                {/* Content - compact */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{robinet.name}</h3>
                  <p className="text-sm text-[#8B7E74] mb-3">{robinet.tagline}</p>
                  <p className="text-2xl font-bold text-[#6B1E3E] mb-1">{robinet.price}€</p>
                  <p className="text-xs text-[#8B7E74] mt-0.5 mb-4">soit {(robinet.price / 365).toFixed(2)}€/jour la 1ère année</p>

                  {/* Compact features - just checkmarks */}
                  <div className="grid grid-cols-2 gap-2 mb-4 flex-1">
                    {robinet.features.map((f, i) => (
                      <div key={i} className={`flex items-center gap-1.5 text-xs ${f.included ? 'text-gray-700' : 'text-gray-300'}`}>
                        {f.included ? <Check className="w-3.5 h-3.5 text-[#6B1E3E] flex-shrink-0" /> : <X className="w-3.5 h-3.5 flex-shrink-0" />}
                        <span>{f.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Savings if available */}
                  {state.yearlyTotal && state.yearlyTotal > 0 && yearlySavings > 0 && (
                    <div className="p-2.5 bg-[#6B1E3E]/5 rounded-lg mb-4 text-center">
                      <p className="text-xs text-[#6B1E3E]">
                        Rentabilisé en <strong>{breakEvenMonths < 100 ? `${breakEvenMonths} mois` : '—'}</strong>
                      </p>
                      <p className="text-xs text-[#6B1E3E] mt-0.5">
                        puis <strong>{Math.round(yearlySavings)}€/an</strong> d'économies
                      </p>
                      <p className="text-[10px] text-[#8B7E74] mt-1">abo {robinet.hasCO2 ? 'filtres + CO₂' : 'filtres'} : {subYearly}€/an — sans engagement</p>
                    </div>
                  )}
                  {state.yearlyTotal && state.yearlyTotal > 0 && yearlySavings <= 0 && (
                    <div className="p-2.5 bg-[#FAF8F5] rounded-lg mb-4 text-center">
                      <span className="text-xs text-[#8B7E74]">Choix confort et santé</span>
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    onClick={() => setState({ ...state, selectedSKU: robinet.sku })}
                    className={`w-full py-3 rounded-full font-medium text-sm transition-all ${
                      state.selectedSKU === robinet.sku
                        ? 'bg-[#6B1E3E] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {state.selectedSKU === robinet.sku ? 'Choisi ✓' : 'Choisir'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Coloris + Gallery Section - only when robinet selected */}
        {state.selectedSKU && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100"
          >
            {/* Title */}
            <div className="text-center mb-6">
              <h3 className="text-2xl text-gray-900 mb-1">
                {ROBINETS.find(r => r.sku === state.selectedSKU)?.name}
              </h3>
              <p className="text-sm text-[#8B7E74]">
                {ROBINET_COLORIS.find(c => c.id === state.selectedColoris)?.name || 'Chrome'}
              </p>
            </div>

            {/* FULL WIDTH image */}
            <motion.div
              key={`${state.selectedSKU}-${state.selectedColoris}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative mb-6 rounded-2xl overflow-hidden bg-[#FAF8F5]"
            >
              <ProductImageGallery
                productName={ROBINETS.find(r => r.sku === state.selectedSKU)?.name || ''}
                colorName={ROBINET_COLORIS.find(c => c.id === state.selectedColoris)?.name || 'Chrome'}
                modelSKU={state.selectedSKU || 'pure'}
                colorId={state.selectedColoris}
              />
            </motion.div>

            {/* Compact coloris pills */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Choisissez votre finition</p>
              <div className="flex flex-wrap gap-2">
                {ROBINET_COLORIS.map((coloris) => {
                  const isSelected = state.selectedColoris === coloris.id;
                  const gradientMap: Record<string, string> = {
                    'chrome-brillant': 'linear-gradient(135deg, #E8E8E8, #B0B0B0, #F5F5F5)',
                    'noir-mat': 'linear-gradient(135deg, #2A2A2A, #1A1A1A, #333)',
                    'nickel-brosse': 'linear-gradient(135deg, #C0B8A8, #A89888, #D0C8B8)',
                    'or-brosse': 'linear-gradient(135deg, #D4A843, #C49833, #E4B853)',
                    'gris-metallise': 'linear-gradient(135deg, #5A5A5A, #4A4A4A, #6A6A6A)',
                  };
                  return (
                    <button
                      key={coloris.id}
                      onClick={() => setState({ ...state, selectedColoris: coloris.id })}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-full transition-all ${
                        isSelected
                          ? 'ring-2 ring-[#6B1E3E] bg-white shadow-md'
                          : 'bg-white/60 border border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-sm'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full shadow-sm flex-shrink-0"
                        style={{ background: gradientMap[coloris.id] || gradientMap['gris-metallise'] }}
                      />
                      <span className={`text-xs font-medium whitespace-nowrap ${isSelected ? 'text-[#6B1E3E]' : 'text-gray-600'}`}>
                        {coloris.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#6B1E3E] flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key info line */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#8B7E74] mb-6">
              <span className="font-semibold text-gray-900">
                {ROBINETS.find(r => r.sku === state.selectedSKU)?.price}€
              </span>
              <span>•</span>
              <span>Garantie 3 ans</span>
              <span>•</span>
              <span>Livraison offerte</span>
            </div>

            {/* CTA to next */}
            <div className="text-center">
              <p className="text-sm text-[#8B7E74] mb-4">Choisissons maintenant votre formule d'abonnement</p>
              <button
                onClick={onNext}
                className="text-[#6B1E3E] hover:text-[#6B1E3E]/80 transition-colors animate-bounce"
              >
                <ChevronDown className="w-8 h-8 mx-auto" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
});

// SECTION 3 et 4 continuent...
const Section3 = React.forwardRef<HTMLElement, {
  state: ConversionState;
  setState: React.Dispatch<React.SetStateAction<ConversionState>>;
  onNext: () => void;
}>(({ state, setState, onNext }, ref) => {
  const [showWelcomePack, setShowWelcomePack] = useState(false);
  const selectedRobinet = state.selectedSKU ? ROBINETS.find(r => r.sku === state.selectedSKU) : null;
  const hasCO2 = selectedRobinet?.hasCO2 || false;

  useEffect(() => {
    if (state.selectedPlan) {
      setTimeout(() => setShowWelcomePack(true), 300);
    }
  }, [state.selectedPlan]);

  return (
    <section
      ref={ref}
      data-section="3"
      className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full"
      >
        <h2 className="text-center mb-3">
          <span className="block text-gray-900">Zéro surprise.</span>
          <span className="block text-[#6B1E3E]">Voici exactement ce que vous payez.</span>
        </h2>
        <p className="text-center text-sm text-[#8B7E74] mb-8">
          Sans engagement — résiliable à tout moment, sans frais.
        </p>

        {/* Toggle rythme */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {[
            { value: 'monthly' as PaymentRhythm, label: 'Mensuel' },
            { value: 'quarterly' as PaymentRhythm, label: 'Trimestriel' },
            { value: 'annual' as PaymentRhythm, label: 'Annuel' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setState({ ...state, paymentRhythm: option.value })}
              className={`px-6 py-3 rounded-full transition-all ${
                state.paymentRhythm === option.value
                  ? 'bg-[#6B1E3E] text-white shadow-lg'
                  : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#6B1E3E]/30'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Les 3 formules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {Object.entries(PLANS).map(([key, plan], idx) => {
            const displayPrice =
              state.paymentRhythm === 'monthly' ? plan.priceMonthly :
              state.paymentRhythm === 'quarterly' ? plan.priceQuarterly :
              plan.price;

            const periodLabel =
              state.paymentRhythm === 'monthly' ? '/mois' :
              state.paymentRhythm === 'quarterly' ? '/trim.' :
              '/an';

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 border-2 transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[#FAF8F5] to-white border-[#6B1E3E]/40 shadow-xl'
                    : 'bg-white border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-lg'
                } ${state.selectedPlan === key ? 'ring-4 ring-[#6B1E3E]/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#6B1E3E] text-white text-sm rounded-full shadow-md">
                    Le plus courant
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl mb-2 text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-[#8B7E74]">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {displayPrice.toFixed(2)}€
                    </span>
                    <span className="text-sm text-[#8B7E74]">
                      {periodLabel}
                    </span>
                  </div>
                  {state.paymentRhythm !== 'annual' && (
                    <p className="text-sm mt-2 text-[#8B7E74]">
                      soit {plan.price}€/an
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Filtres/an</span>
                    <span className="font-semibold text-gray-900">
                      {plan.filters}
                    </span>
                  </div>
                  {hasCO2 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">CO₂ cartouches</span>
                      <span className="font-semibold text-gray-900">
                        {plan.co2}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Livraison</span>
                    <span className="font-semibold text-gray-900">
                      {plan.delivery}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setState({ ...state, selectedPlan: key as PlanType })}
                  className={`w-full py-4 rounded-full font-medium transition-all ${
                    state.selectedPlan === key
                      ? 'bg-[#6B1E3E] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {state.selectedPlan === key ? 'Choisi ✓' : 'Choisir'}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Pack de bienvenue */}
        {showWelcomePack && state.selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200/50 mb-12"
          >
            <h3 className="text-2xl text-center mb-6 text-gray-900">
              Et avec votre formule, vous recevez aussi...
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {PLANS[state.selectedPlan].welcomePack.items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-gradient-to-br from-[#FAF8F5] to-white rounded-xl border border-gray-200/50 text-center"
                >
                  <p className="text-sm text-gray-900 font-medium">{item.qty}× {item.name}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-[#6B1E3E] font-semibold text-lg">
              Valeur ~{PLANS[state.selectedPlan].welcomePack.value}€ offerts
            </p>
            <p className="text-center text-sm text-[#8B7E74] mt-4">
              Tous vos accessoires sont personnalisables à l'étape suivante — couleurs et prénoms.
            </p>
          </motion.div>
        )}

        {/* Réassurance */}
        {state.selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12"
          >
            {[
              { icon: '✅', text: 'Résiliable à tout moment, sans frais' },
              { icon: '✅', text: 'Livraison incluse' },
              { icon: '✅', text: 'Rappel automatique avant chaque envoi' },
              { icon: '✅', text: 'Prix fixe garanti' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-[#6B1E3E]/5 rounded-xl border border-[#6B1E3E]/20 text-center"
              >
                <p className="text-2xl mb-2">{item.icon}</p>
                <p className="text-xs text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {state.selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-lg text-[#8B7E74] mb-6">
              Plus qu'une étape — personnalisez votre pack ↓
            </p>
            <button
              onClick={onNext}
              className="text-[#6B1E3E] hover:text-[#6B1E3E]/80 transition-colors animate-bounce"
            >
              <ChevronDown className="w-8 h-8 mx-auto" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
});

// SECTION 4 - PERSONNALISATION
const Section4 = React.forwardRef<HTMLElement, {
  state: ConversionState;
  setState: React.Dispatch<React.SetStateAction<ConversionState>>;
}>(({ state, setState }, ref) => {
  const selectedPlanData = state.selectedPlan ? PLANS[state.selectedPlan] : null;
  const selectedRobinet = state.selectedSKU ? ROBINETS.find(r => r.sku === state.selectedSKU) : null;
  
  // État pour gérer l'affichage des sélecteurs de couleur
  const [openColorPickers, setOpenColorPickers] = useState<{ [key: string]: boolean }>({});

  // Initialiser les couleurs par défaut
  useEffect(() => {
    if (selectedPlanData && Object.keys(state.itemColors).length === 0) {
      const defaultColors: { [key: string]: AccentColor } = {};
      selectedPlanData.welcomePack.items.forEach((item) => {
        for (let i = 0; i < item.qty; i++) {
          defaultColors[`${item.id}-${i}`] = 'bordeaux';
        }
      });
      setState({ ...state, itemColors: defaultColors });
    }
  }, [selectedPlanData]);

  const getTotalPrice = () => {
    let total = selectedRobinet?.price || 0;
    state.extraBottles.forEach((bottle) => {
      total += bottle.price;
    });
    return total;
  };

  return (
    <section
      ref={ref}
      data-section="4"
      className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 py-12 pb-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto w-full"
      >
        <h2 className="text-center mb-4">
          <span className="block text-gray-900">Votre pack, à votre image</span>
        </h2>
        <p className="text-center text-lg sm:text-xl text-[#8B7E74] mb-12">
          Choisissez vos couleurs. Ajoutez un prénom si vous le souhaitez.
        </p>

        {/* Personnalisation par objet */}
        {selectedPlanData && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/50 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personnalisez chaque accessoire</h3>
            <div className="space-y-6">
              {selectedPlanData.welcomePack.items.map((item) => (
                <div key={item.id}>
                  {Array.from({ length: item.qty }).map((_, idx) => {
                    const itemKey = `${item.id}-${idx}`;
                    return (
                      <div key={itemKey} className="p-4 bg-[#FAF8F5] rounded-xl mb-4">
                        <p className="font-medium text-gray-900 mb-3">
                          {item.name} {item.qty > 1 && `#${idx + 1}`}
                        </p>
                        
                        {/* Couleurs - Affichage par clic */}
                        <div className="mb-4">
                          {!openColorPickers[itemKey] ? (
                            <button
                              onClick={() => setOpenColorPickers({ ...openColorPickers, [itemKey]: true })}
                              className="flex items-center gap-3 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:border-[#6B1E3E]/30 transition-all w-full"
                            >
                              <div
                                className="w-8 h-8 rounded-full border-2 border-gray-300 flex-shrink-0"
                                style={{
                                  backgroundColor: ACCENT_COLORS.find(c => c.id === (state.itemColors[itemKey] || 'bordeaux'))?.hex,
                                  ...(state.itemColors[itemKey] === 'blanc' && { border: '2px solid #E5E7EB' })
                                }}
                              />
                              <div className="flex-1 text-left">
                                <p className="text-sm font-medium text-gray-900">
                                  {ACCENT_COLORS.find(c => c.id === (state.itemColors[itemKey] || 'bordeaux'))?.label}
                                </p>
                                <p className="text-xs text-[#8B7E74]">Cliquer pour changer</p>
                              </div>
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-[#8B7E74]">Couleur du liseré</p>
                                <button
                                  onClick={() => setOpenColorPickers({ ...openColorPickers, [itemKey]: false })}
                                  className="text-xs text-[#6B1E3E] hover:text-[#6B1E3E]/80 font-medium"
                                >
                                  Valider
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {ACCENT_COLORS.map((color) => (
                                  <button
                                    key={color.id}
                                    onClick={() => setState({
                                      ...state,
                                      itemColors: { ...state.itemColors, [itemKey]: color.id }
                                    })}
                                    className="relative group"
                                    title={color.label}
                                  >
                                    <div
                                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                                        state.itemColors[itemKey] === color.id
                                          ? 'border-[#6B1E3E] scale-110 shadow-lg'
                                          : 'border-gray-300 hover:border-gray-400'
                                      }`}
                                      style={{
                                        backgroundColor: color.hex,
                                        ...(color.id === 'blanc' && { border: '2px solid #E5E7EB' })
                                      }}
                                    />
                                    {state.itemColors[itemKey] === color.id && (
                                      <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white drop-shadow-lg" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Prénom (si customizable) */}
                        {item.customizable && (
                          <div>
                            <p className="text-sm text-[#8B7E74] mb-2">Ajouter un prénom (optionnel)</p>
                            <input
                              type="text"
                              maxLength={12}
                              placeholder="Max 12 caractères"
                              value={state.itemNames[itemKey] || ''}
                              onChange={(e) => setState({
                                ...state,
                                itemNames: { ...state.itemNames, [itemKey]: e.target.value }
                              })}
                              className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#6B1E3E] focus:outline-none"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bouteilles supplémentaires */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/50 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Besoin de bouteilles supplémentaires ?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { id: 'tritan-1l', label: 'Tritan 1L (plastique résistant)', price: 7, customizable: true },
              { id: 'tritan-50cl', label: 'Tritan 50cl (plastique résistant)', price: 5, customizable: true },
              { id: 'verre-1l', label: 'Bouteille en verre 1L', price: 8, customizable: false },
              { id: 'thermos', label: 'Thermos', price: 10, customizable: true }
            ].map((bottle) => {
              const count = state.extraBottles.filter(b => b.type === bottle.id).length;
              return (
                <div key={bottle.id} className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">{bottle.label}</p>
                    <p className="text-sm text-[#6B1E3E]">{bottle.price}€ pièce</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (count > 0) {
                          const newBottles = state.extraBottles.filter((b, idx) => {
                            return !(b.type === bottle.id && idx === state.extraBottles.findIndex(eb => eb.type === bottle.id));
                          });
                          setState({ ...state, extraBottles: newBottles });
                        }
                      }}
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      disabled={count === 0}
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">{count}</span>
                    <button
                      onClick={() => {
                        const newBottle: ExtraBottle = {
                          id: `${bottle.id}-${Date.now()}`,
                          type: bottle.id,
                          name: bottle.label,
                          price: bottle.price,
                          color: 'bordeaux',
                          customName: ''
                        };
                        setState({ ...state, extraBottles: [...state.extraBottles, newBottle] });
                      }}
                      className="w-8 h-8 rounded-full bg-[#6B1E3E] text-white hover:bg-[#6B1E3E]/90 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Personnalisation des bouteilles ajoutées */}
          {state.extraBottles.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Personnalisez vos bouteilles</h4>
              {state.extraBottles.map((bottle, idx) => {
                const isCustomizable = ['tritan-1l', 'tritan-50cl', 'thermos'].includes(bottle.type);
                return (
                  <div key={bottle.id} className="p-4 bg-[#FAF8F5] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-medium text-gray-900">{bottle.name} #{idx + 1}</p>
                      <button
                        onClick={() => {
                          const newBottles = state.extraBottles.filter(b => b.id !== bottle.id);
                          setState({ ...state, extraBottles: newBottles });
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Couleurs - Affichage par clic */}
                    <div className="mb-3">
                      {!openColorPickers[`bottle-${bottle.id}`] ? (
                        <button
                          onClick={() => setOpenColorPickers({ ...openColorPickers, [`bottle-${bottle.id}`]: true })}
                          className="flex items-center gap-3 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl hover:border-[#6B1E3E]/30 transition-all w-full"
                        >
                          <div
                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex-shrink-0"
                            style={{
                              backgroundColor: ACCENT_COLORS.find(c => c.id === bottle.color)?.hex,
                              ...(bottle.color === 'blanc' && { border: '2px solid #E5E7EB' })
                            }}
                          />
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">
                              {ACCENT_COLORS.find(c => c.id === bottle.color)?.label}
                            </p>
                            <p className="text-xs text-[#8B7E74]">Cliquer pour changer</p>
                          </div>
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-[#8B7E74]">Couleur du liseré</p>
                            <button
                              onClick={() => setOpenColorPickers({ ...openColorPickers, [`bottle-${bottle.id}`]: false })}
                              className="text-xs text-[#6B1E3E] hover:text-[#6B1E3E]/80 font-medium"
                            >
                              Valider
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {ACCENT_COLORS.map((color) => (
                              <button
                                key={color.id}
                                onClick={() => {
                                  const newBottles = state.extraBottles.map(b =>
                                    b.id === bottle.id ? { ...b, color: color.id } : b
                                  );
                                  setState({ ...state, extraBottles: newBottles });
                                }}
                                className="relative group"
                                title={color.label}
                              >
                                <div
                                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                                    bottle.color === color.id
                                      ? 'border-[#6B1E3E] scale-110 shadow-lg'
                                      : 'border-gray-300 hover:border-gray-400'
                                  }`}
                                  style={{
                                    backgroundColor: color.hex,
                                    ...(color.id === 'blanc' && { border: '2px solid #E5E7EB' })
                                  }}
                                />
                                {bottle.color === color.id && (
                                  <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white drop-shadow-lg" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Prénom (si customizable) */}
                    {isCustomizable && (
                      <div>
                        <p className="text-sm text-[#8B7E74] mb-2">Ajouter un prénom (optionnel)</p>
                        <input
                          type="text"
                          maxLength={12}
                          placeholder="Max 12 caractères"
                          value={bottle.customName || ''}
                          onChange={(e) => {
                            const newBottles = state.extraBottles.map(b =>
                              b.id === bottle.id ? { ...b, customName: e.target.value } : b
                            );
                            setState({ ...state, extraBottles: newBottles });
                          }}
                          className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#6B1E3E] focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Récapitulatif final */}
        <div className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E5E] text-white rounded-3xl p-6 sm:p-8 shadow-2xl mb-8">
          <h3 className="text-2xl mb-6">Récapitulatif de votre commande</h3>
          <div className="space-y-4 mb-6">
            {selectedRobinet && (
              <div className="flex justify-between pb-4 border-b border-white/20">
                <span>{selectedRobinet.name}</span>
                <span className="font-semibold">{selectedRobinet.price}€</span>
              </div>
            )}
            {selectedPlanData && (
              <div className="flex justify-between pb-4 border-b border-white/20">
                <div>
                  <p>Formule {selectedPlanData.name}</p>
                  <p className="text-sm opacity-80">
                    {state.paymentRhythm === 'monthly' && `${selectedPlanData.priceMonthly}€/mois`}
                    {state.paymentRhythm === 'quarterly' && `${selectedPlanData.priceQuarterly}€/trim.`}
                    {state.paymentRhythm === 'annual' && `${selectedPlanData.price}€/an`}
                  </p>
                </div>
                <span className="font-semibold">
                  {state.paymentRhythm === 'monthly' && `${selectedPlanData.priceMonthly}€`}
                  {state.paymentRhythm === 'quarterly' && `${selectedPlanData.priceQuarterly}€`}
                  {state.paymentRhythm === 'annual' && `${selectedPlanData.price}€`}
                </span>
              </div>
            )}
            {state.extraBottles.length > 0 && (
              <>
                {/* Grouper par type pour l'affichage */}
                {Object.entries(
                  state.extraBottles.reduce((acc, bottle) => {
                    acc[bottle.type] = (acc[bottle.type] || 0) + 1;
                    return acc;
                  }, {} as { [key: string]: number })
                ).map(([type, qty]) => {
                  const labels: any = { 
                    'tritan-1l': 'Tritan 1L (plastique résistant)', 
                    'tritan-50cl': 'Tritan 50cl (plastique résistant)', 
                    'verre-1l': 'Bouteille en verre 1L', 
                    'thermos': 'Thermos' 
                  };
                  const totalPrice = state.extraBottles.filter(b => b.type === type).reduce((sum, b) => sum + b.price, 0);
                  return (
                    <div key={type} className="flex justify-between pb-4 border-b border-white/20">
                      <span>{qty}× {labels[type]}</span>
                      <span className="font-semibold">{totalPrice}€</span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="flex justify-between text-2xl font-bold pt-6 border-t-2 border-white/30">
            <span>Total robinet</span>
            <span>{getTotalPrice()}€</span>
          </div>
          {selectedPlanData && (
            <p className="text-sm opacity-90 mt-4">
              + {state.paymentRhythm === 'monthly' && `${selectedPlanData.priceMonthly}€/mois`}
              {state.paymentRhythm === 'quarterly' && `${selectedPlanData.priceQuarterly}€/trim.`}
              {state.paymentRhythm === 'annual' && `${selectedPlanData.price}€/an`} pour la formule d'entretien
            </p>
          )}
        </div>

        {/* CTA final */}
        <div className="text-center">
          <motion.button
            onClick={() => {
              // Préparer les données de commande
              const orderData = {
                robinet: selectedRobinet,
                plan: selectedPlanData,
                paymentRhythm: state.paymentRhythm,
                waterSavings: state.yearlyTotal,
                personalizedItems: state.itemColors,
                customNames: state.itemNames,
                extraBottles: state.extraBottles,
                totalPrice: getTotalPrice(),
                timestamp: new Date().toISOString()
              };
              
              // Log des données (à remplacer par API réelle)
              console.log('=== COMMANDE HYDRAL ===');
              console.log(JSON.stringify(orderData, null, 2));

              // Sauvegarder dans sessionStorage pour le panier
              sessionStorage.setItem('hydral-order', JSON.stringify(orderData));

              // Redirection vers le panier
              navigate('cart');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 sm:px-16 py-5 sm:py-6 bg-[#6B1E3E] text-white rounded-full text-lg sm:text-xl font-semibold shadow-2xl hover:bg-[#6B1E3E]/90 transition-colors mb-6"
          >
            Confirmer ma commande →
          </motion.button>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-[#8B7E74]">
            <div className="flex items-center gap-2">
              <span>🚚</span>
              <span>Livraison sous 5–7 jours ouvrés</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔄</span>
              <span>Satisfait ou remboursé 30 jours</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Paiement 100% sécurisé</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
});
