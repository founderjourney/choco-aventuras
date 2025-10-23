import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getDefaultPages } from '@/lib/pageContent';

export async function POST() {
  try {
    console.log('Starting migration of default pages to database...');
    const db = await getDb();
    const defaultPages = getDefaultPages();

    let migratedCount = 0;
    let skippedCount = 0;

    for (const page of defaultPages) {
      try {
        // Verificar si la página ya existe
        const existingPage = await db.paginas.findBySlug(page.slug);

        if (existingPage) {
          console.log(`Page ${page.slug} already exists, skipping...`);
          skippedCount++;
          continue;
        }

        // Migrar la página
        await db.paginas.save(page);
        console.log(`Page ${page.slug} migrated successfully`);
        migratedCount++;
      } catch (error) {
        console.error(`Error migrating page ${page.slug}:`, error);
      }
    }

    console.log(`Migration completed. Migrated: ${migratedCount}, Skipped: ${skippedCount}`);

    return NextResponse.json({
      success: true,
      message: `Migration completed successfully`,
      migrated: migratedCount,
      skipped: skippedCount,
      total: defaultPages.length
    });
  } catch (error) {
    console.error('Error during migration:', error);
    return new NextResponse('Migration failed', { status: 500 });
  }
}