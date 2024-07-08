import { desc, eq, or } from "drizzle-orm"

import { NextResponse } from "next/server"

import "@utils/array"

import { db, games } from "@db"

import {
  gameInsertSchema,
  type NumberId,
  type SelectGame,
} from "@types"

async function getLastGameFromPlayer(playerId: NumberId) {
  const playerLastGames = await db
    .select()
    .from(games)
    .where(
      or(
        eq(games.blackId, playerId),
        eq(games.whiteId, playerId),
      ),
    )
    .orderBy(desc(games.createdAt))
    .limit(1)
  const playerLastGame = playerLastGames.first()

  return playerLastGame
}

function getPlayerRating(
  playerId: NumberId,
  game: SelectGame,
) {
  return playerId === game.blackId
    ? game.blackRating
    : game.whiteRating
}

function calculateNewRatings(
  blackRating: number,
  whiteRating: number,
  result: string,
) {
  const blackWins = result?.includes("B")

  return {
    newBlackRating: blackWins
      ? blackRating + 10
      : blackRating - 10,
    newWhiteRating: blackWins
      ? whiteRating + 10
      : whiteRating - 10,
  }
}

export async function POST(req: Request) {
  try {
    const gameData = gameInsertSchema.parse(
      await req.json(),
    )

    const blackId = gameData.blackId
    const whiteId = gameData.whiteId

    // 1. Take the last game's ratings of each player

    const lastBlackGame =
      await getLastGameFromPlayer(blackId)
    const lastWhiteGame =
      await getLastGameFromPlayer(whiteId)

    const lastBlackRating = getPlayerRating(
      blackId,
      lastBlackGame,
    )
    const lastWhiteRating = getPlayerRating(
      blackId,
      lastWhiteGame,
    )

    // 2. Calculate the New Ratings

    const { newBlackRating, newWhiteRating } =
      calculateNewRatings(
        lastBlackRating,
        lastWhiteRating,
        gameData.result,
      )

    // 3. Create the Game

    const gameInsertData = await db
      .insert(games)
      .values({
        ...gameData,
        blackRating: newBlackRating,
        whiteRating: newWhiteRating,
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
