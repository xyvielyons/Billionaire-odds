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
import CustomOddCard from '../cards/customOddCard';
import { useAppSelector } from '@/hooks/hooks';
import { FaHammer } from "react-icons/fa6";
import BuildOddsModal from '../modals/BuildOddsModal';
const BuilderPage = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {isOpen:isOpenBuilder, onOpen:onOpenBuilder, onOpenChange:onOpenChangeBuilder} = useDisclosure();
  const games = useAppSelector(game => game.customGame.games)

  return (
    <div className="p-4 space-y-2 md:pt-[170px] pt-[240px] h-full">
      <h1 className='text-2xl font-semibold text-gray-800 dark:text-gray-100'>Custom Odd Builder</h1>
      <p className='text-gray-600 dark:text-gray-300'>Create your own slip by adding games and setting custom odds to match your strategy.</p>
      <div className="">
        <div className="flex gap-2 flex-col md:flex-row">
          <Button startContent={<Plus></Plus>} className='w-full bg-primarymain text-white' radius='none' onPress={()=>onOpen()}>Add Game</Button>
          {games.length > 0 && (
            <div className="">
              <Button className='w-full' radius='none' startContent={<FaHammer></FaHammer>} onClick={()=>onOpenBuilder()}>Build Odds</Button>
              <p className="text-sm text-gray-500 mb-4 dark:text-gray-300">
                The <span className="font-semibold">Build</span> button will automatically 
                combine games from the list and calculate their total odds by multiplying 
                them together. We’ll try to match your target odd as closely as possible, 
                but depending on the available games the final value may be a bit higher or lower.
                </p>
            </div>
          )}
        </div>
        
        <div className="p-2 flex justify-end">
          <p className='text-sm text-gray-600 dark:text-gray-300'>Number of added games: {games.length}</p>
        </div>
        <CustomOddCard></CustomOddCard>
      </div>

      <AddGameBuilderModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}></AddGameBuilderModal>
      <BuildOddsModal isOpen={isOpenBuilder} onOpenChange={onOpenChangeBuilder} games={games}></BuildOddsModal>
    </div>
  )
}

export default BuilderPage