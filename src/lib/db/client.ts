import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Environment değişkenlerini kontrol et
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

// Singleton için tip tanımı
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// PrismaClient oluştur veya mevcut olanı kullan (singleton pattern)
export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  (() => {
    // PostgreSQL connection pool oluştur
    const pool = new Pool({
      connectionString: DATABASE_URL,
    });

    // Prisma adapter ile bağlan
    const adapter = new PrismaPg(pool);

    // v7'de PrismaClient constructor'a adapter geçiyoruz
    return new PrismaClient({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      adapter: adapter as any,
    });
  })();

// Development'da hot reload için global'e ata
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Cleanup helper (isteğe bağlı, test/teardown için)
export const disconnectPrisma = async () => {
  if (globalForPrisma.prisma) {
    await globalForPrisma.prisma.$disconnect();
    globalForPrisma.prisma = undefined;
  }
};
