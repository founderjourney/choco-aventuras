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

    const cuatrimoto = await db.cuatrimotos.findById(id);
    if (!cuatrimoto) {
      return NextResponse.json(
        { error: 'Cuatrimoto not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(cuatrimoto);
  } catch (error) {
    console.error('Error fetching cuatrimoto:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cuatrimoto' },
      { status: 500 }
    );
  }
}