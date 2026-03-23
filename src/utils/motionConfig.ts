/**
 * Configuration globale pour Motion
 * Désactive les animations whileInView pour que tout s'affiche immédiatement
 */

export const DISABLE_SCROLL_ANIMATIONS = true;

/**
 * Convertit les props whileInView en animate pour un affichage immédiat
 */
export function getMotionProps(props: {
  initial?: any;
  whileInView?: any;
  animate?: any;
  viewport?: any;
  [key: string]: any;
}) {
  if (!DISABLE_SCROLL_ANIMATIONS) {
    return props;
  }

  const { whileInView, viewport, ...rest } = props;
  
  // Si whileInView existe, l'utiliser comme animate pour affichage immédiat
  if (whileInView) {
    return {
      ...rest,
      initial: false, // Pas d'état initial, affichage direct
      animate: whileInView, // Animation immédiate
    };
  }

  return rest;
}
