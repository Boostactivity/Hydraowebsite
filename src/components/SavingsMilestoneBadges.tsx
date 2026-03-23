import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Zap, Target, Award, Crown, Sparkles, TrendingUp } from 'lucide-react';

interface Milestone {
  id: number;
  amount: number;
  title: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface SavingsMilestoneBadgesProps {
  currentSavings?: number;
  className?: string;
}

export function SavingsMilestoneBadges({ 
  currentSavings = 0,
  className = '' 
}: SavingsMilestoneBadgesProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  const milestones: Milestone[] = [
    {
      id: 1,
      amount: 100,
      title: 'Premier Pas',
      description: '100€ économisés ! Vous avez commencé votre voyage vers l\'indépendance hydrique.',
      icon: Star,
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-cyan-500',
      rarity: 'common'
    },
    {
      id: 2,
      amount: 250,
      title: 'Éco-Conscient',
      description: '250€ économisés ! Vous avez déjà évité 600 bouteilles plastique.',
      icon: Sparkles,
      color: 'text-green-600',
      gradient: 'from-green-500 to-emerald-500',
      rarity: 'common'
    },
    {
      id: 3,
      amount: 500,
      title: 'Rentabilisé',
      description: '500€ économisés ! HYDRAO est maintenant rentabilisé. Tout est profit !',
      icon: Target,
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-amber-500',
      rarity: 'rare'
    },
    {
      id: 4,
      amount: 1000,
      title: 'Maître Économe',
      description: '1 000€ économisés ! Vous avez évité 2 400 bouteilles et 156 kg de CO₂.',
      icon: Trophy,
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-pink-500',
      rarity: 'epic'
    },
    {
      id: 5,
      amount: 2000,
      title: 'Champion Écolo',
      description: '2 000€ économisés ! Impact environnemental énorme : 4 800 bouteilles évitées.',
      icon: Award,
      color: 'text-[#6B1E3E]',
      gradient: 'from-[#6B1E3E] to-[#8B2E4E]',
      rarity: 'epic'
    },
    {
      id: 6,
      amount: 5000,
      title: 'Légende HYDRAO',
      description: '5 000€ économisés ! Vous êtes dans le top 1% des utilisateurs HYDRAO.',
      icon: Crown,
      color: 'text-[#D4AF37]',
      gradient: 'from-[#D4AF37] to-[#FFD700]',
      rarity: 'legendary'
    },
  ];

  const unlockedMilestones = milestones.filter(m => currentSavings >= m.amount);
  const nextMilestone = milestones.find(m => currentSavings < m.amount);
  const progressToNext = nextMilestone 
    ? ((currentSavings / nextMilestone.amount) * 100)
    : 100;

  const getRarityBadge = (rarity: string) => {
    const styles = {
      common: 'bg-gray-100 text-gray-700',
      rare: 'bg-blue-100 text-blue-700',
      epic: 'bg-purple-100 text-purple-700',
      legendary: 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-white'
    };
    return styles[rarity as keyof typeof styles];
  };

  return (
    <div className={`bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-10 ${className}`}>
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full mb-6"
        >
          <Trophy className="w-5 h-5" />
          <span className="text-sm uppercase tracking-wider font-medium">Vos Succès</span>
        </motion.div>

        <h2 className="mb-4 text-gray-900">
          Débloquez des badges
          <span className="block text-[#6B1E3E]">au fur et à mesure</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Chaque euro économisé vous rapproche du prochain palier
        </p>
      </div>

      {/* Progression actuelle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-[#6B1E3E]/5 to-[#D4AF37]/5 rounded-2xl p-6 mb-10"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">Économies actuelles</div>
            <div className="text-3xl font-light text-[#6B1E3E]">
              {currentSavings.toLocaleString()}€
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Badges débloqués</div>
            <div className="text-3xl font-light text-[#6B1E3E]">
              {unlockedMilestones.length}/{milestones.length}
            </div>
          </div>
        </div>

        {nextMilestone && (
          <div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Prochain palier : {nextMilestone.title}</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E]"
              />
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Plus que {(nextMilestone.amount - currentSavings).toLocaleString()}€ pour débloquer !
            </div>
          </div>
        )}
      </motion.div>

      {/* Grille de badges */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {milestones.map((milestone, idx) => {
          const isUnlocked = currentSavings >= milestone.amount;
          const Icon = milestone.icon;

          return (
            <motion.button
              key={milestone.id}
              onClick={() => setSelectedMilestone(milestone)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-6 rounded-2xl border-2 transition-all text-center ${
                isUnlocked
                  ? 'bg-white border-gray-300 hover:border-[#6B1E3E]/50 shadow-lg cursor-pointer'
                  : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Badge rareté */}
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getRarityBadge(milestone.rarity)}`}>
                {milestone.rarity}
              </div>

              {/* Icône */}
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${milestone.gradient} flex items-center justify-center ${
                !isUnlocked && 'grayscale opacity-40'
              }`}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Titre */}
              <h3 className={`text-lg font-medium mb-2 ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                {milestone.title}
              </h3>

              {/* Montant */}
              <div className={`text-2xl font-light mb-2 ${isUnlocked ? milestone.color : 'text-gray-400'}`}>
                {milestone.amount.toLocaleString()}€
              </div>

              {/* Status */}
              {isUnlocked ? (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <Zap className="w-3 h-3" />
                  Débloqué
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                  Verrouillé
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Modal détails */}
      <AnimatePresence>
        {selectedMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMilestone(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
            >
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${selectedMilestone.gradient} flex items-center justify-center`}>
                <selectedMilestone.icon className="w-10 h-10 text-white" />
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getRarityBadge(selectedMilestone.rarity)}`}>
                {selectedMilestone.rarity}
              </div>

              <h3 className="text-2xl font-medium mb-2 text-gray-900">
                {selectedMilestone.title}
              </h3>

              <div className={`text-4xl font-light mb-4 ${selectedMilestone.color}`}>
                {selectedMilestone.amount.toLocaleString()}€
              </div>

              <p className="text-gray-600 mb-6">
                {selectedMilestone.description}
              </p>

              {currentSavings >= selectedMilestone.amount ? (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
                    <Zap className="w-5 h-5" />
                    Badge débloqué !
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    Plus que {(selectedMilestone.amount - currentSavings).toLocaleString()}€ pour débloquer
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E]"
                      style={{ width: `${(currentSavings / selectedMilestone.amount) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedMilestone(null)}
                className="mt-6 w-full py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Fermer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA motivation */}
      {nextMilestone && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 p-6 bg-gradient-to-r from-[#6B1E3E]/10 to-[#D4AF37]/10 border-2 border-[#6B1E3E]/20 rounded-2xl text-center"
        >
          <div className="flex items-center justify-center gap-2 text-[#6B1E3E] mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-medium">Prochain objectif</span>
          </div>
          <p className="text-gray-700">
            Continuez à utiliser HYDRAO pour débloquer <strong>{nextMilestone.title}</strong> !
            Plus que <strong>{(nextMilestone.amount - currentSavings).toLocaleString()}€</strong> d'économies.
          </p>
        </motion.div>
      )}
    </div>
  );
}
