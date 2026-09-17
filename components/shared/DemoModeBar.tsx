'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wifi, WifiOff, Sparkles, User, HeartPulse, Shield, PlayCircle, Cpu, Key } from 'lucide-react';
import { OfflineStorageManager } from '@/lib/storage/indexed-db';
import { NERStateSwitcher } from './NERStateSwitcher';
import { AlgorithmInspectorModal } from './AlgorithmInspectorModal';
import { AIConfigModal } from './AIConfigModal';

export const DemoModeBar: React.FC = () => {
  const pathname = usePathname();
  const [isOffline, setIsOffline] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isAIConfigOpen, setIsAIConfigOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsOffline(OfflineStorageManager.isSimulatedOffline());

    const handleNetworkChange = (e: any) => {
      setIsOffline(e.detail?.offline ?? false);
    };

    window.addEventListener('cogniva-network-change', handleNetworkChange);
    return () => window.removeEventListener('cogniva-network-change', handleNetworkChange);
  }, []);

  const toggleOffline = () => {
    const next = !isOffline;
    setIsOffline(next);
    OfflineStorageManager.setSimulatedOffline(next);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="bg-[#2C332D] text-[#FAF7F2] text-xs py-2 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 shadow-md border-b border-black/10 z-50 select-none">
        {/* Left section: Sandbox title & NER State Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#E78C56] bg-black/30 px-2.5 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KAYA AZMUTH SANDBOX</span>
          </span>

          {/* 8-State North Eastern Region Switcher */}
          <NERStateSwitcher />
        </div>

        {/* Right Section: ML Inspector, AI Config, Wi-Fi Toggle, Role links, Demo launcher */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* ML Algorithm Inspector Button */}
          <button
            onClick={() => setIsInspectorOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors cursor-pointer"
            title="Inspect Live Mathematical Adaptive ML Formulation"
          >
            <Cpu className="w-3 h-3 text-[#5B8266]" />
            <span className="hidden md:inline">Adaptive ML Inspector</span>
          </button>

          {/* AI Key Config Button */}
          <button
            onClick={() => setIsAIConfigOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-[11px] transition-colors cursor-pointer"
            title="Configure Google Gemini API Key"
          >
            <Key className="w-3 h-3 text-[#E9C46A]" />
            <span className="hidden md:inline">AI Keys</span>
          </button>

          {/* Network Toggle */}
          <button
            onClick={toggleOffline}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium text-[11px] transition-all cursor-pointer ${
              isOffline
                ? 'bg-[#D9654B] text-white hover:bg-[#C2543B]'
                : 'bg-[#5B8266] text-white hover:bg-[#4D7056]'
            }`}
            title="Click to toggle offline mode simulation for judging/demo"
          >
            {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
            <span>{isOffline ? 'Offline Mode' : 'Wi-Fi Online'}</span>
          </button>

          {/* Quick Role Switcher */}
          <div className="flex items-center bg-white/10 rounded-full p-0.5 text-[11px]">
            <Link
              href="/patient"
              className={`px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1 ${
                pathname.startsWith('/patient') ? 'bg-[#5B8266] text-white font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              <User className="w-3 h-3" />
              <span>Patient</span>
            </Link>
            <Link
              href="/caregiver"
              className={`px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1 ${
                pathname.startsWith('/caregiver') ? 'bg-[#E78C56] text-white font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              <span>Caregiver</span>
            </Link>
            <Link
              href="/health"
              className={`px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1 ${
                pathname.startsWith('/health') ? 'bg-[#8E778E] text-white font-semibold' : 'text-white/70 hover:text-white'
              }`}
            >
              <HeartPulse className="w-3 h-3" />
              <span>Clinical</span>
            </Link>
          </div>

          {/* 5-Min Guided Demo Launcher */}
          <Link
            href="/demo"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E9C46A] text-[#2C332D] font-bold hover:bg-[#DDA15E] transition-colors text-[11px]"
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
