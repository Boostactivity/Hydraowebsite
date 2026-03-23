import React, { useState } from 'react';
import { Page } from '../App';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { faucetModels, finishes } from '../data/products';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface GammePageProps {
  navigate: (page: Page, params?: any) => void;
}

export function GammePage({ navigate }: GammePageProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>('all');

  const filteredModels = selectedStyle === 'all' 
    ? faucetModels 
    : faucetModels.filter(m => m.style === selectedStyle);

  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 bg-gradient-to-br from-white via-[#FAF8F5] to-[#E8D5DC]/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-8">
              <span className="block text-gray-900">5 modèles</span>
              <span className="block text-[#6B1E3E]">Un seul choix : le vôtre</span>
            </h1>
            <p className="text-xl text-[#8B7E74] leading-relaxed max-w-3xl mx-auto">
              Chaque modèle est pensé pour un usage, un style, une cuisine. Tous offrent les 5 types d'eau. La différence, c'est vous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8 bg-white border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { value: 'all', label: 'Tous les modèles' },
              { value: 'modern', label: 'Moderne' },
              { value: 'minimalist', label: 'Minimaliste' },
              { value: 'classic', label: 'Classique' },
              { value: 'industrial', label: 'Professionnel' }
            ].map(filter => (
              <motion.button
                key={filter.value}
                onClick={() => setSelectedStyle(filter.value)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedStyle === filter.value
                    ? 'bg-[#6B1E3E] text-white shadow-lg'
                    : 'bg-[#FAF8F5] border border-gray-200 hover:border-[#6B1E3E]/30 text-gray-700'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Modèles */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200/50"
              >
                <div className="h-80 bg-gradient-to-br from-[#F5F1ED] to-white relative overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1701510453951-425c888e3407?w=600"
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-[#6B1E3E] text-white rounded-full shadow-lg">
                    {model.name}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl">
                      <p className="text-sm text-gray-700">{model.shortDesc}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-[#8B7E74] mb-6 leading-relaxed">{model.description}</p>
                  
                  <div className="mb-6">
                    <p className="text-sm text-[#8B7E74] mb-3">Caractéristiques :</p>
                    <ul className="space-y-2">
                      {model.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Check className="w-3 h-3 text-[#6B1E3E]" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-[#8B7E74] mb-3">Finitions disponibles :</p>
                    <div className="flex gap-2 flex-wrap">
                      {model.finishes.slice(0, 5).map(finishId => {
                        const finish = finishes.find(f => f.id === finishId);
                        if (!finish) return null;
                        return (
                          <div
                            key={finishId}
                            className={`w-8 h-8 rounded-full ${finish.color} border-2 border-gray-200 shadow-sm`}
                            title={finish.name}
                          />
                        );
                      })}
                      {model.finishes.length > 5 && (
                        <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border-2 border-gray-200 flex items-center justify-center text-xs text-gray-600">
                          +{model.finishes.length - 5}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      onClick={() => navigate('product', { productId: model.id })}
                      className="flex-1 px-6 py-3 bg-[#6B1E3E] text-white rounded-full hover:bg-[#6B1E3E]/90 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Découvrir
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      onClick={() => navigate('configurator')}
                      className="px-6 py-3 bg-white border border-[#6B1E3E]/30 text-[#6B1E3E] rounded-full hover:bg-[#6B1E3E]/5 transition-colors"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Configurer
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}