'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle' | 'patient' | 'accent-sage' | 'accent-peach' | 'accent-coral' | 'accent-lavender';
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'glass-card p-6',
    elevated: 'glass-panel-elevated p-6 md:p-8',
    subtle: 'bg-white/60 backdrop-blur-md border border-[#E8E0D5]/60 shadow-sm rounded-2xl p-5',
    patient: 'bg-white/90 backdrop-blur-lg border-2 border-[#E0D8CC] shadow-md rounded-3xl p-6 md:p-8 hover:border-[#5B8266]/50',
    'accent-sage': 'bg-[#EBF2EC]/80 backdrop-blur-md border border-[#C5DBCB] shadow-sm rounded-2xl p-6',
    'accent-peach': 'bg-[#FDF1EA]/80 backdrop-blur-md border border-[#F8D5C2] shadow-sm rounded-2xl p-6',
    'accent-coral': 'bg-[#FDEEEA]/80 backdrop-blur-md border border-[#F6CBC0] shadow-sm rounded-2xl p-6',
    'accent-lavender': 'bg-[#F3EEF3]/80 backdrop-blur-md border border-[#DFD3DF] shadow-sm rounded-2xl p-6',
  };

  return (
    <div
      className={twMerge(clsx(variantStyles[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
};
