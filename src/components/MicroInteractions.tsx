import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface MicroInteractionProps {
  children: ReactNode;
  variant?: 'scale' | 'lift' | 'glow' | 'shake' | 'pulse';
  className?: string;
}

export function MicroInteraction({ 
  children, 
  variant = 'scale',
  className = '' 
}: MicroInteractionProps) {
  const variants = {
    scale: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    },
    lift: {
      whileHover: { y: -4, scale: 1.02 },
      whileTap: { y: 0, scale: 0.98 },
      transition: { type: 'spring', stiffness: 400, damping: 17 }
    },
    glow: {
      whileHover: { 
        boxShadow: '0 0 20px rgba(107, 30, 62, 0.4)',
        scale: 1.02 
      },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.2 }
    },
    shake: {
      whileHover: {
        x: [0, -2, 2, -2, 2, 0],
        transition: { duration: 0.4 }
      },
      whileTap: { scale: 0.95 }
    },
    pulse: {
      whileHover: {
        scale: [1, 1.05, 1],
        transition: { duration: 0.6, repeat: Infinity }
      },
      whileTap: { scale: 0.95 }
    }
  };

  return (
    <motion.div
      {...variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Composant pour les boutons avec feedback visuel
interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon
}: AnimatedButtonProps) {
  const baseStyles = 'rounded-full font-medium transition-all inline-flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: 'gradient-bordeaux text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
    outline: 'bg-white border-2 border-[#6B1E3E] text-[#6B1E3E] hover:bg-[#6B1E3E] hover:text-white'
  };

  const sizeStyles = {
    sm: 'px-6 py-2 text-sm',
    md: 'px-10 py-4 text-base',
    lg: 'px-12 py-5 text-lg'
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
      {children}
    </motion.button>
  );
}

// Composant pour les cartes avec effet de survol
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AnimatedCard({ children, className = '', onClick }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </motion.div>
  );
}

// Composant pour les badges animés
interface AnimatedBadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'bordeaux';
  className?: string;
  pulse?: boolean;
}

export function AnimatedBadge({ 
  children, 
  variant = 'bordeaux',
  className = '',
  pulse = false
}: AnimatedBadgeProps) {
  const variantStyles = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-orange-100 text-orange-700 border-orange-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
    bordeaux: 'bg-[#6B1E3E]/10 text-[#6B1E3E] border-[#6B1E3E]/20'
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-current"
        />
      )}
      {children}
    </motion.div>
  );
}

// Composant pour les icônes animées
interface AnimatedIconProps {
  children: ReactNode;
  variant?: 'rotate' | 'bounce' | 'wiggle' | 'spin';
  className?: string;
}

export function AnimatedIcon({ 
  children, 
  variant = 'bounce',
  className = '' 
}: AnimatedIconProps) {
  const animations = {
    rotate: {
      whileHover: { rotate: 360 },
      transition: { duration: 0.6 }
    },
    bounce: {
      whileHover: { 
        y: [0, -10, 0],
        transition: { duration: 0.5, repeat: 2 }
      }
    },
    wiggle: {
      whileHover: {
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      }
    },
    spin: {
      whileHover: {
        rotate: 360,
        scale: [1, 1.2, 1],
        transition: { duration: 0.6 }
      }
    }
  };

  return (
    <motion.div
      {...animations[variant]}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}
