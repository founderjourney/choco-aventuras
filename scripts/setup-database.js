const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Configuración de la base de datos
const pool = new Pool({
  connectionString: 'postgresql://postgres:RoESLdASfX@#mUvPzY@db.podpypchfalfawgbyafr.supabase.co:5432/postgres',
  connectionTimeoutMillis: 5000,
});

async function setupDatabase() {
  try {
    console.log('🔌 Conectando a Supabase...');

    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, 'create-tables.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('📋 Ejecutando script de creación de tablas...');

    // Ejecutar el script SQL
    await pool.query(sql);

    console.log('✅ Base de datos configurada exitosamente!');

    // Verificar que las tablas se crearon
    console.log('\n📊 Verificando tablas creadas:');

    const tablesResult = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('cuadriciclos', 'paseos', 'reservas')
      ORDER BY table_name;
    `);

    console.log('Tablas encontradas:', tablesResult.rows.map(row => row.table_name));

    // Verificar datos iniciales
    const cuadriciolosCount = await pool.query('SELECT COUNT(*) FROM cuadriciclos');
    const paseosCount = await pool.query('SELECT COUNT(*) FROM paseos');
    const reservasCount = await pool.query('SELECT COUNT(*) FROM reservas');

    console.log('\n📈 Datos iniciales:');
    console.log(`- Cuadriciclos: ${cuadriciolosCount.rows[0].count}`);
    console.log(`- Paseos: ${paseosCount.rows[0].count}`);
    console.log(`- Reservas: ${reservasCount.rows[0].count}`);

  } catch (error) {
    console.error('❌ Error configurando la base de datos:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();