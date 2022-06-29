import { Transition, Dialog } from '@headlessui/react'
import React, { Fragment } from 'react'

interface ModalBackgroundProps {}

export const ModalBackground: React.FC<ModalBackgroundProps> = ({}) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog.Overlay className="fixed inset-0 bg-li-gray-1100/50 dark:bg-li-gray-1200/40 backdrop-filter backdrop-blur-sm transition-opacity" />
    </Transition.Child>
  )
}
