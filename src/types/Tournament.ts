import {
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { tournaments } from "@db"

export type SelectTournament = InferSelectModel<
  typeof tournaments
>
export type InsertTournament = InferInsertModel<
  typeof tournaments
>

export const tournamentInsertSchema =
  createInsertSchema(tournaments)
