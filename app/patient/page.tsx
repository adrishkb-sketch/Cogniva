'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sparkles, Heart } from 'lucide-react';
import { DEMO_PATIENT } from '@/lib/demo/demo-patient-anima';

export default function PatientHomePage() {
  const cards = [
    {
      title: 'Practice Routine',
      subtitle: 'Morning Tea & Daily Living',
      href: '/patient/life-sim',
      icon: '☕',
      bgClass: 'bg-[#EBF2EC] hover:bg-[#DEEBE0] border-[#C5DBCB]',
      accentColor: 'text-[#3F5E47]'
    },
    {
      title: 'My Memories',
      subtitle: 'Family & Jorhat Scrapbook',
      href: '/patient/memories',
      icon: '📖',
      bgClass: 'bg-[#FDF1EA] hover:bg-[#FCE3D4] border-[#F8D5C2]',
      accentColor: 'text-[#B85D43]'
    },
    {
      title: 'My Day Timeline',
      subtitle: 'See what we did today',
      href: '/patient/day',
      icon: '🏡',
      bgClass: 'bg-[#F3EEF3] hover:bg-[#E9DFE9] border-[#DFD3DF]',
      accentColor: 'text-[#5D4A5D]'
    },
    {
      title: 'Sounds of Life',
      subtitle: 'Rain, Bells & Bihu Melodies',
      href: '/patient/sounds',
      icon: '🎵',
      bgClass: 'bg-[#FEF6E7] hover:bg-[#FDEFCB] border-[#F8D5C2]',
      accentColor: 'text-[#D9A036]'
    },
    {
      title: 'Talk with Me',
      subtitle: 'Share stories & memories',
      href: '/patient/talk',
      icon: '💬',
      bgClass: 'bg-[#EBF2EC] hover:bg-[#DEEBE0] border-[#C5DBCB]',
      accentColor: 'text-[#3F5E47]'
    },
    {
      title: 'Today’s Routine',
      subtitle: 'Tea, Tablets & Strolls',
      href: '/patient/routine',
      icon: '💊',
      bgClass: 'bg-[#FDF1EA] hover:bg-[#FCE3D4] border-[#F8D5C2]',
      accentColor: 'text-[#B85D43]'
    },
    {
      title: 'My Garden',
      subtitle: 'Watch your Jasmine grow',
      href: '/patient/garden',
      icon: '🌿',
      bgClass: 'bg-[#EBF2EC] hover:bg-[#DEEBE0] border-[#C5DBCB]',
      accentColor: 'text-[#3F5E47]'
    },
    {
      title: 'Life Storybook',
      subtitle: 'Your beautiful personal book',
      href: '/patient/storybook',
      icon: '📚',
      bgClass: 'bg-[#F3EEF3] hover:bg-[#E9DFE9] border-[#DFD3DF]',
      accentColor: 'text-[#5D4A5D]'
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Warm Patient Greeting */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-3xl">🌸</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
              Peaceful Morning in Assam
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C332D]">
            Good morning, {DEMO_PATIENT.preferredName} <span className="text-[#D9654B]">❤️</span>
          </h1>
          <p className="text-base sm:text-lg text-[#59655D]">
            What would you like to do today? Take all the time you need.
          </p>
        </div>

        {/* Big Flagship Memory Theatre CTA */}
        <Link
          href="/patient/theatre"
          className="shrink-0 w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-[#5B8266] to-[#E78C56] text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-[#E9C46A]" />
          <span>Enter Memory Theatre</span>
        </Link>
      </div>

      {/* Grid of Large Tactile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`block p-6 sm:p-8 rounded-3xl border-2 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-97 cursor-pointer ${card.bgClass}`}
          >
            <div className="text-4xl sm:text-5xl mb-3">{card.icon}</div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2C332D] leading-tight">
              {card.title}
            </h2>
            <p className="text-sm sm:text-base text-[#59655D] mt-1 font-medium">
              {card.subtitle}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
