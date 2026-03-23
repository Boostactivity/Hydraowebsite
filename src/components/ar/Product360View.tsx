import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Maximize2, Minimize2, RotateCw, MousePointer2, Smartphone, ZoomIn, ZoomOut } from 'lucide-react';

interface Product360ViewProps {
  productName: string;
  images: string[]; // Array of 36 images (10° rotation each)
  initialRotation?: number;
}

export function Product360View({ 
  productName, 
  images, 
  initialRotation = 0 
}: Product360ViewProps) {
  const [currentFrame, setCurrentFrame] = useState(Math.floor(initialRotation / 10));
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMouseX = useRef(0);

  // Auto-rotate effect
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % images.length);
    }, 100); // 10 frames per second

    return () => clearInterval(interval);
  }, [autoRotate, isDragging, images.length]);

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastMouseX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouseX.current;
    const sensitivity = 2; // pixels per frame
    const frameDelta = Math.floor(deltaX / sensitivity);

    if (frameDelta !== 0) {
      setCurrentFrame(prev => {
        const newFrame = prev - frameDelta; // Negative for natural drag
        return ((newFrame % images.length) + images.length) % images.length;
      });
      lastMouseX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch drag (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastMouseX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const deltaX = e.touches[0].clientX - lastMouseX.current;
    const sensitivity = 2;
    const frameDelta = Math.floor(deltaX / sensitivity);

    if (frameDelta !== 0) {
      setCurrentFrame(prev => {
        const newFrame = prev - frameDelta;
        return ((newFrame % images.length) + images.length) % images.length;
      });
      lastMouseX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
  };

  const currentRotation = (currentFrame * 10) % 360;

  return (
    <div 
      ref={containerRef}
      className={`relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isDragging && setShowControls(false)}
    >
      {/* 360° Image Viewer */}
      <div 
        className={`relative ${isFullscreen ? 'h-screen' : 'aspect-square'} flex items-center justify-center cursor-grab active:cursor-grabbing select-none`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.img
          src={images[currentFrame] || images[0]}
          alt={`${productName} - ${currentRotation}°`}
          className="w-full h-full object-contain"
          style={{
            transform: `scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease'
          }}
          draggable={false}
        />

        {/* Rotation indicator */}
        <div className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-sm font-medium">
          {currentRotation}°
        </div>

        {/* Instructions overlay (shown initially) */}
        {showControls && !isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center pointer-events-none"
          >
            <div className="text-center text-white">
              <MousePointer2 className="w-12 h-12 mx-auto mb-3 animate-pulse" />
              <p className="text-lg font-semibold mb-1">Faites glisser pour tourner</p>
              <p className="text-sm opacity-80">ou touchez et déplacez sur mobile</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-2xl p-4"
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-lg transition-colors ${
                autoRotate ? 'bg-cyan-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={autoRotate ? 'Pause rotation' : 'Auto-rotate'}
            >
              <RotateCw className={`w-5 h-5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
            </button>

            <div className="h-6 w-px bg-white/20" />

            <button
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <div className="text-white text-sm font-medium px-2">
              {Math.round(zoom * 100)}%
            </div>

            <button
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Center - Progress bar */}
          <div className="flex-1 px-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-500"
                style={{ width: `${(currentFrame / images.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Right controls */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Badge "360°" */}
      <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white text-sm font-bold shadow-lg">
        360°
      </div>

      {/* Mobile hint */}
      <div className="absolute bottom-20 left-0 right-0 pointer-events-none md:hidden">
        <div className="flex justify-center">
          <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-xs font-medium flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <span>Utilisez deux doigts pour zoomer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product 360 View with placeholder images (for demo)
export function Product360ViewDemo({ productName }: { productName: string }) {
  // Generate 36 placeholder images (in production, use real 360° photos)
  const images = Array.from({ length: 36 }, (_, i) => 
    `/api/placeholder/800/800?text=${productName}+${i * 10}°`
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Vue 360° Interactive
        </h3>
        <p className="text-gray-600">
          Explorez le produit sous tous les angles
        </p>
      </div>

      <Product360View
        productName={productName}
        images={images}
        initialRotation={0}
      />

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <MousePointer2 className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-gray-900">Drag & Rotate</div>
          <div className="text-xs text-gray-600">Contrôle intuitif</div>
        </div>

        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <RotateCw className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-gray-900">Auto-rotate</div>
          <div className="text-xs text-gray-600">Démonstration auto</div>
        </div>

        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <ZoomIn className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-gray-900">Zoom 3x</div>
          <div className="text-xs text-gray-600">Détails HD</div>
        </div>

        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <Maximize2 className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-gray-900">Fullscreen</div>
          <div className="text-xs text-gray-600">Vue immersive</div>
        </div>
      </div>
    </div>
  );
}
