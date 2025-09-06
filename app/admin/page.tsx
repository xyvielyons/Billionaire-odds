import AddGames from '@/components/forms/Add-games'
import MainNavbar from '@/components/globals/mainnavbar'
import React from 'react'

const AdminPage = () => {
  return (
    <div className='dark:bg-surface-dark h-full'>
      <MainNavbar></MainNavbar>
      <div className="p-4">
        <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>Admin Portal</h1>
        <p className='text-sm text-gray-600 dark:text-gray-300'>Fill in the new upcoming games.</p>
      </div>
      
      <div className="p-4">
        
        <AddGames></AddGames>
      </div>

    </div>
  )
}

export default AdminPage