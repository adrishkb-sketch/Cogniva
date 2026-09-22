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
    default: 'minimal-card p-6 gpu-layer',
    elevated: 'minimal-panel-elevated p-6 md:p-8 gpu-layer',
    subtle: 'bg-[var(--bg-panel)] border border-[var(--border-subtle)] shadow-sm rounded-2xl p-5 gpu-layer',
    patient: 'bg-[var(--bg-surface)] border-2 border-[var(--border-focus)] shadow-md rounded-3xl p-6 md:p-8 hover:border-[var(--accent-cyan)] hover:shadow-[var(--shadow-glow-cyan)] transition-all gpu-layer',
    'accent-sage': 'bg-[var(--bg-panel)] border border-[var(--accent-emerald-subtle)] shadow-[var(--shadow-glow-cyan)] rounded-2xl p-6 gpu-layer',
    'accent-peach': 'bg-[var(--bg-panel)] border border-[var(--accent-orange-subtle)] shadow-[var(--shadow-glow-purple)] rounded-2xl p-6 gpu-layer',
    'accent-coral': 'bg-[var(--bg-panel)] border border-[var(--border-subtle)] shadow-[var(--shadow-glow-purple)] rounded-2xl p-6 gpu-layer',
    'accent-lavender': 'bg-[var(--bg-panel)] border border-[var(--accent-purple-subtle)] shadow-[var(--shadow-glow-cyan)] rounded-2xl p-6 gpu-layer',
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
