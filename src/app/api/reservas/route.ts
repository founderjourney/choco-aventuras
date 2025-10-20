import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const estado = searchParams.get('estado') || undefined;
  const fecha = searchParams.get('fecha') || undefined;

  try {
    const reservas = await db.reservas.findAll({ estado, fecha });
    return NextResponse.json({ reservas });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newReserva = await db.reservas.create(body);
    return NextResponse.json(newReserva, { status: 201 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
