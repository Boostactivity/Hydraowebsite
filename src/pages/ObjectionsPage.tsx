import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Page } from '../App';
import { TooExpensiveSection } from '../components/objections/TooExpensiveSection';
import { InstallationWizard } from '../components/objections/InstallationWizard';
import { RenterSection } from '../components/objections/RenterSection';
import { SinkCompatibilityChecker } from '../components/objections/SinkCompatibilityChecker';
import { WarrantyHeroSection } from '../components/objections/WarrantyHeroSection';
import { OneClickUpsell } from '../components/conversion/OneClickUpsell';

interface ObjectionsPageProps {
  navigate: (page: Page) => void;
}

export function ObjectionsPage({ navigate }: ObjectionsPageProps) {
  const objections = [
    { id: 'price', label: '"C\'est trop cher"', emoji: '💰' },
    { id: 'installation', label: '"Installation compliquée"', emoji: '🔧' },
    { id: 'renter', label: '"Je suis locataire"', emoji: '🏠' },
    { id: 'sink', label: '"Mon évier est trop petit"', emoji: '📏' },
    { id: 'warranty', label: '"Peur de la panne"', emoji: '⚠️' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="section-container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider font-medium">Réponses Honnêtes</span>
            </div>

            <h1 className="mb-6">
              <span className="block text-gray-900">Toutes vos questions,</span>
              <span className="block text-[#6B1E3E]">nos réponses transparentes</span>
            </h1>

            <p className="text-xl text-[#8B7E74] mb-12">
              Nous comprenons vos hésitations. Voici comment nous les résolvons, concrètement.
            </p>

            {/* Navigation rapide */}
            <div className="flex flex-wrap justify-center gap-3">
              {objections.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => scrollToSection(obj.id)}
                  className="px-5 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-[#6B1E3E]/50 hover:shadow-lg transition-all text-sm font-medium text-gray-700 hover:text-[#6B1E3E]"
                >
                  {obj.emoji} {obj.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Objection 1 : Prix */}
      <div id="price">
        <TooExpensiveSection />
      </div>

      {/* Objection 2 : Installation */}
      <div id="installation">
        <InstallationWizard />
      </div>

      {/* Objection 3 : Locataire */}
      <div id="renter">
        <RenterSection />
      </div>

      {/* Objection 4 : Évier */}
      <div id="sink">
        <SinkCompatibilityChecker />
      </div>

      {/* Objection 5 : Garantie */}
      <div id="warranty">
        <WarrantyHeroSection />
      </div>

      {/* BATCH 24 - One-Click Upsell (Point 120) - P2 IMPORTANT */}
      <OneClickUpsell 
        mainProduct={{ name: 'HYDRAL Robinet 5-en-1', price: 490 }}
        onUpsellAccepted={(productId) => console.log('Upsell accepted:', productId)}
        onUpsellDeclined={() => console.log('Upsell declined')}
      />

      {/* CTA Final */}
      <section className="section-padding bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white">
        <div className="section-container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-white">
              Plus aucune hésitation ?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Choisissez votre HYDRAL maintenant et profitez de l'installation gratuite
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('configurator')}
                className="px-10 py-5 bg-white text-[#6B1E3E] rounded-full font-medium text-lg hover:bg-[#FAF8F5] transition-colors shadow-2xl"
              >
                Choisir mon HYDRAL
                <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => navigate('savings')}
                className="px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-full font-medium text-lg hover:bg-white/20 transition-colors"
              >
                Calculer mes économies
              </button>
            </div>

            <p className="text-sm text-white/80 mt-8">
              ✅ Satisfait ou remboursé 30 jours · ✅ Garantie 5 ans · ✅ Installation incluse
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ObjectionsPage;