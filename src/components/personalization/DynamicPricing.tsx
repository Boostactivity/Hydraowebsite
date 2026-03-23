import React from 'react';
import { motion } from 'motion/react';
import { TrendingDown, Sparkles, Users, DollarSign } from 'lucide-react';
import { usePersona } from '../../context/PersonaContext';

interface DynamicPricingProps {
  basePrice?: number;
  baseSavings?: number;
  className?: string;
}

export function DynamicPricing({ 
  basePrice = 490, 
  baseSavings = 600,
  className = '' 
}: DynamicPricingProps) {
  const { personaProfile } = usePersona();

  // Adapter les économies selon le persona
  const savings = personaProfile 
    ? Math.round(baseSavings * personaProfile.savingsMultiplier)
    : baseSavings;

  const monthlyBreakdown = Math.round(savings / 12);
  const paybackMonths = Math.ceil(basePrice / monthlyBreakdown);

  // Message personnalisé selon persona
  const getPersonalizedMessage = () => {
    if (!personaProfile) {
      return "Économies moyennes pour un foyer";
    }

    switch (personaProfile.id) {
      case 'famille-nombreuse':
        return "Pour votre famille, les économies sont maximales";
      case 'ecolo':
        return "Impact financier de votre démarche éco-responsable";
      case 'presse':
        return "Économies en temps et argent pour vous";
      case 'foodie':
        return "Investissement rentable pour la qualité";
      default:
        return "Vos économies personnalisées";
    }
  };

  const getHighlightText = () => {
    if (!personaProfile) return null;

    switch (personaProfile.id) {
      case 'famille-nombreuse':
        return "Famille nombreuse = économies maximales";
      case 'ecolo':
        return "Bon pour la planète ET le portefeuille";
      case 'presse':
        return "Temps = argent : double gain";
      case 'foodie':
        return "Qualité restaurant à prix mini";
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      <div className="bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] rounded-3xl p-8 text-white shadow-2xl">
        {/* Highlight text si persona détecté */}
        {personaProfile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 mb-6 bg-white/20 rounded-full px-4 py-2 w-fit"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              {getHighlightText()}
            </span>
          </motion.div>
        )}

        {/* Main savings */}
        <div className="mb-6">
          <p className="text-white/80 text-sm mb-2">
            {getPersonalizedMessage()}
          </p>
          <div className="flex items-end gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-6xl font-bold"
            >
              {savings}€
            </motion.div>
            <div className="text-2xl mb-2 text-white/80">/an</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
              <TrendingDown className="w-4 h-4" />
              <span>Par mois</span>
            </div>
            <div className="text-2xl font-semibold">
              {monthlyBreakdown}€
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Rentabilisé en</span>
            </div>
            <div className="text-2xl font-semibold">
              {paybackMonths} mois
            </div>
          </div>
        </div>

        {/* Persona-specific benefits */}
        {personaProfile && (
          <div className="space-y-2 pt-4 border-t border-white/20">
            {getPersonaBenefits(personaProfile.id).map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span className="text-white/90">{benefit}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function getPersonaBenefits(personaId: string): string[] {
  switch (personaId) {
    case 'famille-nombreuse':
      return [
        "Plus de membres = plus d'économies",
        "Fini les packs d'eau à porter",
        "Eau saine pour toute la famille"
      ];
    case 'ecolo':
      return [
        "2000 bouteilles plastique évitées/an",
        "85% de CO2 en moins",
        "Objectif zéro déchet atteint"
      ];
    case 'presse':
      return [
        "Plus de courses pour l'eau",
        "Café en 3 secondes",
        "15h/an récupérées"
      ];
    case 'foodie':
      return [
        "Eau pure 99.9% pour vos recettes",
        "Thé et café sublimés",
        "Qualité restaurant à domicile"
      ];
    default:
      return [];
  }
}

// Variante inline pour affichage dans texte
export function InlineSavings({ className = '' }: { className?: string }) {
  const { personaProfile } = usePersona();
  
  const baseSavings = 600;
  const savings = personaProfile 
    ? Math.round(baseSavings * personaProfile.savingsMultiplier)
    : baseSavings;

  return (
    <span className={`font-bold text-[#6B1E3E] ${className}`}>
      {savings}€/an
    </span>
  );
}

// Prix personnalisé pour le configurateur
export function PersonalizedPrice({ basePrice = 490 }: { basePrice?: number }) {
  const { personaProfile } = usePersona();

  // Pour les familles nombreuses, suggérer pack famille
  const suggestedPrice = personaProfile?.id === 'famille-nombreuse' 
    ? basePrice + 89 // Pack famille avec filtres
    : basePrice;

  const showFamilyPack = personaProfile?.id === 'famille-nombreuse';

  return (
    <div>
      <div className="text-4xl font-bold text-gray-900">
        {suggestedPrice}€
        <span className="text-lg font-normal text-gray-600"> TTC</span>
      </div>
      
      {showFamilyPack && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-[#6B1E3E] mt-2 flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          Pack famille recommandé (filtres longue durée inclus)
        </motion.p>
      )}
    </div>
  );
}
