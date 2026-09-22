'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Image as ImageIcon, MessageCircle, Sprout, LifeBuoy, ArrowLeft } from 'lucide-react';
import { SyncIndicator } from '@/components/ui/SyncIndicator';
import { CustomLanguageSelector } from '@/components/patient/CustomLanguageSelector';

export const PatientNav: React.FC = () => {
  const pathname = usePathname();
  const isSubPage = pathname !== '/patient';

  const navItems = [
    { href: '/patient', label: 'Home', icon: Home, color: 'text-[var(--accent-cyan)]' },
    { href: '/patient/day', label: 'My Day', icon: Calendar, color: 'text-[var(--accent-purple)]' },
    { href: '/patient/memories', label: 'Memories', icon: ImageIcon, color: 'text-[var(--accent-emerald)]' },
    { href: '/patient/talk', label: 'Talk', icon: MessageCircle, color: 'text-[var(--accent-orange)]' },
    { href: '/patient/garden', label: 'Garden', icon: Sprout, color: 'text-[var(--accent-cyan)]' },
  ];

  return (
    <>
      {/* Patient Top Bar */}
      <header className="sticky top-0 z-40 w-full bg-[var(--bg-panel)] border-b border-[var(--border-subtle)] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isSubPage ? (
            <Link
              href="/patient"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-bold text-base hover:border-[var(--accent-cyan)] hover:shadow-[var(--shadow-glow-cyan)] transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-[var(--accent-cyan)]" />
              <span>Back Home</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏡</span>
              <span className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">Anima’s Safe Space</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <CustomLanguageSelector />
          <SyncIndicator />
          <Link
            href="/patient/help"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--bg-surface)] border border-red-500/50 text-red-400 font-bold text-base hover:bg-red-500/10 hover:border-red-500 shadow-md transition-all active:scale-95"
          >
            <LifeBuoy className="w-5 h-5 text-red-400" />
            <span>I Need Help</span>
          </Link>
        </div>
      </header>

      {/* Patient Bottom Bar for Tablet / Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-panel)] border-t border-[var(--border-subtle)] py-2 px-4 flex items-center justify-around shadow-[var(--shadow-minimal)]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[56px] px-3 py-1.5 rounded-2xl transition-all ${
                isActive
                  ? 'bg-[var(--bg-surface)] text-[var(--accent-cyan)] font-bold scale-105 border border-[var(--accent-cyan)] shadow-[var(--shadow-glow-cyan)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-[var(--accent-cyan)]' : item.color}`} />
              <span className="text-xs sm:text-sm mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
