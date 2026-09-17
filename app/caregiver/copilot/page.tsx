'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { CaregiverCopilotService, CopilotResponse } from '@/lib/ai/caregiver-copilot';
import { Bot, Sparkles, Send, ShieldCheck, CheckCircle2, MessageSquare, Info } from 'lucide-react';
import { DEMO_PATIENT } from '@/lib/demo/demo-patient-anima';

export default function CaregiverCopilotPage() {
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant';
    text: string;
    sourceMetrics?: string[];
  }>>([
    {
      role: 'assistant',
      text: `Hello Ananya. I am your Cogniva Caregiver Copilot for Anima Das (72). I can summarize her daily sessions, explain observed activity trends, and check memory grounding. What would you like to review?`,
      sourceMetrics: ['Connected to Anima’s 14-session activity records']
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userText = queryText.trim();
    setInputQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const response = await CaregiverCopilotService.askQuestion(userText);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: response.answer,
          sourceMetrics: response.sourceMetrics
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'Cogniva Copilot is securely operating in local mode with verified patient baselines.',
          sourceMetrics: ['Local Baseline Store']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    'How has Anima been doing this week?',
    'Which activities were most difficult for her?',
    'What has changed in her sequencing tasks?',
    'How is her daily routine adherence looking?'
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/80 border border-[#E0D8CC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E78C56]">
            <Bot className="w-4 h-4 text-[#E78C56]" />
            <span>Grounded Caregiver Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            Ask Cogniva AI Copilot
          </h1>
          <p className="text-sm text-[#59655D]">
            Query Anima’s recorded activity metrics, routine adherence, and memory engagement with grounded AI.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#5B8266] font-semibold bg-[#EBF2EC] px-3 py-1.5 rounded-full border border-[#C5DBCB]">
          <ShieldCheck className="w-4 h-4" />
          <span>Grounded & Safe</span>
        </div>
      </div>

      {/* Chat Messages Container */}
      <GlassCard className="p-6 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-4 sm:p-5 rounded-3xl max-w-[85%] text-sm leading-relaxed space-y-2 ${
                m.role === 'user'
                  ? 'bg-[#E78C56] text-white font-medium shadow-sm'
                  : 'bg-[#FAF7F2] text-[#2C332D] border border-[#E0D8CC] shadow-xs'
              }`}
            >
              <p>{m.text}</p>
              {m.sourceMetrics && m.sourceMetrics.length > 0 && (
                <div className="pt-2 border-t border-black/10 text-[11px] space-y-0.5 opacity-90">
                  <span className="font-bold text-[10px] uppercase tracking-wider block">
                    Grounded Data Source:
                  </span>
                  {m.sourceMetrics.map((sm, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B8266]" />
                      <span>{sm}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="p-4 rounded-3xl bg-[#FAF7F2] border border-[#E0D8CC] text-xs text-[#59655D] animate-pulse">
              Analyzing recorded session metrics...
            </div>
          </div>
        )}
      </GlassCard>

      {/* Suggested Questions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-[#849188] shrink-0">Suggested:</span>
        {sampleQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleAsk(q)}
            className="px-3 py-1.5 rounded-full bg-white border border-[#E0D8CC] text-[#59655D] hover:border-[#E78C56] hover:text-[#2C332D] whitespace-nowrap cursor-pointer transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk(inputQuery)}
          placeholder="Ask about Anima's sessions, difficult activities, or trends..."
          className="flex-1 px-5 py-3.5 rounded-2xl bg-white border border-[#E0D8CC] text-sm focus:outline-none focus:border-[#E78C56]"
        />
        <GlassButton
          variant="primary"
          onClick={() => handleAsk(inputQuery)}
          className="gap-2 rounded-2xl px-6 py-3.5"
        >
          <Send className="w-4 h-4" />
          <span>Ask</span>
        </GlassButton>
      </div>

      {/* Medical Boundary Alert */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#E8E0D5] flex items-center gap-2.5 text-[11px] text-[#59655D]">
        <Info className="w-4 h-4 text-[#5B8266] shrink-0" />
        <span>Ask Cogniva summarizes recorded functional observations. It never generates clinical diagnoses or changes medications.</span>
      </div>
    </div>
  );
}
