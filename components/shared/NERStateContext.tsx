'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CulturalPack } from '@/types/cultural';
import { ALL_NER_PACKS } from '@/lib/cultural-packs/all-ner';

interface NERStateContextType {
  activeStateId: string;
  activePack: CulturalPack;
  setActiveStateId: (stateId: string) => void;
  availableStates: Array<{ id: string; name: string; nativeName: string }>;
}

const NERStateContext = createContext<NERStateContextType | undefined>(undefined);

export const NERStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeStateId, setActiveStateId] = useState<string>('assam');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cogniva_ner_state');
      if (saved && ALL_NER_PACKS[saved]) {
        setActiveStateId(saved);
      }
    }
  }, []);

  const handleSetState = (stateId: string) => {
    if (ALL_NER_PACKS[stateId]) {
      setActiveStateId(stateId);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cogniva_ner_state', stateId);
        window.dispatchEvent(new CustomEvent('cogniva-ner-state-changed', { detail: { stateId } }));
      }
    }
  };

  const activePack = ALL_NER_PACKS[activeStateId] || ALL_NER_PACKS.assam;

  const availableStates = Object.values(ALL_NER_PACKS).map(pack => ({
    id: pack.id,
    name: pack.state,
    nativeName: pack.nativeName
  }));

  return (
    <NERStateContext.Provider
      value={{
        activeStateId,
        activePack,
        setActiveStateId: handleSetState,
        availableStates
      }}
    >
      {children}
    </NERStateContext.Provider>
  );
};

export const useNERState = () => {
  const context = useContext(NERStateContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      activeStateId: 'assam',
      activePack: ALL_NER_PACKS.assam,
      setActiveStateId: () => {},
      availableStates: Object.values(ALL_NER_PACKS).map(pack => ({
        id: pack.id,
        name: pack.state,
        nativeName: pack.nativeName
      }))
    };
  }
  return context;
};
