import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';

interface ProductImage {
  id: number;
  url: string;
  alt: string;
  type: 'main' | 'detail' | 'lifestyle' | 'installation';
}

export function AdvancedProductGallery() {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const images: ProductImage[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1610177534644-34d881503b83?w=1200',
      alt: 'Robinet HYDRAL 5-en-1 en situation',
      type: 'main'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200',
      alt: 'Détail du robinet HYDRAL',
      type: 'detail'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
      alt: 'Installation dans cuisine moderne',
      type: 'lifestyle'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
      alt: 'Module de filtration sous évier',
      type: 'installation'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200',
      alt: 'Cuisine contemporaine avec HYDRAL',
      type: 'lifestyle'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200',
      alt: 'Finitions premium disponibles',
      type: 'detail'
    }
  ];

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
    setRotation(0);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
    setRotation(0);
  };

  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white to-[#FAF8F5]">
      <div className="section-container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-gray-900">Découvrez HYDRAL en détail</h2>
          <p className="text-xl text-gray-600">Design premium • Finitions soignées • Installation simple</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Galerie principale */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200"
            >
              {/* Image principale */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={images[activeImage].url}
                    alt={images[activeImage].alt}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      scale: isZoomed ? 1.5 : 1,
                      rotate: rotation
                    }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </AnimatePresence>

                {/* Contrôles image */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={rotate}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <RotateCw className="w-5 h-5 text-gray-700" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    {isZoomed ? (
                      <ZoomOut className="w-5 h-5 text-gray-700" />
                    ) : (
                      <ZoomIn className="w-5 h-5 text-gray-700" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFullscreen(true)}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <Maximize2 className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </div>

                {/* Navigation */}
                <motion.button
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </motion.button>

                {/* Indicateur */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm">
                  {activeImage + 1} / {images.length}
                </div>
              </div>

              {/* Info image */}
              <div className="p-6 bg-gradient-to-r from-[#FAF8F5] to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {images[activeImage].alt}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {images[activeImage].type === 'main' && '📸 Vue principale'}
                      {images[activeImage].type === 'detail' && '🔍 Détail produit'}
                      {images[activeImage].type === 'lifestyle' && '🏠 En situation'}
                      {images[activeImage].type === 'installation' && '🔧 Installation'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {images.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`h-1 rounded-full transition-all ${
                          index === activeImage
                            ? 'w-8 bg-[#6B1E3E]'
                            : 'w-1 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Miniatures */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-4">
              {images.map((image, index) => (
                <motion.button
                  key={image.id}
                  onClick={() => {
                    setActiveImage(index);
                    setRotation(0);
                    setIsZoomed(false);
                  }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all ${
                    activeImage === index
                      ? 'border-[#6B1E3E] shadow-lg shadow-[#6B1E3E]/30'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  {activeImage === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-[#6B1E3E]/20 backdrop-blur-[1px]"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Info produit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 p-6 bg-gradient-to-br from-[#6B1E3E] to-[#8B2E4E] text-white rounded-2xl shadow-xl"
            >
              <h4 className="font-medium mb-4">Caractéristiques premium</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  Acier inoxydable 304
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  Finitions brossées ou chromées
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  Cartouche céramique haute durabilité
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  Design minimaliste français
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                  Garantie 5 ans
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Mode fullscreen */}
        <AnimatePresence>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
              onClick={() => setIsFullscreen(false)}
            >
              <img
                src={images[activeImage].url}
                alt={images[activeImage].alt}
                className="max-w-full max-h-full object-contain"
                style={{ transform: `rotate(${rotation}deg)` }}
              />
              
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-8 right-8 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors"
              >
                ✕
              </button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); rotate(); }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <RotateCw className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}