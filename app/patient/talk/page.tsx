'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { AIOrb } from '@/components/ui/AIOrb';
import { VoiceService } from '@/lib/voice/voice-service';
import { MemoryGroundingService } from '@/lib/ai/memory-grounding';
import { Mic, MicOff, Volume2, Sparkles, Heart } from 'lucide-react';

import { getGeminiAuthHeaders } from '@/lib/ai/ai-key';

export default function TalkCompanionPage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([
    {
      role: 'ai',
      text: 'Good morning Anima! It is wonderful to spend quiet time with you. Would you like to tell me about your ancestral home in Jorhat, or your morning tea?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setInputText('');

    // Add user message
    const updatedHistory = [...chatHistory, { role: 'user' as const, text: userMsg }];
    setChatHistory(updatedHistory);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: getGeminiAuthHeaders(),
        body: JSON.stringify({ prompt: userMsg, patientName: 'Anima', region: 'Assam' })
      });

      let aiResponse = '';
      if (res.ok) {
        const data = await res.json();
        aiResponse = data.content;
      }

      if (!aiResponse) {
        const grounded = MemoryGroundingService.queryVerifiedMemory(userMsg);
        aiResponse = grounded.found
          ? grounded.verifiedAnswer
          : `That sounds very comforting, Anima. Tell me more about what you enjoyed doing on your veranda in Jorhat.`;
      }

      setChatHistory(prev => [...prev, { role: 'ai' as const, text: aiResponse }]);
      setIsSpeaking(true);
      VoiceService.speak(aiResponse, 'en-IN', () => setIsSpeaking(false));
    } catch {
      const grounded = MemoryGroundingService.queryVerifiedMemory(userMsg);
      const fallbackMsg = grounded.found
        ? grounded.verifiedAnswer
        : `That sounds very comforting, Anima. Tell me more about what you enjoyed doing on your veranda in Jorhat.`;
      setChatHistory(prev => [...prev, { role: 'ai' as const, text: fallbackMsg }]);
      setIsSpeaking(true);
      VoiceService.speak(fallbackMsg, 'en-IN', () => setIsSpeaking(false));
    }
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      VoiceService.startListening(
        (transcript) => {
          setIsListening(false);
          handleSend(transcript);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header with Breathing AI Orb */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
            Reminiscence Companion
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            Talk With Cogniva
          </h1>
          <p className="text-sm text-[#59655D]">
            Share your favorite stories, family memories, and peaceful daily thoughts.
          </p>
        </div>

        <AIOrb size="md" isListening={isListening} isSpeaking={isSpeaking} label={isSpeaking ? 'Speaking' : isListening ? 'Listening' : 'Ready'} />
      </div>

      {/* Chat Transcript Area */}
      <GlassCard variant="patient" className="p-6 sm:p-8 min-h-[340px] space-y-4 max-h-[460px] overflow-y-auto">
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-4 sm:p-5 rounded-3xl max-w-[85%] text-base sm:text-lg leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#5B8266] text-white shadow-sm font-medium'
                  : 'bg-[#FAF7F2] text-[#2C332D] border border-[#E0D8CC] shadow-xs'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </GlassCard>

      {/* Suggested Topics Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="font-bold text-[#849188] shrink-0">Try asking:</span>
        {[
          'Who is Ananya?',
          'Tell me about my home in Jorhat',
          'What happens during Rongali Bihu?',
          'Where is my brass tea cup?'
        ].map((topic) => (
          <button
            key={topic}
            onClick={() => handleSend(topic)}
            className="px-3 py-1.5 rounded-full bg-white border border-[#E0D8CC] text-[#59655D] hover:border-[#5B8266] hover:text-[#2C332D] whitespace-nowrap cursor-pointer"
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Input Bar & Voice Mic */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
          placeholder="Speak or type a thought or memory..."
          className="flex-1 px-5 py-4 rounded-2xl bg-white border-2 border-[#E0D8CC] text-base focus:outline-none focus:border-[#5B8266] shadow-xs"
        />

        <button
          onClick={toggleMic}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer shadow-md active:scale-95 flex items-center justify-center ${
            isListening
              ? 'bg-[#D9654B] text-white border-[#A8422B] animate-pulse'
              : 'bg-[#5B8266] text-white border-[#3E5C46] hover:bg-[#4D7056]'
          }`}
          title="Click to speak"
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <GlassButton
          variant="primary"
          onClick={() => handleSend(inputText)}
          className="rounded-2xl px-6 py-4 font-bold text-sm hidden sm:inline-flex"
        >
          Send
        </GlassButton>
      </div>
    </div>
  );
}
