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

async function test() {
  try {
    // GitHub OAuth user'ın session bilgisi
    const accounts = await pool.query(`
      SELECT a.provider, a.provider_account_id, u.id as user_id, u.email 
      FROM accounts a 
      JOIN users u ON a.user_id = u.id 
      WHERE a.provider IN ('google', 'github')
    `);
    console.log('=== OAuth Accounts ===');
    accounts.rows.forEach(a => console.log(`provider: ${a.provider}\n  provider_account_id: ${a.provider_account_id}\n  user_id: ${a.user_id}\n  email: ${a.email}\n`));

    // llm_configs
    const configs = await pool.query('SELECT id, user_id, model_name FROM llm_configs');
    console.log('=== LLM Configs ===');
    configs.rows.forEach(c => console.log(`id: ${c.id}\n  user_id: ${c.user_id}\n  model: ${c.model_name}\n`));

    // Prisma'da user modelinin id'si text mi?
    console.log('\n=== Checking if user_id is UUID or text ===');
    const config = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'llm_configs' AND column_name = 'user_id'
    `);
    console.log('llm_configs.user_id data_type:', config.rows[0]?.data_type);

    const user = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'id'
    `);
    console.log('users.id data_type:', user.rows[0]?.data_type);

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

test();
