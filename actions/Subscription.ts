"use server"

import prisma from '@/lib/prisma'

export const SetWeeklySubscription = async({id}:{id:string})=>{
    try {
        await prisma.user.update({
            where:{id},
            data:{
                isPremium:true,
                premiumUntil:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            }
        })
        return {
            updated:true
        }

        
    } catch (error) {
        console.log("Something went wrong in setting weekly subscription",error)
    }
}
export const SetMonthlySubscription = async({id}:{id:string})=>{
    try {
        await prisma.user.update({
            where:{id},
            data:{
                isPremium:true,
                premiumUntil:new Date(new Date().setMonth(new Date().getMonth() + 1))
            }
        })

        return {
            updated:true
        }

    } catch (error) {
        console.log("Something went wrong in setting monthly subscription",error)
    }
}