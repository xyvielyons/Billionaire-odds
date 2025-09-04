///auth.ts
import { betterAuth,BetterAuthOptions } from "better-auth";
import {prismaAdapter} from 'better-auth/adapters/prisma'
import prisma from "./lib/prisma";
import { sendEmail } from "./actions/sendmail";
export const auth = betterAuth({
    database:prismaAdapter(prisma,{ 
        provider:"mongodb"
    }),
    emailAndPassword:{
        enabled:true,
        requireEmailVerification:true
    },
    emailVerification:{
        sendOnSignUp:true,
        autoSignInAfterVerification:true,
        sendVerificationEmail:async({user,token})=>{
            //this is the verification url that will be sent upon sign up
            //it will contain the token
            //it will contain the callback url if the email is verified
                const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
                await sendEmail({
                    to:user.email,
                    subject:"Billionaireodds - Verify your email address",
                    text:`Click the link to verify your email:${verificationUrl}`,
                    url:verificationUrl,
                    buttonText:`Verify Email`
                })
    
            }
    },
    advanced:{
        cookiePrefix:"billionaireodds"
    }
}satisfies BetterAuthOptions)
export type Session = typeof auth.$Infer.Session;