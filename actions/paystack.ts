"use server";

export async function initializePaystackTransaction(email: string, amount: number) {
  try {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount, // amount in kobo (NGN minor unit). Example: 500000 = ₦5,000
        channels:["card", "bank", "apple_pay", "ussd", "qr", "mobile_money", "bank_transfer", "eft"]
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Paystack init error:", error);
    throw new Error("Unable to initialize transaction");
  }
}
