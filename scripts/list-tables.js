const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function list() {
  const r = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name");
  console.log(r.rows.map(t => t.table_name).join('\n'));
  await pool.end();
}

list().catch(console.error);
