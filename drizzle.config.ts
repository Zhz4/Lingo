import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",  // 将 driver 替换为 dialect，并指定 PostgreSQL 方言
  dbCredentials: {
    url: process.env.DATABASE_URL,  // 确保此环境变量存在
  } as any, 
} satisfies Config;
