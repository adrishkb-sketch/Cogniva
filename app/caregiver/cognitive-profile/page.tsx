'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { DEMO_PATIENT, DEMO_CURRENT_METRICS, DEMO_BASELINE_COMPARISONS } from '@/lib/demo/demo-patient-anima';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Activity, ShieldCheck, Info, Sparkles } from 'lucide-react';
import { SafetyEngine } from '@/lib/ai/safety';

export default function CognitiveProfilePage() {
  const radarData = [
    { metric: 'Recognition', score: DEMO_CURRENT_METRICS.recognition, full: 100 },
    { metric: 'Attention', score: DEMO_CURRENT_METRICS.attention, full: 100 },
    { metric: 'Episodic Recall', score: DEMO_CURRENT_METRICS.memoryRecall, full: 100 },
    { metric: 'Language', score: DEMO_CURRENT_METRICS.languageEngagement, full: 100 },
    { metric: 'Routine', score: DEMO_CURRENT_METRICS.routineRecall, full: 100 },
    { metric: 'Planning', score: DEMO_CURRENT_METRICS.planning, full: 100 },
    { metric: 'Sequencing', score: DEMO_CURRENT_METRICS.sequencing, full: 100 },
  ];

  const trendHistory = [
    { session: 'S-01', recognition: 86, sequencing: 78, recall: 74 },
    { session: 'S-04', recognition: 85, sequencing: 76, recall: 73 },
    { session: 'S-08', recognition: 86, sequencing: 72, recall: 72 },
    { session: 'S-11', recognition: 84, sequencing: 66, recall: 71 },
    { session: 'S-14', recognition: 84, sequencing: 62, recall: 71 },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#5B8266] uppercase tracking-wider">
            Cognitive Digital Twin
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Cognitive Activity Profile
          </h1>
          <p className="text-sm text-[#59655D]">
            Longitudinal activity metrics observed during everyday living tasks and reminiscence sessions.
          </p>
        </div>

        <div className="text-xs bg-[#EBF2EC] text-[#3F5E47] px-3.5 py-1.5 rounded-full font-bold border border-[#C5DBCB]">
          Personal Baseline Active (14 Sessions)
        </div>
      </div>

      {/* Medical Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-white border border-[#E0D8CC] flex items-start gap-3 text-xs text-[#59655D]">
        <Info className="w-5 h-5 text-[#5B8266] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#2C332D]">Medical Positioning Note: </strong>
          This Cognitive Activity Profile tracks functional interaction patterns (latency, retries, hints needed) to adapt daily activities. It is <strong>not a clinical dementia score or diagnostic test</strong>.
        </div>
      </div>

      {/* Core 6 Metrics Grid with Progress Rings */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <GlassCard className="p-4 text-center space-y-2 flex flex-col items-center">
          <ProgressRing value={DEMO_CURRENT_METRICS.recognition} size={84} strokeWidth={8} color="#5B8266" />
          <h4 className="text-xs font-bold text-[#2C332D]">Recognition</h4>
          <span className="text-[10px] text-[#5B8266] font-semibold">Strong (84%)</span>
        </GlassCard>

        <GlassCard className="p-4 text-center space-y-2 flex flex-col items-center">
          <ProgressRing value={DEMO_CURRENT_METRICS.attention} size={84} strokeWidth={8} color="#8E778E" />
          <h4 className="text-xs font-bold text-[#2C332D]">Attention</h4>
          <span className="text-[10px] text-[#8E778E] font-semibold">Steady (79%)</span>
        </GlassCard>

        <GlassCard className="p-4 text-center space-y-2 flex flex-col items-center">
          <ProgressRing value={DEMO_CURRENT_METRICS.memoryRecall} size={84} strokeWidth={8} color="#E78C56" />
          <h4 className="text-xs font-bold text-[#2C332D]">Episodic Recall</h4>
          <span className="text-[10px] text-[#E78C56] font-semibold">Vivid (71%)</span>
        </GlassCard>

        <GlassCard className="p-4 text-center space-y-2 flex flex-col items-center">
          <ProgressRing value={DEMO_CURRENT_METRICS.routineRecall} size={84} strokeWidth={8} color="#D9A036" />
          <h4 className="text-xs font-bold text-[#2C332D]">Routine Recall</h4>
          <span className="text-[10px] text-[#D9A036] font-semibold">Consistent (68%)</span>
        </GlassCard>

        <GlassCard className="p-4 text-center space-y-2 flex flex-col items-center">
          <ProgressRing value={DEMO_CURRENT_METRICS.planning} size={84} strokeWidth={8} color="#9D8189" />
          <h4 className="text-xs font-bold text-[#2C332D]">Planning</h4>
          <span className="text-[10px] text-[#9D8189] font-semibold">Assisted (64%)</span>
        </GlassCard>

        <GlassCard className="p-4 text-center space-y-2 flex flex-col items-center bg-[#FEF6E7]/80 border border-[#F8D5C2]">
          <ProgressRing value={DEMO_CURRENT_METRICS.sequencing} size={84} strokeWidth={8} color="#D9654B" />
          <h4 className="text-xs font-bold text-[#2C332D]">Sequencing</h4>
          <span className="text-[10px] text-[#B85D43] font-bold">Pacing Shift (62%)</span>
        </GlassCard>
      </div>

      {/* Visual Charts: Radar + Longitudinal Trend Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Map */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#2C332D]">Cognitive Domain Radial Map</h3>
            <span className="text-xs text-[#849188]">Current Profile</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#E0D8CC" />
                <PolarAngleAxis dataKey="metric" stroke="#59655D" tick={{ fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#C5DBCB" tick={false} />
                <Radar name="Anima" dataKey="score" stroke="#5B8266" fill="#5B8266" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* 14-Session Longitudinal Trend */}
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#2C332D]">14-Session Longitudinal Trend</h3>
            <span className="text-xs text-[#849188]">Recent Sessions</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B8266" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#5B8266" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSeq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E78C56" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#E78C56" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="session" stroke="#849188" fontSize={11} />
                <YAxis domain={[50, 100]} stroke="#849188" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="recognition" stroke="#5B8266" fillOpacity={1} fill="url(#colorRec)" name="Recognition" />
                <Area type="monotone" dataKey="sequencing" stroke="#E78C56" fillOpacity={1} fill="url(#colorSeq)" name="Sequencing" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-[#59655D]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#5B8266]" /> Recognition (Stable)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#E78C56]" /> Sequencing (-20.5% delta)
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Observations Breakdown Table */}
      <GlassCard className="p-6 space-y-4">
        <h3 className="text-base font-bold text-[#2C332D]">Personal Baseline Comparisons</h3>
        <div className="space-y-3">
          {DEMO_BASELINE_COMPARISONS.map((comp) => (
            <div key={comp.metricKey} className="p-4 rounded-2xl bg-white border border-[#E0D8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#2C332D]">{comp.label}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    comp.trend === 'stable' ? 'bg-[#EBF2EC] text-[#3F5E47]' : 'bg-[#FAECE7] text-[#B85D43]'
                  }`}>
                    {comp.trend === 'stable' ? 'Stable' : 'Shift Observed'}
                  </span>
                </div>
                <p className="text-xs text-[#59655D]">{comp.observationSummary}</p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="text-xs font-semibold text-[#849188]">
                  Baseline: <strong>{comp.baselineValue}%</strong> → Recent: <strong>{comp.recentValue}%</strong>
                </div>
                <div className="text-[11px] text-[#5B8266] font-medium mt-0.5">
                  Suggested: {comp.suggestedPacing}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
