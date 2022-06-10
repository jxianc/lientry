import { NextPage } from 'next'
import { MainLayout } from '../layouts/MainLayout'

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = ({}) => {
  return (
    <MainLayout>
      <div className="mt-4 flex flex-col space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-12">
          <div className="p-12 border border-gray-300 rounded-[0.3rem] items-center justify-center text-center shadow-sm">
            <div className="text-2xl font-semibold">11</div>
            <div>trees created</div>
            <a href="#" className="hover:underline hover:text-teal-800">
              <span>create a new tree</span>
            </a>
          </div>
          <div className="p-12 border border-gray-300 rounded-[0.3rem] items-center justify-center text-center shadow-sm">
            <div className="text-2xl font-semibold">7</div>
            <div>trees saved</div>
            <a href="#" className="hover:underline hover:text-teal-800">
              browse trees
            </a>
          </div>
        </div>
        <div>table here</div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
