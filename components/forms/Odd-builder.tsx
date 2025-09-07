'use client'
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@heroui/react'
import { useAppDispatch } from '@/hooks/hooks'
import { addGame } from '@/store/slices/CustomGameSlice'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner'

const formSchema = z.object({
  homeTeam: z.string().min(2).max(50),
  awayTeam: z.string().min(2).max(50),
  gameOdd: z.number().min(2).max(50),
})


const OddBuilderForm = ({onClose}:{onClose:any}) => {
    const dispatch = useAppDispatch();
    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        homeTeam:"",
        awayTeam:"",
        gameOdd:0.0
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const randomUUID = uuidv4();

    dispatch(addGame({
        id:randomUUID,
        homeTeam:values.homeTeam,
        awayTeam:values.awayTeam,
        gameOdd:values.gameOdd
    }))

    toast.success("game added");
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
            control={form.control}
            name="homeTeam"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Home Team</FormLabel>
                <FormControl>
                    <Input placeholder="Chelsea" {...field} />
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
                    <Input placeholder="Everton" {...field} />
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
                <FormLabel>Game Odd</FormLabel>
                <FormControl>
                    <Input 
                    placeholder="4.67" 
                    type="number" 
                    {...field} 
                    onChange={e => field.onChange(e.target.valueAsNumber)} 
                    />

                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <div className="flex flex-row gap-2 justify-end">
                <Button className='' radius='none' onClick={()=>onClose()}>Close</Button>
                <Button type="submit" className='bg-primarymain text-white' radius='none'>Add Game</Button>
            </div>
        </form>
    </Form>
  )
}

export default OddBuilderForm