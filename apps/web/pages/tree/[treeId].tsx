import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LinkCard } from '../../components/cards/LinkCard'
import { TreeCard } from '../../components/cards/TreeCard'
import { useGetTreeByIdQuery } from '../../generated/graphql'
import { MainLayout } from '../../layouts/MainLayout'
import { BiEditAlt } from 'react-icons/bi'
import { useAtom } from 'jotai'
import { currUserAtom } from '../../lib/atom/current-user.atom'
import { cn } from '../../lib/classname'

interface TreeProps {}

const Tree: NextPage<TreeProps> = ({}) => {
  // router
  const router = useRouter()
  const { treeId } = router.query

  // jotai state
  const [currUser] = useAtom(currUserAtom)

  // query
  const [{ data, error }] = useGetTreeByIdQuery({
    variables: {
      treeId: treeId as string,
    },
    pause: !treeId,
  })

  // useState
  const [treeElement, setTreeElement] = useState<JSX.Element>()
  const [linkElements, setLinkElements] = useState<JSX.Element[]>()

  // useEffect
  useEffect(() => {
    if (data && data.getTreeById) {
      const t = data.getTreeById
      const tree = (
        <TreeCard
          treeId={t.id}
          treeName={t.name}
          description={t.description}
          userId={t.user.id}
          userName={t.user.name}
          userImage={t.user.image}
          viewed={t.viewed}
          numOfLinks={t.links?.length || 0}
          createdAt={t.createdAt}
        />
      )
      setTreeElement(tree)

      if (t.links && t.links.length > 0) {
        const links = t.links.map((l) => (
          <LinkCard
            key={`lk-${l.id}`}
            title={l.title}
            description={l.description}
            url={l.url}
          />
        ))
        setLinkElements(links)
      }
    } else if (error) {
      router.push('/404')
    }
  }, [data, error, router])

  return (
    <MainLayout>
      <div className="mt-4 space-y-6">
        {/* TODO this button should only be shown it to the author */}
        <button
          className={cn(
            'bg-li-gray-100 dark:bg-li-gray-1400 hover:bg-li-gray-200 dark:hover:bg-li-gray-1300 px-4 py-1.5 rounded-[0.3rem] text-sm font-semibold flex items-center space-x-1 border border-li-gray-200 dark:border-li-gray-1300',
            currUser && currUser.id === data?.getTreeById?.user.id
              ? 'block'
              : 'hidden',
          )}
          onClick={() => {
            router.push(`/draft/${treeId}`)
          }}
        >
          <BiEditAlt />
          <span>Edit tree</span>
        </button>
        {treeElement}
        {linkElements && linkElements.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">{linkElements}</div>
        ) : (
          <div className="text-sm text-center py-4 dark:text-li-gray-700">
            There are currently no links in this tree
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default Tree
