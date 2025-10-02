import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const cuadriciclos = await db.cuadriciclos.findAll();
    return NextResponse.json({ cuadriciclos });
  } catch (error) {
    console.error('Error fetching cuadriciclos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cuadriciclos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    const requiredFields = ['nombre', 'marca', 'modelo', 'color', 'precio_hora', 'precio_dia'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const cuadriciclo = await db.cuadriciclos.create({
      nombre: data.nombre,
      marca: data.marca,
      modelo: data.modelo,
      año: data.año || null,
      color: data.color,
      precio_hora: Number(data.precio_hora),
      precio_dia: Number(data.precio_dia),
      descripcion: data.descripcion || null,
      fotos: data.fotos || [],
      estado: data.estado || 'disponible',
      caracteristicas: data.caracteristicas || []
    });

    return NextResponse.json(cuadriciclo, { status: 201 });
  } catch (error) {
    console.error('Error creating cuadriciclo:', error);
    return NextResponse.json(
      { error: 'Failed to create cuadriciclo' },
      { status: 500 }
    );
  }
}