import { NextPage } from 'next'
import { TreeCard } from '../components/TreeCard'
import { MainLayout } from '../layouts/MainLayout'

interface HomeProps {}

const Home: NextPage<HomeProps> = ({}) => {
  return (
    <MainLayout>
      <div className="mt-2 space-y-4">
        <div className="flex space-x-4">
          <button className="px-3 py-1 rounded-[0.3rem] hover:bg-gray-200 font-medium">
            Most Recent
          </button>
          <button className="px-3 py-1 rounded-[0.3rem] hover:bg-gray-200 font-medium">
            Trending
          </button>
        </div>
        <div className="flex flex-col space-y-4">
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
