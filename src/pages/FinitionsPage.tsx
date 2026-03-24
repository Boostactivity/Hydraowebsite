import React from 'react';
import { Page } from '../App';
import { finishes } from '../data/products';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FinitionsPageProps {
  navigate: (page: Page) => void;
}

export function FinitionsPage({ navigate }: FinitionsPageProps) {
  return (
    <div className="bg-[#FAF8F5]">
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
              <span className="block text-gray-900">Finitions</span>
              <span className="block text-[#6B1E3E]">Le détail qui fait tout</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              8 finitions élégantes pour s'harmoniser parfaitement avec votre cuisine
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {finishes.map((finish, index) => (
              <motion.div
                key={finish.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className={`aspect-square rounded-2xl ${finish.color} shadow-lg mb-6 group-hover:scale-105 transition-transform`}></div>
                <h3 className="text-xl mb-2 text-gray-900">{finish.name}</h3>
                {finish.premium && (
                  <p className="text-[#D4AF37] mb-2 text-sm font-medium">Finition Premium</p>
                )}
                <p className="text-[#8B7E74] text-sm leading-relaxed mb-4">
                  {finish.id === 'chrome' && 'Brillance éclatante, facile d\'entretien, classique intemporel'}
                  {finish.id === 'brushed' && 'Aspect mat élégant, résistant aux traces, style contemporain'}
                  {finish.id === 'black-matt' && 'Élégance moderne, design audacieux, ultra-tendance'}
                  {finish.id === 'white-matt' && 'Pureté minimaliste, lumière douce, style scandinave'}
                  {finish.id === 'gold' && 'Luxe raffiné, éclat chaleureux, prestige absolu'}
                  {finish.id === 'copper' && 'Chaleur authentique, caractère unique, tendance industrielle'}
                  {finish.id === 'champagne' && 'Élégance discrète, raffinement subtil, chic intemporel'}
                  {finish.id === 'gunmetal' && 'Modernité affirmée, robustesse apparente, style urbain'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-6 text-gray-900">Toutes les finitions sont compatibles</h2>
          <p className="text-xl text-[#8B7E74] mb-10 max-w-2xl mx-auto">
            Quelle que soit la finition choisie, vous bénéficiez de la même qualité premium et des 5 types d'eau.
          </p>
          <motion.button
            onClick={() => navigate('configurator')}
            className="px-10 py-4 bg-[#6B1E3E] text-white rounded-full hover:bg-[#6B1E3E]/90 transition-colors inline-flex items-center gap-3"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Configurer mon robinet
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
