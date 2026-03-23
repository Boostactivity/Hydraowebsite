import { memo } from 'react';

interface WaterEffectProps {
  variant?: 'drops' | 'waves' | 'ripples' | 'bubbles';
  intensity?: 'subtle' | 'medium' | 'strong';
}

// Version ultra-optimisée avec CSS pur au lieu de Motion
export const WaterEffect = memo(function WaterEffect({ variant = 'drops', intensity = 'subtle' }: WaterEffectProps) {
  // Désactivé pour performances - remplacé par gradients statiques subtils
  if (variant === 'bubbles') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Bulles décoratives statiques - CSS pur */}
        <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-[#E8D5DC]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[15%] left-[10%] w-[450px] h-[450px] bg-[#6B1E3E]/3 rounded-full blur-3xl" />
      </div>
    );
  }

  // Autres variants désactivés pour performances
  return null;
});
