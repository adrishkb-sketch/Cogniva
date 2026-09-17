import { DEMO_PATIENT, DEMO_BASELINE_COMPARISONS, DEMO_CHANGE_EVENTS, DEMO_CURRENT_METRICS, DEMO_ROUTINE } from '@/lib/demo/demo-patient-anima';
import { SafetyEngine } from './safety';
import { MemoryGroundingService } from './memory-grounding';

export interface CopilotResponse {
  answer: string;
  sourceMetrics: string[];
  suggestedFollowUps: string[];
  disclaimer: string;
}

export class CaregiverCopilotService {
  static async askQuestion(question: string): Promise<CopilotResponse> {
    const q = question.toLowerCase();

    // 1. Check Safety
    const safetyCheck = SafetyEngine.sanitize(question);
    if (!safetyCheck.isSafe) {
      return {
        answer: safetyCheck.sanitizedResponse,
        sourceMetrics: ['Safety Protocol Enforcement'],
        suggestedFollowUps: [
          'How has Anima been doing this week?',
          'Which activities were most comfortable for her?',
          'What change was detected in sequencing?'
        ],
        disclaimer: SafetyEngine.getMedicalDisclaimer()
      };
    }

    // 2. Query Analytics & Baselines
    if (q.includes('doing') || q.includes('week') || q.includes('session') || q.includes('overview') || q.includes('today')) {
      return {
        answer: `Anima completed 28 activities across the past month with high engagement in photo recognition (84/100) and garden tasks. Her episodic memory recall remains stable (71/100). The primary area we observed is a 20.5% increase in response latency during multi-step sequencing tasks over the last 6 sessions. Her mood and participation remain highest during morning tea and Bihu sound sessions.`,
        sourceMetrics: [
          `Recognition: ${DEMO_CURRENT_METRICS.recognition}/100 (Stable)`,
          `Sequencing: ${DEMO_CURRENT_METRICS.sequencing}/100 (-20.5% vs Baseline)`,
          `Episodic Recall: ${DEMO_CURRENT_METRICS.memoryRecall}/100 (Stable)`
        ],
        suggestedFollowUps: [
          'What caused the sequencing change in Life Sim?',
          'How does her morning routine adherence look?',
          'What are her favorite memory triggers?'
        ],
        disclaimer: SafetyEngine.getMedicalDisclaimer()
      };
    }

    if (q.includes('sequencing') || q.includes('difficult') || q.includes('struggle') || q.includes('hard') || q.includes('change')) {
      const change = DEMO_CHANGE_EVENTS[0];
      return {
        answer: `${change.headline}. Specifically: ${change.plainLanguageDescription} Cogniva has automatically adjusted her Life Sim activities to 2-step sequences with supportive visual cues.`,
        sourceMetrics: [
          `Baseline: ${change.baselineScore}%`,
          `Recent 6 sessions: ${change.recentScore}%`,
          `Observed delta: -16 points`
        ],
        suggestedFollowUps: [
          'Show recommendations for family members',
          'How does Anima react to Family Voice reminders?',
          'Export longitudinal activity report'
        ],
        disclaimer: SafetyEngine.getMedicalDisclaimer()
      };
    }

    if (q.includes('routine') || q.includes('medication') || q.includes('adherence') || q.includes('tea')) {
      const completed = DEMO_ROUTINE.filter(r => r.isCompletedToday).length;
      return {
        answer: `Today, Anima completed ${completed} of ${DEMO_ROUTINE.length} scheduled routine items. She completed morning ginger tea and blood pressure tablet with the assistance of Ananya's recorded voice note. Evening terrace walk is scheduled for 5:30 PM.`,
        sourceMetrics: [
          `Today's completion: ${Math.round((completed / DEMO_ROUTINE.length) * 100)}%`,
          `Family voice reminders enabled: 3 items`
        ],
        suggestedFollowUps: [
          'Record a new family voice reminder',
          'Update afternoon schedule',
          'Check hydration alerts'
        ],
        disclaimer: SafetyEngine.getMedicalDisclaimer()
      };
    }

    if (q.includes('memory') || q.includes('daughter') || q.includes('grandson') || q.includes('ananya') || q.includes('niloy')) {
      const grounded = MemoryGroundingService.queryVerifiedMemory(question);
      return {
        answer: grounded.verifiedAnswer,
        sourceMetrics: [`Verified Grounding Source: ${grounded.sourceType}`, `Verified by: ${grounded.verifiedBy}`],
        suggestedFollowUps: [
          'Add a new family photo or story',
          'Review Anima’s Memory Scrapbook',
          'Play sounds of Jorhat childhood'
        ],
        disclaimer: SafetyEngine.getMedicalDisclaimer()
      };
    }

    // Default informative response
    return {
      answer: `Cogniva is actively tracking Anima's functional engagement across 6 cognitive dimensions. Her recent interactions show solid familiarity with family memories and daily objects, with gentle pacing adaptations applied to multi-step tasks.`,
      sourceMetrics: ['Active baseline established (14 sessions)', 'Continuous adaptive pacing active'],
      suggestedFollowUps: [
        'How was today’s session?',
        'What has changed this week?',
        'Which activities does she engage with most?'
      ],
      disclaimer: SafetyEngine.getMedicalDisclaimer()
    };
  }
}
