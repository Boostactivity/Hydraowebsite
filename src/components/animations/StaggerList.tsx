import React from 'react';
import { motion } from 'motion/react';

interface StaggerListProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export function StaggerList({ children, staggerDelay = 0.1, className = '' }: StaggerListProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
