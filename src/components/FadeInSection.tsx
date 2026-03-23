import { memo, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Composant d'apparition optimisé - Remplace motion.div avec whileInView
 * Utilise CSS au lieu de JS pour de meilleures performances
 */
export const FadeInSection = memo(function FadeInSection({ 
  children, 
  className = '',
  delay = 0
}: FadeInSectionProps) {
  return (
    <div 
      className={`opacity-0 animate-fade-in ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );
});
