import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    console.log('Fetching cuatrimotos...');
    const db = await getDb();
    const cuatrimotos = await db.cuatrimotos.findAll();
    console.log('Cuatrimotos fetched successfully:', cuatrimotos);
    return NextResponse.json({ cuatrimotos });
  } catch (error) {
    console.error('Error fetching cuatrimotos:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}