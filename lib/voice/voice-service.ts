'use client';

export class VoiceService {
  private static synth: SpeechSynthesis | null = null;
  private static recognition: any = null;
  private static isSpeaking: boolean = false;

  private static getSynth(): SpeechSynthesis | null {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis;
    }
    return null;
  }

  static isVoiceSupported(): boolean {
    return typeof window !== 'undefined' && ('speechSynthesis' in window || 'webkitSpeechRecognition' in window);
  }

  static async speak(text: string, lang: string = 'en-US', onEnd?: () => void): Promise<void> {
    const synth = this.getSynth();
    if (!synth) {
      if (onEnd) setTimeout(onEnd, 1000);
      return;
    }

    // Cancel prior speech
    synth.cancel();

    let textToSpeak = text;
    let targetLangCode = lang;

    // Translate if another language is selected globally
    try {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
      };

      const googtrans = getCookie('googtrans');
      if (googtrans) {
        const selectedLang = googtrans.split('/')[2];
        if (selectedLang && selectedLang !== 'en') {
          const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, sourceLanguage: 'en', targetLanguage: selectedLang }),
          });
          if (response.ok) {
            const data = await response.json();
            if (data.translatedText) {
              textToSpeak = data.translatedText;
              // Map google translate lang code (e.g., 'hi') to TTS voice code (e.g., 'hi-IN')
              targetLangCode = `${selectedLang}-IN`; 
            }
          }
        }
      }
    } catch (e) {
      console.error("Translation for voice failed:", e);
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.88; // Calm, deliberate, elderly-friendly pace
    utterance.pitch = 1.0;
    utterance.lang = targetLangCode;

    // Pick warm voice if available
    const voices = synth.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]) && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Karen')));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      window.dispatchEvent(new CustomEvent('cogniva-voice-state', { detail: { speaking: true } }));
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      window.dispatchEvent(new CustomEvent('cogniva-voice-state', { detail: { speaking: false } }));
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      window.dispatchEvent(new CustomEvent('cogniva-voice-state', { detail: { speaking: false } }));
      if (onEnd) onEnd();
    };

    synth.speak(utterance);
  }

  static stop(): void {
    const synth = this.getSynth();
    if (synth) {
      synth.cancel();
    }
    this.isSpeaking = false;
    window.dispatchEvent(new CustomEvent('cogniva-voice-state', { detail: { speaking: false } }));
  }

  static startListening(onResult: (transcript: string) => void, onError?: (err: any) => void): () => void {
    if (typeof window === 'undefined') return () => {};

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (onError) onError('Speech recognition not supported in this browser.');
      return () => {};
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // Accessible Indian English or regional fallback

      recognition.onstart = () => {
        window.dispatchEvent(new CustomEvent('cogniva-listening-state', { detail: { listening: true } }));
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        window.dispatchEvent(new CustomEvent('cogniva-listening-state', { detail: { listening: false } }));
      };

      recognition.onerror = (event: any) => {
        window.dispatchEvent(new CustomEvent('cogniva-listening-state', { detail: { listening: false } }));
        if (onError) onError(event);
      };

      recognition.onend = () => {
        window.dispatchEvent(new CustomEvent('cogniva-listening-state', { detail: { listening: false } }));
      };

      recognition.start();

      return () => {
        recognition.stop();
        window.dispatchEvent(new CustomEvent('cogniva-listening-state', { detail: { listening: false } }));
      };
    } catch (e) {
      if (onError) onError(e);
      return () => {};
    }
  }
}
