import React from 'react';
import { motion } from 'motion/react';
import { Video, ArrowRight } from 'lucide-react';
import { Page } from '../App';

interface VideoHubPageProps {
  navigate: (page: Page) => void;
}

export function VideoHubPage({ navigate }: VideoHubPageProps) {
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
            <div className="w-20 h-20 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mx-auto mb-8">
              <Video className="w-10 h-10 text-[#6B1E3E]" />
            </div>
            <h1 className="mb-8">
              <span className="block text-gray-900">Vidéothèque</span>
              <span className="block text-[#6B1E3E]">HYDRAL</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Nos vidéos arrivent bientôt. En attendant, découvrez HYDRAL en parcourant notre site.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-lg text-[#8B7E74] mb-10 leading-relaxed">
              Tutoriels d'installation, témoignages clients et démonstrations produit sont en cours de production. Restez connectés.
            </p>
            <motion.button
              onClick={() => navigate('home')}
              className="px-10 py-4 bg-[#6B1E3E] text-white rounded-full hover:bg-[#6B1E3E]/90 transition-colors flex items-center justify-center gap-2 mx-auto"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Découvrir HYDRAL
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
