import React from 'react'
import { Navbar } from '../components/Navbar'

interface MainLayoutProps {
  children?: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-50 dark:bg-black">
      <Navbar />
      <div className="max-w-3xl mx-auto w-full min-h-screen">
        <div className="flex flex-col justify-center">
          <main className="p-2">{children}</main>
        </div>
      </div>
    </div>
  )
}
