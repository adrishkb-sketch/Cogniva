'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { DEMO_PEOPLE, DEMO_PLACES, DEMO_OBJECTS, DEMO_EVENTS } from '@/lib/demo/demo-patient-anima';
import { VoiceService } from '@/lib/voice/voice-service';
import { Volume2, Sparkles, Heart, HelpCircle, ArrowRight } from 'lucide-react';

export default function PatientMemoriesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'people' | 'places' | 'objects'>('all');
  const [quizPersonIndex, setQuizPersonIndex] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string>('');

  const startQuiz = (index: number) => {
    setQuizPersonIndex(index);
    setQuizFeedback('');
    const person = DEMO_PEOPLE[index];
    VoiceService.speak(`Who is this in the photograph?`, 'en-IN');
  };

  const handleQuizAnswer = (relationship: string) => {
    if (quizPersonIndex === null) return;
    const person = DEMO_PEOPLE[quizPersonIndex];
    if (relationship === person.relationship) {
      const correctMsg = `Yes, wonderful! That is ${person.name}, your ${person.relationship}.`;
      setQuizFeedback(correctMsg);
      VoiceService.speak(correctMsg, 'en-IN');
    } else {
      const hintMsg = `Take your time. This is someone very close to your heart who calls you every day.`;
      setQuizFeedback(hintMsg);
      VoiceService.speak(hintMsg, 'en-IN');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B85D43]">
            <span>Personal Memory Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            My Cherished Memories
          </h1>
          <p className="text-sm text-[#59655D]">
            Look through the familiar faces, childhood homes, and beloved heirlooms of your life.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/patient/memory-map"
            className="px-4 py-2.5 rounded-2xl bg-[#F3EEF3] text-[#5D4A5D] font-bold text-sm hover:bg-[#E9DFE9] transition-all"
          >
            🗺️ Open Memory Map
          </Link>
          <Link
            href="/patient/memory-journey"
            className="px-4 py-2.5 rounded-2xl bg-[#EBF2EC] text-[#3F5E47] font-bold text-sm hover:bg-[#DEEBE0] transition-all"
          >
            ✨ Start Memory Journey
          </Link>
        </div>
      </div>

      {/* Interactive Recognition Modal / Banner */}
      {quizPersonIndex !== null && (
        <GlassCard variant="patient" className="p-6 sm:p-8 space-y-4 border-2 border-[#5B8266]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
              Photo Recognition Practice
            </span>
            <button
              onClick={() => setQuizPersonIndex(null)}
              className="text-xs text-[#849188] hover:text-[#2C332D] font-semibold"
            >
              ✕ Close
            </button>
          </div>

          <div className="text-center space-y-3">
            <div className="text-6xl">{DEMO_PEOPLE[quizPersonIndex].photoUrl}</div>
            <h3 className="text-2xl font-bold text-[#2C332D]">Who is this?</h3>
            <p className="text-sm text-[#59655D]">
              Tap the correct relationship below:
            </p>

            {quizFeedback && (
              <div className="p-3.5 rounded-2xl bg-[#FEF6E7] border border-[#F8D5C2] text-sm font-semibold text-[#B85D43]">
                {quizFeedback}
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
              {['Daughter', 'Sister', 'Grandson'].map((rel) => (
                <button
                  key={rel}
                  onClick={() => handleQuizAnswer(rel)}
                  className="py-3 px-4 rounded-2xl bg-white border-2 border-[#E0D8CC] hover:border-[#5B8266] font-bold text-base text-[#2C332D] active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  {rel}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#E8E0D5] pb-2">
        {[
          { key: 'all', label: 'All Memories' },
          { key: 'people', label: 'Family (3)' },
          { key: 'places', label: 'Places (2)' },
          { key: 'objects', label: 'Heirlooms (3)' }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === t.key
                ? 'bg-[#5B8266] text-white shadow-xs'
                : 'text-[#59655D] hover:bg-white/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* People Grid */}
      {(activeTab === 'all' || activeTab === 'people') && (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-[#2C332D] flex items-center gap-2">
            <span>Family & Loved Ones</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EBF2EC] text-[#3F5E47]">Verified</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_PEOPLE.map((person, idx) => (
              <GlassCard key={person.id} className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{person.photoUrl}</span>
                  <button
                    onClick={() => startQuiz(idx)}
                    className="px-2.5 py-1 rounded-xl bg-[#FAF7F2] border border-[#E0D8CC] text-[11px] font-bold text-[#5B8266] hover:bg-[#EBF2EC]"
                  >
                    Quiz Me
                  </button>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#2C332D]">{person.name}</h4>
                  <p className="text-xs font-semibold text-[#E78C56]">{person.relationship}</p>
                </div>
                <p className="text-xs text-[#59655D] leading-relaxed">{person.notes}</p>
                {person.voiceTranscript && (
                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#E8E0D5] flex items-center gap-2 text-xs text-[#59655D]">
                    <Volume2 className="w-4 h-4 text-[#5B8266] shrink-0" />
                    <span className="italic truncate">"{person.voiceTranscript}"</span>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Places Grid */}
      {(activeTab === 'all' || activeTab === 'places') && (
        <div className="space-y-3 pt-4">
          <h3 className="text-lg font-bold text-[#2C332D] flex items-center gap-2">
            <span>Cherished Places</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_PLACES.map((place) => (
              <GlassCard key={place.id} className="p-5 space-y-3">
                <div className="text-4xl">{place.photoUrl}</div>
                <div>
                  <h4 className="text-lg font-bold text-[#2C332D]">{place.title}</h4>
                  <p className="text-xs font-semibold text-[#8E778E]">{place.locationName}</p>
                </div>
                <p className="text-xs text-[#59655D] leading-relaxed">{place.description}</p>
                <div className="text-[11px] text-[#5B8266] font-medium">
                  🍃 {place.sensoryDetails.scents}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Objects Grid */}
      {(activeTab === 'all' || activeTab === 'objects') && (
        <div className="space-y-3 pt-4">
          <h3 className="text-lg font-bold text-[#2C332D] flex items-center gap-2">
            <span>Meaningful Objects</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_OBJECTS.map((obj) => (
              <GlassCard key={obj.id} className="p-5 space-y-2">
                <div className="text-4xl">{obj.photoUrl}</div>
                <h4 className="text-base font-bold text-[#2C332D]">{obj.name}</h4>
                <p className="text-xs text-[#59655D] leading-relaxed">{obj.significance}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
