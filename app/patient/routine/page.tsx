'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { DEMO_ROUTINE } from '@/lib/demo/demo-patient-anima';
import { OfflineStorageManager } from '@/lib/storage/indexed-db';
import { VoiceService } from '@/lib/voice/voice-service';
import { DailyRoutineItem } from '@/types/caregiver';
import { Check, Volume2, Heart, Clock, Sparkles } from 'lucide-react';

export default function PatientRoutinePage() {
  const [routine, setRoutine] = useState<DailyRoutineItem[]>([]);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  useEffect(() => {
    setRoutine(OfflineStorageManager.getRoutine());

    const handleUpdate = () => {
      setRoutine(OfflineStorageManager.getRoutine());
    };

    window.addEventListener('cogniva-routine-changed', handleUpdate);
    return () => window.removeEventListener('cogniva-routine-changed', handleUpdate);
  }, []);

  const toggleCheck = (id: string) => {
    OfflineStorageManager.toggleRoutineItem(id);
  };

  const playFamilyVoice = (item: DailyRoutineItem) => {
    if (!item.familyVoiceMessage) return;
    setPlayingVoiceId(item.id);
    VoiceService.speak(
      `${item.familyVoiceMessage.speakerName} says: ${item.familyVoiceMessage.transcriptText}`,
      'en-IN',
      () => setPlayingVoiceId(null)
    );
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E78C56]">
            <span>Daily Living Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Today’s Peaceful Routine
          </h1>
          <p className="text-sm text-[#59655D]">
            Simple reminders with warm voice messages from Ananya and Niloy.
          </p>
        </div>
      </div>

      {/* Routine Cards List */}
      <div className="space-y-4">
        {routine.map((item) => (
          <GlassCard
            key={item.id}
            variant="patient"
            className={`p-6 transition-all border-2 ${
              item.isCompletedToday
                ? 'bg-[#EBF2EC]/90 border-[#C5DBCB] opacity-90'
                : 'bg-white border-[#E0D8CC]'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* Tactile Check Button */}
                <button
                  onClick={() => toggleCheck(item.id)}
                  className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs active:scale-95 ${
                    item.isCompletedToday
                      ? 'bg-[#5B8266] border-[#3E5C46] text-white'
                      : 'bg-white border-[#E0D8CC] text-transparent hover:border-[#5B8266]'
                  }`}
                >
                  <Check className="w-6 h-6 stroke-[3]" />
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#5B8266] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#E8E0D5]">
                      {item.timeSlot}
                    </span>
                    <h3 className={`text-lg sm:text-xl font-bold ${item.isCompletedToday ? 'line-through text-[#59655D]' : 'text-[#2C332D]'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#59655D] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Family Voice Reminder Pill */}
              {item.hasFamilyVoiceReminder && item.familyVoiceMessage && (
                <button
                  onClick={() => playFamilyVoice(item)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-[#FEF6E7] border border-[#F8D5C2] text-[#B85D43] font-bold text-xs hover:bg-[#FDF1EA] transition-all flex items-center justify-center gap-2 shrink-0 shadow-xs cursor-pointer"
                >
                  <Volume2 className={`w-4 h-4 ${playingVoiceId === item.id ? 'animate-bounce text-[#D9654B]' : ''}`} />
                  <span>Hear {item.familyVoiceMessage.speakerName}</span>
                </button>
              )}
            </div>

            {/* Voice note transcript quote */}
            {item.familyVoiceMessage && (
              <div className="mt-4 pt-3 border-t border-[#E8E0D5] flex items-center gap-2 text-xs text-[#59655D] italic">
                <Heart className="w-3.5 h-3.5 text-[#E78C56] shrink-0" />
                <span>"{item.familyVoiceMessage.transcriptText}"</span>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
