import TransactionVerification from '@/components/cards/TransactionVerification'
import MainNavbar from '@/components/globals/mainnavbar'
import React from 'react'

const page = () => {
  return (
    <div>
        <MainNavbar></MainNavbar>
        <div className="">
            <TransactionVerification></TransactionVerification>
        </div>
    </div>
  )
}

export default page