import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';

interface Product360ViewProps {
  productName?: string;
}

export function Product360View({ productName = 'Robinet HYDRAO 5-en-1' }: Product360ViewProps) {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Simulation d'angles avec différentes images
  const angles = [
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
    'https://images.unsplash.com/photo-1610177534644-34d881503b83?w=1200'
  ];

  const totalAngles = angles.length;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const delta = e.clientX - startX;
    const sensitivity = 5;
    
    if (Math.abs(delta) > sensitivity) {
      const direction = delta > 0 ? 1 : -1;
      setCurrentAngle((prev) => (prev + direction + totalAngles) % totalAngles);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientX - startX;
    const sensitivity = 10;
    
    if (Math.abs(delta) > sensitivity) {
      const direction = delta > 0 ? 1 : -1;
      setCurrentAngle((prev) => (prev + direction + totalAngles) % totalAngles);
      setStartX(e.touches[0].clientX);
    }
  };

  const rotate = (direction: 'left' | 'right') => {
    const step = direction === 'right' ? 1 : -1;
    setCurrentAngle((prev) => (prev + step + totalAngles) % totalAngles);
  };

  const ViewContent = () => (
    <div className="relative">
      {/* Main Image */}
      <motion.div
        className={`relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } select-none`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentAngle}
            src={angles[currentAngle]}
            alt={`${productName} - Vue ${currentAngle + 1}`}
            className={`w-full h-full object-cover transition-transform ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            draggable={false}
          />
        </AnimatePresence>

        {/* Drag indicator */}
        <motion.div
          animate={{ opacity: isDragging ? 0 : 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-6 py-3 bg-black/60 backdrop-blur-sm text-white rounded-full text-sm font-medium"
          >
            👆 Faites glisser pour faire pivoter
          </motion.div>
        </motion.div>

        {/* Angle indicator */}
        <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg">
          Vue {currentAngle + 1}/{totalAngles}
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {/* Rotate Left */}
        <motion.button
          onClick={() => rotate('left')}
          className="p-3 bg-white border-2 border-gray-200 rounded-full hover:border-[#6B1E3E] hover:bg-[#6B1E3E] hover:text-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCw className="w-5 h-5 transform -scale-x-100" />
        </motion.button>

        {/* Auto Rotate */}
        <motion.button
          onClick={() => {
            const interval = setInterval(() => {
              setCurrentAngle((prev) => (prev + 1) % totalAngles);
            }, 500);
            setTimeout(() => clearInterval(interval), 5000);
          }}
          className="px-6 py-3 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <RotateCw className="w-4 h-4" />
            <span>Rotation auto</span>
          </div>
        </motion.button>

        {/* Rotate Right */}
        <motion.button
          onClick={() => rotate('right')}
          className="p-3 bg-white border-2 border-gray-200 rounded-full hover:border-[#6B1E3E] hover:bg-[#6B1E3E] hover:text-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCw className="w-5 h-5" />
        </motion.button>

        {/* Zoom Toggle */}
        <motion.button
          onClick={() => setIsZoomed(!isZoomed)}
          className={`p-3 border-2 rounded-full transition-all ${
            isZoomed
              ? 'bg-[#6B1E3E] border-[#6B1E3E] text-white'
              : 'bg-white border-gray-200 hover:border-[#6B1E3E]'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
        </motion.button>

        {/* Fullscreen */}
        {!isFullscreen && (
          <motion.button
            onClick={() => setIsFullscreen(true)}
            className="p-3 bg-white border-2 border-gray-200 rounded-full hover:border-[#6B1E3E] hover:bg-[#6B1E3E] hover:text-white transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Maximize2 className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Thumbnail navigation */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {angles.map((angle, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentAngle(idx)}
            className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
              idx === currentAngle
                ? 'border-[#6B1E3E] ring-2 ring-[#6B1E3E]/20'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={angle}
              alt={`Vue ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            {idx === currentAngle && (
              <div className="absolute inset-0 bg-[#6B1E3E]/20" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Design premium', icon: '✨' },
          { label: '5 fonctions', icon: '💧' },
          { label: 'Finition chrome', icon: '🔆' },
          { label: 'Garantie 5 ans', icon: '🛡️' }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="text-center p-4 bg-white rounded-xl border border-gray-200"
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <div className="text-sm text-gray-700">{feature.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-white to-[#FAF8F5]">
        <div className="section-container">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6B1E3E] to-[#8B2E4E] text-white rounded-full mb-8 shadow-lg"
            >
              <RotateCw className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider font-medium">Vue 360°</span>
            </motion.div>

            <h2 className="mb-4 text-gray-900">
              Explorez le {productName}
            </h2>
            <p className="text-xl text-[#8B7E74] max-w-2xl mx-auto">
              Découvrez chaque détail de votre futur robinet sous tous les angles.
            </p>
          </motion.div>

          {/* 360 View */}
          <div className="max-w-3xl mx-auto">
            <ViewContent />
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-5xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl text-white">{productName} - Vue 360°</h3>
                <motion.button
                  onClick={() => setIsFullscreen(false)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <ViewContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
