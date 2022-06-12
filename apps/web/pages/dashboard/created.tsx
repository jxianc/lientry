import { NextPage } from 'next'
import { DashboardCreatedTreeCard } from '../../components/cards/DashboardCreatedTreeCard'
import { MainLayout } from '../../layouts/MainLayout'

interface TreeCreatedProps {}

const TreeCreated: NextPage<TreeCreatedProps> = ({}) => {
  return (
    <MainLayout>
      <div className="mt-4 space-y-4">
        <div></div>
        <div className="flex justify-between items-baseline px-2">
          <div className="font-semibold">11 trees created</div>
          <a href="#" className="text-sm">
            create
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
