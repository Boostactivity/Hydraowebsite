import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoHeroBackgroundProps {
  videoUrl?: string;
  fallbackImage?: string;
}

export function VideoHeroBackground({ 
  videoUrl = 'https://cdn.coverr.co/videos/coverr-water-pouring-into-glass-6381/1080p.mp4',
  fallbackImage = 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920'
}: VideoHeroBackgroundProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(true);

  // Détection mobile pour désactiver la vidéo
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setShowVideo(!isMobile);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-[#FAF8F5]/95 z-10"></div>
      
      {showVideo ? (
        <>
          {/* Video */}
          <video
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster={fallbackImage}
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Fallback image */}
            <img src={fallbackImage} alt="Robinet HYDRAO" className="w-full h-full object-cover" />
          </video>

          {/* Video Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white flex items-center justify-center shadow-lg transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-gray-700" />
              ) : (
                <Play className="w-5 h-5 text-gray-700 ml-0.5" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 hover:bg-white flex items-center justify-center shadow-lg transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-gray-700" />
              ) : (
                <Volume2 className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>
          </div>
        </>
      ) : (
        /* Fallback image pour mobile */
        <img 
          src={fallbackImage} 
          alt="Robinet HYDRAO" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Décorations supplémentaires */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-[#E8D5DC]/20 rounded-full blur-3xl pointer-events-none z-10"></div>
      <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-[#6B1E3E]/5 rounded-full blur-3xl pointer-events-none z-10"></div>
    </div>
  );
}
