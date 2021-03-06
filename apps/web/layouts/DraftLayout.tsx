import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FiSave, FiXCircle } from 'react-icons/fi'
import { DraftCancelModal } from '../components/modals/DraftCancelModal'
import { useUpdateTreeMutation } from '../generated/graphql'
import {
  setEditedTreeAtom,
  setLinksAtom,
  setTreeInfoAtom,
} from '../lib/atom/draft-tree.atom'
import { ErrorAlert, setErrorAlertsAtom } from '../lib/atom/error-alerts.atom'
import { gqlErrorHandler } from '../lib/error-handler'
import { saveLinks } from '../lib/save-links'

interface DraftLayoutProps {
  children?: React.ReactNode
}

export const DraftLayout: React.FC<DraftLayoutProps> = ({ children }) => {
  // router
  const router = useRouter()

  // update tree mutation
  const [__, execUpdateTree] = useUpdateTreeMutation()

  // jotai state
  const [treeInfo, _setTreeInfo] = useAtom(setTreeInfoAtom)
  const [links, _setLinks] = useAtom(setLinksAtom)
  const [editedTree, setEditedTree] = useAtom(setEditedTreeAtom)
  const [errorAlerts, setErrorAlerts] = useAtom(setErrorAlertsAtom)

  // useState
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-li-gray-1500">
      <div className="max-w-4xl mx-auto w-full min-h-screen">
        <div className="flex flex-col justify-center">
          <main className="p-4 pb-8 mt-10 border border-li-gray-200 dark:border-li-gray-1300 rounded-md">
            <div className="px-2 font-bold text-xl">Draft</div>
            <DraftCancelModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
            />
            {children}
            <div className="flex space-x-4 mt-24 justify-end">
              <button
                className="bg-li-gray-100 dark:bg-li-gray-1400 hover:bg-li-gray-200 dark:hover:bg-li-gray-1300 px-3 py-1 rounded-[0.3rem] text-base font-semibold inline-flex items-center space-x-1"
                onClick={() => {
                  if (editedTree) {
                    setModalIsOpen(true)
                  } else {
                    router.back()
                  }
                }}
              >
                <FiXCircle />
                <span>cancel</span>
              </button>
              <button
                className="bg-li-gray-100 dark:bg-li-gray-1400 hover:bg-li-gray-200 dark:hover:bg-li-gray-1300 px-3 py-1 rounded-[0.3rem] text-base font-semibold inline-flex items-center space-x-1"
                onClick={async () => {
                  if (editedTree) {
                    if (!(treeInfo && treeInfo.id)) {
                      setErrorAlerts(
                        errorAlerts.concat({
                          index: errorAlerts.length,
                          message: 'tree not found',
                        }),
                      )
                      return
                    }

                    const { data, error } = await execUpdateTree({
                      treeId: treeInfo.id,
                      updateTreeInfoInput: {
                        name: treeInfo.title,
                        description: treeInfo.description,
                        isPublic: treeInfo.isPublic,
                      },
                      curLinksInput: saveLinks(links),
                    })

                    if (data && data.updateTree && data.updateTree.success) {
                      setEditedTree(false)
                      router.back()
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
                  } else {
                    // tree is not edited, just go back
                    router.back()
                  }
                }}
              >
                <FiSave />
                <span>save</span>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
