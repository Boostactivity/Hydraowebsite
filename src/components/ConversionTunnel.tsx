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
    tagline: 'Le plus choisi',
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
    co2: 4,
    delivery: 'Incluse',
    checkup: '—',
    parts: '—',
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
    filters: 4,
    co2: 8,
    delivery: 'Prioritaire',
    checkup: '1/an offert',
    parts: '—',
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
    filters: 6,
    co2: 12,
    delivery: 'Express',
    checkup: '2/an offerts',
    parts: 'Prix réduit',
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

  // Persist state in sessionStorage
  useEffect(() => {
    if (state.selectedWaters.length > 0 || state.selectedSKU || state.selectedPlan) {
      sessionStorage.setItem('hydral-tunnel', JSON.stringify(state));
    }
  }, [state]);

  // Restore state on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('hydral-tunnel');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch {}
    }
  }, []);

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
  const calculateSavings = useCallback((robinetPrice: number, subscriptionYearly: number = 99) => {
    const yearlyBottle = state.yearlyTotal || 0;
    // Économie annuelle réelle = ce qu'on dépensait - l'abonnement
    const savingsPerYear = yearlyBottle - subscriptionYearly;
    // Économie année 1 = économie annuelle - prix du robinet (peut être négatif)
    const savings1y = savingsPerYear - robinetPrice;
    // Économies sur 5 ans = (économie annuelle × 5) - prix robinet
    const savings5y = (savingsPerYear * 5) - robinetPrice;
    // Break-even = prix robinet / économie mensuelle nette (en tenant compte de l'abo)
    const monthlySavings = savingsPerYear / 12;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(robinetPrice / monthlySavings) : 999;
    // Économie annuelle récurrente (à partir de l'année 2)
    const yearlySavings = savingsPerYear;

    return { savings1y, savings5y, breakEvenMonths, yearlySavings };
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
      {/* BARRE DE PROGRESSION FIXE - Design subtil flottant - Visible à partir section 1 */}
      {currentSection >= 1 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-full shadow-md border border-gray-200/40 px-4 py-2">
            <div className="flex items-center gap-2">
              {[
                { id: 1, label: 'Économies', icon: '💧' },
                { id: 2, label: 'Robinet', icon: '🚿' },
                { id: 3, label: 'Formule', icon: '📦' },
                { id: 4, label: 'Mon pack', icon: '✨' }
              ].map((step, idx) => (
                <div key={step.id} className="flex items-center gap-1.5">
                  <div className={`flex items-center gap-1.5 transition-all ${
                    currentSection >= step.id ? 'opacity-100' : 'opacity-30'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                      currentSection >= step.id
                        ? 'bg-[#6B1E3E] text-white'
                        : 'bg-gray-200 text-[#8B7E74]'
                    }`}>
                      {step.icon}
                    </div>
                    <span className="hidden md:inline text-xs font-medium text-gray-700">
                      {step.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div className={`w-6 h-0.5 transition-colors ${
                      currentSection > step.id ? 'bg-[#6B1E3E]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Bouton retour - Position fixe en haut à gauche */}
      {currentSection >= 2 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            // Revenir à l'étape précédente dans le parcours
            if (currentSection === 2) {
              scrollToSection(section1Ref);
            } else if (currentSection === 3) {
              scrollToSection(section2Ref);
            } else if (currentSection === 4) {
              scrollToSection(section3Ref);
            }
          }}
          className="fixed top-24 left-6 z-40 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md text-[#6B1E3E] hover:bg-[#6B1E3E] hover:text-white border border-gray-200 rounded-full shadow-lg transition-all"
          title="Retour à l'étape précédente"
        >
          ←
        </motion.button>
      )}
      
      {/* Bouton recommencer - Position fixe en haut à droite */}
      {currentSection >= 1 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            setState({
              selectedWaters: [],
              selectedColoris: 'chrome-brillant',
              paymentRhythm: 'annual',
              yearlyTotal: 0,
              monthlyTotal: 0,
              itemColors: {},
              itemNames: {},
              extraBottles: []
            });
            scrollToSection(section0Ref);
          }}
          className="fixed top-24 right-6 z-40 px-4 py-2 bg-white/90 backdrop-blur-md text-xs text-[#6B1E3E] hover:bg-[#6B1E3E] hover:text-white border border-gray-200 rounded-full shadow-lg transition-all"
        >
          ↺ Recommencer
        </motion.button>
      )}

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
        onNext={() => scrollToSection(section2Ref)}
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

// SECTION 0 - INTRO
const Section0 = React.forwardRef<HTMLElement, { onStart: () => void }>(
  ({ onStart }, ref) => {
    return (
      <section
        ref={ref}
        data-section="0"
        className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-24 pb-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="mb-6">
            <span className="block text-gray-900">Arrêtez de payer</span>
            <span className="block text-[#6B1E3E]">pour de l'eau en bouteille.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#8B7E74] mb-12 sm:mb-16 max-w-3xl mx-auto">
            En 3 minutes, calculez vos économies, choisissez votre robinet et recevez votre pack personnalisé.
          </p>

          {/* Les 4 étapes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {[
              { icon: '💧', title: 'Vos économies', desc: 'Calculez ce que vous dépensez vraiment' },
              { icon: '🚿', title: 'Votre robinet', desc: 'Choisissez Pure, Spark ou One' },
              { icon: '📦', title: 'Votre formule', desc: 'Abonnement transparent, zéro surprise' },
              { icon: '✨', title: 'Votre pack', desc: 'Personnalisez vos accessoires' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="p-6 bg-white rounded-2xl border border-gray-200/50 shadow-sm"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-[#8B7E74]">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-[#6B1E3E] text-white rounded-full text-lg font-medium shadow-xl hover:bg-[#6B1E3E]/90 transition-colors inline-flex items-center gap-2"
          >
            Commencer
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    );
  }
);

// SECTION 1 - CALCULATEUR (à compléter dans le prochain message - fichier trop long)
const Section1 = React.forwardRef<HTMLElement, {
  state: ConversionState;
  setState: React.Dispatch<React.SetStateAction<ConversionState>>;
  calculateSavings: (robinetPrice: number, subscriptionYearly?: number) => { savings1y: number; savings5y: number; breakEvenMonths: number; yearlySavings: number };
  onNext: () => void;
}>(({ state, setState, calculateSavings, onNext }, ref) => {
  const [mode, setMode] = useState<'complete' | 'quick'>('complete');
  const [waterSearch, setWaterSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Marques uniques pour le type d'eau sélectionné
  const uniqueBrands = useMemo(() => {
    if (!state.waterType) return [];
    let waters = WATER_DATABASE;
    if (state.waterType === 'still') waters = waters.filter(w => w.type === 'still');
    else if (state.waterType === 'sparkling') waters = waters.filter(w => w.type === 'sparkling');

    const brandMap = new Map<string, { brand: string; minPrice: number; type: string }>();
    waters.forEach(w => {
      if (!brandMap.has(w.brand) || w.packPrice < brandMap.get(w.brand)!.minPrice) {
        brandMap.set(w.brand, { brand: w.brand, minPrice: w.packPrice, type: w.type });
      }
    });

    const brands = Array.from(brandMap.values());
    if (waterSearch.trim()) {
      const q = waterSearch.toLowerCase();
      return brands.filter(b => b.brand.toLowerCase().includes(q));
    }
    return brands.sort((a, b) => a.brand.localeCompare(b.brand));
  }, [state.waterType, waterSearch]);

  // Formats disponibles pour la marque sélectionnée
  const availableFormats = useMemo(() => {
    if (!selectedBrand) return [];
    return WATER_DATABASE.filter(w => w.brand === selectedBrand);
  }, [selectedBrand]);

  // Ajout eau avec format choisi
  const addWater = useCallback((water: WaterData) => {
    setState(prev => {
      const exists = prev.selectedWaters.find(
        w => w.brand === water.brand && w.format === water.format
      );
      if (exists) return prev;

      const newWater: SelectedWater = {
        ...water,
        quantity: 1,
        period: 'week'
      };
      return { ...prev, selectedWaters: [...prev.selectedWaters, newWater] };
    });
    setSelectedBrand(null);
  }, [setState]);

  // Supprimer une eau
  const removeWater = useCallback((index: number) => {
    setState(prev => {
      const updated = prev.selectedWaters.filter((_, i) => i !== index);
      if (updated.length > 0) {
        const yearlyTotal = updated.reduce((sum, w) => {
          const perWeek = w.period === 'week' ? w.quantity : w.quantity / 4.33;
          return sum + (perWeek * 52 * w.packPrice);
        }, 0);
        return { ...prev, selectedWaters: updated, yearlyTotal: Math.round(yearlyTotal), monthlyTotal: Math.round(yearlyTotal / 12) };
      } else {
        return { ...prev, selectedWaters: [], yearlyTotal: 0, monthlyTotal: 0 };
      }
    });
  }, [setState]);

  // Update quantité
  const updateQuantity = useCallback((index: number, quantity: number, period: 'week' | 'month') => {
    setState(prev => {
      const updated = [...prev.selectedWaters];
      updated[index] = { ...updated[index], quantity, period };
      const yearlyTotal = updated.reduce((sum, w) => {
        const perWeek = w.period === 'week' ? w.quantity : w.quantity / 4.33;
        return sum + (perWeek * 52 * w.packPrice);
      }, 0);
      return { ...prev, selectedWaters: updated, yearlyTotal: Math.round(yearlyTotal), monthlyTotal: Math.round(yearlyTotal / 12) };
    });
  }, [setState]);

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

        {/* Toggle mode - TOUJOURS VISIBLE */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setMode('complete');
              // Reset mode simple
              if (mode === 'quick') {
                setState({ ...state, yearlyTotal: 0, monthlyTotal: 0 });
              }
            }}
            className={`px-6 py-3 rounded-full transition-all ${
              mode === 'complete'
                ? 'bg-[#6B1E3E] text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            Mode complet
          </button>
          <button
            onClick={() => {
              setMode('quick');
              // Reset mode complet
              if (mode === 'complete') {
                setState({ ...state, waterType: null, selectedWaters: [], yearlyTotal: 0, monthlyTotal: 0 });
              }
            }}
            className={`px-6 py-3 rounded-full transition-all ${
              mode === 'quick'
                ? 'bg-[#6B1E3E] text-white shadow-lg'
                : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            Mode simple
          </button>
        </div>

        {/* MODE SIMPLE - TOUJOURS VISIBLE */}
        {mode === 'quick' && (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200/50 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Nombre de personnes dans votre foyer</h3>
              {state.yearlyTotal > 0 && (
                <button
                  onClick={() => setState({ ...state, yearlyTotal: 0, monthlyTotal: 0 })}
                  className="text-sm text-[#6B1E3E] hover:text-[#6B1E3E]/80 font-medium"
                >
                  Réinitialiser
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {/* 1,5L/jour/personne × prix moyen 0,42€/L (moyenne pondérée toutes marques/enseignes) */}
              {[
                { value: 1, label: '1 personne', yearly: 230, monthly: 19 },
                { value: 2, label: '2 personnes', yearly: 460, monthly: 38 },
                { value: 3, label: '3 personnes', yearly: 690, monthly: 58 },
                { value: 4, label: '4 personnes', yearly: 920, monthly: 77 },
                { value: 5, label: '5+ personnes', yearly: 1150, monthly: 96 }
              ].map((option) => {
                const isSelected = state.yearlyTotal === option.yearly && state.monthlyTotal === option.monthly;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setState({
                        ...state,
                        yearlyTotal: option.yearly,
                        monthlyTotal: option.monthly
                      });
                    }}
                    className={`p-6 rounded-xl transition-all border-2 text-center ${
                      isSelected
                        ? 'bg-[#6B1E3E] text-white border-[#6B1E3E] shadow-lg'
                        : 'bg-[#FAF8F5] hover:bg-[#6B1E3E]/10 text-gray-900 border-gray-200 hover:border-[#6B1E3E]/50'
                    }`}
                  >
                    <p className="font-semibold text-lg mb-2">{option.label}</p>
                    <p className={`text-sm ${isSelected ? 'opacity-100' : 'opacity-70'}`}>{option.yearly}€/an</p>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#8B7E74] text-center mt-6 leading-relaxed">
              Estimation basée sur 1,5L/jour/personne — recommandation santé — et le prix moyen constaté en grande surface.
            </p>
          </div>
        )}

        {/* MODE COMPLET */}
        {mode === 'complete' && (
          <>
            {/* Étape A - Type d'eau - TOUJOURS VISIBLE */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200/50 mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quel type d'eau achetez-vous ?</h3>
                {state.waterType && (
                  <button
                    onClick={() => setState({ ...state, waterType: null, selectedWaters: [], yearlyTotal: 0, monthlyTotal: 0 })}
                    className="text-sm text-[#6B1E3E] hover:text-[#6B1E3E]/80 font-medium"
                  >
                    Modifier
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: 'still' as WaterType, icon: '💧', label: 'Eau plate' },
                  { value: 'sparkling' as WaterType, icon: '🫧', label: 'Eau gazeuse' },
                  { value: 'both' as WaterType, icon: '💧🫧', label: 'Les deux' }
                ].map((option) => {
                  const isSelected = state.waterType === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setState({ ...state, waterType: option.value, selectedWaters: state.waterType === option.value ? state.selectedWaters : [], yearlyTotal: state.waterType === option.value ? state.yearlyTotal : 0, monthlyTotal: state.waterType === option.value ? state.monthlyTotal : 0 })}
                      className={`p-6 rounded-xl transition-all border-2 text-center ${
                        isSelected
                          ? 'bg-[#6B1E3E] text-white border-[#6B1E3E] shadow-lg'
                          : 'bg-[#FAF8F5] hover:bg-[#6B1E3E]/10 border-gray-200 hover:border-[#6B1E3E]/50'
                      }`}
                    >
                      <div className="text-4xl mb-2">{option.icon}</div>
                      <p className="font-medium">{option.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Étape B - Choix marque */}
            {state.waterType && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200/50 mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {!selectedBrand ? 'Quelle marque achetez-vous ?' : `${selectedBrand} — choisissez le format`}
                  </h3>
                  <div className="flex items-center gap-3">
                    {selectedBrand && (
                      <button
                        onClick={() => setSelectedBrand(null)}
                        className="text-sm text-[#6B1E3E] hover:text-[#6B1E3E]/80 font-medium"
                      >
                        ← Autres marques
                      </button>
                    )}
                    {state.selectedWaters.length > 0 && !selectedBrand && (
                      <button
                        onClick={() => setState({ ...state, selectedWaters: [], yearlyTotal: 0, monthlyTotal: 0 })}
                        className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Tout effacer
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-[#8B7E74] mb-4">Prix moyen constaté en grande surface</p>

                {/* Eaux déjà sélectionnées */}
                {state.selectedWaters.length > 0 && !selectedBrand && (
                  <div className="mb-4 p-3 bg-[#6B1E3E]/5 rounded-xl border border-[#6B1E3E]/20">
                    <p className="text-xs font-medium text-[#6B1E3E] mb-2">Vos eaux ({state.selectedWaters.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {state.selectedWaters.map((water, idx) => (
                        <div key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-[#6B1E3E]/30 text-sm">
                          <span className="text-gray-900 font-medium">{water.brand}</span>
                          <span className="text-[#8B7E74]">{water.format}</span>
                          <button onClick={() => removeWater(idx)} className="text-red-500 hover:text-red-700">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vue marques (pas de marque sélectionnée) */}
                {!selectedBrand && (
                  <>
                    <input
                      type="text"
                      placeholder="Rechercher une marque..."
                      value={waterSearch}
                      onChange={(e) => setWaterSearch(e.target.value)}
                      className="w-full px-4 py-3 mb-4 rounded-xl border-2 border-gray-200 focus:border-[#6B1E3E] focus:outline-none text-sm"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
                      {uniqueBrands.map((item) => {
                        const alreadyAdded = state.selectedWaters.some(w => w.brand === item.brand);
                        return (
                          <button
                            key={item.brand}
                            onClick={() => { setSelectedBrand(item.brand); setWaterSearch(''); }}
                            className={`p-4 rounded-xl border-2 text-center transition-all ${
                              alreadyAdded
                                ? 'bg-[#6B1E3E]/5 border-[#6B1E3E]/30'
                                : 'bg-[#FAF8F5] border-gray-200 hover:border-[#6B1E3E]/50 hover:bg-[#6B1E3E]/10'
                            }`}
                          >
                            <p className="font-semibold text-sm text-gray-900">{item.brand}</p>
                            <p className="text-xs text-[#8B7E74] mt-1">dès {item.minPrice.toFixed(2)}€</p>
                            {alreadyAdded && <p className="text-xs text-[#6B1E3E] mt-1 font-medium">Ajoutée</p>}
                          </button>
                        );
                      })}
                    </div>
                    {state.selectedWaters.length > 0 && (
                      <p className="text-xs text-[#8B7E74] text-center mt-4">
                        Vous pouvez ajouter plusieurs marques
                      </p>
                    )}
                  </>
                )}

                {/* Vue formats (marque sélectionnée) */}
                {selectedBrand && (
                  <div className="space-y-3">
                    {availableFormats.map((water, idx) => {
                      const isSelected = state.selectedWaters.some(
                        w => w.brand === water.brand && w.format === water.format
                      );
                      const isPack = water.format.startsWith('6') || water.format.startsWith('8');
                      return (
                        <button
                          key={idx}
                          onClick={() => !isSelected && addWater(water)}
                          disabled={isSelected}
                          className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between border-2 ${
                            isSelected
                              ? 'bg-[#6B1E3E] text-white border-[#6B1E3E] shadow-lg cursor-default'
                              : 'bg-[#FAF8F5] hover:bg-[#6B1E3E]/10 hover:border-[#6B1E3E]/50 border-gray-200 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#6B1E3E] border border-[#6B1E3E]/20'
                            }`}>
                              {isPack ? 'Pack' : 'Unité'}
                            </div>
                            <div>
                              <p className="font-semibold">{water.format}</p>
                              <p className={`text-xs ${isSelected ? 'opacity-90' : 'text-[#8B7E74]'}`}>
                                {water.pricePerLiter.toFixed(2)}€/litre
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold">{water.packPrice.toFixed(2)}€</p>
                            {isSelected && <p className="text-xs opacity-90">Ajouté</p>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Étape C - Quantités */}
            {state.selectedWaters.length > 0 && (
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200/50 mb-6 sm:mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Combien en achetez-vous ?</h3>
                <div className="space-y-6">
                  {state.selectedWaters.map((water, idx) => (
                    <div key={idx} className="p-4 bg-[#FAF8F5] rounded-xl">
                      <p className="font-semibold text-gray-900 mb-3">{water.brand} {water.format}</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="number"
                          min="0"
                          placeholder="Quantité"
                          value={water.quantity || ''}
                          onChange={(e) => updateQuantity(idx, parseFloat(e.target.value) || 0, water.period)}
                          className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#6B1E3E] focus:outline-none"
                        />
                        <select
                          value={water.period}
                          onChange={(e) => updateQuantity(idx, water.quantity, e.target.value as 'week' | 'month')}
                          className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-[#6B1E3E] focus:outline-none"
                        >
                          <option value="week">par semaine</option>
                          <option value="month">par mois</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* BLOC RÉSULTATS - Affichés dès qu'il y a un total */}
        {state.yearlyTotal && state.yearlyTotal > 0 && (
          <>
            {/* Cadre 1 - Dépenses actuelles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200/50 mb-8"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Ce que vous dépensez aujourd'hui</h3>
              <div className="text-center">
                <p className="text-sm text-[#8B7E74] mb-2">Dépense annuelle</p>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{state.yearlyTotal}€</p>
                <p className="text-sm text-[#8B7E74] mb-6">
                  {state.yearlyTotal < 100 && "Soit environ quelques semaines de café"}
                  {state.yearlyTotal >= 100 && state.yearlyTotal < 250 && "Soit l'équivalent d'un week-end en famille"}
                  {state.yearlyTotal >= 250 && state.yearlyTotal < 500 && "Soit presque un billet d'avion aller-retour"}
                  {state.yearlyTotal >= 500 && "Soit le prix d'un robinet Hydral — chaque année"}
                </p>
                <p className="text-sm text-[#8B7E74]">Sur 5 ans : <span className="font-semibold text-gray-900">{state.yearlyTotal * 5}€</span></p>
              </div>
            </motion.div>

            {/* Cadre 2 - Économies avec Hydral + les 3 robinets */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-gray-200/50 mb-12"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Ce que vous économiseriez avec Hydral</h3>
              
              {/* Les 3 robinets avec économies calculées */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ROBINETS.map((robinet) => {
                  const { savings5y, breakEvenMonths, yearlySavings } = calculateSavings(robinet.price, 99);
                  const Icon = robinet.icon;
                  return (
                    <div key={robinet.sku} className="h-full flex flex-col p-6 bg-gradient-to-br from-[#FAF8F5] to-white rounded-2xl border-2 border-gray-200">
                      {/* Image du robinet */}
                      {robinet.image && (
                        <div className="mb-4 overflow-hidden rounded-xl bg-[#FAF8F5]">
                          <img
                            src={robinet.image}
                            alt={robinet.name}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      )}
                      <div className="text-center mb-4">
                        <Icon className="w-10 h-10 text-[#6B1E3E] mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900 min-h-[2.5rem] flex items-center justify-center">{robinet.name}</h4>
                        <p className="text-2xl font-bold text-[#6B1E3E] my-2">{robinet.price}€</p>
                      </div>
                      <div className="space-y-2 text-sm flex-1">
                        <div className="flex items-center justify-between py-2 border-t border-gray-200">
                          <span className="text-[#8B7E74]">Rentabilisé en</span>
                          <span className="font-semibold text-gray-900">{breakEvenMonths < 100 ? `${breakEvenMonths} mois` : '—'}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-gray-200">
                          <span className="text-[#8B7E74]">Vous économisez</span>
                          <span className="font-semibold text-green-600">{Math.round(yearlySavings)}€/an</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-gray-200">
                          <span className="text-[#8B7E74]">Économie sur 5 ans</span>
                          <span className="font-semibold text-green-600">+{Math.round(savings5y)}€</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Break-even simple visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/50 mb-8 mt-8"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">Quand commencez-vous à économiser ?</h4>
              <div className="space-y-4">
                {ROBINETS.map((robinet) => {
                  const { breakEvenMonths, yearlySavings } = calculateSavings(robinet.price, 99);
                  const progress = breakEvenMonths < 100 ? Math.min((breakEvenMonths / 24) * 100, 100) : 100;
                  return (
                    <div key={robinet.sku} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-gray-700 flex-shrink-0">{robinet.name}</div>
                      <div className="flex-1 relative">
                        <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#6B1E3E]/80 to-[#6B1E3E] rounded-full flex items-center justify-end pr-3 transition-all duration-700"
                            style={{ width: `${progress}%` }}
                          >
                            <span className="text-xs text-white font-semibold whitespace-nowrap">
                              {breakEvenMonths < 100 ? `${breakEvenMonths} mois` : '—'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-20 text-right text-sm font-semibold text-green-600 flex-shrink-0">
                        {yearlySavings > 0 ? `+${Math.round(yearlySavings)}€/an` : '—'}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-[#8B7E74] text-center mt-4">
                Après la période de rentabilisation, chaque euro est une économie nette
              </p>
            </motion.div>

            {/* Transition */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-lg text-[#8B7E74] mb-6">
                Quel robinet vous correspond ? ↓
              </p>
              <button
                onClick={onNext}
                className="text-[#6B1E3E] hover:text-[#6B1E3E]/80 transition-colors animate-bounce"
              >
                <ChevronDown className="w-8 h-8 mx-auto" />
              </button>
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
});

// SECTION 2, 3, 4 dans le prochain fichier (trop long)
const Section2 = React.forwardRef<HTMLElement, {
  state: ConversionState;
  setState: React.Dispatch<React.SetStateAction<ConversionState>>;
  calculateSavings: (robinetPrice: number, subscriptionYearly?: number) => { savings1y: number; savings5y: number; breakEvenMonths: number; yearlySavings: number };
  onNext: () => void;
}>(({ state, setState, calculateSavings, onNext }, ref) => {
  return (
    <section
      ref={ref}
      data-section="2"
      className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto w-full"
      >
        <h2 className="text-center mb-4">
          <span className="block text-gray-900">Choisissez votre robinet</span>
        </h2>
        <p className="text-center text-lg sm:text-xl text-[#8B7E74] mb-12">
          Le bon robinet pour le bon foyer
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {ROBINETS.map((robinet, idx) => {
            const Icon = robinet.icon;
            const { savings5y, breakEvenMonths, yearlySavings } = calculateSavings(robinet.price, 99);

            return (
              <motion.div
                key={robinet.sku}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 border-2 transition-all flex flex-col min-h-[650px] ${
                  robinet.recommended
                    ? 'border-[#6B1E3E] bg-white shadow-2xl'
                    : 'border-gray-200 bg-white hover:border-[#6B1E3E]/30 hover:shadow-xl'
                } ${state.selectedSKU === robinet.sku ? 'ring-4 ring-[#6B1E3E]/20' : ''}`}
              >
                {robinet.recommended && !robinet.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#6B1E3E] text-white text-sm rounded-full shadow-lg">
                    Le plus complet
                  </div>
                )}
                {robinet.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#6B1E3E] text-white text-sm rounded-full shadow-lg">
                    Le plus choisi
                  </div>
                )}

                {/* Image du robinet */}
                {robinet.image && (
                  <div className="mb-6 overflow-hidden rounded-2xl bg-[#FAF8F5]">
                    <img
                      src={robinet.image}
                      alt={robinet.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                <div className="text-center mb-6">
                  <Icon className="w-12 h-12 text-[#6B1E3E] mx-auto mb-4" />
                  <h3 className="text-2xl mb-2 text-gray-900">{robinet.name}</h3>
                  <p className="text-sm text-[#8B7E74]">{robinet.tagline}</p>
                </div>

                <div className="mb-6 text-center">
                  <p className="text-3xl font-bold text-gray-900">{robinet.price}€</p>
                  <p className="text-xs text-[#6B1E3E] mt-1 font-medium">Livraison offerte</p>
                </div>

                {/* Économies calculées */}
                {state.yearlyTotal && state.yearlyTotal > 0 && (
                  <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <p className="text-sm text-[#8B7E74] mb-2 text-center">Avec vos dépenses actuelles :</p>
                    <p className="text-center">
                      <span className="text-sm text-gray-700">Rentabilisé en </span>
                      <span className="font-bold text-green-700">{breakEvenMonths < 100 ? `${breakEvenMonths} mois` : '—'}</span>
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <p className="text-center">
                        <span className="text-xs text-[#8B7E74]">Vous économisez </span>
                        <span className="font-bold text-green-700">{Math.round(yearlySavings)}€/an</span>
                      </p>
                      <p className="text-center">
                        <span className="text-xs text-[#8B7E74]">Sur 5 ans : </span>
                        <span className="font-bold text-green-700">+{Math.round(savings5y)}€</span>
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-8">
                  {robinet.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`text-sm font-medium ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                          {feature.label}
                        </p>
                        {feature.desc && feature.included && (
                          <p className="text-xs text-[#8B7E74] mt-1">{feature.desc}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl mb-4">
                  <p className="text-xs text-[#8B7E74] mb-1">Idéal pour :</p>
                  <p className="text-sm text-gray-900">{robinet.idealFor}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-100 mb-6">
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 rounded-full bg-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic leading-relaxed">
                    {robinet.sku === 'pure' && '"Parfait pour le thé et la cuisine. Simple et efficace." — Claire, Paris'}
                    {robinet.sku === 'spark' && '"Fini les packs de Perrier ! Toute la famille adore." — Marc, Famille de 4, Nantes'}
                    {robinet.sku === 'one' && '"Le meilleur investissement cuisine qu\'on ait fait. On a tout en un." — Sophie, Lyon'}
                  </p>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => {
                      setState({ ...state, selectedSKU: robinet.sku });
                    }}
                    className={`w-full py-4 rounded-full font-medium transition-all ${
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

        {/* Section Coloris et Images - Toujours visible */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-16 mb-12"
        >
          <div className="bg-gradient-to-br from-white via-[#FAF8F5]/30 to-white rounded-3xl p-10 shadow-2xl border border-gray-100/50">
            <div className="max-w-6xl mx-auto">
              {/* Titre marketing avec badge */}
              <div className="text-center mb-10">
                {state.selectedSKU && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6B1E3E]/10 border border-[#6B1E3E]/20 rounded-full text-sm text-[#6B1E3E] font-medium mb-4"
                  >
                    <Sparkles className="w-4 h-4" />
                    Votre sélection
                  </motion.div>
                )}
                <h3 className="text-3xl text-gray-900 mb-3">
                  {state.selectedSKU 
                    ? `${ROBINETS.find(r => r.sku === state.selectedSKU)?.name}`
                    : '15 combinaisons possibles'}
                </h3>
                <p className="text-lg text-[#8B7E74]">
                  {state.selectedSKU 
                    ? 'Choisissez votre finition — 5 coloris exclusifs'
                    : '3 modèles × 5 finitions haut de gamme'}
                </p>
              </div>

              {/* Sélecteur de coloris avec label */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-700">Finition sélectionnée</p>
                  <p className="text-sm text-[#6B1E3E] font-semibold">
                    {ROBINET_COLORIS.find(c => c.id === state.selectedColoris)?.name || 'Chrome'}
                  </p>
                </div>
                <ColorisSelector
                  selectedColoris={state.selectedColoris}
                  onSelectColoris={(colorisId) => setState({ ...state, selectedColoris: colorisId })}
                  colorisOptions={ROBINET_COLORIS}
                />
              </div>

              {/* Galerie d'images + Informations côte à côte */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Galerie avec effet premium */}
                <motion.div
                  key={`${state.selectedSKU || 'pure'}-${state.selectedColoris}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#6B1E3E]/5 to-transparent rounded-3xl blur-2xl" />
                  <div className="relative">
                    <ProductImageGallery
                      productName={state.selectedSKU ? ROBINETS.find(r => r.sku === state.selectedSKU)?.name || '' : 'Pure'}
                      colorName={ROBINET_COLORIS.find(c => c.id === state.selectedColoris)?.name || 'Chrome'}
                      modelSKU={state.selectedSKU || 'pure'}
                      colorId={state.selectedColoris}
                    />
                  </div>
                </motion.div>

                {/* Informations avec USP */}
                <div className="space-y-5">
                  {/* Badge premium */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6B1E3E]/10 to-[#6B1E3E]/5 border border-[#6B1E3E]/20 rounded-full">
                    <Check className="w-4 h-4 text-[#6B1E3E]" />
                    <span className="text-sm font-medium text-gray-900">Qualité premium garantie 5 ans</span>
                  </div>

                  {/* Avantages finition */}
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#6B1E3E]" />
                      Finition {ROBINET_COLORIS.find(c => c.id === state.selectedColoris)?.name}
                    </h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                        <span>Revêtement anti-traces PVD — reste impeccable sans effort</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                        <span>Résistance extrême aux rayures, corrosion et oxydation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                        <span>Garantie constructeur 5 ans sur toutes les finitions</span>
                      </li>
                    </ul>
                  </div>

                  {/* Installation */}
                  <div className="bg-gradient-to-br from-[#6B1E3E]/5 to-[#6B1E3E]/10 rounded-2xl p-6 border border-[#6B1E3E]/20">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-5 h-5 text-[#6B1E3E]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Installation clé en main incluse</h4>
                        <p className="text-sm text-gray-700">
                          Un plombier agréé HYDRAL installe votre robinet en ~2h. Guide technique détaillé fourni.
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#6B1E3E]/10">
                      <p className="text-xs text-[#8B7E74] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6B1E3E]" />
                        Dimensions : H 40cm × L 22cm × P 12cm
                      </p>
                    </div>
                  </div>

                  {/* Social proof subtil */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B1E3E] to-[#8B2E5E] border-2 border-white" />
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B2E5E] to-[#6B1E3E] border-2 border-white" />
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B1E3E]/70 to-[#8B2E5E]/70 border-2 border-white" />
                    </div>
                    <p className="text-sm text-[#8B7E74]">
                      <span className="font-semibold text-gray-900">250+ familles</span> équipées en 2024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {state.selectedSKU && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-lg text-[#8B7E74] mb-6">
              Parfait. Choisissons ensemble votre formule d'abonnement ↓
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
        <h2 className="text-center mb-4">
          <span className="block text-gray-900">Zéro surprise.</span>
          <span className="block text-[#6B1E3E]">Voici exactement ce que vous payez.</span>
        </h2>

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
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Check-up</span>
                    <span className="font-semibold text-gray-900">
                      {plan.checkup}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">Pièces usure</span>
                    <span className="font-semibold text-gray-900">
                      {plan.parts}
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
