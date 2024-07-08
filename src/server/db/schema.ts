import { sql } from "drizzle-orm"
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const createTable = pgTableCreator(
  (name) => `baduk_club_db_${name}`,
)

function idCols() {
  return {
    id: serial("id").primaryKey(),
  }
}

function dateTimeCols() {
  return {
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
}

function imageUrlCol() {
  return {
    imageUrl: varchar("image_url", { length: 2_048 }),
  }
}

export const players = createTable(
  "players",
  {
    ...idCols(),
    email: varchar("email", { length: 256 })
      .unique()
      .notNull(),
    ...dateTimeCols(),
    ...imageUrlCol(),
  },
  (table) => ({
    emailIdx: index("players_email_idx").on(table.email),
  }),
)
