'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { DEMO_PATIENT, DEMO_CURRENT_METRICS, DEMO_BASELINE_COMPARISONS, DEMO_CHANGE_EVENTS } from '@/lib/demo/demo-patient-anima';
import { TrendingUp, FileText, ArrowLeft, Info, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function HealthPatientDetailPage() {
  const trendHistory = [
    { session: 'Day 1', latency: 4200, errors: 0 },
    { session: 'Day 4', latency: 4400, errors: 0 },
    { session: 'Day 8', latency: 5100, errors: 1 },
    { session: 'Day 11', latency: 6800, errors: 1 },
    { session: 'Day 14', latency: 7400, errors: 2 },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/health" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E778E] hover:underline mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Patient Cohort</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            {DEMO_PATIENT.name} — Clinical Activity Summary
          </h1>
          <p className="text-sm text-[#59655D]">
            72 Yrs • Assamese Native • Baseline: 14 Active Longitudinal Sessions
          </p>
        </div>

        <Link
          href="/health/reports"
          className="px-4 py-2.5 rounded-xl bg-[#8E778E] text-white font-bold text-xs hover:bg-[#7D667D] flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Full Report</span>
        </Link>
      </div>

      {/* Primary Observations Card */}
      <GlassCard className="p-6 space-y-4 border-l-4 border-l-[#8E778E]">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#2C332D]">Clinician Functional Observations</h3>
          <span className="text-xs bg-[#F3EEF3] text-[#5D4A5D] px-2.5 py-0.5 rounded-full font-bold">
            Reviewed by Dr. Roy
          </span>
        </div>
        <p className="text-xs text-[#59655D] leading-relaxed">
          The patient’s recognition of primary family members (Daughter, Grandson) and childhood memories remains unimpaired (84%). The system flagged a gradual +42s latency shift in multi-step kitchen routines during late afternoon sessions. Suggest evaluating evening sleep hygiene and reinforcing morning activity schedules with daughter’s voice prompts.
        </p>
      </GlassCard>

      {/* Latency Trend Area Chart */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-base font-bold text-[#2C332D]">Response Latency Trend (Milliseconds)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendHistory}>
              <XAxis dataKey="session" stroke="#849188" fontSize={11} />
              <YAxis stroke="#849188" fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey="latency" stroke="#8E778E" fill="#8E778E" fillOpacity={0.25} name="Latency (ms)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
