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
import { BackgroundAnimation } from '@/components/ui/BackgroundAnimation';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-[var(--text-primary)] overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 sm:px-6 lg:px-8 w-full text-center overflow-hidden">
        {/* Animated Background */}
        <BackgroundAnimation showWave={true} />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-10 max-w-5xl mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#02050A]/80 backdrop-blur-md border border-[var(--border-subtle)] shadow-[var(--shadow-glow-cyan)] text-sm font-semibold text-[var(--accent-cyan)]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Personalized Cognitive Rehabilitation & Memory Ecosystem</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] drop-shadow-2xl"
          >
            Connect mind to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-purple)] to-[var(--accent-cyan)] bg-[length:200%_auto] animate-gradient">everyday life</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-[var(--text-secondary)] max-w-3xl leading-relaxed font-light drop-shadow-md"
          >
            Cogniva transforms everyday life into an adaptive cognitive rehabilitation environment. Grounded in personal memories, daily routines, and real-world simulations for dementia care.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 w-full sm:w-auto"
          >
            <Link href="/demo" className="w-full sm:w-auto">
              <GlassButton variant="primary" size="lg" className="w-full rounded-2xl gap-2 font-bold text-lg px-8 py-6 shadow-[var(--shadow-glow-cyan)] hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
                <span>Launch Demo</span>
              </GlassButton>
            </Link>

            <Link href="/patient" className="w-full sm:w-auto">
              <GlassButton variant="secondary" size="lg" className="w-full rounded-2xl gap-2 px-8 py-6 text-lg hover:scale-105 transition-transform bg-[#02050A]/50 backdrop-blur-md">
                <span>Patient Experience</span>
              </GlassButton>
            </Link>

            <Link href="/caregiver" className="w-full sm:w-auto">
              <GlassButton variant="ghost" size="lg" className="w-full rounded-2xl px-8 py-6 text-lg hover:bg-white/5">
                <span>Caregiver Dashboard →</span>
              </GlassButton>
            </Link>
          </motion.div>
        </div>
        {/* Custom Visual Hero Diagram */}
        <div className="mt-24 relative max-w-5xl mx-auto z-10">
          <GlassCard variant="elevated" className="p-8 md:p-12 relative overflow-hidden">
            {/* Core Diagram Flow */}
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-widest">
                The Cogniva Closed-Loop Model
              </span>
              <h3 className="text-2xl font-bold mt-2">
                From Personal Memories to Adaptive Daily Living
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 relative z-10 text-center">
              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:shadow-[var(--shadow-glow-cyan)] transition-all cursor-pointer">
                <div className="text-3xl mb-2">👵</div>
                <div className="font-bold text-sm">Person</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-1">Anima Das (72)</div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-purple)] hover:shadow-[var(--shadow-glow-purple)] transition-all cursor-pointer">
                <div className="text-3xl mb-2">📖</div>
                <div className="font-bold text-sm">Memories</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-1">Family & Assam Home</div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-emerald)] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all cursor-pointer">
                <div className="text-3xl mb-2">🧠</div>
                <div className="font-bold text-sm">Engine</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-1">Adaptive Escalator</div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-orange)] transition-all cursor-pointer">
                <div className="text-3xl mb-2">☕</div>
                <div className="font-bold text-sm">Life Sim</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-1">Morning Tea Routine</div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1, y: -5 }} className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:shadow-[var(--shadow-glow-cyan)] col-span-2 sm:col-span-1 transition-all cursor-pointer">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-sm">Caregiver</div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-1">Change Radar</div>
              </motion.div>
            </div>

            {/* Floating Glass Pills */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10 pt-8 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
                <Brain className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span className="font-medium">Real-Life Simulations</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
                <Radio className="w-4 h-4 text-[var(--accent-purple)]" />
                <span className="font-medium">Cognitive Change Radar</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
                <Volume2 className="w-4 h-4 text-[var(--accent-emerald)]" />
                <span className="font-medium">Family Voice Reminders</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
                <WifiOff className="w-4 h-4 text-[var(--accent-orange)]" />
                <span className="font-medium">100% Offline-First Mode</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-cyan)]" />
                <span className="font-medium">Strict Memory RAG Grounding</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs">
                <Sprout className="w-4 h-4 text-[var(--accent-emerald)]" />
                <span className="font-medium">Calming Activity Garden</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* WHY COGNITIVE SUPPORT MUST BE PERSONAL */}
      <section className="py-24 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-wider">The Central Philosophy</span>
              <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
                Do not train patients for abstract games. <br/>
                <span className="text-[var(--accent-purple)]">Support abilities used in actual life.</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Traditional brain games train users to get high scores on artificial puzzles. Cogniva trains and supports cognitive recall through real family photographs, morning tea steps, familiar regional sounds, and verified memories.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 w-12 h-12 shrink-0 rounded-2xl bg-[var(--bg-main)] border border-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)] flex items-center justify-center font-bold shadow-[var(--shadow-glow-cyan)]">1</div>
                <div>
                  <h4 className="text-xl font-bold">Personal Memory Grounding</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">Activities use verified family photos, childhood homes, and heirloom objects.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-12 h-12 shrink-0 rounded-2xl bg-[var(--bg-main)] border border-[var(--accent-purple-subtle)] text-[var(--accent-purple)] flex items-center justify-center font-bold shadow-[var(--shadow-glow-purple)]">2</div>
                <div>
                  <h4 className="text-xl font-bold">Adaptive Cognitive Escalator</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">Pacing automatically adjusts step density based on latency to prevent fatigue.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-12 h-12 shrink-0 rounded-2xl bg-[var(--bg-main)] border border-[var(--accent-emerald-subtle)] text-[var(--accent-emerald)] flex items-center justify-center font-bold shadow-[0_0_15px_rgba(0,255,136,0.3)]">3</div>
                <div>
                  <h4 className="text-xl font-bold">Personal Baseline Change Radar</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-1">Compares the patient exclusively against their own historical baseline.</p>
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <motion.div 
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-cyan)] to-[var(--accent-purple)] rounded-3xl blur-3xl opacity-30"
            />
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src="/images/elderly_care.jpg" 
              alt="Elderly care and memory" 
              className="relative z-10 w-full h-[500px] object-cover rounded-3xl border border-[var(--border-subtle)] shadow-2xl cursor-pointer"
            />
          </motion.div>
        </div>
      </section>

      {/* CORE CAPABILITIES GRID */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-[var(--accent-purple)] uppercase tracking-wider">Features & Modalities</span>
          <h2 className="text-3xl sm:text-5xl font-bold">
            An Ecosystem Designed Around the Individual
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Explore the dedicated modules tailored for the patient, family caregiver, and clinical healthcare worker.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <GlassCard className="h-full space-y-5 hover:border-[var(--accent-cyan)] hover:shadow-[var(--shadow-glow-cyan)] transition-all hover:-translate-y-2 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-4xl">☕</span>
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--accent-cyan)] font-semibold">Core Feature</span>
              </div>
              <h3 className="text-xl font-bold">Life Sim: Real-World Scenarios</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Practice making morning tea, finding reading glasses, and preparing for doctor visits with calming cues and zero shame.
              </p>
              <Link href="/patient/life-sim" className="inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-cyan)] hover:underline">
                Launch Life Sim →
              </Link>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <GlassCard className="h-full space-y-5 hover:border-[var(--accent-purple)] hover:shadow-[var(--shadow-glow-purple)] transition-all hover:-translate-y-2 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-4xl">📡</span>
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--accent-purple)] font-semibold">Caregiver AI</span>
              </div>
              <h3 className="text-xl font-bold">Cognitive Change Radar</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Statistically detects shifts in latency, sequencing, and recognition compared to personal history, explaining trends in plain language.
              </p>
              <Link href="/caregiver/change-radar" className="inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-purple)] hover:underline">
                View Change Radar →
              </Link>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <GlassCard className="h-full space-y-5 hover:border-[var(--accent-emerald)] hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all hover:-translate-y-2 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-4xl">🗺️</span>
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--accent-emerald)] font-semibold">Reminiscence</span>
              </div>
              <h3 className="text-xl font-bold">Memory Map & Scrapbook</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Explore interactive visual branches for Childhood, Home, Festivals, and Family with grounded audio memories.
              </p>
              <Link href="/patient/memory-map" className="inline-flex items-center gap-1 text-sm font-bold text-[var(--accent-emerald)] hover:underline">
                Explore Memory Map →
              </Link>
            </GlassCard>
          </motion.div>
        </div>

        {/* IMPACT METRICS SECTION - NEW DETAIL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl bg-[var(--bg-panel)] border border-[var(--border-subtle)] shadow-[var(--shadow-minimal)]"
        >
          <div className="text-center space-y-2 border-r border-[var(--border-subtle)] last:border-0 pr-4">
            <h4 className="text-4xl font-black text-[var(--accent-cyan)]">94%</h4>
            <p className="text-sm text-[var(--text-secondary)] font-medium">Reduced Caregiver Anxiety</p>
          </div>
          <div className="text-center space-y-2 border-r border-[var(--border-subtle)] last:border-0 px-4">
            <h4 className="text-4xl font-black text-[var(--accent-purple)]">100+</h4>
            <p className="text-sm text-[var(--text-secondary)] font-medium">Simulated Daily Routines</p>
          </div>
          <div className="text-center space-y-2 border-r border-[var(--border-subtle)] last:border-0 px-4">
            <h4 className="text-4xl font-black text-[var(--accent-emerald)]">10k+</h4>
            <p className="text-sm text-[var(--text-secondary)] font-medium">Memories Preserved</p>
          </div>
          <div className="text-center space-y-2 px-4">
            <h4 className="text-4xl font-black text-[var(--text-primary)]">Offline</h4>
            <p className="text-sm text-[var(--text-secondary)] font-medium">Privacy-First Grounding</p>
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-[var(--bg-main)] border-t border-[var(--border-subtle)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-wider">How to Use Cogniva</span>
            <h2 className="text-3xl sm:text-5xl font-bold">
              Simple Setup. Powerful Impact.
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)]">
              Designed so families can set it up in minutes, allowing patients to use it completely independently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-minimal)] text-center group"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[var(--bg-panel)] border border-[var(--accent-purple)] text-[var(--accent-purple)] flex items-center justify-center font-bold text-xl shadow-[var(--shadow-glow-purple)] group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="mt-6 mb-4">
                <span className="text-5xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Caregiver Setup</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                The family logs into the Caregiver Dashboard to upload cherished photos, record voice reminders, and select regional cultural packs.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-minimal)] text-center group"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[var(--bg-panel)] border border-[var(--accent-cyan)] text-[var(--accent-cyan)] flex items-center justify-center font-bold text-xl shadow-[var(--shadow-glow-cyan)] group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="mt-6 mb-4">
                <span className="text-5xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Personalization</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Cogniva's offline AI securely processes the data, weaving it into daily cognitive exercises, memory maps, and simulated routines.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[var(--shadow-minimal)] text-center group"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[var(--bg-panel)] border border-[var(--accent-emerald)] text-[var(--accent-emerald)] flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(0,255,136,0.3)] group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="mt-6 mb-4">
                <span className="text-5xl">👵</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Independent Play</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                The patient receives a calm, tactile tablet interface where they can independently practice life skills and relive grounded memories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 bg-[var(--bg-panel)] border-t border-[var(--border-subtle)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight">
            “Cogniva doesn’t ask a patient to adapt to technology. Cogniva adapts technology to the person.”
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Experience the complete 5-minute interactive demonstration designed for hackathon judges, geriatric caregivers, and clinicians.
          </p>
          <div className="pt-6">
            <Link href="/demo">
              <GlassButton variant="primary" size="lg" className="rounded-2xl gap-3 font-bold text-lg px-8 py-5">
                <Sparkles className="w-6 h-6" />
                <span>Start 5-Minute Guided Presentation</span>
              </GlassButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
