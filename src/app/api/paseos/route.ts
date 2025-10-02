import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const paseos = await db.paseos.findAll();
    return NextResponse.json({ paseos });
  } catch (error) {
    console.error('Error fetching paseos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paseos' },
      { status: 500 }
    );
  }
}