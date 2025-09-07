'use client'

import React, { useEffect, useState } from 'react'
import { IoStarSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { LuBrain } from "react-icons/lu";
import { GameInterfaceTypes } from '@/Types/gameTypes';
import { GetAllActiveGames, GetAllFreeGames } from '@/actions/AddGame';
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
import { authClient } from '@/auth-client';
import { FaHammer } from "react-icons/fa6";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
import MainBetslipBuilder from '../modals/MainBetslipBuilder';
  

const MainBetslip = () => {
    const router = useRouter()
    const [freeGames, setFreeGames] = useState<GameInterfaceTypes[]>([])
    const [premiumGames, setPremiumGames] = useState<GameInterfaceTypes[]>([])
    const { data: session }: { data: any } = authClient.useSession();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        const fetchFreeGames = async () => {
            const activeFreeGames: any = await GetAllFreeGames()
            setFreeGames(activeFreeGames)
        }
        fetchFreeGames()
    }, [])

    useEffect(() => {
        const fetchPremiumGames = async () => {
            const activePremiumGames: any = await GetAllActiveGames()
            setPremiumGames(activePremiumGames)
        }
        fetchPremiumGames()
    }, [])

    return (
        <div className='p-2'>
            <div>
                <Button className='w-full text-gray-800 dark:text-white mb-2' radius='none' startContent={<FaHammer/>} onClick={()=>onOpen()} >Build Odds</Button>
                <div className="">
                <MainBetslipBuilder 
                    isOpen={isOpen} 
                    onOpenChange={onOpenChange} 
                    games={(session?.user.isPremium || session?.user.role === "admin")
                    ? premiumGames.map(g => ({ ...g, gameOdd: Number(g.gameOdd) }))
                    : freeGames.map(g => ({ ...g, gameOdd: Number(g.gameOdd) }))
                    }
                />
                </div>

            </div>
            <div className="p-2 border-1.5 border-green-200 shadow-sm rounded-sm dark:border-green-800">
                
                {/* Header */}
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

                {/* Free Games - only for non-premium, non-admin */}
                {!(session?.user.isPremium || session?.user.role === "admin") && (
                    <div className="">
                        {freeGames.map((game, i) => (
                            <div key={i} className="p-4 border-1 border-green-200 m-2 md:items-center md:flex-row flex-col flex justify-between rounded-sm dark:border-green-800 shadow-sm dark:bg-[#191919] bg-surface-light">
                                <div>
                                    <h1 className='text-xl font-bold text-green-900 dark:text-green-500'>{`${game.homeTeam} vs ${game.awayTeam}`}</h1>
                                    <p className='dark:text-gray-400 font-bold text-primarymain'>{`Tip: ${game.marketName}`}</p>
                                    <p className='text-gray-600 dark:text-gray-400'>{`Date: ${new Date(game.matchDate).toISOString().split("T")[0]} (${new Date(game.matchDate).toLocaleDateString("en-US", { weekday: "long" })})`}</p>
                                    <p className='text-gray-600 dark:text-gray-400'>{`Time: ${game.matchTime} EAT`}</p>
                                </div>
                                <div className="space-y-2 mb-2">
                                    <h1 className='text-white bg-primarymain text-sm p-2 '>{`Odd - ${game.gameOdd}`}</h1>
                                    <p className='text-green-800 bg-green-100 text-sm p-2 '>High confidence</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Premium Games - only for premium or admin */}
                {(session?.user.isPremium || session?.user.role === "admin") && (
                    <div className="">
                        {premiumGames.map((game, i) => (
                            <div key={i} className="p-4 border-1 border-green-200 m-2 md:items-center md:flex-row flex-col flex justify-between rounded-sm dark:border-green-800 shadow-sm dark:bg-[#191919] bg-surface-light">
                                <div>
                                    <h1 className='text-xl font-bold text-green-900 dark:text-green-500'>{`${game.homeTeam} vs ${game.awayTeam}`}</h1>
                                    <p className='dark:text-gray-400 font-bold text-primarymain'>{`Tip: ${game.marketName}`}</p>
                                    <p className='text-gray-600 dark:text-gray-400'>{`Date: ${new Date(game.matchDate).toISOString().split("T")[0]} (${new Date(game.matchDate).toLocaleDateString("en-US", { weekday: "long" })})`}</p>
                                    <p className='text-gray-600 dark:text-gray-400'>{`Time: ${game.matchTime}`}</p>
                                </div>
                                <div className="space-y-2 mb-2">
                                    <h1 className='text-white bg-primarymain text-sm p-2 '>{`Odd - ${game.gameOdd}`}</h1>
                                    <p className='text-green-800 bg-green-100 text-sm p-2 '>High confidence</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Locked Banner - only for non-premium, non-admin */}
                {!(session?.user.isPremium || session?.user.role === "admin") && (
                    <div className="p-4 border-1 border-green-200 m-2 md:items-center md:flex-row flex-col rounded-sm dark:border-green-800 shadow-sm dark:bg-[#191919] bg-surface-light items-center space-y-4 justify-center">
                        <GiPadlock size={24} className='w-full text-gray-600 dark:text-gray-200' />
                        <Button radius='none' className='bg-primarymain text-white w-full' startContent={<FaCrown size={24} />} onClick={() => router.push('/upgrade')}>
                            Upgrade To Premium
                        </Button>
                        <p className='text-gray-600 text-center dark:text-gray-300'>Get unlimited access to more expert odds and exclusive predictions.</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default MainBetslip
