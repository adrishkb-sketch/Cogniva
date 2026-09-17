'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AIOrbProps {
  size?: 'sm' | 'md' | 'lg';
  isListening?: boolean;
  isSpeaking?: boolean;
  label?: string;
}

export const AIOrb: React.FC<AIOrbProps> = ({
  size = 'md',
  isListening = false,
  isSpeaking = false,
  label
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 select-none">
      <div className={`relative ${sizeMap[size]} flex items-center justify-center`}>
        {/* Soft breathing background rings */}
        <motion.div
          animate={{
            scale: isSpeaking ? [1, 1.25, 1] : isListening ? [1, 1.35, 1] : [1, 1.08, 1],
            opacity: isSpeaking || isListening ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: isSpeaking ? 1.5 : isListening ? 1.2 : 3.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5B8266]/40 via-[#E78C56]/30 to-[#8E778E]/30 blur-md"
        />

        {/* Inner Glowing Core */}
        <motion.div
          animate={{
            scale: isSpeaking ? [0.95, 1.05, 0.95] : [1, 1.02, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 16, ease: "linear" }
          }}
          className="relative w-full h-full rounded-full bg-gradient-to-br from-[#EBF2EC] via-[#FFFDF9] to-[#FDF1EA] border border-white/90 shadow-inner flex items-center justify-center"
        >
          <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-[#5B8266] to-[#E78C56] opacity-75 blur-[2px]" />
        </motion.div>
      </div>

      {label && (
        <span className="text-xs md:text-sm font-medium text-[#59655D] tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
};
