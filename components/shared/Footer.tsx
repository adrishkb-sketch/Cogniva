'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, Globe, Info } from 'lucide-react';
import { SafetyEngine } from '@/lib/ai/safety';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8E0D5] text-[#59655D] text-xs py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#5B8266] flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="text-base font-bold text-[#2C332D]">Cogniva</span>
            </div>
            <p className="text-xs text-[#59655D] leading-relaxed">
              Helping the mind stay connected to everyday life through personalized memories, routines, and functional cognitive activities.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <span className="font-semibold text-[#2C332D] tracking-wider uppercase text-[11px]">Ecosystem</span>
            <ul className="space-y-1.5">
              <li><Link href="/patient" className="hover:text-[#2C332D]">Patient Experience</Link></li>
              <li><Link href="/caregiver" className="hover:text-[#2C332D]">Caregiver Dashboard</Link></li>
              <li><Link href="/caregiver/change-radar" className="hover:text-[#2C332D]">Cognitive Change Radar</Link></li>
              <li><Link href="/caregiver/copilot" className="hover:text-[#2C332D]">Ask Cogniva AI Copilot</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <span className="font-semibold text-[#2C332D] tracking-wider uppercase text-[11px]">Regional & Safety</span>
            <ul className="space-y-1.5">
              <li><Link href="/admin/cultural-packs" className="hover:text-[#2C332D]">Assam & North East Packs</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#2C332D]">Offline-First Architecture</Link></li>
              <li><Link href="/privacy" className="hover:text-[#2C332D]">Family Memory Privacy</Link></li>
              <li><Link href="/health" className="hover:text-[#2C332D]">Longitudinal Clinical Reports</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <span className="font-semibold text-[#2C332D] tracking-wider uppercase text-[11px]">Live Demonstration</span>
            <p className="text-[11px] leading-relaxed">
              Evaluating for hackathon judging? Launch the 5-minute interactive guided demo story with Anima Das (Assam).
            </p>
            <Link
              href="/demo"
              className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-[#EBF2EC] text-[#3F5E47] font-semibold hover:bg-[#D8E6DB] transition-colors"
            >
              Launch 5-Min Guided Demo →
            </Link>
          </div>
        </div>

        {/* Medical Guardrail Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-white/70 border border-[#E8E0D5] flex items-start gap-3 text-[11px] leading-relaxed text-[#59655D]">
          <Info className="w-5 h-5 text-[#5B8266] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#2C332D] font-semibold">Important Medical & Scientific Positioning: </strong>
            {SafetyEngine.getMedicalDisclaimer()}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8E0D5]/60 text-[11px] text-[#849188]">
          <p>© 2026 Cogniva Healthcare Technologies. Dedicated to compassionate elderly care.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy & RLS</Link>
            <Link href="/how-it-works" className="hover:underline">Architecture</Link>
            <span>Light-Theme Glassmorphism</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
