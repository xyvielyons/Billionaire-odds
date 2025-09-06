'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
const TransactionVerification = () => {
    const searchParams = useSearchParams()
    const reference = searchParams.get("reference")
    const [status, setStatus] = useState("Verifying...")
    useEffect(() => {
        if (reference) {
          fetch(`/api/paystack/verify?reference=${reference}`)
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                setStatus("✅ Payment successful! Premium activated.")
              } else {
                setStatus("❌ Payment failed or not verified.")
              }
            })
        }
      }, [reference])
    return (
        <div className="p-6">{status}</div>
    
    )
}

export default TransactionVerification