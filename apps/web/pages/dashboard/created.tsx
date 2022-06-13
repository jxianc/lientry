import { NextPage } from 'next'
import { DashboardCreatedTreeCard } from '../../components/cards/DashboardCreatedTreeCard'
import { MainLayout } from '../../layouts/MainLayout'
import { BiBookAdd } from 'react-icons/bi'

interface TreeCreatedProps {}

const TreeCreated: NextPage<TreeCreatedProps> = ({}) => {
  return (
    <MainLayout>
      <div className="mt-4 space-y-4">
        <div></div>
        <div className="flex justify-between items-baseline">
          <div className="font-semibold">11 trees created</div>
          <a
            href="#"
            className="flex space-x-1 items-center px-2 py-1 bg-white border border-gray-300 shadow-sm rounded-[0.3rem] hover:bg-gray-200 hover:border-gray-400"
          >
            <BiBookAdd />
            <span className="text-sm font-medium">create trees</span>
          </a>
        </div>
        <DashboardCreatedTreeCard />
        <DashboardCreatedTreeCard />
        <DashboardCreatedTreeCard />
        <DashboardCreatedTreeCard />
      </div>
    </MainLayout>
  )
}

export default TreeCreated
