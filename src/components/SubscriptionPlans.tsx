import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Check, Package, Sparkles, Shield, Clock, RefreshCw, Lock } from 'lucide-react';

// Types
type PaymentRhythm = 'monthly' | 'quarterly' | 'annual';
type PlanType = 'essential' | 'standard' | 'plus';
type SKUType = 'SKU1' | 'SKU2' | 'SKU3' | 'sku1' | 'sku2' | 'sku3';

interface SubscriptionPlansProps {
  selectedSKU?: SKUType;
  yearlySavings?: number;
  householdSize?: number; // Pour pré-sélectionner la formule
  onPlanSelected?: (plan: PlanType, rhythm: PaymentRhythm) => void;
}

// Prix selon le rythme
const PRICING = {
  essential: {
    monthly: 4.92,
    quarterly: 14.75,
    annual: 59
  },
  standard: {
    monthly: 8.25,
    quarterly: 24.75,
    annual: 99
  },
  plus: {
    monthly: 9.92,
    quarterly: 29.75,
    annual: 119
  }
};

// Contenu des plans
const PLANS_CONTENT = {
  essential: {
    name: 'Essentiel',
    for: '1–2 personnes',
    usage: 'Modéré',
    filters: 2,
    co2: 4,
    delivery: 'Incluse',
    value: 40
  },
  standard: {
    name: 'Standard',
    for: '3–4 personnes',
    usage: 'Régulier',
    filters: 4,
    co2: 8,
    delivery: 'Prioritaire',
    value: 75
  },
  plus: {
    name: 'Plus',
    for: '5+ personnes',
    usage: 'Intensif',
    filters: 6,
    co2: 12,
    delivery: 'Express',
    value: 120
  }
};

// Pack de bienvenue
const WELCOME_PACKS = {
  essential: [
    { item: '2 bouteilles en verre 1L', icon: '🥤' },
    { item: '2 bouteilles Tritan 1L', icon: '🍾' },
    { item: '2 bouteilles Tritan 50cl', icon: '🍶' }
  ],
  standard: [
    { item: '3 bouteilles en verre 1L', icon: '🥤' },
    { item: '3 bouteilles Tritan 1L', icon: '🍾' },
    { item: '3 bouteilles Tritan 50cl', icon: '🍶' },
    { item: '1 carafe ouverte', icon: '🫗' }
  ],
  plus: [
    { item: '4 bouteilles en verre 1L', icon: '🥤' },
    { item: '4 bouteilles Tritan 1L', icon: '🍾' },
    { item: '4 bouteilles Tritan 50cl', icon: '🍶' },
    { item: '1 carafe ouverte', icon: '🫗' },
    { item: '1 carafe hermétique', icon: '🫙' },
    { item: '1 thermos', icon: '🌡️' }
  ]
};

export default function SubscriptionPlans({ 
  selectedSKU: propSKU, 
  yearlySavings: propYearlySavings, 
  householdSize: propHouseholdSize,
  onPlanSelected 
}: SubscriptionPlansProps) {
  // Récupérer les données du calculateur depuis sessionStorage
  const [calculatorData, setCalculatorData] = useState<{
    selectedSKU: string;
    yearlySavings: number;
    householdSize: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('calculatorData');
      if (stored) {
        setCalculatorData(JSON.parse(stored));
      }
    }
  }, []);

  // Utiliser les données du calculateur si disponibles, sinon les props par défaut
  const selectedSKU = calculatorData?.selectedSKU || propSKU || 'SKU2';
  const yearlySavings = calculatorData?.yearlySavings || propYearlySavings || 0;
  const householdSize = calculatorData?.householdSize || propHouseholdSize || 2;
  
  // Déterminer la formule pré-sélectionnée selon le nombre de personnes
  const getDefaultPlan = (): PlanType => {
    if (householdSize <= 2) return 'essential';
    if (householdSize <= 4) return 'standard';
    return 'plus';
  };

  const [rhythm, setRhythm] = useState<PaymentRhythm>('annual');
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(getDefaultPlan());
  const [showWelcomePack, setShowWelcomePack] = useState(true);

  // Vérifier si le SKU a la fonction CO₂
  const hasCO2 = selectedSKU && ['spark', 'one', 'sku1', 'sku3'].includes(selectedSKU.toLowerCase());

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2
    }).format(amount);
  };

  const getRhythmLabel = (r: PaymentRhythm) => {
    switch(r) {
      case 'monthly': return '/mois';
      case 'quarterly': return '/trim.';
      case 'annual': return '/an';
    }
  };

  const handlePlanSelect = (plan: PlanType) => {
    setSelectedPlan(plan);
    setShowWelcomePack(true);
    onPlanSelected?.(plan, rhythm);
    
    // Sauvegarder la sélection dans sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('subscriptionData', JSON.stringify({
        plan,
        rhythm,
        selectedSKU,
        yearlySavings,
        householdSize
      }));
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-[#F5E6ED]/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec rappel économies - n'afficher que si données calculées */}
        {yearlySavings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Vous économisez <strong>au minimum {formatPrice(yearlySavings)}/an</strong> avec votre robinet HYDRAL</span>
            </div>
          </motion.div>
        )}

        {/* Titre principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            Transparence <span className="text-[#6B1E3E] font-medium">totale</span> sur nos prix.
          </h2>
          <p className="text-xl text-gray-600">
            Tout est inclus. Aucun frais caché. Résiliable à tout moment.
          </p>
        </motion.div>

        {/* Toggle rythme de paiement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-2 p-2 bg-white border-2 border-[#6B1E3E]/20 rounded-full shadow-lg">
            {(['monthly', 'quarterly', 'annual'] as PaymentRhythm[]).map((r) => (
              <button
                key={r}
                onClick={() => setRhythm(r)}
                className={`px-6 py-3 rounded-full transition-all text-sm font-medium ${
                  rhythm === r
                    ? 'bg-[#6B1E3E] text-white shadow-md'
                    : 'text-gray-600 hover:text-[#6B1E3E]'
                }`}
              >
                {r === 'monthly' && 'Mensuel'}
                {r === 'quarterly' && 'Trimestriel'}
                {r === 'annual' && 'Annuel'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3 cartes de formules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {(['essential', 'standard', 'plus'] as PlanType[]).map((plan, index) => {
            const content = PLANS_CONTENT[plan];
            const price = PRICING[plan][rhythm];
            const isSelected = selectedPlan === plan;
            const isRecommended = plan === getDefaultPlan();

            return (
              <motion.div
                key={plan}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  onClick={() => handlePlanSelect(plan)}
                  className={`h-full p-6 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border border-[#6B1E3E] shadow-lg shadow-[#6B1E3E]/10'
                      : 'bg-white border border-gray-200 hover:border-[#6B1E3E]/30 shadow-sm'
                  }`}
                >
                  {/* En-tête du plan */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{content.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{content.for}</p>
                    
                    <div className="mb-4">
                      <div className="text-4xl font-light text-[#6B1E3E]">
                        {formatPrice(price)}
                      </div>
                      <div className="text-gray-500 text-sm mt-1">
                        {getRhythmLabel(rhythm)}
                      </div>
                      {rhythm !== 'annual' && (
                        <div className="text-gray-400 text-xs mt-1">
                          soit {formatPrice(PRICING[plan].annual)}/an
                        </div>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#6B1E3E]/5 text-[#6B1E3E] text-xs rounded-full">
                      Usage {content.usage.toLowerCase()}
                    </div>
                  </div>

                  {/* Contenu du plan */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{content.filters} filtres/an</span>
                    </div>

                    {hasCO2 && (
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{content.co2} cartouches CO₂</span>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Livraison {content.delivery}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">Rappels automatiques</span>
                    </div>
                  </div>

                  {/* Bouton de sélection */}
                  <button
                    className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                      isSelected
                        ? 'bg-[#6B1E3E] text-white'
                        : 'bg-[#FAF8F5] text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {isSelected ? 'Formule sélectionnée' : 'Choisir cette formule'}
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Pack de bienvenue */}
        <AnimatePresence>
          {showWelcomePack && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Package className="w-6 h-6 text-[#6B1E3E]" />
                    <h3 className="text-2xl font-light text-gray-900">
                      Votre <span className="text-[#6B1E3E] font-medium">pack de bienvenue</span>
                    </h3>
                  </div>
                  <div className="px-3 py-1 bg-[#6B1E3E]/5 text-[#6B1E3E] rounded-full text-xs font-medium">
                    ~{PLANS_CONTENT[selectedPlan].value}€ offerts
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-6">Inclus dès le premier envoi</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {WELCOME_PACKS[selectedPlan].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 p-3 bg-[#FAF8F5] rounded-lg border border-gray-100"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-gray-700 text-sm">{item.item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 pt-4">
                  <Sparkles className="w-4 h-4 text-[#6B1E3E]" />
                  <span>Tous vos accessoires sont personnalisables — couleur et prénom. Vous choisirez à l'étape suivante.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bande de réassurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-12"
        >
          {[
            { icon: RefreshCw, text: 'Résiliable à tout moment, sans frais' },
            { icon: Package, text: 'Livraison incluse dans votre abonnement' },
            { icon: Clock, text: 'Rappel automatique avant chaque envoi' },
            { icon: Shield, text: 'Aucune mauvaise surprise — prix fixe garanti' },
            { icon: Lock, text: 'Paiement sécurisé' }
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <item.icon className="w-6 h-6 text-[#6B1E3E] mb-2" />
              <p className="text-xs text-gray-600">{item.text}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <button 
            onClick={() => {
              // Sauvegarder la sélection dans sessionStorage AVANT de naviguer
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('subscriptionData', JSON.stringify({
                  plan: selectedPlan,
                  rhythm,
                  selectedSKU,
                  yearlySavings,
                  householdSize
                }));
              }
              // Naviguer vers la page de personnalisation
              onPlanSelected?.(selectedPlan, rhythm);
            }}
            className="group px-8 sm:px-12 py-4 sm:py-5 min-h-[48px] bg-gradient-to-r from-[#6B1E3E] to-[#8B2E5E] text-white rounded-full shadow-2xl shadow-[#6B1E3E]/30 hover:shadow-3xl hover:shadow-[#6B1E3E]/40 font-medium text-base sm:text-lg transition-all hover:scale-105"
          >
            Choisir cette formule
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="mt-4 text-sm text-gray-500">Étape suivante : Personnalisation de vos accessoires</p>
        </motion.div>
      </div>
    </div>
  );
}