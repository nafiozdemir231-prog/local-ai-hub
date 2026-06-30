const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function check() {
  const userId = 'e90c7723-cc13-4788-bedc-45ea75668e79';
  
  // 1. User var mı?
  const users = await pool.query('SELECT id, email, name, provider FROM users WHERE id = $1', [userId]);
  console.log('\n=== USER ===');
  console.log(users.rows);
  
  // 2. Config'ler var mı?
  const configs = await pool.query('SELECT id, model_name, user_id FROM llm_configs WHERE user_id = $1', [userId]);
  console.log('\n=== CONFIGS ===');
  console.log(configs.rows);
  
  // 3. Tüm config'ler (tüm user'lar)
  const allConfigs = await pool.query('SELECT id, model_name, user_id FROM llm_configs ORDER BY created_at DESC LIMIT 10');
  console.log('\n=== ALL CONFIGS ===');
  console.log(allConfigs.rows);
  
  // 4. User kolon ismi ne? (llm_configs tablosunda)
  const colInfo = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'llm_configs'
  `);
  console.log('\n=== LLM_CONFIGS COLUMNS ===');
  console.log(colInfo.rows);
  
  await pool.end();
}

check().catch(console.error);
