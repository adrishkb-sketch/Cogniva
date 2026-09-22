'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Sparkles } from 'lucide-react';
import { SyncIndicator } from '@/components/ui/SyncIndicator';
import { ThemeToggle } from '@/components/ThemeToggle';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  // If in pure patient mode, patient has its own minimal navigation
  if (pathname.startsWith('/patient')) {
    return null;
  }

  const isCurrent = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#06090E]/80 border-b border-[var(--border-subtle)] gpu-layer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--accent-cyan)] via-[var(--accent-purple)] to-[var(--accent-emerald)] p-[1px] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0D1117] rounded-[11px] flex items-center justify-center">
              <Heart className="w-4 h-4 text-[var(--accent-cyan)] fill-[var(--accent-cyan)]/20" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-[var(--text-primary)] tracking-tight">Cogniva</span>
            <span className="hidden sm:block text-[10px] text-[var(--text-secondary)] font-medium">
              Cognitive Rehabilitation & Memory Companion
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)]">
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              isCurrent('/') ? 'text-[var(--text-primary)] bg-white/10 shadow-sm border border-white/10' : 'hover:text-[var(--text-primary)] hover:bg-white/5'
            }`}
          >
            Overview
          </Link>
          <Link
            href="/how-it-works"
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              isCurrent('/how-it-works') ? 'text-[var(--text-primary)] bg-white/10 shadow-sm border border-white/10' : 'hover:text-[var(--text-primary)] hover:bg-white/5'
            }`}
          >
            Ecosystem
          </Link>
          <Link
            href="/caregiver"
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              isCurrent('/caregiver') ? 'text-[var(--accent-purple)] bg-[var(--accent-purple-subtle)] border border-[var(--accent-purple)]/30 font-semibold' : 'hover:text-[var(--text-primary)] hover:bg-white/5'
            }`}
          >
            Caregiver Portal
          </Link>
          <Link
            href="/patient"
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              isCurrent('/patient') ? 'text-[var(--accent-cyan)] bg-[var(--accent-cyan-subtle)] border border-[var(--accent-cyan)]/30 font-semibold' : 'hover:text-[var(--text-primary)] hover:bg-white/5'
            }`}
          >
            Patient Experience
          </Link>
          <Link
            href="/health"
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              isCurrent('/health') ? 'text-[var(--accent-emerald)] bg-[var(--accent-emerald-subtle)] border border-[var(--accent-emerald)]/30 font-semibold' : 'hover:text-[var(--text-primary)] hover:bg-white/5'
            }`}
          >
            Clinical Reports
          </Link>
        </nav>

        {/* Right CTA / Sync / Theme */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SyncIndicator />
          <Link
            href="/onboarding"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-[#06090E] text-xs font-bold shadow-[var(--shadow-glow-cyan)] hover:opacity-95 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Caregiver Onboarding</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
