import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TextScramble({ text, className = '', speed = 50 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let frame = 0;
    const queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];

    // Create queue
    for (let i = 0; i < text.length; i++) {
      const from = text[i];
      const to = text[i];
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += char;
        } else {
          output += '';
        }
      }

      setDisplayText(output);

      if (complete === queue.length) {
        return;
      }

      frame++;
      setTimeout(update, speed);
    };

    update();
  }, [isInView, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText || text}
    </span>
  );
}
