require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');
const { DATABASE_URL } = process.env;

const url = new URL(DATABASE_URL);
const pool = new Pool({
  host: url.hostname,
  port: parseInt(url.port),
  database: url.pathname.slice(1),
  user: url.username,
  password: url.password,
});

async function check() {
  try {
    const tables = await pool.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    console.log('--- Tables ---');
    tables.rows.forEach(t => console.log(t.table_name));

    console.log('\n--- Users ---');
    const users = await pool.query('SELECT * FROM users');
    users.rows.forEach(u => console.log(JSON.stringify(u, null, 2)));

    console.log('\n--- LLM Configs ---');
    const configs = await pool.query('SELECT id, user_id, modelName FROM lLM_configs');
    configs.rows.forEach(c => console.log(JSON.stringify(c)));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

check();
