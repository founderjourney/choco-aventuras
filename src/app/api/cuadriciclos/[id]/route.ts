import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const cuadriciclo = await db.cuadriciclos.findById(id);
    if (!cuadriciclo) {
      return NextResponse.json(
        { error: 'Cuadriciclo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(cuadriciclo);
  } catch (error) {
    console.error('Error fetching cuadriciclo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cuadriciclo' },
      { status: 500 }
    );
  }
}