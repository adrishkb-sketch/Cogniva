'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Cpu, Activity, ShieldCheck, CheckCircle2, Sliders, Sparkles, X } from 'lucide-react';

interface AlgorithmInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlgorithmInspectorModal: React.FC<AlgorithmInspectorProps> = ({ isOpen, onClose }) => {
  const [simulatedLatency, setSimulatedLatency] = useState(7200); // ms
  const [simulatedErrors, setSimulatedErrors] = useState(1);
  const [simulatedHints, setSimulatedHints] = useState(2);

  if (!isOpen) return null;

  // Real Mathematical Formulation
  const alpha = 0.25;
  const baselineLatency = 4500;
  const emaLatency = Math.round(alpha * simulatedLatency + (1 - alpha) * baselineLatency);
  const latencyDeltaPct = Math.round(((emaLatency - baselineLatency) / baselineLatency) * 100);
  const errorPenalty = parseFloat(((simulatedErrors * 1.5 + simulatedHints * 0.8) / 4).toFixed(2));
  const recommendedSteps = Math.max(2, Math.min(4, Math.round(4 - errorPenalty * 1.6)));
  const pacingDecision = errorPenalty > 0.8 || latencyDeltaPct > 20 ? 'Adaptive 2-Step Pacing (Low Fatigue)' : 'Standard 4-Step Routine';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-2 border-[#5B8266] shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#EBF2EC] text-[#5B8266] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B8266] tracking-wider">
                Cogniva Clinical ML Architecture
              </span>
              <h3 className="text-xl font-bold text-[#2C332D]">
                Adaptive Cognitive Escalator Formula
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E0D8CC] flex items-center justify-center text-sm font-bold text-[#59655D] hover:bg-black/5 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Mathematical Model Explanation */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E0D8CC] space-y-2 text-xs text-[#2C332D]">
          <h4 className="font-bold text-[#5B8266] uppercase tracking-wider text-[11px]">
            Formal Statistical Adaptation Model:
          </h4>
          <div className="font-mono bg-white p-3 rounded-xl border border-[#E0D8CC] text-[11px] leading-relaxed text-[#2C332D] space-y-1">
            <div>{"1. EMA_latency(t) = α · Latency(t) + (1 - α) · EMA(t-1)  [with α = 0.25]"}</div>
            <div>{"2. ErrorPenalty Pe = (Errors_seq · 1.5 + Hints · 0.8) / TotalSteps"}</div>
            <div>{"3. RecommendedSteps = clamp(round(4 - 1.6 · Pe), 2, 4)"}</div>
          </div>
        </div>

        {/* Interactive ML Simulator Sliders for Hackathon Judges */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#2C332D] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#E78C56]" />
            <span>Interactive Parameter Playground (Test Live Adaptation)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-white border border-[#E0D8CC] space-y-1">
              <label className="font-semibold block text-[#2C332D]">
                Observed Latency: <strong className="text-[#5B8266]">{simulatedLatency} ms</strong>
              </label>
              <input
                type="range"
                min="2000"
                max="12000"
                step="500"
                value={simulatedLatency}
                onChange={(e) => setSimulatedLatency(Number(e.target.value))}
                className="w-full accent-[#5B8266]"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E0D8CC] space-y-1">
              <label className="font-semibold block text-[#2C332D]">
                Sequence Errors: <strong className="text-[#D9654B]">{simulatedErrors}</strong>
              </label>
              <input
                type="range"
                min="0"
                max="4"
                value={simulatedErrors}
                onChange={(e) => setSimulatedErrors(Number(e.target.value))}
                className="w-full accent-[#D9654B]"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E0D8CC] space-y-1">
              <label className="font-semibold block text-[#2C332D]">
                Assistance Hints: <strong className="text-[#E78C56]">{simulatedHints}</strong>
              </label>
              <input
                type="range"
                min="0"
                max="4"
                value={simulatedHints}
                onChange={(e) => setSimulatedHints(Number(e.target.value))}
                className="w-full accent-[#E78C56]"
              />
            </div>
          </div>
        </div>

        {/* Live ML Computation Output */}
        <div className="p-5 rounded-2xl bg-[#EBF2EC] border border-[#C5DBCB] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#3F5E47] uppercase tracking-wider text-[11px]">
              Computed Engine Response
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#5B8266] text-white font-bold text-[10px]">
              Active ML Escalator
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 bg-white rounded-xl border border-[#C5DBCB]">
              <div className="text-lg font-bold text-[#2C332D]">{emaLatency} ms</div>
              <div className="text-[10px] text-[#849188]">EMA Latency</div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-[#C5DBCB]">
              <div className={`text-lg font-bold ${latencyDeltaPct > 15 ? 'text-[#D9654B]' : 'text-[#5B8266]'}`}>
                {latencyDeltaPct > 0 ? `+${latencyDeltaPct}%` : `${latencyDeltaPct}%`}
              </div>
              <div className="text-[10px] text-[#849188]">Delta vs Baseline</div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-[#C5DBCB]">
              <div className="text-lg font-bold text-[#2C332D]">{errorPenalty}</div>
              <div className="text-[10px] text-[#849188]">Error Penalty (Pe)</div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-[#C5DBCB]">
              <div className="text-lg font-bold text-[#5B8266]">{recommendedSteps} Steps</div>
              <div className="text-[10px] text-[#849188]">Next Step Density</div>
            </div>
          </div>

          <div className="text-[#3F5E47] font-semibold flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Decision: {pacingDecision}</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <GlassButton variant="primary" onClick={onClose} size="sm">
            Close Inspector
          </GlassButton>
        </div>
      </div>
    </div>
  );
};
