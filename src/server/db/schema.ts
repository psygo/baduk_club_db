import { relations, sql } from "drizzle-orm"
import {
  boolean,
  date,
  index,
  integer,
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
    imageUrl: varchar("image_url"),
  }
}

export const members = createTable(
  "members",
  {
    ...idCols(),
    ...dateTimeCols(),
    ...imageUrlCol(),
    email: varchar("email").unique().notNull(),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
  },
  (table) => ({
    emailIdx: index("players_email_idx").on(table.email),
  }),
)

export const tournaments = createTable("tournaments", {
  ...idCols(),
  ...dateTimeCols(),
  ...imageUrlCol(),
  name: varchar("name").notNull(),
  description: varchar("description"),
  date: varchar("date"),
  city: varchar("city"),
  state: varchar("state"),
  country: varchar("country"),
})

export const games = createTable("games", {
  ...idCols(),
  ...dateTimeCols(),
  ...imageUrlCol(),
  init_date: date("init_date"),
  round: varchar("round"),
  komi: integer("komi").default(6.5),
  result: varchar("result").notNull(),
  sgf: varchar("sgf"),
  online: boolean("online"),
  exclude: boolean("exclude"),
  rated: boolean("rated"),
  blackId: integer("black_id").notNull(),
  blackRating: integer("black_rating").notNull(),
  whiteId: integer("white_id").notNull(),
  whiteRating: integer("black_rating").notNull(),
  tournamentId: integer("tournament_id"),
})

export const gamesRelations = relations(
  games,
  ({ one }) => ({
    black: one(members, {
      fields: [games.blackId],
      references: [members.id],
    }),
    white: one(members, {
      fields: [games.whiteId],
      references: [members.id],
    }),
    tournament: one(tournaments, {
      fields: [games.tournamentId],
      references: [tournaments.id],
    }),
  }),
)
