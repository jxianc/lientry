import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import { TreeCard } from '../components/cards/TreeCard'
import {
  useGetRecentTreesQuery,
  useGetTrendingTreesQuery,
} from '../generated/graphql'
import { MainLayout } from '../layouts/MainLayout'
import { OrderBy, setOrderByAtom } from '../lib/atom/order-by.atom'
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
          ? 'bg-li-gray-100 dark:bg-li-gray-1400 font-medium text-black dark:text-white border border-li-gray-200 dark:border-li-gray-1300'
          : 'text-li-gray-1100 dark:text-li-gray-700 hover:bg-li-gray-100/70 dark:hover:bg-li-gray-1300 ',
        'px-3 py-2 rounded-[0.3rem] text-sm',
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
            isPublic={t.isPublic}
            isSaved={(t.userSavedTrees && t.userSavedTrees.length > 0) || false}
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
            isPublic={t.isPublic}
            isSaved={(t.userSavedTrees && t.userSavedTrees.length > 0) || false}
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
