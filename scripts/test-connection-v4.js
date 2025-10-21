const { Pool } = require('pg');

// Configuración forzando IPv4
const config = {
  host: 'db.podpypchfalfawgbyafr.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'RoESLdASfX@#mUvPzY',
  ssl: {
    rejectUnauthorized: false
  },
  // Forzar IPv4
  family: 4
};

async function testConnection() {
  const pool = new Pool(config);

  try {
    console.log('🔌 Testing connection with IPv4 and SSL...');
    const result = await pool.query('SELECT version()');
    console.log('✅ Connection successful!');
    console.log(`Database version: ${result.rows[0].version.substring(0, 80)}...`);

    // Test creating a simple table
    console.log('\n📋 Testing table creation...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS test_connection (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table creation successful!');

    // Test inserting data
    await pool.query('INSERT INTO test_connection DEFAULT VALUES');
    const countResult = await pool.query('SELECT COUNT(*) FROM test_connection');
    console.log(`✅ Data insertion successful! Rows: ${countResult.rows[0].count}`);

    // Clean up
    await pool.query('DROP TABLE test_connection');
    console.log('✅ Cleanup successful!');

    return true;
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    return false;
  } finally {
    await pool.end();
  }
}

testConnection().catch(console.error);