'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldCheck, Lock, Activity, Database, Key, Sparkles } from 'lucide-react';
import { AIConfigModal } from '@/components/shared/AIConfigModal';
import { hasCustomGeminiKey } from '@/lib/ai/ai-key';

export default function SystemAdminPage() {
  const [isAIConfigOpen, setIsAIConfigOpen] = useState(false);

  const auditLogs = [
    { time: '2026-09-17 09:30:00', event: 'Life Sim activity recorded locally (Offline)', user: 'patient-anima-das', status: 'Queued' },
    { time: '2026-09-17 09:32:00', event: 'Network reconnected • 3 activities synchronized', user: 'system-sync', status: 'Synced' },
    { time: '2026-09-16 14:30:00', event: 'Change Radar triggered: Sequencing latency delta', user: 'adaptive-engine', status: 'Logged' },
    { time: '2026-09-15 11:20:00', event: 'Verified Memory added: Grandson Niloy', user: 'caregiver-ananya-das', status: 'Audited' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 border border-[#E0D8CC]">
        <div>
          <span className="text-xs font-bold text-[#5B8266] uppercase tracking-wider">
            System & Security Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            Audit Logs & AI Key Management
          </h1>
          <p className="text-sm text-[#59655D]">
            Manage client-side AI keys, cryptographic audit logs, and memory isolation records.
          </p>
        </div>

        <button
          onClick={() => setIsAIConfigOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent-orange)] text-white font-bold text-xs hover:opacity-90 shadow-sm cursor-pointer transition-all"
        >
          <Key className="w-4 h-4" />
          <span>Configure Gemini API Key</span>
        </button>
      </div>

      {/* AI Key Status Card */}
      <GlassCard className="p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent-orange)]" />
            <h3 className="font-bold text-base text-[#2C332D]">Google Gemini API Connection</h3>
          </div>
          <button
            onClick={() => setIsAIConfigOpen(true)}
            className="text-xs font-semibold text-[var(--accent-cyan)] hover:underline cursor-pointer"
          >
            Manage Key
          </button>
        </div>
        <p className="text-xs text-[#59655D] leading-relaxed">
          Users and evaluators can paste their Google Gemini API key directly in the website. It is securely kept in browser local storage and attached to requests, enabling real-time AI capabilities without backend redeployment.
        </p>
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <h3 className="font-bold text-base text-[#2C332D]">Security & Memory Audit Trail</h3>
        <div className="space-y-2">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#E0D8CC] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-[#2C332D]">{log.event}</div>
                <div className="text-[11px] text-[#849188]">{log.user} • {log.time}</div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EBF2EC] text-[#3F5E47] font-bold text-[10px]">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>

      <AIConfigModal isOpen={isAIConfigOpen} onClose={() => setIsAIConfigOpen(false)} />
    </div>
  );
}
