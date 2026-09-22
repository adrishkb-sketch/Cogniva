'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const BackgroundAnimation = ({ showWave = false }: { showWave?: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // Generate sparkling stars
    setStars(
      Array.from({ length: 50 }).map((_, i) => ({
        id: `star-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft gradient blobs */}
      <motion.div
        animate={{ x: ['-5%', '5%', '-5%'], y: ['-5%', '5%', '-5%'], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent-cyan-subtle)] rounded-full blur-[120px] opacity-40 mix-blend-screen"
      />
      <motion.div
        animate={{ x: ['5%', '-5%', '5%'], y: ['5%', '-5%', '5%'], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[var(--accent-purple-subtle)] rounded-full blur-[120px] opacity-30 mix-blend-screen"
      />
      <motion.div
        animate={{ y: ['-10%', '10%', '-10%'], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] left-[40%] w-[40%] h-[40%] bg-[var(--accent-emerald-subtle)] rounded-full blur-[100px] opacity-20 mix-blend-screen"
      />

      {mounted && (
        <>


          {/* Sparkling Stars */}
          <div className="absolute inset-0">
            {stars.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, top: s.y + '%', left: s.x + '%' }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: s.duration,
                  repeat: Infinity,
                  delay: s.delay,
                  ease: 'easeInOut',
                }}
                className="absolute rounded-full bg-white mix-blend-screen"
                style={{
                  width: s.size,
                  height: s.size,
                  boxShadow: '0 0 8px 2px rgba(255,255,255,0.8)',
                }}
              />
            ))}
          </div>

          {/* Abstract memory strips/lines */}
          {showWave && (
            <svg className="absolute inset-0 w-full h-full opacity-100">
            <defs>
              <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#00FFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#00FFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            
            {/* Large Thick Wave */}
            <motion.path
              d="M-400 500 C -100 200, 500 800, 1200 400 S 2000 700, 2800 500"
              fill="none"
              stroke="url(#line-gradient-1)"
              strokeWidth="40"
              initial={{ strokeDasharray: 3000, strokeDashoffset: 3000, opacity: 0 }}
              animate={{ strokeDashoffset: [3000, 0], opacity: [0, 0.7, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d="M-400 500 C -100 200, 500 800, 1200 400 S 2000 700, 2800 500"
              fill="none"
              stroke="url(#line-gradient-2)"
              strokeWidth="20"
              initial={{ strokeDasharray: 3000, strokeDashoffset: 3000, opacity: 0 }}
              animate={{ strokeDashoffset: [3000, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />

            {/* Existing thin memory strips */}
            <motion.path
              d="M-200 300 C 200 100, 600 500, 1200 200 S 2000 400, 2400 100"
              fill="none"
              stroke="url(#line-gradient-1)"
              strokeWidth="2"
              initial={{ strokeDasharray: 2000, strokeDashoffset: 2000, opacity: 0 }}
              animate={{ strokeDashoffset: [2000, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            <motion.path
              d="M-200 700 C 300 900, 700 400, 1400 600 S 2000 800, 2400 500"
              fill="none"
              stroke="url(#line-gradient-2)"
              strokeWidth="1.5"
              initial={{ strokeDasharray: 2500, strokeDashoffset: -2500, opacity: 0 }}
              animate={{ strokeDashoffset: [-2500, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
          </svg>
          )}
        </>
      )}
    </div>
  );
};
