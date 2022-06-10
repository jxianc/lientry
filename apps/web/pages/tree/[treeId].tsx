import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { LinkCard } from '../../components/LinkCard'
import { TreeCard } from '../../components/TreeCard'
import { MainLayout } from '../../layouts/MainLayout'

interface TreeProps {}

const Tree: NextPage<TreeProps> = ({}) => {
  const router = useRouter()
  const { treeId } = router.query

  return (
    <MainLayout>
      <div className="mt-4 space-y-6">
        <TreeCard />
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
