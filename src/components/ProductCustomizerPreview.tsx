import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Droplet, Ruler, Check } from 'lucide-react';

export function ProductCustomizerPreview() {
  const [selectedFinish, setSelectedFinish] = useState('chrome');
  const [selectedHeight, setSelectedHeight] = useState('standard');
  const [selectedStyle, setSelectedStyle] = useState('modern');

  const finishes = [
    { id: 'chrome', name: 'Chrome', color: 'bg-gradient-to-br from-gray-300 to-gray-400', price: 0, popular: true },
    { id: 'brushed', name: 'Brossé', color: 'bg-gradient-to-br from-gray-400 to-gray-500', price: 0 },
    { id: 'black', name: 'Noir mat', color: 'bg-gradient-to-br from-gray-800 to-black', price: 0 },
    { id: 'gold', name: 'Or rose', color: 'bg-gradient-to-br from-[#B76E79] to-[#D4AF37]', price: 50 },
    { id: 'brass', name: 'Laiton', color: 'bg-gradient-to-br from-[#D4AF37] to-[#B8941F]', price: 50 }
  ];

  const heights = [
    { id: 'compact', name: 'Compact', value: '28cm', description: 'Idéal pour petits espaces', price: 0 },
    { id: 'standard', name: 'Standard', value: '35cm', description: 'Le plus polyvalent', price: 0, popular: true },
    { id: 'high', name: 'Haut', value: '42cm', description: 'Pour grandes casseroles', price: 30 }
  ];

  const styles = [
    { id: 'modern', name: 'Moderne', description: 'Lignes épurées et minimalistes', icon: '⬜' },
    { id: 'classic', name: 'Classique', description: 'Élégance intemporelle', icon: '⬛' },
    { id: 'industrial', name: 'Industriel', description: 'Style loft urbain', icon: '⬛' }
  ];

  const currentFinish = finishes.find(f => f.id === selectedFinish);
  const currentHeight = heights.find(h => h.id === selectedHeight);
  const currentStyle = styles.find(s => s.id === selectedStyle);

  const totalExtraPrice = (currentFinish?.price || 0) + (currentHeight?.price || 0);
  const basePrice = 490;
  const finalPrice = basePrice + totalExtraPrice;

  return (
    <section className="section-padding bg-gradient-to-br from-white to-[#FAF8F5]">
      <div className="section-container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6B1E3E]/10 text-[#6B1E3E] rounded-full mb-8"
          >
            <Palette className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Personnalisez votre robinet</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Choisissez votre robinet HYDRAO idéal
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Toutes les finitions au même prix. Changez d'avis ? Pas de frais supplémentaires.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Preview 3D (côté gauche) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border-2 border-gray-200 relative overflow-hidden">
              {/* Fond dynamique selon la finition */}
              <div className={`absolute inset-0 opacity-5 ${currentFinish?.color}`} />
              
              <div className="relative z-10">
                {/* Illustration du robinet (simplifié) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedFinish}-${selectedHeight}-${selectedStyle}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center min-h-[400px]"
                  >
                    {/* Représentation stylisée du robinet */}
                    <div className={`w-32 h-${selectedHeight === 'compact' ? '48' : selectedHeight === 'high' ? '64' : '56'} ${currentFinish?.color} rounded-t-full relative shadow-2xl`}>
                      {/* Bec verseur */}
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 ${currentFinish?.color} rounded-b-xl`} />
                      
                      {/* Poignée */}
                      <div className={`absolute top-8 -right-8 w-12 h-12 ${currentFinish?.color} rounded-full`} />
                    </div>
                    
                    {/* Détails */}
                    <div className="mt-8 text-center">
                      <div className="text-sm text-gray-500 mb-2">Aperçu de votre sélection</div>
                      <div className="text-lg text-gray-900 font-medium">{currentFinish?.name} • {currentHeight?.value}</div>
                      <div className="text-sm text-gray-600">{currentStyle?.name}</div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Badge prix */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-6 right-6 px-4 py-2 bg-white rounded-xl shadow-lg"
                >
                  <div className="text-xs text-gray-500">Prix total</div>
                  <div className="text-2xl text-[#6B1E3E] font-light">
                    {finalPrice}€
                    {totalExtraPrice > 0 && (
                      <span className="text-sm text-gray-400 ml-2">
                        (+{totalExtraPrice}€)
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Note importante */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 p-4 bg-[#6B1E3E]/5 rounded-xl border border-[#6B1E3E]/20 text-center"
            >
              <p className="text-sm text-gray-700">
                ✨ <span className="font-medium">Livraison sous 7 jours</span> • Garantie 5 ans
              </p>
            </motion.div>
          </motion.div>

          {/* Options de personnalisation (côté droit) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Finition */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#6B1E3E]/10 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-[#6B1E3E]" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">Finition</h3>
                  <p className="text-sm text-gray-600">Toutes les finitions au même prix de base</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {finishes.map((finish) => (
                  <motion.button
                    key={finish.id}
                    onClick={() => setSelectedFinish(finish.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      selectedFinish === finish.id
                        ? 'border-[#6B1E3E] bg-[#6B1E3E]/5'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {finish.popular && (
                      <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#D4AF37] text-white text-xs rounded-full">
                        Populaire
                      </div>
                    )}
                    
                    <div className={`w-12 h-12 ${finish.color} rounded-full mx-auto mb-2 shadow-md`} />
                    <div className="text-sm text-gray-900 font-medium mb-1">{finish.name}</div>
                    {finish.price > 0 && (
                      <div className="text-xs text-[#6B1E3E]">+{finish.price}€</div>
                    )}
                    
                    {selectedFinish === finish.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-[#6B1E3E] rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Hauteur */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#6B1E3E]/10 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-[#6B1E3E]" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">Hauteur</h3>
                  <p className="text-sm text-gray-600">Adaptez selon votre usage</p>
                </div>
              </div>

              <div className="space-y-3">
                {heights.map((height) => (
                  <motion.button
                    key={height.id}
                    onClick={() => setSelectedHeight(height.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedHeight === height.id
                        ? 'border-[#6B1E3E] bg-[#6B1E3E]/5'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-900 font-medium">{height.name}</span>
                          <span className="text-[#6B1E3E] text-sm">({height.value})</span>
                          {height.popular && (
                            <span className="px-2 py-0.5 bg-[#D4AF37] text-white text-xs rounded-full">
                              Populaire
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{height.description}</div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {height.price > 0 && (
                          <span className="text-sm text-[#6B1E3E]">+{height.price}€</span>
                        )}
                        {selectedHeight === height.id && (
                          <div className="w-6 h-6 bg-[#6B1E3E] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#6B1E3E]/10 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-[#6B1E3E]" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">Style</h3>
                  <p className="text-sm text-gray-600">Harmonie avec votre cuisine</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {styles.map((style) => (
                  <motion.button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      selectedStyle === style.id
                        ? 'border-[#6B1E3E] bg-[#6B1E3E]/5'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{style.icon}</div>
                    <div className="text-sm text-gray-900 font-medium mb-1">{style.name}</div>
                    <div className="text-xs text-gray-600">{style.description}</div>
                    
                    {selectedStyle === style.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-[#6B1E3E] rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky bottom-6 pt-6 bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600">Prix total</div>
                  <div className="text-3xl text-[#6B1E3E] font-light">{finalPrice}€</div>
                  {totalExtraPrice > 0 && (
                    <div className="text-xs text-gray-500">Prix de base : {basePrice}€ + options : {totalExtraPrice}€</div>
                  )}
                </div>
                <button className="px-8 py-4 gradient-bordeaux text-white rounded-full font-medium hover:shadow-xl transition-all">
                  Ajouter au panier
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-600 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  <span>Livraison 7j</span>
                </div>
                <div className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-green-600" />
                  <span>Garantie 5 ans</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}