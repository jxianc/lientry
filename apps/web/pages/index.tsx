import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { TreeCard } from '../components/TreeCard'
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
  return (
    <MainLayout>
      <div className="mt-2 space-y-4">
        <div className="flex space-x-4">
          <OrderByButton title="Most Recent" type="recent" />
          <OrderByButton title="Trending" type="trend" />
        </div>
        <div className="flex flex-col space-y-6">
          <TreeCard />
          <TreeCard />
          <TreeCard />
          <TreeCard />
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
