import { NextResponse } from "next/server"

import { db, games } from "@db"

import { gameInsertSchema } from "@types"
import { desc, eq, or } from "drizzle-orm"

export async function POST(req: Request) {
  try {
    const gameData = gameInsertSchema.parse(
      await req.json(),
    )

    const blackId = gameData.blackId
    const whiteId = gameData.whiteId

    // 1. Take the last game's ratings of each player

    const lastBlackGame = await db
      .select()
      .from(games)
      .where(
        or(
          eq(games.blackId, blackId),
          eq(games.whiteId, blackId),
        ),
      )
      .orderBy(desc(games.createdAt))

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
