'use client'
import React, { useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@heroui/react'
import { initializePaystackTransaction } from '@/actions/paystack'
import { authClient } from '@/auth-client'

const Packages = () => {
    const [loading, setLoading] = useState(false);
    const [loadingM, setMLoading] = useState(false);
    const {data:session} = authClient.useSession();

const handleWeeklyPay = async () => {
    setMLoading(true);
    try {
    const data = await initializePaystackTransaction(session?.user.email || "", 13000);
    console.log("Paystack response:", data);

    // Redirect user to Paystack checkout page
    if (data.status && data.data.authorization_url) {
        window.location.href = data.data.authorization_url;
    }
    } catch (err) {
    console.error(err);
    } finally {
    setMLoading(false);
    }
};
const handleMonthlyPay = async () => {
    setLoading(true);
    try {
    const data = await initializePaystackTransaction(session?.user.email || "", 39000);
    console.log("Paystack response:", data);

    // Redirect user to Paystack checkout page
    if (data.status && data.data.authorization_url) {
        window.location.href = data.data.authorization_url;
    }
    } catch (err) {
    console.error(err);
    } finally {
    setLoading(false);
    }
};
  return (
    <div>
        <div className="gap-2 grid w-full p-4 grid-cols-1 md:grid-cols-2">
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle className='text-gray-800 dark:text-gray-200'>Weekly Plan</CardTitle>
                    <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-200'>$1.00</h1>
                </CardHeader>
                <CardContent className='text-gray-600 dark:text-gray-300 mb-[65px]'>
                    <p>✅ Access to all premium games for 7 days</p>
                    <p>✅ Detailed match analysis</p>
                    <p>✅ No ads</p>
                </CardContent>
                <CardFooter>
                    <Button className='w-full text-gray-800 dark:text-gray-200' radius='none' onClick={()=>handleWeeklyPay()} disabled={loadingM}>{loadingM ? "Processing..." : "Upgrade to Weekly Plan"}</Button>
                </CardFooter>
            </Card>
            <Card className='w-full'>
                <CardHeader>
                    <div className='p-2 bg-green-100 flex items-center justify-center dark:bg-green-800/25 mb-2'>
                        <h1 className='text-sm'>Recommended</h1>
                    </div>
                    <CardTitle className='text-gray-800 dark:text-gray-200'>Monthly Plan</CardTitle>
                    <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-200'>$3.00</h1>
                </CardHeader>
                <CardContent className='text-gray-600 dark:text-gray-300'>
                    <p>✅ Unlimited access for 30 days</p>
                    <p>✅ Priority tips & analysis</p>
                    <p>✅ Detailed match analysis</p>
                    <p>✅ Save 25% vs weekly</p>
                </CardContent>
                <CardFooter>
                    <Button className='w-full bg-primarymain text-white dark:text-gray-200 ' radius='none' onClick={()=>handleMonthlyPay()}> {loading ? "Processing..." : "Upgrade to Monthly Package"}</Button>
                </CardFooter>
            </Card>
        </div>
    </div>
  )
}

export default Packages