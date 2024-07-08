import { NextResponse } from "next/server"

import { db, tournaments } from "@db"

import { tournamentInsertSchema } from "@types"

export async function POST(req: Request) {
  try {
    const tournamentData = tournamentInsertSchema.parse(
      await req.json(),
    )

    const tournamentInsertData = await db
      .insert(tournaments)
      .values({
        ...tournamentData,
      })
      .returning()

    return NextResponse.json(tournamentInsertData)
  } catch (e) {
    console.error(e)
  }
}

export async function GET() {
  try {
    const tournamentSelectData = await db
      .select()
      .from(tournaments)

    return NextResponse.json(tournamentSelectData)
  } catch (e) {
    console.error(e)
  }
}
