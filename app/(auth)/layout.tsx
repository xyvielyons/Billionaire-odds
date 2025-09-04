import React from 'react'

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