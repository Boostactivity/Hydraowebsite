import { motion } from 'motion/react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface PremiumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  showArrow?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function PremiumButton({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  showArrow = false,
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: PremiumButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#6B1E3E] to-[#8B2E54] text-white shadow-lg shadow-[#6B1E3E]/20 hover:shadow-xl hover:shadow-[#6B1E3E]/30 hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-gradient-to-r from-[#D4AF37] to-[#C59B2A] text-white shadow-lg shadow-[#D4AF37]/20 hover:shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-[0.98]',
    outline: 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5'
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  return (
    <motion.button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        <>
          {icon && <span className={iconSizes[size]}>{icon}</span>}
          <span>{children}</span>
          {showArrow && (
            <ChevronRight className={`${iconSizes[size]} group-hover:translate-x-1 transition-transform`} />
          )}
        </>
      )}
    </motion.button>
  );
}
