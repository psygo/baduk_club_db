import { type Config } from "drizzle-kit"

import { env } from "@/env"

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["baduk_club_db_*"],
} satisfies Config
