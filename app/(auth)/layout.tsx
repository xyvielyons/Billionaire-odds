import { logo } from '@/public/images';
import React from 'react'
import Image from 'next/image';

const AuthLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className=''>
      <div className="">
        {children}
      </div>
        
    </div>
  )
}

export default AuthLayout