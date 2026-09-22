'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Info, Sparkles } from 'lucide-react';
import { SafetyEngine } from '@/lib/ai/safety';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090D16] border-t border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs py-12 px-4 sm:px-6 lg:px-8 gpu-layer">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[var(--accent-cyan)] to-[var(--accent-purple)] p-[1px]">
                <div className="w-full h-full bg-[#0D1117] rounded-[11px] flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[var(--accent-cyan)] fill-[var(--accent-cyan)]/20" />
                </div>
              </div>
              <span className="text-base font-extrabold text-[var(--text-primary)]">Cogniva</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Helping the mind stay connected to everyday life through personalized memories, routines, and functional cognitive activities.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <span className="font-bold text-[var(--text-primary)] tracking-wider uppercase text-[11px]">Ecosystem</span>
            <ul className="space-y-2 text-xs">
              <li><Link href="/patient" className="hover:text-[var(--accent-cyan)] transition-colors">Patient Experience</Link></li>
              <li><Link href="/caregiver" className="hover:text-[var(--accent-purple)] transition-colors">Caregiver Dashboard</Link></li>
              <li><Link href="/caregiver/change-radar" className="hover:text-[var(--accent-purple)] transition-colors">Cognitive Change Radar</Link></li>
              <li><Link href="/caregiver/copilot" className="hover:text-[var(--accent-purple)] transition-colors">Ask Cogniva AI Copilot</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <span className="font-bold text-[var(--text-primary)] tracking-wider uppercase text-[11px]">Regional & Safety</span>
            <ul className="space-y-2 text-xs">
              <li><Link href="/admin/cultural-packs" className="hover:text-[var(--accent-emerald)] transition-colors">Assam & North East Packs</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[var(--accent-cyan)] transition-colors">Offline-First Architecture</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--accent-purple)] transition-colors">Family Memory Privacy</Link></li>
              <li><Link href="/health" className="hover:text-[var(--accent-emerald)] transition-colors">Longitudinal Clinical Reports</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <span className="font-bold text-[var(--text-primary)] tracking-wider uppercase text-[11px]">Live Demonstration</span>
            <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
              Evaluating for hackathon judging? Launch the 5-minute interactive guided demo story with Anima Das (Assam).
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20 font-semibold hover:bg-[var(--accent-cyan)]/20 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch 5-Min Guided Demo →</span>
            </Link>
          </div>
        </div>

        {/* Medical Guardrail Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-start gap-3 text-[11px] leading-relaxed text-[var(--text-secondary)]">
          <Info className="w-5 h-5 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[var(--text-primary)] font-semibold">Important Medical & Scientific Positioning: </strong>
            {SafetyEngine.getMedicalDisclaimer()}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
          <p>© 2026 Cogniva Healthcare Technologies. Dedicated to compassionate elderly care.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[var(--text-secondary)]">Privacy & RLS</Link>
            <Link href="/how-it-works" className="hover:text-[var(--text-secondary)]">Architecture</Link>
            <span className="text-[var(--accent-emerald)]">Offline-First Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
