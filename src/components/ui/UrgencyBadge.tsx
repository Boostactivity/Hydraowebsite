import React from 'react';
import { Clock, Users, TrendingUp, Zap, Package } from 'lucide-react';
import { motion } from 'motion/react';

export type UrgencyType = 'limited-stock' | 'hot-deal' | 'trending' | 'fast-selling' | 'delivery';

interface UrgencyBadgeProps {
  type: UrgencyType;
  text?: string;
  compact?: boolean;
}

const urgencyConfig: Record<UrgencyType, { icon: typeof Clock; defaultText: string; color: string; bg: string }> = {
  'limited-stock': {
    icon: Package,
    defaultText: 'Stock limité',
    color: 'text-orange-700',
    bg: 'bg-orange-50 border-orange-200'
  },
  'hot-deal': {
    icon: Zap,
    defaultText: 'Offre du moment',
    color: 'text-red-700',
    bg: 'bg-red-50 border-red-200'
  },
  'trending': {
    icon: TrendingUp,
    defaultText: '🔥 Très demandé',
    color: 'text-[#6B1E3E]',
    bg: 'bg-[#6B1E3E]/10 border-[#6B1E3E]/20'
  },
  'fast-selling': {
    icon: Users,
    defaultText: '12 vues dans les dernières 24h',
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200'
  },
  'delivery': {
    icon: Clock,
    defaultText: 'Expédié aujourd\'hui si commande avant 14h',
    color: 'text-green-700',
    bg: 'bg-green-50 border-green-200'
  }
};

export function UrgencyBadge({ type, text, compact = false }: UrgencyBadgeProps) {
  const config = urgencyConfig[type];
  const Icon = config.icon;
  const displayText = text || config.defaultText;

  if (compact) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${config.bg} ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        <span>{displayText}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
      className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium border-2 shadow-lg ${config.bg} ${config.color}`}
    >
      <Icon className="w-5 h-5" />
      <span>{displayText}</span>
    </motion.div>
  );
}
