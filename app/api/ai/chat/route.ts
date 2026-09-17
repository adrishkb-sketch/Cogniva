import { NextRequest, NextResponse } from 'next/server';
import { SafetyEngine } from '@/lib/ai/safety';
import { MemoryGroundingService } from '@/lib/ai/memory-grounding';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, patientName = 'Anima', region = 'Assam', verifiedFacts = [] } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // 1. Enforce strict safety boundary
    const safetyCheck = SafetyEngine.sanitize(prompt);
    if (!safetyCheck.isSafe) {
      return NextResponse.json({
        content: safetyCheck.sanitizedResponse,
        source: 'safety_guardrail',
        grounded: true
      });
    }

    // 2. Query verified memories
    const groundedResult = MemoryGroundingService.queryVerifiedMemory(prompt);

    // 3. Connect to Gemini 1.5 Flash API if key exists
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemInstruction = `You are Cogniva, an empathetic, calm, elderly-friendly reminiscence companion for ${patientName} from ${region} in the North Eastern Region of India.
Strict Medical Guardrails:
- NEVER diagnose medical conditions or assess dementia severity.
- NEVER alter medications or give medical advice.
- Speak in warm, simple, soothing English/Assamese expressions.
- Grounded Memory Context: ${groundedResult.found ? groundedResult.verifiedAnswer : 'No verified record exists. Do not invent facts.'}`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemInstruction}\n\nPatient says: ${prompt}` }]
                }
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 300
              }
            })
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const generated = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generated) {
            const sanitized = SafetyEngine.sanitize(generated).sanitizedResponse;
            return NextResponse.json({
              content: sanitized,
              source: 'gemini_1.5_flash',
              grounded: groundedResult.found
            });
          }
        }
      } catch {
        // Fall through to grounded fallback
      }
    }

    // 4. Grounded Rule Fallback (100% reliable offline / no-key mode)
    const fallbackResponse = groundedResult.found
      ? groundedResult.verifiedAnswer
      : `That sounds comforting, ${patientName}. Tell me more about what you enjoyed doing on your veranda in ${region}.`;

    return NextResponse.json({
      content: fallbackResponse,
      source: 'local_grounded_engine',
      grounded: groundedResult.found
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to process AI chat' }, { status: 500 });
  }
}
