import React from 'react'
import { useAppSelector,useAppDispatch } from '@/hooks/hooks'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@heroui/react';
import { IoMdRemove } from "react-icons/io";
import { removeGame } from '@/store/slices/CustomGameSlice';
const CustomOddCard = () => {
    const games = useAppSelector(games => games.customGame.games);
    const dispatch = useAppDispatch()

    const removeGameFromList = (id:string)=>{
        dispatch(removeGame(id))
    }
  return (
    <div className='mt-2 gap-2 flex flex-col'>
        {games.map((game,i)=>(
            <Card className='rounded-sm' key={i}>
            <CardHeader>
                <div className="flex flex-row items-center justify-between">
                    <div className="flex gap-2 flex-col">
                        <CardTitle className='text-gray-800 dark:text-gray-100'>{`${game.homeTeam} vs ${game.awayTeam}`}</CardTitle>
                        <CardDescription className='text-gray-600 dark:text-gray-300'>{`${game.gameOdd}`}</CardDescription>
                    </div>

                    <div className="">
                        <Button className='bg-red-200 text-gray-800' radius='sm' startContent={<IoMdRemove></IoMdRemove>} onClick={()=>{
                            removeGameFromList(game.id)
                        }}>Remove</Button>
                    </div>
                </div>
                
            </CardHeader>
          </Card>
        ))}
    </div>
  )
}

export default CustomOddCard