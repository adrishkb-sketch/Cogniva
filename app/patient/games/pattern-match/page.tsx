'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { useNERState } from '@/components/shared/NERStateContext';
import { VoiceService } from '@/lib/voice/voice-service';
import { OfflineStorageManager } from '@/lib/storage/indexed-db';
import { DEMO_PATIENT } from '@/lib/demo/demo-patient-anima';
import { Sparkles, Volume2, ArrowRight, RefreshCw, CheckCircle2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PatternMatchGamePage() {
  const { activePack } = useNERState();
  const [currentRound, setCurrentRound] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [mistakes, setMistakes] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const rounds = [
    {
      prompt: `Find the traditional ${activePack.householdObjects[0]?.name || 'Heirloom'} from ${activePack.state}`,
      correctName: activePack.householdObjects[0]?.name || 'Traditional Gamosa',
      correctIcon: '🧣',
      distractors: [
        { name: 'Plastic Bag', icon: '🛍️' },
        { name: 'Modern Cap', icon: '🧢' }
      ],
      meaning: activePack.householdObjects[0]?.significance || 'Handcrafted cultural heirloom.'
    },
    {
      prompt: `Which traditional utensil is crafted in ${activePack.state} style?`,
      correctName: activePack.householdObjects[1]?.name || 'Bell-Metal Tea Cup',
      correctIcon: '☕',
      distractors: [
        { name: 'Soda Can', icon: '🥫' },
        { name: 'Plastic Bottle', icon: '🍾' }
      ],
      meaning: activePack.householdObjects[1]?.significance || 'Traditional dining and tea utensil.'
    },
    {
      prompt: `Identify the beloved celebration from ${activePack.state}`,
      correctName: activePack.festivals[0]?.name || 'Spring Harvest Festival',
      correctIcon: activePack.festivals[0]?.icon || '🌸',
      distractors: [
        { name: 'Traffic Jam', icon: '🚗' },
        { name: 'Shopping Mall', icon: '🏢' }
      ],
      meaning: activePack.festivals[0]?.description || 'Joyous regional festival.'
    }
  ];

  const round = rounds[currentRound];

  const choices = round ? [
    { name: round.correctName, icon: round.correctIcon, isCorrect: true },
    ...round.distractors.map(d => ({ name: d.name, icon: d.icon, isCorrect: false }))
  ].sort(() => 0.5 - Math.random()) : [];

  useEffect(() => {
    setStartTime(Date.now());
    setFeedback('');
    if (round) {
      VoiceService.speak(round.prompt, 'en-IN');
    }
  }, [currentRound, activePack]);

  const handleSelect = (isCorrect: boolean) => {
    const elapsed = Date.now() - startTime;

    if (isCorrect) {
      const praise = `Wonderful! That is the ${round.correctName}. ${round.meaning}`;
      setFeedback(praise);
      VoiceService.speak(praise, 'en-IN');

      setTimeout(() => {
        if (currentRound + 1 < rounds.length) {
          setCurrentRound(prev => prev + 1);
        } else {
          setIsCompleted(true);
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
          VoiceService.speak('Pattern matching completed! Your garden orchid blossomed.', 'en-IN');

          // Record in offline storage
          OfflineStorageManager.recordActivity({
            id: `act-pattern-${Date.now()}`,
            patientId: DEMO_PATIENT.id,
            activityType: 'memory_recognition',
            title: `NER Pattern Recognition (${activePack.state})`,
            category: 'recognition',
            startedAt: new Date(Date.now() - 90000).toISOString(),
            completedAt: new Date().toISOString(),
            durationSeconds: 90,
            accuracyRate: Math.max(70, 100 - mistakes * 10),
            responseLatencyAvgMs: elapsed,
            mistakesCount: mistakes,
            sequenceErrors: 0,
            assistanceCount: 0,
            retries: mistakes,
            isCompleted: true,
            isOfflineGenerated: OfflineStorageManager.isSimulatedOffline(),
            synced: !OfflineStorageManager.isSimulatedOffline()
          });
        }
      }, 1400);
    } else {
      setMistakes(prev => prev + 1);
      const supportive = `Take your time. Look for the traditional ${round.correctName}.`;
      setFeedback(supportive);
      VoiceService.speak(supportive, 'en-IN');
    }
  };

  const restartGame = () => {
    setCurrentRound(0);
    setMistakes(0);
    setIsCompleted(false);
    setFeedback('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
            {activePack.name} • Recognition Game
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            NER Pattern & Heirloom Match
          </h1>
          <p className="text-sm text-[#59655D]">
            Recognize beloved cultural heirlooms and traditional crafts.
          </p>
        </div>

        <button
          onClick={() => round && VoiceService.speak(round.prompt, 'en-IN')}
          className="px-4 py-2.5 rounded-2xl bg-[#EBF2EC] text-[#3F5E47] font-bold text-xs flex items-center gap-2 hover:bg-[#DEEBE0] cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>Hear Prompt</span>
        </button>
      </div>

      {!isCompleted ? (
        <GlassCard variant="patient" className="p-8 sm:p-12 text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E78C56]">
            Round {currentRound + 1} of {rounds.length}
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            {round.prompt}
          </h2>

          {feedback && (
            <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8D5C2] text-sm font-semibold text-[#B85D43]">
              {feedback}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {choices.map((c, idx) => (
              <button
                key={`${c.name}-${idx}`}
                onClick={() => handleSelect(c.isCorrect)}
                className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#E0D8CC] hover:border-[#5B8266] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-2 group min-h-[140px]"
              >
                <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform">
                  {c.icon}
                </span>
                <span className="text-base sm:text-lg font-bold text-[#2C332D] mt-2">
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </GlassCard>
      ) : (
        <GlassCard variant="patient" className="p-8 sm:p-12 text-center space-y-6">
          <div className="text-6xl">🌸</div>
          <h2 className="text-3xl font-bold text-[#2C332D]">
            Pattern Recognition Complete!
          </h2>
          <p className="text-base text-[#59655D] max-w-md mx-auto">
            You recognized every cherished traditional heirloom from {activePack.state}. Your terrace garden Kopou orchid has bloomed.
          </p>

          <div className="flex justify-center gap-3 pt-4">
            <GlassButton variant="patient" onClick={restartGame} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              <span>Play Again</span>
            </GlassButton>
            <Link href="/patient/games">
              <GlassButton variant="secondary" className="gap-2">
                <span>More Games →</span>
              </GlassButton>
            </Link>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
