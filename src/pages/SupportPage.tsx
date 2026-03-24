import React, { useState } from 'react';
import { Page } from '../App';
import { Phone, Mail, MessageCircle, Book, Wrench, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SupportPageProps {
  navigate: (page: Page) => void;
}

export function SupportPage({ navigate }: SupportPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    {
      id: 'avant-achat',
      icon: HelpCircle,
      title: 'Avant l\'achat',
      desc: 'Questions sur le produit, le prix, les formules',
      action: () => navigate('faq')
    },
    {
      id: 'installation',
      icon: Wrench,
      title: 'Installation',
      desc: 'Préparer l\'installation, trouver un installateur',
      faqs: [
        {
          q: 'Comment préparer mon installation ?',
          a: 'Vérifiez que vous avez : (1) une arrivée d\'eau froide sous l\'évier, (2) une prise électrique 230V, (3) un espace d\'environ 40×30cm pour le boiler. Nous fournissons un manuel détaillé et une vidéo pas-à-pas.'
        },
        {
          q: 'Puis-je installer moi-même ?',
          a: 'Oui, si vous êtes à l\'aise en bricolage et plomberie. Manuel d\'installation détaillé + vidéo fournis. Sinon, faites appel à un plombier professionnel de votre choix.'
        },
        {
          q: 'Ai-je besoin d\'un professionnel ?',
          a: 'Recommandé si vous n\'êtes pas bricoleur. Un plombier classique peut l\'installer facilement (2-3h). Le manuel fourni est conçu pour les professionnels et les particuliers.'
        },
        {
          q: 'Combien de temps dure l\'installation ?',
          a: '2 à 3 heures pour un professionnel. Comptez une demi-journée si vous le faites vous-même (première fois).'
        }
      ]
    },
    {
      id: 'utilisation',
      icon: Book,
      title: 'Utilisation quotidienne',
      desc: 'Comment utiliser, sécurité, consommation',
      faqs: [
        {
          q: 'Comment fonctionne la sécurité enfant ?',
          a: 'Le bouton eau bouillante nécessite un double geste : pousser + tourner en même temps. Un enfant de moins de 7 ans ne peut pas le faire. Le bec reste tiède au toucher même quand l\'eau bouillante coule.'
        },
        {
          q: 'Quelle est la consommation électrique ?',
          a: 'Environ 10W en veille (maintien à température). Sur une année, cela représente ~45€ d\'électricité. C\'est 50% moins qu\'une bouilloire classique utilisée plusieurs fois par jour.'
        },
        {
          q: 'L\'eau est-elle vraiment à 100°C ?',
          a: 'Oui. L\'eau sort à 98-100°C. Parfait pour thé, tisanes, cuisson. Attention : c\'est vraiment chaud, manipulez avec précaution.'
        },
        {
          q: 'Le système fait-il du bruit ?',
          a: 'Non. Le boiler est ultra-silencieux (<40dB). Vous n\'entendrez rien, même la nuit.'
        }
      ]
    },
    {
      id: 'entretien',
      icon: Wrench,
      title: 'Entretien & SAV',
      desc: 'Filtres, détartrage, garantie',
      faqs: [
        {
          q: 'À quelle fréquence changer les filtres ?',
          a: 'Le filtre 5 étapes se change tous les 6 mois (ou après 2 500L). Avec une formule d\'entretien, il est livré automatiquement. Sans formule, comptez 35€ le filtre.'
        },
        {
          q: 'Comment changer le filtre ?',
          a: 'C\'est ultra-simple : dévisser l\'ancien filtre (sous l\'évier), visser le nouveau. Aucun outil nécessaire. 2 minutes chrono.'
        },
        {
          q: 'Faut-il détartrer le robinet ?',
          a: 'Oui, une fois par an si vous êtes en zone calcaire. Nous envoyons un kit de détartrage gratuit avec la formule d\'entretien. Sinon, du vinaigre blanc suffit.'
        },
        {
          q: 'Quelle est la garantie ?',
          a: '2 ans sur l\'ensemble du système contre les défauts de fabrication. Pièces détachées disponibles pendant toute la durée de vie du produit.'
        }
      ]
    },
    {
      id: 'probleme',
      icon: MessageCircle,
      title: 'Un problème technique',
      desc: 'Contactez notre support technique',
      action: () => setSelectedCategory('probleme')
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-8">
              <span className="block text-gray-900">Aide & Support</span>
              <span className="block text-[#6B1E3E]">Comment peut-on vous aider ?</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Choisissez votre situation pour accéder aux réponses adaptées. Support technique disponible 7j/7.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.id}
                onClick={() => {
                  if (cat.action) {
                    cat.action();
                  } else {
                    setSelectedCategory(selectedCategory === cat.id ? null : cat.id);
                  }
                }}
                className={`p-8 rounded-3xl border-2 text-left transition-all ${
                  selectedCategory === cat.id
                    ? 'border-[#6B1E3E] bg-[#6B1E3E]/5 shadow-xl'
                    : 'border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-lg bg-white'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#6B1E3E]/10 flex items-center justify-center flex-shrink-0">
                    <cat.icon className="w-7 h-7 text-[#6B1E3E]" />
                  </div>
                  <ChevronRight className={`w-6 h-6 text-[#6B1E3E] transition-transform ${
                    selectedCategory === cat.id ? 'rotate-90' : ''
                  }`} />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">{cat.title}</h3>
                <p className="text-sm text-[#8B7E74]">{cat.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs par catégorie */}
      <AnimatePresence mode="wait">
        {selectedCategory && categories.find(c => c.id === selectedCategory)?.faqs && (
          <motion.section
            key={selectedCategory}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] to-white overflow-hidden"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="mb-4 text-gray-900">
                  {categories.find(c => c.id === selectedCategory)?.title}
                </h2>
                <p className="text-xl text-[#8B7E74]">
                  {categories.find(c => c.id === selectedCategory)?.desc}
                </p>
              </div>

              <div className="space-y-4">
                {categories.find(c => c.id === selectedCategory)?.faqs?.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors"
                    >
                      <span className="text-lg text-gray-900 pr-4">{faq.q}</span>
                      <ChevronDown
                        className={`w-6 h-6 text-[#6B1E3E] flex-shrink-0 transition-transform ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 text-[#8B7E74] leading-relaxed border-t border-gray-100">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Contact support technique */}
      {selectedCategory === 'probleme' && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 sm:py-16 lg:py-20 bg-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="mb-4 text-gray-900">Contactez notre support technique</h2>
              <p className="text-xl text-[#8B7E74]">
                Disponible 7j/7 pour résoudre vos problèmes rapidement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="tel:0123456789"
                className="p-8 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-[#6B1E3E]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="w-7 h-7 text-[#6B1E3E]" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">Téléphone</h3>
                <p className="text-2xl text-[#6B1E3E] mb-2 group-hover:underline">01 XX XX XX XX</p>
                <p className="text-sm text-[#8B7E74]">Lun-Dim 9h-20h • Appel non surtaxé</p>
              </a>

              <a
                href="mailto:support@hydral.fr"
                className="p-8 bg-gradient-to-br from-[#FAF8F5] to-white rounded-3xl border border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-[#6B1E3E]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="w-7 h-7 text-[#6B1E3E]" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">Email</h3>
                <p className="text-2xl text-[#6B1E3E] mb-2 group-hover:underline">support@hydral.fr</p>
                <p className="text-sm text-[#8B7E74]">Réponse sous 24h • 7j/7</p>
              </a>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-[#6B1E3E]/5 to-white rounded-3xl border border-[#6B1E3E]/20">
              <h3 className="text-xl mb-4 text-gray-900">Pour un support plus rapide</h3>
              <ul className="space-y-2 text-[#8B7E74]">
                <li className="flex items-start gap-2">
                  <span className="text-[#6B1E3E] font-bold">•</span>
                  <span>Ayez votre numéro de commande à portée de main</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B1E3E] font-bold">•</span>
                  <span>Décrivez le problème avec précision (photo si possible)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B1E3E] font-bold">•</span>
                  <span>Indiquez le modèle de votre robinet (FLEX, SQUARE, FUSION...)</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>
      )}

      {/* Toujours pas de réponse ? */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#6B1E3E] to-[#6B1E3E]/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Vous n'avez pas trouvé votre réponse ?</h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Consultez notre FAQ complète ou contactez-nous directement. Nous sommes là pour vous aider.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                onClick={() => navigate('faq')}
                className="px-12 py-5 bg-white text-[#6B1E3E] rounded-full text-lg hover:bg-[#FAF8F5] transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                FAQ complète
              </motion.button>
              <motion.button
                onClick={() => setSelectedCategory('probleme')}
                className="px-12 py-5 bg-transparent border-2 border-white/30 text-white rounded-full text-lg hover:border-white hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Contacter le support
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}