import { z } from "zod"

import { NextResponse } from "next/server"

import { db, members } from "@db"

const memberInsertSchema = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const memberData = memberInsertSchema.parse(
      await req.json(),
    )

    const memberInsertData = await db
      .insert(members)
      .values({
        ...memberData,
      })
      .returning()

    return NextResponse.json(memberInsertData)
  } catch (e) {
    console.error(e)
  }
}
