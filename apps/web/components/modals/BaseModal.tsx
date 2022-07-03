import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { ModalBackground } from './ModalBackground'

interface BaseModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  initialFocus?: React.MutableRefObject<null>
  modalTitle: string
}

export const BaseModal: React.FC<BaseModalProps> = ({
  children,
  modalIsOpen,
  setModalIsOpen,
  initialFocus,
  modalTitle,
}) => {
  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog
        initialFocus={initialFocus || undefined}
        as="div"
        className="fixed z-20 inset-20 overflow-y-auto"
        onClose={setModalIsOpen}
      >
        <div className="flex items-end justify-center text-center sm:block sm:p-0">
          <ModalBackground />
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
              <div className="bg-white dark:bg-li-gray-1400 p-6">
                <div className="text-left space-y-4">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-bold">
                    {modalTitle}
                  </Dialog.Title>
                  <div className="text-base">{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
