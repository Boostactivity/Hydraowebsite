import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BeforeAfterSection() {
  const [isAfter, setIsAfter] = useState(false);

  const beforePoints = [
    'Bouteilles plastique partout',
    'Bouilloire qui prend de la place',
    'Attente quotidienne',
    'Courses hebdomadaires lourdes'
  ];

  const afterPoints = [
    'Cuisine épurée et moderne',
    'Robinet 5-en-1 design',
    'Eau instant anée à volonté',
    'Zéro course, zéro stockage'
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8 border border-[#6B1E3E]/20"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Transformation visible</span>
          </motion.div>

          <h2 className="mb-6 text-gray-900">
            Avant / Après HYDRAL
            <span className="block text-[#6B1E3E]">La différence au quotidien</span>
          </h2>
          <p className="text-xl text-[#8B7E74] font-light max-w-2xl mx-auto">
            Découvrez comment HYDRAL transforme votre cuisine et votre routine.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* AVANT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-6 -left-6 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl font-medium shadow-lg z-10">
              ❌ AVANT
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-300">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800"
                alt="Cuisine avant HYDRAL avec bouteilles"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="mt-8 space-y-3">
              {beforePoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* APRÈS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-6 -right-6 px-6 py-3 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl font-medium shadow-lg z-10">
              ✨ APRÈS HYDRAL
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"
                alt="Cuisine moderne avec robinet HYDRAL"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#6B1E3E]/40 to-transparent" />
              
              {/* Badge "Gain de place" overlay */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute top-6 left-6 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium text-[#6B1E3E] shadow-lg"
              >
                +40% d'espace récupéré
              </motion.div>
            </div>

            <div className="mt-8 space-y-3">
              {afterPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#E8D5DC]/20 to-white rounded-xl border border-[#6B1E3E]/20"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-900 font-medium">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats de transformation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { value: '100%', label: 'Bouteilles éliminées' },
            { value: '0 seconde', label: 'Temps d\'attente' },
            { value: '40%', label: 'Espace récupéré' },
            { value: '1 000€', label: 'Économisés/an' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-gradient-to-br from-[#FAF8F5] to-white rounded-2xl border-2 border-gray-200"
            >
              <div className="text-4xl font-light text-[#6B1E3E] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}