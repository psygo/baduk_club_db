import {
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { games } from "@db"

export type SelectGame = InferSelectModel<typeof games>
export type InsertGame = InferInsertModel<typeof games>

export const gameInsertSchema = createInsertSchema(games)
