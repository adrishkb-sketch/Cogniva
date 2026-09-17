'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { BookOpen, ArrowLeft, ArrowRight, Volume2, Sparkles, Heart } from 'lucide-react';
import { VoiceService } from '@/lib/voice/voice-service';

export default function LifeStorybookPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const chapters = [
    {
      title: 'Chapter 1: Childhood in Tarajan, Jorhat',
      season: '1954 – 1968',
      icon: '🏡',
      photoCaption: 'The green Assam-type home surrounded by betel nut palms',
      narrative: 'Anima grew up in the misty river district of Jorhat. Early mornings were filled with the chime of Kamakhya bells on All India Radio and the sweet aroma of blooming night jasmine (Sewali) outside her bedroom window. She learned handloom weaving by her mother’s side in the breezy back corridor.',
      audioQuote: 'Rainfall softly tapping on the green tin rooftop as tea was brewed.'
    },
    {
      title: 'Chapter 2: Marriage & Life with Pranab',
      season: '1974 – 2020',
      icon: '👴',
      photoCaption: 'Pranab and Anima at the Jorhat Gymkhana Club gardens',
      narrative: 'Anima married Pranab Das, a passionate high school literature teacher. For 46 loving years, they shared morning tea on the veranda, discussed poetry, and tended to their orchid garden. Every Bihu, Anima gifted Pranab a handwoven red floral Gamosa.',
      audioQuote: 'Good morning Anima, the tea is especially fragrant today.'
    },
    {
      title: 'Chapter 3: Daughter Ananya & Grandson Niloy',
      season: '1982 – Present',
      icon: '👩‍⚕️',
      photoCaption: 'Ananya holding Niloy in the courtyard lawn',
      narrative: 'Their daughter Ananya was born in Dibrugarh and grew up to become a dedicated physician. Now, 11-year-old grandson Niloy visits every weekend, playing the flute and helping his Aita water the purple Kopou orchids.',
      audioQuote: 'Aita, look! The orchid we watered together has a new blossom.'
    },
    {
      title: 'Chapter 4: The Spring Bihu Celebrations',
      season: 'Every April',
      icon: '🌸',
      photoCaption: 'Courtyard gathering with narikol laru and muga silk mekhala sador',
      narrative: 'Rongali Bihu was always the brightest time of the year. The courtyard echoed with the buffalo horn pepa rhythm and dhol drums. Friends from across Dibrugarh gathered to taste Anima’s famous til pitha and freshly prepared sweets.',
      audioQuote: 'Buffalo horn pepa echoing joyful spring melodies across the valley.'
    }
  ];

  const chapter = chapters[currentPage];

  const handleRead = () => {
    VoiceService.speak(`${chapter.title}. ${chapter.narrative}`, 'en-IN');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8E778E]">
            <span>Personal Digital Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
            Anima’s Life Storybook
          </h1>
          <p className="text-sm text-[#59655D]">
            A living scrapbook of your life’s greatest moments, stories, and love.
          </p>
        </div>

        <button
          onClick={handleRead}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#F3EEF3] text-[#5D4A5D] font-bold text-sm hover:bg-[#E9DFE9] cursor-pointer"
        >
          <Volume2 className="w-5 h-5" />
          <span>Read Story Aloud</span>
        </button>
      </div>

      {/* Book Page Card */}
      <GlassCard variant="patient" className="p-8 sm:p-12 space-y-6 min-h-[420px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
              {chapter.season}
            </span>
            <span className="text-xs text-[#849188]">
              Page {currentPage + 1} of {chapters.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-5xl">{chapter.icon}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2C332D]">
              {chapter.title}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-[#2C332D] leading-relaxed font-normal bg-[#FAF7F2] p-6 rounded-2xl border border-[#E0D8CC]">
            {chapter.narrative}
          </p>

          <div className="p-4 rounded-2xl bg-[#FEF6E7] border border-[#F8D5C2] text-xs sm:text-sm text-[#B85D43] italic flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-[#E78C56]" />
            <span>"{chapter.audioQuote}"</span>
          </div>
        </div>

        {/* Page Flipping Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E8E0D5]">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#E0D8CC] text-sm font-bold text-[#59655D] disabled:opacity-30 cursor-pointer flex items-center gap-2 hover:bg-[#FAF7F2]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <button
            onClick={() => setCurrentPage(prev => Math.min(chapters.length - 1, prev + 1))}
            disabled={currentPage === chapters.length - 1}
            className="px-5 py-2.5 rounded-2xl bg-[#5B8266] text-white text-sm font-bold disabled:opacity-30 cursor-pointer flex items-center gap-2 hover:bg-[#4D7056]"
          >
            <span>Next Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
