export interface CulturalPack {
  id: string;
  name: string;
  nativeName: string;
  region: string;
  state: string;
  languages: Array<{
    code: string;
    label: string;
    isNativeVoiceSupported: boolean;
  }>;
  foods: string[];
  festivals: Array<{
    name: string;
    description: string;
    season: string;
    icon: string;
  }>;
  householdObjects: Array<{
    name: string;
    nativeName: string;
    significance: string;
    category: string;
  }>;
  familiarSounds: Array<{
    name: string;
    description: string;
    environment: string;
  }>;
  expressions: Array<{
    phrase: string;
    meaning: string;
    context: string;
  }>;
}
