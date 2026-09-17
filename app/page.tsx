'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Brain, 
  Radio, 
  Volume2, 
  WifiOff, 
  Sprout, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  Users, 
  Layers,
  FileCheck
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { AIOrb } from '@/components/ui/AIOrb';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Decorative background glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#EBF2EC] rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#FDF1EA] rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E0D8CC] shadow-xs text-xs font-semibold text-[#5B8266]">
            <Sparkles className="w-4 h-4 text-[#E78C56]" />
            <span>Personalized Cognitive Rehabilitation & Memory Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#2C332D] tracking-tight leading-[1.12]">
            Helping the mind stay connected to <span className="text-[#5B8266] underline decoration-[#E78C56]/40 decoration-4">everyday life</span>.
          </h1>

          <p className="text-lg sm:text-xl text-[#59655D] max-w-3xl mx-auto leading-relaxed font-normal">
            Cogniva transforms everyday life into an adaptive cognitive rehabilitation environment. Grounded in personal memories, daily routines, familiar sounds, and real-world simulations for elderly dementia care.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/demo">
              <GlassButton variant="primary" size="lg" className="rounded-2xl gap-2 font-semibold">
                <Sparkles className="w-5 h-5 text-[#E9C46A]" />
                <span>Launch 5-Min Guided Demo</span>
                <ArrowRight className="w-4 h-4" />
              </GlassButton>
            </Link>

            <Link href="/patient">
              <GlassButton variant="secondary" size="lg" className="rounded-2xl gap-2">
                <span>Try Patient Experience</span>
              </GlassButton>
            </Link>

            <Link href="/caregiver">
              <GlassButton variant="ghost" size="lg" className="rounded-2xl text-[#59655D] hover:text-[#2C332D]">
                <span>Caregiver Dashboard →</span>
              </GlassButton>
            </Link>
          </div>
        </div>

        {/* Custom Visual Hero Diagram with Floating Glass Cards */}
        <div className="mt-16 relative max-w-5xl mx-auto">
          <GlassCard variant="elevated" className="p-8 md:p-12 relative overflow-hidden">
            {/* Core Diagram Flow */}
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-[#849188] uppercase tracking-widest">
                The Cogniva Closed-Loop Model
              </span>
              <h3 className="text-2xl font-bold text-[#2C332D] mt-1">
                From Personal Memories to Adaptive Daily Living
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 relative z-10 text-center">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                <div className="text-2xl mb-1">👵</div>
                <div className="font-bold text-sm text-[#2C332D]">Person</div>
                <div className="text-[11px] text-[#59655D] mt-0.5">Anima Das (72)</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                <div className="text-2xl mb-1">📖</div>
                <div className="font-bold text-sm text-[#2C332D]">Memories</div>
                <div className="text-[11px] text-[#59655D] mt-0.5">Family & Assam Home</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                <div className="text-2xl mb-1">🧠</div>
                <div className="font-bold text-sm text-[#2C332D]">Engine</div>
                <div className="text-[11px] text-[#59655D] mt-0.5">Adaptive Escalator</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
                <div className="text-2xl mb-1">☕</div>
                <div className="font-bold text-sm text-[#2C332D]">Life Sim</div>
                <div className="text-[11px] text-[#59655D] mt-0.5">Morning Tea Routine</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] col-span-2 sm:col-span-1">
                <div className="text-2xl mb-1">📊</div>
                <div className="font-bold text-sm text-[#2C332D]">Caregiver</div>
                <div className="text-[11px] text-[#59655D] mt-0.5">Change Radar</div>
              </div>
            </div>

            {/* Floating Glass Pills */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8 pt-6 border-t border-[#E8E0D5]">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E8E0D5] text-xs">
                <Brain className="w-4 h-4 text-[#5B8266]" />
                <span className="font-medium text-[#2C332D]">Real-Life Simulations</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E8E0D5] text-xs">
                <Radio className="w-4 h-4 text-[#E78C56]" />
                <span className="font-medium text-[#2C332D]">Cognitive Change Radar</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E8E0D5] text-xs">
                <Volume2 className="w-4 h-4 text-[#8E778E]" />
                <span className="font-medium text-[#2C332D]">Family Voice Reminders</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E8E0D5] text-xs">
                <WifiOff className="w-4 h-4 text-[#B85D43]" />
                <span className="font-medium text-[#2C332D]">100% Offline-First Mode</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E8E0D5] text-xs">
                <ShieldCheck className="w-4 h-4 text-[#5B8266]" />
                <span className="font-medium text-[#2C332D]">Strict Memory RAG Grounding</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/70 border border-[#E8E0D5] text-xs">
                <Sprout className="w-4 h-4 text-[#5B8266]" />
                <span className="font-medium text-[#2C332D]">Calming Activity Garden</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* WHY COGNITIVE SUPPORT MUST BE PERSONAL */}
      <section className="py-16 bg-white/50 border-y border-[#E8E0D5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#5B8266] uppercase tracking-wider">The Central Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C332D]">
              Do not train patients for abstract games. Support abilities used in actual life.
            </h2>
            <p className="text-sm sm:text-base text-[#59655D] leading-relaxed">
              Traditional brain games train users to get high scores on artificial puzzles. Cogniva trains and supports cognitive recall through real family photographs, morning tea steps, familiar regional sounds, and verified memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF2EC] text-[#5B8266] flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h4 className="text-lg font-bold text-[#2C332D]">Personal Memory Grounding</h4>
              <p className="text-xs text-[#59655D] leading-relaxed">
                Activities use verified family photos (Daughter Ananya, Grandson Niloy), childhood homes in Jorhat, and heirloom objects like handloom Gamosa.
              </p>
            </GlassCard>

            <GlassCard className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF1EA] text-[#E78C56] flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h4 className="text-lg font-bold text-[#2C332D]">Adaptive Cognitive Escalator</h4>
              <p className="text-xs text-[#59655D] leading-relaxed">
                Pacing automatically adjusts step density from 4-step sequences down to 2 steps when latency rises, preventing fatigue and frustration.
              </p>
            </GlassCard>

            <GlassCard className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F3EEF3] text-[#8E778E] flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h4 className="text-lg font-bold text-[#2C332D]">Personal Baseline Change Radar</h4>
              <p className="text-xs text-[#59655D] leading-relaxed">
                Compares the patient exclusively against their own historical baseline—never against arbitrary population averages or diagnostic labels.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#E78C56] uppercase tracking-wider">Features & Modalities</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C332D]">
            An Ecosystem Designed Around the Individual
          </h2>
          <p className="text-sm sm:text-base text-[#59655D]">
            Explore the dedicated modules tailored for the patient, family caregiver, and clinical healthcare worker.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Life Sim */}
          <GlassCard className="space-y-4 hover:border-[#5B8266]/40">
            <div className="flex items-center justify-between">
              <span className="text-3xl">☕</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#EBF2EC] text-[#3F5E47] font-semibold">Core Feature</span>
            </div>
            <h3 className="text-xl font-bold text-[#2C332D]">Life Sim: Real-World Scenarios</h3>
            <p className="text-xs text-[#59655D] leading-relaxed">
              Practice making morning tea, finding reading glasses, and preparing for doctor visits with calming cues and zero shame.
            </p>
            <Link href="/patient/life-sim" className="inline-flex items-center gap-1 text-xs font-bold text-[#5B8266] hover:underline">
              Launch Life Sim →
            </Link>
          </GlassCard>

          {/* Card 2: Cognitive Twin & Change Radar */}
          <GlassCard className="space-y-4 hover:border-[#E78C56]/40">
            <div className="flex items-center justify-between">
              <span className="text-3xl">📡</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#FDF1EA] text-[#B85D43] font-semibold">Caregiver AI</span>
            </div>
            <h3 className="text-xl font-bold text-[#2C332D]">Cognitive Change Radar</h3>
            <p className="text-xs text-[#59655D] leading-relaxed">
              Statistically detects shifts in latency, sequencing, and recognition compared to personal history, explaining trends in plain language.
            </p>
            <Link href="/caregiver/change-radar" className="inline-flex items-center gap-1 text-xs font-bold text-[#E78C56] hover:underline">
              View Change Radar →
            </Link>
          </GlassCard>

          {/* Card 3: Memory World & Map */}
          <GlassCard className="space-y-4 hover:border-[#8E778E]/40">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🗺️</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#F3EEF3] text-[#5D4A5D] font-semibold">Reminiscence</span>
            </div>
            <h3 className="text-xl font-bold text-[#2C332D]">Memory Map & Scrapbook</h3>
            <p className="text-xs text-[#59655D] leading-relaxed">
              Explore interactive visual branches for Childhood, Home, Festivals, and Family with grounded audio memories.
            </p>
            <Link href="/patient/memory-map" className="inline-flex items-center gap-1 text-xs font-bold text-[#8E778E] hover:underline">
              Explore Memory Map →
            </Link>
          </GlassCard>

          {/* Card 4: Family Voice Reminders */}
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🎙️</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#FAF7F2] text-[#59655D] font-semibold">Caregiver Tool</span>
            </div>
            <h3 className="text-xl font-bold text-[#2C332D]">Family Voice Reminders</h3>
            <p className="text-xs text-[#59655D] leading-relaxed">
              Caregivers record real voice messages for medication and hydration, played during scheduled daily moments.
            </p>
            <Link href="/caregiver/routine" className="inline-flex items-center gap-1 text-xs font-bold text-[#5B8266] hover:underline">
              Manage Voice Reminders →
            </Link>
          </GlassCard>

          {/* Card 5: Cultural Memory Packs */}
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🌸</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#EBF2EC] text-[#3F5E47] font-semibold">North East Engine</span>
            </div>
            <h3 className="text-xl font-bold text-[#2C332D]">Cultural Memory Packs</h3>
            <p className="text-xs text-[#59655D] leading-relaxed">
              Modular cultural packs (Assam, Meghalaya) providing Bihu festivals, traditional foods, bell-metal wares, and regional sounds.
            </p>
            <Link href="/admin/cultural-packs" className="inline-flex items-center gap-1 text-xs font-bold text-[#5B8266] hover:underline">
              Inspect Cultural Packs →
            </Link>
          </GlassCard>

          {/* Card 6: Ask Cogniva Copilot */}
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl">🤖</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#FDF1EA] text-[#B85D43] font-semibold">Grounded AI</span>
            </div>
            <h3 className="text-xl font-bold text-[#2C332D]">Ask Cogniva AI Copilot</h3>
            <p className="text-xs text-[#59655D] leading-relaxed">
              Grounded AI assistant answering caregiver queries directly using recorded metrics and verified family data.
            </p>
            <Link href="/caregiver/copilot" className="inline-flex items-center gap-1 text-xs font-bold text-[#E78C56] hover:underline">
              Ask Copilot →
            </Link>
          </GlassCard>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-16 bg-[#FAF7F2] border-t border-[#E8E0D5] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C332D]">
            “Cogniva doesn’t ask a patient to adapt to technology. Cogniva adapts technology to the person.”
          </h2>
          <p className="text-base text-[#59655D] max-w-2xl mx-auto">
            Experience the complete 5-minute interactive demonstration designed for hackathon judges, geriatric caregivers, and clinicians.
          </p>
          <div className="pt-2">
            <Link href="/demo">
              <GlassButton variant="primary" size="lg" className="rounded-2xl gap-2 font-bold text-lg px-8 py-4">
                <Sparkles className="w-5 h-5 text-[#E9C46A]" />
                <span>Start 5-Minute Guided Presentation</span>
              </GlassButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
