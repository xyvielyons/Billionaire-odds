import MainNavbar from '@/components/globals/mainnavbar';
import SecondaryNavbar from '@/components/globals/secondarynavbar';
import { logo } from '@/public/images';
import Image from 'next/image';
import React from 'react'

const MainLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='dark:bg-surface-dark h-full max-w-7xl mx-auto'>
      <div className="fixed w-full z-30 max-w-7xl">
        <MainNavbar></MainNavbar>
        <SecondaryNavbar></SecondaryNavbar>
      </div>

      <div className="w-full">
        {children}
      </div>
        
    </div>
  )
}

export default MainLayout