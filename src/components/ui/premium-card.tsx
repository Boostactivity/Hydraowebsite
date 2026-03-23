import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PremiumCardProps {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'glass' | 'elevated';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export function PremiumCard({
  children,
  variant = 'default',
  hover = false,
  className = '',
  onClick
}: PremiumCardProps) {
  const baseStyles = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white border border-gray-100',
    bordered: 'bg-white border-2 border-gray-200',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg',
    elevated: 'bg-white shadow-xl border border-gray-50'
  };
  
  const hoverStyles = hover ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : '';
  
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${hoverStyles}
        ${className}
      `}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </Component>
  );
}

interface PremiumCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardHeader({ children, className = '' }: PremiumCardHeaderProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

interface PremiumCardContentProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardContent({ children, className = '' }: PremiumCardContentProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}

interface PremiumCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function PremiumCardFooter({ children, className = '' }: PremiumCardFooterProps) {
  return (
    <div className={`p-6 pt-0 border-t border-gray-100 mt-6 ${className}`}>
      {children}
    </div>
  );
}
