const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function debug() {
  const googleUserId = 'e90c7723-cc13-4788-bedc-45ea75668e79';
  const otherUserId = '810dafdb-5727-42b2-abbc-f9787390aeb6';
  
  // Tüm user'ları göster
  const users = await pool.query('SELECT id, email, name, provider FROM users');
  console.log('\n=== ALL USERS ===');
  users.rows.forEach(u => console.log(`  ${u.provider} | ${u.email} | ${u.id}`));
  
  // Google user'a ait config'ler
  const googleConfigs = await pool.query('SELECT id, model_name, user_id FROM llm_configs WHERE user_id = $1', [googleUserId]);
  console.log(`\n=== GOOGLE USER (${googleUserId}) CONFIGS: ${googleConfigs.rows.length} ===`);
  console.log(googleConfigs.rows);
  
  // Other user'a ait config'ler
  const otherConfigs = await pool.query('SELECT id, model_name, user_id FROM llm_configs WHERE user_id = $1', [otherUserId]);
  console.log(`\n=== OTHER USER (${otherUserId}) CONFIGS: ${otherConfigs.rows.length} ===`);
  console.log(otherConfigs.rows);
  
  // Tüm config'ler
  const allConfigs = await pool.query('SELECT id, model_name, user_id, created_at FROM llm_configs ORDER BY created_at DESC');
  console.log(`\n=== ALL CONFIGS (${allConfigs.rows.length}) ===`);
  allConfigs.rows.forEach(c => console.log(`  ${c.model_name} | user: ${c.user_id} | ${c.created_at}`));
  
  await pool.end();
}

debug().catch(console.error);
