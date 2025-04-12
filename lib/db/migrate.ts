import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Use a direct connection just for migration
const migrationClient = postgres("postgres://postgres.bkhcxgtvrwxtoutgatqu:bhavyaanand123@aws-0-us-east-2.pooler.supabase.com:6543/postgres", { max: 1 });
const migrationDb = drizzle(migrationClient, { schema });

const runMigrate = async () => {
  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(migrationDb, { migrationsFolder: "lib/db/migrations" });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});