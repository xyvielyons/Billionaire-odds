import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as dfnsTz from "date-fns-tz";

export async function GET() {
  try {
    // Get the current Nairobi time as a JS Date
    const now = dfnsTz.toZonedTime(new Date(), "Africa/Nairobi");

    const games = await prisma.game.findMany({
      where: {
        status: { not: "finished" },
      },
    });

    for (const game of games) {
      // Build the datetime string in Nairobi timezone
      const matchDateStr = game.matchDate.toISOString().split("T")[0]; 
      const dateTimeString = `${matchDateStr}T${game.matchTime}`;

      // Interpret this string as a Nairobi datetime
      const matchDateTime = dfnsTz.toZonedTime(new Date(dateTimeString), "Africa/Nairobi");

      // Compare in Nairobi time
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
    return NextResponse.json({ success: false, error: "Cron failed" }, { status: 500 });
  }
}
