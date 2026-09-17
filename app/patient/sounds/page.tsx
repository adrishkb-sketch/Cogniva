'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { DEMO_SOUNDS } from '@/lib/demo/demo-patient-anima';
import { VoiceService } from '@/lib/voice/voice-service';
import { Volume2, Play, Pause, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SoundsPage() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeQuizSound, setActiveQuizSound] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const playSound = (id: string, text: string) => {
    if (playingId === id) {
      VoiceService.stop();
      setPlayingId(null);
    } else {
      setPlayingId(id);
      VoiceService.speak(`Playing sound of: ${text}`, 'en-IN', () => {
        setPlayingId(null);
      });
    }
  };

  const handleQuizChoice = (soundName: string) => {
    if (soundName === 'Monsoon Rain on Tin Roof') {
      const correct = 'Spot on! That is the soothing sound of rain falling on the tin roof of your veranda.';
      setFeedback(correct);
      VoiceService.speak(correct, 'en-IN');
    } else {
      const hint = 'Listen carefully. It sounds like water falling rhythmically on a metal rooftop.';
      setFeedback(hint);
      VoiceService.speak(hint, 'en-IN');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9A036]">
            <span>Sensory Reminiscence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Sounds of My Life
          </h1>
          <p className="text-sm text-[#59655D]">
            Familiar environmental sounds from the tea gardens, monsoon showers, and festivals of Assam.
          </p>
        </div>
      </div>

      {/* Sound Recognition Practice */}
      <GlassCard variant="patient" className="p-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
          Sound Association Practice
        </span>
        <h2 className="text-2xl font-bold text-[#2C332D]">
          Listen to this familiar sound. Which one is it?
        </h2>

        <div className="flex justify-center py-2">
          <button
            onClick={() => playSound('quiz-sound', 'Rhythmic monsoon rainfall on tin roof in Jorhat')}
            className="w-20 h-20 rounded-full bg-[#5B8266] text-white flex items-center justify-center text-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {playingId === 'quiz-sound' ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-2xl bg-[#EBF2EC] text-[#3F5E47] font-semibold text-sm">
            {feedback}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {['Monsoon Rain on Tin Roof', 'Market Traffic', 'Train Horn'].map((s) => (
            <button
              key={s}
              onClick={() => handleQuizChoice(s)}
              className="p-4 rounded-2xl bg-white border-2 border-[#E0D8CC] hover:border-[#5B8266] font-bold text-sm text-[#2C332D] shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Sounds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEMO_SOUNDS.map((sound) => (
          <GlassCard key={sound.id} className="p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl">
                  {sound.soundType === 'rain' ? '🌧️' : sound.soundType === 'kitchen' ? '🫖' : '🎺'}
                </span>
                <span className="text-[11px] font-bold text-[#5B8266] bg-[#EBF2EC] px-2.5 py-0.5 rounded-full">
                  {sound.category}
                </span>
              </div>
              <h4 className="text-base font-bold text-[#2C332D]">{sound.title}</h4>
              <p className="text-xs text-[#59655D] leading-relaxed">{sound.description}</p>
            </div>

            <div className="pt-3 border-t border-[#E8E0D5]">
              <button
                onClick={() => playSound(sound.id, sound.title)}
                className="w-full py-2.5 rounded-xl bg-white border border-[#E0D8CC] hover:border-[#5B8266] text-xs font-bold text-[#2C332D] flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {playingId === sound.id ? <Pause className="w-4 h-4 text-[#D9654B]" /> : <Play className="w-4 h-4 text-[#5B8266]" />}
                <span>{playingId === sound.id ? 'Pause Sound' : 'Play Sound Clip'}</span>
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
