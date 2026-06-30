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
    // Accounts tablosu
    const accounts = await pool.query(`
      SELECT provider, provider_account_id, user_id 
      FROM accounts 
      ORDER BY provider
    `);
    console.log('=== OAuth Accounts ===');
    accounts.rows.forEach(a => console.log(`provider: ${a.provider}\n  provider_account_id: ${a.provider_account_id}\n  user_id: ${a.user_id}\n`));

    // Users tablosu
    const users = await pool.query('SELECT id, email, name, role FROM users');
    console.log('\n=== Users ===');
    users.rows.forEach(u => console.log(`id: ${u.id}\n  email: ${u.email}\n  name: ${u.name}\n  role: ${u.role}\n`));

    // Her account için user eşleşmesi
    console.log('\n=== Account → User Mapping ===');
    accounts.rows.forEach(a => {
      const user = users.rows.find(u => u.id === a.user_id);
      console.log(`${a.provider} (${a.provider_account_id}) → user_id: ${a.user_id.substring(0,8)}... → ${user ? user.email : 'NOT FOUND'}`);
    });

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

check();
