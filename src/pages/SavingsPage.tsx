import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { Page } from '../App';
import { UltimateCalculator } from '../components/UltimateCalculator';

interface SavingsPageProps {
  navigate: (page: Page) => void;
}

export function SavingsPage({ navigate }: SavingsPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Calculateur Ultime - Mode complet et mode simple */}
      <UltimateCalculator navigate={navigate} />

      {/* CTA vers configurateur */}
      <section className="section-padding bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E]">
        <div className="section-container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-white">
              Convaincu par les chiffres ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Choisissez votre robinet HYDRAO personnalisé et commencez à économiser dès aujourd'hui.
            </p>
            <motion.button
              onClick={() => navigate('configurator')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-[#6B1E3E] rounded-full text-lg font-medium shadow-2xl hover:shadow-xl transition-all inline-flex items-center gap-3"
            >
              Choisir mon HYDRAO
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default SavingsPage;