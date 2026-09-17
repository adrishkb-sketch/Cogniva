export interface LifeSimItem {
  id: string;
  name: string;
  category: 'utensil' | 'ingredient' | 'clothing' | 'document' | 'accessory' | 'tool';
  iconName: string;
  description: string;
  culturalNote?: string;
}

export interface LifeSimStep {
  stepIndex: number;
  instruction: string;
  subPrompt?: string;
  correctItemId: string;
  distractorItemIds: string[];
  encouragementText: string;
  hint: string;
}

export interface LifeSimScenario {
  id: string;
  title: string;
  subtitle: string;
  category: 'kitchen_routine' | 'morning_prep' | 'doctor_visit' | 'grocery_market' | 'temple_visit' | 'garden_tending';
  culturalPack: string;
  estimatedMinutes: number;
  difficultyLevel: 1 | 2 | 3 | 4;
  scenarioTheme: string;
  environmentDescription: string;
  steps: LifeSimStep[];
}
