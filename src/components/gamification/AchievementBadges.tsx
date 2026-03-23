import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Award, Star, Crown, Zap, Target, Sparkles, Lock, Share2, Download } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: 'savings' | 'eco' | 'usage' | 'social';
  rarity: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  threshold: number;
  unit: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  reward?: string;
}

interface AchievementBadgesProps {
  userStats?: {
    totalSavings: number;
    bottlesAvoided: number;
    daysActive: number;
    referrals: number;
  };
  className?: string;
}

export function AchievementBadges({ 
  userStats = {
    totalSavings: 450,
    bottlesAvoided: 840,
    daysActive: 120,
    referrals: 2
  },
  className = '' 
}: AchievementBadgesProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const rarityConfig = {
    bronze: {
      color: '#CD7F32',
      gradient: 'from-orange-700 to-orange-500',
      glow: 'shadow-orange-500/50',
      label: 'Bronze'
    },
    silver: {
      color: '#C0C0C0',
      gradient: 'from-gray-400 to-gray-200',
      glow: 'shadow-gray-400/50',
      label: 'Argent'
    },
    gold: {
      color: '#FFD700',
      gradient: 'from-yellow-500 to-amber-300',
      glow: 'shadow-yellow-500/50',
      label: 'Or'
    },
    platinum: {
      color: '#E5E4E2',
      gradient: 'from-purple-400 to-pink-300',
      glow: 'shadow-purple-500/50',
      label: 'Platine'
    },
    diamond: {
      color: '#B9F2FF',
      gradient: 'from-cyan-400 to-blue-300',
      glow: 'shadow-cyan-500/50',
      label: 'Diamant'
    }
  };

  const achievements: Achievement[] = [
    // SAVINGS ACHIEVEMENTS
    {
      id: 'first-100',
      title: 'Premier Centenaire',
      description: 'Économisez vos premiers 100€',
      icon: Trophy,
      category: 'savings',
      rarity: 'bronze',
      threshold: 100,
      unit: '€',
      unlocked: userStats.totalSavings >= 100,
      unlockedDate: userStats.totalSavings >= 100 ? '2024-10-15' : undefined,
      progress: Math.min((userStats.totalSavings / 100) * 100, 100),
      reward: '🎁 Badge Bronze'
    },
    {
      id: 'savings-500',
      title: 'Économe Confirmé',
      description: 'Économisez 500€ avec HYDRAO',
      icon: Award,
      category: 'savings',
      rarity: 'silver',
      threshold: 500,
      unit: '€',
      unlocked: userStats.totalSavings >= 500,
      unlockedDate: userStats.totalSavings >= 500 ? '2024-11-20' : undefined,
      progress: Math.min((userStats.totalSavings / 500) * 100, 100),
      reward: '🎁 Code -20€'
    },
    {
      id: 'savings-1000',
      title: 'Millionnaire Économies',
      description: 'Franchissez la barre des 1000€ économisés',
      icon: Crown,
      category: 'savings',
      rarity: 'gold',
      threshold: 1000,
      unit: '€',
      unlocked: userStats.totalSavings >= 1000,
      progress: Math.min((userStats.totalSavings / 1000) * 100, 100),
      reward: '🎁 Filtres gratuits 3 mois'
    },
    {
      id: 'savings-3000',
      title: 'Légende des Économies',
      description: 'Un parcours exceptionnel : 3000€ économisés',
      icon: Star,
      category: 'savings',
      rarity: 'platinum',
      threshold: 3000,
      unit: '€',
      unlocked: userStats.totalSavings >= 3000,
      progress: Math.min((userStats.totalSavings / 3000) * 100, 100),
      reward: '🎁 Extension garantie gratuite'
    },
    {
      id: 'savings-5000',
      title: 'Titan des Économies',
      description: 'Sommet ultime : 5000€ économisés',
      icon: Sparkles,
      category: 'savings',
      rarity: 'diamond',
      threshold: 5000,
      unit: '€',
      unlocked: userStats.totalSavings >= 5000,
      progress: Math.min((userStats.totalSavings / 5000) * 100, 100),
      reward: '🎁 HYDRAO Cube offert'
    },
    
    // ECO ACHIEVEMENTS
    {
      id: 'eco-100bottles',
      title: 'Éco-Guerrier',
      description: 'Évitez 100 bouteilles plastique',
      icon: Target,
      category: 'eco',
      rarity: 'bronze',
      threshold: 100,
      unit: 'bouteilles',
      unlocked: userStats.bottlesAvoided >= 100,
      unlockedDate: userStats.bottlesAvoided >= 100 ? '2024-10-20' : undefined,
      progress: Math.min((userStats.bottlesAvoided / 100) * 100, 100),
      reward: '🌱 Badge Écolo'
    },
    {
      id: 'eco-500bottles',
      title: 'Champion Planète',
      description: 'Évitez 500 bouteilles plastique',
      icon: Award,
      category: 'eco',
      rarity: 'silver',
      threshold: 500,
      unit: 'bouteilles',
      unlocked: userStats.bottlesAvoided >= 500,
      unlockedDate: userStats.bottlesAvoided >= 500 ? '2024-11-25' : undefined,
      progress: Math.min((userStats.bottlesAvoided / 500) * 100, 100),
      reward: '🌍 Certificat Écologique'
    },
    {
      id: 'eco-1000bottles',
      title: 'Sauveur des Océans',
      description: 'Évitez 1000 bouteilles plastique',
      icon: Trophy,
      category: 'eco',
      rarity: 'gold',
      threshold: 1000,
      unit: 'bouteilles',
      unlocked: userStats.bottlesAvoided >= 1000,
      progress: Math.min((userStats.bottlesAvoided / 1000) * 100, 100),
      reward: '🎁 Arbre planté en votre nom'
    },
    
    // USAGE ACHIEVEMENTS
    {
      id: 'usage-30days',
      title: 'Utilisateur Régulier',
      description: '30 jours d\'utilisation',
      icon: Zap,
      category: 'usage',
      rarity: 'bronze',
      threshold: 30,
      unit: 'jours',
      unlocked: userStats.daysActive >= 30,
      unlockedDate: userStats.daysActive >= 30 ? '2024-10-10' : undefined,
      progress: Math.min((userStats.daysActive / 30) * 100, 100)
    },
    {
      id: 'usage-100days',
      title: 'Centenaire HYDRAO',
      description: '100 jours d\'utilisation',
      icon: Award,
      category: 'usage',
      rarity: 'silver',
      threshold: 100,
      unit: 'jours',
      unlocked: userStats.daysActive >= 100,
      unlockedDate: userStats.daysActive >= 100 ? '2024-11-18' : undefined,
      progress: Math.min((userStats.daysActive / 100) * 100, 100),
      reward: '🎁 Code -10€'
    },
    {
      id: 'usage-365days',
      title: 'Fidélité Or',
      description: '1 an d\'utilisation quotidienne',
      icon: Crown,
      category: 'usage',
      rarity: 'gold',
      threshold: 365,
      unit: 'jours',
      unlocked: userStats.daysActive >= 365,
      progress: Math.min((userStats.daysActive / 365) * 100, 100),
      reward: '🎁 Filtres gratuits 1 an'
    },
    
    // SOCIAL ACHIEVEMENTS
    {
      id: 'social-1referral',
      title: 'Ambassadeur Novice',
      description: 'Parrainez 1 ami',
      icon: Share2,
      category: 'social',
      rarity: 'bronze',
      threshold: 1,
      unit: 'ami',
      unlocked: userStats.referrals >= 1,
      unlockedDate: userStats.referrals >= 1 ? '2024-11-01' : undefined,
      progress: Math.min((userStats.referrals / 1) * 100, 100),
      reward: '🎁 20€ bon d\'achat'
    },
    {
      id: 'social-3referrals',
      title: 'Influenceur HYDRAO',
      description: 'Parrainez 3 amis',
      icon: Star,
      category: 'social',
      rarity: 'silver',
      threshold: 3,
      unit: 'amis',
      unlocked: userStats.referrals >= 3,
      progress: Math.min((userStats.referrals / 3) * 100, 100),
      reward: '🎁 Filtres gratuits 6 mois'
    },
    {
      id: 'social-10referrals',
      title: 'Légende du Bouche-à-Oreille',
      description: 'Parrainez 10 amis',
      icon: Crown,
      category: 'social',
      rarity: 'gold',
      threshold: 10,
      unit: 'amis',
      unlocked: userStats.referrals >= 10,
      progress: Math.min((userStats.referrals / 10) * 100, 100),
      reward: '🎁 HYDRAO Cube offert'
    },
  ];

  const filteredAchievements = achievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const stats = {
    total: achievements.length,
    unlocked: achievements.filter(a => a.unlocked).length,
    locked: achievements.filter(a => !a.unlocked).length
  };

  const categoryLabels = {
    savings: '💰 Économies',
    eco: '🌱 Écologie',
    usage: '⚡ Utilisation',
    social: '👥 Social'
  };

  return (
    <div className={`bg-gradient-to-br from-[#FAF8F5] to-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-16 bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
        >
          <Trophy className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Vos Achievements</h2>
        <p className="text-gray-600 mb-4">
          Débloquez des badges et gagnez des récompenses
        </p>
        
        {/* Stats */}
        <div className="flex justify-center gap-6 text-sm">
          <div>
            <div className="font-bold text-2xl text-[#6B1E3E]">{stats.unlocked}/{stats.total}</div>
            <div className="text-gray-600">Débloqués</div>
          </div>
          <div>
            <div className="font-bold text-2xl text-yellow-600">{stats.locked}</div>
            <div className="text-gray-600">À débloquer</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-2 mb-6">
        {['all', 'unlocked', 'locked'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              filter === f
                ? 'bg-[#6B1E3E] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {f === 'all' && 'Tous'}
            {f === 'unlocked' && `Débloqués (${stats.unlocked})`}
            {f === 'locked' && `Verrouillés (${stats.locked})`}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement, index) => {
          const config = rarityConfig[achievement.rarity];
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAchievement(achievement)}
              className={`relative bg-white rounded-xl p-4 border-2 cursor-pointer transition-all hover:scale-105 ${
                achievement.unlocked
                  ? `border-${achievement.rarity} ${config.glow} shadow-xl`
                  : 'border-gray-300 opacity-70 grayscale'
              }`}
            >
              {/* Rarity Badge */}
              <div className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${config.gradient}`}>
                {config.label}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                achievement.unlocked
                  ? `bg-gradient-to-br ${config.gradient}`
                  : 'bg-gray-200'
              }`}>
                {achievement.unlocked ? (
                  <achievement.icon className="w-8 h-8 text-white" />
                ) : (
                  <Lock className="w-8 h-8 text-gray-400" />
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-center text-gray-900 mb-1">
                {achievement.title}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-3">
                {achievement.description}
              </p>

              {/* Progress */}
              {!achievement.unlocked && (
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progression</span>
                    <span>{achievement.progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${config.gradient}`}
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Unlocked Date */}
              {achievement.unlocked && achievement.unlockedDate && (
                <div className="text-xs text-gray-500 text-center">
                  Débloqué le {new Date(achievement.unlockedDate).toLocaleDateString('fr-FR')}
                </div>
              )}

              {/* Category */}
              <div className="text-xs text-gray-500 text-center mt-2">
                {categoryLabels[achievement.category]}
              </div>

              {/* Reward */}
              {achievement.reward && achievement.unlocked && (
                <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-2 text-center text-xs font-semibold text-green-700">
                  {achievement.reward}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Modal Achievement Details */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
            >
              {/* Close */}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              {/* Icon Large */}
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${
                rarityConfig[selectedAchievement.rarity].gradient
              }`}>
                <selectedAchievement.icon className="w-12 h-12 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                {selectedAchievement.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {selectedAchievement.description}
              </p>

              {/* Stats */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Objectif</span>
                  <span className="font-bold text-gray-900">
                    {selectedAchievement.threshold} {selectedAchievement.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Rareté</span>
                  <span className={`font-bold bg-gradient-to-r ${
                    rarityConfig[selectedAchievement.rarity].gradient
                  } bg-clip-text text-transparent`}>
                    {rarityConfig[selectedAchievement.rarity].label}
                  </span>
                </div>
                {selectedAchievement.reward && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Récompense</span>
                    <span className="font-bold text-green-600">
                      {selectedAchievement.reward}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              {selectedAchievement.unlocked && (
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-3 bg-[#6B1E3E] text-white rounded-lg font-semibold hover:bg-[#5a1833] transition-colors flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Partager
                  </button>
                  <button className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Télécharger
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="mt-8 bg-gradient-to-r from-[#6B1E3E] to-purple-600 rounded-xl p-6 text-white text-center">
        <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-xl mb-2">Continuez à débloquer !</h3>
        <p className="text-sm opacity-90 mb-4">
          Plus vous économisez et protégez la planète, plus vous gagnez de récompenses
        </p>
        <button className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-bold hover:bg-gray-100 transition-colors">
          Voir mon profil complet
        </button>
      </div>
    </div>
  );
}
