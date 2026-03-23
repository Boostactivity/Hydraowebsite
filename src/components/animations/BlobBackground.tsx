import React from 'react';
import { motion } from 'motion/react';

export function BlobBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blob 1 - Bordeaux */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(107, 30, 62, 0.4) 0%, rgba(107, 30, 62, 0) 70%)',
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['20%', '40%', '20%'],
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '-10%', y: '20%' }}
      />

      {/* Blob 2 - Or */}
      <motion.div
        className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.5) 0%, rgba(212, 175, 55, 0) 70%)',
        }}
        animate={{
          x: ['70%', '85%', '70%'],
          y: ['10%', '30%', '10%'],
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '70%', y: '10%' }}
      />

      {/* Blob 3 - Crème */}
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(232, 213, 220, 0.6) 0%, rgba(232, 213, 220, 0) 70%)',
        }}
        animate={{
          x: ['40%', '60%', '40%'],
          y: ['60%', '80%', '60%'],
          scale: [1, 1.4, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '40%', y: '60%' }}
      />

      {/* Blob 4 - Bordeaux foncé */}
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(107, 30, 62, 0.5) 0%, rgba(139, 46, 84, 0) 70%)',
        }}
        animate={{
          x: ['80%', '90%', '80%'],
          y: ['70%', '85%', '70%'],
          scale: [1, 1.25, 1],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        initial={{ x: '80%', y: '70%' }}
      />
    </div>
  );
}
