import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { DateTime } from "luxon";

export async function GET() {
  try {
    // ✅ Current Nairobi time
    const now = DateTime.now().setZone("Africa/Nairobi");

    const games = await prisma.game.findMany({
      where: {
        status: { not: "finished" },
      },
    });

    for (const game of games) {
      // Build Nairobi datetime from stored date + time
      const matchDateStr = game.matchDate.toISOString().split("T")[0]; // yyyy-mm-dd
      const dateTimeString = `${matchDateStr}T${game.matchTime}`;      // e.g. "2025-09-07T15:30"

      const matchDateTime = DateTime.fromISO(dateTimeString, {
        zone: "Africa/Nairobi",
      });

      // ✅ Compare directly in Nairobi timezone
      if (now >= matchDateTime) {
        await prisma.game.update({
          where: { id: game.id },
          data: { status: "finished" },
        });
      }
    }

    return NextResponse.json({ success: true, updated: true });
  } catch (err) {
    console.error("Cron error:", err);
    return NextResponse.json(
      { success: false, error: "Cron failed" },
      { status: 500 }
    );
  }
}
