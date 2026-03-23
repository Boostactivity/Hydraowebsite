import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Check } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'installation' | 'technique' | 'prix' | 'garantie';
}

const faqs: FAQItem[] = [
  {
    question: "Comment s'installe HYDRAO ?",
    answer: "HYDRAO nécessite une installation par un professionnel qualifié (plombier). L'installation prend environ 2-3h : pose du robinet, installation des modules sous évier (boiler, filtration, carbonatation). Vous pouvez faire appel à votre plombier habituel ou nous demander des recommandations.",
    category: 'installation'
  },
  {
    question: "Combien d'espace faut-il sous l'évier ?",
    answer: "Minimum 40cm × 50cm pour installer les 2-3 modules compacts (chauffe-eau, filtre, CO₂). Nos modules sont conçus pour s'adapter aux petites cuisines. Si vous avez un doute, notre installateur vérifie gratuitement lors du RDV.",
    category: 'technique'
  },
  {
    question: "L'eau est-elle vraiment pure ?",
    answer: "Oui ! Notre système de filtration professionnelle 5 étapes élimine 99,9% du chlore, calcaire, métaux lourds, pesticides et perturbateurs endocriniens. L'eau est aussi pure qu'en bouteille de verre, mais sans les 240 000 microplastiques qu'on trouve dans une bouteille plastique.",
    category: 'technique'
  },
  {
    question: "L'eau bout vraiment à 100°C ?",
    answer: "Oui, l'eau sort à 100°C instantanément grâce au réservoir sous pression. Parfait pour thé, café, soupes, pâtes. Sécurité enfant intégrée avec double action pour éviter les brûlures accidentelles.",
    category: 'technique'
  },
  {
    question: "Combien vais-je économiser par an ?",
    answer: "Entre 500€ et 1200€/an selon votre foyer (eau en bouteille, électricité bouilloire, courses, temps). Pour un foyer de 4 personnes, l'économie moyenne est de 1000€/an. Utilisez notre calculateur pour votre estimation personnalisée en 30 secondes.",
    category: 'prix'
  },
  {
    question: "Le robinet peut-il tomber en panne ?",
    answer: "Nos robinets sont garantis 5 ans pièces et main d'œuvre. En cas de problème : SAV sous 48h maximum, pièces de rechange disponibles, technicien à domicile si nécessaire. Taux de panne < 2% sur 5 ans.",
    category: 'garantie'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Toutes' },
    { id: 'installation', label: 'Installation' },
    { id: 'technique', label: 'Technique' },
    { id: 'prix', label: 'Prix' },
    { id: 'garantie', label: 'Garantie' }
  ];

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-white">
      <div className="section-container max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8 border border-[#6B1E3E]/20"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Questions fréquentes</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Toutes les réponses
            <span className="block text-[#6B1E3E]">à vos questions</span>
          </h2>
          <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
            Installation, compatibilité, économies : tout ce que vous devez savoir avant de commander.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#6B1E3E] text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-[#6B1E3E]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className={`bg-white rounded-2xl border-2 transition-all ${
                  openIndex === index
                    ? 'border-[#6B1E3E]/40 shadow-xl'
                    : 'border-gray-200 hover:border-[#6B1E3E]/20 shadow-sm hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-gray-900 font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-5 h-5 ${openIndex === index ? 'text-[#6B1E3E]' : 'text-gray-400'}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center bg-gradient-to-br from-[#FAF8F5] to-white p-8 rounded-3xl border border-gray-200"
        >
          <p className="text-gray-900 mb-4 text-lg">
            Une autre question ?
          </p>
          <p className="text-gray-600 mb-6">
            Notre équipe répond à vos questions en moins de 2h pendant les horaires d'ouverture
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@hydrao.com"
              className="px-8 py-3 bg-[#6B1E3E] text-white rounded-full font-medium hover:bg-[#8B2E4E] transition-colors inline-flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Nous contacter
            </a>
            <span className="text-sm text-gray-500">Réponse sous 2h • 9h-19h du lundi au samedi</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}