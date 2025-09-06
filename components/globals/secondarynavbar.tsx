'use client'
import React, { useEffect, useState } from 'react'
import { IoIosFootball } from "react-icons/io";
import { secondaryNavConstants } from '@/constants/secondaryNav';
import { Button } from '@heroui/react';
import { FaCrown } from "react-icons/fa6";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { RiAdminFill } from "react-icons/ri";

const SecondaryNavbar = () => {
    const pathname = usePathname();
    const [path, setPath] = useState("");
    const router = useRouter();
    useEffect(() => {
        setPath(pathname)
    }, [pathname])
    
  return (
    <div className='bg-surface-light w-full p-2 dark:bg-[#151515] border-b-1.5 dark:border-borderline-dark'>
        <div className="flex justify-between flex-col gap-2 md:flex-row md:items-center">
            <div className="flex flex-row justify-between md:justify-start gap-2">
                {secondaryNavConstants.map((elements,i)=>(
                    <div 
                    onClick={()=>router.push(elements.path)}
                    className={`
                        flex items-center flex-col text-gray-500 hover:bg-gray-200 active:bg-gray-200 w-full p-2 md:w-[150px]
                        ${path == elements.path ? "text-gray-800 bg-gray-200 border-b-4 border-gray-600 dark:bg-surface-dark dark:text-surface-light":""}

                    `}
                    
                    key={i}>
                        <elements.icon className='w-[24] h-[24] '></elements.icon>
                        <p className='text-sm'>{elements.name}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <Button radius='none' className='bg-primarymain text-white w-full' startContent={<FaCrown size={24}/>} onClick={()=>router.push('/upgrade')}>Upgrade To Premium</Button>
                <Button radius='none' className='w-full text-gray-700 dark:text-gray-200' startContent={<RiAdminFill size={24}/>} onClick={()=>router.push('/admin')}>Admin</Button>
            </div>
        </div>
    </div>
  )
}

export default SecondaryNavbar