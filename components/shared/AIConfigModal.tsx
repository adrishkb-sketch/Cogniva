'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { Key, ShieldCheck, CheckCircle2, Sparkles, AlertCircle, Eye, EyeOff, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { getStoredGeminiKey, setStoredGeminiKey, removeStoredGeminiKey } from '@/lib/ai/ai-key';

interface AIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIConfigModal: React.FC<AIConfigModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredGeminiKey());
      setSavedSuccess(false);
      setTestStatus('idle');
      setTestMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    setStoredGeminiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClearKey = () => {
    removeStoredGeminiKey();
    setApiKey('');
    setTestStatus('idle');
    setTestMessage('');
  };

  const handleTestKey = async () => {
    const keyToTest = apiKey.trim();
    if (!keyToTest) {
      setTestStatus('error');
      setTestMessage('Please paste a valid Gemini API key first.');
      return;
    }

    setTestStatus('testing');
    setTestMessage('Verifying key with Google Gemini API...');

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToTest}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Hello Cogniva' }] }],
            generationConfig: { maxOutputTokens: 10 }
          })
        }
      );

      if (response.ok) {
        setTestStatus('success');
        setTestMessage('✓ Gemini 1.5 Flash API Key verified successfully!');
      } else {
        const errData = await response.json().catch(() => ({}));
        setTestStatus('error');
        setTestMessage(errData?.error?.message || 'Invalid Gemini API key or quota exceeded.');
      }
    } catch {
      setTestStatus('error');
      setTestMessage('Network error while verifying API key.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[var(--card-bg)] text-[var(--text-primary)] rounded-3xl border border-[var(--border-subtle)] shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[var(--accent-orange)]/15 border border-[var(--accent-orange)]/30">
              <Key className="w-5 h-5 text-[var(--accent-orange)]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Google Gemini API Key</h3>
              <p className="text-[11px] text-[var(--text-secondary)]">Client-side direct configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs font-bold text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Paste your <strong>Google Gemini API Key</strong> below to unlock direct live AI Copilot, Vision auto-tagging, and conversational reminiscence. Your key is stored securely in your browser&apos;s local storage and used directly in client requests.
        </p>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[var(--text-primary)]">
                Gemini API Key
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-[var(--accent-cyan)] hover:underline inline-flex items-center gap-1"
              >
                <span>Get free key at Google AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative flex items-center">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestStatus('idle');
                }}
                placeholder="AIzaSy..."
                className="w-full pl-3 pr-20 py-3 rounded-xl bg-white/5 dark:bg-[#121824] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)] shadow-inner"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                  title={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                {apiKey && (
                  <button
                    type="button"
                    onClick={handleClearKey}
                    className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 cursor-pointer transition-colors"
                    title="Clear saved key"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <span className="text-[10px] text-[var(--text-secondary)] mt-1.5 block">
              Leave blank to automatically fallback to the local clinical grounding engine or server-side environment key.
            </span>
          </div>

          {/* Test connection button */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={handleTestKey}
              disabled={testStatus === 'testing' || !apiKey.trim()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[var(--text-secondary)] hover:text-white disabled:opacity-40 cursor-pointer transition-all"
            >
              {testStatus === 'testing' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--accent-cyan)]" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                  <span>Test Key Connection</span>
                </>
              )}
            </button>

            {apiKey ? (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Custom Key Present
              </span>
            ) : (
              <span className="text-[10px] font-bold text-[var(--text-secondary)] bg-white/5 px-2 py-0.5 rounded-full">
                Using Grounded Fallback
              </span>
            )}
          </div>

          {/* Test Status feedback message */}
          {testStatus === 'success' && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{testMessage}</span>
            </div>
          )}

          {testStatus === 'error' && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span className="leading-tight">{testMessage}</span>
            </div>
          )}
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>API Key configuration saved successfully!</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--accent-emerald)] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Stored in Browser Storage</span>
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
