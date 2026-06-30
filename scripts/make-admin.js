const { Pool } = require('pg');
require('dotenv').config({ path: '.env' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function makeAdmin() {
  try {
    // Google user'ı bul
    const googleUser = await pool.query("SELECT id, email, name FROM users WHERE provider = 'google'");
    
    if (googleUser.rows.length === 0) {
      console.log('❌ Google user bulunamadı!');
      await pool.end();
      return;
    }
    
    const user = googleUser.rows[0];
    console.log(`Admin yapılacak user: ${user.name} <${user.email}>`);
    console.log(`User ID: ${user.id}`);
    
    // Role'u admin yap
    await pool.query("UPDATE users SET role = 'admin' WHERE id = $1", [user.id]);
    
    // Kontrol et
    const updated = await pool.query("SELECT id, email, name, role, provider FROM users");
    
    console.log('\n=== GÜNCEL KULLANICILAR ===');
    updated.rows.forEach(u => {
      console.log(`  ${u.provider} | ${u.email} | role: ${u.role}`);
    });
    console.log('===========================\n');
    
    await pool.end();
    console.log('✅ Google user admin yapıldı!');
  } catch (err) {
    console.error('HATA:', err.message);
    await pool.end();
    process.exit(1);
  }
}

makeAdmin();
