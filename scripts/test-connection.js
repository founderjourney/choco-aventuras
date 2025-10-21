const { Pool } = require('pg');

// Probemos diferentes formatos de conexión
const connectionConfigs = [
  {
    name: 'URL format 1',
    config: {
      connectionString: 'postgresql://postgres:RoESLdASfX@#mUvPzY@db.podpypchfalfawgbyafr.supabase.co:5432/postgres'
    }
  },
  {
    name: 'URL format 2 (encoded)',
    config: {
      connectionString: 'postgresql://postgres:RoESLdASfX%40%23mUvPzY@db.podpypchfalfawgbyafr.supabase.co:5432/postgres'
    }
  },
  {
    name: 'Object config',
    config: {
      host: 'db.podpypchfalfawgbyafr.supabase.co',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: 'RoESLdASfX@#mUvPzY'
    }
  }
];

async function testConnection(name, config) {
  const pool = new Pool(config);

  try {
    console.log(`\n🔌 Testing ${name}...`);
    const result = await pool.query('SELECT version()');
    console.log(`✅ ${name} - Connection successful!`);
    console.log(`Database version: ${result.rows[0].version.substring(0, 50)}...`);
    return true;
  } catch (error) {
    console.log(`❌ ${name} - Connection failed:`, error.message);
    return false;
  } finally {
    await pool.end();
  }
}

async function main() {
  console.log('🧪 Testing database connections...');

  for (const { name, config } of connectionConfigs) {
    const success = await testConnection(name, config);
    if (success) {
      console.log(`\n🎉 Using successful configuration: ${name}`);
      break;
    }
  }
}

main().catch(console.error);