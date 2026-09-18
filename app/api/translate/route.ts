import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, sourceLanguage, targetLanguage } = await req.json();

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: 'Text and target language are required.' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
      console.warn("GOOGLE_TRANSLATE_API_KEY is not set. Please add it to your .env file.");
      return NextResponse.json({ error: 'Translation API key is not configured.' }, { status: 500 });
    }

    // Google Cloud Translation API v2
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage === 'auto' ? undefined : sourceLanguage,
        target: targetLanguage,
        format: 'text',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Translation API error:', errorData);
      return NextResponse.json({ error: 'Failed to translate text.' }, { status: response.status });
    }

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Error in translate API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
