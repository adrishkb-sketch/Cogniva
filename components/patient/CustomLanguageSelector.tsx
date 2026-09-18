'use client';

import React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import Script from 'next/script';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ur', name: 'Urdu' },
  { code: 'as', name: 'Assamese' },
  { code: 'or', name: 'Odia' },
];

export const CustomLanguageSelector = () => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Read the current language from the googtrans cookie
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const googtrans = getCookie('googtrans');
    if (googtrans) {
      // googtrans cookie format is typically '/en/hi'
      const lang = googtrans.split('/')[2];
      if (lang) {
        setCurrentLang(lang);
      }
    }
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setCurrentLang(selectedLang);
    
    // Set the Google Translate cookie
    // If English (default), we can clear the cookie to revert to original
    if (selectedLang === 'en') {
      document.cookie = 'googtrans=/en/en; path=/; domain=' + window.location.hostname;
      document.cookie = 'googtrans=/en/en; path=/;';
    } else {
      document.cookie = `googtrans=/en/${selectedLang}; path=/; domain=` + window.location.hostname;
      document.cookie = `googtrans=/en/${selectedLang}; path=/;`;
    }

    // Reload to let the injected Google script apply the translation
    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E0D8CC] text-[#2C332D] shadow-sm">
        <Globe className="w-4 h-4 text-[#5B8266]" />
        <select
          value={currentLang}
          onChange={handleLanguageChange}
          className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer appearance-none pr-2"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Hidden Google Translate Element setup */}
      <div id="google_translate_element" className="hidden"></div>
      
      {/* We still need the Google Translate script to do the actual DOM manipulation based on the cookie on load */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
      <Script id="google-translate-init" strategy="lazyOnload">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,bn,ta,te,mr,gu,kn,ml,pa,ur,as,or',
                autoDisplay: false
              },
              'google_translate_element'
            );
          }
        `}
      </Script>

      <style jsx global>{`
        /* Hide all Google Translate UI elements that might pop up */
        .goog-te-banner-frame { display: none !important; }
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
        body { top: 0 !important; }
      `}</style>
    </>
  );
};
