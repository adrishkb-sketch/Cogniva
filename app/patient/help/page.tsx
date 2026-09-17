'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Phone, Home, Heart, Shield, ArrowLeft } from 'lucide-react';
import { DEMO_PATIENT } from '@/lib/demo/demo-patient-anima';
import Link from 'next/link';

export default function MemoryRescuePage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Emergency Comfort Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#FAECE7] border-2 border-[#F6CBC0] text-center space-y-2">
        <div className="text-4xl">❤️</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#B85D43]">
          You are Safe, Anima
        </h1>
        <p className="text-base text-[#59655D]">
          Help is always close by. Tap any button below to connect with your family.
        </p>
      </div>

      {/* Emergency Contact Cards */}
      <div className="space-y-4">
        {/* Call Daughter */}
        <a
          href={`tel:${DEMO_PATIENT.emergencyContact.phone}`}
          className="block p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#5B8266] shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EBF2EC] text-[#5B8266] flex items-center justify-center text-3xl">
                👩‍⚕️
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-[#5B8266] tracking-wider">Primary Family Contact</span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2C332D]">
                  Call {DEMO_PATIENT.emergencyContact.name} ({DEMO_PATIENT.emergencyContact.relationship})
                </h3>
                <p className="text-sm font-semibold text-[#59655D] mt-1">
                  {DEMO_PATIENT.emergencyContact.phone}
                </p>
              </div>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#5B8266] text-white flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
          </div>
        </a>

        {/* Home Information */}
        <GlassCard variant="patient" className="p-6 sm:p-8 space-y-3 border-2 border-[#E0D8CC]">
          <div className="flex items-center gap-3 text-[#E78C56]">
            <Home className="w-6 h-6" />
            <h3 className="text-xl font-bold text-[#2C332D]">My Home Address</h3>
          </div>
          <p className="text-lg text-[#2C332D] font-medium leading-relaxed bg-[#FAF7F2] p-4 rounded-2xl border border-[#E0D8CC]">
            {DEMO_PATIENT.trustedAddress}
          </p>
          <p className="text-xs text-[#849188]">
            Caregiver verified address stored safely offline on this device.
          </p>
        </GlassCard>
      </div>

      <div className="text-center pt-4">
        <Link href="/patient">
          <GlassButton variant="secondary" size="lg" className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Return to Safe Space</span>
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
