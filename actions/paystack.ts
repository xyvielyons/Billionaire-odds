"use server";
import prisma from '@/lib/prisma'

export async function initializePaystackTransaction(email: string, amount: number, callback:string,id:string,plan:string) {
  try {
    console.log(id)
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callback_url:callback,
        email,
        amount, // amount in kobo (NGN minor unit). Example: 500000 = ₦5,000
        channels:["card", "bank", "apple_pay", "ussd", "qr", "mobile_money", "bank_transfer", "eft"],
        metadata: JSON.stringify({
          userId: id,
          plan,
        }),
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Paystack init error:", error);
    throw new Error("Unable to initialize transaction");
  }
}
