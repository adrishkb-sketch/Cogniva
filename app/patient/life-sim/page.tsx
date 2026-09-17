'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { DEMO_LIFE_SIM_SCENARIOS, DEMO_PATIENT } from '@/lib/demo/demo-patient-anima';
import { OfflineStorageManager } from '@/lib/storage/indexed-db';
import { VoiceService } from '@/lib/voice/voice-service';
import { CheckCircle2, Sparkles, Volume2, HelpCircle, ArrowRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LifeSimPage() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const scenario = DEMO_LIFE_SIM_SCENARIOS[activeScenarioIndex];
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = scenario.steps[currentStepIndex];

  // Tracking metrics
  const [stepStartTime, setStepStartTime] = useState<number>(Date.now());
  const [totalErrors, setTotalErrors] = useState(0);
  const [assistanceCount, setAssistanceCount] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setStepStartTime(Date.now());
    setFeedbackMessage('');
    if (currentStep) {
      VoiceService.speak(currentStep.instruction, 'en-IN');
    }
  }, [currentStepIndex, scenario]);

  // Combine items for this step
  const allChoices = currentStep ? [
    { id: currentStep.correctItemId, isCorrect: true },
    ...currentStep.distractorItemIds.map(id => ({ id, isCorrect: false }))
  ].sort(() => 0.5 - Math.random()) : [];

  // Visual dictionary for items
  const getItemDetails = (id: string) => {
    switch (id) {
      case 'item-kettle': return { name: 'Tea Kettle', icon: '🫖', desc: 'Filled with fresh water' };
      case 'item-tea-box': return { name: 'Assam Tea Leaves', icon: '🌿', desc: 'Fragrant black tea' };
      case 'item-ginger': return { name: 'Fresh Ginger Slice', icon: '🫚', desc: 'Warm comforting spice' };
      case 'item-brass-cup': return { name: 'Bell-Metal Tea Cup', icon: '☕', desc: 'Kahi-Bati traditional cup' };
      case 'item-frying-pan': return { name: 'Frying Pan', icon: '🍳', desc: 'For cooking meals' };
      case 'item-water-jug': return { name: 'Water Jug', icon: '🏺', desc: 'Cold drinking water' };
      case 'item-salt-box': return { name: 'Salt Jar', icon: '🧂', desc: 'For savory seasoning' };
      case 'item-flour-box': return { name: 'Rice Flour', icon: '🌾', desc: 'For baking pithas' };
      case 'item-green-chili': return { name: 'Green Chili', icon: '🌶️', desc: 'Hot spice' };
      case 'item-lemon': return { name: 'Kazi Nemu (Lemon)', icon: '🍋', desc: 'Sour citrus' };
      case 'item-plastic-mug': return { name: 'Plastic Mug', icon: '🥤', desc: 'Cold drink cup' };
      case 'item-glass-jar': return { name: 'Glass Jar', icon: '🫙', desc: 'Storage container' };
      case 'item-health-folder': return { name: 'Medical Health Folder', icon: '📁', desc: 'Blue record file' };
      case 'item-newspaper': return { name: 'Daily Newspaper', icon: '📰', desc: 'Morning news' };
      case 'item-novel': return { name: 'Literature Book', icon: '📖', desc: 'Story book' };
      case 'item-glasses': return { name: 'Reading Glasses Case', icon: '👓', desc: 'For reading clear text' };
      case 'item-sunglasses': return { name: 'Sunglasses', icon: '🕶️', desc: 'For bright sunlight' };
      case 'item-magnifying-lens': return { name: 'Magnifying Glass', icon: '🔍', desc: 'Hand lens' };
      case 'item-water-flask': return { name: 'Stainless Water Flask', icon: '🍶', desc: 'Warm drinking water' };
      case 'item-soda-can': return { name: 'Soda Can', icon: '🥫', desc: 'Sweet drink' };
      case 'item-empty-cup': return { name: 'Empty Cup', icon: '🥛', desc: 'Glass' };
      default: return { name: id, icon: '📦', desc: 'Household object' };
    }
  };

  const handleSelectItem = (isCorrect: boolean) => {
    const elapsed = Date.now() - stepStartTime;

    if (isCorrect) {
      setFeedbackMessage(currentStep.encouragementText);
      VoiceService.speak(currentStep.encouragementText, 'en-IN');

      setTimeout(() => {
        if (currentStepIndex + 1 < scenario.steps.length) {
          setCurrentStepIndex(currentStepIndex + 1);
        } else {
          // Completed scenario!
          setIsCompleted(true);
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
          VoiceService.speak('Wonderful work Anima! Your morning tea is ready.', 'en-IN');

          // Record activity into Offline Storage & Sync Queue
          OfflineStorageManager.recordActivity({
            id: `act-${Date.now()}`,
            patientId: DEMO_PATIENT.id,
            activityType: 'life_sim',
            scenarioId: scenario.id,
            title: scenario.title,
            category: 'sequencing',
            startedAt: new Date(Date.now() - 120000).toISOString(),
            completedAt: new Date().toISOString(),
            durationSeconds: 120,
            accuracyRate: Math.max(60, 100 - totalErrors * 10),
            responseLatencyAvgMs: elapsed,
            mistakesCount: totalErrors,
            sequenceErrors: totalErrors > 0 ? 1 : 0,
            assistanceCount: assistanceCount,
            retries: totalErrors,
            isCompleted: true,
            isOfflineGenerated: OfflineStorageManager.isSimulatedOffline(),
            synced: !OfflineStorageManager.isSimulatedOffline()
          });
        }
      }, 1200);
    } else {
      setTotalErrors(prev => prev + 1);
      const supportive = "Take your time. Let's look closely at the tea items.";
      setFeedbackMessage(supportive);
      VoiceService.speak(supportive, 'en-IN');
    }
  };

  const requestHint = () => {
    setAssistanceCount(prev => prev + 1);
    setFeedbackMessage(currentStep.hint);
    VoiceService.speak(currentStep.hint, 'en-IN');
  };

  const resetScenario = (scenarioIdx: number = 0) => {
    setActiveScenarioIndex(scenarioIdx);
    setCurrentStepIndex(0);
    setTotalErrors(0);
    setAssistanceCount(0);
    setIsCompleted(false);
    setFeedbackMessage('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 border border-[#E0D8CC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8266]">
            <span>Life Sim • Everyday Routine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            {scenario.title}
          </h1>
          <p className="text-sm text-[#59655D]">{scenario.subtitle}</p>
        </div>

        {/* Voice read prompt */}
        <button
          onClick={() => currentStep && VoiceService.speak(currentStep.instruction, 'en-IN')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#EBF2EC] text-[#3F5E47] font-semibold text-sm hover:bg-[#DEEBE0] cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
          <span>Hear Prompt</span>
        </button>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-[#59655D]">
              <span>Step {currentStepIndex + 1} of {scenario.steps.length}</span>
              <span>Take your time ❤️</span>
            </div>
            <div className="w-full h-3 bg-[#E8E0D5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#5B8266] transition-all duration-300 rounded-full"
                style={{ width: `${((currentStepIndex + 1) / scenario.steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Single Focused Action Screen */}
          <GlassCard variant="patient" className="text-center p-8 sm:p-12 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#5B8266]">
              {scenario.scenarioTheme}
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold text-[#2C332D] leading-tight">
              {currentStep.instruction}
            </h2>

            {currentStep.subPrompt && (
              <p className="text-lg text-[#59655D]">
                {currentStep.subPrompt}
              </p>
            )}

            {/* Supportive Feedback Box */}
            {feedbackMessage && (
              <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8D5C2] text-[#B85D43] font-semibold text-base animate-soft-pulse">
                {feedbackMessage}
              </div>
            )}

            {/* Tactile Big Item Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {allChoices.map((item, idx) => {
                const details = getItemDetails(item.id);
                return (
                  <button
                    key={`${item.id}-${idx}`}
                    onClick={() => handleSelectItem(item.isCorrect)}
                    className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#E0D8CC] hover:border-[#5B8266] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-2 group min-h-[140px]"
                  >
                    <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform">
                      {details.icon}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-[#2C332D] mt-2">
                      {details.name}
                    </span>
                    <span className="text-xs text-[#849188]">
                      {details.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Assistance Hint Button */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={requestHint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/70 border border-[#E0D8CC] text-sm font-semibold text-[#59655D] hover:bg-white cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#E78C56]" />
                <span>Need a gentle hint?</span>
              </button>
            </div>
          </GlassCard>
        </div>
      ) : (
        /* Completed Screen */
        <GlassCard variant="patient" className="text-center p-8 sm:p-12 space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#EBF2EC] text-[#5B8266] flex items-center justify-center mx-auto text-4xl">
            ☕
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C332D]">
            Warm Tea Prepared Peacefully!
          </h2>

          <p className="text-lg text-[#59655D] max-w-md mx-auto leading-relaxed">
            Your fresh ginger Assam tea is ready to enjoy on the veranda. This activity has been safely recorded in your daily journal.
          </p>

          <div className="p-4 rounded-2xl bg-[#EBF2EC] border border-[#C5DBCB] text-sm text-[#3F5E47] font-semibold max-w-sm mx-auto flex items-center justify-center gap-2">
            <span>🌿 Your garden Kopou orchid received morning warmth!</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <GlassButton
              variant="patient"
              onClick={() => resetScenario(0)}
              className="gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Practice Again</span>
            </GlassButton>

            <GlassButton
              variant="secondary"
              onClick={() => resetScenario(1)}
              className="gap-2"
            >
              <span>Next: Prepare Doctor Visit →</span>
            </GlassButton>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
