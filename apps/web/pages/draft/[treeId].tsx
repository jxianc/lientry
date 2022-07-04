import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { TreeCardLayout } from '../../components/cards/TreeCardLayout'
import { LinkDraftCard } from '../../components/draft/LinkDraftCard'
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

interface TreeInfoCardProps {
  title: string
  description?: string | null
  numOfLinks: number
  createdAt: string
}

export const TreeInfoCard: React.FC<TreeInfoCardProps> = ({
  title,
  description,
  numOfLinks,
  createdAt,
}) => {
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
        <Dropdown
          component={DropdownComponent.ICON}
          Icon={FiMoreVertical}
          dropdownItems={[
            {
              title: 'Edit',
              action: DropdownAction.EXTERNAL_LINK,
              href: '/#',
            },
            {
              title: 'Delete',
              action: DropdownAction.BUTTON,
              clickHandler: async () => {
                console.log('clicked dropdown')
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
  const [{ data }] = useGetTreeByIdQuery({
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
      })

      // treeInfo card
      const tree = (
        <TreeInfoCard
          title={t.name}
          description={t.description}
          numOfLinks={t.links?.length || 0}
          createdAt={t.createdAt}
        />
      )
      setTreeInfoElement(tree)

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
    }
  }, [data])

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
