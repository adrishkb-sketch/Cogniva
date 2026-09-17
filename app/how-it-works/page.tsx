'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Cpu, ShieldCheck, WifiOff, Sparkles, Layers, Activity } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Observe & Measure in Everyday Contexts',
      desc: 'Instead of abstract puzzle tests, Cogniva observes response latency, sequence order errors, retries, and assistance cues during familiar life routines (like making tea or finding glasses).'
    },
    {
      num: '02',
      title: 'Build Personal Functional Baseline',
      desc: 'Cogniva establishes a statistical baseline over 10–14 sessions unique to that individual. We never compare patients against each other or arbitrary population statistics.'
    },
    {
      num: '03',
      title: 'Adapt Next Session Dynamically',
      desc: 'The Adaptive Escalator adjusts difficulty, step count (e.g. 4 steps down to 2 steps), visual contrast, and modality in real-time, preventing cognitive strain or emotional frustration.'
    },
    {
      num: '04',
      title: 'Explain Changes to Caregivers',
      desc: 'The Cognitive Change Radar surfaces clear, plain-language observations (e.g., "Sequencing activities took 40s longer than usual across the last 6 sessions") for family and clinicians.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#5B8266] uppercase tracking-wider">System Architecture</span>
        <h1 className="text-3xl sm:text-5xl font-bold text-[#2C332D]">
          How Cogniva Works Under the Hood
        </h1>
        <p className="text-base text-[#59655D]">
          A closed-loop cognitive rehabilitation platform combining offline-first local persistence, statistical change detection, and verified memory grounding.
        </p>
      </div>

      {/* Step Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((s) => (
          <GlassCard key={s.num} className="space-y-3">
            <span className="text-2xl font-black text-[#5B8266]/70">{s.num}</span>
            <h3 className="text-xl font-bold text-[#2C332D]">{s.title}</h3>
            <p className="text-sm text-[#59655D] leading-relaxed">{s.desc}</p>
          </GlassCard>
        ))}
      </div>

      {/* Technical Guardrails Section */}
      <GlassCard variant="elevated" className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBF2EC] text-[#5B8266] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2C332D]">Strict Safety & Responsible AI Architecture</h2>
            <p className="text-xs text-[#59655D]">Zero-hallucination memory grounding with clinical boundary enforcement</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#2C332D]">No Hallucinated Memories</h4>
            <p className="text-xs text-[#59655D]">
              All family members, places, and facts must be explicitly entered and verified by an authorized caregiver. If unknown, the system safely states it has no record.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#2C332D]">No Medical Diagnosing</h4>
            <p className="text-xs text-[#59655D]">
              Cogniva strictly observes activity metrics (latency, errors) and explains deltas. It never diagnoses dementia or modifies prescriptions.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-[#2C332D]">100% Offline Persistence</h4>
            <p className="text-xs text-[#59655D]">
              Life Sim, Memories, Routine, and Garden run fully in offline mode via local storage and queue sync when internet connectivity returns.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="text-center pt-4">
        <Link href="/demo">
          <GlassButton variant="primary" size="lg">
            Experience the 5-Minute Guided Demo →
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
