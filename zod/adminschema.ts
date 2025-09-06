import { z } from "zod"
 
export const gameSchema = z.object({
    homeTeam: z.string().min(1, "Home team is required"),
    awayTeam: z.string().min(1, "Away team is required"),
    matchDate: z.string().min(1, "Match date is required"), // ISO date string
    marketName: z.string().min(1, "Match market is required"),
    analysis:z.string().min(1, "Write your analysis about the game"),
    matchTime:z.string().min(1, "Match time is required"),
    gameOdd:z.string().min(1, "Game Odd is required")
  })