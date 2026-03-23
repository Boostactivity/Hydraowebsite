import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, Calculator, Settings, ShoppingCart, Sparkles } from 'lucide-react';
import { Page } from '../../App';

interface Step {
  id: string;
  label: string;
  shortLabel: string;
  icon: any;
  page: Page;
  description: string;
}

interface StickyProgressBarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  className?: string;
}

export function StickyProgressBar({ currentPage, navigate, className = '' }: StickyProgressBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const steps: Step[] = [
    {
      id: 'discovery',
      label: 'Découverte',
      shortLabel: 'Intro',
      icon: Sparkles,
      page: 'home',
      description: 'Comprendre HYDRAO'
    },
    {
      id: 'roi',
      label: 'Calcul ROI',
      shortLabel: 'ROI',
      icon: Calculator,
      page: 'savings',
      description: 'Mes économies'
    },
    {
      id: 'configuration',
      label: 'Configuration',
      shortLabel: 'Config',
      icon: Settings,
      page: 'configurator',
      description: 'Personnaliser'
    },
    {
      id: 'checkout',
      label: 'Panier',
      shortLabel: 'Panier',
      icon: ShoppingCart,
      page: 'configurator',
      description: 'Finaliser'
    }
  ];

  // Détecter le scroll pour afficher la barre
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trouver l'index de l'étape actuelle
  const getCurrentStepIndex = () => {
    const index = steps.findIndex(step => step.page === currentPage);
    return index !== -1 ? index : 0;
  };

  const currentStepIndex = getCurrentStepIndex();
  const currentStep = steps[currentStepIndex];
  const nextStep = steps[currentStepIndex + 1];
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b-2 border-gray-200 shadow-lg ${className}`}
        >
          <div className="section-container max-w-7xl mx-auto">
            {/* Mobile Version - Compact */}
            <div className="md:hidden py-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {React.createElement(currentStep.icon, {
                    className: 'w-5 h-5 text-[#6B1E3E]'
                  })}
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {currentStep.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      Étape {currentStepIndex + 1}/{steps.length}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>

              {/* Progress bar mobile */}
              <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E]"
                />
              </div>

              {/* Expanded mobile view */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4"
                  >
                    <div className="space-y-2">
                      {steps.map((step, idx) => {
                        const Icon = step.icon;
                        const isCompleted = idx < currentStepIndex;
                        const isCurrent = idx === currentStepIndex;

                        return (
                          <button
                            key={step.id}
                            onClick={() => navigate(step.page)}
                            disabled={idx > currentStepIndex}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                              isCurrent
                                ? 'bg-[#6B1E3E]/10 border-2 border-[#6B1E3E]'
                                : isCompleted
                                ? 'bg-green-50 border border-green-200 hover:bg-green-100'
                                : 'bg-gray-50 border border-gray-200 opacity-60'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCompleted
                                ? 'bg-green-500 text-white'
                                : isCurrent
                                ? 'bg-[#6B1E3E] text-white'
                                : 'bg-gray-300 text-gray-500'
                            }`}>
                              {isCompleted ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <Icon className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1 text-left">
                              <div className={`text-sm font-medium ${
                                isCurrent ? 'text-[#6B1E3E]' : 'text-gray-900'
                              }`}>
                                {step.label}
                              </div>
                              <div className="text-xs text-gray-500">{step.description}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Version - Full */}
            <div className="hidden md:flex items-center justify-between py-4">
              {/* Steps */}
              <div className="flex items-center gap-2 flex-1">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <React.Fragment key={step.id}>
                      <button
                        onClick={() => navigate(step.page)}
                        disabled={idx > currentStepIndex}
                        className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isCurrent
                            ? 'bg-[#6B1E3E]/10 border-2 border-[#6B1E3E]'
                            : isCompleted
                            ? 'bg-green-50 border border-green-200 hover:bg-green-100 hover:scale-105'
                            : 'bg-gray-50 border border-gray-200 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isCurrent
                            ? 'bg-[#6B1E3E] text-white'
                            : 'bg-gray-300 text-gray-500'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>

                        <div className="text-left">
                          <div className={`text-sm font-medium ${
                            isCurrent ? 'text-[#6B1E3E]' : isCompleted ? 'text-green-700' : 'text-gray-500'
                          }`}>
                            {step.label}
                          </div>
                          <div className="text-xs text-gray-500">{step.description}</div>
                        </div>

                        {/* Tooltip on hover for completed steps */}
                        {isCompleted && (
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Revenir à cette étape
                          </div>
                        )}
                      </button>

                      {/* Connector line */}
                      {idx < steps.length - 1 && (
                        <div className="flex-1 h-0.5 bg-gray-200 mx-2 relative overflow-hidden">
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: idx < currentStepIndex ? '100%' : '0%' }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-y-0 left-0 bg-green-500"
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Next step CTA */}
              {nextStep && (
                <motion.button
                  onClick={() => navigate(nextStep.page)}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-6 px-6 py-3 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap"
                >
                  Étape suivante : {nextStep.shortLabel}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              )}

              {/* If last step, show completion CTA */}
              {!nextStep && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="ml-6 px-6 py-3 bg-green-500 text-white rounded-full font-medium text-sm shadow-lg flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Parcours terminé
                </motion.div>
              )}
            </div>
          </div>

          {/* Overall progress bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#6B1E3E] via-[#8B2E4E] to-green-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
