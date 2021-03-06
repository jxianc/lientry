import { useAtom } from 'jotai'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiBookOpen, FiPlus } from 'react-icons/fi'
import { DashboardCreatedTreeCard } from '../components/cards/DashboardCreatedTreeCard'
import { DashboardSavedTreeCard } from '../components/cards/DashboardSavedTreeCard'
import { CreateTreeFormModal } from '../components/modals/CreateTreeFormModal'
import { useGetUserByIdQuery } from '../generated/graphql'
import { MainLayout } from '../layouts/MainLayout'
import { currUserAtom } from '../lib/atom/current-user.atom'
import {
  DashboardDisplay,
  dashboardDisplayAtom,
  setDashboardDisplayAtom,
} from '../lib/atom/dashboard-tab.atom'
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
          ? 'bg-li-gray-100 dark:bg-li-gray-1400 font-medium text-black dark:text-white border border-li-gray-200 dark:border-li-gray-1300'
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
  const router = useRouter()

  return (
    <>
      <CreateTreeFormModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <button
        className="px-3 py-2 rounded-[0.3rem] text-sm bg-li-gray-100 hover:bg-li-gray-200 dark:bg-li-gray-1400 dark:hover:bg-li-gray-1300 font-medium text-black dark:text-white flex items-center space-x-2 border border-li-gray-200 dark:border-li-gray-1300"
        onClick={() => {
          if (dashboardDisplay === 'created') {
            setModalIsOpen(true)
          } else if (dashboardDisplay === 'saved') {
            router.push('/')
          }
        }}
      >
        {dashboardDisplay === 'created' ? (
          <FiPlus size={16} />
        ) : (
          <FiBookOpen size={16} />
        )}
        <span>
          {dashboardDisplay === 'created'
            ? 'create a new tree'
            : 'browse trees'}
        </span>
      </button>
    </>
  )
}

// dashboard page
interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = ({}) => {
  // jotai state
  const [dashboardDisplay] = useAtom(dashboardDisplayAtom)
  const [currUser] = useAtom(currUserAtom)

  // query
  const [{ data }] = useGetUserByIdQuery({
    variables: {
      // NOTE this might be fine, because the query won't be executed until the currUser is not undefined
      userId: currUser?.id as string,
    },
    pause: !currUser,
  })

  // useState
  const [createdTreeElements, setCreatedTreeElements] = useState<JSX.Element[]>(
    [],
  )
  const [savedTreeElements, setSavedTreeElements] = useState<JSX.Element[]>([])

  // useEffect
  useEffect(() => {
    if (data && data.getUserById && data.getUserById.trees) {
      const ts = data.getUserById.trees
      setCreatedTreeElements(
        ts.map((t) => (
          <DashboardCreatedTreeCard
            key={t.id}
            treeId={t.id}
            title={t.name}
            views={t.viewed}
            createdAt={t.createdAt}
            numOfLinks={t.links?.length || 0}
            isPublic={t.isPublic}
          />
        )),
      )
    }

    if (data && data.getUserById && data.getUserById.userSavedTrees) {
      const ts = data.getUserById.userSavedTrees
      setSavedTreeElements(
        ts.map((t) => {
          const tt = t.tree // lol
          return (
            <DashboardSavedTreeCard
              key={tt.id}
              treeId={tt.id}
              title={tt.name}
              userId={tt.user.id}
              userName={tt.user.name}
              userImage={tt.user.image}
              numOfLinks={tt.links?.length || 0}
              views={tt.viewed}
              createdAt={tt.createdAt}
            />
          )
        }),
      )
    }
  }, [data])

  return (
    <MainLayout>
      <div className="mt-2 mb-10 space-y-4">
        <div className="flex justify-between items-baseline">
          <div className="flex space-x-4">
            <DashboardTab
              title={`${createdTreeElements.length} created trees`}
              type="created"
            />
            <DashboardTab
              title={`${savedTreeElements.length} saved trees`}
              type="saved"
            />
          </div>
          <DashboardAction />
        </div>
        {dashboardDisplay === 'created' ? (
          <>
            {createdTreeElements &&
              createdTreeElements.length > 0 &&
              createdTreeElements}
          </>
        ) : (
          <>
            {savedTreeElements &&
              savedTreeElements.length > 0 &&
              savedTreeElements}
          </>
        )}
      </div>
    </MainLayout>
  )
}

export default Dashboard
