import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function FAQAdvanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQItem[] = [
    {
      category: 'Installation',
      question: 'L\'installation est-elle difficile ?',
      answer: 'Non, l\'installation prend environ 2 heures par un plombier professionnel. Nous proposons un réseau d\'installateurs agréés partout en France. L\'installation est incluse dans le prix.'
    },
    {
      category: 'Installation',
      question: 'Dois-je modifier ma plomberie existante ?',
      answer: 'HYDRAO s\'installe en complément de votre robinet existant. Nous ajoutons simplement les connexions nécessaires pour l\'eau filtrée, pétillante et bouillante. Votre installation actuelle reste intacte.'
    },
    {
      category: 'Prix',
      question: 'Quel est le coût total sur 5 ans ?',
      answer: 'Robinet : 490€ + Abonnement : 59-139€/an selon formule = Entre 785€ et 1185€ sur 5 ans. À comparer aux 3000-6000€ que vous dépenseriez en bouteilles d\'eau sur la même période.'
    },
    {
      category: 'Prix',
      question: 'Puis-je payer en plusieurs fois ?',
      answer: 'Oui ! Paiement en 3× sans frais (soit 163€/mois pendant 3 mois). Nous acceptons CB, Visa, Mastercard et virement bancaire.'
    },
    {
      category: 'Technique',
      question: 'Quelle est la capacité du réservoir d\'eau bouillante ?',
      answer: 'Le réservoir contient 3 litres d\'eau à 100°C en permanence. Il se recharge automatiquement et l\'eau est à nouveau bouillante en 10 minutes.'
    },
    {
      category: 'Technique',
      question: 'Comment fonctionne la filtration ?',
      answer: 'Système de filtration 5 étapes : sédiments, charbon actif, résine échangeuse d\'ions, membrane ultrafine, et post-filtre. Élimine 99,9% des contaminants (chlore, calcaire, métaux lourds, perturbateurs endocriniens).'
    },
    {
      category: 'Garantie',
      question: 'Que couvre la garantie 5 ans ?',
      answer: 'Toutes les pièces et la main d\'œuvre pendant 5 ans. Si une pièce tombe en panne, nous la remplaçons gratuitement et envoyons un technicien à domicile sans frais.'
    },
    {
      category: 'Garantie',
      question: 'Que se passe-t-il si je ne suis pas satisfait ?',
      answer: '30 jours satisfait ou remboursé. Nous reprenons le robinet, désinstallons gratuitement et vous remboursons intégralement. Sans poser de questions.'
    },
    {
      category: 'Abonnement',
      question: 'Puis-je changer de formule d\'abonnement ?',
      answer: 'Oui, vous pouvez changer de formule à tout moment. Passez au Standard si vous consommez plus, ou revenez au Filtre Only si vous consommez moins. Totalement flexible.'
    },
    {
      category: 'Abonnement',
      question: 'Que se passe-t-il si je ne renouvelle pas l\'abonnement ?',
      answer: 'Le robinet continue de fonctionner normalement en mode mitigeur classique (eau chaude/froide). Vous perdez simplement l\'accès à l\'eau filtrée, pétillante et bouillante jusqu\'au renouvellement.'
    }
  ];

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher dans la FAQ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-[#6B1E3E] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-[#6B1E3E] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'Toutes' : cat}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune question trouvée pour "{searchTerm}"</p>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="text-xs text-[#6B1E3E] font-medium mb-1">{faq.category}</div>
                  <div className="text-gray-900 font-medium pr-4">{faq.question}</div>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
