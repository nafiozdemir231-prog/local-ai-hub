const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function clearAll() {
  try {
    // 1. Tüm config'leri sil (foreign key sırayla)
    console.log('Deleting config_votes...');
    await pool.query('DELETE FROM config_votes');
    
    console.log('Deleting comments...');
    await pool.query('DELETE FROM comments');
    
    console.log('Deleting model_ratings...');
    await pool.query('DELETE FROM model_ratings');
    
    console.log('Deleting llm_configs...');
    await pool.query('DELETE FROM llm_configs');
    
    // 2. Tüm user'ları sil (demo user hariç OAuth user'lar da silinsin)
    console.log('Deleting all users...');
    await pool.query('DELETE FROM users');
    
    // 3. Sayıları kontrol et
    const configs = await pool.query('SELECT COUNT(*) FROM llm_configs');
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const votes = await pool.query('SELECT COUNT(*) FROM config_votes');
    const comments = await pool.query('SELECT COUNT(*) FROM comments');
    const ratings = await pool.query('SELECT COUNT(*) FROM model_ratings');
    
    console.log('\n=== TEMİZLENMİŞ VERİTABANI ===');
    console.log(`Configler: ${configs.rows[0].count}`);
    console.log(`Users: ${users.rows[0].count}`);
    console.log(`Votes: ${votes.rows[0].count}`);
    console.log(`Comments: ${comments.rows[0].count}`);
    console.log(`Model Ratings: ${ratings.rows[0].count}`);
    console.log('================================');
    
    await pool.end();
    console.log('\n✅ Tüm veriler temizlendi!');
  } catch (err) {
    console.error('HATA:', err.message);
    await pool.end();
    process.exit(1);
  }
}

clearAll();
