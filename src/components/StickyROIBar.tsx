import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, X, ArrowRight } from 'lucide-react';
import { Page } from '../App';

interface StickyROIBarProps {
  navigate: (page: Page) => void;
}

export function StickyROIBar({ navigate }: StickyROIBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher la barre après 800px de scroll
      if (window.scrollY > 800 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 800) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#6B1E3E] via-[#8B2E4E] to-[#6B1E3E] text-white shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3 gap-4">
              {/* Message principal */}
              <div className="flex items-center gap-4 flex-1">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm"
                >
                  <TrendingDown className="w-5 h-5" />
                </motion.div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="font-medium text-sm sm:text-base">
                    💰 Rentabilisé en 6 mois
                  </span>
                  <span className="hidden md:inline text-white/80 text-sm">
                    • 490€ TTC • Technologie premium accessible
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.button
                  onClick={() => navigate('savings')}
                  className="px-4 sm:px-6 py-2 bg-white text-[#6B1E3E] rounded-full font-medium text-sm hover:bg-[#FAF8F5] transition-colors shadow-lg flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Calculer mes économies
                  <ArrowRight className="w-4 h-4 hidden sm:inline" />
                </motion.button>

                <button
                  onClick={handleDismiss}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Barre de progression subtile */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className="h-1 bg-gradient-to-r from-[#D4AF37] to-white/40"
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
