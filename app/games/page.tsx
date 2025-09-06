import GetActiveGames from '@/components/cards/getActiveGames'
import MainNavbar from '@/components/globals/mainnavbar'
import React from 'react'

const GamesPage = () => {
  return (
    <div className='dark:bg-surface-dark h-full'>
        <MainNavbar></MainNavbar>
        <div className="p-4">
            <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200'>Active Games</h1>
            <p className='text-sm text-gray-600 dark:text-gray-300'>Here is a list of all the active and upcoming games</p>
        </div>

        <div className="">
            <GetActiveGames></GetActiveGames>
        </div>

    </div>
  )
}

export default GamesPage