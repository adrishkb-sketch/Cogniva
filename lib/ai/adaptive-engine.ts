import { ActivityRecord } from '@/types/patient';
import { DEMO_PATIENT, DEMO_CURRENT_METRICS } from '@/lib/demo/demo-patient-anima';

export interface NextActivityRecommendation {
  recommendedType: 'life_sim' | 'memory_recognition' | 'memory_journey' | 'sound_recall' | 'garden';
  difficultyLevel: 1 | 2 | 3;
  suggestedStepsCount: number;
  reason: string;
  supportiveCue: string;
}

export class AdaptiveCognitiveEngine {
  static evaluatePerformance(recentActivities: ActivityRecord[]): NextActivityRecommendation {
    if (recentActivities.length === 0) {
      return {
        recommendedType: 'life_sim',
        difficultyLevel: 1,
        suggestedStepsCount: 3,
        reason: 'Initial gentle baseline orientation session.',
        supportiveCue: 'Take all the time you need. Every step is a peaceful moment.'
      };
    }

    const latest = recentActivities[0];
    const highAssistance = latest.assistanceCount >= 2;
    const slowResponse = latest.responseLatencyAvgMs > 8000;
    const hasSequenceErrors = latest.sequenceErrors > 0;

    if (hasSequenceErrors || highAssistance || slowResponse) {
      return {
        recommendedType: 'memory_recognition',
        difficultyLevel: 1,
        suggestedStepsCount: 2,
        reason: 'Adjusting to gentle 2-step recognition to reduce cognitive fatigue and maintain comfort.',
        supportiveCue: 'Let’s enjoy familiar family memories together at a relaxed pace.'
      };
    }

    return {
      recommendedType: 'life_sim',
      difficultyLevel: 2,
      suggestedStepsCount: 4,
      reason: 'Confidence and response rhythm are stable. Continuing functional life simulation.',
      supportiveCue: 'Wonderful work! Let’s explore your morning routine.'
    };
  }

  static getSupportiveFeedback(mistakes: number): string {
    if (mistakes === 0) return 'Wonderful! That felt very natural and smooth.';
    if (mistakes === 1) return 'You are doing great. Let’s try the next step together.';
    return 'Take your time, there is no hurry at all. We are here together.';
  }
}
