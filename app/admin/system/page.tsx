'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldCheck, Lock, Activity, Database, Key } from 'lucide-react';

export default function SystemAdminPage() {
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
            Audit Logs & RLS Security
          </h1>
          <p className="text-sm text-[#59655D]">
            Cryptographic audit logging and tenant memory isolation records.
          </p>
        </div>
      </div>

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
    </div>
  );
}
