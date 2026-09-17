'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'patient' | 'emergency' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'patient-huge';
  children: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variantStyles = {
    primary: 'bg-[#5B8266] text-white hover:bg-[#4D7056] shadow-sm hover:shadow-md border border-[#4D7056]/30',
    secondary: 'bg-white/85 text-[#2C332D] hover:bg-white border border-[#E0D8CC] shadow-sm hover:shadow',
    patient: 'bg-[#5B8266] text-white hover:bg-[#4D7056] border-2 border-[#3E5C46] shadow-md hover:shadow-lg font-semibold tracking-wide min-h-[64px]',
    emergency: 'bg-[#D9654B] text-white hover:bg-[#C2543B] border-2 border-[#A8422B] shadow-md font-bold text-lg',
    ghost: 'bg-transparent text-[#59655D] hover:bg-black/5 border-transparent'
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-xl',
    md: 'text-sm px-5 py-2.5 rounded-2xl',
    lg: 'text-base px-6 py-3.5 rounded-2xl',
    'patient-huge': 'text-xl md:text-2xl px-8 py-5 rounded-3xl min-w-[200px] min-h-[64px]'
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variantStyles[variant], sizeStyles[size], className))}
      {...props}
    >
      {children}
    </button>
  );
};
