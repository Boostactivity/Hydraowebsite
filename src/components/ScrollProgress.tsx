import { motion, useScroll, useSpring } from 'motion/react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    // Top progress bar only
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6B1E3E] via-[#D4AF37] to-[#6B1E3E] origin-left z-[60] keep-animation"
      style={{ scaleX }}
    />
  );
}