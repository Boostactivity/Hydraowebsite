import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';

interface VideoHeroProps {
  videoUrl?: string;
  posterImage?: string;
  title?: string;
  description?: string;
}

export function VideoHero({ 
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
  posterImage = "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200",
  title = "Découvrez HYDRAO en 60 secondes",
  description = "Installation, utilisation quotidienne, témoignages clients"
}: VideoHeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <>
      {/* Video Preview Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative group cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
        {/* Poster image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={posterImage}
            alt="Vidéo démo HYDRAO"
            className="w-full h-auto aspect-video object-cover"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Play button */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:bg-[#6B1E3E] transition-all">
              <Play className="w-10 h-10 text-[#6B1E3E] group-hover:text-white ml-1" />
            </div>
          </motion.div>

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl mb-2">{title}</h3>
              <p className="text-white/90 text-sm">{description}</p>
            </motion.div>
          </div>

          {/* Badge durée */}
          <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-sm rounded-full border border-white/20">
            1:00
          </div>

          {/* Badge "Nouveau" */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.3 }}
            className="absolute top-4 left-4 px-3 py-1.5 bg-[#6B1E3E] text-white text-sm rounded-full shadow-lg"
          >
            ✨ Nouveau
          </motion.div>
        </div>

        {/* Hover effect border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#6B1E3E] via-[#D4AF37] to-[#6B1E3E] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
      </motion.div>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Video container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                <div className="aspect-video">
                  {/* Placeholder: Replace with actual video player */}
                  <iframe
                    src={`${videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Controls overlay */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 bg-black/60 backdrop-blur-sm text-white rounded-full hover:bg-black/80 transition-colors"
                    aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Video info */}
              <div className="mt-6 text-white text-center">
                <h3 className="text-xl mb-2">{title}</h3>
                <p className="text-white/70">{description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
