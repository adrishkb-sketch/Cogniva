export interface DailyRoutineItem {
  id: string;
  patientId: string;
  timeSlot: string; // e.g. "08:00"
  timePeriod: 'morning' | 'afternoon' | 'evening' | 'night';
  title: string;
  category: 'medication' | 'meal' | 'activity' | 'hydration' | 'walk' | 'family_call';
  description: string;
  isCompletedToday: boolean;
  completedAt?: string;
  hasFamilyVoiceReminder: boolean;
  familyVoiceMessage?: {
    id: string;
    speakerName: string;
    relationship: string;
    audioUrl?: string;
    transcriptText: string;
  };
}

export interface CaregiverAlert {
  id: string;
  patientId: string;
  type: 'change_radar' | 'routine_missed' | 'adherence_drop' | 'milestone_reached' | 'help_requested';
  severity: 'info' | 'observation' | 'advisory';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}
