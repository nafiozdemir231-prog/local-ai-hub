const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  connectionString: 'postgresql://postgres:tbXcG3HJfwHsC8vY@db.rmjmgbxbpflrwdeepppi.supabase.co:5432/postgres'
});

(async () => {
  try {
    await client.connect();
    console.log('✅ Supabase bağlantısı başarılı');

    const result = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    const tables = result.rows;
    console.log('📋 Toplam', tables.length, 'tablo bulundu');

    let sql = '-- Local AI Hub DB Dump\n';

    for (const t of tables) {
      console.log('📦 Döküm yapılıyor:', t.table_name, '...');
      const data = await client.query('SELECT * FROM "' + t.table_name + '"');
      
      if (data.rowCount > 0) {
        sql += 'INSERT INTO "' + t.table_name + '" VALUES ';
        const vals = data.rows.map(r => {
          return '(' + Object.values(r).map(v => {
            if (v === null) return 'NULL';
            const s = String(v).replace(/'/g, "''");
            return "'" + s + "'";
          }).join(',') + ')';
        }).join(',\n');
        sql += vals + ';\n\n';
      } else {
        sql += '-- Tablo boş: ' + t.table_name + '\n\n';
      }
    }

    fs.writeFileSync('db_dump.sql', sql);
    console.log('\n🎉 Export tamamlandı! db_dump.sql dosyasına kaydedildi.');
    console.log('📄 Dosya boyutu:', (fs.statSync('db_dump.sql').size / 1024).toFixed(2), 'KB');
  } catch (err) {
    console.error('❌ Hata:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
})();
