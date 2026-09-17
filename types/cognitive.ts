export interface CognitiveMetricScores {
  memoryRecall: number;    // 0-100
  attention: number;       // 0-100
  recognition: number;     // 0-100
  sequencing: number;      // 0-100
  planning: number;        // 0-100
  routineRecall: number;   // 0-100
  processingSpeed: number; // 0-100
  languageEngagement: number; // 0-100
}

export interface CognitiveBaselineComparison {
  metricKey: keyof CognitiveMetricScores;
  label: string;
  baselineValue: number;
  recentValue: number;
  deltaPercent: number;
  confidenceScore: number;
  observationSummary: string;
  trend: 'stable' | 'needs_attention' | 'slight_decline' | 'steady_growth';
  suggestedPacing: string;
}

export interface CognitiveChangeEvent {
  id: string;
  patientId: string;
  detectedDate: string;
  category: string;
  headline: string;
  plainLanguageDescription: string;
  baselineScore: number;
  recentScore: number;
  sessionsAnalyzedCount: number;
  clinicalNote: string;
  status: 'active' | 'discussed_with_family' | 'reviewed_by_clinician';
}
