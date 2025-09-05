'use client'
import { logo } from '@/public/images'
import { Button, user } from '@heroui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import LightDarkToggle from './lightdarktoggle'
import { authClient } from '@/auth-client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuLogOut } from "react-icons/lu";
import { toast } from 'sonner'
const MainNavbar = () => {
    const router = useRouter()
    const [pending,setPending] = useState(false);
    const {data:session}:{data:any} = authClient.useSession();

    const logoutFunction = async()=>{
      try {
        setPending(true);

        await authClient.signOut({
          fetchOptions:{
            onSuccess:() =>{
              toast.success('Logging out',{
                description:`${session?.user.name} has been successfully logged out`
              })
            },
            onError:()=>{
              toast.error('Error Logging out',{
                description:`something went wrong while attempting to log out`
              })
            }
          }
        })

        router.refresh();
        setPending(false);
      } catch (error) {
        toast.error('Error Logging out',{
          description:`something went wrong while attempting to log out`
        })
      }

    }
  return (
    <div className="p-2 bg-surface-light border-b-1.5 border-borderline-light flex justify-between items-center dark:bg-[#151515] dark:border-borderline-dark">
        <div className="">
            <Image src={logo} alt='logo' width={160} height={160} className='dark:invert' onClick={()=>router.push('/')}></Image>
        </div>
        <div className="flex items-center gap-2">
          {!session && <Button className='bg-primarymain text-white' radius='none' onClick={()=>router.push('/sign-in')}>Sign In</Button>}
          {session && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                <div className="flex items-center flex-row gap-2">
                  <div className="">
                    <Image src={`https://api.dicebear.com/9.x/initials/svg?seed=${session.user.name}`} alt="profile" width={30} height={30}></Image>
                  </div>
                  <div className="flex items-center justify-start flex-col">
                    <div className="">
                      <p className='text-shadow-muted-foreground text-gray-600 dark:text-green-100 text-sm truncate w-[30px] md:w-full'>{session.user.name}</p>
                    </div>
                    <div className="w-full flex justify-start">
                      <p className='text-shadow-muted-foreground text-gray-500 dark:text-green-100 text-sm'>{session.user.role}</p>
                    </div>
                  </div>
                </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>logoutFunction()}>
                    <span>
                      <LuLogOut></LuLogOut>
                    </span>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              
          )}
            <LightDarkToggle></LightDarkToggle>
        </div>
    </div>
  )
}

export default MainNavbar