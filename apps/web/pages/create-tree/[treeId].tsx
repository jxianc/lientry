import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TreeCardLayout } from '../../components/cards/TreeCardLayout'
import { useGetTreeByIdQuery } from '../../generated/graphql'
import { MainLayout } from '../../layouts/MainLayout'

interface TreeInfoCardProps {
  title: string
  description?: string | null
}

export const TreeInfoCard: React.FC<TreeInfoCardProps> = ({
  title,
  description,
}) => {
  return (
    <TreeCardLayout>
      <div>
        <h2 className="font-semibold text-base">{title}</h2>
        {description && (
          <p className="text-sm text-li-gray-1100 dark:text-li-gray-700">
            {description}
          </p>
        )}
      </div>
    </TreeCardLayout>
  )
}

interface CreateTreeProps {}

const CreateTree: NextPage<CreateTreeProps> = ({}) => {
  const router = useRouter()
  const { treeId } = router.query
  const [{ data }] = useGetTreeByIdQuery({
    variables: {
      treeId: treeId as string,
    },
    pause: !treeId,
  })
  const [treeInfo, setTreeInfo] = useState<JSX.Element>()

  useEffect(() => {
    if (data && data.getTreeById) {
      const t = data.getTreeById
      const tree = <TreeInfoCard title={t.name} description={t.description} />
      setTreeInfo(tree)
    }
  }, [data])

  return (
    <MainLayout>
      <div className="mt-2 mb-10 space-y-4">{treeInfo}</div>
      <div className="flex justify-center w-full h-40 rounded-[0.3rem] border-8 border-dashed border-li-gray-100 dark:border-li-gray-1300 hover:cursor-pointer">
        <div className="text-4xl font-bold text-li-gray-100 dark:text-li-gray-1300 inline-flex justify-center items-center">
          +
        </div>
      </div>
    </MainLayout>
  )
}

export default CreateTree
