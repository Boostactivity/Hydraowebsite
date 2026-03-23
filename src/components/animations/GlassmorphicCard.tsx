import React from 'react';
import { motion } from 'motion/react';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlassmorphicCard({ children, className = '', delay = 0 }: GlassmorphicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow ${className}`}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none bg-gradient-to-br from-[#6B1E3E]/5 to-[#D4AF37]/5"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
