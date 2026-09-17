'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Radio, AlertCircle, Info, ShieldCheck, ArrowRight, Download, FileText, CheckCircle2 } from 'lucide-react';
import { DEMO_PATIENT, DEMO_CHANGE_EVENTS, DEMO_BASELINE_COMPARISONS } from '@/lib/demo/demo-patient-anima';
import { SafetyEngine } from '@/lib/ai/safety';

export default function ChangeRadarPage() {
  const event = DEMO_CHANGE_EVENTS[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D43]">
            <Radio className="w-4 h-4 text-[#D9654B] animate-pulse" />
            <span>Personal Baseline Monitoring</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            Cognitive Change Radar
          </h1>
          <p className="text-sm text-[#59655D]">
            Detects shifts in functional interaction patterns relative exclusively to Anima’s established history.
          </p>
        </div>

        <Link href="/caregiver/reports">
          <GlassButton variant="secondary" className="gap-2 text-xs">
            <FileText className="w-4 h-4 text-[#5B8266]" />
            <span>Export Clinical Summary</span>
          </GlassButton>
        </Link>
      </div>

      {/* Primary Observed Change Card */}
      <GlassCard variant="elevated" className="p-6 sm:p-8 space-y-6 border-2 border-[#F8D5C2] bg-gradient-to-b from-[#FEF6E7]/70 to-white/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E0D5] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#D9654B] animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#B85D43]">
              Active Observation Detected
            </span>
          </div>
          <span className="text-xs text-[#849188]">
            Analyzed across {event.sessionsAnalyzedCount} recorded sessions
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            {event.headline}
          </h2>
          <p className="text-sm sm:text-base text-[#59655D] leading-relaxed">
            {event.plainLanguageDescription}
          </p>
        </div>

        {/* Statistical Metric Comparison Pill */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-[#E0D8CC] text-center">
          <div>
            <span className="text-xs font-semibold text-[#849188] uppercase tracking-wider">
              Historical Baseline Mean
            </span>
            <div className="text-2xl font-bold text-[#5B8266] mt-0.5">
              {event.baselineScore}%
            </div>
            <span className="text-[10px] text-[#59655D]">Established over 14 days</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-[#849188] uppercase tracking-wider">
              Recent 6-Session Mean
            </span>
            <div className="text-2xl font-bold text-[#D9654B] mt-0.5">
              {event.recentScore}%
            </div>
            <span className="text-[10px] text-[#D9654B] font-semibold">Observed Delta: -16 pts</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-[#849188] uppercase tracking-wider">
              Statistical Confidence
            </span>
            <div className="text-2xl font-bold text-[#2C332D] mt-0.5">
              89%
            </div>
            <span className="text-[10px] text-[#5B8266] font-semibold">High Confidence</span>
          </div>
        </div>

        {/* Clinical Note and Adaptive Pacing Recommendation */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] space-y-2 text-xs">
          <strong className="text-[#2C332D] block font-bold">
            Cogniva Adaptive Engine Action Taken:
          </strong>
          <p className="text-[#59655D] leading-relaxed">
            {event.clinicalNote}
          </p>
          <div className="text-[#3F5E47] font-semibold flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-4 h-4 text-[#5B8266]" />
            <span>Automatic Life Sim pacing adjusted to 2-step sequences with visual hints.</span>
          </div>
        </div>
      </GlassCard>

      {/* Safety & Medical Boundary Box */}
      <div className="p-5 rounded-2xl bg-white border border-[#E8E0D5] flex items-start gap-3.5 text-xs text-[#59655D] leading-relaxed">
        <Info className="w-5 h-5 text-[#5B8266] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#2C332D] font-semibold">Why Cogniva Uses "Observed Activity Change" rather than Clinical Staging: </strong>
          Cogniva measures real-world functional interaction latency and accuracy. We never turn algorithmic observations into a medical diagnosis or disease severity rating. These insights are designed to facilitate informed discussions between families and neurologists.
        </div>
      </div>

      {/* All Monitored Categories */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#2C332D]">
          All Observed Domains Relative to Personal Baseline
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEMO_BASELINE_COMPARISONS.map((comp) => (
            <GlassCard key={comp.metricKey} className="p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#2C332D]">{comp.label}</h4>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  comp.trend === 'stable' ? 'bg-[#EBF2EC] text-[#3F5E47]' : 'bg-[#FAECE7] text-[#B85D43]'
                }`}>
                  {comp.trend === 'stable' ? 'Stable Trend' : 'Delta Detected'}
                </span>
              </div>
              <p className="text-xs text-[#59655D] leading-relaxed">
                {comp.observationSummary}
              </p>
              <div className="text-[11px] font-semibold text-[#849188] pt-1 border-t border-[#E8E0D5]/60 flex justify-between">
                <span>Baseline: {comp.baselineValue}%</span>
                <span>Recent: {comp.recentValue}% ({comp.deltaPercent > 0 ? `+${comp.deltaPercent}%` : `${comp.deltaPercent}%`})</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
