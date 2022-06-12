import { NextPage } from 'next'
import { DashboardSavedTreeCard } from '../../components/cards/DashboardSavedTreeCard'
import { MainLayout } from '../../layouts/MainLayout'

interface TreeSavedProps {}

const TreeSaved: NextPage<TreeSavedProps> = ({}) => {
  return (
    <MainLayout>
      <div className="mt-4 space-y-4">
        <div></div>
        <div className="flex justify-between items-baseline px-2">
          <div className="font-semibold">7 trees saved</div>
          <a href="#" className="text-sm">
            browse trees
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
