import {
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { members } from "@db"

export type SelectMember = InferSelectModel<typeof members>
export type InsertMember = InferInsertModel<typeof members>

export const memberInsertSchema =
  createInsertSchema(members)
