import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

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

    const db = await getDb();
    const reserva = await db.reservas.findById(id);
    if (!reserva) {
      return NextResponse.json(
        { error: 'Reserva not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ reserva });
  } catch (error) {
    console.error('Error fetching reserva:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reserva' },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const data = await request.json();
    const db = await getDb();

    // Verificar que la reserva existe
    const existingReserva = await db.reservas.findById(id);
    if (!existingReserva) {
      return NextResponse.json(
        { error: 'Reserva not found' },
        { status: 404 }
      );
    }

    // Actualizar la reserva
    const updatedReserva = await db.reservas.update(id, {
      ...data,
      updated_at: new Date()
    });

    return NextResponse.json({
      success: true,
      reserva: updatedReserva
    });
  } catch (error) {
    console.error('Error updating reserva:', error);
    return NextResponse.json(
      { error: 'Failed to update reserva' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const db = await getDb();

    // Verificar que la reserva existe
    const existingReserva = await db.reservas.findById(id);
    if (!existingReserva) {
      return NextResponse.json(
        { error: 'Reserva not found' },
        { status: 404 }
      );
    }

    // Eliminar la reserva
    await db.reservas.delete(id);

    return NextResponse.json({
      success: true,
      message: 'Reserva deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting reserva:', error);
    return NextResponse.json(
      { error: 'Failed to delete reserva' },
      { status: 500 }
    );
  }
}