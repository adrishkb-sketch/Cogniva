'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { VoiceService } from '@/lib/voice/voice-service';
import { Clock, CheckCircle2, HelpCircle, ArrowRight, Volume2 } from 'lucide-react';

export default function DayReconstructionPage() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [feedback, setFeedback] = useState('');

  const timeline = [
    { time: '07:30 AM', title: 'Morning Ginger Tea', desc: 'Sat on veranda with fresh tea', icon: '☕' },
    { time: '09:00 AM', title: 'Blood Pressure Tablet', desc: 'White tablet with water', icon: '💊' },
    { time: '11:00 AM', title: 'Cogniva Memory Session', desc: 'Jorhat memories & flower garden', icon: '🧠' },
    { time: '01:00 PM', title: 'Lunch (Rice & Masor Tenga)', desc: 'Warm fish curry with greens', icon: '🍲' },
    { time: '05:30 PM', title: 'Terrace Garden Stroll', desc: 'Watering Kopou orchids', icon: '🌿' }
  ];

  const questions = [
    {
      q: 'What did you do first this morning at 7:30 AM?',
      options: ['Drank Morning Ginger Tea', 'Went to grocery market', 'Took an evening walk'],
      correct: 'Drank Morning Ginger Tea',
      explanation: 'You enjoyed a warm cup of Assam tea on the veranda!'
    },
    {
      q: 'What happened after your morning tea at 9:00 AM?',
      options: ['Took your blood pressure tablet', 'Ate dinner', 'Cleaned the garden'],
      correct: 'Took your blood pressure tablet',
      explanation: 'You took your morning white tablet with a glass of water.'
    },
    {
      q: 'What is planned for 5:30 PM this evening?',
      options: ['Terrace garden stroll with orchids', 'Go to hospital', 'Sleep early'],
      correct: 'Terrace garden stroll with orchids',
      explanation: 'You will enjoy a peaceful walk among the blooming Kopou orchids.'
    }
  ];

  const currentQ = questions[activeQuestion];

  const handleAnswer = (option: string) => {
    if (option === currentQ.correct) {
      const msg = `Wonderful! ${currentQ.explanation}`;
      setFeedback(msg);
      VoiceService.speak(msg, 'en-IN');
    } else {
      const msg = 'Take your time. Look closely at your morning timeline.';
      setFeedback(msg);
      VoiceService.speak(msg, 'en-IN');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
          Temporal Sequencing & Episodic Recall
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
          Remember My Day
        </h1>
        <p className="text-sm text-[#59655D]">
          Reconstruct your peaceful daily rhythm and recall what happened today.
        </p>
      </div>

      {/* Interactive Day Reconstruction Question */}
      <GlassCard variant="patient" className="p-8 text-center space-y-5">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E78C56]">
          Question {activeQuestion + 1} of {questions.length}
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
          {currentQ.q}
        </h2>

        {feedback && (
          <div className="p-4 rounded-2xl bg-[#EBF2EC] text-[#3F5E47] font-semibold text-sm">
            {feedback}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {currentQ.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="p-5 rounded-2xl bg-white border-2 border-[#E0D8CC] hover:border-[#5B8266] font-bold text-sm sm:text-base text-[#2C332D] active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>

        {activeQuestion + 1 < questions.length && (
          <div className="pt-4 flex justify-center">
            <GlassButton
              variant="secondary"
              onClick={() => {
                setActiveQuestion(prev => prev + 1);
                setFeedback('');
              }}
              className="gap-2 text-xs"
            >
              <span>Next Day Question</span>
              <ArrowRight className="w-4 h-4" />
            </GlassButton>
          </div>
        )}
      </GlassCard>

      {/* Visual Timeline Section */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#2C332D] px-1">
          Today's Visual Schedule
        </h3>
        <div className="space-y-2">
          {timeline.map((item, idx) => (
            <GlassCard key={idx} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <div className="font-bold text-sm text-[#2C332D]">{item.title}</div>
                  <div className="text-xs text-[#59655D]">{item.desc}</div>
                </div>
              </div>
              <span className="text-xs font-bold text-[#5B8266] bg-[#EBF2EC] px-3 py-1 rounded-full">
                {item.time}
              </span>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
