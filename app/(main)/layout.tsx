import MainNavbar from '@/components/globals/mainnavbar';
import { logo } from '@/public/images';
import Image from 'next/image';
import React from 'react'

const MainLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='dark:bg-[#151515] h-screen'>
      <MainNavbar></MainNavbar>
      <div className="">
        {children}
      </div>
        
    </div>
  )
}

export default MainLayout