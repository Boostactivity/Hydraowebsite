import { useRef, memo, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Shield, TrendingDown, Wallet, CheckCircle, Wrench, Star, ChevronDown } from 'lucide-react';
import { Page } from '../App';
import { ConversionTunnel } from '../components/ConversionTunnel';

interface HomePageProps {
  navigate: (page: Page) => void;
}

// Composant FAQ accordéon
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-[#6B1E3E]/30 transition-colors"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-[#6B1E3E]" />
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 pt-2 text-sm text-gray-700 leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HomePage({ navigate }: HomePageProps) {
  const faqRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* ========================================
          HERO - Ultra minimaliste
         ======================================== */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="max-w-4xl mx-auto text-center pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6">
              <span className="block text-gray-900">Le robinet 5-en-1</span>
              <span className="block text-[#6B1E3E]">qui remplace vos bouteilles.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[#8B7E74] mb-12 max-w-2xl mx-auto">
              Eau filtrée, bouillante, gazeuse, froide. Un robinet premium à 490€ pour économiser jusqu'à 1000€/an.
            </p>

            <motion.button
              onClick={() => {
                const tunnelSection = document.querySelector('[data-section="0"]');
                tunnelSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#6B1E3E] text-white rounded-full text-lg font-medium shadow-xl hover:bg-[#6B1E3E]/90 transition-colors inline-flex items-center gap-2"
            >
              Calculer mes économies
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Trust badges minimalistes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-[#6B1E3E]" />
              <span>Garantie 5 ans</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Wrench className="w-4 h-4 text-[#6B1E3E]" />
              <span>Installation incluse</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-[#6B1E3E]" />
              <span>Livraison gratuite</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          TÉMOIGNAGES - Preuve Sociale
         ======================================== */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50/50">
        <div className="section-container max-w-5xl mx-auto px-4 sm:px-6">
          {/* Badge rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-gray-700 font-medium">12 testeurs • 5/5 étoiles</span>
            </div>
          </motion.div>

          {/* Grille témoignages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Témoignage 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                "J'aurais dû le commander bien avant. En 6 mois, j'ai économisé sur les bouteilles."
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Claire M., Paris 16<sup>e</sup>
              </p>
            </motion.div>

            {/* Témoignage 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                "Design impeccable, qualité premium. Fini les packs d'eau à porter."
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Thomas L., Lyon
              </p>
            </motion.div>

            {/* Témoignage 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                "L'eau gazeuse à volonté pour ma famille. Investissement rentabilisé rapidement."
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Sophie D., Bordeaux
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
          PRIX TRANSPARENT
         ======================================== */}
      <section className="py-20 bg-white">
        <div className="section-container max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">
              <span className="block text-gray-900">Prix transparent.</span>
              <span className="block text-[#6B1E3E]">Zéro surprise.</span>
            </h2>
            <p className="text-lg text-[#8B7E74]">
              Le seul coût : votre robinet à 490€ + un abonnement transparent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#6B1E3E]/5 to-[#6B1E3E]/10 rounded-3xl p-8 border border-[#6B1E3E]/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-gray-600 mb-2">Robinet HYDRAL One</p>
                <p className="text-4xl font-bold text-gray-900 mb-4">490€</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Eau filtrée, bouillante, gazeuse, froide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Installation incluse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Garantie 5 ans</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Abonnement (dès)</p>
                <p className="text-4xl font-bold text-gray-900 mb-4">59€<span className="text-lg text-gray-600">/an</span></p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Filtres + CO₂ livrés automatiquement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Sans engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span>Livraison incluse</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
          FAQ
         ======================================== */}
      <section ref={faqRef} className="py-20 bg-[#FAF8F5]">
        <div className="section-container max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 text-gray-900">Questions fréquentes</h2>
            <p className="text-lg text-[#8B7E74]">
              Tout ce que vous devez savoir sur HYDRAL
            </p>
          </motion.div>

          <div className="space-y-4">
            <FAQItem
              question="L'installation est-elle difficile ?"
              answer="Non. 2h avec un plombier standard. Guide complet inclus. Installation offerte en Île-de-France sur le One."
            />
            <FAQItem
              question="Qu'est-ce que j'entretiens et à quel coût ?"
              answer="Cartouche filtrante tous les 6 mois (~35€). CO2 selon consommation. Notre abonnement annuel 129€ couvre tout."
            />
            <FAQItem
              question="Quelle différence entre Pure, Spark et One ?"
              answer="Pure 490€ : les 4 fonctions essentielles. Spark 890€ : + température précise + carbonatation réglable. One 990€ : + connecté WiFi + filtration NSF certifiée + garantie 5 ans."
            />
            <FAQItem
              question="Livrez-vous partout en France ?"
              answer="Oui, France entière, livraison offerte sous 48h."
            />
            <FAQItem
              question="Et si ça tombe en panne ?"
              answer="Garantie 3 ans (5 ans sur le One). SAV français, intervention à domicile 1ère année."
            />
            <FAQItem
              question="Puis-je retourner le produit ?"
              answer="30 jours satisfait ou remboursé, frais de retour offerts."
            />
          </div>
        </div>
      </section>

      {/* ========================================
          TUNNEL DE CONVERSION INTÉGRÉ
         ======================================== */}
      <ConversionTunnel navigate={navigate} />
    </>
  );
}

export default HomePage;
