'use server'
import { GameInterfaceTypes } from '@/Types/gameTypes'
import prisma from '@/lib/prisma'

export const AddNewGame = async({homeTeam,awayTeam,matchDate,matchTime,analysis,marketName,gameOdd,isFree}:GameInterfaceTypes)=>{
    try {
        const saveGame = await prisma.game.create({
            data:{
                homeTeam,
                awayTeam,
                analysis,
                matchDate:new Date(matchDate),
                matchTime,
                marketName,
                gameOdd,
                status: "upcoming",
                isFree
            }
        })
        console.log("game added")
        return saveGame;

    } catch (error) {
        console.log("Error when adding new Game",error)
    }
}

export const GetAllActiveGames = async () => {
    try {
        const getAllActiveGames = await prisma.game.findMany({
            where:{
                status:"upcoming"
            },
            orderBy:{
                matchDate:"asc"
            }
        })
        return getAllActiveGames;
    } catch (error) {
        console.log("Error getting all active games",error)
    }
}
export const DeleteGame = async ({id}:{id:string})=>{
    try {
        const DeleteGame = await prisma.game.delete({
            where:{
                id
            }
        })
        console.log("Game Deleted")
        return DeleteGame;
    } catch (error) {
        console.log("Error deleting game",error)
    }
}