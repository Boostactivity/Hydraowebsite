import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Users, Copy, Check, Mail, MessageCircle, Share2, Sparkles, TrendingUp, Award } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { useCurrency } from '../i18n/CurrencyProvider';

export function ReferralProgram() {
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [referralCode, setReferralCode] = useState('HYDRAO-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [referralStats] = useState({
    totalReferrals: 12,
    successfulReferrals: 8,
    pendingReferrals: 4,
    totalEarned: 400,
    availableReward: 320,
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaEmail = () => {
    const subject = language === 'fr' 
      ? 'Découvre HYDRAO - 50€ offerts !'
      : 'Discover HYDRAO - Get $55 off!';
    const body = language === 'fr'
      ? `Je viens de découvrir HYDRAO, le robinet 5-en-1 qui change tout !\n\nUtilise mon code ${referralCode} pour obtenir 50€ de réduction sur ton achat.\n\nÉconomise 2340€/an avec l'eau gazeuse, filtrée, bouillante et glacée directement au robinet.\n\nDécouvre : https://hydrao.com?ref=${referralCode}`
      : `I just discovered HYDRAO, the 5-in-1 tap that changes everything!\n\nUse my code ${referralCode} to get $55 off your purchase.\n\nSave $2,550/year with sparkling, filtered, boiling and chilled water directly from your tap.\n\nDiscover: https://hydrao.com?ref=${referralCode}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareViaWhatsApp = () => {
    const message = language === 'fr'
      ? `Découvre HYDRAO ! 🚰✨\n\nUtilise mon code ${referralCode} pour 50€ de réduction.\n\nÉconomise 2340€/an avec l'eau gazeuse, filtrée, bouillante et glacée au robinet.\n\n👉 https://hydrao.com?ref=${referralCode}`
      : `Discover HYDRAO! 🚰✨\n\nUse my code ${referralCode} for $55 off.\n\nSave $2,550/year with sparkling, filtered, boiling and chilled water from your tap.\n\n👉 https://hydrao.com?ref=${referralCode}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const rewards = [
    {
      icon: <Gift className="w-6 h-6" />,
      title: language === 'fr' ? 'Parrain' : 'Referrer',
      amount: 50,
      description: language === 'fr' 
        ? 'Vous recevez 50€ par filleul'
        : 'You get $55 per referral',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: language === 'fr' ? 'Filleul' : 'Referee',
      amount: 50,
      description: language === 'fr'
        ? 'Votre ami reçoit 50€ de réduction'
        : 'Your friend gets $55 off',
      color: 'from-blue-500 to-cyan-600',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Users className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Programme de Parrainage'}
            {language === 'en' && 'Referral Program'}
            {language === 'es' && 'Programa de Referidos'}
            {language === 'it' && 'Programma Referral'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && '50€ pour vous, 50€ pour vos amis'}
            {language === 'en' && '$55 for you, $55 for your friends'}
            {language === 'es' && '55€ para ti, 55€ para tus amigos'}
            {language === 'it' && '55€ per te, 55€ per i tuoi amici'}
          </p>
        </div>
      </div>

      {/* Rewards Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {rewards.map((reward, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${reward.color} rounded-xl p-6 text-white`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                {reward.icon}
              </div>
              <div>
                <div className="text-sm opacity-90">{reward.title}</div>
                <div className="text-3xl font-bold">{formatPrice(reward.amount)}</div>
              </div>
            </div>
            <p className="text-sm opacity-90">{reward.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Referral Code */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          {language === 'fr' && 'Votre code de parrainage'}
          {language === 'en' && 'Your referral code'}
          {language === 'es' && 'Tu código de referido'}
          {language === 'it' && 'Il tuo codice referral'}
        </h3>
        
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-white border-2 border-[#6B1E3E] rounded-lg px-4 py-3 font-mono text-xl font-bold text-[#6B1E3E] text-center">
            {referralCode}
          </div>
          <button
            onClick={copyToClipboard}
            className="px-6 py-3 bg-[#6B1E3E] text-white rounded-lg hover:bg-[#551831] transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                {language === 'fr' ? 'Copié' : 'Copied'}
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                {language === 'fr' ? 'Copier' : 'Copy'}
              </>
            )}
          </button>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={shareViaEmail}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-[#6B1E3E] hover:bg-purple-50 transition-all"
          >
            <Mail className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Email</span>
          </button>
          
          <button
            onClick={shareViaWhatsApp}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-[#6B1E3E] hover:bg-purple-50 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {referralStats.totalReferrals}
          </div>
          <div className="text-sm text-blue-900">
            {language === 'fr' && 'Invitations'}
            {language === 'en' && 'Invitations'}
            {language === 'es' && 'Invitaciones'}
            {language === 'it' && 'Inviti'}
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {referralStats.successfulReferrals}
          </div>
          <div className="text-sm text-green-900">
            {language === 'fr' && 'Convertis'}
            {language === 'en' && 'Converted'}
            {language === 'es' && 'Convertidos'}
            {language === 'it' && 'Convertiti'}
          </div>
        </div>

        <div className="bg-orange-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {referralStats.pendingReferrals}
          </div>
          <div className="text-sm text-orange-900">
            {language === 'fr' && 'En attente'}
            {language === 'en' && 'Pending'}
            {language === 'es' && 'Pendientes'}
            {language === 'it' && 'In attesa'}
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-4">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {formatPrice(referralStats.totalEarned)}
          </div>
          <div className="text-sm text-purple-900">
            {language === 'fr' && 'Gagnés'}
            {language === 'en' && 'Earned'}
            {language === 'es' && 'Ganados'}
            {language === 'it' && 'Guadagnati'}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white mb-6">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" />
          {language === 'fr' && 'Comment ça marche ?'}
          {language === 'en' && 'How it works?'}
          {language === 'es' && '¿Cómo funciona?'}
          {language === 'it' && 'Come funziona?'}
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <div className="font-semibold mb-1">
                {language === 'fr' && 'Partagez votre code'}
                {language === 'en' && 'Share your code'}
                {language === 'es' && 'Comparte tu código'}
                {language === 'it' && 'Condividi il tuo codice'}
              </div>
              <div className="text-sm opacity-90">
                {language === 'fr' && 'Envoyez votre code unique à vos amis par email, WhatsApp ou réseaux sociaux'}
                {language === 'en' && 'Send your unique code to friends via email, WhatsApp or social media'}
                {language === 'es' && 'Envía tu código único a tus amigos por email, WhatsApp o redes sociales'}
                {language === 'it' && 'Invia il tuo codice unico agli amici via email, WhatsApp o social media'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <div className="font-semibold mb-1">
                {language === 'fr' && 'Votre ami économise 50€'}
                {language === 'en' && 'Your friend saves $55'}
                {language === 'es' && 'Tu amigo ahorra 55€'}
                {language === 'it' && 'Il tuo amico risparmia 55€'}
              </div>
              <div className="text-sm opacity-90">
                {language === 'fr' && 'Il utilise votre code lors de son achat et obtient une réduction immédiate'}
                {language === 'en' && 'They use your code at checkout and get an instant discount'}
                {language === 'es' && 'Usa tu código al comprar y obtiene un descuento inmediato'}
                {language === 'it' && 'Usa il tuo codice all\'acquisto e ottiene uno sconto immediato'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <div className="font-semibold mb-1">
                {language === 'fr' && 'Vous recevez 50€'}
                {language === 'en' && 'You receive $55'}
                {language === 'es' && 'Recibes 55€'}
                {language === 'it' && 'Ricevi 55€'}
              </div>
              <div className="text-sm opacity-90">
                {language === 'fr' && 'Dès que votre filleul finalise son achat, vous recevez votre récompense'}
                {language === 'en' && 'As soon as your referral completes their purchase, you receive your reward'}
                {language === 'es' && 'Tan pronto como tu referido complete su compra, recibes tu recompensa'}
                {language === 'it' && 'Non appena il tuo referral completa l\'acquisto, ricevi la tua ricompensa'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Teaser */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8" />
            <div>
              <div className="font-bold text-lg mb-1">
                {language === 'fr' && 'Classement des Ambassadeurs'}
                {language === 'en' && 'Ambassador Leaderboard'}
                {language === 'es' && 'Clasificación de Embajadores'}
                {language === 'it' && 'Classifica Ambasciatori'}
              </div>
              <div className="text-sm opacity-90">
                {language === 'fr' && 'Top 10 : bonus exclusifs chaque mois'}
                {language === 'en' && 'Top 10: exclusive bonuses every month'}
                {language === 'es' && 'Top 10: bonos exclusivos cada mes'}
                {language === 'it' && 'Top 10: bonus esclusivi ogni mese'}
              </div>
            </div>
          </div>
          <div className="text-5xl">🏆</div>
        </div>
      </div>
    </div>
  );
}
