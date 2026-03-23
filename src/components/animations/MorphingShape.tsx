import React from 'react';
import { motion } from 'motion/react';

export function MorphingShape() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="absolute inset-0">
        <defs>
          <linearGradient id="morphGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(107, 30, 62, 0.3)" />
            <stop offset="100%" stopColor="rgba(212, 175, 55, 0.2)" />
          </linearGradient>
        </defs>

        <motion.path
          fill="url(#morphGradient1)"
          animate={{
            d: [
              'M 200,300 C 300,200 500,200 600,300 C 700,400 700,600 600,700 C 500,800 300,800 200,700 C 100,600 100,400 200,300 Z',
              'M 250,250 C 400,150 600,150 750,250 C 850,350 850,650 750,750 C 600,850 400,850 250,750 C 150,650 150,350 250,250 Z',
              'M 200,350 C 350,200 650,200 800,350 C 900,500 900,700 800,800 C 650,900 350,900 200,800 C 100,700 100,500 200,350 Z',
              'M 200,300 C 300,200 500,200 600,300 C 700,400 700,600 600,700 C 500,800 300,800 200,700 C 100,600 100,400 200,300 Z',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}
