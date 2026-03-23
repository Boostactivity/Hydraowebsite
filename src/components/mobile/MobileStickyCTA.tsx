import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ChevronRight, Sparkles, X } from 'lucide-react';
import { Page } from '../../App';

interface MobileStickyCTAProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  variant?: 'savings' | 'configurator' | 'contact';
  className?: string;
}

export function MobileStickyCTA({ 
  currentPage, 
  navigate, 
  variant = 'savings',
  className = '' 
}: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Détecter le scroll pour afficher le CTA
  useEffect(() => {
    // Ne pas afficher sur certaines pages
    const excludedPages: Page[] = ['configurator', 'checkout', 'cart'];
    if (excludedPages.includes(currentPage) || isDismissed) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // Afficher après 300px de scroll
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, isDismissed]);

  // Reset dismissed state when page changes
  useEffect(() => {
    setIsDismissed(false);
  }, [currentPage]);

  const getVariantConfig = () => {
    switch (variant) {
      case 'savings':
        return {
          text: 'Calculer mes économies',
          subtext: 'Gratuit · 2 min',
          icon: Calculator,
          gradient: 'from-[#6B1E3E] to-[#8B2E4E]',
          action: () => {
            navigate('savings');
            // Scroll vers le calculateur
            setTimeout(() => {
              const calc = document.getElementById('savings-calculator');
              if (calc) {
                calc.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 100);
          }
        };
      case 'configurator':
        return {
          text: 'Choisir mon HYDRAO',
          subtext: '3 min · Gratuit',
          icon: Sparkles,
          gradient: 'from-[#6B1E3E] to-[#8B2E4E]',
          action: () => navigate('configurator')
        };
      case 'contact':
        return {
          text: 'Être rappelé',
          subtext: 'Gratuit · Sous 2h',
          icon: ChevronRight,
          gradient: 'from-blue-600 to-cyan-600',
          action: () => {
            // Ouvrir formulaire contact
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
              contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        };
      default:
        return getVariantConfig();
    }
  };

  const config = getVariantConfig();
  const Icon = config.icon;

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`md:hidden fixed bottom-0 left-0 right-0 z-50 ${className}`}
        >
          {/* Safe area padding for iOS */}
          <div className="bg-white/95 backdrop-blur-xl border-t-2 border-gray-200 shadow-2xl pb-safe">
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Main CTA Button */}
                <motion.button
                  onClick={config.action}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 px-6 py-4 bg-gradient-to-r ${config.gradient} text-white rounded-2xl font-medium shadow-lg active:shadow-xl transition-all flex items-center justify-between`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-base">{config.text}</div>
                      <div className="text-xs text-white/80">{config.subtext}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>

                {/* Dismiss button */}
                <button
                  onClick={handleDismiss}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-600">
                <span>✓ Sans engagement</span>
                <span>•</span>
                <span>✓ Données sécurisées</span>
              </div>
            </div>
          </div>

          {/* Pulsing indicator */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-r ${config.gradient} rounded-full blur-sm`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}