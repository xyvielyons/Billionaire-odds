import ResetPassword from '@/components/forms/reset-form'
import React from 'react'

const page = () => {
  return (
    <div className='flex items-center justify-center h-screen
    bg-[radial-gradient(50%_50%_at_50%_50%,#02A95D_0%,#FFFFFF_100%)]
    dark:bg-[radial-gradient(50%_50%_at_50%_50%,#02A95D_0%,#000000_100%)]'>
        <ResetPassword></ResetPassword>
    </div>
  )
}

export default page