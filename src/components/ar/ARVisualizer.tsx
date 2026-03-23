import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, RotateCcw, Download, Share2, X, Smartphone, ChevronRight, Sparkles } from 'lucide-react';
import { Page } from '../../App';

interface ARVisualizerProps {
  productName: string;
  productImage: string;
  navigate: (page: Page) => void;
}

export function ARVisualizer({ productName, productImage, navigate }: ARVisualizerProps) {
  const [isARActive, setIsARActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartAR = () => {
    setIsARActive(true);
    setShowInstructions(false);
    
    // En production : démarrer la caméra avec getUserMedia
    // navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    //   .then(stream => {
    //     if (videoRef.current) {
    //       videoRef.current.srcObject = stream;
    //     }
    //   });
  };

  const handleCapturePhoto = () => {
    // En production : capturer frame de la vidéo
    setCapturedPhoto('/api/placeholder/800/600');
  };

  const handleSharePhoto = () => {
    // En production : Web Share API
    if (navigator.share) {
      navigator.share({
        title: `Mon ${productName} en AR`,
        text: 'Regardez comment le robinet HYDRAO s\'intègre dans ma cuisine !',
        url: window.location.href
      });
    }
  };

  if (capturedPhoto) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="relative h-full flex flex-col">
          {/* Captured Photo */}
          <div className="flex-1 relative">
            <img src={capturedPhoto} alt="AR Capture" className="w-full h-full object-cover" />
            
            {/* Overlay Controls */}
            <div className="absolute top-6 right-6 flex gap-3">
              <motion.button
                onClick={() => setCapturedPhoto(null)}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 text-gray-900" />
              </motion.button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bg-gradient-to-t from-black via-black/80 to-transparent p-6 space-y-4">
            <div className="flex gap-4">
              <motion.button
                onClick={handleSharePhoto}
                className="flex-1 px-6 py-4 bg-white text-gray-900 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 className="w-5 h-5" />
                <span>Partager</span>
              </motion.button>
              
              <motion.button
                className="flex-1 px-6 py-4 bg-white text-gray-900 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                <span>Télécharger</span>
              </motion.button>
            </div>

            <motion.button
              onClick={() => setCapturedPhoto(null)}
              className="w-full px-6 py-4 bg-[#6B1E3E] text-white rounded-2xl font-semibold hover:bg-[#8B2E4E] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reprendre une photo
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  if (isARActive) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="relative h-full">
          {/* Camera Feed (placeholder) */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            
            {/* AR Overlay placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img 
                  src={productImage} 
                  alt={productName}
                  className="w-64 h-64 object-contain drop-shadow-2xl"
                />
                
                {/* AR Grid */}
                <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-cyan-400" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-cyan-400" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-cyan-400" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-cyan-400" />
                </div>
              </motion.div>
            </div>

            {/* Instructions */}
            <div className="absolute top-6 left-0 right-0 px-6">
              <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 text-white text-center">
                <p className="font-medium">Déplacez votre téléphone pour positionner le robinet</p>
                <p className="text-sm text-white/70 mt-1">Touchez l'écran pour confirmer l'emplacement</p>
              </div>
            </div>
          </div>

          {/* Top Controls */}
          <div className="absolute top-6 right-6 flex gap-3">
            <motion.button
              onClick={() => setIsARActive(false)}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6 text-gray-900" />
            </motion.button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 left-0 right-0 px-6 flex items-center justify-between">
            <motion.button
              className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="w-6 h-6 text-gray-900" />
            </motion.button>

            <motion.button
              onClick={handleCapturePhoto}
              className="p-6 bg-white rounded-full shadow-2xl hover:bg-gray-100 transition-colors border-4 border-cyan-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera className="w-8 h-8 text-gray-900" />
            </motion.button>

            <motion.button
              className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Maximize2 className="w-6 h-6 text-gray-900" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl max-w-md w-full p-8"
          >
            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Visualisez en Réalité Augmentée
            </h2>

            <p className="text-gray-600 text-center mb-8">
              Voir comment le robinet HYDRAO s'intègre parfaitement dans votre cuisine avant de l'acheter.
            </p>

            {/* Instructions */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-bold">1</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Autorisez la caméra</div>
                  <div className="text-sm text-gray-600">Nous avons besoin d'accéder à votre caméra</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-bold">2</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Scannez votre cuisine</div>
                  <div className="text-sm text-gray-600">Dirigez la caméra vers votre évier</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-600 font-bold">3</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Placez le robinet</div>
                  <div className="text-sm text-gray-600">Touchez pour positionner et ajuster</div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-200">
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-900">
                  <strong>Astuce :</strong> Assurez-vous d'avoir un bon éclairage et une surface plane visible pour de meilleurs résultats.
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <motion.button
                onClick={handleStartAR}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Camera className="w-5 h-5" />
                <span>Démarrer l'AR</span>
              </motion.button>

              <button
                onClick={() => setShowInstructions(false)}
                className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-gray-400 transition-colors"
              >
                Plus tard
              </button>
            </div>

            {/* Browser compatibility note */}
            <p className="text-xs text-gray-500 text-center mt-6">
              Fonctionne sur iOS 11+ (Safari) et Android 7+ (Chrome)
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// AR Button to trigger from product page
export function ARButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-700 transition-colors shadow-lg"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Camera className="w-5 h-5" />
      <span>Voir en AR</span>
      <div className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
        NOUVEAU
      </div>
    </motion.button>
  );
}
