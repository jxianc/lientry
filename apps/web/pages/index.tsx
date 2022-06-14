import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { TreeCard } from '../components/TreeCard'
import { useGetRecentTreesQuery } from '../generated/graphql'
import { MainLayout } from '../layouts/MainLayout'
import { OrderBy, setOrderByAtom } from '../lib/atom'
import { cn } from '../lib/classname'

interface HomeProps {}

interface OrderByButtonProps {
  title: string
  type: OrderBy
}

export const OrderByButton: React.FC<OrderByButtonProps> = ({
  title,
  type,
}) => {
  const [orderBy, setOrderBy] = useAtom(setOrderByAtom)

  return (
    <button
      className={cn(
        orderBy === type
          ? 'bg-white font-medium border text-black'
          : 'bg-gray-50 text-gray-500 hover:text-gray-600 hover:bg-white hover:border',
        'px-3 py-1 rounded-[0.3rem] border-gray-300 ',
      )}
      onClick={() => setOrderBy(type)}
    >
      {title}
    </button>
  )
}

const Home: NextPage<HomeProps> = ({}) => {
  const [{ data, fetching }] = useGetRecentTreesQuery()
  const [treeElements, setTreeElements] = useState<JSX.Element[]>()

  useEffect(() => {
    if (data && data.getRecentTrees) {
      const trees = data.getRecentTrees.map((t) => (
        <TreeCard
          key={`tr-${t.id}`}
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
      ))
      setTreeElements(trees)
    }
  }, [data])

  return (
    <MainLayout>
      <div className="mt-2 space-y-4">
        <div className="flex space-x-4">
          <OrderByButton title="Most Recent" type="recent" />
          <OrderByButton title="Trending" type="trend" />
        </div>
        <div className="flex flex-col space-y-6">{treeElements}</div>
      </div>
    </MainLayout>
  )
}

export default Home
