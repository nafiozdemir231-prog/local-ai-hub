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

async function fix() {
  try {
    // Email unique constraint'ini kaldır
    await pool.query(`
      DO $$ BEGIN
        BEGIN
          ALTER TABLE users DROP CONSTRAINT users_email_key;
        EXCEPTION WHEN undefined_object THEN RAISE NOTICE 'Constraint already removed';
        END;
      END $$;
    `);
    console.log('✓ Removed email unique constraint');

    // provider kolonu ekle
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS provider TEXT
    `);
    console.log('✓ Added provider column');

    // Mevcut kullanıcıya provider ata (varsayılan)
    await pool.query(`UPDATE users SET provider = 'email' WHERE provider IS NULL`);
    console.log('✓ Set default provider for existing users');

    // Şimdi users tablosu yapısını kontrol et
    const cols = await pool.query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'users' AND table_schema = 'public'
      ORDER BY ordinal_position
    `);
    console.log('\n=== Users Table Structure ===');
    cols.rows.forEach(c => {
      console.log(`${c.column_name}: ${c.data_type} (nullable: ${c.is_nullable})`);
    });

    // Mevcut kullanıcılar
    const users = await pool.query('SELECT id, email, name, provider FROM users');
    console.log('\n=== Users ===');
    users.rows.forEach(u => {
      console.log(`id: ${u.id.substring(0,8)}... | email: ${u.email} | name: ${u.name} | provider: ${u.provider}`);
    });

    console.log('\n✅ Done! Now GitHub and Google can be separate users.');

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

fix();
