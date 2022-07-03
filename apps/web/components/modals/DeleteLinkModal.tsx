import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useRef } from 'react'
import { ModalBackground } from './ModalBackground'

interface DeleteLinkModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DeleteLinkModal: React.FC<DeleteLinkModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
}) => {
  // useRef
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={modalIsOpen} as={Fragment}>
      <Dialog
        initialFocus={cancelButtonRef}
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
                    Delete your link
                  </Dialog.Title>
                  <div className="text-base">
                    Are you sure you want to delete this link?
                  </div>
                  <div className="flex space-x-4 justify-end mt-20">
                    <button
                      type="button"
                      ref={cancelButtonRef}
                      className="py-1.5 px-4 rounded-[0.3rem] hover:bg-li-gray-200 dark:hover:bg-li-gray-1300"
                      onClick={() => setModalIsOpen(false)}
                    >
                      cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-1.5 px-4 rounded-[0.3rem]"
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
