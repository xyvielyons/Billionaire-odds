'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@heroui/react"
import { FaArrowRight } from "react-icons/fa6"
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { logo } from '@/public/images'

const EmailVerifiedCard = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let title = "Email Verified"
  let description = "Your email has been successfully verified."

  if (error === "token_expired") {
    title = "Email Not Verified"
    description = "Your verification email token has expired."
  } else if (error === "invalid_token") {
    title = "Email Not Verified"
    description = "The verification token is invalid. Please request a new one."
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div>
        <Card className='w-[300px]'>
          <CardHeader>
            <CardTitle className="text-xl flex items-center justify-center dark:text-gray-600 flex-col space-y-4">
              <div className="flex items-center justify-center">
                <Image
                  src={logo}
                  alt="Logo"
                  width={200}
                  height={200}
                  className='dark:brightness-150 dark:invert'
                />
              </div>
              <p className='dark:text-white'>{title}</p>
            </CardTitle>
            <CardDescription className='flex items-center justify-center text-center'>
              <p>{description}</p>
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <div className="w-full">
              <Button
                onPress={() => router.push('/')}
                startContent={<FaArrowRight />}
                className='bg-primarymain text-slate-50 w-full dark:bg-primarymain dark:text-slate-50'
                radius="sm"
              >
                Go to Home
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default EmailVerifiedCard
