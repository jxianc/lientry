import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { TreeCardLayout } from '../../components/cards/layouts/TreeCardLayout'
import { LinkDraftCard } from '../../components/cards/draft/LinkDraftCard'
import {
  Dropdown,
  DropdownAction,
  DropdownComponent,
} from '../../components/Dropdown'
import { CreateLinkFormModal } from '../../components/modals/CreateLinkFormModal'
import { useGetTreeByIdQuery } from '../../generated/graphql'
import { DraftLayout } from '../../layouts/DraftLayout'
import {
  LinkAtom,
  setLinksAtom,
  setTreeInfoAtom,
} from '../../lib/atom/draft-tree.atom'
import { formatDate } from '../../lib/date'
import { EditTreeFormModal } from '../../components/modals/EditTreeFormModal'
import { DeleteTreeModal } from '../../components/modals/DeleteTreeModal'

interface TreeInfoCardProps {
  treeId: string
  title: string
  description?: string | null
  numOfLinks: number
  createdAt: string
}

export const TreeInfoCard: React.FC<TreeInfoCardProps> = ({
  treeId,
  title,
  description,
  numOfLinks,
  createdAt,
}) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false)
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

  return (
    <TreeCardLayout>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="font-semibold text-base">{title}</h2>
          {description && (
            <p className="text-sm text-li-gray-1100 dark:text-li-gray-700">
              {description}
            </p>
          )}
        </div>
        <EditTreeFormModal
          modalIsOpen={editModalIsOpen}
          setModalIsOpen={setEditModalIsOpen}
          title={title}
          description={description}
        />
        <DeleteTreeModal
          modalIsOpen={deleteModalIsOpen}
          setModalIsOpen={setDeleteModalIsOpen}
          treeId={treeId}
        />
        <Dropdown
          component={DropdownComponent.ICON}
          Icon={FiMoreVertical}
          dropdownItems={[
            {
              title: 'Edit',
              action: DropdownAction.BUTTON,
              clickHandler: () => {
                setEditModalIsOpen(true)
              },
            },
            {
              title: 'Delete',
              action: DropdownAction.BUTTON,
              warning: true,
              clickHandler: async () => {
                setDeleteModalIsOpen(true)
              },
            },
          ]}
        />
      </div>
      <div className="justify-end flex space-x-4 text-sm text-li-gray-1100 dark:text-li-gray-700">
        <div>{numOfLinks} links</div>
        <div>{formatDate(createdAt)}</div>
      </div>
    </TreeCardLayout>
  )
}

interface CreateTreeProps {}

const CreateTree: NextPage<CreateTreeProps> = ({}) => {
  // router
  const router = useRouter()
  const { treeId } = router.query

  // query
  const [{ data, error }] = useGetTreeByIdQuery({
    variables: {
      treeId: treeId as string,
    },
    pause: !treeId,
  })

  // jotai state
  const [treeInfo, setTreeInfo] = useAtom(setTreeInfoAtom)
  const [links, setLinks] = useAtom(setLinksAtom)

  // useState
  const [treeInfoElement, setTreeInfoElement] = useState<JSX.Element>()
  const [linkElements, setLinkElements] = useState<JSX.Element[]>()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    if (data && data.getTreeById) {
      const t = data.getTreeById

      // init treeInfo atom state
      setTreeInfo({
        id: t.id,
        title: t.name,
        description: t.description,
        createdAt: t.createdAt,
      })

      if (t.links && t.links.length > 0) {
        // init link atom state
        setLinks(
          t.links.map((l) => {
            return {
              linkId: l.id,
              title: l.title,
              description: l.description,
              url: l.url,
              initialStatus: 'ori',
              status: 'none',
            } as LinkAtom
          }),
        )
      }
    } else if (error) {
      router.push('/404')
    }
  }, [data, error, router, setLinks, setTreeInfo])

  // set tree info cards
  useEffect(() => {
    if (treeInfo) {
      const t = treeInfo
      const tree = (
        <TreeInfoCard
          treeId={t.id}
          title={t.title}
          description={t.description}
          numOfLinks={links.length}
          createdAt={t.createdAt}
        />
      )
      setTreeInfoElement(tree)
    }
  }, [treeInfo, links])

  // set link draft cards
  useEffect(() => {
    const filteredLinks = links.filter((l) => l.status !== 'deleted')

    setLinkElements(
      filteredLinks.map((l, idx) => (
        <LinkDraftCard
          key={`lk-${idx}`}
          linkId={l.linkId || idx.toString()}
          linkStatus={l.status}
          title={l.title}
          description={l.description}
          url={l.url}
        />
      )),
    )
  }, [links])

  return (
    <DraftLayout>
      <div className="mt-4 space-y-8">
        {treeInfoElement}
        <div className="space-y-4">
          <button
            className="bg-li-gray-100 dark:bg-li-gray-1400 hover:bg-li-gray-200 dark:hover:bg-li-gray-1300 px-4 py-1.5 rounded-[0.3rem] text-sm font-semibold"
            onClick={() => setModalIsOpen(true)}
          >
            Add Link
          </button>
          <CreateLinkFormModal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
          {linkElements && linkElements.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">{linkElements}</div>
          ) : (
            <div className="text-sm text-center py-4 dark:text-li-gray-700">
              There are currently no links in this tree
            </div>
          )}
        </div>
      </div>
    </DraftLayout>
  )
}

export default CreateTree
