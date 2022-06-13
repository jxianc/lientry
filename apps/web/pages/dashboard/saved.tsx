import { NextPage } from 'next'
import { DashboardSavedTreeCard } from '../../components/cards/DashboardSavedTreeCard'
import { MainLayout } from '../../layouts/MainLayout'
import { BiBookOpen } from 'react-icons/bi'

interface TreeSavedProps {}

const TreeSaved: NextPage<TreeSavedProps> = ({}) => {
  return (
    <MainLayout>
      <div className="mt-4 space-y-4">
        <div></div>
        <div className="flex justify-between items-baseline">
          <div className="font-semibold">7 trees saved</div>
          <a
            href="#"
            className="flex space-x-1 items-center px-2 py-1 bg-white border border-gray-300 shadow-sm rounded-[0.3rem] hover:bg-gray-200 hover:border-gray-400"
          >
            <BiBookOpen />
            <span className="text-sm font-medium">browse trees</span>
          </a>
        </div>
        <DashboardSavedTreeCard />
        <DashboardSavedTreeCard />
        <DashboardSavedTreeCard />
        <DashboardSavedTreeCard />
      </div>
    </MainLayout>
  )
}

export default TreeSaved
