import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Facebook, Instagram, MessageCircle, Copy, Check, Gift, X } from 'lucide-react';

export function SocialSharingIncentive() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const shareUrl = 'https://hydrao.fr/?ref=partage';
  const shareText = 'Découvrez HYDRAO : le robinet 5-en-1 qui révolutionne la cuisine ! Eau bouillante, filtrée, pétillante... tout en un à 490€ 💧✨';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      setShared(true);
      
      // Reset après 3 secondes
      setTimeout(() => {
        setIsOpen(false);
        setShared(false);
      }, 3000);
    }
  };

  return (
    <>
      {/* Floating Share Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-44 right-6 z-40 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center group"
          >
            <Share2 className="w-7 h-7" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium"
            >
              10
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal de partage */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              {shared ? (
                // Écran de confirmation
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl text-gray-900 mb-3">Merci pour le partage ! 🎉</h3>
                  <p className="text-gray-600 mb-6">
                    Vous venez de gagner <span className="text-[#6B1E3E] font-medium">10€ de réduction</span> sur votre commande
                  </p>
                  <div className="p-4 bg-[#6B1E3E]/5 rounded-xl border-2 border-[#6B1E3E]/20">
                    <div className="text-sm text-gray-600 mb-2">Votre code promo :</div>
                    <div className="text-2xl font-mono text-[#6B1E3E] font-medium">PARTAGE10</div>
                  </div>
                </motion.div>
              ) : (
                // Écran de partage
                <>
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <Gift className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-medium">Partagez & gagnez</h3>
                          <p className="text-sm text-white/80">10€ de réduction instantanée</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-sm text-white/90 mb-2">🎁 Offre spéciale</div>
                      <div className="font-medium">
                        Partagez HYDRAO sur vos réseaux et recevez 10€ de réduction immédiate !
                      </div>
                    </div>
                  </div>

                  {/* Boutons de partage */}
                  <div className="p-6">
                    <div className="text-sm text-gray-600 mb-4 text-center">
                      Choisissez votre plateforme préférée
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {[
                        { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700' },
                        { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'from-green-500 to-green-600' },
                        { id: 'twitter', name: 'Twitter', icon: Share2, color: 'from-sky-400 to-sky-500' },
                        { id: 'linkedin', name: 'LinkedIn', icon: Share2, color: 'from-blue-700 to-blue-800' }
                      ].map((platform) => (
                        <motion.button
                          key={platform.id}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShare(platform.id)}
                          className={`flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r ${platform.color} text-white rounded-xl font-medium hover:shadow-lg transition-shadow`}
                        >
                          <platform.icon className="w-5 h-5" />
                          <span>{platform.name}</span>
                        </motion.button>
                      ))}
                    </div>

                    {/* Copier le lien */}
                    <div className="relative">
                      <div className="text-sm text-gray-600 mb-2">Ou copiez le lien</div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={shareUrl}
                          readOnly
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCopyLink}
                          className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            copied
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                          }`}
                        >
                          {copied ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6 pt-0">
                    <div className="bg-[#FAF8F5] rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <Gift className="w-4 h-4 text-[#6B1E3E]" />
                        <span>Le code promo sera envoyé instantanément après le partage</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
