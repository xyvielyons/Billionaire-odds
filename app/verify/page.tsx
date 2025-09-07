import TransactionVerification from '@/components/cards/TransactionVerification'
import MainNavbar from '@/components/globals/mainnavbar'
import React from 'react'
import { Suspense } from "react";
const page = () => {
  return (
    <div>
        <MainNavbar></MainNavbar>
        <div className="">
        <Suspense fallback={<div className="p-6">Loading verification...</div>}>
          <TransactionVerification />
        </Suspense>
        </div>
    </div>
  )
}

export default page