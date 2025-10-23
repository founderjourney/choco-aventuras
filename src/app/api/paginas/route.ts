import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    console.log('Fetching páginas...');
    const db = await getDb();
    const paginas = await db.paginas.findAll();
    console.log('Páginas fetched successfully:', paginas.length, 'pages');
    return NextResponse.json({ paginas });
  } catch (error) {
    console.error('Error fetching páginas:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('Creating/updating página...');
    const pageData = await request.json();
    const db = await getDb();
    const savedPage = await db.paginas.save(pageData);
    console.log('Página saved successfully:', savedPage.id);
    return NextResponse.json({ page: savedPage });
  } catch (error) {
    console.error('Error saving página:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}