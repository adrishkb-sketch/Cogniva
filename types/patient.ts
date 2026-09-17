export type LanguageCode = 'as' | 'bn' | 'hi' | 'en' | 'mni' | 'lus' | 'kha';

export interface PatientProfile {
  id: string;
  name: string;
  preferredName: string;
  age: number;
  gender?: string;
  avatarUrl?: string;
  region: string;
  state: string;
  primaryLanguage: LanguageCode;
  secondaryLanguage?: LanguageCode;
  caregiverId: string;
  caregiverName: string;
  caregiverPhone: string;
  trustedAddress: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    photoUrl?: string;
  };
  preferences: {
    musicStyle: string;
    favoriteFoods: string[];
    childhoodCity: string;
    interests: string[];
    sensoryComforts: string[];
  };
  gardenLevel: number;
  totalActivitiesCompleted: number;
  createdAt: string;
  lastActiveAt: string;
}

export interface ActivityRecord {
  id: string;
  patientId: string;
  activityType: 'life_sim' | 'memory_recognition' | 'memory_journey' | 'sound_recall' | 'day_timeline' | 'talk_companion' | 'garden';
  scenarioId?: string;
  title: string;
  category: 'recognition' | 'recall' | 'sequencing' | 'planning' | 'attention' | 'routine';
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  accuracyRate: number; // 0 to 100
  responseLatencyAvgMs: number;
  mistakesCount: number;
  sequenceErrors: number;
  assistanceCount: number;
  retries: number;
  isCompleted: boolean;
  isOfflineGenerated: boolean;
  synced: boolean;
  stepDetails?: Array<{
    stepIndex: number;
    description: string;
    timeTakenMs: number;
    errorCount: number;
    neededHint: boolean;
  }>;
}
