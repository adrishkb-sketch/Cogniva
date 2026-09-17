import { PatientProfile, ActivityRecord } from '@/types/patient';
import { VerifiedMemoryPerson, VerifiedMemoryPlace, VerifiedMemoryEvent, VerifiedMemoryObject, VerifiedMemoryAudio } from '@/types/memories';
import { DailyRoutineItem, CaregiverAlert } from '@/types/caregiver';
import { CognitiveBaselineComparison, CognitiveChangeEvent, CognitiveMetricScores } from '@/types/cognitive';
import { LifeSimScenario } from '@/types/life-sim';

export const DEMO_PATIENT: PatientProfile = {
  id: 'patient-anima-das',
  name: 'Anima Das',
  preferredName: 'Anima',
  age: 72,
  gender: 'Female',
  region: 'Brahmaputra Valley',
  state: 'Assam',
  primaryLanguage: 'as',
  secondaryLanguage: 'en',
  caregiverId: 'caregiver-ananya-das',
  caregiverName: 'Ananya Das (Daughter)',
  caregiverPhone: '+91 98640 12345',
  trustedAddress: 'House No. 14, Chiring Chapori, Dibrugarh, Assam 786001',
  emergencyContact: {
    name: 'Ananya Das',
    relationship: 'Daughter',
    phone: '+91 98640 12345'
  },
  preferences: {
    musicStyle: 'Borgeet & Bhupen Hazarika melodies',
    favoriteFoods: ['Masor Tenga', 'Pitha with fresh milk', 'Khar with hot rice'],
    childhoodCity: 'Jorhat, Assam',
    interests: ['Terrace gardening', 'Weaving handloom gamosa', 'Reading regional poetry'],
    sensoryComforts: ['Warm ginger tea', 'Monsoon rain on tin roof', 'Jasmine incense']
  },
  gardenLevel: 4,
  totalActivitiesCompleted: 28,
  createdAt: '2026-08-01T08:00:00Z',
  lastActiveAt: '2026-09-17T09:30:00Z'
};

export const DEMO_PEOPLE: VerifiedMemoryPerson[] = [
  {
    id: 'person-ananya',
    patientId: 'patient-anima-das',
    name: 'Ananya Das',
    relationship: 'Daughter',
    photoUrl: '👩‍⚕️',
    voiceTranscript: 'Good morning Ma! Remember to drink your warm water with lemon.',
    notes: 'Ananya visits every evening after her hospital shift. Lives 10 minutes away.',
    keyFacts: ['Works as a physician', 'Loves Ma’s fish curry', 'Calls every morning at 8:30 AM'],
    verifiedBy: 'Ananya Das (Daughter)',
    updatedAt: '2026-09-15'
  },
  {
    id: 'person-niloy',
    patientId: 'patient-anima-das',
    name: 'Niloy',
    relationship: 'Grandson',
    photoUrl: '👦',
    voiceTranscript: 'Aita, I scored high in my mathematics quiz today!',
    notes: 'Niloy is 11 years old. He visits during weekends and waters the orchids with Anima.',
    keyFacts: ['Calls Anima "Aita"', 'Loves listening to stories about the Brahmaputra ferry', 'Plays the flute'],
    verifiedBy: 'Ananya Das (Daughter)',
    updatedAt: '2026-09-12'
  },
  {
    id: 'person-bhupen',
    patientId: 'patient-anima-das',
    name: 'Pranab Das',
    relationship: 'Late Husband',
    photoUrl: '👴',
    voiceTranscript: '',
    notes: 'Pranab was a high school teacher in Jorhat. They were married for 46 years.',
    keyFacts: ['Taught literature', 'Loved evening walks in Jorhat Gymkhana club', 'Shared morning tea on the veranda'],
    verifiedBy: 'Ananya Das (Daughter)',
    updatedAt: '2026-09-10'
  }
];

export const DEMO_PLACES: VerifiedMemoryPlace[] = [
  {
    id: 'place-jorhat-home',
    patientId: 'patient-anima-das',
    title: 'Jorhat Ancestral House',
    category: 'childhood_home',
    locationName: 'Tarajan, Jorhat',
    state: 'Assam',
    photoUrl: '🏡',
    description: 'The green wooden Assam-type home with a spacious courtyard filled with coconut and betel nut trees.',
    sensoryDetails: {
      scents: 'Fresh earth after monsoon shower, blooming night jasmine (Sewali)',
      sounds: 'Tin roof rain resonance, chirping sparrows at dawn',
      seasons: 'Autumn during Sewali bloom'
    },
    verifiedBy: 'Ananya Das'
  },
  {
    id: 'place-kaziranga-trip',
    patientId: 'patient-anima-das',
    title: 'Kaziranga Forest Rest House',
    category: 'favorite_garden',
    locationName: 'Kohora Range, Kaziranga',
    state: 'Assam',
    photoUrl: '🌳',
    description: 'Family vacation in 1994 where Anima and Pranab watched one-horned rhinos near the wetlands.',
    sensoryDetails: {
      scents: 'Elephant grass, morning river mist',
      sounds: 'Hornbill calls, rustling reeds'
    },
    verifiedBy: 'Ananya Das'
  }
];

export const DEMO_OBJECTS: VerifiedMemoryObject[] = [
  {
    id: 'obj-gamosa',
    patientId: 'patient-anima-das',
    name: 'Red-Embroidered Gamosa',
    photoUrl: '🧣',
    significance: 'Handwoven by Anima on her traditional wooden loom for Pranab during their first Rongali Bihu.',
    associatedPlaceOrPerson: 'Jorhat Home / Late Husband Pranab',
    clues: ['Handwoven cotton', 'Intricate red floral border', 'Given during Bihu']
  },
  {
    id: 'obj-brass-cup',
    patientId: 'patient-anima-das',
    name: 'Bell-Metal Tea Cup (Kahi-Bati)',
    photoUrl: '☕',
    significance: 'Crafted in Sarthebari, used every single morning for warm ginger-infused Assam red tea.',
    associatedPlaceOrPerson: 'Morning Tea Routine',
    clues: ['Golden bell metal', 'Keeps tea warm for long', 'Made in Sarthebari']
  },
  {
    id: 'obj-radio',
    patientId: 'patient-anima-das',
    name: 'Vintage Murphy Radio',
    photoUrl: '📻',
    significance: 'Tuned every morning at 7:00 AM to All India Radio Guwahati for news and Borgeet songs.',
    associatedPlaceOrPerson: 'Veranda in Jorhat',
    clues: ['Wooden casing', 'Tuning dial', 'Plays Borgeet']
  }
];

export const DEMO_EVENTS: VerifiedMemoryEvent[] = [
  {
    id: 'event-rongali-bihu',
    patientId: 'patient-anima-das',
    title: 'Rongali Bihu Courtyard Gathering',
    approximateYear: '1988',
    festivalOrType: 'Rongali Bihu',
    photoUrl: '🌸',
    peopleInvolved: ['Anima', 'Pranab', 'Young Ananya'],
    storyText: 'The whole neighborhood gathered in the front lawn. Anima prepared fresh narikol laru and til pitha, and young Ananya wore her first muga silk mekhala sador.',
    verifiedBy: 'Ananya Das'
  }
];

export const DEMO_SOUNDS: VerifiedMemoryAudio[] = [
  {
    id: 'sound-monsoon-rain',
    patientId: 'patient-anima-das',
    title: 'Monsoon Rain on Tin Roof',
    category: 'nature',
    soundType: 'rain',
    description: 'Gentle, comforting downpour falling rhythmically on the rooftop in Dibrugarh.',
    durationSeconds: 45,
    groundedMemoryPrompt: 'Do you remember sitting on the veranda watching the garden rain?'
  },
  {
    id: 'sound-pepa-bihu',
    patientId: 'patient-anima-das',
    title: 'Buffalo Horn Pepa & Dhol Rhythm',
    category: 'festival',
    soundType: 'instrument',
    description: 'Joyful traditional melody played during spring Rongali Bihu festivities.',
    durationSeconds: 30,
    groundedMemoryPrompt: 'This sound reminds us of the courtyard Bihu dance in April.'
  },
  {
    id: 'sound-kettle-tea',
    patientId: 'patient-anima-das',
    title: 'Morning Kettle Whistle & Tea Pouring',
    category: 'household',
    soundType: 'kitchen',
    description: 'Warm, familiar kitchen sounds of boiling water and pouring Assam red tea.',
    durationSeconds: 25,
    groundedMemoryPrompt: 'The comforting sound of fresh ginger tea being prepared in the morning.'
  }
];

export const DEMO_ROUTINE: DailyRoutineItem[] = [
  {
    id: 'routine-1',
    patientId: 'patient-anima-das',
    timeSlot: '07:30',
    timePeriod: 'morning',
    title: 'Morning Ginger Tea & Veranda Sitting',
    category: 'meal',
    description: 'Enjoy a warm cup of Assam tea while listening to the morning birds.',
    isCompletedToday: true,
    completedAt: '2026-09-17T07:40:00Z',
    hasFamilyVoiceReminder: true,
    familyVoiceMessage: {
      id: 'voice-msg-1',
      speakerName: 'Ananya (Daughter)',
      relationship: 'Daughter',
      transcriptText: 'Good morning Ma! Your warm tea is ready on the side table. Take your time and enjoy the morning breeze.'
    }
  },
  {
    id: 'routine-2',
    patientId: 'patient-anima-das',
    timeSlot: '09:00',
    timePeriod: 'morning',
    title: 'Morning Heart & Blood Pressure Tablet',
    category: 'medication',
    description: 'Take the single white tablet with a full glass of lukewarm water after breakfast.',
    isCompletedToday: true,
    completedAt: '2026-09-17T09:05:00Z',
    hasFamilyVoiceReminder: true,
    familyVoiceMessage: {
      id: 'voice-msg-2',
      speakerName: 'Ananya (Daughter)',
      relationship: 'Daughter',
      transcriptText: 'Ma, remember to take your white tablet with water. I love you!'
    }
  },
  {
    id: 'routine-3',
    patientId: 'patient-anima-das',
    timeSlot: '11:00',
    timePeriod: 'morning',
    title: 'Life Sim & Memory Practice',
    category: 'activity',
    description: '10 minutes of peaceful life routine practice on Cogniva.',
    isCompletedToday: false,
    hasFamilyVoiceReminder: false
  },
  {
    id: 'routine-4',
    patientId: 'patient-anima-das',
    timeSlot: '13:00',
    timePeriod: 'afternoon',
    title: 'Wholesome Lunch (Rice & Masor Tenga)',
    category: 'meal',
    description: 'Fresh warm rice with light sour fish curry and steamed greens.',
    isCompletedToday: false,
    hasFamilyVoiceReminder: false
  },
  {
    id: 'routine-5',
    patientId: 'patient-anima-das',
    timeSlot: '17:30',
    timePeriod: 'evening',
    title: 'Terrace Garden Walk & Orchid Watering',
    category: 'walk',
    description: 'Gentle 15-minute stroll tending to the Kopou orchids and feeling the evening breeze.',
    isCompletedToday: false,
    hasFamilyVoiceReminder: true,
    familyVoiceMessage: {
      id: 'voice-msg-3',
      speakerName: 'Niloy (Grandson)',
      relationship: 'Grandson',
      transcriptText: 'Aita, don’t forget to check if the new purple orchid bud opened up!'
    }
  }
];

export const DEMO_LIFE_SIM_SCENARIOS: LifeSimScenario[] = [
  {
    id: 'scenario-morning-tea',
    title: 'Making Morning Assam Tea',
    subtitle: 'Practice the comforting routine of preparing a fresh cup of tea',
    category: 'kitchen_routine',
    culturalPack: 'assam-pack',
    estimatedMinutes: 3,
    difficultyLevel: 1,
    scenarioTheme: 'Warm Kitchen Veranda',
    environmentDescription: 'A sunlit kitchen counter with traditional bell-metal wares and fresh ginger.',
    steps: [
      {
        stepIndex: 1,
        instruction: 'Find the Tea Kettle with water',
        subPrompt: 'Where is the kettle to boil fresh water?',
        correctItemId: 'item-kettle',
        distractorItemIds: ['item-frying-pan', 'item-water-jug'],
        encouragementText: 'Wonderful! You found the kettle.',
        hint: 'Look for the kettle with the wooden handle.'
      },
      {
        stepIndex: 2,
        instruction: 'Select the Assam Tea Leaves',
        subPrompt: 'Which container holds the fragrant black tea leaves?',
        correctItemId: 'item-tea-box',
        distractorItemIds: ['item-salt-box', 'item-flour-box'],
        encouragementText: 'Excellent! The tea leaves smell wonderful.',
        hint: 'It is in the traditional wooden jar marked with tea leaves.'
      },
      {
        stepIndex: 3,
        instruction: 'Add a slice of Fresh Ginger',
        subPrompt: 'Pick the ginger piece to give the tea a warm aroma.',
        correctItemId: 'item-ginger',
        distractorItemIds: ['item-green-chili', 'item-lemon'],
        encouragementText: 'Very well done! Fresh ginger brings great comfort.',
        hint: 'Look for the aromatic ginger root next to the cutting board.'
      },
      {
        stepIndex: 4,
        instruction: 'Pour the tea into the Bell-Metal Cup',
        subPrompt: 'Which cup is Anima’s traditional morning tea cup?',
        correctItemId: 'item-brass-cup',
        distractorItemIds: ['item-plastic-mug', 'item-glass-jar'],
        encouragementText: 'Beautiful! Your morning tea is ready to enjoy on the veranda.',
        hint: 'The golden bell-metal (Kahi-Bati) cup is right in the center.'
      }
    ]
  },
  {
    id: 'scenario-doctor-visit',
    title: 'Preparing for Doctor Visit',
    subtitle: 'Gather the essential items before leaving home with Ananya',
    category: 'doctor_visit',
    culturalPack: 'assam-pack',
    estimatedMinutes: 4,
    difficultyLevel: 2,
    scenarioTheme: 'Living Room Table',
    environmentDescription: 'The entryway credenza before heading out for the afternoon checkup.',
    steps: [
      {
        stepIndex: 1,
        instruction: 'Pick up the Medical Card Folder',
        subPrompt: 'Where is your blue health folder with prescriptions?',
        correctItemId: 'item-health-folder',
        distractorItemIds: ['item-newspaper', 'item-novel'],
        encouragementText: 'Great! The health records are in hand.',
        hint: 'Look for the folder labeled with your name and doctor notes.'
      },
      {
        stepIndex: 2,
        instruction: 'Take your Reading Glasses',
        subPrompt: 'Find your glasses case so you can read comfortably.',
        correctItemId: 'item-glasses',
        distractorItemIds: ['item-magnifying-lens', 'item-sunglasses'],
        encouragementText: 'Spot on! Now you have your glasses.',
        hint: 'The brown leather case resting near the reading lamp.'
      },
      {
        stepIndex: 3,
        instruction: 'Take the Water Bottle',
        subPrompt: 'Pick the stainless steel water flask for the short car ride.',
        correctItemId: 'item-water-flask',
        distractorItemIds: ['item-soda-can', 'item-empty-cup'],
        encouragementText: 'Perfect! Staying hydrated is always good.',
        hint: 'The silver thermos bottle sitting on the side table.'
      }
    ]
  }
];

export const DEMO_BASELINE_COMPARISONS: CognitiveBaselineComparison[] = [
  {
    metricKey: 'recognition',
    label: 'Object & Person Recognition',
    baselineValue: 86,
    recentValue: 84,
    deltaPercent: -2.3,
    confidenceScore: 92,
    observationSummary: 'Recognition of immediate family photos and daily household items remains very strong and consistent.',
    trend: 'stable',
    suggestedPacing: 'Maintain current multi-photo recognition activities.'
  },
  {
    metricKey: 'sequencing',
    label: 'Sequencing & Multi-Step Flow',
    baselineValue: 78,
    recentValue: 62,
    deltaPercent: -20.5,
    confidenceScore: 89,
    observationSummary: 'Observed response latency increased during 3-step and 4-step preparation tasks across the last 6 sessions.',
    trend: 'needs_attention',
    suggestedPacing: 'Simplify multi-step routines to 2 steps with direct supportive cues.'
  },
  {
    metricKey: 'memoryRecall',
    label: 'Episodic Memory Recall',
    baselineValue: 74,
    recentValue: 71,
    deltaPercent: -4.0,
    confidenceScore: 85,
    observationSummary: 'Childhood and ancestral home recall is vivid; recent morning sequence questions occasionally require a warm reminder.',
    trend: 'stable',
    suggestedPacing: 'Continue engaging with Bihu and Jorhat childhood albums.'
  },
  {
    metricKey: 'attention',
    label: 'Sustained Attention',
    baselineValue: 81,
    recentValue: 79,
    deltaPercent: -2.5,
    confidenceScore: 88,
    observationSummary: 'High completion rate during 3–5 minute calm sessions; fatigue observed after 12 minutes.',
    trend: 'stable',
    suggestedPacing: 'Keep daily sessions brief (under 7 minutes).'
  },
  {
    metricKey: 'routineRecall',
    label: 'Daily Routine Orientation',
    baselineValue: 72,
    recentValue: 68,
    deltaPercent: -5.5,
    confidenceScore: 84,
    observationSummary: 'Responds warmly to daughter’s recorded voice prompts for morning medication and afternoon lunch.',
    trend: 'stable',
    suggestedPacing: 'Reinforce routine with Family Voice messages.'
  },
  {
    metricKey: 'planning',
    label: 'Activity Planning',
    baselineValue: 69,
    recentValue: 64,
    deltaPercent: -7.2,
    confidenceScore: 81,
    observationSummary: 'Pre-selected items in Life Sim reduce hesitation compared to open-ended choices.',
    trend: 'slight_decline',
    suggestedPacing: 'Provide 2 choices instead of 4.'
  }
];

export const DEMO_CHANGE_EVENTS: CognitiveChangeEvent[] = [
  {
    id: 'change-event-01',
    patientId: 'patient-anima-das',
    detectedDate: '2026-09-15',
    category: 'Sequencing Tasks',
    headline: 'Noticeable change in multi-step task completion time',
    plainLanguageDescription: 'During the last 6 sessions, sequencing activities (such as making tea in Life Sim) took an average of 42 seconds longer than Anima’s established personal baseline. Error retries slightly increased on step 3.',
    baselineScore: 78,
    recentScore: 62,
    sessionsAnalyzedCount: 14,
    clinicalNote: 'Functional shift observed specifically in temporal ordering. No change in core name or face recognition. Recommend reducing step density and checking evening fatigue.',
    status: 'active'
  }
];

export const DEMO_CURRENT_METRICS: CognitiveMetricScores = {
  memoryRecall: 71,
  attention: 79,
  recognition: 84,
  sequencing: 62,
  planning: 64,
  routineRecall: 68,
  processingSpeed: 66,
  languageEngagement: 82
};

export const DEMO_ALERTS: CaregiverAlert[] = [
  {
    id: 'alert-1',
    patientId: 'patient-anima-das',
    type: 'change_radar',
    severity: 'observation',
    title: 'Cognitive Change Radar Notice',
    message: 'Sequencing tasks took longer than personal baseline across the last 6 sessions. Pacing adapted to 2-step flows.',
    timestamp: '2026-09-16T14:30:00Z',
    isRead: false
  },
  {
    id: 'alert-2',
    patientId: 'patient-anima-das',
    type: 'milestone_reached',
    severity: 'info',
    title: 'Garden Milestone Reached',
    message: 'Anima completed her morning memory session. Her Jasmine orchid bloomed!',
    timestamp: '2026-09-17T09:30:00Z',
    isRead: false
  }
];
