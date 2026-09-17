import { DEMO_PEOPLE, DEMO_PLACES, DEMO_OBJECTS, DEMO_EVENTS, DEMO_PATIENT, DEMO_ROUTINE } from '@/lib/demo/demo-patient-anima';

export interface GroundedFactResult {
  found: boolean;
  subject: string;
  verifiedAnswer: string;
  sourceType: 'person' | 'place' | 'object' | 'event' | 'routine' | 'none';
  verifiedBy: string;
}

export class MemoryGroundingService {
  static queryVerifiedMemory(queryText: string): GroundedFactResult {
    const q = queryText.toLowerCase().trim();

    // 1. Search People
    for (const p of DEMO_PEOPLE) {
      if (q.includes(p.name.toLowerCase()) || q.includes(p.relationship.toLowerCase())) {
        return {
          found: true,
          subject: p.name,
          verifiedAnswer: `${p.name} is your ${p.relationship}. ${p.notes} Key detail: ${p.keyFacts.join('. ')}.`,
          sourceType: 'person',
          verifiedBy: p.verifiedBy
        };
      }
    }

    // 2. Search Places
    for (const pl of DEMO_PLACES) {
      if (q.includes(pl.title.toLowerCase()) || q.includes(pl.locationName.toLowerCase()) || (pl.category === 'childhood_home' && (q.includes('childhood') || q.includes('grow up') || q.includes('home')))) {
        return {
          found: true,
          subject: pl.title,
          verifiedAnswer: `That is the ${pl.title} in ${pl.locationName}. ${pl.description} Sensory memory: ${pl.sensoryDetails.scents || ''}.`,
          sourceType: 'place',
          verifiedBy: pl.verifiedBy
        };
      }
    }

    // 3. Search Objects
    for (const obj of DEMO_OBJECTS) {
      if (q.includes(obj.name.toLowerCase()) || (obj.name.toLowerCase().includes('tea') && q.includes('tea cup')) || (obj.name.toLowerCase().includes('gamosa') && q.includes('gamosa'))) {
        return {
          found: true,
          subject: obj.name,
          verifiedAnswer: `${obj.name}: ${obj.significance}. Associated with ${obj.associatedPlaceOrPerson}.`,
          sourceType: 'object',
          verifiedBy: 'Ananya Das (Caregiver)'
        };
      }
    }

    // 4. Search Events
    for (const ev of DEMO_EVENTS) {
      if (q.includes(ev.title.toLowerCase()) || q.includes('bihu') || q.includes('festival')) {
        return {
          found: true,
          subject: ev.title,
          verifiedAnswer: `${ev.title} (${ev.approximateYear || ''}): ${ev.storyText}`,
          sourceType: 'event',
          verifiedBy: ev.verifiedBy
        };
      }
    }

    // 5. Search Routine
    if (q.includes('tea') || q.includes('morning') || q.includes('medicine') || q.includes('routine')) {
      const routineMatch = DEMO_ROUTINE.find(r => q.includes(r.title.toLowerCase()) || q.includes(r.category));
      if (routineMatch) {
        return {
          found: true,
          subject: routineMatch.title,
          verifiedAnswer: `At ${routineMatch.timeSlot}: ${routineMatch.title}. ${routineMatch.description}`,
          sourceType: 'routine',
          verifiedBy: 'Caregiver Schedule'
        };
      }
    }

    // Explicit Anti-Hallucination Safe Fallback
    return {
      found: false,
      subject: queryText,
      verifiedAnswer: "I don't have verified memory records for that yet. Would you like your family caregiver to add this to your personal memories?",
      sourceType: 'none',
      verifiedBy: 'System Grounding'
    };
  }
}
