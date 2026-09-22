'use client';

import React from 'react';

export const BackgroundAnimation = React.memo(({ showWave = false }: { showWave?: boolean }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 gpu-layer">
      {showWave && (
        <svg className="absolute inset-0 w-full h-full opacity-20 gpu-layer">
          <defs>
            <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#9333EA" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Smooth vector wave path without layout repaints */}
          <path
            d="M-200 400 C 200 200, 600 600, 1200 300 S 2000 500, 2600 300"
            fill="none"
            stroke="url(#line-gradient-1)"
            strokeWidth="3"
            className="animate-gentle-float"
          />
          <path
            d="M-200 600 C 300 800, 700 300, 1400 500 S 2000 700, 2600 400"
            fill="none"
            stroke="url(#line-gradient-2)"
            strokeWidth="2"
            className="animate-soft-pulse"
          />
        </svg>
      )}
    </div>
  );
});

BackgroundAnimation.displayName = 'BackgroundAnimation';
