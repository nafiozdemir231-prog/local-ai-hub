import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

try {
  const configs = await prisma.lLMConfig.findMany({
    select: { id: true, updatedAt: true },
  });
  console.log("COUNT:", configs.length);
  console.log(JSON.stringify(configs.slice(0, 2), null, 2));
} catch (error) {
  console.error("QUERY_FAILED:", error.message);
} finally {
  await prisma.$disconnect();
}
