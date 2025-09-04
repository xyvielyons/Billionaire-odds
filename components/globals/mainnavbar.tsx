'use client'
import { logo } from '@/public/images'
import { Button, user } from '@heroui/react'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const MainNavbar = () => {
    const router = useRouter()
  return (
    <div className="p-2 bg-surface-light border-b-2 border-borderline-light flex justify-between">
        <div className="">
            <Image src={logo} alt='logo' width={160} height={160}></Image>
        </div>
        <div className="">
            <Button className='bg-primarymain text-white' radius='sm' onClick={()=>router.push('/sign-in')}>Sign In</Button>
        </div>
    </div>
  )
}

export default MainNavbar