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

async function fix() {
  try {
    // users tablosuna provider kolonları ekle
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS google_id TEXT,
      ADD COLUMN IF NOT EXISTS github_id TEXT
    `);
    console.log('✓ Added google_id and github_id columns to users table');

    // Şimdi GitHub ve Google için ayrı user'lar oluştur
    // Önce mevcut user'ı al
    const existing = await pool.query('SELECT id, email, name FROM users WHERE email = $1', ['nafiozdemir231@gmail.com']);
    console.log('Existing user:', existing.rows[0]);

    console.log('\nDone! Now each OAuth provider will create a separate user.');

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

fix();
