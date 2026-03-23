import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onConfigureClick: () => void;
}

export function Hero({ onConfigureClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop"
          alt="Cuisine moderne HYDRAL"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge Premium Accessible - CORRIGÉ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] rounded-full border border-white/20 mb-6 shadow-lg"
          >
            <span className="text-sm text-white font-medium">✨ Premium accessible : 490€ au lieu de 1500-3000€</span>
          </motion.div>

          {/* Badge Nouveau */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm text-white/90 font-light">Nouveau : FLEX disponible</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl lg:text-7xl mb-6 text-white font-light leading-tight"
          >
            Cinq types d'eau.
            <br />
            Un seul robinet.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg lg:text-xl text-white/80 mb-12 font-light leading-relaxed"
          >
            Eau bouillante instantanée, filtrée, réfrigérée et pétillante.
            <br />
            La révolution de l'eau dans votre cuisine.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={onConfigureClick}
              className="group px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Configurer votre robinet</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.a
              href="#products"
              className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 hover:border-white/50 transition-colors text-center backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Découvrir les produits
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/10"
          >
            <div>
              <div className="text-3xl text-white mb-2 font-light">490€</div>
              <div className="text-sm text-white/60 font-light">Prix TTC</div>
            </div>
            <div>
              <div className="text-3xl text-white mb-2 font-light">5 ans</div>
              <div className="text-sm text-white/60 font-light">Garantie</div>
            </div>
            <div>
              <div className="text-3xl text-white mb-2 font-light">100°C</div>
              <div className="text-sm text-white/60 font-light">Instantané</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}