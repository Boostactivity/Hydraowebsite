import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, ArrowLeft, ArrowRight, MapPin, Eye, Sparkles, Play, Info, ShoppingCart, X } from 'lucide-react';
import { Page } from '../App';

interface VirtualShowroomProps {
  navigate: (page: Page) => void;
}

interface ShowroomScene {
  id: string;
  name: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
}

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  productId: string;
  productName: string;
  price: string;
}

export function VirtualShowroom({ navigate }: VirtualShowroomProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTour, setShowTour] = useState(false);

  // Mock showroom scenes
  const scenes: ShowroomScene[] = [
    {
      id: 'kitchen-modern',
      name: 'Cuisine Moderne',
      description: 'Design épuré avec finitions chromées',
      image: '',
      hotspots: [
        { id: '1', x: 45, y: 40, productId: 'premium', productName: 'HYDRAL One', price: '490€' },
        { id: '2', x: 60, y: 55, productId: 'filtre', productName: 'Filtre Charbon', price: '29€' }
      ]
    },
    {
      id: 'kitchen-industrial',
      name: 'Cuisine Industrielle',
      description: 'Style loft avec finitions noires mates',
      image: '',
      hotspots: [
        { id: '3', x: 50, y: 45, productId: 'premium', productName: 'HYDRAL One Black', price: '490€' }
      ]
    },
    {
      id: 'kitchen-classic',
      name: 'Cuisine Classique',
      description: 'Élégance intemporelle avec finitions dorées',
      image: '',
      hotspots: [
        { id: '4', x: 48, y: 42, productId: 'premium', productName: 'HYDRAL One Gold', price: '490€' }
      ]
    }
  ];

  const currentScene = scenes[currentSceneIndex];

  const handleNextScene = () => {
    setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
    setSelectedHotspot(null);
  };

  const handlePrevScene = () => {
    setCurrentSceneIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
    setSelectedHotspot(null);
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    setSelectedHotspot(selectedHotspot?.id === hotspot.id ? null : hotspot);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#6B1E3E]/30 rounded-full text-[#E8D5DC] text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>EXPÉRIENCE IMMERSIVE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white mb-4"
          >
            Showroom Virtuel 3D
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Explorez nos robinets HYDRAL dans différents environnements et styles de cuisine
          </motion.p>
        </div>

        {/* Virtual Showroom Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className={`relative bg-black rounded-3xl overflow-hidden shadow-2xl ${
            isFullscreen ? 'fixed inset-4 z-50' : ''
          }`}
        >
          {/* Scene Image with Hotspots */}
          <div className="relative aspect-video">
            {currentScene.image ? (
              <img
                src={currentScene.image}
                alt={currentScene.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-2xl text-white/60 font-light">{currentScene.name}</span>
              </div>
            )}

            {/* Hotspots */}
            {currentScene.hotspots.map((hotspot) => (
              <motion.button
                key={hotspot.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleHotspotClick(hotspot)}
                className="absolute group"
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              >
                {/* Pulsing circle */}
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 rounded-full"
                  />
                  <div className="relative w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Hotspot label (on hover) */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="px-3 py-2 bg-white rounded-lg shadow-xl whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{hotspot.productName}</div>
                    <div className="text-xs text-[#8B7E74]">{hotspot.price}</div>
                  </div>
                  <div className="w-2 h-2 bg-white rotate-45 mx-auto -mt-1" />
                </div>
              </motion.button>
            ))}

            {/* Scene info overlay */}
            <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
              <div className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-4 text-white max-w-md">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold">{currentScene.name}</h3>
                </div>
                <p className="text-sm text-gray-300">{currentScene.description}</p>
              </div>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-3 bg-black/60 backdrop-blur-md rounded-xl text-white hover:bg-black/80 transition-colors"
              >
                {isFullscreen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Maximize2 className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Navigation arrows */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <button
                onClick={handlePrevScene}
                className="p-4 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              {/* Scene indicators */}
              <div className="flex items-center gap-2">
                {scenes.map((scene, index) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      setCurrentSceneIndex(index);
                      setSelectedHotspot(null);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSceneIndex
                        ? 'bg-cyan-500 w-8'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextScene}
                className="p-4 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-colors"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* Hotspot count badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-cyan-500 rounded-full text-white text-sm font-semibold">
              {currentScene.hotspots.length} {currentScene.hotspots.length > 1 ? 'produits' : 'produit'} à découvrir
            </div>
          </div>

          {/* Selected Hotspot Details */}
          <AnimatePresence>
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-8"
              >
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-2">
                        {selectedHotspot.productName}
                      </h4>
                      <p className="text-gray-400 mb-4">
                        Robinet 5-en-1 avec filtration intégrée et eau pétillante à la demande
                      </p>
                      <div className="text-3xl font-bold text-cyan-400 mb-4">
                        {selectedHotspot.price}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => navigate('product')}
                        className="px-6 py-3 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-600 transition-colors flex items-center gap-2"
                      >
                        <Info className="w-5 h-5" />
                        <span>Détails</span>
                      </button>

                      <button
                        onClick={() => navigate('configurator')}
                        className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Commander</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-gray-800 rounded-2xl border border-gray-700"
          >
            <Eye className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Vision 360°
            </h3>
            <p className="text-gray-400">
              Explorez chaque recoin de nos environnements en haute définition
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-gray-800 rounded-2xl border border-gray-700"
          >
            <MapPin className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Points d'intérêt
            </h3>
            <p className="text-gray-400">
              Cliquez sur les hotspots pour découvrir les détails des produits
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-6 bg-gray-800 rounded-2xl border border-gray-700"
          >
            <Sparkles className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              3 Ambiances
            </h3>
            <p className="text-gray-400">
              Moderne, Industriel, Classique - Trouvez votre style
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <motion.button
            onClick={() => navigate('configurator')}
            className="px-8 py-4 bg-white text-[#6B1E3E] rounded-full font-medium text-lg hover:bg-[#FAF8F5] transition-colors shadow-lg"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Choisissez votre HYDRAL
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Virtual Showroom CTA Button
export function VirtualShowroomCTA({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="px-6 py-4 bg-[#6B1E3E] text-white rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[#6B1E3E]/90 transition-colors shadow-lg"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Eye className="w-5 h-5" />
      <span>Showroom Virtuel</span>
      <div className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
        3D
      </div>
    </motion.button>
  );
}