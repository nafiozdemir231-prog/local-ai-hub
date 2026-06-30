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
    // Users tablosu
    const users = await pool.query('SELECT id, email, name, role FROM users');
    console.log('=== USERS ===');
    users.rows.forEach(u => console.log(`id: ${u.id}\n  email: ${u.email}\n  name: ${u.name}\n  role: ${u.role}\n`));

    // Configs tablosu
    const configs = await pool.query('SELECT id, user_id, model_name, platform FROM llm_configs');
    console.log('=== LLM_CONFIGS ===');
    configs.rows.forEach(c => console.log(`id: ${c.id}\n  user_id: ${c.user_id}\n  model: ${c.model_name}\n  platform: ${c.platform}\n`));

    // Eşleşme kontrolü
    console.log('=== MATCHING ===');
    configs.rows.forEach(c => {
      const user = users.rows.find(u => u.id === c.user_id);
      console.log(`Config ${c.id.substring(0, 8)}... user_id: ${c.user_id.substring(0, 8)}... match: ${user ? user.email : 'NO MATCH'}`);
    });

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

check();
