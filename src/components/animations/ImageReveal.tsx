import React from 'react';
import { motion } from 'motion/react';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

export function ImageReveal({ src, alt, className = '', direction = 'left' }: ImageRevealProps) {
  const clipPathVariants = {
    left: {
      initial: { clipPath: 'inset(0 100% 0 0)' },
      animate: { clipPath: 'inset(0 0% 0 0)' },
    },
    right: {
      initial: { clipPath: 'inset(0 0 0 100%)' },
      animate: { clipPath: 'inset(0 0 0 0%)' },
    },
    top: {
      initial: { clipPath: 'inset(0 0 100% 0)' },
      animate: { clipPath: 'inset(0 0 0% 0)' },
    },
    bottom: {
      initial: { clipPath: 'inset(100% 0 0 0)' },
      animate: { clipPath: 'inset(0% 0 0 0)' },
    },
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={clipPathVariants[direction].initial}
        whileInView={clipPathVariants[direction].animate}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
