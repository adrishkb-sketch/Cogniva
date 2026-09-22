'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const MemorySphere = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  // Generate nodes using Fibonacci sphere algorithm for even distribution
  const numNodes = 150; // Increased density
  const radius = 180; // Increased size
  const nodes = Array.from({ length: numNodes }).map((_, i) => {
    const phi = Math.acos(1 - (2 * i) / numNodes);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    // Vibrant colors
    const colors = ['#00F0FF', '#8A2BE2', '#00FF88', '#FF00AA'];
    const color = colors[i % colors.length];

    return {
      id: i,
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
      size: Math.random() * 4 + 3, // Larger nodes
      color: color,
      delay: Math.random() * 2,
    };
  });

  return (
    <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] flex items-center justify-center pointer-events-none perspective-1000">
      {/* Central Glowing Core - Much Brighter */}
      <motion.div 
        className="absolute w-56 h-56 rounded-full blur-3xl mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.6) 0%, rgba(138,43,226,0.3) 40%, rgba(255,0,170,0.1) 70%, transparent 100%)'
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute w-32 h-32 rounded-full blur-2xl bg-white/20 mix-blend-overlay"
        animate={{ scale: [1, 0.8, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Rotating Sphere Container */}
      <motion.div 
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          x: mousePosition.x,
          y: mousePosition.y
        }}
        transition={{
          rotateX: { duration: 60, repeat: Infinity, ease: 'linear' },
          rotateY: { duration: 80, repeat: Infinity, ease: 'linear' },
          x: { type: 'spring', stiffness: 40, damping: 20 },
          y: { type: 'spring', stiffness: 40, damping: 20 }
        }}
      >
        {nodes.map(node => {
          // Calculate opacity based on Z position to fake depth
          const depthOpacity = (node.z + radius) / (radius * 2);
          const finalOpacity = 0.15 + (depthOpacity * 0.85); // More contrast between front/back
          
          return (
            <motion.div
              key={node.id}
              className="absolute rounded-full"
              style={{
                left: '50%',
                top: '50%',
                width: node.size,
                height: node.size,
                backgroundColor: node.color,
                boxShadow: `0 0 ${node.size * 3}px ${node.color}, 0 0 ${node.size * 6}px ${node.color}`, // Intense glow
                marginLeft: -node.size / 2,
                marginTop: -node.size / 2,
                transform: `translate3d(${node.x}px, ${node.y}px, ${node.z}px)`,
                opacity: finalOpacity
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: node.delay }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
