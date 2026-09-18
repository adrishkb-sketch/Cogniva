import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, sourceLanguage, targetLanguage } = await req.json();

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: 'Text and target language are required.' }, { status: 400 });
    }

    // Use the free undocumented Google Translate API endpoint (client=gtx)
    // This removes the need for a GOOGLE_TRANSLATE_API_KEY for basic usage.
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage === 'auto' ? 'auto' : sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Translation API error:', response.statusText);
      return NextResponse.json({ error: 'Failed to translate text.' }, { status: response.status });
    }

    const data = await response.json();
    
    // The response is an array of arrays, where the first array contains the translated segments.
    // e.g. [[["नमस्ते", "hello", null, null, 10]], null, "en"]
    let translatedText = '';
    if (data && data[0]) {
      data[0].forEach((segment: any) => {
        if (segment[0]) translatedText += segment[0];
      });
    } else {
      throw new Error("Unexpected translation response format");
    }

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Error in translate API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
