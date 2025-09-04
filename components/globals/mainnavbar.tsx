'use client'
import { logo } from '@/public/images'
import { Button, user } from '@heroui/react'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import LightDarkToggle from './lightdarktoggle'

const MainNavbar = () => {
    const router = useRouter()
  return (
    <div className="p-2 bg-surface-light border-b-1.5 border-borderline-light flex justify-between items-center dark:bg-[#151515] dark:border-borderline-dark">
        <div className="">
            <Image src={logo} alt='logo' width={160} height={160} className='dark:invert' onClick={()=>router.push('/')}></Image>
        </div>
        <div className="flex items-center gap-2">
            <Button className='bg-primarymain text-white' radius='none' onClick={()=>router.push('/sign-in')}>Sign In</Button>
            <LightDarkToggle></LightDarkToggle>
        </div>
    </div>
  )
}

export default MainNavbar