'use client'
import React from 'react'
import { IoStarSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { Button } from '@heroui/react';
import { LuBrain } from "react-icons/lu";
const MainBetslip = () => {
  return (
    <div className='p-2'>
        <div className="p-2 border-1.5 border-green-200 shadow-sm rounded-sm dark:border-green-800">
            <div className="w-full flex justify-between p-2">
            <div className="flex items-center flex-row gap-2 text-[#1E7944] dark:text-[#2bae61]">
                <IoStarSharp size={24} />
                <p className='text-sm font-semibold'>Expert Betslip</p>
            </div>
            <div className="bg-primarymain p-2 flex flex-row text-gray-50 gap-2 rounded-sm items-center">
                <BsFillPeopleFill size={16} />
                <p className='text-sm font-semibold'>87% Win Rate</p>
            </div>
        </div>
        <div className="">
            <div className="p-4 border-1 border-green-200 m-2 md:items-center md:flex-row flex-col flex justify-between rounded-sm dark:border-green-800 shadow-sm dark:bg-[#191919] bg-surface-light">
                <div className="">
                    <h1 className='text-xl font-bold text-green-900 dark:text-green-500'>Chelsea vs Everton</h1>
                    <p className='text-gray-600 dark:text-gray-400'>Over 1.5 Goals</p>
                </div>
                
                <div className="space-y-2 mb-2">
                    <h1 className='text-white bg-primarymain text-sm p-2 mt-8'>odd: 3.5</h1>
                    <p className='text-green-800 bg-green-100 text-sm p-2 '>High confidence</p>
                </div>
                <div className="mt-2">
                    <Button radius='none' className='border-green-700 text-gray-600 dark:text-gray-100' startContent={<LuBrain></LuBrain>} >Analysis</Button>
                </div>
            </div>
            <div className="p-4 border-1 border-green-200 m-2 md:items-center md:flex-row flex-col flex justify-between rounded-sm dark:border-green-800 shadow-sm dark:bg-[#191919] bg-surface-light">
                <div className="">
                    <h1 className='text-xl font-bold text-green-900 dark:text-green-500'>Manchester City vs Arsenal</h1>
                    <p className='text-gray-600 dark:text-gray-400'>Over 2.5 Goals</p>
                </div>
                
                <div className="space-y-2 mb-2">
                    <h1 className='text-white bg-primarymain text-sm p-2 mt-8'>odd: 2.5</h1>
                    <p className='text-green-800 bg-green-100 text-sm p-2 '>High confidence</p>
                </div>
                <div className="mt-2">
                    <Button radius='none' className='border-green-700 text-gray-600 dark:text-gray-100' startContent={<LuBrain></LuBrain>} >Analysis</Button>
                </div>
            </div>
            <div className="p-4 border-1 border-green-200 m-2 md:items-center md:flex-row flex-col flex justify-between rounded-sm dark:border-green-800 shadow-sm dark:bg-[#191919] bg-surface-light">
                <div className="">
                    <h1 className='text-xl font-bold text-green-900 dark:text-green-500'>Chelsea vs Everton</h1>
                    <p className='text-gray-600 dark:text-gray-400'>Over 1.5 Goals</p>
                </div>
                
                <div className="space-y-2 mb-2">
                    <h1 className='text-white bg-primarymain text-sm p-2 mt-8'>odd: 3.5</h1>
                    <p className='text-green-800 bg-green-100 text-sm p-2 '>High confidence</p>
                </div>
                <div className="mt-2">
                    <Button radius='none' className='border-green-700 text-gray-600 dark:text-gray-100' startContent={<LuBrain></LuBrain>} >Analysis</Button>
                </div>
            </div>
            <div className="p-4 border-1 border-green-200 m-2 md:items-center md:flex-row flex-col flex justify-between rounded-sm dark:border-green-800 shadow-sm dark:bg-[#191919] bg-surface-light">
                <div className="">
                    <h1 className='text-xl font-bold text-green-900 dark:text-green-500'>Manchester City vs Arsenal</h1>
                    <p className='text-gray-600 dark:text-gray-400'>Over 2.5 Goals</p>
                </div>
                
                <div className="space-y-2 mb-2">
                    <h1 className='text-white bg-primarymain text-sm p-2 mt-8'>odd: 2.5</h1>
                    <p className='text-green-800 bg-green-100 text-sm p-2 '>High confidence</p>
                </div>
                <div className="mt-2">
                    <Button radius='none' className='border-green-700 text-gray-600 dark:text-gray-100' startContent={<LuBrain></LuBrain>} >Analysis</Button>
                </div>
            </div>
            
        </div>
        
      
        </div>
        <div className="">

        </div>
    </div>
  )
}

export default MainBetslip