'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { DEMO_PATIENT } from '@/lib/demo/demo-patient-anima';

export default function PatientHomePage() {
  const unifiedBgClass = 'bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--accent-purple)] hover:shadow-[var(--shadow-glow-purple)]';

  const cards = [
    {
      title: 'Practice Routine',
      subtitle: 'Morning Tea & Daily Living',
      href: '/patient/life-sim',
      icon: '☕',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
    {
      title: 'My Memories',
      subtitle: 'Family & Jorhat Scrapbook',
      href: '/patient/memories',
      icon: '📖',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
    {
      title: 'Memory Map',
      subtitle: 'Journey through your life places',
      href: '/patient/memory-map',
      icon: '🗺️',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
    {
      title: 'Memory Diary',
      subtitle: 'Write and save today’s thoughts',
      href: '/patient/diary',
      icon: '📝',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
    {
      title: 'My Day Timeline',
      subtitle: 'See what we did today',
      href: '/patient/day',
      icon: '🏡',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
    {
      title: 'Sounds of Life',
      subtitle: 'Rain, Bells & Bihu Melodies',
      href: '/patient/sounds',
      icon: '🎵',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
    {
      title: 'Talk with Me',
      subtitle: 'Share stories & memories',
      href: '/patient/talk',
      icon: '💬',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
    {
      title: 'Today’s Routine',
      subtitle: 'Tea, Tablets & Strolls',
      href: '/patient/routine',
      icon: '💊',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
    {
      title: 'My Garden',
      subtitle: 'Watch your Jasmine grow',
      href: '/patient/garden',
      icon: '🌿',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
    {
      title: 'Life Storybook',
      subtitle: 'Your beautiful personal book',
      href: '/patient/storybook',
      icon: '📚',
      bgClass: unifiedBgClass,
      accentColor: 'text-[var(--accent-purple)]'
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Warm Patient Greeting */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-panel)] border border-[var(--border-subtle)] shadow-[var(--shadow-minimal)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-3xl">🌸</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Peaceful Morning in Assam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Good morning, {DEMO_PATIENT.preferredName} <span className="text-[var(--accent-purple)]">❤️</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            What would you like to do today? Take all the time you need.
          </p>
        </div>

        {/* Big Flagship Memory Theatre CTA */}
        <Link
          href="/patient/theatre"
          className="shrink-0 w-full sm:w-auto px-6 py-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-purple)] text-white font-bold text-base shadow-[var(--shadow-glow-purple)] hover:bg-[var(--accent-purple)] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Enter Memory Theatre</span>
        </Link>
      </div>

      {/* Grid of Activity Bars (3 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border transition-all duration-300 shadow-[var(--shadow-minimal)] hover:-translate-y-1 active:scale-[0.98] cursor-pointer ${card.bgClass}`}
          >
            <div className={`text-4xl sm:text-5xl shrink-0 drop-shadow-lg`}>{card.icon}</div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight">
                {card.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1 font-medium">
                {card.subtitle}
              </p>
            </div>
            <div className="shrink-0 pl-4 text-[var(--accent-purple)] opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
