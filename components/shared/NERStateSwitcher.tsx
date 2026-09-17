'use client';

import React from 'react';
import { useNERState } from './NERStateContext';
import { Globe, Sparkles } from 'lucide-react';

export const NERStateSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { activeStateId, setActiveStateId, availableStates, activePack } = useNERState();

  return (
    <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 text-xs">
      <Globe className="w-3.5 h-3.5 text-[#E9C46A]" />
      <span className="text-white/70 text-[11px] hidden sm:inline">NER State:</span>
      <select
        value={activeStateId}
        onChange={(e) => setActiveStateId(e.target.value)}
        className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer pr-1"
      >
        {availableStates.map((st) => (
          <option key={st.id} value={st.id} className="bg-[#2C332D] text-white">
            {st.name} ({st.nativeName})
          </option>
        ))}
      </select>
    </div>
  );
};
