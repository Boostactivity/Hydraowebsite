import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export function ProgressIndicator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const steps: Step[] = [
    {
      id: 'discover',
      title: 'Découvrir',
      description: 'Comprendre HYDRAO',
      icon: '👀'
    },
    {
      id: 'calculate',
      title: 'Calculer',
      description: 'Vos économies',
      icon: '💰'
    },
    {
      id: 'configure',
      title: 'Configurer',
      description: 'Votre robinet',
      icon: '🎨'
    },
    {
      id: 'order',
      title: 'Commander',
      description: 'En 2 clics',
      icon: '✅'
    }
  ];

  // Détection du scroll pour mettre à jour l'étape
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      // Afficher après 10% de scroll
      setIsVisible(scrollPercent > 10);
      
      // Calculer l'étape en fonction du scroll
      if (scrollPercent < 25) setCurrentStep(0);
      else if (scrollPercent < 50) setCurrentStep(1);
      else if (scrollPercent < 75) setCurrentStep(2);
      else setCurrentStep(3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 hidden lg:block"
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 px-8 py-4">
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  {/* Step */}
                  <motion.div
                    className="relative"
                    initial={false}
                    animate={{
                      scale: currentStep === index ? 1.1 : 1
                    }}
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                        index <= currentStep
                          ? 'bg-[#6B1E3E]/10'
                          : 'bg-gray-50'
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          index < currentStep
                            ? 'bg-[#6B1E3E] text-white'
                            : index === currentStep
                            ? 'bg-[#6B1E3E] text-white scale-110'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {index < currentStep ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="text-xl">{step.icon}</span>
                        )}
                      </div>

                      {/* Text */}
                      <div className="text-left">
                        <div
                          className={`text-sm font-medium transition-colors ${
                            index <= currentStep ? 'text-[#6B1E3E]' : 'text-gray-400'
                          }`}
                        >
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-500">{step.description}</div>
                      </div>
                    </div>

                    {/* Active pulse */}
                    {index === currentStep && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-[#6B1E3E]/20"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className="relative mx-2">
                      <div className="w-12 h-0.5 bg-gray-200" />
                      <motion.div
                        className="absolute top-0 left-0 h-0.5 bg-[#6B1E3E]"
                        initial={{ width: 0 }}
                        animate={{
                          width: index < currentStep ? '100%' : index === currentStep ? '50%' : '0%'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E]"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Text */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center"
            >
              <p className="text-xs text-gray-600">
                Étape {currentStep + 1} sur {steps.length} • {Math.round(((currentStep + 1) / steps.length) * 100)}% complété
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
