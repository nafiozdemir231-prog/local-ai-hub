const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function test() {
  const userId = 'e90c7723-cc13-4788-bedc-45ea75668e79';
  
  // User var mı?
  const user = await pool.query('SELECT id, email, provider, name FROM users WHERE id = $1', [userId]);
  console.log('User bulundu:', user.rows);
  
  // Config var mı?
  const configs = await pool.query('SELECT id, model_name, user_id FROM llm_configs WHERE user_id = $1', [userId]);
  console.log('Config sayısı:', configs.rows.length);
  
  // Tüm user'lar
  const allUsers = await pool.query('SELECT id, email, provider, name FROM users ORDER BY created_at DESC');
  console.log('\nTüm users:');
  allUsers.rows.forEach(u => console.log(`  ${u.provider} | ${u.email} | ${u.id}`));
  
  await pool.end();
}

test().catch(console.error);
