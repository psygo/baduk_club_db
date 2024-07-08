import { NextResponse } from "next/server"

import { db, members } from "@db"

import { memberInsertSchema } from "@types"

export async function POST(req: Request) {
  try {
    const memberData = memberInsertSchema.parse(
      await req.json(),
    )

    const memberInsertData = await db
      .insert(members)
      .values(memberData)
      .returning()

    return NextResponse.json(memberInsertData)
  } catch (e) {
    console.error(e)
  }
}

export async function GET() {
  try {
    const memberSelectData = await db.select().from(members)

    return NextResponse.json(memberSelectData)
  } catch (e) {
    console.error(e)
  }
}
