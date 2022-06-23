import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { MainLayout } from '../../layouts/MainLayout'

interface CreateTreeProps {}

const CreateTree: NextPage<CreateTreeProps> = ({}) => {
  const router = useRouter()
  const { treeId } = router.query

  return (
    <MainLayout>
      <div>
        <h1>{treeId}</h1>
      </div>
    </MainLayout>
  )
}

export default CreateTree
