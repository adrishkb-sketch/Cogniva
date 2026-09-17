'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { 
  Radio, 
  Activity, 
  Bot, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  Heart,
  Volume2
} from 'lucide-react';
import { 
  DEMO_PATIENT, 
  DEMO_CHANGE_EVENTS, 
  DEMO_CURRENT_METRICS, 
  DEMO_ROUTINE, 
  DEMO_ALERTS 
} from '@/lib/demo/demo-patient-anima';

export default function CaregiverOverviewPage() {
  const completedRoutines = DEMO_ROUTINE.filter(r => r.isCompletedToday).length;
  const adherencePct = Math.round((completedRoutines / DEMO_ROUTINE.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#E78C56] uppercase tracking-wider">
            Caregiver Executive Summary
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Welcome, Ananya
          </h1>
          <p className="text-sm text-[#59655D]">
            Monitoring cognitive activity patterns and daily routine for <strong className="text-[#2C332D]">Anima Das (72)</strong>.
          </p>
        </div>

        <Link href="/caregiver/copilot">
          <GlassButton variant="primary" className="gap-2 text-xs">
            <Bot className="w-4 h-4 text-[#E9C46A]" />
            <span>Ask Cogniva AI Copilot</span>
          </GlassButton>
        </Link>
      </div>

      {/* Top 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Activity */}
        <GlassCard className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#849188]">Today's Activity</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B8266]" />
          </div>
          <div className="text-3xl font-bold text-[#2C332D]">3 Completed</div>
          <p className="text-xs text-[#59655D]">
            Morning Tea Life Sim, Photo Recognition, and Jorhat Reminiscence.
          </p>
          <div className="text-[11px] font-semibold text-[#5B8266]">
            +1 Garden flower blossomed today 🌸
          </div>
        </GlassCard>

        {/* Routine Adherence */}
        <GlassCard className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#849188]">Routine Adherence</span>
            <span className="text-xs font-bold text-[#5B8266] bg-[#EBF2EC] px-2 py-0.5 rounded-full">
              {completedRoutines}/{DEMO_ROUTINE.length} Done
            </span>
          </div>
          <div className="text-3xl font-bold text-[#2C332D]">{adherencePct}%</div>
          <p className="text-xs text-[#59655D]">
            Morning ginger tea and blood pressure medication confirmed with your voice note.
          </p>
          <Link href="/caregiver/routine" className="text-[11px] font-bold text-[#E78C56] hover:underline">
            Manage Routine & Voice →
          </Link>
        </GlassCard>

        {/* Change Radar Quick Notice */}
        <GlassCard className="space-y-3 bg-[#FEF6E7]/80 border border-[#F8D5C2]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B85D43] flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" />
              <span>Change Radar</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-[#B85D43] bg-white/80 px-2 py-0.5 rounded-full">
              Observation
            </span>
          </div>
          <div className="text-lg font-bold text-[#2C332D] leading-tight">
            Sequencing Latency Shift
          </div>
          <p className="text-xs text-[#59655D] leading-relaxed">
            Multi-step tasks took +20.5% longer across last 6 sessions. Pacing adapted to 2 steps.
          </p>
          <Link href="/caregiver/change-radar" className="text-[11px] font-bold text-[#B85D43] hover:underline">
            Inspect Full Radar Analysis →
          </Link>
        </GlassCard>
      </div>

      {/* Main Split Section: Quick Insights & Navigation Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Cognitive Activity Snapshot */}
        <GlassCard className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
            <div>
              <h3 className="text-lg font-bold text-[#2C332D]">
                Observed Cognitive Activity Profile
              </h3>
              <p className="text-xs text-[#59655D]">
                Functional interaction scores relative to Anima’s 14-session baseline
              </p>
            </div>
            <Link
              href="/caregiver/cognitive-profile"
              className="text-xs font-bold text-[#5B8266] hover:underline"
            >
              Full Profile →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
              <div className="text-2xl font-black text-[#5B8266]">{DEMO_CURRENT_METRICS.recognition}</div>
              <div className="text-xs font-bold text-[#2C332D] mt-1">Recognition</div>
              <div className="text-[10px] text-[#5B8266] font-medium">Stable (84%)</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
              <div className="text-2xl font-black text-[#8E778E]">{DEMO_CURRENT_METRICS.attention}</div>
              <div className="text-xs font-bold text-[#2C332D] mt-1">Attention</div>
              <div className="text-[10px] text-[#59655D] font-medium">Calm & Engaged</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
              <div className="text-2xl font-black text-[#E78C56]">{DEMO_CURRENT_METRICS.memoryRecall}</div>
              <div className="text-xs font-bold text-[#2C332D] mt-1">Episodic Recall</div>
              <div className="text-[10px] text-[#59655D] font-medium">Vivid Jorhat Memory</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC]">
              <div className="text-2xl font-black text-[#B85D43]">{DEMO_CURRENT_METRICS.sequencing}</div>
              <div className="text-xs font-bold text-[#2C332D] mt-1">Sequencing</div>
              <div className="text-[10px] text-[#B85D43] font-medium">Shift Detected</div>
            </div>
          </div>

          {/* Plain language summary callout */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] text-xs text-[#59655D] leading-relaxed">
            <strong className="text-[#2C332D]">AI Clinical Activity Summary: </strong>
            Anima continues to show strong familiarity with family photos, heirloom objects, and Assamese tea routines. Multi-step tasks are paced smoothly with visual hints. No memory disorientation observed during morning interactions.
          </div>
        </GlassCard>

        {/* Right Col: Quick Actions & Alerts */}
        <div className="space-y-4">
          <GlassCard className="space-y-3">
            <h3 className="text-sm font-bold text-[#2C332D] uppercase tracking-wider">
              Caregiver Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                href="/caregiver/routine"
                className="w-full p-3 rounded-xl bg-white border border-[#E0D8CC] hover:border-[#5B8266] text-xs font-bold text-[#2C332D] flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#5B8266]" />
                  <span>Record Voice Reminder</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#849188]" />
              </Link>

              <Link
                href="/caregiver/memories"
                className="w-full p-3 rounded-xl bg-white border border-[#E0D8CC] hover:border-[#5B8266] text-xs font-bold text-[#2C332D] flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#E78C56]" />
                  <span>Upload Family Photograph</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#849188]" />
              </Link>

              <Link
                href="/caregiver/reports"
                className="w-full p-3 rounded-xl bg-white border border-[#E0D8CC] hover:border-[#5B8266] text-xs font-bold text-[#2C332D] flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#8E778E]" />
                  <span>Export Clinician Report</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#849188]" />
              </Link>
            </div>
          </GlassCard>

          {/* Recent Alert preview */}
          <GlassCard className="p-4 space-y-2 bg-[#FAF7F2]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#2C332D]">Recent Notifications</span>
              <Link href="/caregiver/alerts" className="text-[#5B8266] font-semibold hover:underline">
                View All
              </Link>
            </div>
            {DEMO_ALERTS.map((alert) => (
              <div key={alert.id} className="p-2.5 rounded-xl bg-white border border-[#E0D8CC] text-[11px] space-y-0.5">
                <div className="font-bold text-[#2C332D]">{alert.title}</div>
                <div className="text-[#59655D] truncate">{alert.message}</div>
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
