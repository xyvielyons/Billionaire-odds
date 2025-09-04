///auth.ts
import { betterAuth,BetterAuthOptions } from "better-auth";
import {prismaAdapter} from 'better-auth/adapters/prisma'
import prisma from "./lib/prisma";
export const auth = betterAuth({
    database:prismaAdapter(prisma,{ 
        provider:"mongodb"
    }),
    emailAndPassword:{
        enabled:true
    }
}satisfies BetterAuthOptions)
export type Session = typeof auth.$Infer.Session;