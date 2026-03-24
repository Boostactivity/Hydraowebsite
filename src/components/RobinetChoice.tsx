import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Droplets, Sparkles, Zap, Check, X } from 'lucide-react';
import { ColorisSelector, ROBINET_COLORIS } from './ColorisSelector';
import { defaultImages } from '../assets/products';

type SKUType = 'pure' | 'spark' | 'one';

interface RobinetChoiceProps {
  yearlySavings?: number;
  onRobinetSelected?: (sku: SKUType) => void;
}

// 3 ROBINETS INDÉPENDANTS (pas de packs pré-configurés)
const ROBINETS = [
  {
    sku: 'pure' as SKUType,
    name: 'Hydral Pure',
    tagline: 'L\'essentiel premium',
    price: 490,
    icon: Droplets,
    gradient: 'from-[#6B1E3E] to-[#8B2E5E]',
    image: defaultImages.faucet,
    
    // Fonctionnalités
    features: [
      { label: 'Eau filtrée', desc: 'Filtrée et purifiée directement au robinet, goût amélioré, chlore éliminé', included: true },
      { label: 'Eau bouillante instantanée', desc: '100°C à la demande, fini la bouilloire', included: true },
      { label: 'Eau gazeuse', desc: '', included: false },
      { label: 'Eau froide réfrigérée', desc: '', included: false }
    ],
    
    idealFor: 'Célibataires, couples, amateurs de thé/café, cuisiniers',
    hasCO2: false // Pas de fonction gazeuse
  },
  {
    sku: 'spark' as SKUType,
    name: 'Hydral Spark',
    tagline: 'Le préféré des familles',
    price: 890,
    icon: Sparkles,
    gradient: 'from-[#6B1E3E] to-[#8B2E5E]',
    image: defaultImages.sparkling,
    popular: true,
    
    // Fonctionnalités
    features: [
      { label: 'Eau filtrée', desc: 'Filtrée et purifiée directement au robinet', included: true },
      { label: 'Eau gazeuse', desc: 'Pétillante à la demande, fin des bouteilles Perrier/Badoit', included: true },
      { label: 'Eau froide réfrigérée', desc: 'Rafraîchissante sans glaçons', included: true },
      { label: 'Eau bouillante instantanée', desc: '', included: false }
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
    gradient: 'from-[#6B1E3E] to-[#8B2E5E]',
    image: defaultImages.boiling,
    recommended: true,
    
    // Fonctionnalités
    features: [
      { label: 'Eau filtrée', desc: 'Filtrée et purifiée directement au robinet', included: true },
      { label: 'Eau bouillante instantanée', desc: '100°C à la demande', included: true },
      { label: 'Eau gazeuse', desc: 'Pétillante à la demande', included: true },
      { label: 'Eau froide réfrigérée', desc: 'Rafraîchissante sans glaçons', included: true }
    ],
    
    idealFor: 'Familles, grands consommateurs, ceux qui veulent tout sans compromis',
    hasCO2: true
  }
];

export default function RobinetChoice({ yearlySavings, onRobinetSelected }: RobinetChoiceProps) {
  const [calculatorData, setCalculatorData] = useState<{
    yearlySavings: number;
    householdSize: number;
  } | null>(null);

  const [selectedSKU, setSelectedSKU] = useState<SKUType>('spark'); // Par défaut le plus populaire

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('calculatorData');
      if (stored) {
        setCalculatorData(JSON.parse(stored));
      }
    }
  }, []);

  const savings = calculatorData?.yearlySavings || yearlySavings || 0;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSelectRobinet = (sku: SKUType) => {
    setSelectedSKU(sku);
    
    const robinet = ROBINETS.find(r => r.sku === sku);
    if (!robinet) return;
    
    // Sauvegarder TOUT le pack dans sessionStorage
    if (typeof window !== 'undefined') {
      const existing = sessionStorage.getItem('calculatorData');
      const data = existing ? JSON.parse(existing) : {};
      sessionStorage.setItem('calculatorData', JSON.stringify({
        ...data,
        selectedSKU: sku,
        paymentRhythm: 'annual' // Par défaut annuel
      }));
    }
    
    // Appeler le callback pour naviguer vers la personnalisation
    onRobinetSelected?.(sku);
  };

  return (
    <div className="bg-gradient-to-b from-white to-[#F5E6ED]/20 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rappel économies */}
        {savings > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm">
              <Check className="w-4 h-4" />
              <span>Vous économisez <strong>au minimum {formatPrice(savings)}/an</strong> avec HYDRAL</span>
            </div>
          </motion.div>
        )}

        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
            Choisissez <span className="text-[#6B1E3E] font-medium">votre modèle</span>
          </h2>
          <p className="text-xl text-gray-600">
            Tous nos robinets sont au même prix. Choisissez selon vos besoins.
          </p>
        </motion.div>

        {/* Grille des robinets */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {ROBINETS.map((robinet, index) => {
            const Icon = robinet.icon;
            const isSelected = selectedSKU === robinet.sku;
            
            return (
              <motion.div
                key={robinet.sku}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`relative bg-white rounded-2xl border-2 p-8 transition-all ${
                  isSelected
                    ? 'border-[#6B1E3E] shadow-2xl shadow-[#6B1E3E]/20 scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                {/* Badge populaire */}
                {robinet.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E5E] text-white text-xs font-medium rounded-full shadow-lg">
                    Le plus choisi
                  </div>
                )}

                {/* Badge recommandé */}
                {robinet.recommended && (
                  <div className="absolute -top-3 right-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E5E] text-white text-xs font-medium rounded-full shadow-lg">
                    Recommandé
                  </div>
                )}

                {/* Image du robinet */}
                {robinet.image && (
                  <div className="mb-6 overflow-hidden rounded-2xl bg-gray-50">
                    <img
                      src={robinet.image}
                      alt={robinet.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Icône */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${robinet.gradient} flex items-center justify-center mb-6 mx-auto`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Nom */}
                <h3 className="text-2xl font-medium text-gray-900 text-center mb-2">
                  {robinet.name}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-6">
                  {robinet.tagline}
                </p>

                {/* Prix */}
                <div className="text-center mb-8">
                  <div className="text-3xl font-light text-[#6B1E3E]">
                    {formatPrice(robinet.price)}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {robinet.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bouton sélection */}
                <button
                  onClick={() => handleSelectRobinet(robinet.sku)}
                  className={`w-full py-4 rounded-xl font-medium transition-all ${
                    isSelected
                      ? 'bg-[#6B1E3E] text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {isSelected ? '✓ Modèle sélectionné' : 'Choisir ce modèle'}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA continuer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => handleSelectRobinet(selectedSKU)}
            className="group px-12 py-5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E5E] text-white rounded-full shadow-2xl shadow-[#6B1E3E]/30 hover:shadow-3xl hover:shadow-[#6B1E3E]/40 font-medium text-lg transition-all hover:scale-105"
          >
            Continuer avec {ROBINETS.find(r => r.sku === selectedSKU)?.name}
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="mt-4 text-sm text-gray-500">Étape suivante : Personnalisation de vos accessoires</p>
        </motion.div>

      </div>
    </div>
  );
}