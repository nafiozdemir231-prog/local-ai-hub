const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  const email = 'nafiozdemir231@gmail.com';
  const provider = 'google';
  
  // Raw SQL ile provider + email'e göre user bul
  const result = await pool.query(
    'SELECT id, name, email, role FROM users WHERE email = $1 AND provider = $2 LIMIT 1',
    [email, provider]
  );
  
  console.log('\n=== RAW SQL RESULT ===');
  console.log(result.rows);
  
  // Eğer bulunamazsa yeni user oluştur
  if (result.rows.length === 0) {
    const newId = require('crypto').randomUUID();
    await pool.query(
      'INSERT INTO users (id, email, name, role, provider) VALUES ($1, $2, $3, $4, $5)',
      [newId, email, 'Test User', 'user', provider]
    );
    console.log(`\nNEW USER CREATED: ${newId}`);
  }
  
  await pool.end();
}

test().catch(console.error);
