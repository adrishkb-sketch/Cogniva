import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'diary.json');

// Helper to read the file
function getDiaries() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData || '[]');
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const updates = await request.json();
    const diaries = getDiaries();
    
    const index = diaries.findIndex((d: any) => d.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Diary not found' }, { status: 404 });
    }

    diaries[index] = { ...diaries[index], ...updates };
    fs.writeFileSync(dataFilePath, JSON.stringify(diaries, null, 2));

    return NextResponse.json(diaries[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update diary' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    let diaries = getDiaries();
    
    const initialLength = diaries.length;
    diaries = diaries.filter((d: any) => d.id !== id);
    
    if (diaries.length === initialLength) {
      return NextResponse.json({ error: 'Diary not found' }, { status: 404 });
    }

    fs.writeFileSync(dataFilePath, JSON.stringify(diaries, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete diary' }, { status: 500 });
  }
}
