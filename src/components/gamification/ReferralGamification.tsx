import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Gift, Crown, Trophy, Share2, Copy, Mail, MessageCircle, Award, Zap, TrendingUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Referral {
  name: string;
  status: 'pending' | 'completed' | 'purchased';
  date: string;
  reward: number;
}

interface ReferralTier {
  id: number;
  name: string;
  referralsNeeded: number;
  reward: string;
  icon: any;
  color: string;
  gradient: string;
}

interface ReferralGamificationProps {
  userCode?: string;
  currentReferrals?: number;
  className?: string;
}

export function ReferralGamification({ 
  userCode = 'HYDRAO-ALEX2024',
  currentReferrals = 2,
  className = '' 
}: ReferralGamificationProps) {
  const [activeTab, setActiveTab] = useState<'invite' | 'leaderboard' | 'rewards'>('invite');
  const [referralMethod, setReferralMethod] = useState<'link' | 'email' | 'whatsapp'>('link');

  const referralTiers: ReferralTier[] = [
    {
      id: 1,
      name: 'Ambassadeur Bronze',
      referralsNeeded: 1,
      reward: '20€ bon d\'achat',
      icon: Users,
      color: '#CD7F32',
      gradient: 'from-orange-700 to-orange-500'
    },
    {
      id: 2,
      name: 'Ambassadeur Argent',
      referralsNeeded: 3,
      reward: 'Filtres gratuits 6 mois',
      icon: Award,
      color: '#C0C0C0',
      gradient: 'from-gray-400 to-gray-200'
    },
    {
      id: 3,
      name: 'Ambassadeur Or',
      referralsNeeded: 5,
      reward: 'Filtres gratuits 1 an',
      icon: Trophy,
      color: '#FFD700',
      gradient: 'from-yellow-500 to-amber-300'
    },
    {
      id: 4,
      name: 'Ambassadeur Platine',
      referralsNeeded: 10,
      reward: 'HYDRAO Cube offert (490€)',
      icon: Crown,
      color: '#E5E4E2',
      gradient: 'from-purple-400 to-pink-300'
    },
  ];

  const myReferrals: Referral[] = [
    { name: 'Sophie M.', status: 'completed', date: '2024-11-01', reward: 20 },
    { name: 'Marc L.', status: 'completed', date: '2024-11-15', reward: 20 },
    { name: 'Julie D.', status: 'pending', date: '2024-12-05', reward: 0 },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alexandre D.', referrals: 23, avatar: '👑' },
    { rank: 2, name: 'Sophie M.', referrals: 18, avatar: '🏆' },
    { rank: 3, name: 'Marc L.', referrals: 15, avatar: '🥉' },
    { rank: 4, name: 'Julie P.', referrals: 12, avatar: '⭐' },
    { rank: 5, name: 'Thomas R.', referrals: 10, avatar: '🌟' },
    { rank: 12, name: 'Vous', referrals: currentReferrals, avatar: '😊', highlight: true },
  ];

  const currentTier = referralTiers.reverse().find(t => currentReferrals >= t.referralsNeeded) || referralTiers[0];
  const nextTier = referralTiers.find(t => t.referralsNeeded > currentReferrals);

  const totalEarned = myReferrals.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.reward, 0);

  const handleCopyLink = () => {
    const link = `https://hydrao.com/?ref=${userCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Lien copié !', {
      description: 'Partagez-le avec vos amis',
    });
  };

  const handleShareEmail = () => {
    const subject = 'Découvre HYDRAO - Robinet 5-en-1 révolutionnaire';
    const body = `Salut !\n\nJe viens d'installer HYDRAO chez moi et c'est génial ! Eau filtrée, pétillante, chaude et froide en un seul robinet.\n\nUtilise mon code ${userCode} pour -50€ sur ta commande :\nhttps://hydrao.com/?ref=${userCode}\n\nTu vas adorer !\n\nÀ bientôt,`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleShareWhatsApp = () => {
    const message = `🚰 Découvre HYDRAO, le robinet révolutionnaire que j'ai installé chez moi !\n\n✨ Eau filtrée, pétillante, chaude & froide\n💰 Économise 800€/an\n🌱 Écologique\n\nUtilise mon code ${userCode} pour -50€ :\nhttps://hydrao.com/?ref=${userCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className={`bg-gradient-to-br from-[#FAF8F5] to-white rounded-2xl p-6 md:p-8 border-2 border-gray-200 ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="w-16 h-16 bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
        >
          <Gift className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Programme Parrainage</h2>
        <p className="text-gray-600">
          Invitez vos amis et gagnez des récompenses exclusives
        </p>
      </div>

      {/* Current Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center">
          <Users className="w-8 h-8 text-[#6B1E3E] mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">{currentReferrals}</div>
          <div className="text-sm text-gray-600">Amis parrainés</div>
        </div>
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center">
          <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">{totalEarned}€</div>
          <div className="text-sm text-gray-600">Récompenses gagnées</div>
        </div>
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-3xl font-bold text-gray-900">#{leaderboard.find(l => l.highlight)?.rank || '?'}</div>
          <div className="text-sm text-gray-600">Classement</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { id: 'invite', label: 'Inviter', icon: Share2 },
          { id: 'leaderboard', label: 'Classement', icon: Trophy },
          { id: 'rewards', label: 'Récompenses', icon: Gift },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-all ${
              activeTab === tab.id
                ? 'text-[#6B1E3E] border-b-2 border-[#6B1E3E]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* INVITE TAB */}
        {activeTab === 'invite' && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Referral Code */}
            <div className="bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-xl p-6 text-white mb-6">
              <h3 className="font-bold text-lg mb-2">Votre code parrainage</h3>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg p-3 mb-4">
                <code className="flex-1 text-xl font-mono font-bold">{userCode}</code>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-white text-[#6B1E3E] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copier
                </button>
              </div>
              <p className="text-sm opacity-90">
                Vos amis reçoivent <strong>-50€</strong> et vous gagnez <strong>20€</strong> dès leur achat
              </p>
            </div>

            {/* Share Methods */}
            <div className="mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Comment partager ?</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={handleCopyLink}
                  className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#6B1E3E] hover:shadow-lg transition-all group"
                >
                  <Share2 className="w-8 h-8 text-[#6B1E3E] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-gray-900 mb-1">Lien de parrainage</div>
                  <div className="text-sm text-gray-600">Copier et partager</div>
                </button>

                <button
                  onClick={handleShareEmail}
                  className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#6B1E3E] hover:shadow-lg transition-all group"
                >
                  <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-gray-900 mb-1">Email</div>
                  <div className="text-sm text-gray-600">Envoyer par email</div>
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-[#6B1E3E] hover:shadow-lg transition-all group"
                >
                  <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-gray-900 mb-1">WhatsApp</div>
                  <div className="text-sm text-gray-600">Partager sur WhatsApp</div>
                </button>
              </div>
            </div>

            {/* My Referrals */}
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-4">Mes parrainages ({myReferrals.length})</h3>
              <div className="space-y-3">
                {myReferrals.map((referral, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#6B1E3E] to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {referral.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{referral.name}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(referral.date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                    <div>
                      {referral.status === 'completed' && (
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          +{referral.reward}€ 🎉
                        </div>
                      )}
                      {referral.status === 'pending' && (
                        <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                          En attente
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* LEADERBOARD TAB */}
        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0 ${
                    entry.highlight ? 'bg-gradient-to-r from-[#6B1E3E]/10 to-purple-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 text-center font-bold ${
                      entry.rank === 1 ? 'text-yellow-600' :
                      entry.rank === 2 ? 'text-gray-400' :
                      entry.rank === 3 ? 'text-orange-600' :
                      'text-gray-600'
                    }`}>
                      #{entry.rank}
                    </div>
                    <div className="text-2xl">{entry.avatar}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{entry.name}</div>
                      <div className="text-sm text-gray-600">{entry.referrals} parrainages</div>
                    </div>
                  </div>
                  {entry.rank <= 3 && (
                    <Trophy className={`w-6 h-6 ${
                      entry.rank === 1 ? 'text-yellow-600' :
                      entry.rank === 2 ? 'text-gray-400' :
                      'text-orange-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* REWARDS TAB */}
        {activeTab === 'rewards' && (
          <motion.div
            key="rewards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Progress to Next Tier */}
            {nextTier && (
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-lg text-gray-900">Prochain palier</div>
                    <div className="text-sm text-gray-600">
                      Plus que <strong>{nextTier.referralsNeeded - currentReferrals}</strong> parrainages
                    </div>
                  </div>
                  <div className={`text-4xl`}>{nextTier.icon && <nextTier.icon className="w-10 h-10" style={{ color: nextTier.color }} />}</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${nextTier.gradient} transition-all duration-500`}
                    style={{ width: `${(currentReferrals / nextTier.referralsNeeded) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {currentReferrals} / {nextTier.referralsNeeded} parrainages
                </div>
              </div>
            )}

            {/* All Tiers */}
            <div className="space-y-4">
              {referralTiers.reverse().map((tier, index) => {
                const unlocked = currentReferrals >= tier.referralsNeeded;
                
                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-white rounded-xl p-6 border-2 transition-all ${
                      unlocked
                        ? 'border-green-500 shadow-xl'
                        : 'border-gray-200 opacity-60'
                    }`}
                  >
                    {unlocked && (
                      <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ✓ Débloqué
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${tier.gradient}`}>
                        <tier.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{tier.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {tier.referralsNeeded} parrainage{tier.referralsNeeded > 1 ? 's' : ''}
                        </p>
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-3 py-2 inline-block">
                          <span className="text-green-700 font-semibold">🎁 {tier.reward}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="mt-8 bg-gradient-to-r from-[#6B1E3E] to-purple-600 rounded-xl p-6 text-white text-center">
        <Zap className="w-10 h-10 mx-auto mb-3 opacity-90" />
        <h3 className="font-bold text-xl mb-2">Invitez maintenant !</h3>
        <p className="text-sm opacity-90 mb-4">
          {nextTier 
            ? `Plus que ${nextTier.referralsNeeded - currentReferrals} parrainages pour débloquer ${nextTier.reward}`
            : 'Vous avez débloqué tous les paliers ! 🎉'
          }
        </p>
        <button
          onClick={handleCopyLink}
          className="px-6 py-3 bg-white text-[#6B1E3E] rounded-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Partager mon code
        </button>
      </div>
    </div>
  );
}
