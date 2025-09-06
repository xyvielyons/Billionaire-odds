import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if different

export async function GET() {
  try {
    const now = new Date();

    // Find all expired premium users
    const expiredUsers = await prisma.user.findMany({
      where: {
        isPremium: true,
        premiumUntil: { lt: now },
      },
    });

    if (expiredUsers.length > 0) {
      await prisma.user.updateMany({
        where: {
          isPremium: true,
          premiumUntil: { lt: now },
        },
        data: {
          isPremium: false,
          premiumUntil: null,
        },
      });
    }

    return NextResponse.json({
      message: "Expired users downgraded",
      count: expiredUsers.length,
    });
  } catch (error) {
    console.error("CRON downgrade error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
