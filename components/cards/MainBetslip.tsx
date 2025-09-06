'use client'
import React, { useEffect, useState } from 'react'
import { IoStarSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { Button } from '@heroui/react';
import { LuBrain } from "react-icons/lu";
import { GameInterfaceTypes } from '@/Types/gameTypes';
import { GetAllActiveGames,GetAllFreeGames } from '@/actions/AddGame';
import { GiPadlock } from "react-icons/gi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { FaCrown } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
const MainBetslip = () => {
    const router = useRouter()
    const [freeGames, setFreeGames] = useState<GameInterfaceTypes[]>([])
    const [premiumGames, setPremiumGames] = useState<GameInterfaceTypes[]>([])

    useEffect(() => {
        const fetchGames = async () => {
        const activeFreeGames:any = await GetAllFreeGames() // ✅ call the server action, not the component
        setFreeGames(activeFreeGames)
        }
        fetchGames()
    }, [])
    useEffect(() => {
        const fetchGames = async () => {
            const activePremiumGames:any = await GetAllActiveGames() // ✅ call the server action, not the component
            setPremiumGames(activePremiumGames)
        }
        fetchGames()
    }, [])


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
            {freeGames.map((game,i)=>(
            <div key={i} className="p-4 border-1 border-green-200 m-2 md:items-center md:flex-row flex-col flex justify-between rounded-sm dark:border-green-800 shadow-sm dark:bg-[#191919] bg-surface-light">
                <div className="">
                    <h1 className='text-xl font-bold text-green-900 dark:text-green-500'>{`${game.homeTeam} vs ${game.awayTeam}`}</h1>
                    <p className='text-gray-600 dark:text-gray-400 font-bold text-primarymain'>{`Tip: ${game.marketName}`}</p>
                    <p className='text-gray-600 dark:text-gray-400'>{`Date: ${new Date(game.matchDate).toISOString().split("T")[0]}(${new Date(game.matchDate).toLocaleDateString("en-US",{weekday:"long"})})`}</p>
                    <p className='text-gray-600 dark:text-gray-400'>{`Time: ${game.matchTime}`}</p>
                </div>
                
                <div className="space-y-2 mb-2">
                    <h1 className='text-white bg-primarymain text-sm p-2 '>{`Odd - ${game.gameOdd}`}</h1>
                    <p className='text-green-800 bg-green-100 text-sm p-2 '>High confidence</p>
                </div>
                <div className="mt-2">
                    {/* <Dialog>
                        <DialogTrigger className='bg-gray-300 p-2 cursor-pointer text-gray-800 flex flex-row items-center gap-2 hover:bg-gray-200 active:bg-gray-200'>
                            <span><LuBrain></LuBrain></span>
                            <p>Analysis</p>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Game Analysis</DialogTitle>
                            <DialogDescription>
                                {game.analysis}
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog> */}
                </div>
            </div>
            ))}
            
            
        </div>
            <div className="p-4 border-1 border-green-200 m-2 md:items-center md:flex-row flex-col rounded-sm dark:border-green-800 shadow-sm dark:bg-[#191919] bg-surface-light items-center space-y-4 justify-center">
                <GiPadlock size={24} className='w-full text-gray-600 dark:text-gray-200'/>
                <Button radius='none' className='bg-primarymain text-white w-full' startContent={<FaCrown size={24}/>} onClick={()=>router.push('/upgrade')}>Upgrade To Premium</Button>
                <p className='text-gray-600 text-center dark:text-gray-300'>Get unlimited access to more expert odds and exclusive predictions.</p>
            </div>
      
        </div>
    </div>
  )
}

export default MainBetslip