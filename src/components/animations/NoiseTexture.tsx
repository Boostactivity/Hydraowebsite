import React, { useEffect, useRef } from 'react';

export function NoiseTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      canvas.width = width;
      canvas.height = height;
    };

    setCanvasSize();

    // Vérifier que le canvas a des dimensions valides
    if (canvas.width === 0 || canvas.height === 0) return;

    let animationFrameId: number;

    const createNoise = () => {
      // Double vérification avant createImageData
      if (canvas.width === 0 || canvas.height === 0) return;

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const buffer32 = new Uint32Array(imageData.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.02) {
          buffer32[i] = 0xff000000 | (Math.random() * 30 << 16) | (Math.random() * 30 << 8) | Math.random() * 30;
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = () => {
      createNoise();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-[0.015] z-[9998]"
    />
  );
}
