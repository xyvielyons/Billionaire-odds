import Packages from '@/components/cards/packages'
import MainNavbar from '@/components/globals/mainnavbar'
import React from 'react'

const UpgradePage = () => {
  return (
    <div>
        <MainNavbar/>
        <div className="p-4">
            <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>Upgrade to Premium</h1>
            <p className='text-sm text-gray-600 dark:text-gray-300'>Choose a plan that works for you</p>
        </div>
        <div className="">
          <Packages></Packages>
        </div>
    </div>
  )
}

export default UpgradePage