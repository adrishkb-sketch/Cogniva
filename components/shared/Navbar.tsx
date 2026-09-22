'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Activity, ShieldCheck, Compass, Sparkles, BookOpen } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--bg-surface)]/85 border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[var(--accent-emerald)] to-[var(--accent-orange)] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white/80" />
          </div>
          <div>
            <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">Cogniva</span>
            <span className="hidden sm:block text-[10px] text-[#59655D] font-medium tracking-wide">
              Cognitive Rehabilitation & Memory Companion
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)]">
          <Link
            href="/"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/') ? 'text-[var(--text-primary)] bg-[var(--bg-panel)] shadow-xs' : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel)]/50'
            }`}
          >
            Overview
          </Link>
          <Link
            href="/how-it-works"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/how-it-works') ? 'text-[var(--text-primary)] bg-[var(--bg-panel)] shadow-xs' : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel)]/50'
            }`}
          >
            Ecosystem
          </Link>
          <Link
            href="/caregiver"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/caregiver') ? 'text-[var(--text-primary)] bg-[var(--accent-orange-subtle)] font-semibold' : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel)]/50'
            }`}
          >
            Caregiver Portal
          </Link>
          <Link
            href="/patient"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/patient') ? 'text-[var(--text-primary)] bg-[var(--accent-emerald-subtle)] font-semibold' : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel)]/50'
            }`}
          >
            Patient Experience
          </Link>
          <Link
            href="/health"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/health') ? 'text-[var(--text-primary)] bg-[var(--accent-purple-subtle)] font-semibold' : 'hover:text-[var(--text-primary)] hover:bg-[var(--bg-panel)]/50'
            }`}
          >
            Clinical Reports
          </Link>
        </nav>

        {/* Right CTA / Sync */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SyncIndicator />
          <Link
            href="/onboarding"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--accent-emerald)] text-[var(--bg-main)] text-xs font-bold shadow-xs hover:opacity-80 transition-all"
          >
            <span>Caregiver Onboarding</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
