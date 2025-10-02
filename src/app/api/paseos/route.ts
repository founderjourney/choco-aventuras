import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('include_inactive') === 'true';

    const paseos = await db.paseos.findAll(includeInactive);
    return NextResponse.json({ paseos });
  } catch (error) {
    console.error('Error fetching paseos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paseos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const paseo = await db.paseos.create(data);
    return NextResponse.json({ paseo });
  } catch (error) {
    console.error('Error creating paseo:', error);
    return NextResponse.json(
      { error: 'Failed to create paseo' },
      { status: 500 }
    );
  }
}