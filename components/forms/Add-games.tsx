'use client'

import { gameSchema } from "@/zod/adminschema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@heroui/react"
import Textarea from "../globals/textArea"
import { AddNewGame } from "@/actions/AddGame"
import { toast } from "sonner"
const AddGames = () => {
  const form = useForm<z.infer<typeof gameSchema>>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      homeTeam: "",
      awayTeam: "",
      matchDate: "",
      matchTime:"",
      marketName:"",
      analysis:"",
      gameOdd:"",
    },
  })

  async function onSubmit(values: z.infer<typeof gameSchema>) {
    // later call your /api/games endpoint to insert into Prisma
    try {
        const addGame = await AddNewGame({
            homeTeam:values.homeTeam,
            awayTeam:values.awayTeam,
            matchDate:values.matchDate,
            matchTime:values.matchTime,
            analysis:values.analysis,
            marketName:values.marketName,
            gameOdd:values.gameOdd
        })

        if(addGame){
            toast.success("Adding of new games",{
                description:"Your game has been successfully added"
            })
        }

    } catch (error) {
        console.log(error)
        toast.success("Something went wrong",{
            description:"Please try again later"
        })
    }

  }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="homeTeam"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Home Team</FormLabel>
                <FormControl>
                    <Input placeholder="Arsenal" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="awayTeam"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Away Team</FormLabel>
                <FormControl>
                    <Input placeholder="Chelsea" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="matchDate"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Match Date</FormLabel>
                <FormControl>
                    <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="matchTime"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Match Time</FormLabel>
                <FormControl>
                    <Input
                        type="time"
                        id="time-picker"
                        step="1"
                        defaultValue="00:00:00"
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            {/* Odds Inputs */}
            <FormField
                control={form.control}
                name="marketName"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Market Name</FormLabel>
                    <FormControl>
                    <Input {...field} className="w-full" placeholder="over 1.5, over 0.5 etc"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="gameOdd"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>GameOdd</FormLabel>
                    <FormControl>
                    <Input {...field} className="w-full" placeholder="4.54"/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="analysis"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Match Analysis</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Write the match analysis" {...field}></Textarea>
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        
        <div className="space-y-4">
            <Button className="w-full bg-primarymain text-white" radius="none" type="submit">Add Game</Button>
            <Button className="w-full text-white" radius="none">Active Games</Button>
        </div>
       
      </form>
    </Form>
  )
}

export default AddGames
