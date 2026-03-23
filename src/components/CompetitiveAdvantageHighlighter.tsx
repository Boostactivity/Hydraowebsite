import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, Heart, Leaf, Zap, Shield, X, DollarSign } from 'lucide-react';
import { Page } from '../App';

interface CompetitiveAdvantageHighlighterProps {
  currentPage: Page;
}

type Advantage = {
  id: string;
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
};

export function CompetitiveAdvantageHighlighter({ currentPage }: CompetitiveAdvantageHighlighterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Mapping page → avantage clé
  const advantagesByPage: Record<string, Advantage> = {
    'home': {
      id: 'price',
      icon: DollarSign,
      title: 'Prix révolutionnaire',
      value: '490€',
      description: 'Premium accessible là où le marché affiche 1500-3000€',
      color: 'text-[#6B1E3E]',
      bgColor: 'from-[#6B1E3E]/10 to-[#8B2E4E]/10',
      borderColor: 'border-[#6B1E3E]/30'
    },
    'prix-transparent': {
      id: 'savings',
      icon: TrendingDown,
      title: 'Économies garanties',
      value: '40%',
      description: 'moins cher que Quooker pour les mêmes fonctions',
      color: 'text-[#6B1E3E]',
      bgColor: 'from-[#6B1E3E]/10 to-[#8B2E4E]/10',
      borderColor: 'border-[#6B1E3E]/30'
    },
    'savings': {
      id: 'roi',
      icon: Zap,
      title: 'ROI ultra-rapide',
      value: '6 mois',
      description: 'pour rentabiliser votre investissement',
      color: 'text-[#6B1E3E]',
      bgColor: 'from-[#6B1E3E]/10 to-[#8B2E4E]/10',
      borderColor: 'border-[#6B1E3E]/30'
    },
    'securite': {
      id: 'health',
      icon: Heart,
      title: 'Santé préservée',
      value: '240 000',
      description: 'microplastiques évités par bouteille',
      color: 'text-[#6B1E3E]',
      bgColor: 'from-[#6B1E3E]/10 to-[#8B2E4E]/10',
      borderColor: 'border-[#6B1E3E]/30'
    },
    'ecoresponsable': {
      id: 'ecology',
      icon: Leaf,
      title: 'Impact positif',
      value: '2 400',
      description: 'bouteilles plastique évitées par an',
      color: 'text-[#D4AF37]',
      bgColor: 'from-[#D4AF37]/10 to-[#B8941F]/10',
      borderColor: 'border-[#D4AF37]/30'
    },
    'concept': {
      id: 'innovation',
      icon: Zap,
      title: 'Technologie 5-en-1',
      value: '5 eaux',
      description: 'en un seul robinet premium',
      color: 'text-[#6B1E3E]',
      bgColor: 'from-[#6B1E3E]/10 to-[#8B2E4E]/10',
      borderColor: 'border-[#6B1E3E]/30'
    },
    'testimonials': {
      id: 'satisfaction',
      icon: Shield,
      title: 'Satisfaction client',
      value: '4.9/5',
      description: 'Note moyenne sur +2347 installations',
      color: 'text-[#D4AF37]',
      bgColor: 'from-[#D4AF37]/10 to-[#B8941F]/10',
      borderColor: 'border-[#D4AF37]/30'
    },
    'configurator': {
      id: 'guarantee',
      icon: Shield,
      title: 'Garantie totale',
      value: '5 ans',
      description: 'pièces et main d\'œuvre',
      color: 'text-[#6B1E3E]',
      bgColor: 'from-[#6B1E3E]/10 to-[#8B2E4E]/10',
      borderColor: 'border-[#6B1E3E]/30'
    }
  };

  // Avantage par défaut
  const defaultAdvantage: Advantage = {
    id: 'default',
    icon: TrendingDown,
    title: 'Prix imbattable',
    value: '490€',
    description: '40% moins cher que la concurrence',
    color: 'text-[#6B1E3E]',
    bgColor: 'from-[#6B1E3E]/10 to-[#8B2E4E]/10',
    borderColor: 'border-[#6B1E3E]/30'
  };

  const advantage = advantagesByPage[currentPage] || defaultAdvantage;
  const Icon = advantage.icon;

  // Afficher après 3 secondes de scroll
  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      if (window.scrollY > 800 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, isDismissed]);

  // Auto-hide après 10 secondes
  useEffect(() => {
    if (isVisible && !isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-8 right-8 z-50 max-w-sm"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className={`relative bg-gradient-to-br ${advantage.bgColor} backdrop-blur-xl border-2 ${advantage.borderColor} rounded-2xl p-6 shadow-2xl`}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-4">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className={`w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg`}
              >
                <Icon className={`w-7 h-7 ${advantage.color}`} />
              </motion.div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-xs uppercase tracking-wider text-gray-600 mb-1">
                    {advantage.title}
                  </div>
                  <div className={`text-3xl mb-1 ${advantage.color}`}>
                    {advantage.value}
                  </div>
                  <div className="text-sm text-gray-700">
                    {advantage.description}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Pulse animation sur le bord */}
            <motion.div
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className={`absolute inset-0 rounded-2xl border-2 ${advantage.borderColor} pointer-events-none`}
            />

            {/* Badge "Avantage clé" */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="absolute -top-3 -left-3 px-3 py-1 bg-[#6B1E3E] text-white text-xs rounded-full shadow-lg"
            >
              Avantage clé
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}