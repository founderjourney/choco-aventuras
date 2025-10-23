import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log('Fetching página by slug:', slug);
    const db = await getDb();
    const page = await db.paginas.findBySlug(slug);

    if (!page) {
      return new NextResponse('Page not found', { status: 404 });
    }

    console.log('Página fetched successfully:', page.id);
    return NextResponse.json({ page });
  } catch (error) {
    console.error('Error fetching página:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log('Deleting página by slug:', slug);
    const db = await getDb();

    // Primero buscar la página para obtener su ID
    const page = await db.paginas.findBySlug(slug);
    if (!page) {
      return new NextResponse('Page not found', { status: 404 });
    }

    const deleted = await db.paginas.delete(page.id);

    if (!deleted) {
      return new NextResponse('Failed to delete page', { status: 500 });
    }

    console.log('Página deleted successfully:', page.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting página:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}