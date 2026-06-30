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

async function cleanup() {
  try {
    // 1. Demo user'ın config'lerini sil
    const demoUserId = '1';

    const configsRes = await pool.query('SELECT COUNT(*) as count FROM llm_configs WHERE user_id = $1', [demoUserId]);
    console.log('Demo user configs:', configsRes.rows[0].count);

    await pool.query('DELETE FROM model_ratings WHERE user_id = $1', [demoUserId]);
    console.log('✅ Model ratings deleted');

    await pool.query('DELETE FROM comments WHERE user_id = $1', [demoUserId]);
    console.log('✅ Comments deleted');

    await pool.query('DELETE FROM config_votes WHERE user_id = $1', [demoUserId]);
    console.log('✅ Votes deleted');

    await pool.query('DELETE FROM llm_configs WHERE user_id = $1', [demoUserId]);
    console.log('✅ Configs deleted');

    // 2. Demo user'u sil
    await pool.query('DELETE FROM accounts WHERE user_id = $1', [demoUserId]);
    await pool.query('DELETE FROM sessions WHERE user_id = $1', [demoUserId]);
    await pool.query('DELETE FROM users WHERE id = $1', [demoUserId]);
    console.log('✅ Demo user deleted');

    // 3. Kalan kullanıcıları kontrol et
    const usersRes = await pool.query('SELECT COUNT(*) as count FROM users');
    console.log('\nRemaining users:', usersRes.rows[0].count);

    const users = await pool.query('SELECT id, name, email, role FROM users');
    console.log('\n--- Remaining Users ---');
    users.rows.forEach(u => {
      console.log(`ID: ${u.id} | Name: ${u.name} | Email: ${u.email} | Role: ${u.role}`);
    });

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
  }
}

cleanup();
