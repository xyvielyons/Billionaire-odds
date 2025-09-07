import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
  import OddBuilderForm from "../forms/Odd-builder";
  import { Plus } from "lucide-react";
  export default function AddGameBuilderModal({isOpen,onOpen,onOpenChange}:{isOpen:any,onOpen:any,onOpenChange:any}) {
  
    return (
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add Game to Builder</ModalHeader>
                <ModalBody>
                    <OddBuilderForm onClose={onClose} onOpenChange={onOpenChange} ></OddBuilderForm>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  