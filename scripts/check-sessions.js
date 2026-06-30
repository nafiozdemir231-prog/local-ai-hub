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
    const cols = await pool.query(`
      SELECT column_name, data_type FROM information_schema.columns 
      WHERE table_name = 'sessions' AND table_schema = 'public'
      ORDER BY ordinal_position
    `);
    console.log('--- Sessions columns ---');
    cols.rows.forEach(c => console.log(`${c.column_name} (${c.data_type})`));

    const sess = await pool.query('SELECT * FROM sessions');
    console.log('\n--- Sessions data ---');
    sess.rows.forEach(s => console.log(JSON.stringify(s)));

    const accCols = await pool.query(`
      SELECT column_name, data_type FROM information_schema.columns 
      WHERE table_name = 'accounts' AND table_schema = 'public'
      ORDER BY ordinal_position
    `);
    console.log('\n--- Accounts columns ---');
    accCols.rows.forEach(c => console.log(`${c.column_name} (${c.data_type})`));

    const acc = await pool.query('SELECT * FROM accounts');
    console.log('\n--- Accounts data ---');
    acc.rows.forEach(a => console.log(JSON.stringify(a)));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

check();
