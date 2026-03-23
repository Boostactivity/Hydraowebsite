import { useEffect, useRef, useState, RefObject } from 'react';

/**
 * Options pour l'Intersection Observer
 */
export interface UseIntersectionObserverOptions {
  /**
   * Pourcentage de visibilité nécessaire pour trigger (0-1)
   * @default 0.1
   */
  threshold?: number | number[];
  
  /**
   * Marge autour de l'élément (ex: "50px 0px")
   * @default "0px"
   */
  rootMargin?: string;
  
  /**
   * Élément racine pour l'observation (null = viewport)
   * @default null
   */
  root?: Element | null;
  
  /**
   * Ne trigger qu'une seule fois
   * @default true
   */
  triggerOnce?: boolean;
  
  /**
   * Callback quand l'élément devient visible
   */
  onIntersect?: () => void;
}

/**
 * Hook personnalisé pour détecter quand un élément entre dans le viewport
 * 
 * Utilisation typique : Lazy load de composants lourds, animations au scroll, etc.
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, isIntersecting } = useIntersectionObserver({
 *     threshold: 0.1,
 *     triggerOnce: true
 *   });
 *   
 *   return (
 *     <div ref={ref}>
 *       {isIntersecting && <HeavyComponent />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): {
  ref: RefObject<T>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
} {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    root = null,
    triggerOnce = true,
    onIntersect,
  } = options;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Vérifier support IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback : considérer visible immédiatement
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isElementIntersecting);
        setEntry(entry);

        // Callback optionnel
        if (isElementIntersecting && onIntersect) {
          onIntersect();
        }

        // Disconnect si triggerOnce
        if (isElementIntersecting && triggerOnce) {
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, triggerOnce, onIntersect]);

  return { ref, isIntersecting, entry };
}

/**
 * Hook simplifié pour lazy loading
 * Affiche le contenu uniquement quand visible une fois
 */
export function useLazyLoad<T extends Element = HTMLDivElement>(
  threshold: number = 0.1
): {
  ref: RefObject<T>;
  isVisible: boolean;
} {
  const { ref, isIntersecting } = useIntersectionObserver<T>({
    threshold,
    triggerOnce: true,
  });

  return {
    ref,
    isVisible: isIntersecting,
  };
}

/**
 * Hook pour animations au scroll
 * Retourne isVisible qui devient true/false selon la visibilité
 */
export function useScrollAnimation<T extends Element = HTMLDivElement>(
  threshold: number = 0.3
): {
  ref: RefObject<T>;
  isVisible: boolean;
} {
  const { ref, isIntersecting } = useIntersectionObserver<T>({
    threshold,
    triggerOnce: false, // Peut trigger plusieurs fois
  });

  return {
    ref,
    isVisible: isIntersecting,
  };
}

export default useIntersectionObserver;
