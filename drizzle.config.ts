import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema/index.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["workforge.team_*"],
  migrations: {
    prefix: "timestamp", // Prevents migration ordering issues
  },
} satisfies Config;
