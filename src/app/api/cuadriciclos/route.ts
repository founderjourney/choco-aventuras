import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const cuatrimotos = await db.cuatrimotos.findAll();
    return NextResponse.json({ cuatrimotos });
  } catch (error) {
    console.error('Error fetching cuatrimotos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cuatrimotos' },
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

    const cuatrimoto = await db.cuatrimotos.create({
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

    return NextResponse.json(cuatrimoto, { status: 201 });
  } catch (error) {
    console.error('Error creating cuatrimoto:', error);
    return NextResponse.json(
      { error: 'Failed to create cuatrimoto' },
      { status: 500 }
    );
  }
}