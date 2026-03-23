import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  asMotion?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'gradient-bordeaux text-white shadow-lg shadow-[#6B1E3E]/25 hover:shadow-xl hover:shadow-[#6B1E3E]/35 disabled:opacity-50 disabled:cursor-not-allowed',
  secondary: 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
  outline: 'bg-transparent border-2 border-[#6B1E3E] text-[#6B1E3E] hover:bg-[#6B1E3E] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
  link: 'bg-transparent text-[#6B1E3E] underline-offset-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      iconPosition = 'right',
      className = '',
      children,
      disabled,
      asMotion = true,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out disabled:pointer-events-none';
    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    const content = (
      <>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && icon && iconPosition === 'left' && icon}
        {children}
        {!isLoading && icon && iconPosition === 'right' && icon}
      </>
    );

    if (asMotion) {
      return (
        <motion.button
          ref={ref}
          className={classes}
          disabled={disabled || isLoading}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          {...props}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
