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
    console.log('✓ Added google_id and github_id columns');

    // Mevcut kullanıcıları kontrol et
    const users = await pool.query('SELECT id, email, name, google_id, github_id FROM users');
    console.log('\n=== Current Users ===');
    users.rows.forEach(u => {
      console.log(`id: ${u.id.substring(0,8)}...`);
      console.log(`  email: ${u.email}`);
      console.log(`  name: ${u.name}`);
      console.log(`  google_id: ${u.google_id || 'NULL'}`);
      console.log(`  github_id: ${u.github_id || 'NULL'}`);
    });

    // accounts tablosunu kontrol et
    const accounts = await pool.query(`
      SELECT provider, provider_account_id, user_id 
      FROM accounts 
      ORDER BY provider
    `);
    console.log('\n=== Accounts ===');
    accounts.rows.forEach(a => {
      console.log(`provider: ${a.provider}`);
      console.log(`  provider_account_id: ${a.provider_account_id}`);
      console.log(`  user_id: ${a.user_id.substring(0,8)}...`);
    });

    if (accounts.rows.length === 0) {
      console.log('\n⚠ accounts tablosu boş — NextAuth accounts tablosunu kullanmıyor olabilir.');
      console.log('  Bu, JWT stratejisinde accounts otomatik oluşturulmadığından kaynaklanıyor.');
    }

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

fix();
