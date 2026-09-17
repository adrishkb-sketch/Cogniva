'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { DEMO_ALERTS } from '@/lib/demo/demo-patient-anima';
import { Bell, Radio, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CaregiverAlertsPage() {
  const [alerts, setAlerts] = useState(DEMO_ALERTS);

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 border border-[#E0D8CC]">
        <div>
          <span className="text-xs font-bold text-[#E78C56] uppercase tracking-wider">
            Notifications & Insights
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            Caregiver Alert Center
          </h1>
          <p className="text-sm text-[#59655D]">
            Important observation notices from Cognitive Change Radar and daily routine tracking.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 rounded-xl bg-white border border-[#E0D8CC] text-xs font-bold text-[#59655D] hover:bg-[#FAF7F2] cursor-pointer"
        >
          Mark All as Read
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <GlassCard
            key={alert.id}
            className={`p-5 space-y-2 border-l-4 ${
              alert.type === 'change_radar'
                ? 'border-l-[#D9654B] bg-[#FEF6E7]/70'
                : 'border-l-[#5B8266] bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {alert.type === 'change_radar' ? (
                  <Radio className="w-4 h-4 text-[#D9654B]" />
                ) : (
                  <Sparkles className="w-4 h-4 text-[#5B8266]" />
                )}
                <h4 className="font-bold text-base text-[#2C332D]">{alert.title}</h4>
              </div>
              <span className="text-xs text-[#849188]">
                {new Date(alert.timestamp).toLocaleDateString()}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#59655D] leading-relaxed">
              {alert.message}
            </p>

            {alert.type === 'change_radar' && (
              <div className="pt-2">
                <Link
                  href="/caregiver/change-radar"
                  className="text-xs font-bold text-[#B85D43] hover:underline"
                >
                  View Change Radar Details →
                </Link>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
