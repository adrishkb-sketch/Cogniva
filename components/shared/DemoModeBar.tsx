'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wifi, WifiOff, Sparkles, User, HeartPulse, PlayCircle, Cpu, Key } from 'lucide-react';
import { OfflineStorageManager } from '@/lib/storage/indexed-db';
import { NERStateSwitcher } from './NERStateSwitcher';
import { AlgorithmInspectorModal } from './AlgorithmInspectorModal';
import { AIConfigModal } from './AIConfigModal';
import { hasCustomGeminiKey, GEMINI_KEY_EVENT } from '@/lib/ai/ai-key';

export const DemoModeBar: React.FC = () => {
  const pathname = usePathname();
  const [isOffline, setIsOffline] = useState(false);
  const [hasCustomKey, setHasCustomKey] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isAIConfigOpen, setIsAIConfigOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOffline(OfflineStorageManager.isSimulatedOffline());
    setHasCustomKey(hasCustomGeminiKey());

    const handleNetworkChange = (e: any) => {
      setIsOffline(e.detail?.offline ?? false);
    };

    const handleKeyChange = (e: any) => {
      setHasCustomKey(!!e.detail?.apiKey);
    };

    window.addEventListener('cogniva-network-change', handleNetworkChange);
    window.addEventListener(GEMINI_KEY_EVENT, handleKeyChange);
    return () => {
      window.removeEventListener('cogniva-network-change', handleNetworkChange);
      window.removeEventListener(GEMINI_KEY_EVENT, handleKeyChange);
    };
  }, []);

  const toggleOffline = () => {
    const next = !isOffline;
    setIsOffline(next);
    OfflineStorageManager.setSimulatedOffline(next);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="bg-[#0B0F17]/90 text-[var(--text-primary)] text-xs py-2 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md border-b border-[var(--border-subtle)] z-50 select-none gpu-layer">
        {/* Left section: Sandbox title & NER State Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-bold text-[var(--accent-cyan)] bg-[var(--accent-cyan-subtle)] border border-[var(--accent-cyan)]/20 px-2.5 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-wider">COGNIVA SANDBOX</span>
          </span>

          {/* 8-State North Eastern Region Switcher */}
          <NERStateSwitcher />
        </div>

        {/* Right Section: ML Inspector, AI Config, Wi-Fi Toggle, Role links, Demo launcher */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* ML Algorithm Inspector Button */}
          <button
            onClick={() => setIsInspectorOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white font-medium text-[11px] border border-white/10 transition-colors cursor-pointer"
            title="Inspect Live Mathematical Adaptive ML Formulation"
          >
            <Cpu className="w-3 h-3 text-[var(--accent-emerald)]" />
            <span className="hidden md:inline">Adaptive ML Inspector</span>
          </button>

          {/* AI Key Config Button */}
          <button
            onClick={() => setIsAIConfigOpen(true)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium text-[11px] border transition-all cursor-pointer ${
              hasCustomKey
                ? 'bg-[var(--accent-orange)]/20 text-orange-200 border-[var(--accent-orange)]/40 hover:bg-[var(--accent-orange)]/30'
                : 'bg-white/5 hover:bg-white/10 text-[var(--text-secondary)] hover:text-white border-white/10'
            }`}
            title="Configure / Paste Google Gemini API Key"
          >
            <Key className={`w-3 h-3 ${hasCustomKey ? 'text-amber-400' : 'text-[var(--accent-orange)]'}`} />
            <span>{hasCustomKey ? 'Gemini Key: Active' : 'AI Keys'}</span>
          </button>

          {/* Network Toggle */}
          <button
            onClick={toggleOffline}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold text-[11px] border transition-all cursor-pointer ${
              isOffline
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
            title="Click to toggle offline mode simulation for judging/demo"
          >
            {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            <span>{isOffline ? 'Offline Mode' : 'Wi-Fi Online'}</span>
          </button>

          {/* Quick Role Switcher */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-[11px]">
            <Link
              href="/patient"
              className={`px-2.5 py-0.5 rounded-md transition-all flex items-center gap-1 ${
                pathname.startsWith('/patient') ? 'bg-[var(--accent-cyan)] text-[#06090E] font-bold shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Patient</span>
            </Link>
            <Link
              href="/caregiver"
              className={`px-2.5 py-0.5 rounded-md transition-all flex items-center gap-1 ${
                pathname.startsWith('/caregiver') ? 'bg-[var(--accent-purple)] text-white font-bold shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <span>Caregiver</span>
            </Link>
            <Link
              href="/health"
              className={`px-2.5 py-0.5 rounded-md transition-all flex items-center gap-1 ${
                pathname.startsWith('/health') ? 'bg-[var(--accent-emerald)] text-[#06090E] font-bold shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              <HeartPulse className="w-3 h-3" />
              <span>Clinical</span>
            </Link>
          </div>

          {/* 5-Min Guided Demo Launcher */}
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] text-[#06090E] font-extrabold hover:opacity-90 transition-opacity text-[11px] shadow-sm"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>5-Min Demo</span>
          </Link>
        </div>
      </div>

      {/* Modals */}
      <AlgorithmInspectorModal isOpen={isInspectorOpen} onClose={() => setIsInspectorOpen(false)} />
      <AIConfigModal isOpen={isAIConfigOpen} onClose={() => setIsAIConfigOpen(false)} />
    </>
  );
};
