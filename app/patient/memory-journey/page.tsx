'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { DEMO_PLACES, DEMO_PEOPLE, DEMO_OBJECTS } from '@/lib/demo/demo-patient-anima';
import { VoiceService } from '@/lib/voice/voice-service';
import { ArrowRight, Volume2, Sparkles, CheckCircle2, Heart } from 'lucide-react';

export default function MemoryJourneyPage() {
  const [stepIndex, setStepIndex] = useState(0);

  const journeySteps = [
    {
      stage: 'RECOGNITION',
      icon: '🏡',
      title: 'Recognize the Place',
      question: 'Do you recognize this house in Jorhat?',
      hint: 'It has the spacious front courtyard with betel nut trees.',
      responseOptions: ['Tarajan Ancestral Home', 'Guwahati Market', 'Hospital'],
      correctOption: 'Tarajan Ancestral Home',
      narration: 'This is your ancestral home in Tarajan, Jorhat, surrounded by green trees.'
    },
    {
      stage: 'RECALL',
      icon: '👴',
      title: 'Recall Loved Ones',
      question: 'Who shared peaceful evening walks with you here?',
      hint: 'Your late husband who was a literature teacher in Jorhat.',
      responseOptions: ['Pranab Das (Husband)', 'Neighbor', 'Doctor'],
      correctOption: 'Pranab Das (Husband)',
      narration: 'Yes, your late husband Pranab Das, who loved literature and tea on the veranda.'
    },
    {
      stage: 'ASSOCIATION',
      icon: '🧣',
      title: 'Associate the Memory',
      question: 'What did you weave for him on your handloom during Bihu?',
      hint: 'The handwoven red and white towel with floral motifs.',
      responseOptions: ['Red Floral Gamosa', 'Woolen Sweater', 'Silk Scarf'],
      correctOption: 'Red Floral Gamosa',
      narration: 'A beautiful handwoven Gamosa woven with love for Rongali Bihu.'
    },
    {
      stage: 'CONVERSATION & STORY',
      icon: '🌸',
      title: 'Story Reflection',
      question: 'What do you remember most about spring mornings in Jorhat?',
      hint: 'The aroma of blooming Sewali flowers and fresh tea.',
      responseOptions: ['Monsoon rain & tea on veranda', 'Traffic noise', 'Cold winter snow'],
      correctOption: 'Monsoon rain & tea on veranda',
      narration: 'Sitting peacefully with warm ginger tea while listening to the rain on the tin roof.'
    }
  ];

  const currentStep = journeySteps[stepIndex];
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isStepComplete, setIsStepComplete] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsStepComplete(false);
    if (currentStep) {
      VoiceService.speak(currentStep.question, 'en-IN');
    }
  }, [stepIndex]);

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswer(option);
    if (option === currentStep.correctOption) {
      setIsStepComplete(true);
      VoiceService.speak(`Wonderful! ${currentStep.narration}`, 'en-IN');
    } else {
      VoiceService.speak(`Take your time. ${currentStep.hint}`, 'en-IN');
    }
  };

  const nextStep = () => {
    if (stepIndex + 1 < journeySteps.length) {
      setStepIndex(stepIndex + 1);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white/80 border border-[#E0D8CC] flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
            Step {stepIndex + 1} of {journeySteps.length} • {currentStep.stage}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Memory Journey: Jorhat Memories
          </h1>
        </div>

        <button
          onClick={() => VoiceService.speak(currentStep.question, 'en-IN')}
          className="p-3 rounded-2xl bg-[#EBF2EC] text-[#5B8266] hover:bg-[#DEEBE0]"
        >
          <Volume2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Interactive Stage */}
      <GlassCard variant="patient" className="p-8 sm:p-12 text-center space-y-6">
        <div className="text-6xl">{currentStep.icon}</div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
          {currentStep.question}
        </h2>

        <p className="text-sm sm:text-base text-[#59655D]">
          {currentStep.hint}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          {currentStep.responseOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelectAnswer(opt)}
              className={`p-5 rounded-2xl font-bold text-base transition-all cursor-pointer border-2 shadow-xs active:scale-95 ${
                selectedAnswer === opt
                  ? opt === currentStep.correctOption
                    ? 'bg-[#5B8266] text-white border-[#3E5C46]'
                    : 'bg-[#FEF6E7] text-[#B85D43] border-[#F8D5C2]'
                  : 'bg-white border-[#E0D8CC] text-[#2C332D] hover:bg-[#FAF7F2]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Supportive narration */}
        {isStepComplete && (
          <div className="p-4 rounded-2xl bg-[#EBF2EC] border border-[#C5DBCB] text-sm text-[#3F5E47] font-semibold">
            {currentStep.narration}
          </div>
        )}

        {/* Next step button */}
        {isStepComplete && (
          <div className="pt-4 flex justify-center">
            {stepIndex + 1 < journeySteps.length ? (
              <GlassButton variant="patient" onClick={nextStep} className="gap-2">
                <span>Next Memory Step</span>
                <ArrowRight className="w-4 h-4" />
              </GlassButton>
            ) : (
              <div className="space-y-3">
                <div className="text-2xl font-bold text-[#5B8266]">
                  🌸 Memory Journey Complete!
                </div>
                <p className="text-sm text-[#59655D]">
                  You remembered every cherished piece of your Jorhat story.
                </p>
              </div>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
