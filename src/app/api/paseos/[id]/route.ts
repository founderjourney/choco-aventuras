import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const db = await getDb();
    const paseo = await db.paseos.findById(id);

    if (!paseo) {
      return NextResponse.json(
        { error: 'Paseo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ paseo });
  } catch (error) {
    console.error('Error fetching paseo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch paseo' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();
    const db = await getDb();
    const paseo = await db.paseos.update(id, data);

    if (!paseo) {
      return NextResponse.json(
        { error: 'Paseo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ paseo });
  } catch (error) {
    console.error('Error updating paseo:', error);
    return NextResponse.json(
      { error: 'Failed to update paseo' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const db = await getDb();
    const success = await db.paseos.delete(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Paseo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Paseo deleted successfully' });
  } catch (error) {
    console.error('Error deleting paseo:', error);
    return NextResponse.json(
      { error: 'Failed to delete paseo' },
      { status: 500 }
    );
  }
}