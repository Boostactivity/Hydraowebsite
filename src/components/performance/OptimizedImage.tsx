import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onLoad?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 80,
  sizes = '100vw',
  onLoad,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer pour lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Charge 50px avant d'être visible
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Générer srcset pour responsive
  const generateSrcSet = (baseSrc: string) => {
    const widths = [320, 640, 768, 1024, 1280, 1536, 1920];
    
    // Si c'est une URL Unsplash, ajouter les paramètres d'optimisation
    if (baseSrc.includes('unsplash.com')) {
      return widths
        .map(w => `${baseSrc}?w=${w}&q=${quality}&fm=webp ${w}w`)
        .join(', ');
    }

    // Pour les autres sources, retourner l'URL de base
    return baseSrc;
  };

  // Générer l'URL WebP optimisée
  const getOptimizedSrc = (baseSrc: string) => {
    if (baseSrc.includes('unsplash.com')) {
      return `${baseSrc}?w=${width || 1200}&q=${quality}&fm=webp&auto=format`;
    }
    return baseSrc;
  };

  // Générer placeholder blur (LQIP - Low Quality Image Placeholder)
  const getPlaceholderSrc = (baseSrc: string) => {
    if (baseSrc.includes('unsplash.com')) {
      return `${baseSrc}?w=20&q=10&blur=10`;
    }
    return baseSrc;
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    >
      {/* Placeholder blur pendant le chargement */}
      {!isLoaded && (
        <img
          src={getPlaceholderSrc(src)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{ 
            objectFit,
            filter: 'blur(10px)',
            transform: 'scale(1.1)' // Éviter les bords flous
          }}
        />
      )}

      {/* Image principale avec lazy loading */}
      {isInView && (
        <motion.img
          src={getOptimizedSrc(src)}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleImageLoad}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
          style={{ objectFit }}
        />
      )}

      {/* Spinner pendant le chargement */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-[#6B1E3E] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

// Composant pour images de fond optimisées
interface OptimizedBackgroundImageProps {
  src: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}

export function OptimizedBackgroundImage({
  src,
  alt = '',
  className = '',
  children,
  overlay = false,
  overlayOpacity = 0.5
}: OptimizedBackgroundImageProps) {
  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="absolute inset-0"
        objectFit="cover"
        quality={75}
      />
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
}

// Hook pour précharger des images critiques
export function useImagePreload(urls: string[]) {
  useEffect(() => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url.includes('unsplash.com') 
        ? `${url}?w=1200&q=80&fm=webp`
        : url;
      document.head.appendChild(link);
    });
  }, []);
}
