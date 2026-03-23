import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Facebook, Twitter, Linkedin, Instagram, MessageCircle, Mail, Copy, Gift, Check, Sparkles, Trophy, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageProvider';
import { useCurrency } from '../i18n/CurrencyProvider';

interface ShareReward {
  id: string;
  platform: string;
  icon: React.ReactNode;
  reward: number;
  color: string;
  bgColor: string;
  completed: boolean;
  shares: number;
}

export function SocialSharing() {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  
  const [shareRewards, setShareRewards] = useState<ShareReward[]>([
    {
      id: 'facebook',
      platform: 'Facebook',
      icon: <Facebook className="w-6 h-6" />,
      reward: 10,
      color: '#1877F2',
      bgColor: 'bg-blue-500',
      completed: false,
      shares: 0,
    },
    {
      id: 'twitter',
      platform: 'Twitter',
      icon: <Twitter className="w-6 h-6" />,
      reward: 10,
      color: '#1DA1F2',
      bgColor: 'bg-sky-500',
      completed: false,
      shares: 0,
    },
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      reward: 15,
      color: '#0A66C2',
      bgColor: 'bg-blue-600',
      completed: false,
      shares: 0,
    },
    {
      id: 'instagram',
      platform: 'Instagram',
      icon: <Instagram className="w-6 h-6" />,
      reward: 10,
      color: '#E4405F',
      bgColor: 'bg-pink-500',
      completed: true,
      shares: 1,
    },
    {
      id: 'whatsapp',
      platform: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6" />,
      reward: 5,
      color: '#25D366',
      bgColor: 'bg-green-500',
      completed: true,
      shares: 3,
    },
  ]);

  const [totalEarned, setTotalEarned] = useState(25);
  const [showSuccess, setShowSuccess] = useState(false);

  const shareMessages = {
    fr: {
      title: "Je viens de découvrir HYDRAO ! 🚰✨",
      text: "Le robinet 5-en-1 qui change tout : eau gazeuse, filtrée, bouillante 100°C et glacée 6°C. Économisez 2340€/an ! Plus besoin d'acheter des bouteilles.",
      url: "https://hydrao.com",
      hashtags: "#HYDRAO #EcoResponsable #Innovation #SmartHome",
    },
    en: {
      title: "I just discovered HYDRAO! 🚰✨",
      text: "The 5-in-1 tap that changes everything: sparkling, filtered, boiling 100°C and chilled 6°C water. Save $2,550/year! No more buying bottles.",
      url: "https://hydrao.com",
      hashtags: "#HYDRAO #EcoFriendly #Innovation #SmartHome",
    },
    es: {
      title: "¡Acabo de descubrir HYDRAO! 🚰✨",
      text: "El grifo 5 en 1 que lo cambia todo: agua con gas, filtrada, hirviendo 100°C y helada 6°C. ¡Ahorra 2340€/año! No más comprar botellas.",
      url: "https://hydrao.com",
      hashtags: "#HYDRAO #EcoResponsable #Innovación #SmartHome",
    },
    it: {
      title: "Ho appena scoperto HYDRAO! 🚰✨",
      text: "Il rubinetto 5 in 1 che cambia tutto: acqua frizzante, filtrata, bollente 100°C e fredda 6°C. Risparmia 2340€/anno! Non più bottiglie.",
      url: "https://hydrao.com",
      hashtags: "#HYDRAO #EcoResponsabile #Innovazione #SmartHome",
    },
  };

  const getMessage = () => shareMessages[language as keyof typeof shareMessages] || shareMessages.fr;

  const shareOnPlatform = (platformId: string) => {
    const message = getMessage();
    const updatedRewards = shareRewards.map(reward => 
      reward.id === platformId && !reward.completed
        ? { ...reward, completed: true, shares: reward.shares + 1 }
        : reward
    );
    
    const newReward = shareRewards.find(r => r.id === platformId && !r.completed);
    if (newReward) {
      setTotalEarned(prev => prev + newReward.reward);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
    
    setShareRewards(updatedRewards);

    switch (platformId) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message.url)}&quote=${encodeURIComponent(message.title + '\n\n' + message.text)}`,
          '_blank'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(message.title)}&url=${encodeURIComponent(message.url)}&hashtags=${encodeURIComponent(message.hashtags.replace(/#/g, ''))}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(message.url)}`,
          '_blank'
        );
        break;
      case 'instagram':
        // Instagram doesn't have direct share URL, show instructions
        alert(language === 'fr' 
          ? "📸 Partagez une story Instagram avec @hydrao et gagnez 10€ !\n\n1. Prenez une photo de votre HYDRAO\n2. Mentionnez @hydrao\n3. Ajoutez #HYDRAO #EcoResponsable"
          : "📸 Share an Instagram story with @hydrao and earn $11!\n\n1. Take a photo of your HYDRAO\n2. Mention @hydrao\n3. Add #HYDRAO #EcoFriendly"
        );
        break;
      case 'whatsapp':
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message.title + '\n\n' + message.text + '\n\n👉 ' + message.url)}`,
          '_blank'
        );
        break;
    }
  };

  const completedRewards = shareRewards.filter(r => r.completed).length;
  const totalPossibleReward = shareRewards.reduce((sum, r) => sum + r.reward, 0);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
          >
            <Check className="w-6 h-6" />
            <div>
              <div className="font-bold">
                {language === 'fr' && 'Récompense débloquée !'}
                {language === 'en' && 'Reward unlocked!'}
                {language === 'es' && '¡Recompensa desbloqueada!'}
                {language === 'it' && 'Ricompensa sbloccata!'}
              </div>
              <div className="text-sm opacity-90">
                {language === 'fr' && 'Merci de partager HYDRAO !'}
                {language === 'en' && 'Thanks for sharing HYDRAO!'}
                {language === 'es' && '¡Gracias por compartir HYDRAO!'}
                {language === 'it' && 'Grazie per aver condiviso HYDRAO!'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
          <Share2 className="w-5 h-5 text-pink-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'fr' && 'Partagez & Gagnez'}
            {language === 'en' && 'Share & Earn'}
            {language === 'es' && 'Comparte y Gana'}
            {language === 'it' && 'Condividi & Guadagna'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr' && 'Jusqu\'à 50€ de récompenses en partageant'}
            {language === 'en' && 'Up to $55 rewards for sharing'}
            {language === 'es' && 'Hasta 55€ de recompensas por compartir'}
            {language === 'it' && 'Fino a 55€ di ricompense condividendo'}
          </p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm opacity-90 mb-1">
              {language === 'fr' && 'Vos récompenses'}
              {language === 'en' && 'Your rewards'}
              {language === 'es' && 'Tus recompensas'}
              {language === 'it' && 'Le tue ricompense'}
            </div>
            <div className="text-4xl font-bold">{formatPrice(totalEarned)}</div>
          </div>
          <div className="text-6xl">🎁</div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">
              {language === 'fr' && 'Progression'}
              {language === 'en' && 'Progress'}
              {language === 'es' && 'Progreso'}
              {language === 'it' && 'Progresso'}
            </span>
            <span className="text-sm font-semibold">
              {completedRewards}/{shareRewards.length} 
              {language === 'fr' && ' partages'}
              {language === 'en' && ' shares'}
              {language === 'es' && ' compartidos'}
              {language === 'it' && ' condivisioni'}
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${(completedRewards / shareRewards.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {shareRewards.map((reward) => (
          <motion.button
            key={reward.id}
            onClick={() => shareOnPlatform(reward.id)}
            disabled={reward.completed}
            whileHover={{ scale: reward.completed ? 1 : 1.02 }}
            whileTap={{ scale: reward.completed ? 1 : 0.98 }}
            className={`relative overflow-hidden rounded-xl border-2 p-4 transition-all ${
              reward.completed
                ? 'border-green-300 bg-green-50 opacity-75'
                : 'border-gray-200 hover:border-[#6B1E3E] hover:shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${reward.bgColor} rounded-full flex items-center justify-center text-white`}>
                  {reward.icon}
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900 mb-1">{reward.platform}</div>
                  <div className="text-sm text-gray-600">
                    {reward.completed ? (
                      <>
                        ✓ {language === 'fr' && 'Partagé'}
                        {language === 'en' && 'Shared'}
                        {language === 'es' && 'Compartido'}
                        {language === 'it' && 'Condiviso'}
                        {' '}({reward.shares}×)
                      </>
                    ) : (
                      <>
                        {language === 'fr' && 'Gagner'}
                        {language === 'en' && 'Earn'}
                        {language === 'es' && 'Ganar'}
                        {language === 'it' && 'Guadagna'}
                        {' '}{formatPrice(reward.reward)}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {reward.completed ? (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="px-3 py-1 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full text-sm font-semibold">
                  +{formatPrice(reward.reward)}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Bonus Challenges */}
      <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-6 text-white mb-6">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          {language === 'fr' && 'Défis Bonus'}
          {language === 'en' && 'Bonus Challenges'}
          {language === 'es' && 'Desafíos Bonus'}
          {language === 'it' && 'Sfide Bonus'}
        </h3>

        <div className="space-y-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6" />
              <div>
                <div className="font-semibold mb-1">
                  {language === 'fr' && 'Partagez sur 5 plateformes'}
                  {language === 'en' && 'Share on 5 platforms'}
                  {language === 'es' && 'Comparte en 5 plataformas'}
                  {language === 'it' && 'Condividi su 5 piattaforme'}
                </div>
                <div className="text-sm opacity-90">
                  {language === 'fr' && 'Bonus de +20€'}
                  {language === 'en' && 'Bonus of +$22'}
                  {language === 'es' && 'Bonus de +22€'}
                  {language === 'it' && 'Bonus di +22€'}
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold">
              {completedRewards}/5
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <div>
                <div className="font-semibold mb-1">
                  {language === 'fr' && 'Générez 3 ventes'}
                  {language === 'en' && 'Generate 3 sales'}
                  {language === 'es' && 'Genera 3 ventas'}
                  {language === 'it' && 'Genera 3 vendite'}
                </div>
                <div className="text-sm opacity-90">
                  {language === 'fr' && 'Bonus de +100€'}
                  {language === 'en' && 'Bonus of +$110'}
                  {language === 'es' && 'Bonus de +110€'}
                  {language === 'it' && 'Bonus di +110€'}
                </div>
              </div>
            </div>
            <div className="text-2xl">🎯</div>
          </div>
        </div>
      </div>

      {/* Share Preview */}
      <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          {language === 'fr' && 'Aperçu du message'}
          {language === 'en' && 'Message preview'}
          {language === 'es' && 'Vista previa del mensaje'}
          {language === 'it' && 'Anteprima del messaggio'}
        </h3>

        <div className="bg-white rounded-lg p-4 border border-gray-300">
          <div className="font-bold text-gray-900 mb-2">{getMessage().title}</div>
          <p className="text-gray-700 text-sm mb-3">{getMessage().text}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {getMessage().hashtags.split(' ').map((tag, index) => (
              <span key={index} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
