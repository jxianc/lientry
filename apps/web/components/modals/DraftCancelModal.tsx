import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { BaseModal } from './BaseModal'

interface DraftCancelModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DraftCancelModal: React.FC<DraftCancelModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
}) => {
  // router
  const router = useRouter()

  // useRef
  const cancelButtonRef = useRef(null)

  return (
    <BaseModal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      modalTitle="Discard your draft"
      initialFocus={cancelButtonRef}
    >
      <div>
        Your changes will be lost. Are you sure you want to discard the draft?
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
          type="button"
          className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-1.5 px-4 rounded-[0.3rem]"
          onClick={() => {
            router.back()
          }}
        >
          discard
        </button>
      </div>
    </BaseModal>
  )
}
