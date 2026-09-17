export interface SafetyCheckResult {
  isSafe: boolean;
  violationType?: 'medical_diagnosis' | 'prescription_modification' | 'unverified_memory_claim' | 'unsupported_clinical_claim';
  sanitizedResponse: string;
}

export class SafetyEngine {
  private static FORBIDDEN_MEDICAL_PATTERNS = [
    /dementia\s+is\s+(worsening|progressing|cured|diagnosed)/i,
    /you\s+have\s+(stage\s+\d+|alzheimer's|severe\s+dementia)/i,
    /increase\s+(the\s+)?dosage/i,
    /stop\s+taking\s+(your\s+)?medication/i,
    /diagnos(e|is|ed)\s+with/i,
    /prescribe/i,
  ];

  static sanitize(text: string): SafetyCheckResult {
    for (const pattern of this.FORBIDDEN_MEDICAL_PATTERNS) {
      if (pattern.test(text)) {
        return {
          isSafe: false,
          violationType: 'medical_diagnosis',
          sanitizedResponse: 'Cogniva observes and summarizes functional activity patterns relative to personal baselines. It does not provide medical diagnoses or alter prescriptions. Please consult your authorized healthcare professional.'
        };
      }
    }

    return {
      isSafe: true,
      sanitizedResponse: text
    };
  }

  static getMedicalDisclaimer(): string {
    return 'Medical Disclaimer: Cogniva provides personalized cognitive rehabilitation support and longitudinal activity tracking. It does not diagnose medical conditions, determine clinical dementia staging, or replace professional neurological care.';
  }
}
