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
    // Users
    const users = await pool.query('SELECT id, email, name, role FROM users');
    console.log('--- Users ---');
    users.rows.forEach(u => console.log(`id: ${u.id}\n  email: ${u.email}\n  name: ${u.name}\n  role: ${u.role}\n`));

    // Configs
    const configs = await pool.query('SELECT id, user_id, model_name FROM llm_configs');
    console.log('--- LLM Configs ---');
    configs.rows.forEach(c => console.log(`id: ${c.id}\n  user_id: ${c.user_id}\n  model: ${c.model_name}\n`));

    // Check if any user_id in configs matches users
    if (configs.rows.length > 0 && users.rows.length > 0) {
      const matching = configs.rows.filter(c => users.rows.some(u => u.id === c.user_id));
      console.log(`\nMatching configs: ${matching.length}/${configs.rows.length}`);
    }

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

check();
