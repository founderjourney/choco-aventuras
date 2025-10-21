import { db as devDb } from './db.dev';

let db = devDb; // Por defecto usar mock data

// Función para obtener la base de datos correcta con fallback automático
export async function getDb() {
  if (process.env.POSTGRES_URL) {
    try {
      console.log('🔌 Attempting to use production database...');
      const prodModule = await import('./db.prod');

      // Test the connection with a simple query
      const testResult = await prodModule.db.cuatrimotos.findAll();
      console.log('✅ Production database connected successfully');
      return prodModule.db;
    } catch (error) {
      console.warn('⚠️ Production database unreachable, falling back to mock data');
      console.warn('Error details:', error.code || error.message);
      return devDb;
    }
  }

  console.log('📋 Using development mock data (no POSTGRES_URL configured)');
  return devDb;
}

// Exportar por compatibilidad (pero se recomienda usar getDb())
export { db };