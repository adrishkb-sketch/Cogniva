'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Activity, ShieldCheck, Compass, Sparkles, BookOpen } from 'lucide-react';
import { SyncIndicator } from '@/components/ui/SyncIndicator';

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF7F2]/85 border-b border-[#E8E0D5]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5B8266] to-[#E78C56] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white/80" />
          </div>
          <div>
            <span className="text-xl font-bold text-[#2C332D] tracking-tight">Cogniva</span>
            <span className="hidden sm:block text-[10px] text-[#59655D] font-medium tracking-wide">
              Cognitive Rehabilitation & Memory Companion
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-[#59655D]">
          <Link
            href="/"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/') ? 'text-[#2C332D] bg-white/70 shadow-xs' : 'hover:text-[#2C332D] hover:bg-white/40'
            }`}
          >
            Overview
          </Link>
          <Link
            href="/how-it-works"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/how-it-works') ? 'text-[#2C332D] bg-white/70 shadow-xs' : 'hover:text-[#2C332D] hover:bg-white/40'
            }`}
          >
            Ecosystem
          </Link>
          <Link
            href="/caregiver"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/caregiver') ? 'text-[#2C332D] bg-[#E78C56]/15 text-[#B85D43] font-semibold' : 'hover:text-[#2C332D] hover:bg-white/40'
            }`}
          >
            Caregiver Portal
          </Link>
          <Link
            href="/patient"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/patient') ? 'text-[#2C332D] bg-[#5B8266]/15 text-[#3F5E47] font-semibold' : 'hover:text-[#2C332D] hover:bg-white/40'
            }`}
          >
            Patient Experience
          </Link>
          <Link
            href="/health"
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              isCurrent('/health') ? 'text-[#2C332D] bg-[#8E778E]/15 text-[#5D4A5D] font-semibold' : 'hover:text-[#2C332D] hover:bg-white/40'
            }`}
          >
            Clinical Reports
          </Link>
        </nav>

        {/* Right CTA / Sync */}
        <div className="flex items-center gap-3">
          <SyncIndicator />
          <Link
            href="/onboarding"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#5B8266] text-white text-xs font-semibold shadow-xs hover:bg-[#4D7056] transition-all"
          >
            <span>Caregiver Onboarding</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
