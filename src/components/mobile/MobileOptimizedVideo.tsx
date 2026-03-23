import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader } from 'lucide-react';

interface MobileOptimizedVideoProps {
  src: string;
  poster: string;
  title?: string;
  duration?: string;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
}

export function MobileOptimizedVideo({ 
  src, 
  poster, 
  title = 'Vidéo HYDRAL',
  duration,
  autoPlay = false,
  muted = true,
  className = '' 
}: MobileOptimizedVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer pour lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Auto-play si configuré et en vue
            if (autoPlay && !hasStarted && videoRef.current) {
              handlePlay();
            }
          } else {
            // Pause si hors de vue
            if (isPlaying && videoRef.current) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [autoPlay, hasStarted, isPlaying]);

  // Gestion de la progression
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      setIsLoading(true);
      
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        await video.play();
        setIsPlaying(true);
        setHasStarted(true);
      }
    } catch (error) {
      console.error('Video play error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if ((video as any).webkitEnterFullscreen) {
      // iOS Safari
      (video as any).webkitEnterFullscreen();
    }
  };

  const handleVideoClick = () => {
    handlePlay();
  };

  return (
    <div 
      ref={containerRef}
      className={`relative group rounded-2xl overflow-hidden bg-gray-900 ${className}`}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={isInView ? src : undefined}
        poster={poster}
        playsInline
        preload="metadata"
        muted={isMuted}
        className="w-full h-full object-cover"
        onEnded={() => setIsPlaying(false)}
        onClick={handleVideoClick}
      />

      {/* Poster overlay (avant le premier play) */}
      {!hasStarted && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isPlaying ? 0 : 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>
      )}

      {/* Play button overlay */}
      {!isPlaying && (
        <motion.button
          onClick={handlePlay}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl z-10"
        >
          {isLoading ? (
            <Loader className="w-10 h-10 text-[#6B1E3E] animate-spin" />
          ) : (
            <Play className="w-10 h-10 text-[#6B1E3E] ml-1" />
          )}
        </motion.button>
      )}

      {/* Video info overlay (top) */}
      {!hasStarted && (
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent z-10">
          <div className="text-white">
            {title && <div className="font-medium mb-1">{title}</div>}
            {duration && (
              <div className="text-xs text-white/80 flex items-center gap-2">
                <Play className="w-3 h-3" />
                {duration}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls overlay (bottom) */}
      {hasStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isPlaying ? 0 : 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
        >
          {/* Progress bar */}
          <div className="mb-3">
            <div className="h-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlay}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" />
                )}
              </button>

              <button
                onClick={handleMuteToggle}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            <button
              onClick={handleFullscreen}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Loading spinner */}
      {isLoading && hasStarted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
          <Loader className="w-10 h-10 text-white animate-spin" />
        </div>
      )}

      {/* Mobile tap hint (première fois seulement) */}
      {!hasStarted && !isPlaying && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs z-10 md:hidden"
        >
          Toucher pour lire
        </motion.div>
      )}
    </div>
  );
}
