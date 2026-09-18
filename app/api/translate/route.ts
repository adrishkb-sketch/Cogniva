import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, sourceLanguage = 'en', targetLanguage } = await req.json();

    if (!text || !targetLanguage) {
      return NextResponse.json({ error: 'Text and target language are required.' }, { status: 400 });
    }

    if (targetLanguage === 'en') {
      return NextResponse.json({ translatedText: text });
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to translate text.' }, { status: response.status });
    }

    const data = await response.json();
    
    let translatedText = '';
    if (data && data[0]) {
      data[0].forEach((segment: any) => {
        if (segment[0]) translatedText += segment[0];
      });
    } else {
      throw new Error("Unexpected format");
    }

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translate API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
