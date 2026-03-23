import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-gray-500 mb-4 font-light tracking-wider uppercase">
              À propos d'HYDRAL
            </div>
            
            <h2 className="text-4xl lg:text-5xl mb-8 text-gray-900 font-light leading-tight">
              L'innovation au service
              <br />
              de votre quotidien
            </h2>

            <div className="space-y-6 text-gray-600 font-light leading-relaxed">
              <p>
                HYDRAL révolutionne l'expérience de l'eau en cuisine avec une technologie premium accessible à tous. Notre robinet 5-en-1 combine eau bouillante instantanée, filtrée, réfrigérée, pétillante et mitigeur classique.
              </p>
              
              <p>
                Conçu et fabriqué en Europe selon les plus hauts standards de qualité, chaque robinet HYDRAL est le résultat de trois années de recherche et développement pour offrir performance, sécurité et élégance.
              </p>
            </div>

            <motion.button
              className="inline-flex items-center gap-2 mt-10 text-gray-900 hover:gap-3 transition-all group"
              whileHover={{ x: 4 }}
            >
              <span>Notre histoire</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop"
                alt="Technologie HYDRAL"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-xs"
            >
              <div className="text-4xl mb-2 font-light text-gray-900">5 en 1</div>
              <div className="text-sm text-gray-600 font-light">
                Tous les types d'eau dont vous avez besoin, en un seul robinet
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}