import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LinkCard } from '../../components/LinkCard'
import { TreeCard } from '../../components/TreeCard'
import { useGetTreeByIdQuery } from '../../generated/graphql'
import { MainLayout } from '../../layouts/MainLayout'

interface TreeProps {}

const Tree: NextPage<TreeProps> = ({}) => {
  const router = useRouter()
  const { treeId } = router.query
  const [{ data }] = useGetTreeByIdQuery({
    variables: {
      treeId: treeId as string,
    },
    pause: !treeId,
  })
  const [treeElement, setTreeElement] = useState<JSX.Element>()
  const [linkElements, setLinkElements] = useState<JSX.Element[]>()

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
      } else {
        setLinkElements([
          <div key={'no-links'} className="text-sm text-center py-4">
            There are currently no links in this tree
          </div>,
        ])
      }
    }
  }, [data])

  return (
    <MainLayout>
      <div className="mt-4 space-y-6">
        {treeElement}
        <div className="space-y-4">{linkElements}</div>
      </div>
    </MainLayout>
  )
}

export default Tree
