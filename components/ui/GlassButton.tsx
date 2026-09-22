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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer gpu-layer';

  const variantStyles = {
    primary: 'bg-[var(--bg-surface)] text-[var(--accent-cyan)] hover:bg-[var(--bg-panel)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:shadow-[var(--shadow-glow-cyan)]',
    secondary: 'bg-[var(--bg-panel)] text-[var(--text-primary)] hover:border-[var(--accent-purple)] hover:shadow-[var(--shadow-glow-purple)] border border-[var(--border-subtle)]',
    patient: 'bg-[var(--bg-panel)] text-[var(--text-primary)] hover:border-[var(--accent-cyan)] hover:shadow-[var(--shadow-glow-cyan)] border-2 border-[var(--border-focus)] font-semibold tracking-wide min-h-[64px]',
    emergency: 'bg-[var(--bg-surface)] text-[#FF4444] hover:bg-[#2A0000] border-2 border-[#AA0000] shadow-md font-bold text-lg',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border-transparent'
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
