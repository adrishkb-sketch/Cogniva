'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { CULTURAL_PACKS } from '@/lib/cultural-packs/assam';
import { Globe, Plus, Sparkles, CheckCircle2, Volume2, ShieldCheck } from 'lucide-react';

export default function CulturalPacksAdminPage() {
  const [activePackIndex, setActivePackIndex] = useState(0);
  const activePack = CULTURAL_PACKS[activePackIndex];

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 border border-[#E0D8CC]">
        <div>
          <span className="text-xs font-bold text-[#5B8266] uppercase tracking-wider">
            North Eastern Region Cultural Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            Cultural Memory Packs
          </h1>
          <p className="text-sm text-[#59655D]">
            Modular cultural packs providing native language voice support, traditional heirlooms, regional sounds, and festivals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#3F5E47] bg-[#EBF2EC] px-3 py-1.5 rounded-full border border-[#C5DBCB]">
            Modular Regional Architecture Active
          </span>
        </div>
      </div>

      {/* Cultural Pack Selector Tabs */}
      <div className="flex gap-3">
        {CULTURAL_PACKS.map((pack, idx) => (
          <button
            key={pack.id}
            onClick={() => setActivePackIndex(idx)}
            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer border-2 ${
              activePackIndex === idx
                ? 'bg-[#5B8266] text-white border-[#3E5C46] shadow-sm'
                : 'bg-white border-[#E0D8CC] text-[#2C332D] hover:bg-[#FAF7F2]'
            }`}
          >
            {pack.name} ({pack.nativeName})
          </button>
        ))}
      </div>

      {/* Active Pack Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Languages Supported */}
        <GlassCard className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#2C332D]">Languages & Voice Models</h3>
            <span className="text-xs text-[#5B8266] font-bold">Verified</span>
          </div>
          <div className="space-y-2">
            {activePack.languages.map((l) => (
              <div key={l.code} className="p-3 rounded-xl bg-white border border-[#E0D8CC] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2C332D]">{l.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  l.isNativeVoiceSupported ? 'bg-[#EBF2EC] text-[#3F5E47]' : 'bg-[#FAF7F2] text-[#849188]'
                }`}>
                  {l.isNativeVoiceSupported ? 'Native Audio Active' : 'Text Grounding'}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Festivals & Traditions */}
        <GlassCard className="space-y-3">
          <h3 className="font-bold text-sm text-[#2C332D]">Regional Festivals</h3>
          <div className="space-y-2">
            {activePack.festivals.map((f) => (
              <div key={f.name} className="p-3 rounded-xl bg-white border border-[#E0D8CC] space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#2C332D]">
                  <span>{f.icon}</span>
                  <span>{f.name}</span>
                  <span className="text-[#849188] font-normal text-[11px]">({f.season})</span>
                </div>
                <p className="text-[#59655D] text-[11px]">{f.description}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Traditional Objects */}
        <GlassCard className="space-y-3">
          <h3 className="font-bold text-sm text-[#2C332D]">Grounded Household Objects</h3>
          <div className="space-y-2">
            {activePack.householdObjects.map((obj) => (
              <div key={obj.name} className="p-3 rounded-xl bg-white border border-[#E0D8CC] space-y-0.5 text-xs">
                <div className="font-bold text-[#2C332D]">{obj.name} ({obj.nativeName})</div>
                <p className="text-[#59655D] text-[11px] leading-relaxed">{obj.significance}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
