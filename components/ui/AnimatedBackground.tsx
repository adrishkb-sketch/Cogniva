'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  // Generate random particles for a highly visible starry/dust effect
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#02050A]">
      
      {/* 1. Deep Space/Cloud Gradient Base */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(ellipse at 50% -20%, rgba(138,43,226,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 120%, rgba(0,240,255,0.25) 0%, transparent 60%)'
        }}
      />

      {/* 2. Highly Visible Fast-Moving Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ top: p.top, left: p.left, width: p.size, height: p.size }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}

      {/* 3. Floating Cloud/Aurora Strips (Increased Opacity & Speed) */}
      <div className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen">
        
        {/* Strip 1 */}
        <motion.div
          className="absolute h-[300px] w-[150vw] rounded-full blur-[60px] bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.2)] to-transparent"
          style={{ top: '10%', left: '-25%', transform: 'rotate(-15deg)' }}
          animate={{ x: ['-20%', '20%', '-20%'], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Strip 2 */}
        <motion.div
          className="absolute h-[400px] w-[150vw] rounded-full blur-[80px] bg-gradient-to-r from-transparent via-[rgba(138,43,226,0.25)] to-transparent"
          style={{ top: '40%', left: '-20%', transform: 'rotate(10deg)' }}
          animate={{ x: ['25%', '-25%', '25%'], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Strip 3 */}
        <motion.div
          className="absolute h-[250px] w-[120vw] rounded-full blur-[50px] bg-gradient-to-r from-transparent via-[rgba(0,255,136,0.15)] to-transparent"
          style={{ bottom: '10%', left: '-10%', transform: 'rotate(-5deg)' }}
          animate={{ x: ['-30%', '30%', '-30%'], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Strip 4 (Vertical-ish for depth) */}
        <motion.div
          className="absolute h-[150vh] w-[200px] rounded-full blur-[70px] bg-gradient-to-b from-transparent via-[rgba(0,240,255,0.15)] to-transparent"
          style={{ left: '30%', top: '-25%', transform: 'rotate(25deg)' }}
          animate={{ x: ['-60%', '60%', '-60%'], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* 4. Subtle Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
