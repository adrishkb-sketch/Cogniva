'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { useNERState } from '@/components/shared/NERStateContext';
import { Sparkles, Brain, Layers, Volume2, Clock, Image, ArrowRight } from 'lucide-react';

export default function CognitiveGamesHubPage() {
  const { activePack } = useNERState();

  const games = [
    {
      title: 'NER Pattern & Heirloom Match',
      category: 'Pattern & Object Recognition',
      desc: `Recognize traditional ${activePack.householdObjects[0]?.name || 'handloom'} motifs, brass tea wares, and cultural symbols.`,
      icon: '🧣',
      href: '/patient/games/pattern-match',
      bgClass: 'bg-[#EBF2EC] hover:bg-[#DEEBE0] border-[#C5DBCB]',
      accent: 'text-[#3F5E47]'
    },
    {
      title: 'Life Sim: Everyday Routine',
      category: 'Daily Living & Sequencing',
      desc: `Practice preparing morning tea, getting ready for doctor visits, and organizing familiar belongings.`,
      icon: '☕',
      href: '/patient/life-sim',
      bgClass: 'bg-[#FDF1EA] hover:bg-[#FCE3D4] border-[#F8D5C2]',
      accent: 'text-[#B85D43]'
    },
    {
      title: 'Sounds of the North East',
      category: 'Auditory Reminiscence & Attention',
      desc: `Identify monsoon rain on tin roofs, traditional Pepa horn rhythms, and tea garden birds.`,
      icon: '🎵',
      href: '/patient/sounds',
      bgClass: 'bg-[#FEF6E7] hover:bg-[#FDEFCB] border-[#F8D5C2]',
      accent: 'text-[#D9A036]'
    },
    {
      title: 'Remember My Day Timeline',
      category: 'Episodic & Routine Recall',
      desc: `Reconstruct today's peaceful morning schedule and remember family visits and meal times.`,
      icon: '🏡',
      href: '/patient/day',
      bgClass: 'bg-[#F3EEF3] hover:bg-[#E9DFE9] border-[#DFD3DF]',
      accent: 'text-[#5D4A5D]'
    },
    {
      title: 'Family Face & Memory Anchor',
      category: 'Social & Emotional Engagement',
      desc: `Connect with verified photographs of daughter Ananya and grandson Niloy with zero shame.`,
      icon: '📖',
      href: '/patient/memories',
      bgClass: 'bg-[#EBF2EC] hover:bg-[#DEEBE0] border-[#C5DBCB]',
      accent: 'text-[#3F5E47]'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8266]">
            <Brain className="w-4 h-4 text-[#E78C56]" />
            <span>Culturally Grounded Cognitive Gaming Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            Cognitive Rehabilitation & Memory Games
          </h1>
          <p className="text-sm text-[#59655D]">
            Engaging activities adapted to {activePack.state} traditions, designed to support real-life cognitive function.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#EBF2EC] text-[#3F5E47] border border-[#C5DBCB]">
          Adaptive ML Pacing Active
        </span>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {games.map((g) => (
          <Link
            key={g.title}
            href={g.href}
            className={`p-6 sm:p-8 rounded-3xl border-2 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-98 flex flex-col justify-between cursor-pointer ${g.bgClass}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-5xl">{g.icon}</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-black/5 text-[#59655D]">
                  {g.category}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2C332D] leading-tight">
                {g.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#59655D] leading-relaxed">
                {g.desc}
              </p>
            </div>

            <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#2C332D] mt-2">
              <span>Start Activity</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
