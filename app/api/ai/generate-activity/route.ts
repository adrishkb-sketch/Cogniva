import { NextRequest, NextResponse } from 'next/server';
import { ALL_NER_PACKS } from '@/lib/cultural-packs/all-ner';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { stateId = 'assam', difficultyLevel = 1 } = body;

    const pack = ALL_NER_PACKS[stateId] || ALL_NER_PACKS.assam;

    const apiKey = req.headers.get('x-gemini-key') || body.apiKey || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `Generate a culturally grounded, gentle cognitive activity for an elderly dementia patient in ${pack.name} (${pack.state}), India.
Cultural context:
- Traditional Foods: ${pack.foods.join(', ')}
- Festivals: ${pack.festivals.map(f => f.name).join(', ')}
- Household Objects: ${pack.householdObjects.map(o => o.name).join(', ')}

Output valid JSON matching this schema:
{
  "title": "activity title",
  "subtitle": "short gentle subtitle",
  "category": "kitchen_routine" or "cultural_reminiscence" or "craft_sequencing",
  "estimatedMinutes": 3,
  "steps": [
    {
      "stepIndex": 1,
      "instruction": "clear instruction",
      "subPrompt": "supportive prompt",
      "correctItemName": "item name",
      "distractorItems": ["distractor1", "distractor2"],
      "encouragementText": "warm praise",
      "hint": "gentle hint"
    }
  ]
}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.3,
                response_mime_type: 'application/json'
              }
            })
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const parsed = JSON.parse(text);
            return NextResponse.json({
              scenario: parsed,
              stateId,
              source: 'gemini_1.5_flash'
            });
          }
        }
      } catch {
        // Fallback
      }
    }

    // Default High-Fidelity Regional Preset Fallback
    const fallbackScenario = {
      title: `Preparing ${pack.foods[0] || 'Morning Tea'} in ${pack.state}`,
      subtitle: `Experience the familiar comforting routine from ${pack.name}`,
      category: 'cultural_reminiscence',
      estimatedMinutes: 3,
      steps: [
        {
          stepIndex: 1,
          instruction: `Find the traditional ${pack.householdObjects[0]?.name || 'Utensil'}`,
          subPrompt: `Look for the ${pack.householdObjects[0]?.name || 'tea cup'} used for family moments.`,
          correctItemName: pack.householdObjects[0]?.name || 'Brass Cup',
          distractorItems: ['Plastic Mug', 'Frying Pan'],
          encouragementText: 'Wonderful! You found the traditional heirloom.',
          hint: `It is crafted in the classic ${pack.state} style.`
        },
        {
          stepIndex: 2,
          instruction: `Gather ingredients for ${pack.foods[0] || 'Warm Tea'}`,
          subPrompt: 'Which fresh local ingredient belongs in this recipe?',
          correctItemName: pack.foods[0] || 'Fresh Ginger',
          distractorItems: ['Dry Salt', 'Cold Water'],
          encouragementText: 'Excellent! The aromas are wonderfully familiar.',
          hint: 'Look for the fragrant spice on the cutting board.'
        }
      ]
    };

    return NextResponse.json({
      scenario: fallbackScenario,
      stateId,
      source: 'regional_template_engine'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Activity generation failed' }, { status: 500 });
  }
}
