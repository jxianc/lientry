import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'

interface TreeProps {}

const Tree: NextPage<TreeProps> = ({}) => {
  const router = useRouter()
  const { treeId } = router.query

  return (
    <MainLayout>
      <div>tree individual page</div>
      <div>tree id: {treeId}</div>
    </MainLayout>
  )
}

export default Tree
