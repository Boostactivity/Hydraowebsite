import { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Users, Euro, Share2, Copy, Check } from 'lucide-react';

export function ReferralProgram() {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const referralCode = 'HYDRAO-VIP-2024';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rewards = [
    {
      icon: '💶',
      title: '50€ par parrain',
      description: 'Pour chaque ami qui achète un robinet HYDRAO',
      color: 'from-green-50 to-green-100'
    },
    {
      icon: '🎁',
      title: '30€ pour votre ami',
      description: 'Code promo immédiat sur sa première commande',
      color: 'from-blue-50 to-blue-100'
    },
    {
      icon: '🏆',
      title: 'Bonus exclusifs',
      description: 'Filtres gratuits après 3 parrainages réussis',
      color: 'from-purple-50 to-purple-100'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Partagez votre code',
      description: 'Envoyez votre code unique à vos amis par email, SMS ou réseaux sociaux',
      icon: Share2
    },
    {
      number: '2',
      title: 'Vos amis commandent',
      description: 'Ils bénéficient de 30€ de réduction sur leur robinet HYDRAO',
      icon: Gift
    },
    {
      number: '3',
      title: 'Vous recevez 50€',
      description: 'Crédit utilisable immédiatement sur filtres, accessoires ou abonnements',
      icon: Euro
    }
  ];

  const stats = [
    { value: '2 347', label: 'parrainages réussis' },
    { value: '117 350€', label: 'reversés aux parrains' },
    { value: '4,8', label: 'parrainages / parrain moyen' }
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-[#6B1E3E] via-[#6B1E3E] to-[#8B2E4E] text-white relative overflow-hidden">
      {/* Décorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <div className="section-container max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full mb-8"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider">Programme de parrainage</span>
          </motion.div>

          <h2 className="mb-6">
            Partagez HYDRAO,
            <span className="block text-[#D4AF37]">gagnez 50€ par ami</span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Aidez vos proches à transformer leur cuisine et recevez 50€ pour chaque parrainage réussi
          </p>
        </motion.div>

        {/* Récompenses */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${reward.color} rounded-2xl p-8 text-center`}
            >
              <div className="text-5xl mb-4">{reward.icon}</div>
              <h3 className="text-xl text-gray-900 mb-2">{reward.title}</h3>
              <p className="text-sm text-gray-700">{reward.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Code de parrainage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-16 border border-white/20"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl text-center mb-6">Votre code de parrainage unique</h3>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="w-full px-6 py-4 bg-white/20 border-2 border-white/30 rounded-xl text-white text-center font-mono tracking-wider text-lg backdrop-blur-sm"
                />
              </div>
              
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-white text-[#6B1E3E] rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copier le code
                  </>
                )}
              </motion.button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input
                type="email"
                placeholder="Email de votre ami"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 max-w-md px-6 py-3 bg-white/20 border-2 border-white/30 rounded-xl text-white placeholder-white/60 backdrop-blur-sm"
              />
              <button className="px-8 py-3 bg-[#D4AF37] text-white rounded-xl font-medium hover:bg-[#B8941F] transition-colors whitespace-nowrap">
                Envoyer l'invitation
              </button>
            </div>
          </div>
        </motion.div>

        {/* Comment ça marche */}
        <div className="mb-16">
          <h3 className="text-3xl text-center mb-12">Comment ça marche ?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Ligne de connexion */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-white/20 -translate-x-1/2" />
                )}
                
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-light border-2 border-white/30">
                    {step.number}
                  </div>
                  
                  <step.icon className="w-8 h-8 mx-auto mb-4 text-[#D4AF37]" />
                  
                  <h4 className="text-xl mb-3">{step.title}</h4>
                  <p className="text-white/80">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="text-4xl font-light mb-2 text-[#D4AF37]">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
