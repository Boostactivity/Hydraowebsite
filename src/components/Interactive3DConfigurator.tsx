import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Rotate3D, Maximize2, Check, ChevronRight, Sparkles, Info } from 'lucide-react';
import { Page } from '../App';

interface Finish {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient: string;
  price: number;
  popular?: boolean;
}

interface Interactive3DConfiguratorProps {
  navigate: (page: Page) => void;
}

export function Interactive3DConfigurator({ navigate }: Interactive3DConfiguratorProps) {
  const [selectedFinish, setSelectedFinish] = useState('chrome');
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [zoom, setZoom] = useState(1);

  const finishes: Finish[] = [
    {
      id: 'chrome',
      name: 'Chrome poli',
      description: 'Finition classique brillante',
      color: '#E8E8E8',
      gradient: 'from-gray-300 to-gray-100',
      price: 0,
      popular: true
    },
    {
      id: 'brushed',
      name: 'Acier brossé',
      description: 'Finition moderne mate',
      color: '#C0C0C0',
      gradient: 'from-gray-400 to-gray-300',
      price: 0
    },
    {
      id: 'black',
      name: 'Noir mat',
      description: 'Finition premium contemporaine',
      color: '#1A1A1A',
      gradient: 'from-gray-800 to-gray-900',
      price: 0,
      popular: true
    },
    {
      id: 'gold',
      name: 'Or brossé',
      description: 'Finition luxe exclusive',
      color: '#D4AF37',
      gradient: 'from-yellow-600 to-yellow-800',
      price: 0
    },
    {
      id: 'copper',
      name: 'Cuivre',
      description: 'Finition tendance chaleureuse',
      color: '#B87333',
      gradient: 'from-orange-600 to-orange-800',
      price: 0
    },
    {
      id: 'white',
      name: 'Blanc mat',
      description: 'Finition épurée scandinave',
      color: '#F5F5F5',
      gradient: 'from-gray-100 to-white',
      price: 0
    }
  ];

  const selectedFinishData = finishes.find(f => f.id === selectedFinish) || finishes[0];

  const handleRotate = () => {
    setIsRotating(true);
    setRotation(prev => prev + 90);
    setTimeout(() => setIsRotating(false), 600);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.8));
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="section-container max-w-7xl mx-auto">
        {/* Header */}
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
            className="inline-flex items-center gap-2 px-5 py-2.5 gradient-bordeaux text-white rounded-full mb-6 shadow-lg"
          >
            <Rotate3D className="w-5 h-5" />
            <span className="text-sm uppercase tracking-wider font-medium">Configurateur 3D</span>
          </motion.div>

          <h2 className="mb-4 text-gray-900">
            Visualisez votre robinet HYDRAO
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Toutes les finitions au même prix • Vue 360° interactive
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Viewer 3D */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-gray-100 to-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 aspect-square"
            >
              {/* Grille de fond */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className="border border-gray-400" />
                  ))}
                </div>
              </div>

              {/* Produit 3D simulé */}
              <div className="relative h-full flex items-center justify-center p-12">
                <motion.div
                  animate={{ 
                    rotateY: rotation,
                    scale: zoom
                  }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }}
                  className="relative w-full h-full"
                >
                  {/* Ombre portée */}
                  <motion.div
                    animate={{ scale: zoom }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 rounded-full blur-xl"
                  />

                  {/* Robinet stylisé */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                      className={`w-48 h-96 rounded-3xl bg-gradient-to-br ${selectedFinishData.gradient} shadow-2xl relative overflow-hidden`}
                      style={{
                        boxShadow: `
                          0 20px 60px rgba(0,0,0,0.3),
                          inset 0 2px 4px rgba(255,255,255,0.3),
                          inset 0 -2px 4px rgba(0,0,0,0.2)
                        `
                      }}
                    >
                      {/* Reflets */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20" />
                      <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-white/30 blur-2xl" />
                      
                      {/* Détails robinet */}
                      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-white/20 to-black/10 shadow-inner" />
                      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-16 h-32 bg-gradient-to-b from-black/10 to-white/10 rounded-lg" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Badge "Vue 360°" */}
                <motion.div
                  animate={{ rotate: isRotating ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Rotate3D className="w-4 h-4" />
                    <span>Vue 360°</span>
                  </div>
                </motion.div>
              </div>

              {/* Contrôles */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRotate}
                  disabled={isRotating}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors disabled:opacity-50"
                >
                  <Rotate3D className="w-5 h-5 mx-auto text-gray-700" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomOut}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <span className="text-xl text-gray-700">−</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomIn}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <span className="text-xl text-gray-700">+</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Info produit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl"
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Toutes les finitions au même prix</h4>
                  <p className="text-sm text-gray-600">
                    Aucun supplément pour les finitions premium. Choisissez celle qui correspond à votre style.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sélecteur de finitions */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-6 h-6 text-[#6B1E3E]" />
                  <h3 className="text-xl font-medium text-gray-900">Choisir la finition</h3>
                </div>

                <div className="space-y-3 mb-6">
                  {finishes.map((finish) => (
                    <motion.button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish.id)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        selectedFinish === finish.id
                          ? 'border-[#6B1E3E] bg-[#6B1E3E]/5 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Échantillon couleur */}
                        <div 
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${finish.gradient} shadow-md border-2 border-white flex items-center justify-center`}
                        >
                          {selectedFinish === finish.id && (
                            <Check className="w-6 h-6 text-white drop-shadow-lg" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{finish.name}</h4>
                            {finish.popular && (
                              <span className="px-2 py-0.5 bg-[#D4AF37] text-white text-xs rounded-full">
                                Populaire
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{finish.description}</p>
                        </div>

                        {/* Prix */}
                        <div className="text-right">
                          <div className="text-lg font-medium text-gray-900">
                            {finish.price === 0 ? 'Inclus' : `+${finish.price}€`}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Résumé sélection */}
                <div className="p-4 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-xl mb-6">
                  <div className="text-sm mb-2">Finition sélectionnée :</div>
                  <div className="text-xl font-medium mb-4">{selectedFinishData.name}</div>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-light">490€</span>
                    <span className="text-white/80">TTC</span>
                  </div>

                  <div className="space-y-2 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>Garantie 5 ans</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => navigate('configurator')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 gradient-bordeaux text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Configurer mon robinet
                  <ChevronRight className="w-5 h-5" />
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Paiement en 3× sans frais disponible
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}