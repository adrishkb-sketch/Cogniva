import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'data', 'diary.json');

// Helper to read the file
function getDiaries() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData || '[]');
}

export async function GET() {
  try {
    const diaries = getDiaries();
    // Sort by date descending (newest first)
    diaries.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json(diaries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch diaries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newDiary = await request.json();
    
    // Validate
    if (!newDiary.title || !newDiary.content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const diaries = getDiaries();
    
    const entry = {
      id: `diary-${Date.now()}`,
      title: newDiary.title,
      content: newDiary.content,
      mood: newDiary.mood || '😌',
      photo: newDiary.photo || null,
      date: newDiary.date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    diaries.push(entry);
    
    // Ensure data dir exists
    const dataDir = path.dirname(dataFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(dataFilePath, JSON.stringify(diaries, null, 2));

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save diary' }, { status: 500 });
  }
}
