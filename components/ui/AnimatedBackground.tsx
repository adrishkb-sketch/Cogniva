'use client';

import React, { useMemo } from 'react';

export const AnimatedBackground = React.memo(() => {
  // Memoize light ambient dust particles once on mount
  const particles = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      top: `${(i * 7 + 13) % 100}%`,
      left: `${(i * 11 + 5) % 100}%`,
      size: (i % 3) + 1.5,
      opacity: 0.2 + (i % 5) * 0.1,
      animationDuration: `${12 + (i % 8) * 3}s`,
      animationDelay: `${(i % 5) * 2}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#06090E] gpu-layer">
      {/* 1. Hardware Accelerated Subtle Radial Orbs */}
      <div
        className="absolute -top-[20%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-25 blur-[100px] gpu-layer animate-soft-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.35) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 80%)',
        }}
      />
      <div
        className="absolute -bottom-[20%] right-[5%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full opacity-20 blur-[120px] gpu-layer animate-gentle-float"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.35) 0%, rgba(16, 185, 129, 0.15) 60%, transparent 80%)',
        }}
      />
      <div
        className="absolute top-[40%] left-[60%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full opacity-15 blur-[90px] gpu-layer"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(0, 240, 255, 0.1) 70%, transparent 80%)',
        }}
      />

      {/* 2. Pure CSS Floating Ambient Particles (Zero JS frame re-render) */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-300 gpu-layer animate-gentle-float"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              boxShadow: '0 0 6px rgba(0, 240, 255, 0.6)',
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>

      {/* 3. Subtle Clean Mesh Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';
