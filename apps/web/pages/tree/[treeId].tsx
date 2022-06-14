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
    }
  }, [data])

  return (
    <MainLayout>
      <div className="mt-4 space-y-6">
        {treeElement}
        <div className="space-y-4">
          <LinkCard />
          <LinkCard />
          <LinkCard />
          <LinkCard />
        </div>
      </div>
    </MainLayout>
  )
}

export default Tree
