import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const estado = searchParams.get('estado') || undefined;
    const fecha = searchParams.get('fecha') || undefined;

    const reservas = await db.reservas.findAll({ estado, fecha });
    return NextResponse.json({ reservas });
  } catch (error) {
    console.error('Error fetching reservas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    const requiredFields = [
      'cuatrimoto_id',
      'paseo_id',
      'cliente_nombre',
      'cliente_telefono',
      'cliente_email',
      'fecha_paseo'
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const reserva = await db.reservas.create({
      cuatrimoto_id: Number(data.cuatrimoto_id),
      paseo_id: Number(data.paseo_id),
      cliente_nombre: data.cliente_nombre,
      cliente_telefono: data.cliente_telefono,
      cliente_email: data.cliente_email,
      fecha_paseo: new Date(data.fecha_paseo),
      notas: data.notas || null
    });

    return NextResponse.json(reserva, { status: 201 });
  } catch (error) {
    console.error('Error creating reserva:', error);
    return NextResponse.json(
      { error: 'Failed to create reserva' },
      { status: 500 }
    );
  }
}