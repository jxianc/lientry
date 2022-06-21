import { Transition, Dialog } from '@headlessui/react'
import React, { Fragment } from 'react'

interface CreateTreeFormModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateTreeFormModal: React.FC<CreateTreeFormModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
}) => {
  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-20 overflow-y-auto"
        onClose={setModalIsOpen}
      >
        <div className="flex items-end justify-center min-h-screen text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-li-gray-1100/50 dark:bg-li-gray-1300/50 backdrop-filter backdrop-blur-sm transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block rounded-[0.3rem] overflow-hidden transform transition-all w-full max-w-2xl">
              <div className="bg-white dark:bg-li-gray-1500 p-4">
                <div className="text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-base leading-6 font-bold"
                  >
                    Create a new tree
                  </Dialog.Title>
                  <Dialog.Description className="text-base">
                    create tree form go here
                  </Dialog.Description>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
