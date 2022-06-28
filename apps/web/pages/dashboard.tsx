import { useAtom } from 'jotai'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useState } from 'react'
import { DashboardCreatedTreeCard } from '../components/cards/DashboardCreatedTreeCard'
import { DashboardSavedTreeCard } from '../components/cards/DashboardSavedTreeCard'
import { CreateTreeFormModal } from '../components/modals/CreateTreeFormModal'
import { MainLayout } from '../layouts/MainLayout'
import {
  DashboardDisplay,
  dashboardDisplayAtom,
  setDashboardDisplayAtom,
} from '../lib/atom'
import { cn } from '../lib/classname'

// dashboard tab component
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
        'px-3 py-2 rounded-[0.3rem] text-sm',
      )}
      onClick={() => setDashboardDisplay(type)}
    >
      {title}
    </button>
  )
}

// dashboard action component
interface DashboardActionProps {}

export const DashboardAction: React.FC<DashboardActionProps> = ({}) => {
  const [dashboardDisplay] = useAtom(dashboardDisplayAtom)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <>
      <CreateTreeFormModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <div className="px-3 text-sm hover:cursor-pointer hover:underline hover:text-li-green-main">
        {dashboardDisplay === 'created' ? (
          <div onClick={() => setModalIsOpen(true)}>create a new tree</div>
        ) : (
          <NextLink href="/" passHref>
            <a>
              <span>browse trees</span>
            </a>
          </NextLink>
        )}
      </div>
    </>
  )
}

// dashboard page
interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = ({}) => {
  const [dashboardDisplay] = useAtom(dashboardDisplayAtom)

  return (
    <MainLayout>
      <div className="mt-2 mb-10 space-y-4">
        <div className="flex justify-between items-baseline">
          <div className="flex space-x-4">
            {/* TODO display real data here */}
            <DashboardTab title="69 created trees" type="created" />
            <DashboardTab title="87 saved trees" type="saved" />
          </div>
          <DashboardAction />
        </div>
        {dashboardDisplay === 'created' ? (
          <>
            <DashboardCreatedTreeCard />
            <DashboardCreatedTreeCard />
            <DashboardCreatedTreeCard />
            <DashboardCreatedTreeCard />
          </>
        ) : (
          <>
            <DashboardSavedTreeCard />
            <DashboardSavedTreeCard />
            <DashboardSavedTreeCard />
            <DashboardSavedTreeCard />
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default Dashboard