import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { setLinksAtom } from '../../lib/atom/draft-tree.atom'
import { BaseModal } from './BaseModal'

interface DeleteLinkModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  linkId: string
}

export const DeleteLinkModal: React.FC<DeleteLinkModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  linkId,
}) => {
  // jotai state
  const [links, setLinks] = useAtom(setLinksAtom)

  // useRef
  const cancelButtonRef = useRef(null)

  return (
    <BaseModal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      initialFocus={cancelButtonRef}
      modalTitle="Delete your link"
    >
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
          type="button"
          className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-1.5 px-4 rounded-[0.3rem]"
          onClick={() => {
            const updatedLinks = links.map((l) => {
              if (l.linkId === linkId) {
                l.status = 'deleted'
              }
              return l
            })
            setLinks(updatedLinks)
            setModalIsOpen(false)
          }}
        >
          delete
        </button>
      </div>
    </BaseModal>
  )
}
