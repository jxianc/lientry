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
      <div className="mt-2 space-y-4">
        <TreeCard />
        <LinkCard />
        <LinkCard />
        <LinkCard />
        <LinkCard />
      </div>
    </MainLayout>
  )
}

export default Tree
