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
    const configs = await pool.query('SELECT id, user_id, model_name FROM llm_configs');
    console.log('--- llm_configs ---');
    configs.rows.forEach(c => console.log(`id: ${c.id} | user_id: ${c.user_id} | model: ${c.model_name}`));

    // GitHub OAuth user'ın session bilgisi
    const sessions = await pool.query('SELECT user_id, session_token FROM sessions');
    console.log('\n--- Sessions ---');
    sessions.rows.forEach(s => console.log(`user_id: ${s.user_id}`));

    // Accounts
    const accounts = await pool.query('SELECT user_id, provider, provider_account_id FROM accounts');
    console.log('\n--- Accounts ---');
    accounts.rows.forEach(a => console.log(`user_id: ${a.user_id} | provider: ${a.provider} | provider_account_id: ${a.provider_account_id}`));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

check();
