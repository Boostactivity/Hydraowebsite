import React from 'react';
import { Page } from '../App';
import { Sparkles, Droplets, Recycle, Thermometer, Check, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CubePageProps {
  navigate: (page: Page) => void;
}

export function CubePage({ navigate }: CubePageProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/20 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#E8D5DC]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 rounded-full mb-8 border border-[#6B1E3E]/20">
              <Sparkles className="w-4 h-4 text-[#6B1E3E]" />
              <span className="text-sm text-[#6B1E3E] font-medium">Inclus dans chaque HYDRAL</span>
            </div>

            <h1 className="mb-6">
              <span className="block text-gray-900">CUBE</span>
              <span className="block text-[#6B1E3E]">Eau fraîche et pétillante à volonté</span>
            </h1>
            <p className="text-xl text-[#8B7E74] max-w-3xl mx-auto leading-relaxed">
              Le module CUBE est intégré à chaque robinet HYDRAL. Obtenez instantanément de l'eau froide filtrée, plate ou gazeuse, directement du robinet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Avantages CUBE */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Thermometer className="w-8 h-8" />,
                title: 'Eau réfrigérée',
                description: 'Fraîche à 4°C en continu'
              },
              {
                icon: <Droplets className="w-8 h-8" />,
                title: 'Filtration 5 étapes',
                description: 'Eau pure, sans chlore ni impuretés'
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'Eau pétillante',
                description: 'CO₂ intégré, jusqu\'à 60L'
              },
              {
                icon: <Recycle className="w-8 h-8" />,
                title: 'Zéro plastique',
                description: 'Fini les bouteilles à transporter'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-gradient-to-br from-white to-[#FAF8F5] rounded-3xl border border-gray-200 hover:border-[#6B1E3E]/30 hover:shadow-xl transition-all"
              >
                <div className="mb-4 text-[#6B1E3E] flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-[#8B7E74]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mb-8 text-gray-900">
                Fonctionnement
                <span className="block text-[#6B1E3E]">simple et efficace</span>
              </h2>
              
              <ul className="space-y-4">
                {[
                  'Module réfrigérant compact sous évier',
                  'Filtre haute performance à charbon actif',
                  'Système CO₂ avec détendeur intégré',
                  'Température réglable 4-12°C',
                  'Cartouche CO₂ 425g = 60L d\'eau pétillante',
                  'Filtration : 1 cartouche = 6 mois',
                  'Installation rapide en environ 1h'
                ].map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-[#6B1E3E] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="aspect-square bg-gradient-to-br from-[#F5F1ED] to-white rounded-3xl shadow-2xl border border-gray-200 p-12 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-32 h-32 text-[#6B1E3E]/20 mx-auto mb-4" />
                <div className="text-2xl text-gray-900">Module CUBE</div>
                <div className="text-[#8B7E74]">Inclus avec HYDRAL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E54] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="mb-6">
            CUBE inclus
            <span className="block">dans chaque HYDRAL</span>
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Profitez de l'eau fraîche et pétillante sans supplément.
          </p>
          
          <motion.button
            onClick={() => navigate('configurator')}
            className="px-12 py-5 bg-white text-[#6B1E3E] rounded-full font-medium text-lg hover:bg-[#FAF8F5] transition-colors shadow-2xl"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Choisir mon HYDRAL
            <ChevronRight className="inline w-6 h-6 ml-2" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}