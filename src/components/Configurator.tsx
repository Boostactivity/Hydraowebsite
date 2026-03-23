import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

interface ConfiguratorProps {
  onClose: () => void;
}

interface Configuration {
  type: string;
  style: string;
  finish: string;
  reservoir: string;
  extras: string[];
}

export function Configurator({ onClose }: ConfiguratorProps) {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<Configuration>({
    type: '',
    style: '',
    finish: '',
    reservoir: '',
    extras: []
  });

  const totalSteps = 5;

  const faucetTypes = [
    { id: 'boiling', name: 'Bouillant', description: 'Eau bouillante instantanée', price: 1299 },
    { id: 'filtered', name: 'Filtrant', description: 'Eau filtrée pure', price: 899 },
    { id: 'chilled', name: 'Réfrigérant', description: 'Eau fraîche et pétillante', price: 1499 },
    { id: 'combi', name: 'COMBI+', description: 'Solution tout-en-un', price: 1899 }
  ];

  const faucetStyles = [
    { id: 'flex', name: 'FLEX', description: 'Bec extractible flexible', image: 'https://images.unsplash.com/photo-1646592491489-ebdf758b9d11?w=400' },
    { id: 'square', name: 'SQUARE', description: 'Design carré moderne', image: 'https://images.unsplash.com/photo-1761353854551-361b1c804849?w=400' },
    { id: 'fusion', name: 'FUSION', description: 'Lignes épurées', image: 'https://images.unsplash.com/photo-1646592491489-ebdf758b9d11?w=400' },
    { id: 'classic', name: 'CLASSIC', description: 'Style intemporel', image: 'https://images.unsplash.com/photo-1761353854551-361b1c804849?w=400' }
  ];

  const finishes = [
    { id: 'chrome', name: 'Chrome Brillant', color: 'bg-gradient-to-br from-gray-300 to-gray-400' },
    { id: 'black', name: 'Noir Mat', color: 'bg-gradient-to-br from-gray-800 to-black' },
    { id: 'brushed', name: 'Acier Brossé', color: 'bg-gradient-to-br from-gray-400 to-gray-500' },
    { id: 'gold', name: 'Or Brossé', color: 'bg-gradient-to-br from-[#D4AF37] to-[#C59B2A]' },
    { id: 'copper', name: 'Cuivre', color: 'bg-gradient-to-br from-orange-400 to-orange-600' },
    { id: 'white', name: 'Blanc Mat', color: 'bg-gradient-to-br from-gray-50 to-gray-200' }
  ];

  const reservoirs = [
    { id: 'combi', name: 'COMBI', capacity: '3L', description: 'Compact et efficace', price: 0 },
    { id: 'combi-plus', name: 'COMBI+', capacity: '7L', description: 'Usage intensif', price: 200 },
    { id: 'cube', name: 'CUBE', capacity: '3L + froid', description: 'Bouillant + réfrigéré', price: 400 }
  ];

  const extrasOptions = [
    { id: 'led', name: 'Éclairage LED', description: 'Indicateur de température', price: 89 },
    { id: 'childlock', name: 'Sécurité enfants', description: 'Double appui sécurisé', price: 49 },
    { id: 'sparkling', name: 'Eau pétillante', description: 'Module CO2 intégré', price: 299 },
    { id: 'filter', name: 'Filtres premium', description: 'Pack 1 an inclus', price: 99 }
  ];

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleExtra = (extraId: string) => {
    setConfig(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }));
  };

  const calculateTotal = () => {
    let total = 0;
    const type = faucetTypes.find(t => t.id === config.type);
    if (type) total += type.price;

    const reservoir = reservoirs.find(r => r.id === config.reservoir);
    if (reservoir) total += reservoir.price;

    config.extras.forEach(extraId => {
      const extra = extrasOptions.find(e => e.id === extraId);
      if (extra) total += extra.price;
    });

    return total;
  };

  const stepTitles = [
    'Type de système',
    'Style de robinet',
    'Finition',
    'Module sous évier',
    'Options & extras'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl max-w-5xl w-full my-8 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-gray-200 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-gray-900 font-light">Configurateur</h2>
                <p className="text-sm text-gray-500 font-light mt-1">
                  Étape {step} sur {totalSteps} · {stepTitles[step - 1]}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Progress */}
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i + 1 <= step ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8 min-h-[500px]">
            <AnimatePresence mode="wait">
              {/* Step 1: Type */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {faucetTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setConfig({ ...config, type: type.id })}
                      className={`text-left p-6 rounded-2xl border-2 transition-all ${
                        config.type === type.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-xl text-gray-900">{type.name}</h4>
                        <span className="text-gray-900 font-light">{type.price}€</span>
                      </div>
                      <p className="text-gray-600 font-light">{type.description}</p>
                      {config.type === type.id && (
                        <div className="mt-4 flex items-center gap-2 text-gray-900">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Sélectionné</span>
                        </div>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Step 2: Style */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                  {faucetStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setConfig({ ...config, style: style.id })}
                      className={`group relative text-center rounded-2xl overflow-hidden border-2 transition-all ${
                        config.style === style.id
                          ? 'border-gray-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="aspect-[3/4] bg-gray-100">
                        <ImageWithFallback
                          src={style.image}
                          alt={style.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {config.style === style.id && (
                        <div className="absolute top-3 right-3 bg-gray-900 text-white p-1.5 rounded-full">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      <div className="p-4">
                        <p className="font-medium text-gray-900 mb-1">{style.name}</p>
                        <p className="text-xs text-gray-600 font-light">{style.description}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Step 3: Finish */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-3 md:grid-cols-6 gap-4"
                >
                  {finishes.map((finish) => (
                    <button
                      key={finish.id}
                      onClick={() => setConfig({ ...config, finish: finish.id })}
                      className="text-center group"
                    >
                      <div className={`aspect-square rounded-2xl mb-3 ${finish.color} ${
                        config.finish === finish.id ? 'ring-4 ring-gray-900 ring-offset-4' : 'ring-2 ring-gray-200'
                      }`} />
                      <p className={`text-sm font-light ${config.finish === finish.id ? 'text-gray-900' : 'text-gray-600'}`}>
                        {finish.name}
                      </p>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Step 4: Reservoir */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {reservoirs.map((reservoir) => (
                    <button
                      key={reservoir.id}
                      onClick={() => setConfig({ ...config, reservoir: reservoir.id })}
                      className={`text-left p-6 rounded-2xl border-2 transition-all ${
                        config.reservoir === reservoir.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="text-xl mb-2 text-gray-900">{reservoir.name}</h4>
                      <p className="text-gray-900 mb-3 font-light">{reservoir.capacity}</p>
                      <p className="text-gray-600 text-sm font-light mb-3">{reservoir.description}</p>
                      {reservoir.price > 0 && (
                        <p className="text-gray-900 text-sm">+{reservoir.price}€</p>
                      )}
                      {config.reservoir === reservoir.id && (
                        <div className="mt-4 flex items-center gap-2 text-gray-900">
                          <Check className="w-4 h-4" />
                          <span className="text-sm">Sélectionné</span>
                        </div>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Step 5: Extras */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {extrasOptions.map((extra) => (
                    <button
                      key={extra.id}
                      onClick={() => toggleExtra(extra.id)}
                      className={`text-left p-6 rounded-2xl border-2 transition-all ${
                        config.extras.includes(extra.id)
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg text-gray-900">{extra.name}</h4>
                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          config.extras.includes(extra.id)
                            ? 'bg-gray-900 border-gray-900'
                            : 'border-gray-300'
                        }`}>
                          {config.extras.includes(extra.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 font-light mb-2">{extra.description}</p>
                      <p className="text-gray-900">+{extra.price}€</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 sm:p-8 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600 font-light mb-1">Prix total</p>
                <p className="text-3xl text-gray-900 font-light">
                  {calculateTotal().toLocaleString()}€
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className="px-6 py-3 border border-gray-300 rounded-full hover:border-gray-900 hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Précédent</span>
              </button>

              {step < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !config.type) ||
                    (step === 2 && !config.style) ||
                    (step === 3 && !config.finish) ||
                    (step === 4 && !config.reservoir)
                  }
                  className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>Suivant</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Demander un devis</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
