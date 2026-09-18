'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, Volume2, ArrowRightLeft, Copy, Trash2, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

// Supported languages
const LANGUAGES = [
  { code: 'en', name: 'English', voiceCode: 'en-US' },
  { code: 'hi', name: 'Hindi', voiceCode: 'hi-IN' },
  { code: 'bn', name: 'Bengali', voiceCode: 'bn-IN' },
  { code: 'ta', name: 'Tamil', voiceCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', voiceCode: 'te-IN' },
  { code: 'mr', name: 'Marathi', voiceCode: 'mr-IN' },
  { code: 'gu', name: 'Gujarati', voiceCode: 'gu-IN' },
  { code: 'kn', name: 'Kannada', voiceCode: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', voiceCode: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', voiceCode: 'pa-IN' },
  { code: 'ur', name: 'Urdu', voiceCode: 'ur-IN' },
  // Note: Assamese (as) and Odia (or) might not be fully supported by all TTS engines natively, but API supports text translation
  { code: 'as', name: 'Assamese', voiceCode: 'en-US' }, 
  { code: 'or', name: 'Odia', voiceCode: 'en-US' },
];

export default function TranslatorPage() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Web Speech API instances
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize SpeechRecognition if available
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSourceText((prev) => (prev ? prev + ' ' + transcript : transcript));
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          setErrorMsg("Could not hear properly. Please try again.");
          setTimeout(() => setErrorMsg(''), 3000);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    setErrorMsg('');
    
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to translate. Please check your connection.");
      setTimeout(() => setErrorMsg(''), 3000);
    } finally {
      setIsTranslating(false);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleListen = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        const langCode = LANGUAGES.find(l => l.code === sourceLang)?.voiceCode || 'en-US';
        recognitionRef.current.lang = langCode;
        recognitionRef.current.start();
        setIsListening(true);
        setErrorMsg('');
      }
    } else {
      setErrorMsg("Your browser does not support voice input.");
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  const handleSpeak = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      const voiceLang = LANGUAGES.find(l => l.code === langCode)?.voiceCode || 'en-US';
      utterance.lang = voiceLang;
      window.speechSynthesis.speak(utterance);
    } else {
      setErrorMsg("Your browser does not support text-to-speech.");
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#FDF1EA] p-4 sm:p-6 md:p-8 font-sans text-[#5D4A5D]">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between bg-white/80 p-4 rounded-2xl shadow-sm border border-[#F8D5C2]">
          <div className="flex items-center gap-4">
            <Link href="/patient" className="p-3 bg-[#FEF6E7] hover:bg-[#FDEFCB] rounded-full text-[#B85D43] transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#B85D43]">Language Translator</h1>
          </div>
          <div className="text-4xl hidden sm:block">🌐</div>
        </div>

        {errorMsg && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-2xl text-center font-medium">
            {errorMsg}
          </div>
        )}

        {/* Translator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Source Section */}
          <GlassCard className="p-6 bg-white border-[#F8D5C2] shadow-md flex flex-col h-full rounded-3xl">
            <div className="flex items-center justify-between mb-4">
              <select 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="bg-[#FEF6E7] border border-[#F8D5C2] text-[#B85D43] text-lg font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B85D43] cursor-pointer"
              >
                {LANGUAGES.map(l => (
                  <option key={`src-${l.code}`} value={l.code}>{l.name}</option>
                ))}
              </select>
              
              <button 
                onClick={handleClear}
                className="p-3 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                title="Clear Text"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
            
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Type or paste text here..."
              className="w-full flex-grow min-h-[150px] p-4 text-xl sm:text-2xl rounded-2xl bg-[#FDF1EA]/50 border-none resize-none focus:outline-none focus:ring-2 focus:ring-[#F8D5C2]"
            />
            
            <div className="flex items-center justify-between mt-4">
              <button 
                onClick={handleListen}
                className={`flex items-center justify-center p-4 rounded-2xl gap-2 font-bold text-lg transition-all flex-1 mr-2 ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-[#FEF6E7] text-[#B85D43] hover:bg-[#FDEFCB]'}`}
              >
                <Mic className="w-7 h-7" />
                {isListening ? 'Listening...' : 'Speak'}
              </button>
              
              <button 
                onClick={() => handleSpeak(sourceText, sourceLang)}
                disabled={!sourceText}
                className="p-4 bg-[#EBF2EC] hover:bg-[#DEEBE0] text-[#3F5E47] rounded-2xl transition-colors disabled:opacity-50"
                title="Listen to text"
              >
                <Volume2 className="w-7 h-7" />
              </button>
            </div>
          </GlassCard>

          {/* Swap Button for Mobile (Hidden on Desktop) */}
          <div className="flex justify-center md:hidden -my-2 relative z-10">
            <button 
              onClick={swapLanguages}
              className="p-4 bg-[#B85D43] text-white rounded-full shadow-lg hover:bg-[#a0503a] transition-transform active:scale-95"
            >
              <ArrowRightLeft className="w-6 h-6 rotate-90" />
            </button>
          </div>

          {/* Target Section */}
          <GlassCard className="p-6 bg-[#FEF6E7] border-[#F8D5C2] shadow-md flex flex-col h-full rounded-3xl relative">
            
            {/* Swap Button for Desktop */}
            <div className="absolute top-1/2 -left-8 -mt-6 hidden md:flex justify-center items-center z-10">
              <button 
                onClick={swapLanguages}
                className="p-3 bg-[#B85D43] text-white rounded-full shadow-lg hover:bg-[#a0503a] transition-transform hover:scale-110"
              >
                <ArrowRightLeft className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center justify-between mb-4 pl-0 md:pl-6">
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-white border border-[#F8D5C2] text-[#D9A036] text-lg font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D9A036] cursor-pointer"
              >
                {LANGUAGES.map(l => (
                  <option key={`tgt-${l.code}`} value={l.code}>{l.name}</option>
                ))}
              </select>
            </div>
            
            <textarea
              value={translatedText}
              readOnly
              placeholder="Translation will appear here..."
              className="w-full flex-grow min-h-[150px] p-4 text-xl sm:text-2xl rounded-2xl bg-white/60 border-none resize-none focus:outline-none text-[#5D4A5D]"
            />
            
            <div className="flex items-center justify-between mt-4">
              <button 
                onClick={handleCopy}
                disabled={!translatedText}
                className="flex items-center justify-center p-4 rounded-2xl gap-2 font-bold text-lg bg-white text-[#5D4A5D] hover:bg-gray-50 transition-colors flex-1 mr-2 disabled:opacity-50"
              >
                {copied ? <CheckCircle2 className="w-7 h-7 text-green-500" /> : <Copy className="w-7 h-7" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              
              <button 
                onClick={() => handleSpeak(translatedText, targetLang)}
                disabled={!translatedText}
                className="p-4 bg-[#EBF2EC] hover:bg-[#DEEBE0] text-[#3F5E47] rounded-2xl transition-colors disabled:opacity-50"
                title="Listen to translation"
              >
                <Volume2 className="w-7 h-7" />
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Big Translate Button */}
        <div className="pt-4">
          <button
            onClick={handleTranslate}
            disabled={!sourceText || isTranslating}
            className="w-full py-5 px-8 rounded-3xl bg-[#B85D43] text-white text-2xl font-bold shadow-lg hover:bg-[#a0503a] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isTranslating ? (
              <span className="animate-pulse">Translating...</span>
            ) : (
              <>
                Translate Now
                <ArrowRightLeft className="w-7 h-7 ml-2" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
