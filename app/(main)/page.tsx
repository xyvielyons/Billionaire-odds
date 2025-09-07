import MainBetslip from '@/components/cards/MainBetslip'
import MainOddBuilder from '@/components/pages/MainOddBuilder'
import React from 'react'

const page = () => {
  return (
    <div className="p-4 space-y-2 md:pt-[170px] pt-[240px] h-full">
      <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Todays Winning Odds, Hand-Picked by our Experts</h1>
      <p className='text-gray-600 dark:text-gray-300'>Our team analyzes the latest matches and provides odds you can rely on. Pick your favorite games and generate a custom betslip instantly.</p>
      {/* <MainOddBuilder></MainOddBuilder> */}
      <MainBetslip></MainBetslip>

    </div>
  )
}

export default page