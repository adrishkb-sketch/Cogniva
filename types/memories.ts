export type MemoryCategory = 'people' | 'places' | 'events' | 'objects' | 'audio' | 'childhood' | 'work' | 'festivals';

export interface VerifiedMemoryPerson {
  id: string;
  patientId: string;
  name: string;
  relationship: string; // e.g. Daughter, Grandson, Late Husband
  photoUrl: string;
  voiceNoteUrl?: string;
  voiceTranscript?: string;
  notes: string;
  keyFacts: string[];
  verifiedBy: string; // Caregiver name
  updatedAt: string;
}

export interface VerifiedMemoryPlace {
  id: string;
  patientId: string;
  title: string;
  category: 'childhood_home' | 'hometown' | 'workplace' | 'pilgrimage' | 'favorite_garden';
  locationName: string;
  state: string;
  photoUrl: string;
  description: string;
  sensoryDetails: {
    scents?: string;
    sounds?: string;
    seasons?: string;
  };
  verifiedBy: string;
}

export interface VerifiedMemoryEvent {
  id: string;
  patientId: string;
  title: string;
  approximateYear?: string;
  festivalOrType: string;
  photoUrl: string;
  peopleInvolved: string[];
  storyText: string;
  audioNarrativeUrl?: string;
  verifiedBy: string;
}

export interface VerifiedMemoryObject {
  id: string;
  patientId: string;
  name: string;
  photoUrl: string;
  significance: string;
  associatedPlaceOrPerson: string;
  clues: string[];
}

export interface VerifiedMemoryAudio {
  id: string;
  patientId: string;
  title: string;
  category: 'nature' | 'household' | 'festival' | 'family_voice' | 'music';
  soundType: string;
  description: string;
  durationSeconds: number;
  groundedMemoryPrompt: string;
}
