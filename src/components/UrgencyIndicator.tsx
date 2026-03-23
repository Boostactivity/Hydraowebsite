import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Eye, Package, Clock } from 'lucide-react';

interface UrgencyIndicatorProps {
  variant?: 'stock' | 'viewers' | 'timer';
  className?: string;
}

export function UrgencyIndicator({ variant = 'stock', className = '' }: UrgencyIndicatorProps) {
  const [viewers, setViewers] = useState(3);
  const [stockLeft, setStockLeft] = useState(12);

  // Simulate viewers fluctuation
  useEffect(() => {
    if (variant === 'viewers') {
      const interval = setInterval(() => {
        setViewers(Math.floor(Math.random() * 5) + 2); // Between 2-6
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [variant]);

  if (variant === 'stock') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className={`inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-full ${className}`}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Package className="w-4 h-4 text-orange-600" />
        </motion.div>
        <span className="text-sm font-medium text-orange-700">
          Plus que <span className="text-orange-900 font-bold">{stockLeft} unités</span> disponibles ce mois
        </span>
      </motion.div>
    );
  }

  if (variant === 'viewers') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={viewers}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={`inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full ${className}`}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Eye className="w-4 h-4 text-blue-600" />
          </motion.div>
          <span className="text-sm text-blue-700">
            <span className="font-bold text-blue-900">{viewers} personnes</span> consultent cette page
          </span>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (variant === 'timer') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className={`inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-full ${className}`}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Clock className="w-4 h-4 text-red-600" />
        </motion.div>
        <span className="text-sm font-medium text-red-700">
          Offre de lancement : <span className="text-red-900 font-bold">-45%</span> encore 48h
        </span>
      </motion.div>
    );
  }

  return null;
}
