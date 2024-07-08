import { NextResponse } from "next/server"

import { db, games } from "@db"

import { gameInsertSchema } from "@types"

export async function POST(req: Request) {
  try {
    const gameData = gameInsertSchema.parse(
      await req.json(),
    )

    const gameInsertData = await db
      .insert(games)
      .values({
        ...gameData,
      })
      .returning()

    return NextResponse.json(gameInsertData)
  } catch (e) {
    console.error(e)
  }
}

export async function GET() {
  try {
    const gameSelectData = await db.select().from(games)

    return NextResponse.json(gameSelectData)
  } catch (e) {
    console.error(e)
  }
}
