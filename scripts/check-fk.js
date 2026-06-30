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
    // llm_configs columns
    const cols = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'llm_configs' AND table_schema = 'public'
      ORDER BY ordinal_position
    `);
    console.log('--- llm_configs columns ---');
    cols.rows.forEach(c => console.log(`${c.column_name} (${c.data_type}, nullable: ${c.is_nullable})`));

    // Foreign keys
    const fks = await pool.query(`
      SELECT tc.constraint_name, kcu.column_name, ccu.table_name AS foreign_table, ccu.column_name AS foreign_column
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
      WHERE tc.table_name = 'llm_configs' AND tc.constraint_type = 'FOREIGN KEY'
    `);
    console.log('\n--- Foreign keys ---');
    fks.rows.forEach(f => console.log(`${f.column_name} → ${f.foreign_table}.${f.foreign_column}`));

    // Users tablosu
    const users = await pool.query('SELECT id, email, name FROM users');
    console.log('\n--- Users ---');
    users.rows.forEach(u => console.log(`id: ${u.id} | email: ${u.email} | name: ${u.name}`));

    // llm_configs tablosu
    const configs = await pool.query('SELECT id, user_id, modelname FROM llm_configs');
    console.log('\n--- llm_configs ---');
    configs.rows.forEach(c => console.log(`id: ${c.id} | user_id: ${c.user_id} | model: ${c.modelname}`));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

check();
