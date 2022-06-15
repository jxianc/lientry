import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import { TreeCard } from '../components/TreeCard'
import {
  useGetRecentTreesQuery,
  useGetTrendingTreesQuery,
} from '../generated/graphql'
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
  const [{ data: getRecentTreesData }] = useGetRecentTreesQuery()
  const [{ data: getTrendingTreesData }] = useGetTrendingTreesQuery()
  const [treeElements, setTreeElements] = useState<JSX.Element[]>()
  const [orderBy, _setOrderBy] = useAtom(setOrderByAtom)

  useEffect(() => {
    if (orderBy === 'recent') {
      if (getRecentTreesData && getRecentTreesData.getRecentTrees) {
        const trees = getRecentTreesData.getRecentTrees.map((t) => (
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
    } else {
      if (getTrendingTreesData && getTrendingTreesData.getTrendingTrees) {
        const trees = getTrendingTreesData.getTrendingTrees.map((t) => (
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
    }
  }, [orderBy, getRecentTreesData, getTrendingTreesData])

  return (
    <MainLayout>
      <div className="mt-2 mb-10 space-y-4">
        <div className="flex space-x-4">
          <OrderByButton title="Most Recent" type="recent" />
          <OrderByButton title="Trending" type="trend" />
        </div>
        <div className="flex flex-col space-y-6">{treeElements}</div>
        <div className="flex space-x-4 text-center justify-center text-sm py-4">
          <button className="flex items-center space-x-1 shadow-sm px-2 py-2 border border-gray-300 rounded-[0.3rem] bg-white hover:bg-gray-200">
            <BsFillCaretLeftFill />
          </button>
          <button className="flex items-center space-x-1 shadow-sm px-2 py-2 border border-gray-300 rounded-[0.3rem] bg-white hover:bg-gray-200">
            <BsFillCaretRightFill />
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
