import { NextRequest, NextResponse } from 'next/server';
import { CaregiverCopilotService } from '@/lib/ai/caregiver-copilot';
import { SafetyEngine } from '@/lib/ai/safety';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const copilotResult = await CaregiverCopilotService.askQuestion(question);

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && SafetyEngine.sanitize(question).isSafe) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `You are Cogniva Caregiver Intelligence Copilot.
Question from Caregiver: "${question}"
Ground Truth Recorded Metrics:
${copilotResult.answer}
Source Data: ${copilotResult.sourceMetrics.join(', ')}

Explain this clearly and compassionately in 2-3 sentences.
NEVER diagnose or alter prescriptions.`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 250
              }
            })
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const sanitized = SafetyEngine.sanitize(text).sanitizedResponse;
            return NextResponse.json({
              answer: sanitized,
              sourceMetrics: copilotResult.sourceMetrics,
              suggestedFollowUps: copilotResult.suggestedFollowUps,
              disclaimer: SafetyEngine.getMedicalDisclaimer(),
              provider: 'gemini_1.5_flash'
            });
          }
        }
      } catch {
        // Fallback to grounded calculation
      }
    }

    return NextResponse.json({
      ...copilotResult,
      provider: 'computed_baseline_engine'
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Copilot query failed' }, { status: 500 });
  }
}
