import { motion } from 'motion/react';
import { ChevronRight, Droplets, Flame, Sparkles, Snowflake, Filter, TrendingDown, Leaf, Zap } from 'lucide-react';
import { Page } from '../App';
import { ConversionTunnel } from '../components/ConversionTunnel';

interface HomePageProps {
  navigate: (page: Page) => void;
}

export function HomePage({ navigate }: HomePageProps) {
  return (
    <>
      {/* ========================================
          HERO — Comprendre + agir en 1 écran
         ======================================== */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-white to-[#FAF8F5]">
        <div className="max-w-5xl mx-auto text-center pt-16 sm:pt-20 lg:pt-24 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm sm:text-base font-medium tracking-widest uppercase text-[#6B1E3E] mb-4">
              L'eau sous toutes ses formes
            </p>

            <h1 className="mb-4">
              <span className="block text-gray-900">Le robinet 5-en-1</span>
              <span className="block text-[#6B1E3E]">qui remplace vos bouteilles.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#8B7E74] mb-8 max-w-2xl mx-auto">
              Eau filtrée, bouillante, gazeuse, froide et mitigeur classique. Un seul robinet au quotidien, plus besoin de bouteilles.
            </p>
          </motion.div>

          {/* Les 5 fonctions — pilules compactes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8"
          >
            {[
              { icon: Filter, label: 'Filtrée' },
              { icon: Flame, label: 'Bouillante' },
              { icon: Sparkles, label: 'Gazeuse' },
              { icon: Snowflake, label: 'Froide' },
              { icon: Droplets, label: 'Mitigeur' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.07 }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full border border-gray-200 shadow-sm"
                >
                  <Icon className="w-4 h-4 text-[#6B1E3E]" />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10"
          >
            <motion.button
              onClick={() => {
                const tunnelSection = document.querySelector('[data-section="0"]');
                tunnelSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-10 py-4 bg-[#6B1E3E] text-white rounded-full text-base sm:text-lg font-medium shadow-xl hover:bg-[#6B1E3E]/90 transition-colors inline-flex items-center gap-2"
            >
              Combien j'économise ?
              <ChevronRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => navigate('concept')}
              whileHover={{ scale: 1.02 }}
              className="px-6 py-3 text-[#6B1E3E] text-sm font-medium hover:bg-[#6B1E3E]/5 rounded-full transition-colors"
            >
              Découvrir HYDRAL
            </motion.button>
          </motion.div>

          {/* Bande intérêts — pourquoi c'est bien */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { icon: TrendingDown, text: 'Jusqu\'à 1 000€/an économisés' },
              { icon: Leaf, text: 'Zéro bouteille plastique' },
              { icon: Zap, text: 'Eau bouillante en 3 secondes' },
              { icon: Filter, text: 'Filtration 5 étapes' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-4 h-4 text-[#6B1E3E]" />
                  <span className="text-xs text-[#8B7E74] leading-tight">{item.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ========================================
          TUNNEL DE CONVERSION — Direct
         ======================================== */}
      <ConversionTunnel navigate={navigate} />
    </>
  );
}

export default HomePage;
