import { NextPage } from 'next'
import { MainLayout } from '../../layouts/MainLayout'
import NextLink from 'next/link'

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = ({}) => {
  return (
    <MainLayout>
      <div className="mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mx-auto w-full">
          <NextLink href="dashboard/created" passHref>
            <div className="w-72 mx-auto p-12 border border-gray-300 rounded-[0.3rem] items-center justify-center text-center shadow-sm hover:bg-gray-200 hover:cursor-pointer hover:border-gray-400">
              <div className="text-2xl font-semibold">11</div>
              <div>trees created</div>
            </div>
          </NextLink>
          <NextLink href="dashboard/saved" passHref>
            <div className="w-72 mx-auto p-12 border border-gray-300 rounded-[0.3rem] items-center justify-center text-center shadow-sm hover:bg-gray-200 hover:cursor-pointer hover:border-gray-400">
              <div className="text-2xl font-semibold">7</div>
              <div>trees saved</div>
            </div>
          </NextLink>
        </div>
      </div>
    </MainLayout>
  )
}

export default Dashboard
