'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { VoiceService } from '@/lib/voice/voice-service';
import { AIOrb } from '@/components/ui/AIOrb';
import { Sparkles, Play, Pause, Volume2, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MemoryTheatrePage() {
  const [theatreStep, setTheatreStep] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');

  const stages = [
    {
      title: 'Stage 1: Photo Encounter',
      icon: '🏡',
      heading: 'Look at the green wooden veranda in Jorhat',
      prompt: 'Notice the coconut trees and the betel palms in the morning sunlight.',
      actionLabel: 'Play Atmospheric Sound'
    },
    {
      title: 'Stage 2: Sound of Life',
      icon: '🌧️',
      heading: 'Listen to the gentle rainfall on the tin roof',
      prompt: 'This is the familiar rain pattern that falls outside the veranda during monsoon mornings.',
      actionLabel: 'Explore the Recognition Question'
    },
    {
      title: 'Stage 3: Recognition & Memory Anchor',
      icon: '☕',
      heading: 'Who brewed fresh ginger tea on this veranda?',
      prompt: 'Tap the warm memory anchor below:',
      options: ['You & Pranab on quiet mornings', 'Strangers at a cafe', 'A restaurant staff'],
      correct: 'You & Pranab on quiet mornings',
      actionLabel: 'Listen to Family Story'
    },
    {
      title: 'Stage 4: Living Family Story',
      icon: '🌸',
      heading: 'The story is safely cherished in your heart',
      prompt: '“Pranab would read literature aloud while Anima listened to the birds across the garden.”',
      actionLabel: 'Complete Memory Theatre'
    }
  ];

  const currentStage = stages[theatreStep];

  const handleNextStage = () => {
    if (theatreStep === 1) {
      VoiceService.speak('Playing sound of monsoon rain on the tin roof.', 'en-IN');
    }
    if (theatreStep + 1 < stages.length) {
      setTheatreStep(prev => prev + 1);
      setFeedback('');
    } else {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      VoiceService.speak('Memory theatre completed. You are connected to your dearest life moments.', 'en-IN');
    }
  };

  const handleOptionSelect = (opt: string) => {
    if (opt === currentStage.correct) {
      setFeedback('Wonderful! That is a true and cherished memory.');
      VoiceService.speak('Wonderful! That is a true and cherished memory.', 'en-IN');
    } else {
      setFeedback('Take your time. Think back to your peaceful veranda mornings.');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#EBF2EC] via-white to-[#FDF1EA] border border-[#E0D8CC] flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8266]">
            <Sparkles className="w-4 h-4 text-[#E78C56]" />
            <span>Multi-Sensory Flagship Experience</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            Memory Theatre
          </h1>
          <p className="text-sm text-[#59655D]">
            Photo • Sound • Recognition • Story • Living Connection
          </p>
        </div>

        <AIOrb size="sm" isSpeaking={isPlayingAudio} label="Theatre AI" />
      </div>

      {/* Main Theatre Presentation */}
      <GlassCard variant="patient" className="p-8 sm:p-12 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#849188]">
          {currentStage.title}
        </span>

        <div className="text-7xl animate-gentle-float">{currentStage.icon}</div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#2C332D] max-w-lg mx-auto">
          {currentStage.heading}
        </h2>

        <p className="text-base sm:text-lg text-[#59655D] max-w-md mx-auto leading-relaxed">
          {currentStage.prompt}
        </p>

        {/* Multi choice if on stage 3 */}
        {currentStage.options && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {currentStage.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleOptionSelect(opt)}
                className="p-4 rounded-2xl bg-white border-2 border-[#E0D8CC] hover:border-[#5B8266] font-bold text-sm text-[#2C332D] active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {feedback && (
          <div className="p-4 rounded-2xl bg-[#EBF2EC] text-[#3F5E47] font-semibold text-sm">
            {feedback}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-6 flex justify-center">
          <GlassButton
            variant="patient"
            onClick={handleNextStage}
            className="gap-2 text-base px-8 py-4"
          >
            <span>{currentStage.actionLabel}</span>
            <ArrowRight className="w-5 h-5" />
          </GlassButton>
        </div>
      </GlassCard>
    </div>
  );
}
