'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Sprout, Sun, Droplets, Sparkles, Heart } from 'lucide-react';
import { DEMO_PATIENT } from '@/lib/demo/demo-patient-anima';

export default function PatientGardenPage() {
  const plants = [
    {
      name: 'Kopou Orchid (Fox-Tail)',
      stage: 'Blooming in full lilac flower',
      symbol: '🌸',
      meaning: 'Grown from your Rongali Bihu memory sessions.',
      status: 'Fully Blooming'
    },
    {
      name: 'Veranda Jasmine (Sewali)',
      stage: 'Sprouting delicate white petals',
      symbol: '🌼',
      meaning: 'Nourished by your morning ginger tea routine.',
      status: 'Budding'
    },
    {
      name: 'Brahmaputra Betel Nut Palm',
      stage: 'Tall and emerald green',
      symbol: '🌴',
      meaning: 'Represents 28 peaceful daily activities completed.',
      status: 'Flourishing'
    },
    {
      name: 'Terrace Marigold (Gendha)',
      stage: 'Bright golden blossoms',
      symbol: '🏵️',
      meaning: 'Grown with love from Niloy’s evening garden walks.',
      status: 'Healthy'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#E0D8CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8266]">
            <span>Peaceful Garden • Level {DEMO_PATIENT.gardenLevel}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2C332D] mt-1">
            Anima’s Terrace Garden
          </h1>
          <p className="text-sm text-[#59655D]">
            Every peaceful activity you complete brings gentle warmth and flowers to your garden.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#EBF2EC] px-4 py-2 rounded-2xl border border-[#C5DBCB]">
          <Sun className="w-6 h-6 text-[#D9A036]" />
          <span className="text-sm font-bold text-[#3F5E47]">Warm Sunlight Active</span>
        </div>
      </div>

      {/* Big Garden Scene Display */}
      <GlassCard variant="patient" className="p-8 sm:p-12 text-center relative overflow-hidden bg-gradient-to-b from-[#EBF2EC]/60 to-white/90">
        <div className="flex justify-center items-end gap-6 sm:gap-12 py-8">
          <div className="flex flex-col items-center space-y-2 animate-gentle-float">
            <span className="text-6xl sm:text-7xl">🌸</span>
            <span className="text-xs font-bold text-[#2C332D]">Kopou Orchid</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-7xl sm:text-8xl">🌴</span>
            <span className="text-xs font-bold text-[#2C332D]">Betel Palm</span>
          </div>
          <div className="flex flex-col items-center space-y-2 animate-gentle-float" style={{ animationDelay: '1s' }}>
            <span className="text-6xl sm:text-7xl">🌼</span>
            <span className="text-xs font-bold text-[#2C332D]">Sewali Jasmine</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-6xl sm:text-7xl">🏵️</span>
            <span className="text-xs font-bold text-[#2C332D]">Marigold</span>
          </div>
        </div>

        <p className="text-base font-medium text-[#59655D] mt-4">
          “The garden doesn't rush, yet everything blossoms in its own time.”
        </p>
      </GlassCard>

      {/* Plants Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {plants.map((plant, idx) => (
          <GlassCard key={idx} className="p-5 flex items-start gap-4">
            <span className="text-4xl">{plant.symbol}</span>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-[#2C332D]">{plant.name}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF2EC] text-[#3F5E47]">
                  {plant.status}
                </span>
              </div>
              <p className="text-xs font-medium text-[#E78C56]">{plant.stage}</p>
              <p className="text-xs text-[#59655D] leading-relaxed">{plant.meaning}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
