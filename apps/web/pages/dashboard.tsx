import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { MainLayout } from '../layouts/MainLayout'
import {
  DashboardDisplay,
  dashboardDisplayAtom,
  setDashboardDisplayAtom,
} from '../lib/atom'
import { cn } from '../lib/classname'

interface DashboardTabProps {
  title: string
  type: DashboardDisplay
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ title, type }) => {
  const [dashboardDisplay, setDashboardDisplay] = useAtom(
    setDashboardDisplayAtom,
  )

  return (
    <button
      className={cn(
        dashboardDisplay === type
          ? 'bg-li-gray-100 dark:bg-li-gray-1400 font-medium text-black dark:text-white'
          : 'text-li-gray-1100 dark:text-li-gray-700 hover:bg-li-gray-100/70 dark:hover:bg-li-gray-1300 ',
        'px-3 py-1.5 rounded-[0.3rem]',
      )}
      onClick={() => setDashboardDisplay(type)}
    >
      {title}
    </button>
  )
}

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = ({}) => {
  const [dashboardDisplay] = useAtom(dashboardDisplayAtom)

  return (
    <MainLayout>
      <div className="mt-2 mb-10 space-y-4">
        <div className="flex space-x-4">
          {/* TODO display real data here */}
          <DashboardTab title="69 created trees" type="created" />
          <DashboardTab title="87 saves trees" type="saved" />
        </div>
        {dashboardDisplay === 'created' ? (
          <div>display created trees</div>
        ) : (
          <div>display saved trees</div>
        )}
      </div>
    </MainLayout>
  )
}

export default Dashboard
