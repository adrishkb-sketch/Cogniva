'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldCheck, Lock, EyeOff, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-[#5B8266] uppercase tracking-wider">Patient Security</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2C332D]">
          Privacy, Dignity & Memory Data Protection
        </h1>
        <p className="text-sm text-[#59655D] leading-relaxed">
          Family memories, photographs, and cognitive activity observations are sacred. Cogniva enforces strict role-based access control, cryptographic data protection, and local offline data isolation.
        </p>
      </div>

      <div className="space-y-6">
        <GlassCard className="space-y-3">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#5B8266]" />
            <h3 className="text-lg font-bold text-[#2C332D]">Caregiver-Verified Memory Vault</h3>
          </div>
          <p className="text-xs text-[#59655D] leading-relaxed">
            Family photos and voice messages are stored in isolated tenant spaces with Row Level Security (RLS). Only explicitly invited caregivers and authorized clinicians can view or manage patient memories.
          </p>
        </GlassCard>

        <GlassCard className="space-y-3">
          <div className="flex items-center gap-3">
            <EyeOff className="w-5 h-5 text-[#E78C56]" />
            <h3 className="text-lg font-bold text-[#2C332D]">No Biometric Facial Identification</h3>
          </div>
          <p className="text-xs text-[#59655D] leading-relaxed">
            Recognition activities present tagged family photographs based on metadata provided by the caregiver. Cogniva does not run facial biometric scanning or store facial geometry.
          </p>
        </GlassCard>

        <GlassCard className="space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#8E778E]" />
            <h3 className="text-lg font-bold text-[#2C332D]">Zero Medical Hallucination Safeguard</h3>
          </div>
          <p className="text-xs text-[#59655D] leading-relaxed">
            The AI engine is strictly sandboxed. It is prevented from modifying prescriptions, making diagnostic assertions, or inventing unverified family members or addresses.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
