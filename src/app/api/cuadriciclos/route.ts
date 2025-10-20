import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const cuatrimotos = await db.cuatrimotos.findAll();
    return NextResponse.json({ cuatrimotos });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
