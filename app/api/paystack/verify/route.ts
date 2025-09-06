import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  try {
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const result = await verifyRes.json();

    if (result.status && result.data.status === "success") {
      // ✅ Parse metadata
      const userId = result.data.metadata.userId;
      const plan = result.data.metadata.plan;

      // Decide duration based on plan
      let premiumUntil = new Date();
      if (plan === "weekly") {
        premiumUntil.setDate(premiumUntil.getDate() + 7);
      } else if (plan === "monthly") {
        premiumUntil.setMonth(premiumUntil.getMonth() + 1);
      }

      // Update user subscription
      await prisma.user.update({
        where: { id: userId },
        data: {
          isPremium: true,
          premiumUntil,
        },
      });

      return NextResponse.json({ success: true, data: result.data });
    }

    return NextResponse.json({ success: false, data: result.data }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
