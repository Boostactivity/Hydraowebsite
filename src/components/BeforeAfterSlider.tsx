import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MoveHorizontal, Droplets, Sparkles, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  stats?: {
    bottles: number;
    co2: number;
    plastic: number;
  };
}

export function BeforeAfterSlider({
  beforeImage = 'https://images.unsplash.com/photo-1628191012047-e789922abfdf?w=1200',
  afterImage = 'https://images.unsplash.com/photo-1610177534644-34d881503b83?w=1200',
  beforeLabel = 'Avant HYDRAL',
  afterLabel = 'Avec HYDRAL',
  stats = {
    bottles: 2400,
    co2: 156,
    plastic: 84
  }
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = (clientX: number, container: DOMRect) => {
    const x = clientX - container.left;
    const percent = (x / container.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percent)));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = e.currentTarget.getBoundingClientRect();
    updatePosition(e.clientX, container);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    updatePosition(touch.clientX, container);
  };

  return (
    <div className="space-y-8">
      {/* Slider Container */}
      <div
        className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl cursor-col-resize select-none"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (full background) */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={afterImage}
            alt="Après"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6 px-4 py-2 gradient-bordeaux text-white rounded-full text-sm font-medium shadow-lg">
            {afterLabel}
          </div>
        </div>

        {/* Before Image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <ImageWithFallback
            src={beforeImage}
            alt={beforeLabel}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-6 left-6 px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium shadow-lg">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoveHorizontal className="w-6 h-6 text-gray-700" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#FAF8F5] to-white p-6 rounded-2xl border-2 border-[#6B1E3E]/10 text-center hover:border-[#6B1E3E]/30 transition-all"
        >
          <Droplets className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
          <div className="text-4xl text-[#6B1E3E] mb-2 font-light">
            {stats.bottles.toLocaleString()}
          </div>
          <div className="text-sm text-[#8B7E74] font-light">Bouteilles plastique évitées par an</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#FAF8F5] to-white p-6 rounded-2xl border-2 border-[#6B1E3E]/10 text-center hover:border-[#6B1E3E]/30 transition-all"
        >
          <Sparkles className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
          <div className="text-4xl text-[#6B1E3E] mb-2 font-light">
            {stats.co2} kg
          </div>
          <div className="text-sm text-[#8B7E74] font-light">CO₂ économisé par an</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#FAF8F5] to-white p-6 rounded-2xl border-2 border-[#6B1E3E]/10 text-center hover:border-[#6B1E3E]/30 transition-all"
        >
          <Package className="w-8 h-8 text-[#6B1E3E] mx-auto mb-3" />
          <div className="text-4xl text-[#6B1E3E] mb-2 font-light">
            {stats.plastic} kg
          </div>
          <div className="text-sm text-[#8B7E74] font-light">Plastique non produit par an</div>
        </motion.div>
      </div>

      {/* Description */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-lg text-[#8B7E74] leading-relaxed font-light">
          <strong className="text-gray-900 font-medium">La transformation est immédiate.</strong> Plus de packs d'eau à porter, plus de bouteilles à recycler, plus d'espace perdu dans vos placards. Juste un robinet, au centre de votre cuisine.
        </p>
      </div>
    </div>
  );
}