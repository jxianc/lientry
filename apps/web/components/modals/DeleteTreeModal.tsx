import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { useRemoveTreeMutation } from '../../generated/graphql'
import {
  setErrorAlertsAtom,
  ErrorAlert,
} from '../../lib/atom/error-alerts.atom'
import { gqlErrorHandler } from '../../lib/error-handler'
import { BaseModal } from './BaseModal'

interface DeleteTreeModalProps {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  treeId: string
}

export const DeleteTreeModal: React.FC<DeleteTreeModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  treeId,
}) => {
  // useRouter
  const router = useRouter()

  // mutation
  const [_, execRemoveTree] = useRemoveTreeMutation()

  // useRef
  const cancelButtonRef = useRef(null)

  // jotai
  const [errorAlerts, setErrorAlerts] = useAtom(setErrorAlertsAtom)

  return (
    <BaseModal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      initialFocus={cancelButtonRef}
      modalTitle="Delete your tree"
    >
      <div className="text-base">
        Are you sure you want to delete this tree? The links in this tree will
        be deleted as well.
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
          onClick={async () => {
            const { data, error } = await execRemoveTree({
              treeId,
            })

            if (data && data.removeTree && data.removeTree.success) {
              setModalIsOpen(false)
              router.push('/dashboard')
            }

            if (error) {
              const errMsgs = gqlErrorHandler(error.graphQLErrors)

              setErrorAlerts(
                errorAlerts.concat(
                  errMsgs.map(
                    (message, index): ErrorAlert => ({
                      index: index + errorAlerts.length,
                      message,
                    }),
                  ),
                ),
              )
            }
          }}
        >
          delete
        </button>
      </div>
    </BaseModal>
  )
}
