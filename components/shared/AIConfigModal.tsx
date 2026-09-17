'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Key, ShieldCheck, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

interface AIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIConfigModal: React.FC<AIConfigModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cogniva_custom_gemini_key') || '';
      setApiKey(stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cogniva_custom_gemini_key', apiKey.trim());
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-2 border-[#5B8266] shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#5B8266]" />
            <h3 className="text-lg font-bold text-[#2C332D]">AI & API Model Configuration</h3>
          </div>
          <button onClick={onClose} className="text-xs font-bold text-[#849188] hover:text-[#2C332D]">✕</button>
        </div>

        <p className="text-xs text-[#59655D] leading-relaxed">
          Cogniva operates with an <strong>abstract dual-engine architecture</strong>: it uses Google Gemini 1.5 Flash when connected, and gracefully falls back to deterministic on-device clinical rules when offline.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#2C332D] mb-1">
              Google Gemini API Key (Optional)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full p-3 rounded-xl bg-white border border-[#E0D8CC] text-xs font-mono focus:outline-none focus:border-[#5B8266]"
            />
            <span className="text-[10px] text-[#849188] mt-1 block">
              If left blank, Cogniva automatically uses the pre-configured environment key or high-fidelity local grounded engine.
            </span>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-[#EBF2EC] text-[#3F5E47] font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>API Key configuration saved successfully!</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-[#E8E0D5]">
          <div className="flex items-center gap-1 text-[11px] text-[#5B8266] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Data Leakage Guard</span>
          </div>

          <div className="flex gap-2">
            <GlassButton variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </GlassButton>
            <GlassButton variant="primary" size="sm" onClick={handleSaveKey}>
              Save Key
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
};
