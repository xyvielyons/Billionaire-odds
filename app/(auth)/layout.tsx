import LightDarkToggle from '@/components/globals/lightdarktoggle';
import React from 'react'

const AuthLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className="p-2 flex items-center justify-end border-borderline-light dark:border-borderline-dark border-b-1.5 fixed z-10 w-full ">
        <LightDarkToggle></LightDarkToggle>
      </div>
      <div className="">
        {children}
      </div>
        
    </div>
  )
}

export default AuthLayout