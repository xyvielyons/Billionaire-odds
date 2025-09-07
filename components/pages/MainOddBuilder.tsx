'use client'
import React from 'react'
import { FaHammer } from "react-icons/fa6";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
import MainBetslipBuilder from '../modals/MainBetslipBuilder';
  

  
const MainOddBuilder = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div>
        <Button className='w-full text-gray-800 dark:text-white' radius='none' startContent={<FaHammer/>} onClick={()=>onOpen()}>Build Odds</Button>
        <div className="">
            <MainBetslipBuilder isOpen={isOpen} onOpenChange={onOpenChange} games={[]}></MainBetslipBuilder>
        </div>
    </div>
  )
}

export default MainOddBuilder