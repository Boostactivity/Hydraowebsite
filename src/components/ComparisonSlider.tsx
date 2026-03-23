import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonSlider({
  beforeImage = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
  afterImage = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200',
  beforeLabel = 'Avant HYDRAL',
  afterLabel = 'Avec HYDRAL'
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && e.type !== 'click') return;

    const container = (e.currentTarget as HTMLElement).getBoundingClientRect();
    let clientX: number;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const x = clientX - container.left;
    const percent = (x / container.width) * 100;
    setSliderPosition(Math.min(Math.max(percent, 0), 100));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main comparison container */}
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onClick={handleMove}
      >
        {/* After image (bottom layer) */}
        <div className="absolute inset-0">
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* After label */}
          <div className="absolute top-4 right-4 px-4 py-2 bg-[#6B1E3E]/90 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
            {afterLabel}
          </div>
        </div>

        {/* Before image (top layer with clip) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Before label */}
          <div className="absolute top-4 left-4 px-4 py-2 bg-gray-900/90 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
            {beforeLabel}
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle circle */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-[#6B1E3E]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-4 h-4 text-[#6B1E3E] -ml-1" />
            <ChevronRight className="w-4 h-4 text-[#6B1E3E] -mr-1" />
          </motion.div>
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-6"
      >
        <p className="text-sm text-gray-600">
          👆 Faites glisser pour comparer
        </p>
      </motion.div>

      {/* Stats overlay */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-gray-100 p-4 rounded-xl"
        >
          <div className="text-2xl font-light text-gray-900 mb-1">❌ Avant</div>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Bouilloire sur le plan de travail</li>
            <li>• Packs d'eau stockés</li>
            <li>• Cuisine encombrée</li>
            <li>• Temps perdu</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#6B1E3E]/10 to-[#D4AF37]/10 p-4 rounded-xl border-2 border-[#6B1E3E]/20"
        >
          <div className="text-2xl font-light text-[#6B1E3E] mb-1">✅ Après</div>
          <ul className="text-sm text-gray-700 space-y-1 font-medium">
            <li>• Tout intégré au robinet</li>
            <li>• Plan de travail dégagé</li>
            <li>• Cuisine premium épurée</li>
            <li>• Instantané</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}