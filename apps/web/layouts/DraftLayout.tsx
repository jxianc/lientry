import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FiSave, FiXCircle } from 'react-icons/fi'
import { DraftCancelModal } from '../components/modals/DraftCancelModal'
import { useEditLinksMutation } from '../generated/graphql'
import { setLinksAtom, setTreeInfoAtom } from '../lib/atom/draft-tree.atom'
import { saveLinks } from '../lib/save-links'

interface DraftLayoutProps {
  children?: React.ReactNode
}

export const DraftLayout: React.FC<DraftLayoutProps> = ({ children }) => {
  // router
  const router = useRouter()

  // edit links mutation
  const [_, execEditLinks] = useEditLinksMutation()

  // jotai state
  const [treeInfo, _setTreeInfo] = useAtom(setTreeInfoAtom)
  const [links, _setLinks] = useAtom(setLinksAtom)

  // useState
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-li-gray-1500">
      <div className="max-w-4xl mx-auto w-full min-h-screen">
        <div className="flex flex-col justify-center">
          <main className="p-4 pb-8 mt-10 border-2 border-li-gray-200 dark:border-li-gray-1300 rounded-md">
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
                  const newLinks = links.filter(
                    (l) => l.initialStatus === 'new' || l.status !== 'none',
                  )
                  if (newLinks.length > 0) {
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
                  const editLinksArgs = saveLinks(links)

                  if (
                    editLinksArgs.creates?.length ||
                    editLinksArgs.updates?.length ||
                    editLinksArgs.removes?.length
                  ) {
                    // there are args to call mutation

                    if (!(treeInfo && treeInfo.id)) {
                      // TODO no tree id, should throw an error here
                      console.error('no tree id')
                      return
                    }

                    const { data, error } = await execEditLinks({
                      curLinksInput: saveLinks(links),
                      treeId: treeInfo.id,
                    })

                    if (data && data.EditLinks && data.EditLinks.success) {
                      router.back()
                    }

                    // TODO handle error
                  } else {
                    // no args
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
