import { ReactNode, useEffect } from 'react';

interface NoMotionWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper qui désactive TOUTES les animations Motion dans ses enfants
 * en injectant du CSS ciblé pour forcer opacity: 1 et transform: none
 */
export function NoMotionWrapper({ children }: NoMotionWrapperProps) {
  useEffect(() => {
    // Ajouter une classe au body pour cibler tous les éléments Motion
    document.body.classList.add('no-motion-active');
    
    return () => {
      document.body.classList.remove('no-motion-active');
    };
  }, []);

  return (
    <>
      <style>{`
        /* Désactiver TOUTES les animations Motion quand no-motion-active est présent */
        /* SAUF les éléments avec la classe keep-animation */
        .no-motion-active [data-projection-id]:not(.keep-animation):not(.keep-animation *),
        .no-motion-active [style*="opacity"]:not(.keep-animation):not(.keep-animation *),
        .no-motion-active [style*="transform"]:not(.keep-animation):not(.keep-animation *) {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          animation: none !important;
        }
      `}</style>
      {children}
    </>
  );
}