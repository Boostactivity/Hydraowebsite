import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, X, Search, ChevronRight, MessageCircle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'installation' | 'technique' | 'prix' | 'garantie' | 'utilisation';
}

export function InteractiveFAQWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Le robinet HYDRAO est-il compatible avec mon évier ?',
      answer: '99% des éviers sont compatibles. Il faut simplement un trou de 32-35mm (standard) et 40cm × 50cm d\'espace sous l\'évier pour les modules.',
      category: 'installation'
    },
    {
      id: '2',
      question: 'Combien coûte l\'installation ?',
      answer: 'L\'installation est INCLUSE dans le prix (valeur 150€). Un technicien certifié vient installer tout le système en 2-3 heures.',
      category: 'installation'
    },
    {
      id: '3',
      question: 'Pourquoi HYDRAO est-il aussi accessible ?',
      answer: 'Nous vendons en direct sans intermédiaires, ce qui nous permet de proposer un robinet premium 5-en-1 à 490€ là où le marché affiche 1500-3000€. Modèle direct-to-consumer = prix justes.',
      category: 'prix'
    },
    {
      id: '4',
      question: 'Quelle est la durée de vie des filtres ?',
      answer: 'Les filtres durent 6 mois (soit 1200L) et sont envoyés automatiquement avec l\'abonnement. Un voyant vous prévient 2 semaines avant le remplacement.',
      category: 'utilisation'
    },
    {
      id: '5',
      question: 'En combien de temps le robinet est-il rentabilisé ?',
      answer: 'En moyenne 6 mois pour une famille de 4 personnes qui achète de l\'eau en bouteille. Le calcul précis dépend de votre consommation (utilisez notre calculateur).',
      category: 'prix'
    },
    {
      id: '6',
      question: 'Que couvre la garantie 5 ans ?',
      answer: 'TOUT : pièces, main d\'œuvre, déplacements. Si une panne survient, on répare ou on remplace gratuitement. C\'est la meilleure garantie du marché.',
      category: 'garantie'
    },
    {
      id: '7',
      question: 'Peut-on essayer avant d\'acheter ?',
      answer: 'Oui ! Satisfait ou remboursé 30 jours. Si le robinet ne vous convient pas, on le désinstalle et vous êtes remboursé intégralement.',
      category: 'garantie'
    },
    {
      id: '8',
      question: 'L\'eau pétillante est-elle vraiment illimitée ?',
      answer: 'Oui, tant que vous avez des cartouches CO₂. Une cartouche fait 60L d\'eau pétillante (~ 1 mois pour une famille). Elles sont incluses dans l\'abonnement.',
      category: 'technique'
    }
  ];

  const categories = [
    { id: 'all', name: 'Toutes', icon: '📚' },
    { id: 'installation', name: 'Installation', icon: '🔧' },
    { id: 'technique', name: 'Technique', icon: '⚙️' },
    { id: 'prix', name: 'Prix', icon: '💰' },
    { id: 'garantie', name: 'Garantie', icon: '🛡️' },
    { id: 'utilisation', name: 'Utilisation', icon: '💡' }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full shadow-2xl hover:shadow-[#6B1E3E]/50 flex items-center justify-center group"
          >
            <HelpCircle className="w-7 h-7" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-medium"
            >
              {faqs.length}
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Widget panel */}
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
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">Questions fréquentes</h3>
                      <p className="text-sm text-white/80">{faqs.length} réponses instantanées</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une question..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-[#6B1E3E] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.icon} {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-600">Aucune question trouvée</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                ) : (
                  filteredFAQs.map((faq, index) => (
                    <motion.details
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-gray-50 rounded-xl border border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-md transition-all"
                    >
                      <summary className="cursor-pointer p-4 list-none flex items-center justify-between">
                        <span className="text-gray-900 font-medium pr-4">{faq.question}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-4 pb-4 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.details>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Vous ne trouvez pas votre réponse ?
                </p>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Discuter avec un conseiller
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}