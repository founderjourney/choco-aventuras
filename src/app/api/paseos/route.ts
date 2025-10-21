import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const includeInactive = searchParams.get('include_inactive') === 'true';

  try {
    const db = await getDb();
    const paseos = await db.paseos.findAll(includeInactive);
    return NextResponse.json({ paseos });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
