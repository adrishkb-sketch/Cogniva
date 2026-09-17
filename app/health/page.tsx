'use client';

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { DEMO_PATIENT, DEMO_CHANGE_EVENTS } from '@/lib/demo/demo-patient-anima';
import { Users, TrendingUp, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HealthPatientsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#8E778E] uppercase tracking-wider">
            Clinical Neurology & Geriatrics
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Authorized Patient Cohort
          </h1>
          <p className="text-sm text-[#59655D]">
            Review longitudinal functional activity observations and baseline shifts for assigned elderly patients.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#5B8266] bg-[#EBF2EC] px-3.5 py-1.5 rounded-full font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Role-Based Clinician Access (RLS Enforced)</span>
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-4">
        <GlassCard className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-[#8E778E]/40">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-3xl bg-[#EBF2EC] border border-[#C5DBCB] flex items-center justify-center text-3xl shrink-0">
              👵
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#2C332D]">{DEMO_PATIENT.name}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E0D8CC] text-[#59655D]">
                  {DEMO_PATIENT.age} Yrs • Female
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FAECE7] text-[#B85D43]">
                  Sequencing Shift
                </span>
              </div>
              <p className="text-xs text-[#59655D]">
                Primary Caregiver: {DEMO_PATIENT.caregiverName} ({DEMO_PATIENT.caregiverPhone})
              </p>
              <p className="text-xs text-[#849188]">
                Region: {DEMO_PATIENT.region}, {DEMO_PATIENT.state} • Primary Language: Assamese (as)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={`/health/patients/${DEMO_PATIENT.id}`}
              className="px-4 py-2.5 rounded-xl bg-[#8E778E] text-white font-bold text-xs hover:bg-[#7D667D] transition-colors flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Inspect Longitudinal Trends</span>
            </Link>

            <Link
              href="/health/reports"
              className="px-4 py-2.5 rounded-xl bg-white border border-[#E0D8CC] text-xs font-bold text-[#2C332D] hover:bg-[#FAF7F2]"
            >
              Report
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
