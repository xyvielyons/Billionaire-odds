import React from 'react'
import SignUp from '@/components/forms/signup-form'
const page = () => {
  return (
    <div
  className="
    flex items-center justify-center h-screen pt-[80px] md:pt-[4px]
    bg-[radial-gradient(50%_50%_at_50%_50%,#02A95D_0%,#FFFFFF_100%)]
    dark:bg-[radial-gradient(50%_50%_at_50%_50%,#02A95D_0%,#000000_100%)]
    
  "
>
  <SignUp />
</div>
  )
}

export default page