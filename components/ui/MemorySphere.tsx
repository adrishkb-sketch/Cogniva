'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

export const MemorySphere = React.memo(() => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 30,
          y: (e.clientY / window.innerHeight - 0.5) * 30,
        });
        rafId.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const radius = 160;
  const numNodes = 75; // Optimal density for visual richness & 60fps performance

  // Pre-calculate 3D Fibonacci sphere points ONCE
  const nodes = useMemo(() => {
    const colors = ['#00F0FF', '#9333EA', '#10B981', '#F59E0B'];
    return Array.from({ length: numNodes }).map((_, i) => {
      const phi = Math.acos(1 - (2 * i) / numNodes);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const color = colors[i % colors.length];
      const z = radius * Math.cos(phi);
      const depthOpacity = 0.2 + ((z + radius) / (radius * 2)) * 0.8;

      return {
        id: i,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: z,
        size: (i % 3) + 3,
        color: color,
        opacity: depthOpacity,
      };
    });
  }, [numNodes, radius]);

  if (!mounted) return null;

  return (
    <div className="relative w-[320px] h-[320px] md:w-[460px] md:h-[460px] flex items-center justify-center pointer-events-none gpu-layer">
      {/* Central Glowing Ambient Core */}
      <div
        className="absolute w-48 h-48 rounded-full blur-2xl opacity-60 gpu-layer animate-soft-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(147,51,234,0.2) 50%, transparent 80%)',
        }}
      />

      {/* Rotating 3D Sphere Container */}
      <motion.div
        className="relative w-full h-full gpu-layer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          rotateX: { duration: 50, repeat: Infinity, ease: 'linear' },
          rotateY: { duration: 70, repeat: Infinity, ease: 'linear' },
          x: { type: 'spring', stiffness: 50, damping: 25 },
          y: { type: 'spring', stiffness: 50, damping: 25 },
        }}
      >
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute rounded-full gpu-layer"
            style={{
              left: '50%',
              top: '50%',
              width: `${node.size}px`,
              height: `${node.size}px`,
              backgroundColor: node.color,
              boxShadow: `0 0 8px ${node.color}`,
              marginLeft: `-${node.size / 2}px`,
              marginTop: `-${node.size / 2}px`,
              transform: `translate3d(${node.x}px, ${node.y}px, ${node.z}px)`,
              opacity: node.opacity,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
});

MemorySphere.displayName = 'MemorySphere';
