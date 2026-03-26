import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, PanInfo, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TouchCarouselItem {
  id: string;
  content: ReactNode;
}

interface TouchGestureCarouselProps {
  items: TouchCarouselItem[];
  enableHaptic?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function TouchGestureCarousel({ 
  items,
  enableHaptic = true,
  showIndicators = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = '' 
}: TouchGestureCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Haptic feedback (vibration)
  const triggerHaptic = () => {
    if (enableHaptic && 'vibrate' in navigator) {
      navigator.vibrate(10); // Short vibration
    }
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      if (!isDragging) {
        handleNext();
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, isDragging]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);

    const threshold = 50; // Minimum swipe distance
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      if (offset > 0 || velocity > 500) {
        // Swipe right - previous
        handlePrevious();
      } else {
        // Swipe left - next
        handleNext();
      }
      triggerHaptic();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    triggerHaptic();
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    triggerHaptic();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    triggerHaptic();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main carousel container */}
      <div ref={containerRef} className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{ x: -currentIndex * 100 + '%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="min-w-full px-2"
              initial={{ opacity: 0.7, scale: 0.95 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0.7,
                scale: index === currentIndex ? 1 : 0.95
              }}
              transition={{ duration: 0.3 }}
            >
              {item.content}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation arrows (desktop + tablet) */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full items-center justify-center shadow-lg transition-all z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full items-center justify-center shadow-lg transition-all z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-8 bg-[#6B1E3E]' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Swipe hint (mobile only, appears once) */}
      {currentIndex === 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs z-10 pointer-events-none"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ←
          </motion.div>
          Glisser pour naviguer
          <motion.div
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Composant pour image avec pinch-to-zoom
interface PinchZoomImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function PinchZoomImage({ src, alt, className = '' }: PinchZoomImageProps) {
  const [scale, setScale] = useState(1);
  const [isPinching, setIsPinching] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    const handleGestureStart = (e: any) => {
      e.preventDefault();
      setIsPinching(true);
    };

    const handleGestureChange = (e: any) => {
      e.preventDefault();
      const newScale = Math.min(Math.max(1, e.scale), 3); // Entre 1x et 3x
      setScale(newScale);
    };

    const handleGestureEnd = (e: any) => {
      e.preventDefault();
      setIsPinching(false);
      
      // Reset si zoom < 1.2
      if (scale < 1.2) {
        setScale(1);
      }
    };

    // iOS Safari gestures
    element.addEventListener('gesturestart', handleGestureStart);
    element.addEventListener('gesturechange', handleGestureChange);
    element.addEventListener('gestureend', handleGestureEnd);

    return () => {
      element.removeEventListener('gesturestart', handleGestureStart);
      element.removeEventListener('gesturechange', handleGestureChange);
      element.removeEventListener('gestureend', handleGestureEnd);
    };
  }, [scale]);

  const handleDoubleClick = () => {
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
    }
  };

  return (
    <div 
      ref={imageRef}
      className={`relative overflow-hidden touch-none ${className}`}
      onDoubleClick={handleDoubleClick}
    >
      <motion.img
        src={src}
        alt={alt}
        animate={{ scale }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full h-full object-cover"
        drag={scale > 1}
        dragConstraints={imageRef}
        dragElastic={0.1}
      />

      {/* Zoom indicator */}
      <AnimatePresence>
        {isPinching && scale > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium"
          >
            {Math.round(scale * 100)}%
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint overlay */}
      {scale === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors pointer-events-none"
        >
          <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs md:hidden">
            Pincer pour zoomer
          </div>
        </motion.div>
      )}
    </div>
  );
}
