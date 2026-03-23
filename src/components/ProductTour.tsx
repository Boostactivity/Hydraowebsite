import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Flame, Droplet, Sparkles, Thermometer, Check } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  icon: any;
  features: string[];
  benefit: string;
  color: string;
  bgGradient: string;
}

interface ProductTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductTour({ isOpen, onClose }: ProductTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TourStep[] = [
    {
      title: 'Eau bouillante instantanée',
      description: 'Appuyez, c\'est prêt. Plus besoin d\'attendre.',
      icon: Flame,
      features: [
        '100°C en 3 secondes',
        'Pas de bouilloire',
        '15 utilisations par jour en moyenne',
        '50% d\'énergie économisée'
      ],
      benefit: 'Économisez 2 minutes à chaque fois',
      color: 'text-orange-600',
      bgGradient: 'from-orange-50 to-red-50'
    },
    {
      title: 'Eau filtrée ultra-pure',
      description: 'Filtration professionnelle 5 étapes. Comme en bouteille, sans les microplastiques.',
      icon: Droplet,
      features: [
        'Élimine chlore, calcaire, métaux lourds',
        'Température parfaite à 4°C',
        '2 400 bouteilles évitées par an',
        '0 microplastique vs 240 000/bouteille'
      ],
      benefit: 'Une eau vraiment pure, disponible 24/7',
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Eau pétillante à volonté',
      description: 'Fraîche et gazeuse en un geste. Finies les courses.',
      icon: Sparkles,
      features: [
        'Pétillant instantané',
        'Économisez au minimum 840€/an',
        'Plus de stockage',
        'Cartouches CO₂ incluses dans l\'abonnement'
      ],
      benefit: 'Votre eau gazeuse préférée, toujours disponible',
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Eau chaude réglable',
      description: 'La température parfaite pour chaque usage.',
      icon: Thermometer,
      features: [
        'Réglable 40-60°C',
        'Idéal vaisselle, biberon, rinçage',
        'Instantané dès l\'ouverture',
        'Sécurité enfant intégrée'
      ],
      benefit: 'Plus de réglage, juste la bonne température',
      color: 'text-amber-600',
      bgGradient: 'from-amber-50 to-orange-50'
    }
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
              <motion.div
                className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#D4AF37]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className={`bg-gradient-to-br ${currentStepData.bgGradient} p-8 md:p-12`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-lg mb-6"
                  >
                    <Icon className={`w-10 h-10 ${currentStepData.color}`} />
                  </motion.div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
                    {currentStepData.title}
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-gray-700 mb-8">
                    {currentStepData.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {currentStepData.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="flex items-start gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm"
                      >
                        <Check className={`w-5 h-5 ${currentStepData.color} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Benefit */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/90 backdrop-blur-sm border-2 border-[#6B1E3E]/20 p-6 rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#6B1E3E] rounded-full" />
                      <span className="text-lg font-medium text-[#6B1E3E]">
                        {currentStepData.benefit}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="bg-white border-t border-gray-200 p-6">
              <div className="flex items-center justify-between">
                {/* Step indicator */}
                <div className="flex items-center gap-2">
                  {steps.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentStep 
                          ? 'bg-[#6B1E3E] w-8' 
                          : idx < currentStep
                          ? 'bg-[#6B1E3E]/40'
                          : 'bg-gray-300'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      currentStep === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
                    whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    onClick={handleNext}
                    className="px-6 py-2 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium hover:shadow-lg transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="text-center mt-4 text-sm text-gray-500">
                Étape {currentStep + 1} sur {steps.length}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
