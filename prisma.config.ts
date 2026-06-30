import { defineConfig } from 'prisma/config';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined');
}

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    provider: 'postgresql',
    url: {
      fromEnvVar: 'DATABASE_URL',
    },
  },
});
