import { useAtom } from 'jotai'
import React from 'react'
import { ErrorAlerts } from '../components/ErrorAlerts'
import { Navbar } from '../components/Navbar'
import { setErrorAlertsAtom } from '../lib/atom/error-alerts.atom'

interface MainLayoutProps {
  children?: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [errorAlerts, _setErrorAlerts] = useAtom(setErrorAlertsAtom)

  return (
    <div className="bg-white dark:bg-li-gray-1500">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full min-h-screen">
        <div className="flex flex-col justify-center">
          <main className="p-2">
            <ErrorAlerts errors={errorAlerts} />
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
