'use client'
import React, { useEffect, useState } from 'react'
import { GetAllActiveGames } from '@/actions/AddGame'
import { GameInterfaceTypes } from '@/Types/gameTypes'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
const GetActiveGames = () => {
  const [games, setGames] = useState<GameInterfaceTypes[]>([])

  useEffect(() => {
    const fetchGames = async () => {
      const activeGames:any = await GetAllActiveGames() // ✅ call the server action, not the component
      setGames(activeGames)
    }
    fetchGames()
  }, [])

  console.log(games)

  return (
    <div className='p-2 '>
      {games.length === 0 ? (
        <p>No active games found</p>
      ) : (
        <div className='gap-2 space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {games.map((game,i) => (
            <div className="w-full" key={i}>
                <Card className='w-full rounded-sm'>
                    <CardHeader>
                        <CardTitle className='text-gray-800'>{`${game.homeTeam} vs ${game.awayTeam}`}</CardTitle>
                        <CardDescription className='text-gray-600'>{`${game.marketName} - ${new Date(game.matchDate).toISOString().split("T")[0]}(${new Date(game.matchDate).toLocaleDateString("en-US",{weekday:"long"})}) - ${game.matchTime}`}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className='text-gray-600'>{`Analysis - ${game.analysis}`}</p>
                        <p className='text-gray-600'>{`Odds - ${game.gameOdd}`}</p>
                    </CardContent>
                    <CardFooter>
                        <div className="gap-2 flex">
                            <div className="bg-gray-300 p-2">
                                <p className='text-sm text-gray-800'>{game.status}</p>
                            </div>
                            <div className={`bg-gray-300 p-2 ${game.isFree ? "bg-primarymain text-white p-2":"text-gray-800"}`}>
                                <p className='text-sm'>{game.isFree ? "Is Free":"Not Free"}</p>
                            </div>
                           
                        </div>
                    </CardFooter>
                </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GetActiveGames
