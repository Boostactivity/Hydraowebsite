import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  cursor?: boolean;
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  className = '',
  cursor = true 
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.substring(0, index));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && !isComplete && (
        <span className="inline-block w-0.5 h-[1em] bg-current ml-1 animate-pulse" />
      )}
    </span>
  );
}
