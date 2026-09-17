'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { DEMO_PATIENT, DEMO_CURRENT_METRICS, DEMO_BASELINE_COMPARISONS, DEMO_CHANGE_EVENTS } from '@/lib/demo/demo-patient-anima';
import { FileText, Download, Printer, ShieldCheck, Heart, Info } from 'lucide-react';

export default function CaregiverReportsPage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <span className="text-xs font-bold text-[#5B8266] uppercase tracking-wider">
            Clinical Documentation
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Longitudinal Cognitive Activity Report
          </h1>
          <p className="text-sm text-[#59655D]">
            Prepared for consultations with geriatric neurologists and family physicians.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <GlassButton variant="secondary" onClick={handlePrint} className="gap-2 text-xs">
            <Printer className="w-4 h-4 text-[#5B8266]" />
            <span>Print Report</span>
          </GlassButton>

          <GlassButton variant="primary" onClick={handlePrint} className="gap-2 text-xs">
            <Download className="w-4 h-4 text-white" />
            <span>Export PDF</span>
          </GlassButton>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E0D8CC] shadow-sm space-y-8 text-[#2C332D]">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-[#E8E0D5] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#5B8266] flex items-center justify-center text-white font-bold">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Cogniva Longitudinal Activity Report</h2>
            </div>
            <p className="text-xs text-[#59655D] mt-1">
              Automated Functional Interaction Summary • Ref ID: CGN-2026-ANIM-01
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-[#59655D]">
            <div><strong>Date Generated:</strong> September 17, 2026</div>
            <div><strong>Report Period:</strong> Aug 01 – Sep 17, 2026</div>
            <div><strong>Sessions Analyzed:</strong> 14 Days</div>
          </div>
        </div>

        {/* Patient Profile Snapshot */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] text-xs">
          <div>
            <span className="text-[#849188] uppercase font-bold text-[10px] block">Patient Name</span>
            <strong className="text-sm text-[#2C332D]">{DEMO_PATIENT.name}</strong>
          </div>
          <div>
            <span className="text-[#849188] uppercase font-bold text-[10px] block">Age / Region</span>
            <strong className="text-sm text-[#2C332D]">{DEMO_PATIENT.age} Yrs • Assam</strong>
          </div>
          <div>
            <span className="text-[#849188] uppercase font-bold text-[10px] block">Primary Caregiver</span>
            <strong className="text-sm text-[#2C332D]">{DEMO_PATIENT.caregiverName}</strong>
          </div>
          <div>
            <span className="text-[#849188] uppercase font-bold text-[10px] block">Languages</span>
            <strong className="text-sm text-[#2C332D]">Assamese (as) / English</strong>
          </div>
        </div>

        {/* Executive Clinical Observations */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#2C332D] border-b border-[#E8E0D5] pb-2">
            1. Executive Functional Observations
          </h3>
          <p className="text-xs text-[#59655D] leading-relaxed">
            Across 14 recorded sessions, the patient demonstrated high engagement and accurate recognition of immediate family members (Daughter Ananya, Grandson Niloy) and cherished household objects (Bell-metal tea wares, Gamosa). Over the last 6 sessions, an observed shift in response latency occurred during multi-step sequencing tasks (+42s average completion time, -20.5% vs personal baseline). Adaptive pacing was initiated to provide 2-step sequences with visual prompts.
          </p>
        </div>

        {/* Baseline Domain Metrics Table */}
        <div className="space-y-3">
          <h3 className="text-base font-bold text-[#2C332D] border-b border-[#E8E0D5] pb-2">
            2. Observed Activity Scores vs Personal Baseline
          </h3>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8E0D5] text-[#849188]">
                <th className="py-2">Domain</th>
                <th className="py-2">Baseline Mean</th>
                <th className="py-2">Recent 6 Sessions</th>
                <th className="py-2">Observed Delta</th>
                <th className="py-2">Functional Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0D5]">
              {DEMO_BASELINE_COMPARISONS.map((comp) => (
                <tr key={comp.metricKey} className="text-[#2C332D]">
                  <td className="py-2.5 font-semibold">{comp.label}</td>
                  <td className="py-2.5 text-[#59655D]">{comp.baselineValue}%</td>
                  <td className="py-2.5 font-bold">{comp.recentValue}%</td>
                  <td className={`py-2.5 font-bold ${comp.deltaPercent < -10 ? 'text-[#D9654B]' : 'text-[#5B8266]'}`}>
                    {comp.deltaPercent > 0 ? `+${comp.deltaPercent}%` : `${comp.deltaPercent}%`}
                  </td>
                  <td className="py-2.5 text-xs">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${
                      comp.trend === 'stable' ? 'bg-[#EBF2EC] text-[#3F5E47]' : 'bg-[#FAECE7] text-[#B85D43]'
                    }`}>
                      {comp.trend === 'stable' ? 'Stable' : 'Pacing Shift'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Change Radar Event Detail */}
        <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] text-xs">
          <h4 className="font-bold text-[#2C332D]">3. Detected Change Radar Event</h4>
          <p className="text-[#59655D] leading-relaxed">
            {DEMO_CHANGE_EVENTS[0].plainLanguageDescription}
          </p>
          <div className="text-[#3F5E47] font-semibold">
            Clinical Recommendation: Discuss multi-step evening tasks and verify sleep quality.
          </div>
        </div>

        {/* Medical Positioning Disclaimer */}
        <div className="p-4 rounded-2xl bg-white border border-[#E8E0D5] flex items-start gap-3 text-[11px] text-[#59655D] leading-relaxed">
          <Info className="w-5 h-5 text-[#5B8266] shrink-0 mt-0.5" />
          <div>
            <strong>Medical Disclaimer: </strong>
            This document is a functional activity report summarizing user interaction metrics with the Cogniva software. It is not a diagnostic instrument, clinical dementia staging assessment, or prescription guideline.
          </div>
        </div>
      </div>
    </div>
  );
}
