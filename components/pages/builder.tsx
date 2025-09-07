'use client'
import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import AddGameBuilderModal from '@/components/modals/AddGameBuilder';
import { Plus } from 'lucide-react';
const BuilderPage = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className="p-4 space-y-2 md:pt-[170px] pt-[240px] h-full">
      <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Custom Odd Builder</h1>
      <p className='text-gray-600 dark:text-gray-300'>Create your own slip by adding games and setting custom odds to match your strategy.</p>
      <div className="">
        <Button startContent={<Plus></Plus>} className='w-full bg-primarymain text-white' radius='none' onPress={()=>onOpen()}>Add Game</Button>
      </div>

      <AddGameBuilderModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}></AddGameBuilderModal>
    </div>
  )
}

export default BuilderPage