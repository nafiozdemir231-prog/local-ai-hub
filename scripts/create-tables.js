const { Client } = require('pg');

const client = new Client({
  host: 'db.rmjmgbxbpflrwdeepppi.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'tbXcG3HJfwHsC8vY',
  ssl: { rejectUnauthorized: false },
});

const createTables = async () => {
  try {
    await client.connect();
    console.log('✅ Connected to Supabase');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        email_verified TIMESTAMPTZ,
        image TEXT,
        role TEXT DEFAULT 'user',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log('✅ users table created');

    // Accounts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        type TEXT,
        provider TEXT,
        provider_account_id TEXT,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INT,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        UNIQUE(provider, provider_account_id)
      );
    `);
    console.log('✅ accounts table created');

    // Sessions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        session_token TEXT UNIQUE,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        expires TIMESTAMPTZ
      );
    `);
    console.log('✅ sessions table created');

    // LLM Configs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS llm_configs (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        platform TEXT,
        vram TEXT,
        ram TEXT,
        hardware_model TEXT,
        model_name TEXT,
        quantization TEXT,
        context_size INT,
        kv_cache TEXT,
        pp_speed FLOAT,
        tg_speed FLOAT,
        note TEXT,
        llm_runner TEXT,
        general_settings TEXT,
        star_count INT DEFAULT 0,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('✅ llm_configs table created');

    // Comments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS comments (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        content TEXT,
        config_id TEXT REFERENCES llm_configs(id) ON DELETE CASCADE,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('✅ comments table created');

    // Config Votes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS config_votes (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        config_id TEXT REFERENCES llm_configs(id) ON DELETE CASCADE,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(user_id, config_id)
      );
    `);
    console.log('✅ config_votes table created');

    // Model Ratings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS model_ratings (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        model_name TEXT,
        config_id TEXT REFERENCES llm_configs(id) ON DELETE SET NULL,
        category TEXT,
        rating INT DEFAULT 0,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(user_id, model_name, category)
      );
    `);
    console.log('✅ model_ratings table created');

    console.log('\n🎉 All tables created successfully!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
};

createTables();
